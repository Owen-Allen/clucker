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



@api_view(['GET'])
def follow2(request):

    followers = Follow.objects.filter(id=2)
    
    if(followers.count() == 1):
        data = followers[0]
        serializer = FollowSerializer(data)
        return Response(serializer.data)
    else:
        return Response({"data": "none"})
    


@api_view(['GET'])
def userid(request):
    if('email' not in request.query_params or not request.query_params['email']): return Response({'id': None})
    email = request.query_params['email']
    users = User.objects.filter(email=email)
    if (users.count() == 0):
        return Response({'id': None, 'message': f'No user with the email {email} exists in our db'})
    if (users.count() > 1):
        print("multiple users with same email?")

    user = users[0]
    print(user)
    serializer = UserSerializer(user)
    return Response(serializer.data)

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
                return Response({'status_code': 404, 'data':[], 'message': f'No like exists with that cluck and user'})
            serializer = LikeSerializer(likes, many=True) # needs many = True, even though it is not possible to have duplicate likes. Could use a get() instead of filter() but don't want a 404
        elif 'user' in request.query_params:
            likes = Like.objects.filter(user=request.query_params['user'])
            serializer = LikeSerializer(likes, many=True)
        elif 'cluck' in request.query_params:
            likes = Like.objects.filter(cluck=request.query_params['cluck'])
            serializer = LikeSerializer(likes, many=True)
        if(serializer): return Response({'status_code': 200, 'data': serializer.data})
        return Response({'message': 'Please provide cluck id or user id.'})
    
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
                return Response({'status':status.HTTP_204_NO_CONTENT})
        return Response({'status':status.HTTP_404_NOT_FOUND})






@api_view(['GET'])
def feed(request):
    if('id' not in request.query_params or not request.query_params['id']): return Response({'clucks': None})
    id = request.query_params['id']
    
    # Constructing a feed
    # 1 get all of the user's clucks
    # 2 get all of the user's following
    # 3 get all of the user's following clucks
    # 4 sort by reverse created_at

    clucks = Cluck.objects.filter(author=id)

    follow_set = Follow.objects.filter(user_id=id)
    for index in range(0, follow_set.count()):
        clucks = clucks | Cluck.objects.filter(author=follow_set[index].following)

    clucks = clucks.order_by("-created_at")
    serializer = CluckSerializer(clucks, many=True)
    return Response({'clucks': serializer.data})

@api_view(['GET'])
def clucks_author(request):
    if('author' not in request.query_params or not request.query_params['author']): return Response({'clucks': None})
    author = request.query_params['author']
    clucks = Cluck.objects.filter(author=author)
    clucks = clucks.order_by("-created_at")
    serializer = CluckSerializer(clucks, many=True)
    return Response({'clucks': serializer.data})


    