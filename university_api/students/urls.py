from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, SubjectViewSet

router = DefaultRouter()

router.register(r'students', StudentViewSet, basename='student')
router.register(r'subjects', SubjectViewSet, basename='subject')

urlpatterns = router.urls
