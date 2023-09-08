from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, FollowSerializer, CluckSerializer, ReplySerializer, LikeSerializer
from .models import User, Follow, Cluck, Reply, Like

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

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
    new_user["about"] = ''
    new_user["followers"] = []
    new_user["following"] = []
    new_user["clucks"] = []
    new_user["likes"] = []
    serializer = UserSerializer(data=new_user)
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
        return Response({'id':None}, status=status.HTTP_204_BAD_REQUEST, )
    if (users.count() > 1):
        print("multiple users with same email?")
    user = users[0]
    serializer = UserSerializer(user)
    return Response(status=status.HTTP_200_OK, data=serializer.data)

@api_view(['GET', 'POST', 'DELETE'])
def like_detail(request):
    if request.method == 'GET':
        # fizz buzz
        print("GET")
        print(request.query_params)
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
            serializer = LikeSerializer(likes, many=True)
            return Response(status=status.HTTP_200_OK, data=serializer.data)
        elif 'cluck' in request.query_params:
            likes = Like.objects.filter(cluck=request.query_params['cluck'])
            serializer = LikeSerializer(likes, many=True)
            return Response(status=status.HTTP_200_OK, data=serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


    elif request.method == "POST":
        print("POST")
        print(request.data)
        serializer = LikeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return  Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    elif request.method == "DELETE":
        print(request.data)
        if 'user' in request.data and 'cluck' in request.data:
            likes = Like.objects.filter(user=request.data['user'], cluck=request.data['cluck'])
            print(likes)
            if likes.count() == 1:
                likes.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_404_NOT_FOUND)
    

@api_view(['POST', 'DELETE'])
def cluck_detail(request):
    if request.method == "POST":
        print("POST")
        print(request.data)
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
            print(likes)
            if likes.count() == 1:
                likes.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status.status.HTTP_404_NOT_FOUND)

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
                return Response(status=404, data=[])
            serializer = FollowSerializer(Follows, many=True) # needs many = True, even though it is not possible to have duplicate Follows. Could use a get() instead of filter() but don't want a 404
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
    if('id' not in request.query_params or not request.query_params['id']): return Response(status=status.HTTP_400_BAD_REQUEST, clucks=None)
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
        clucks = Cluck.objects.all().order_by('created_at').order_by("-created_at")[0:10]
        print(clucks)
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


    