"""clucker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from coop import views

router = routers.DefaultRouter()
router.register(r'user', views.UserView, 'user')
router.register(r'follow', views.FollowView, 'follow')
router.register(r'cluck', views.CluckView, 'cluck')
router.register(r'reply', views.ReplyView, 'reply')
router.register(r'like', views.LikeView, 'like')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('coop/', include('coop.urls')),
    path('api/', include(router.urls)),
    path('api/userid/', views.userid),
    path('api/feed/', views.feed),
    path('api/like_detail/', views.like_detail),
    path('api/clucks_author/', views.clucks_author)
]
