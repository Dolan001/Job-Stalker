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
    # permission_classes = [IsAuthorOrIsAuthenticated]

    def list(self, request, *args, **kwargs):
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
    
    def retrieve(self, request, *args, **kwargs):
        id = self.kwargs['pk']
        job = get_object_or_404(JobModel, id=id)
        candidates = job.apply_job.all().count()

        serializer = JobSerializer(job, many=False)

        return Response({
            'job': serializer.data,
            'candidates': candidates
        })
    
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

    def my_jobs(self, request):
        args = {'user': request.user.id}

        jobs = JobModel.objects.filter(**args)
        serializer = JobSerializer(jobs, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def applied_my_job(self, request, pk):
        user = request.user
        job = get_object_or_404(JobModel, id=pk)

        if job.user != user:
            return Response({'detail': 'You can not access this Job'}, status=status.HTTP_403_FORBIDDEN)

        candidates = job.apply_job.all()
        serializer = CandidateApplySerializer(candidates, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CandidateApplyViewSet(ModelViewSet):
    queryset = CandidateApplyModel.objects.all()
    serializer_class = CandidateApplySerializer
    # permission_classes = [IsAuthorOrIsAuthenticated]

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

        if job.user == user:
            return Response({'detail': 'You can not apply your own job'}, status=status.HTTP_400_BAD_REQUEST)

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

    def is_applied(self, request, pk=None):
        user = request.user
        job = get_object_or_404(JobModel, id=pk)

        applied = job.apply_job.filter(user=user).exists()

        return Response(applied)
