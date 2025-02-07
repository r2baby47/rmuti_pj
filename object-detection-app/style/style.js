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
  resultText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',  // ทำให้ข้อความอยู่ซ้ายสุด
    marginVertical: 5,  // ให้มีระยะห่างระหว่างบรรทัด
  },
  resultContainer: {
    marginBottom: 10, // เพิ่มระยะห่างระหว่างผลลัพธ์แต่ละอัน
  },
  // เพิ่มการจัดเรียงปุ่มให้อยู่ในแนวนอนและทำให้ปุ่มมีสีแดง
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
  }
});

export default styles;
