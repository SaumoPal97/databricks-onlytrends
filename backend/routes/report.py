from services.job_runner import trigger_job_run
from prisma.models import Report, Trend # type: ignore
from flask import Blueprint, request # type: ignore

report_blueprint = Blueprint('report', __name__)

@report_blueprint.route('/', methods=['GET','POST','OPTIONS'])
def get_or_create_report():
  if request.method == 'OPTIONS':
     return {}
  if request.method == 'GET':
    tags = request.args.get('tags')
    if tags:
        reports = Report.prisma().find_many(
            where={
                "tags": {
                    "hasSome": tags.split(',')
                }
            },
            include={
                "trends": True
            }
        )
    else:
        reports = Report.prisma().find_many(
            include={
                "trends": True
            }
        )
    return {
      "data": [report.dict() for report in reports]
    }

  if request.method == 'POST':
    data = request.json

    if data is None:
      return

    namespace = data.get('namespace')

    report = Report.prisma().upsert(
        where={
            "namespace": namespace
        },
        data={
            "update": {},
            "create": data
        }
    )

    # trigger_job_run(data)
    
    return {
      "data": [report.dict()]
    }

@report_blueprint.route('/<id>', methods=['GET', 'PUT','OPTIONS'])
def view_or_update_report(id):
  if request.method == 'OPTIONS':
        return {}
  if request.method == 'GET':
    report = Report.prisma().find_unique(
        where={
            "id": id
        }, 
        include={
            "trends": True
        }
    )
    return {
      "data": [report.dict()] if report else []
    }

  if request.method == 'PUT':
    data = request.json

    if data:
        for trend in data:
            mtrend = dict(trend)
            mtrend["reportId"] = id
            Trend.prisma().create(
                data=mtrend
            )

    report = Report.prisma().find_unique(
        where={
            "id": id
        }, 
        include={
            "trends": True
        }
    )
    return {
      "data": [report.dict()]
    }