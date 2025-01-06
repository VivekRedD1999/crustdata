from huggingface_hub import InferenceClient
import json
import os



def generate_response(user_input, chat_history = None): 
    try: 
        if chat_history is None:
            chat_history = []

        combined_prompt = f"""
    You are a helpful assistant trained on Crustdata’s Discovery & Enrichment API and Dataset API documentation. 

    Your goal is to provide short, direct answers to user queries about:
    1. The /screener/person/search endpoint
    2. How to filter for specific titles, companies, and regions
    3. The standard list of valid regions
    4. Basic usage examples in cURL format
    5. Other simple queries related to Crustdata APIs

    Guidelines:
    - If a user’s question is about Crustdata’s APIs or usage (e.g., how to filter by region, how to query for job titles), provide a concise answer and reference the official documentation or a sample cURL snippet if relevant.
    - If the user asks something outside the scope of Crustdata’s APIs, politely say you’re only able to assist with Crustdata API questions.
    - Do not attempt to validate or correct user input (e.g., region strings) dynamically in this Level 0 mode—simply provide the known, static examples.
    - Format code snippets with triple backticks (```) for clarity.
    - Keep answers brief and directly relevant to the query.

    You must only return the relevant Crustdata information and disclaim if the question is not about Crustdata’s APIs.

    """
        client = InferenceClient(api_key="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")
        
        messages = [
            
        { "role": "system", "content": combined_prompt},
        { "role": "user", "content": user_input }                                          
        ]
        stream = client.chat.completions.create(
            model="Qwen/Qwen2.5-72B-Instruct", 
            messages=messages, 
            temperature=0.7,
            max_tokens=3000,
            top_p=0.9, 
            stream=True
        )
        c=""
        for chunk in stream:
            c+=chunk.choices[0].delta.content
        return c
    
    except Exception as e:
        print(f"Error generating response: {e}")
        return "An error occurred while generating a response. Please try again."