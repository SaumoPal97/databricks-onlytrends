from flask import Blueprint, request # type: ignore
from services.llm import get_llm_response

chat_blueprint = Blueprint('chat', __name__)

@chat_blueprint.route('/', methods=['POST','OPTIONS'])
def chat_on_all_reports():
    if request.method == 'OPTIONS':
     return {}
    data = request.json
    if data is None:
        return

    return get_llm_response(data)


@chat_blueprint.route('/<namespace>', methods=['POST','OPTIONS'])
def chat_on_single_report(namespace):
    if request.method == 'OPTIONS':
     return {}
    data = request.json
    if data is None:
        return

    return get_llm_response(data, namespace)