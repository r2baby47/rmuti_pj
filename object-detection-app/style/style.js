import { StyleSheet } from 'react-native';

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
    marginBottom: 20,
  },
  imageContainer: {
    width: '90%', // ความกว้างของกรอบรูป
    height: 300,  // ความสูงของกรอบ
    borderWidth: 2,   // กรอบรูป
    borderColor: 'gray',  // สีกรอบ
    borderRadius: 10,     // มุมโค้งมน
    overflow: 'hidden',   // รูปภาพไม่ให้เกินกรอบ
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',       // ให้รูปภาพขยายเต็มกรอบ
    height: '100%',      // ให้รูปภาพขยายเต็มกรอบ
    resizeMode: 'contain',  // ไม่ให้รูปขยายจนผิดเพี้ยน
  },
  resultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  resultText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',  // ทำให้ข้อความอยู่กลาง
    marginVertical: 5,  // ระยะห่างระหว่างบรรทัด
  },
  buttonContainer: {
    flexDirection: 'row',  // จัดปุ่มในแนวนอน
    justifyContent: 'space-around', // กระจายปุ่ม
    width: '80%', // ให้ปุ่มมีความกว้างประมาณ 80% ของหน้าจอ
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'red',  // เปลี่ยนสีพื้นหลังของปุ่มเป็นสีแดง
    color: 'white',
    padding: 10,
    borderRadius: 5,
    flex: 1, // ทำให้ปุ่มขยายเต็มพื้นที่ในแต่ละช่อง
    marginHorizontal: 10, // ระยะห่างระหว่างปุ่ม
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default styles;
