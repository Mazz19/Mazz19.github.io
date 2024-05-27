from django.db import models
from django.contrib.auth.models import User

class Appointment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField()
    description = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.description} at {self.date}"
