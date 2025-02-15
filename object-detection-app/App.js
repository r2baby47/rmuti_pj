import React, { useState } from 'react';
import { Text, View, Image, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import styles from './style/style.js';
import { uploadImage, pickImage, takePhoto } from './utils/imageFunctions.js';
import { speakEnglish,speakThai } from './utils/sound_Function.js';  // ✅ นำเข้าฟังก์ชันออกเสียง

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

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

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePickImage}>
          <Text style={styles.buttonText}>เลือกภาพ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Text style={styles.buttonText}>ถ่ายภาพ</Text>
        </TouchableOpacity>
      </View>
      {selectedImage && (
  <View style={styles.imageContainer}>
    <Image source={{ uri: selectedImage }} style={styles.image} />
  </View>
)}



      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        result && result.en && result.th && (
          
    <View style={styles.resultContainer}>
      <Text style={styles.result}>ภาษาอังกฤษ: {result.en}</Text>
      <Text style={styles.result}>ภาษาไทย: {result.th}</Text>

      <TouchableOpacity onPress={() => speakEnglish(result.en)}>
        <Text style={styles.speakButton}>🔊 ฟังเสียงภาษาอังกฤษ</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => speakThai(result.th)}>
        <Text style={styles.speakButton}>🔊 ฟังเสียงภาษาไทย</Text>
      </TouchableOpacity>
    </View>
  )
)}

    </View>
  );
}
