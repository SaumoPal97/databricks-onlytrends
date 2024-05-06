from operator import itemgetter
from .retriever import get_retriever
from .utils import extract_question, extract_history, extract_source_urls, format_context
from .prompt_templates import question_with_history_and_context_str, generate_query_to_retrieve_context_template
from langchain.prompts import PromptTemplate  # type: ignore
from langchain_community.chat_models import ChatDatabricks  # type: ignore
from langchain.schema.output_parser import StrOutputParser  # type: ignore
from langchain.schema.runnable import RunnableLambda  # type: ignore
from langchain.schema.runnable import RunnablePassthrough # type: ignore

def get_llm_response(chat_history, namespace=None):
    chat_model = ChatDatabricks(target_uri="databricks", endpoint="databricks-dbrx-instruct", max_tokens = 500)
    retriever = get_retriever(namespace)
    
    question_with_history_and_context_prompt = PromptTemplate(
        input_variables= ["chat_history", "context", "question"],
        template = question_with_history_and_context_str
    )

    generate_query_to_retrieve_context_prompt = PromptTemplate(
        input_variables= ["chat_history", "question"],
        template = generate_query_to_retrieve_context_template
    )

    chain_with_history = (
        RunnablePassthrough() |
         {
            "question": itemgetter("messages") | RunnableLambda(extract_question),
            "chat_history": itemgetter("messages") | RunnableLambda(extract_history),
        }
        |
        {
            "relevant_docs": generate_query_to_retrieve_context_prompt | chat_model | StrOutputParser() | retriever,
            "chat_history": itemgetter("chat_history"), 
            "question": itemgetter("question")
        }
        |
        {
            "context": itemgetter("relevant_docs") | RunnableLambda(format_context),
            "sources": itemgetter("relevant_docs") | RunnableLambda(extract_source_urls),
            "chat_history": itemgetter("chat_history"), 
            "question": itemgetter("question")
        }
        |
        {
            "prompt": question_with_history_and_context_prompt,
            "sources": itemgetter("sources")
        }
        |
        {
            "result": itemgetter("prompt") | chat_model | StrOutputParser(),
            "sources": itemgetter("sources")
        }
    )

    res = chain_with_history.invoke(chat_history)
    # print(res)
    return res

# get_llm_response({
#     "messages": [
#         {"role": "user", "content": "What is Apache Spark?"}, 
#         {"role": "assistant", "content": "Apache Spark is an open-source data processing engine that is widely used in big data analytics."}, 
#         {"role": "user", "content": "Does it support streaming?"}
#     ]
# })