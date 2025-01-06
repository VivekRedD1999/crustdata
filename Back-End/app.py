
# app.py

from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
import torch
from torch.nn.functional import cosine_similarity
from llm_model import generate_response

app = Flask(__name__)
CORS(app)

# Load the fine-tuned model


# Load suggestions and embeddings

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')




@app.route("/chat", methods=['POST'])

def chat():
    
    try:
        
        # Ensure request_data is not None
        request_data = request.get_json()
        if not request_data:
            return jsonify({"error": "Invalid request. No data received."}), 400

        # Extract fields from the JSON
        user_input = request_data.get("message", "").strip()
        print(user_input)
        chat_history = []
        
        #print("product filtered", product_data)
        
        #csv_file = request_data.get("csv_file", "")  # Assuming CSV file path is part of the request

        # Validate input
        if not user_input:
            return jsonify({"error": "Query (message) is required"}), 400
        

        # Handle the first query
        if len(chat_history) == 0:
            chatbot_response = generate_response(
                user_input=user_input
            )
            print(chatbot_response)
            # Update chat history
            chat_history.append({"role": "user", "content": user_input})
            chat_history.append({"role": "assistant", "content": chatbot_response})
            return jsonify({
            "response": chatbot_response,
            
        })

        else:
            chat_history = chat_history[-20:]
            chatbot_response = generate_response(
                    user_input=user_input,
                    chat_history=chat_history,
                    
                )
                # Update chat history
            print(chatbot_response)
            chat_history.append({"role": "user", "content": user_input})
            chat_history.append({"role": "assistant", "content": chatbot_response})
            return jsonify({
            "response": chatbot_response,
            
        })
        

    except Exception as e:
        app.logger.error("Error in chat endpoint: %s", str(e), exc_info=True)
        return jsonify({"error": str(e)}), 500

            





if __name__ == '__main__':
    app.run(debug=True)
