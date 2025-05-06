// npm i qrcode-generator
const QRCode = require('qrcode');
// npm i qrcode-generator
const QRgenerator = require('qrcode-generator');
// npm install qr-code-styling
const QRCodeStyling = require("qr-code-styling");
const sharp = require("sharp");
const path = require('path');
// QR 코드에 넣을 데이터
// 전화번호 설정
const phoneNumber = '01031277711';
const telLink = 'tel:01031277711';
// URL 
const URL1 = 'https://nanonix.help?tn=1';
const URL2 = 'https://nanonix.help?tn=2';
// QR 코드 옵션 설정
// 단순 생성
// const qrCodeOptions = {
//   errorCorrectionLevel: 'H',
//   type: 'image/png',
//   quality: 1,
//   margin: 1,
//   width: 500,
//   color: {
//     dark: '#000000FF',
//     light: '#FFFFFFFF',
//   },
// };

// // __dirname을 사용하여 현재 폴더에 QR 코드 파일 생성
// const filePath = path.join(__dirname, "QR.png");

// // URL1을 QR 코드 데이터로 사용하여 파일 생성
// QRCode.toFile(filePath, URL1, qrCodeOptions, (err) => {
//   if (err) {
//     console.error('QR 코드 생성 중 오류가 발생했습니다:', err);
//   } else {
//     console.log('QR 코드가 성공적으로 생성되었습니다:', filePath);
//   }
// });
// ==================================================================
// ==================================================================
// QR 코드 생성 (SVG 형식)
// L > 
let qrCode = QRgenerator(8, 'M'); // cellSize, 복원률, 낮을수록 도트가 크고 적은데이터가 들어감
qrCode.addData(telLink);
qrCode.make();
let qrSvg = qrCode.createSvgTag({});

// SVG를 PNG로 변환하고 너비 지정하여 파일로 저장
const svgBuffer = Buffer.from(qrSvg);
const outputPath = './QR.png'; // PNG 파일 이름
const width = 600; // 원하는 이미지의 너비 (픽셀 단위)

sharp(svgBuffer)
  .png()
  .resize(width) // 너비 지정, 높이는 자동 조정
  .toFile(outputPath, (err, info) => {
    if (err) {
      console.error('QR 코드 생성 중 오류가 발생했습니다:', err);
    } else {
      console.log(`QR 코드가 ${width}px 너비로 PNG 형식으로 성공적으로 생성되었습니다.`, info);
    }
  });
