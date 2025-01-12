import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false); // เพื่อแสดง loading ขณะรอผลลัพธ์

  const pickImage = async () => {
    // ขอสิทธิ์เข้าถึงคลังภาพ
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('ขออภัย! ต้องมีสิทธิ์เข้าถึงคลังภาพ');
      return;
    }

    // เลือกรูปภาพจากอุปกรณ์
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);
      setLoading(true); // ตั้งค่าให้แสดง loading เมื่อเริ่มอัปโหลด
      uploadImage(pickerResult.assets[0]);
    }
  };

  const uploadImage = async (image) => {
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
      console.log('Response JSON:', json); // ดูผลลัพธ์ที่ได้จากเซิร์ฟเวอร์

      setLoading(false);

      // แสดงผลลัพธ์ในรูปแบบที่อ่านง่าย
      if (json.detections && json.detections.length > 0) {
        let output = json.detections.map(
          (item, index) =>
            `วัตถุที่คือ: ${item.label}, ความมั่นใจ: ${(item.confidence * 100).toFixed(2)}%`
        );
        setResult(output.join('\n')); // แสดงผลหลายวัตถุในรูปแบบข้อความ
      } else if (json.message) {
        setResult(json.message); // กรณีไม่พบวัตถุ
      } else {
        setResult('รูปแบบข้อมูลไม่ถูกต้อง');
      }
    } catch (error) {
      console.error(error);
      setResult('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
      setLoading(false); // หยุดการโหลดในกรณีที่มีข้อผิดพลาด
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ตรวจจับวัตถุ</Text>
      <Button title="เลือกภาพ" onPress={pickImage} />
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.result}>{result}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
  },
  result: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
});
