from django.contrib import admin
from .models import Book
from .models import Patron

admin.site.register(Patron)

admin.site.register(Book)

