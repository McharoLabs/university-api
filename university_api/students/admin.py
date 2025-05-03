from django.contrib import admin
from .models import Student, Subject

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'program')
    search_fields = ('name', 'program')
    list_filter = ('program',)
    ordering = ('name',)

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'academic_year')
    search_fields = ('name',)
    list_filter = ('academic_year',)
    ordering = ('name',)
