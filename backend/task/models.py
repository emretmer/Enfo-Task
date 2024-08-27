from django.db import models
from datetime import datetime
from datetime import date
from django.db import models
from django.contrib.auth.models import AbstractUser

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class Patron(AbstractBaseUser):
    name = models.CharField(max_length=200, default='SOME STRING')
    description = models.CharField(max_length=500, default='SOME STRING')
    email = models.EmailField(max_length=255, unique=True)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = CustomUserManager()

    def __str__(self):
        return f'{self.name} - {self.description}'

class Book(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    overdue = models.CharField(max_length=2, blank=True, null=True) #tarih olarak alıp teslim edilme tarihinden çıkar aradaki gün sayısını her gün datetime.now() ile kontrol ettikten sonra overdue 0 olduğunda bunu belirt.
    #returntime = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    owner = models.ForeignKey(Patron, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.name + '-' + self.description + '-' + str(self.returntime) + '-' + str(self.overdue) + '-' + str(self.owner)
    