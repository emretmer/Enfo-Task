from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    BookListCreateAPIView,
    OverduedBookListAPIView,
    CheckedOutBookListAPIView,
    BookDetailAPIView,
    CheckoutBookAPIView,
    ReturnBookAPIView,
    PatronListCreateAPIView,
    PatronDetailAPIView
)

urlpatterns = [
    path('books/', BookListCreateAPIView.as_view(), name='book-list'),
    path('books/overdued/', OverduedBookListAPIView.as_view(), name='overduedbook-list'),
    path('books/checkedout/', CheckedOutBookListAPIView.as_view(), name='checkedoutbook-list'),
    path('books/<int:id>/', BookDetailAPIView.as_view(), name='book-detail'),
    path('books/<int:id>/checkout/<int:Patron_id>/', CheckoutBookAPIView.as_view(), name='checkout-book'),
    path('books/<int:id>/return/', ReturnBookAPIView.as_view(), name='return-book'),
    path('patrons/', PatronListCreateAPIView.as_view(), name='patron-list'),
    path('patrons/<int:id>/', PatronDetailAPIView.as_view(), name='patron-detail'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
