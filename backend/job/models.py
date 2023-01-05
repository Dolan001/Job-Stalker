import os
import geocoder
import datetime
from django.db import models
from django.contrib.gis.db import models as gismodels
from django.contrib.gis.geos import Point
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

def return_date_time():
    now = datetime.datetime.now()
    return now + datetime.timedelta(days=10)


class JobType(models.TextChoices):
    Permanent = 'Permanent'
    Temporary = 'Temporary'
    Internship = 'Internship'


class Education(models.TextChoices):
    Diploma = 'Diploma'
    Bachelors = 'Bachelors'
    Masters = 'Masters'
    Phd = 'Phd'


class Industry(models.TextChoices):
    Business = 'Business'
    IT = 'Information Technology'
    Banking = 'Banking'
    Education = 'Education/Training'
    Telecommunication = 'Telecommunication'
    Others = 'Others'


class Experience(models.TextChoices):
    No_Experience = 'No Experience'
    One_Year = '1 Year'
    Two_Year = '2 Years'
    Three_Year = '3 Years'
    Five_Year_Plus = '5 Years and Above'


class JobModel(models.Model):
    title = models.CharField(max_length=100, null=True)
    description = models.TextField(null=True)
    email = models.EmailField(null=True)
    address = models.CharField(max_length=255, null=True)
    type = models.CharField(
        max_length=50,
        choices=JobType.choices,
        default=JobType.Permanent
    )
    education = models.CharField(
        max_length=50,
        choices=Education.choices,
        default=Education.Bachelors
    )
    industry = models.CharField(
        max_length=50,
        choices=Industry.choices,
        default=Industry.Business
    )
    experience = models.CharField(
        max_length=50,
        choices=Experience.choices,
        default=Experience.No_Experience
    )
    salary = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(1000000)])
    positions = models.IntegerField(default=1)
    company = models.CharField(max_length=100, null=True)
    point = gismodels.PointField(default=Point(0.0, 0.0))
    last_date = models.DateTimeField(default=return_date_time)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        gc = geocoder.mapquest(self.address, key=os.environ.get('GEOCODER_API'))

        lng = gc.lng
        lat = gc.lat

        self.point = Point(lng, lat)
        return super(JobModel, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.title)


class CandidateApplyModel(models.Model):
    job = models.ForeignKey(JobModel, on_delete=models.CASCADE, related_name='apply_job')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='apply_user')
    resume = models.FileField(upload_to='resume', null=True)
    applied_at = models.DateTimeField(auto_now_add=True)

