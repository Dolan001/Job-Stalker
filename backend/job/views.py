from django.db.models import Avg, Min, Max, Count

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
