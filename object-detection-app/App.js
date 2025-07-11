import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import styles from "./style/style.js";
import { uploadImage, pickImage, takePhoto } from "./utils/imageFunctions.js";
import { speakEnglish, speakThai } from "./utils/sound_Function.js";
import { startRecording, stopRecording } from "./utils/audioRecorder.js";
import {checkPronunciation} from "./utils/checkrecord.js";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUri, setAudioUri] = useState(null);
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

 const handleRecordPress = async () => {
  if (!isRecording) {
    try {
      await startRecording(setRecording);
      setIsRecording(true);
      Alert.alert('กำลังอัดเสียง', 'กดปุ่มอีกครั้งเพื่อหยุดอัดเสียง');
    } catch (e) {
      Alert.alert('ผิดพลาด', 'ไม่สามารถเริ่มอัดเสียงได้');
    }
  } else {
    const uri = await stopRecording();
    setIsRecording(false);
    setRecording(null);
    setAudioUri(uri); 
    Alert.alert('หยุดอัดเสียง', `ไฟล์เสียงถูกบันทึกที่: ${uri}`);
  }
};

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/icon.jpg")}
        style={{
          width: 90,
          height: 90,
          marginTop: 40,
          marginBottom: 10,
          borderRadius: 20,
          backgroundColor: "#fff",
          alignSelf: "center",
        }}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonPick]}
          onPress={handlePickImage}
        >
          <Text style={styles.buttonText}>เลือกภาพ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonTake]}
          onPress={handleTakePhoto}
        >
          <Text style={styles.buttonText}>ถ่ายภาพ</Text>
        </TouchableOpacity>
      </View>

      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
        </View>
      )}

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#f857a6"
          style={{ marginTop: 30 }}
        />
      ) : (
        result?.en &&
        result?.th && (
          <View
            style={[
              styles.resultContainer,
              {
                backgroundColor: "#fff9",
                borderRadius: 16,
                marginTop: 28,
                padding: 18,
                width: "90%",
              },
            ]}
          >
            <Text style={styles.resultLabel}>ผลลัพธ์</Text>
            <Text style={[styles.resultText, { color: "#222" }]}>
              ภาษาอังกฤษ: <Text style={styles.resultText}>{result.en}</Text>
            </Text>
            <Text style={[styles.resultText, { color: "#222" }]}>
              ภาษาไทย: <Text style={styles.resultText}>{result.th}</Text>
            </Text>

            <View style={styles.speakButtonRow}>
              <TouchableOpacity
                style={styles.speakButtonTh}
                onPress={() => speakEnglish(result.en)}
              >
                <Text style={styles.textstyle}>🔊 ฟังเสียงอังกฤษ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.speakButtonEn}
                onPress={() => speakThai(result.th)}
              >
                <Text style={styles.textstyle}>🔊 ฟังเสียงไทย</Text>
              </TouchableOpacity>
            </View>

            

             <View style={styles.recordButtonRow}>
      <TouchableOpacity
        style={styles.speakButtonEn}
        onPress={handleRecordPress}
      >
        <Text style={styles.textstyle}>
          {isRecording ? '⏹ หยุดอัดเสียง' : '🎙 พูดคำศัพท์'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
  style={styles.speakButtonTh}
  onPress={() => {
  console.log("🎤 ตรวจการออกเสียง", audioUri);
  checkPronunciation(audioUri, result, setSpokenText);
}}
>
  <Text style={styles.textstyle}>✅ ตรวจการออกเสียง</Text>
</TouchableOpacity>
    </View>
            

            {spokenText ? (
              <Text style={{ marginTop: 10, fontSize: 16, color: "#333" }}>
                คุณพูดว่า: "{spokenText}"
              </Text>
            ) : null}
          </View>
        )
      )}
    </View>
  );
}
