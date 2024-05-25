from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from django.contrib import messages
from .forms import UserRegisterForm, AppointmentForm
from .models import Appointment

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
def appointments_list(request):
    appointments = Appointment.objects.filter(user=request.user)
    return render(request, 'bookings/appointments_list.html', {'appointments': appointments})
