from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from .models import Book, Patron
from .serializers import BookSerializer, PatronSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.utils.translation import gettext as _

# BOOK
class BookListCreateAPIView(ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({"books": serializer.data})

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({
            "message": _("Book created successfully."),
            "book": serializer.data
        }, status=status.HTTP_201_CREATED)


class OverduedBookListAPIView(APIView):
    def get(self, request, *args, **kwargs):
        books = Book.objects.filter(overdue=0)
        serializer = BookSerializer(books, many=True)
        return Response({
            "message": _("Here are the overdue books."),
            "books": serializer.data
        })

class CheckedOutBookListAPIView(APIView):
    def get(self, request, *args, **kwargs):
        books = Book.objects.filter(owner__isnull=False)
        serializer = BookSerializer(books, many=True)
        return Response({
            "message": _("Here are the checked out books."),
            "books": serializer.data
        })


class BookDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({
            "message": _("Book details retrieved successfully."),
            "book": serializer.data
        })

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({
            "message": _("Book updated successfully."),
            "book": serializer.data
        })

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            "message": _("Book deleted successfully.")
        }, status=status.HTTP_204_NO_CONTENT)


class CheckoutBookAPIView(APIView):
    def put(self, request, id, Patron_id, *args, **kwargs):
        try:
            book = Book.objects.get(pk=id)
            patron = Patron.objects.get(pk=Patron_id)
        except (Book.DoesNotExist, Patron.DoesNotExist):
            return Response({
                "message": _("Book or patron not found.")
            }, status=status.HTTP_404_NOT_FOUND)

        book.owner = patron
        book.save()
        return Response({
            "message": _("Book checked out successfully.")
        })

class ReturnBookAPIView(APIView):
    def put(self, request, id, *args, **kwargs):
        try:
            book = Book.objects.get(pk=id)
        except Book.DoesNotExist:
            return Response({
                "message": _("Book not found.")
            }, status=status.HTTP_404_NOT_FOUND)

        book.owner = None
        book.save()
        return Response({
            "message": _("Book returned successfully.")
        })

# PATRON
class PatronListCreateAPIView(ListCreateAPIView):
    queryset = Patron.objects.all()
    serializer_class = PatronSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({"patrons": serializer.data})

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PatronDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Patron.objects.all()
    serializer_class = PatronSerializer

    def get_object(self):
        try:
            return super().get_object()
        except Patron.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    #USER

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "This is a protected view"})