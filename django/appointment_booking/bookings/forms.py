from django import forms
from .models import Appointment
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class AppointmentForm(forms.ModelForm):
    TIME_CHOICES = [
        ('09:00', '09:00 AM'),
        ('10:00', '10:00 AM'),
        ('11:00', '11:00 AM'),
        ('12:00', '12:00 PM'),
        ('13:00', '01:00 PM'),
        ('14:00', '02:00 PM'),
        ('15:00', '03:00 PM'),
        ('16:00', '04:00 PM'),
        ('17:00', '05:00 PM'),
    ]

    time = forms.ChoiceField(choices=TIME_CHOICES)

    class Meta:
        model = Appointment
        fields = ['name', 'email', 'phone', 'date', 'time']

    def clean(self):
        cleaned_data = super().clean()
        date = cleaned_data.get("date")
        time = cleaned_data.get("time")

        if date and time:
            if Appointment.objects.filter(date=date, time=time).exists():
                raise forms.ValidationError("An appointment at this date and time already exists.")
        
        return cleaned_data

class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']