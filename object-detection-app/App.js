import React, { useState, useEffect } from 'react';
import { Text, View, Image, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import * as MediaLibrary from 'expo-media-library'; // ✅ ใช้ MediaLibrary ขอ permission
import styles from './style/style.js';
import { uploadImage, pickImage, takePhoto } from './utils/imageFunctions.js';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  // ขอสิทธิ์เข้าถึง Media Library
  // useEffect(() => {
  //   (async () => {
  //     const { status } = await MediaLibrary.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       Alert.alert("ต้องอนุญาตการเข้าถึงคลังภาพเพื่อเลือกไฟล์!");
  //     }
  //   })();
  // }, []);

  // ฟังก์ชันที่เกี่ยวข้องกับการเลือกหรือถ่ายภาพ
  const handlePickImage = async () => {
    const pickerResult = await pickImage();
    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);
      setLoading(true);
      uploadImage(pickerResult.assets[0], setLoading, setResult);
    }
  };

  const handleTakePhoto = async () => {
    const cameraResult = await takePhoto();
    if (!cameraResult.canceled) {
      setSelectedImage(cameraResult.assets[0].uri);
      setLoading(true);
      uploadImage(cameraResult.assets[0], setLoading, setResult);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ตรวจจับวัตถุ</Text>

      {/* ปุ่มจัดเรียงแนวนอน */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePickImage}>
          <Text style={styles.buttonText}>เลือกภาพ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Text style={styles.buttonText}>ถ่ายภาพ</Text>
        </TouchableOpacity>
      </View>

      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.resultContainer}>
          {Array.isArray(result) ? (
            result.map((item, index) => (
              <Text key={index} style={styles.result}>
                {item}
              </Text>
            ))
          ) : (
            <Text style={styles.result}>{result}</Text>
          )}
        </View>
      )}
    </View>
  );
}
