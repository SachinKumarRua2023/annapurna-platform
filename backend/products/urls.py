"""products/urls.py"""
from django.urls import path
from . import views

urlpatterns = [
    path('',                          views.ProductListView.as_view(),      name='product-list'),
    path('categories/',               views.CategoryListView.as_view(),     name='category-list'),
    path('featured/',                 views.FeaturedProductsView.as_view(), name='featured'),
    path('bestsellers/',              views.BestsellerProductsView.as_view(), name='bestsellers'),
    path('wishlist/',                 views.WishlistView.as_view(),         name='wishlist'),
    path('<slug:slug>/',              views.ProductDetailView.as_view(),    name='product-detail'),
    path('<slug:slug>/reviews/',      views.ReviewCreateView.as_view(),     name='review-create'),
]
