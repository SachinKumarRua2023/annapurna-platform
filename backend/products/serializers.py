"""products/serializers.py"""

from rest_framework import serializers
from .models import Category, Product, ProductImage, Review, Wishlist


class CategorySerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'image', 'parent', 'children', 'is_active']

    def get_children(self, obj):
        return CategorySerializer(obj.children.filter(is_active=True), many=True).data


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'is_primary', 'sort_order']


class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.full_name', read_only=True)
    user_avatar = serializers.ImageField(source='user.avatar', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'user_name', 'user_avatar', 'rating', 'title', 'body',
                  'is_verified', 'created_at']
        read_only_fields = ['id', 'user_name', 'user_avatar', 'is_verified', 'created_at']


class ProductListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views"""
    primary_image = serializers.SerializerMethodField()
    category_name = serializers.CharField(source='category.name', read_only=True)
    avg_rating    = serializers.FloatField(read_only=True)
    discount_percent = serializers.IntegerField(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'price', 'compare_price', 'discount_percent',
                  'primary_image', 'category_name', 'avg_rating', 'stock',
                  'is_featured', 'is_bestseller', 'unit']

    def get_primary_image(self, obj):
        img = obj.images.filter(is_primary=True).first() or obj.images.first()
        if img:
            request = self.context.get('request')
            return request.build_absolute_uri(img.image.url) if request else img.image.url
        return None


class ProductDetailSerializer(serializers.ModelSerializer):
    """Full serializer for product detail view"""
    images       = ProductImageSerializer(many=True, read_only=True)
    reviews      = serializers.SerializerMethodField()
    category     = CategorySerializer(read_only=True)
    avg_rating   = serializers.FloatField(read_only=True)
    review_count = serializers.SerializerMethodField()
    discount_percent = serializers.IntegerField(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'description', 'short_desc', 'sku',
                  'price', 'compare_price', 'discount_percent', 'stock', 'unit',
                  'weight', 'category', 'images', 'avg_rating', 'review_count',
                  'reviews', 'is_featured', 'is_bestseller', 'tags', 'status']

    def get_reviews(self, obj):
        approved = obj.reviews.filter(is_approved=True)[:5]
        return ReviewSerializer(approved, many=True).data

    def get_review_count(self, obj):
        return obj.reviews.filter(is_approved=True).count()
