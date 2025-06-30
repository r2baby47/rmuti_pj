import * as Speech from 'expo-speech';

// ฟังก์ชันออกเสียงคำศัพท์
export const speakEnglish = (word) => {
  Speech.speak(word, { language: 'en' });
};
// ฟังก์ชันออกเสียงคำศัพท์ภาษาไทย
export const speakThai = (word) => {
    if (word) {
      Speech.speak(word, { language: 'th' });
    }
  };