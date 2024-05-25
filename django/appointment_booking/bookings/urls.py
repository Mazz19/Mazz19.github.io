from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('book/', views.book_appointment, name='book_appointment'),
    path('success/', views.success, name='success'),
    path('register/', views.register, name='register'),
    path('login/', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('appointments/', views.appointments_list, name='appointments_list'),
    path('', views.index, name='index'),
]
