from rest_framework.routers import DefaultRouter

from orders.api.views import OrderViewSet

router_orders = DefaultRouter()

router_orders.register(
    prefix='orders', basename='orders', viewset=OrderViewSet
)
