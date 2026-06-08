import joblib
import sys
import re
import os

# Get current folder path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load model
model_path = os.path.join(BASE_DIR, "resume_model.pkl")
model = joblib.load(model_path)

# Resume text from Node.js
resume_text = sys.argv[1]

# Clean text
resume_text = re.sub(r'http\S+', '', resume_text)
resume_text = re.sub(r'\W', ' ', resume_text)
resume_text = re.sub(r'\d', '', resume_text)
resume_text = resume_text.lower()

# Predict
prediction = model.predict([resume_text])

print(prediction[0])