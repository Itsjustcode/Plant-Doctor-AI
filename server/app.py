from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import io

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from your React frontend

# Mock class labels
class_names = ['Healthy', 'Deficient', 'Diseased']

@app.route('/predict', methods=['POST'])
def predict():
    # Get the image file from the request
    file = request.files['image']
    image = Image.open(file.stream).resize((224, 224))
    
    # Convert image to array and normalize (mocking real model processing)
    img_array = np.array(image) / 255.0
    img_array = img_array.reshape((1, 224, 224, 3))

    # For now: Return a fake prediction with random confidence
    fake_prediction = {
        "Healthy": 0.1,
        "Deficient": 0.2,
        "Diseased": 0.7
    }

    predicted_label = max(fake_prediction, key=fake_prediction.get)

    return jsonify({
        "label": predicted_label,
        "confidence": fake_prediction
    })

if __name__ == '__main__':
    app.run(debug=True)
