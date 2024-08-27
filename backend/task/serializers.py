from rest_framework import serializers
from .models import Book
from .models import Patron
from django.contrib.auth.models import User

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'name' , 'description', 'overdue', 'owner'] 

class PatronSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patron
        fields = ['id', 'name', 'description']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Yeni bir kullanıcı oluştururken şifreyi hash'le
        user = Patron(
            email=validated_data['email'],
            name=validated_data['name'],
            description=validated_data['description'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user