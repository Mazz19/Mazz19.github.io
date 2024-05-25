from django.contrib import admin
from .models import Appointment

class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'date', 'time', 'created_at')
    search_fields = ('name', 'email', 'phone')

admin.site.register(Appointment, AppointmentAdmin)
