from rest_framework.serializers import *

from .models import *


class JobSerializer(ModelSerializer):

    class Meta:
        model = JobModel
        fields = '__all__'


class CandidateApplySerializer(ModelSerializer):

    # job = JobSerializer()

    class Meta:
        model = CandidateApplyModel
        fields = '__all__'
