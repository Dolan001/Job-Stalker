# Generated by Django 4.1.4 on 2023-01-09 07:14

from django.conf import settings
import django.contrib.gis.db.models.fields
import django.contrib.gis.geos.point
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import job.models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='JobModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_id', models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, unique=True)),
                ('title', models.CharField(max_length=100, null=True)),
                ('description', models.TextField(null=True)),
                ('email', models.EmailField(max_length=254, null=True)),
                ('address', models.CharField(max_length=255, null=True)),
                ('type', models.CharField(choices=[('Permanent', 'Permanent'), ('Temporary', 'Temporary'), ('Internship', 'Internship')], default='Permanent', max_length=50)),
                ('education', models.CharField(choices=[('Diploma', 'Diploma'), ('Bachelors', 'Bachelors'), ('Masters', 'Masters'), ('Phd', 'Phd')], default='Bachelors', max_length=50)),
                ('industry', models.CharField(choices=[('Business', 'Business'), ('Information Technology', 'It'), ('Banking', 'Banking'), ('Education/Training', 'Education'), ('Telecommunication', 'Telecommunication'), ('Others', 'Others')], default='Business', max_length=50)),
                ('experience', models.CharField(choices=[('No Experience', 'No Experience'), ('1 Year', 'One Year'), ('2 Years', 'Two Year'), ('3 Years', 'Three Year'), ('5 Years and Above', 'Five Year Plus')], default='No Experience', max_length=50)),
                ('salary', models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(1000000)])),
                ('positions', models.IntegerField(default=1)),
                ('company', models.CharField(max_length=100, null=True)),
                ('point', django.contrib.gis.db.models.fields.PointField(default=django.contrib.gis.geos.point.Point(0.0, 0.0), srid=4326)),
                ('last_date', models.DateTimeField(default=job.models.return_date_time)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CandidateApplyModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('resume', models.FileField(null=True, upload_to='resume')),
                ('applied_at', models.DateTimeField(auto_now_add=True)),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='apply_job', to='job.jobmodel')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='apply_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
