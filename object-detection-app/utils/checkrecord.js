import * as FileSystem from 'expo-file-system';
export const checkPronunciation = async (uri, result, setSpokenText) => {
  if (!uri) {
    alert("ยังไม่มีไฟล์เสียง กรุณาอัดเสียงก่อน");
    return;
  }

  console.log("📂 กำลังส่งไฟล์:", uri);
  try {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    console.log("📦 File info:", fileInfo);

    const fileUri = fileInfo.uri;
    const fileName = fileUri.split("/").pop();
    const fileType = "audio/m4a";

    const formData = new FormData();
    formData.append("audio", {
      uri: fileUri,
      name: fileName,
      type: fileType,
    });

    const response = await fetch("http://192.168.0.32:5000/transcribe", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = await response.json();
    console.log("📥 ค่าที่ได้จาก backend:", data);

    const expected = result.en?.toLowerCase().trim().replace(/[^\w\s]|_/g, "");
const transcript = data.text?.toLowerCase().trim().replace(/[^\w\s]|_/g, "");

    setSpokenText(transcript);

    setSpokenText(transcript);

if (transcript.includes(expected)) {
  alert("✅ คุณออกเสียงถูกต้อง!");
} else {
  alert("❌ คุณออกเสียงว่า: " + transcript);
}
  } catch (err) {
    console.error("❌ เกิดข้อผิดพลาดตอนส่งไฟล์:", err);
    alert("❌ ไม่สามารถตรวจสอบเสียงได้");
  }
};
