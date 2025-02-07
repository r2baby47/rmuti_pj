import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library'; 
import { Text, View} from 'react-native';
import styles from '../style/style.js';

// ฟังก์ชันสำหรับเลือกภาพจากคลัง
export const pickImage = async () => {
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.Images,
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

// ฟังก์ชันสำหรับอัปโหลดภาพไปยังเซิร์ฟเวอร์
export const uploadImage = async (image, setLoading, setResult) => {
  let formData = new FormData();
  formData.append('file', {
    uri: image.uri,
    name: 'image.jpg',
    type: 'image/jpeg',
  });

  try {
    let response = await fetch('http://192.168.0.39:5000/detect', {
      method: 'POST',
      body: formData,
    });
    let json = await response.json();
    setLoading(false);

    if (json.detections && json.detections.length > 0) {
      let output = json.detections.map((item) => (
        <View key={item.label_en} style={styles.resultContainer}>
          {/* ห่อข้อความทั้งสองด้วย <View> */}
          <Text style={styles.resultText}>
            ภาษาอังกฤษ: {item.label_en}
          </Text>
          <Text style={styles.resultText}>
            ภาษาไทย: {item.label_th}
          </Text>
        </View>
      ));
      setResult(output);  // ส่งผลลัพธ์เป็น array ของ <Text> components
    } else if (json.message) {
      setResult([<Text key="message" style={styles.resultText}>{json.message}</Text>]);  // ส่งข้อความใน array
    } else {
      setResult([<Text key="error" style={styles.resultText}>รูปแบบข้อมูลไม่ถูกต้อง</Text>]);
    }
  } catch (error) {
    console.error(error);
    setResult([<Text key="error" style={styles.resultText}>เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์</Text>]);
    setLoading(false);
  }
};
