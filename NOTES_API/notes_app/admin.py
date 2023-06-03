from django.contrib import admin
from .models import Note, FileNote

admin.site.register(Note)
admin.site.register(FileNote)