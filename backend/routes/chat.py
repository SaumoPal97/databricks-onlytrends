from flask import Blueprint, request # type: ignore
from services.llm import get_llm_response

chat_blueprint = Blueprint('chat', __name__)

@chat_blueprint.route('/', methods=['POST'])
def chat_on_all_reports():
    data = request.json
    if data is None:
        return

    chat_history = data.get('chat_history')
    return get_llm_response(chat_history)


@chat_blueprint.route('/<namspace>', methods=['POST'])
def chat_on_single_report(namspace):
    data = request.json
    if data is None:
        return

    chat_history = data.get('chat_history')
    return get_llm_response(chat_history, namspace)