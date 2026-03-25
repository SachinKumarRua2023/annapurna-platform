"""products/views.py"""

from rest_framework import generics, permissions, status, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404

from .models import Category, Product, Review, Wishlist
from .serializers import (
    CategorySerializer, ProductListSerializer, ProductDetailSerializer, ReviewSerializer
)
from .filters import ProductFilter


class CategoryListView(generics.ListAPIView):
    """GET /api/products/categories/"""
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    queryset = Category.objects.filter(is_active=True, parent=None).prefetch_related('children')


class ProductListView(generics.ListAPIView):
    """GET /api/products/ — with filtering, search, ordering"""
    serializer_class = ProductListSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilter
    search_fields  = ['name', 'description', 'tags', 'sku']
    ordering_fields = ['price', 'created_at', 'name']
    ordering = ['-created_at']

    def get_queryset(self):
        return Product.objects.filter(
            status=Product.Status.ACTIVE
        ).select_related('category').prefetch_related('images', 'reviews')


class ProductDetailView(generics.RetrieveAPIView):
    """GET /api/products/<slug>/"""
    serializer_class = ProductDetailSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

    def get_queryset(self):
        return Product.objects.filter(
            status=Product.Status.ACTIVE
        ).select_related('category', 'supplier').prefetch_related('images', 'reviews__user')


class FeaturedProductsView(generics.ListAPIView):
    """GET /api/products/featured/"""
    serializer_class = ProductListSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Product.objects.filter(
            status=Product.Status.ACTIVE, is_featured=True
        ).select_related('category').prefetch_related('images')[:12]


class BestsellerProductsView(generics.ListAPIView):
    """GET /api/products/bestsellers/"""
    serializer_class = ProductListSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Product.objects.filter(
            status=Product.Status.ACTIVE, is_bestseller=True
        ).select_related('category').prefetch_related('images')[:12]


class ReviewCreateView(generics.CreateAPIView):
    """POST /api/products/<slug>/reviews/"""
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        product = get_object_or_404(Product, slug=self.kwargs['slug'])
        serializer.save(user=self.request.user, product=product)


class WishlistView(APIView):
    """GET/POST/DELETE /api/products/wishlist/"""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        items = Wishlist.objects.filter(user=request.user).select_related('product')
        products = [item.product for item in items]
        serializer = ProductListSerializer(products, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        product_id = request.data.get('product_id')
        product = get_object_or_404(Product, id=product_id)
        item, created = Wishlist.objects.get_or_create(user=request.user, product=product)
        if not created:
            item.delete()
            return Response({'message': 'Removed from wishlist', 'in_wishlist': False})
        return Response({'message': 'Added to wishlist', 'in_wishlist': True})
