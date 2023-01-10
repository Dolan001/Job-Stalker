from rest_framework.serializers import *

from .models import *


class JobSerializer(ModelSerializer):

    class Meta:
        model = JobModel
        fields = '__all__'


class CandidateApplySerializer(ModelSerializer):

    class Meta:
        model = CandidateApplyModel
        fields = '__all__'

        extra_kwargs = {
            'user': {'read_only': True},
            'resume': {'read_only': True},
        }
