import os
from dotenv import load_dotenv  # type: ignore
from databricks.sdk import WorkspaceClient # type: ignore

load_dotenv()

def trigger_job_run(notebook_params={}):
    w = WorkspaceClient(host=os.environ["DATABRICKS_HOST"], token=os.environ["DATABRICKS_TOKEN"])
    run_now_response = w.jobs.run_now(job_id=os.environ["DATABRICKS_JOB_ID"], notebook_params=notebook_params)
    return run_now_response

# trigger_job_run()