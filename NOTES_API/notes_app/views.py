from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Note, FileNote
from .serializers import NoteSerializer, FileNoteSerializer
from django.http import JsonResponse, FileResponse , HttpResponseGone , HttpResponseNotFound , HttpResponse
import os
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
@api_view(['POST'])
def create_note(request):
    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@csrf_exempt
@api_view(['GET'])
def get_notes_by_day(request, year, month, day):
    try:
        notes = Note.objects.filter(year=year, month=month, day=day)
        data = []
        for note in notes:
            note_data = {
                'id': note.id,
                'day': note.day,
                'month': note.month,
                'year': note.year,
                'text': note.text
            }
            data.append(note_data)
        return JsonResponse(data, safe=False)
    except Note.DoesNotExist:
        return JsonResponse({'error': 'No notes found for the specified day'}, status=404)
@csrf_exempt
@api_view(['POST'])
def upload_file(request):
    serializer = FileNoteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@csrf_exempt
@api_view(['GET'])
def get_files_for_day(request, year, month, day):
    try:
        files = FileNote.objects.filter(year=year, month=month, day=day)
        data = []
        for file in files:
            file_data = {
                'id': file.id,
                'file_name': file.file_name,
                'day': file.day,
                'month': file.month,
                'year': file.year,
                'file': str(file.file_data)  # Convert file object to string representation
            }
            data.append(file_data)
        return JsonResponse(data, safe=False)
    except FileNote.DoesNotExist:
        return JsonResponse({'error': 'No files found for the specified day'}, status=404)



def download_file_by_name(request, file_name):
    # Construct the full path to the image file
    image_path = os.path.join(settings.MEDIA_ROOT, 'file_notes', file_name)

    # Check that the file exists and is a file (not a directory)
    if not os.path.isfile(image_path):
        return HttpResponse(status=404)

    # Open the file and return it as the response
    with open(image_path, 'rb') as f:
        return HttpResponse(f.read(), content_type='image/jpeg')