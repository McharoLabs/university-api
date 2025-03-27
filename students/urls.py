from django.urls import path
from .views import StudentViewSet, SubjectViewSet

urlpatterns = [
    path('students/', StudentViewSet.as_view({'get': 'list'})),
    path('subjects/', SubjectViewSet.as_view({'get': 'list'})),
]
