from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import AdminUserSerializer, UserSerializer, FollowSerializer, CluckSerializer, ReplySerializer, LikeSerializer
from .models import User, Follow, Cluck, Reply, Like

from rest_framework.decorators import api_view

from google.oauth2 import id_token
from google.auth.transport import requests

request = requests.Request()

def is_admin(token):
    try:
        id_info = id_token.verify_oauth2_token(token, request, '120353689511-7ugn38knq9mpkvjuo8e2hi1irjr8j1ip.apps.googleusercontent.com')
        if(id_info['email'] == 'owenallen.2000@gmail.com'):
            return True
        return False
    except Exception as e:
        print(f"Error in verify_token: {e}")
        return False

def verify_token(token):
    # return True
    try:
        id_info = id_token.verify_oauth2_token(token, request, '120353689511-7ugn38knq9mpkvjuo8e2hi1irjr8j1ip.apps.googleusercontent.com')
        # print(id_info)
        return True
    except Exception as e:
        print(f"Error in verify_token: {e}")
        return False

def get_token(request):
    try:
        token = request.headers['Authorization'].split(' ')[1]
        return token
    except Exception as e:
        return None
    
def valid_request(request):
    # return True
    try:
        print('validating request...')
        token = get_token(request)
        return verify_token(token)
    except Exception as e:
        print(f'error while validating request: {e}')
        return False

def get_email(token):
    try:
        id_info = id_token.verify_oauth2_token(token, request, '120353689511-7ugn38knq9mpkvjuo8e2hi1irjr8j1ip.apps.googleusercontent.com')
        return id_info["email"]
    except Exception as e:
        print(f"Error in get_email: {e}")

@api_view(['POST'])
def email_available(request):
    data = request.data
    email = data.get('email')
    if email:
        email_available = not User.objects.filter(email=email).exists()
    else:
        return Response({'error': 'Please provide email.'}, status=status.HTTP_400_BAD_REQUEST)
    data = {'email_available': email_available}
    return Response(data=data, status=status.HTTP_200_OK)
    
@api_view(['POST'])
def id_available(request):
    data = request.data
    id = data.get('id')
    if id:
        id_available = not User.objects.filter(id=id).exists()
    else:
        return Response({'error': 'Please provide id.'}, status=status.HTTP_400_BAD_REQUEST)
    data = {'id_available': id_available}
    return Response(data=data, status=status.HTTP_200_OK)
    

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def list(self, request, *args, **kwargs):
        # Retrieve all users from the database
        if(not valid_request(request)): return Response(status=status.HTTP_401_UNAUTHORIZED)

        users = User.objects.all()
        if(is_admin(get_token(request))):
            serializer = AdminUserSerializer(users, many=True)

        else:
            serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def retrieve(self, request, pk=None, *args, **kwargs):
        print('in retrieve')
        if(not valid_request(request)): return Response(status=status.HTTP_401_UNAUTHORIZED)
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

class FollowView(viewsets.ModelViewSet):
    serializer_class = FollowSerializer
    queryset = Follow.objects.all()

class CluckView(viewsets.ModelViewSet):
    serializer_class = CluckSerializer
    queryset = Cluck.objects.all()

class ReplyView(viewsets.ModelViewSet):
    serializer_class = ReplySerializer
    queryset = Reply.objects.all()

class LikeView(viewsets.ModelViewSet):
    serializer_class = LikeSerializer
    queryset = Like.objects.all()


@api_view(['GET'])
def home(request):
    return Response(status=status.HTTP_200_OK, data="Hello Elastic Beanstalk!")


