import * as ImagePicker from 'expo-image-picker';

// ฟังก์ชันสำหรับเลือกภาพจากคลัง
export const pickImage = async () => {
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });
  return pickerResult;
};

// ฟังก์ชันสำหรับถ่ายภาพจากกล้อง
export const takePhoto = async () => {
  let cameraResult = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    quality: 1,
  });
  return cameraResult;
};



// ฟังก์ชันอัปโหลดภาพและรับผลลัพธ์
export const uploadImage = async (image, setLoading, setResult) => {
  let formData = new FormData();
  formData.append('file', {
    uri: image.uri,
    name: 'image.jpg',
    type: 'image/jpeg',
  });

  try {
    let response = await fetch('http://192.168.85.144:5000/detect', {//http://192.168.0.33:5000/detect
      method: 'POST',
      body: formData,
    });
    let json = await response.json();
    setLoading(false);

    console.log('API Response:', json); // ✅ ตรวจสอบค่าที่ได้จาก API

    if (json.detections && json.detections.length > 0) {
      let detectedLabel_en = json.detections[0].label_en;
      let detectedLabel_th = json.detections[0].label_th; // เอาคำศัพท์ทั้ง 2 ภาษา
      setResult({ en: detectedLabel_en, th: detectedLabel_th }); // ส่งผลลัพธ์เป็น Object
    } else if (json.message) {
      setResult({ en: json.message, th: "" });
    } else {
      setResult({ en: "รูปแบบข้อมูลไม่ถูกต้อง", th: "" });
    }
  } catch (error) {
    console.error(error);
    setResult({ en: "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์", th: "" });
    setLoading(false);
  }
};
