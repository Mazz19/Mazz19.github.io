from django.shortcuts import render, redirect
from .forms import AppointmentForm
from .models import Appointment

def book_appointment(request):
    if request.method == 'POST':
        form = AppointmentForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('success')
    else:
        form = AppointmentForm()
    return render(request, 'bookings/book_appointment.html', {'form': form})

def success(request):
    return render(request, 'bookings/success.html')
