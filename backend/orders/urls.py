"""orders/urls.py"""
from django.urls import path
from . import views

urlpatterns = [
    path('cart/',                              views.CartView.as_view(),         name='cart'),
    path('cart/items/',                        views.CartItemView.as_view(),     name='cart-items'),
    path('cart/items/<uuid:item_id>/',         views.CartItemView.as_view(),     name='cart-item-detail'),
    path('checkout/',                          views.CheckoutView.as_view(),     name='checkout'),
    path('',                                   views.OrderListView.as_view(),    name='order-list'),
    path('<str:order_number>/',                views.OrderDetailView.as_view(),  name='order-detail'),
    path('<str:order_number>/cancel/',         views.CancelOrderView.as_view(),  name='order-cancel'),
]
