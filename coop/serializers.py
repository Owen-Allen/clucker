from rest_framework import serializers
from .models import User, Follow, Cluck, Reply, Like


class AdminUserSerializer(serializers.ModelSerializer):    
    class Meta:
        model = User
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):    
    class Meta:
        model = User
        fields = ('id', 'name', 'about', 'followers', 'following', 'clucks', 'likes') # no email
        read_only_fields = ['id', 'followers', 'following', 'clucks', 'likes']


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ('id','user_id', 'following')

class CluckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cluck
        fields = ('id','author', 'content', 'created_at', 'is_deleted')

class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ('id','author', 'content', 'created_at', 'is_deleted', 'parent')

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('id','user', 'cluck')