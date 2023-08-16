from rest_framework import serializers
from .models import User, Follow, Cluck, Reply, Like


class UserSerializer(serializers.ModelSerializer):
    # follows = serializers.SerializerMethodField
    # followers = serializers.SerializerMethodField
    
    class Meta:
        model = User
        fields = ('id', 'name', 'about', 'followers', 'following', 'clucks', 'likes', 'email')

    # def get_follows(self, obj):
    #     return FollowingSerializer(obj.follows.all())
    
    # def get_followers(self, obj):
    #     return FollowerSerializer(obj.followers.all())


# class FollowerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Follow
#         fields = ('id','user_id')

# class FollowingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Follow
#         fields = ('id','following')

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