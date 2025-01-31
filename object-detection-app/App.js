import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('ขออภัย! ต้องมีสิทธิ์เข้าถึงคลังภาพ');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);
      setLoading(true);
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
      setLoading(false);

      if (json.detections && json.detections.length > 0) {
        let output = json.detections.map(
          (item) => (
            <View key={item.label_en} style={styles.resultContainer}>
              <Text style={styles.result}>{`ภาษาอังกฤษ : ${item.label_en}`}</Text>
              <Text style={styles.result}>{`ภาษาไทย :  ${item.label_th}`}</Text>
            </View>
          )
        );
        setResult(output); // ใช้ JSX เพื่อแสดงผล
      } else if (json.message) {
        setResult(json.message);
      } else {
        setResult('รูปแบบข้อมูลไม่ถูกต้อง');
      }
    } catch (error) {
      console.error(error);
      setResult('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
      setLoading(false);
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
        <View style={styles.resultContainer}>{result}</View>
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
  resultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  result: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    marginTop: 5,
  },
});
