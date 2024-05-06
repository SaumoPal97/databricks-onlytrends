from flask import Blueprint, request # type: ignore
from services.llm import get_llm_response

chat_blueprint = Blueprint('chat', __name__)

@chat_blueprint.route('/', methods=['POST'])
def chat_on_all_reports():
    data = request.json
    if data is None:
        return

    return get_llm_response(data)


@chat_blueprint.route('/<namespace>', methods=['POST'])
def chat_on_single_report(namespace):
    data = request.json
    if data is None:
        return

    return get_llm_response(data, namespace)