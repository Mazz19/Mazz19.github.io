from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import Appointment
from .forms import UserRegisterForm, AppointmentForm

@login_required
def appointments_list(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        appointments = Appointment.objects.filter(user=request.user)
        appointments_data = [{
            'title': appointment.description,
            'start': appointment.date.strftime("%Y-%m-%dT%H:%M:%S"),
            'end': appointment.date.strftime("%Y-%m-%dT%H:%M:%S"),
        } for appointment in appointments]
        return JsonResponse(appointments_data, safe=False)
    else:
        return render(request, 'bookings/appointments_list.html')

def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request, user)
            messages.success(request, f'Account created for {username}!')
            return redirect('appointments_list')
    else:
        form = UserRegisterForm()
    return render(request, 'bookings/register.html', {'form': form})

@login_required
def book_appointment(request):
    if request.method == 'POST':
        form = AppointmentForm(request.POST)
        if form.is_valid():
            appointment = form.save(commit=False)
            appointment.user = request.user
            appointment.save()
            return redirect('success')
    else:
        form = AppointmentForm()
    return render(request, 'bookings/book_appointment.html', {'form': form})

def success(request):
    return render(request, 'bookings/success.html')

def index(request):
    return render(request, 'bookings/index.html')
