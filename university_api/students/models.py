from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100, unique=True)
    program = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Subject(models.Model):
    name = models.CharField(max_length=100, unique=True)
    academic_year = models.CharField(max_length=100)

    def __str__(self):
        return self.name
