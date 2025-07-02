from flask import Flask, request, jsonify
import traceback  
from googletrans import Translator
from PIL import Image
import torch
import json
import os
from flask_cors import CORS
from ultralytics import YOLO
app = Flask(__name__)
CORS(app)

# โหลดโมเดล YOLOv5
print("Loading YOLO model...")
model = YOLO ('best.pt')  

print("Model loaded successfully!")

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



# โหลดพจนานุกรมจากไฟล์ JSON
translator = Translator()
custom_dict_path = os.path.join(os.path.dirname(__file__), 'custom_dict.json')  # ใช้ path แบบเต็ม
with open(custom_dict_path, 'r', encoding='utf-8') as file:
    custom_dict = json.load(file)

def translate_label(label):
    # ถ้ามีคำนี้ในพจนานุกรม ให้ใช้คำที่กำหนดไว้
    if label in custom_dict:
        return custom_dict[label]
    # ถ้าไม่มีในพจนานุกรม ให้ใช้ googletrans แปลปกติ
    return translator.translate(label, src='en', dest='th').text

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
