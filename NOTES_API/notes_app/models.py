from django.db import models

class Note(models.Model):
    day = models.IntegerField()
    month = models.IntegerField()
    year = models.IntegerField()
    text = models.TextField()

class FileNote(models.Model):
    file_name = models.CharField(max_length=100)
    day = models.IntegerField()
    month = models.IntegerField()
    year = models.IntegerField()
    file_data = models.FileField(upload_to='file_notes')
