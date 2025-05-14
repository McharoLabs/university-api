import logging
from celery import shared_task

from students.models import Student

logger = logging.getLogger(__name__)

@shared_task()
def list_students():
    try:
        students = Student.objects.all()
        logger.info(f"Students: {students}")
    except Exception as e:
        logger.error(f"An error occured: {e}")
        