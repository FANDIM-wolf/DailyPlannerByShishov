from django.urls import path
from . import views

urlpatterns = [
    path('notes', views.create_note),
    path('notes/<int:year>/<int:month>/<int:day>', views.get_notes_by_day),
    path('files', views.upload_file),
  # Endpoint to download a file by file name
    path('files/<str:file_name>/download/', views.download_file_by_name, name='download_file_by_name'),
    path('files/<int:year>/<int:month>/<int:day>/', views.get_files_for_day, name='get_files_for_day'),
   
]