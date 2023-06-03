from rest_framework import serializers
from .models import Note, FileNote

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

class FileNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileNote
        fields = '__all__'
