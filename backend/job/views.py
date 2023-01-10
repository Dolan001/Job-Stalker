from django.db.models import Avg, Min, Max, Count
from django.shortcuts import get_object_or_404

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import status

from .serializers import *
from .filters import JobFilter
from .permissions import IsAuthorOrIsAuthenticated


class JobViewSet(ModelViewSet):
    queryset = JobModel.objects.all()
    serializer_class = JobSerializer
    # authentication_classes = []
    permission_classes = [IsAuthorOrIsAuthenticated]

    def getTopicStats(self, request, topic):
        args = {
            'title__icontains': topic
        }
        jobs = JobModel.objects.filter(**args)

        if jobs is None:
            return Response({'details': f'No stat found for {topic}'})

        stats = jobs.aggregate(
            total_jobs=Count('title'),
            avg_position=Avg('positions'),
            avg_salary=Avg('salary'),
            min_salary=Min('salary'),
            max_salary=Max('salary')
        )
        return Response(stats, status=status.HTTP_200_OK)

    def jobFilter(self, request):
        filter_set = JobFilter(request.GET, queryset=JobModel.objects.all().order_by('id'))
        count = filter_set.qs.count()
        result_per_page = 3
        paginator = PageNumberPagination()
        paginator.page_size = result_per_page

        queryset = paginator.paginate_queryset(filter_set.qs, request)

        serializer = JobSerializer(queryset, many=True)
        return Response(
            {
                'count': count,
                'result_per_page': result_per_page,
                'jobs': serializer.data,
            },
            status=status.HTTP_200_OK
        )


class CandidateApplyViewSet(ModelViewSet):
    queryset = CandidateApplyModel.objects.all()
    serializer_class = CandidateApplySerializer
    permission_classes = [IsAuthorOrIsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user
        job_id = request.data['job']
        job = get_object_or_404(JobModel, id=job_id)

        if not bool(user.userprofile.resume):
            return Response({"detail": "Please upload your resume first"}, status=status.HTTP_400_BAD_REQUEST)

        if job.last_date < timezone.now():
            return Response({'detail': 'Your can not apply this job. Date is over'}, status=status.HTTP_400_BAD_REQUEST)

        if job.apply_job.filter(user=user).exists():
            return Response({'detail': 'Your already applied this job'}, status=status.HTTP_400_BAD_REQUEST)

        apply_job = CandidateApplyModel.objects.create(
            job=job,
            user=user,
            resume=user.userprofile.resume
        )
        return Response(
            {
                'Applied': True,
                'Apply job id': apply_job.id,
            }, status=status.HTTP_200_OK
        )

    def my_applied_jobs(self, request):
        user = request.user

        queryset = CandidateApplyModel.objects.filter(user=user)

        serializer = CandidateApplySerializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)