@api_view(['POST'])
def new_user(request):
    # verify that the id is not taken             409
    # verify that the email is not already in use 409

    if('id' not in request.data or 'name' not in request.data or 'email' not in request.data):
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    if(User.objects.filter(email = request.data['email']).exists()):
        return Response({'message': 'An account with that email already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    if(User.objects.filter(id = request.data['id']).exists()):
        return Response({'message': 'An account with that id already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    new_user = request.data
    new_user["followers"] = []
    new_user["following"] = []
    new_user["clucks"] = []
    new_user["likes"] = []
    serializer = AdminUserSerializer(data=new_user) # AdminSerializer required to set email attribute
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def userid(request):
    if('email' not in request.query_params or not request.query_params['email']): return Response(status=status.HTTP_400_BAD_REQUEST, id=None)
    email = request.query_params['email']
    users = User.objects.filter(email=email)
    if (users.count() == 0):
        return Response({'id':None}, status=status.HTTP_204_NO_CONTENT, )
    if (users.count() > 1):
        print("multiple users with same email?")
    user = users[0]
    serializer = UserSerializer(user)
    return Response(status=status.HTTP_200_OK, data=serializer.data)

@api_view(['GET', 'POST', 'DELETE'])
def like_detail(request):
    if request.method == 'GET':
        # fizz buzz
        serializer = None
        if 'user' in request.query_params and 'cluck' in request.query_params:
            likes = Like.objects.filter(user=request.query_params['user'], cluck=request.query_params['cluck'])
            if likes.count() == 0:
                return Response(status=status.HTTP_204_NO_CONTENT, data=[])
            else:
                serializer = LikeSerializer(likes, many=True)
                return Response(status=200, data=serializer.data)
        elif 'user' in request.query_params:
            likes = Like.objects.filter(user=request.query_params['user'])
            # print(likes.values_list('cluck', flat=True))
            liked_clucks = Cluck.objects.filter(id__in=likes.values_list('cluck', flat=True)).order_by('-created_at')
            # print(liked_clucks)
            serializer = CluckSerializer(liked_clucks, many=True)

            return Response(status=status.HTTP_200_OK, data=serializer.data)
        elif 'cluck' in request.query_params:
            likes = Like.objects.filter(cluck_id=request.query_params['cluck'])
            serializer = LikeSerializer(likes, many=True)
            # print(serializer.data)
            return Response(status=status.HTTP_200_OK, data=serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


    elif request.method == "POST":
        serializer = LikeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return  Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    elif request.method == "DELETE":
        if 'user' in request.data and 'cluck' in request.data:
            likes = Like.objects.filter(user=request.data['user'], cluck=request.data['cluck'])
            if likes.count() == 1:
                likes.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_404_NOT_FOUND)
    

@api_view(['POST', 'DELETE'])
def cluck_detail(request):
    # if(not valid_request(request)): return Response(status=status.HTTP_401_UNAUTHORIZED)
    if request.method == "POST":
        print("POST")
        # print(request.data)
        serializer = CluckSerializer(data=request.data)
        if serializer.is_valid():
            print('serializer valid')
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    elif request.method == "DELETE":
        print(request.data)
        if 'user_id' in request.data and 'cluck' in request.data: 
            likes = Like.objects.filter(user=request.data['user'], cluck=request.data['cluck'])
            if likes.count() == 1:
                likes.delete()
                return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST', 'DELETE'])
def follow_detail(request):
    if request.method == 'GET':
        # fizz buzz
        print("GET")
        print(request.query_params)
        serializer = None
        if 'user_id' in request.query_params and 'following' in request.query_params:
            Follows = Follow.objects.filter(user_id=request.query_params['user_id'], following=request.query_params['following'])
            if Follows.count() == 0:
                return Response(status=status.HTTP_204_NO_CONTENT, data=[])
            serializer = FollowSerializer(Follows, many=True) # needs many = True, even though it is not possible to have duplicate Follows. Could use a get() instead of filter()
        elif 'user_id' in request.query_params:
            Follows = Follow.objects.filter(user_id=request.query_params['user_id'])
            serializer = FollowSerializer(Follows, many=True)
        elif 'following' in request.query_params:
            Follows = Follow.objects.filter(following=request.query_params['following'])
            serializer = FollowSerializer(Follows, many=True)
        if(serializer): return Response(status=status.HTTP_200_OK, data=serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "POST":
        print("POST")
        print(request.data)
        serializer = FollowSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return  Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    elif request.method == "DELETE":
        print(request.data)
        if 'user_id' in request.data and 'following' in request.data:
            Follows = Follow.objects.filter(user_id=request.data['user_id'], following=request.data['following'])
            if Follows.count() == 1:
                Follows.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def feed(request):
    if(not valid_request(request)): return Response({'clucks':None}, status=status.HTTP_400_BAD_REQUEST)

    if('id' not in request.query_params or not request.query_params['id']): return Response({'clucks':None}, status=status.HTTP_400_BAD_REQUEST)
    id = request.query_params['id']
    
    # Constructing a feed
    # 1 get all of the user's clucks
    # 2 get all of the user's following
    # 3 get all of the user's following clucks
    # 4 sort by reverse created_at
    # if the serializier is empty, let's just show them the previous 10 clucks

    clucks = Cluck.objects.filter(author=id)

    follow_set = Follow.objects.filter(user_id=id)
    for index in range(0, follow_set.count()):
        clucks = clucks | Cluck.objects.filter(author=follow_set[index].following)


    if(clucks.count() < 10):
        clucks = Cluck.objects.all().order_by('created_at').order_by("-created_at")
    else:
        clucks = clucks.order_by("-created_at")

    serializer = CluckSerializer(clucks, many=True)
    return Response({'clucks':serializer.data}, status=status.HTTP_200_OK)

@api_view(['GET'])
def clucks_author(request):
    if('author' not in request.query_params or not request.query_params['author']): return Response(status.HTTP_400_BAD_REQUEST, clucks=None)
    author = request.query_params['author']
    clucks = Cluck.objects.filter(author=author)
    clucks = clucks.order_by("-created_at")
    serializer = CluckSerializer(clucks, many=True)
    return Response({'clucks':serializer.data}, status=status.HTTP_200_OK)


    