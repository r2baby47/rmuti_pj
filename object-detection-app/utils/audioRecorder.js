import { Audio } from 'expo-av';

let recordingInstance = null;

export const startRecording = async (setRecording) => {
  try {
    if (recordingInstance) {
      console.warn("กำลังอัดเสียงอยู่แล้ว กรุณาหยุดก่อนเริ่มใหม่");
      return;
    }

    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );

    recordingInstance = recording;
    setRecording(recording);
    console.log('🔴 เริ่มอัดเสียง...');
  } catch (err) {
    console.error('❌ ไม่สามารถเริ่มอัดเสียง:', err);
  }
};

export const stopRecording = async () => {
  if (!recordingInstance) return null;

  console.log('⏹ หยุดอัดเสียง...');
  await recordingInstance.stopAndUnloadAsync();
  const uri = recordingInstance.getURI();
  console.log('✅ เสียงบันทึกไว้ที่:', uri);
  recordingInstance = null;
  return uri;
};
