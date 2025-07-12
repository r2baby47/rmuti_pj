from flask import Flask, request, jsonify
import traceback  
from googletrans import Translator
from PIL import Image
import torch
import json
import os
from flask_cors import CORS
from ultralytics import YOLO
import whisper
import shutil
print(shutil.which("ffmpeg"))
app = Flask(__name__)
CORS(app)
model = YOLO ('best.pt')  
whisper_model = whisper.load_model("base")
@app.route('/detect', methods=['POST'])
def detect():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        img = Image.open(file.stream).convert('RGB')

        results = model(img)
        result = results[0]  

        detections = []
        for box in result.boxes.data.tolist():
            x_min, y_min, x_max, y_max, confidence, class_id = box
            label_en = result.names[int(class_id)]
            label_th = translate_label(label_en)

            detections.append({
                'label_en': label_en,
                'label_th': label_th,
                'confidence': round(confidence, 2),
                'bbox': [x_min, y_min, x_max, y_max]
            })

        if not detections:
            return jsonify({'message': 'ไม่พบวัตถุใดๆ ในภาพ', 'detections': []}), 200
        
        highest_confidence_detection = max(detections, key=lambda x: x['confidence'])

        return jsonify({
            'message': 'ตรวจจับสำเร็จ',
            'detections': [highest_confidence_detection]
        }), 200

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500



translator = Translator()
custom_dict_path = os.path.join(os.path.dirname(__file__), 'custom_dict.json')
with open(custom_dict_path, 'r', encoding='utf-8') as file:
    custom_dict = json.load(file)

def translate_label(label):
   
    if label in custom_dict:
        return custom_dict[label]
    return translator.translate(label, src='en', dest='th').text


@app.route("/transcribe", methods=["POST"])
def transcribe():
    audio = request.files["audio"]
    audio.save("temp_audio.m4a")
    result = whisper_model.transcribe("temp_audio.m4a")
    return jsonify({"text": result["text"]})
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
