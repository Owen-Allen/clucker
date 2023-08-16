from django.contrib import admin

# Register your models here.
from .models import User, Follow, Cluck, Reply, Like

admin.site.register(User)
admin.site.register(Follow)
admin.site.register(Cluck)
admin.site.register(Reply)
admin.site.register(Like)
