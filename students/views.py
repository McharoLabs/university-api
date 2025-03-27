from rest_framework import viewsets
from rest_framework.response import Response
from .models import Student, Subject
from .serializers import StudentSerializer, SubjectSerializer
from django.http import HttpResponse

class StudentViewSet(viewsets.ViewSet):
    def list(self, request):
        students = Student.objects.all()[:10]
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

class SubjectViewSet(viewsets.ViewSet):
    def list(self, request):
        subjects = Subject.objects.all().order_by('academic_year')
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data)
