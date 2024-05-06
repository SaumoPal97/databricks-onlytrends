def extract_question(input):
    return input[-1]["content"]

def extract_history(input):
    return input[:-1]

def format_context(docs):
    return "\n\n".join([d.page_content for d in docs])

def extract_source_urls(docs):
    return [d.metadata["url"] for d in docs]