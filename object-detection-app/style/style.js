import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3eaf2', // ฟ้าอ่อนสบายตา
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 90,
    height: 90,
    marginTop: 40,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 0,
    color: '#3a506b',
    letterSpacing: 1,
    textShadowColor: '#0001',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    color: '#5c7893',
    fontSize: 16,
    marginBottom: 18,
    fontWeight: '500',
  },
  imageContainer: {
    width: '90%',
    height: 250,
    borderWidth: 2,
    borderColor: '#FDDE55',
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7fafc',
    marginTop: 18,
  },
  imageContainerPlaceholder: {
    width: '90%',
    height: 250,
    borderWidth: 2,
    borderColor: '#dbe2ea',
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7fafc',
    marginTop: 18,
    borderStyle: 'dashed',
  },
  imagePlaceholderText: {
    color: '#8a99a8',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#5c7893', // ฟ้าอมเทา
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonPick: {
    backgroundColor: '#03AED2', // ฟ้าอ่อน
  },
  buttonTake: {
    backgroundColor: '#03AED2', // ฟ้าอ่อนอมเทา
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  loadingIndicator: {
    marginTop: 30,
  },
  resultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
    backgroundColor: '#f7fafc',
    borderRadius: 16,
    padding: 18,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  resultLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3a506b',
    marginBottom: 8,
    letterSpacing: 1,
  },
  resultText: {
    
     fontWeight: "bold",
    fontSize: 18,
    color: '#3a506b',
    textAlign: 'center',
    marginVertical: 5,
  },
  resultHighlight: {
    color: '#03AED2',
    fontWeight: 'bold',
  },
// แถวของปุ่มฟังเสียง
speakButtonRow: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 16,
  width: '100%',
},

// แถวของปุ่มตรวจเสียง
recordButtonRow: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 16,
  width: '100%',
},
 textstyle:{
 color: "#fff", fontWeight: "bold", fontSize: 13
 },
// ปุ่มฟังเสียงอังกฤษ
speakButtonEn: {
  backgroundColor: '#E14434',
  width: 140,
  height: 45,
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 6,
},

speakButtonTh: {
  backgroundColor: '#E14434',
  width: 140,
  height: 45,
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 6,
},

listenButton: {
  backgroundColor: '#F5A623',
  width: 140,
  height: 45,
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 6,
},

checkButton: {
  backgroundColor: '#7ED321',
  width: 140,
  height: 45,
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 6,
},

// ข้อความในปุ่ม
speakButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 15,
},
});

export default styles;
