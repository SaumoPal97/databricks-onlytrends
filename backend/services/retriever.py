import os
from dotenv import load_dotenv  # type: ignore
load_dotenv()

from databricks.vector_search.client import VectorSearchClient  # type: ignore
from langchain_community.vectorstores import DatabricksVectorSearch # type: ignore
from langchain_community.embeddings import DatabricksEmbeddings # type: ignore

def get_retriever(namespace=None):
    embedding_model = DatabricksEmbeddings(endpoint="databricks-bge-large-en")
    index_name=f"{os.environ['DATABRICKS_CATALOG']}.{os.environ['DATABRICKS_DB']}.pdf_reports_self_managed_vs_index"

    vsc = VectorSearchClient(workspace_url=os.environ["DATABRICKS_HOST"], personal_access_token=os.environ["DATABRICKS_TOKEN"], disable_notice=True)
    vs_index = vsc.get_index(
        endpoint_name=os.environ["VECTOR_SEARCH_ENDPOINT_NAME"],
        index_name=index_name
    )

    # Create the retriever
    vectorstore = DatabricksVectorSearch(
        vs_index, text_column="content", embedding=embedding_model, columns=["url"]
    )

    if namespace is not None:
        return vectorstore.as_retriever(search_kwargs={'k': 4, 'filters': {'url LIKE': namespace}}) # type: ignore
    else:
        return vectorstore.as_retriever(search_kwargs={'k': 4})
