// npm i qrcode-generator
const QRCode = require('qrcode');
// npm i qrcode-generator
// npm i sharp

const path = require('path');
// QR 코드에 넣을 데이터
// 전화번호 설정
const phoneNumber = '01031277711';
const telLink = `tel:07050809109`;
const url = `https://www.naver.com`;
const longText = `asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf`;

// ==============================
// URL 
// QR 코드 옵션 설정
// 1. 단순 생성
const qrCodeOptions = {
  errorCorrectionLevel: 'L', // 복원률 : L 7 / M 15/ Q 25/ H30
  type: 'image/png',
  quality: 1,
  margin: 1,
  width: 500,
  color: {
    dark: '#000000FF',
    light: '#FFFFFFFF',
  },
};

// __dirname을 사용하여 현재 폴더에 QR 코드 파일 생성
const filePath = path.join(__dirname, "QR.png");

// URL1을 QR 코드 데이터로 사용하여 파일 생성
QRCode.toFile(filePath, longText, qrCodeOptions, (err) => {
  if (err) {
    console.error('QR 코드 생성 중 오류가 발생했습니다:', err);
  } else {
    console.log('QR 코드가 성공적으로 생성되었습니다:', filePath);
  }
});
// ==================================================================
// ==================================================================