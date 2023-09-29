from datetime import datetime
from django.db import models

# Create your models here.
class User(models.Model):
    id = models.CharField(max_length=50, unique=True, primary_key=True)
    name = models.CharField(max_length=50)
    about = models.CharField(max_length=200, default="", blank=True)
    email = models.CharField(max_length=254, unique=True, blank=True, null=True, default=None)
    def __str__(self):
        return self.id

class Follow(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following")
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followers")
    
    class Meta:
        constraints = [
            # cannot follow yourself
            models.CheckConstraint(
                check=~models.Q(user_id=models.F("following")),
                name="non_self_follow"
            ),
            # cannot follow the same user twice
            models.UniqueConstraint(fields=["user_id", "following"], name="unique_follow")
        ]
    
    def __str__(self):
        return "%s follows %s" % (self.user_id, self.following)
    

class Cluck(models.Model):
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="clucks") # should it be cascade or null?
    content = models.CharField(max_length=300)
    created_at = models.DateTimeField(default=datetime.now())
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return "%s by %s" % (self.content, self.author)

class Reply(Cluck):
    parent = models.ForeignKey(Cluck, on_delete=models.CASCADE, related_name="replies")
    def __str__(self):
        return "%s by %s" % (self.content, self.author)

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likes") # ID OF THE PERSON WHO 'liked' the cluck
    cluck = models.ForeignKey(Cluck, on_delete=models.CASCADE, related_name="likes")
    
    class Meta:
        constraints = [
            # cannot like the same tweet twice
            models.UniqueConstraint(fields=["user", "cluck"], name="unique_like")
        ]
    
    def __str__(self):
        return "%s likes the cluck: %s" % (self.user, self.cluck)