// npm i qrcode-generator
const QRCode = require('qrcode');
// npm i qrcode-generator
const QRgenerator = require('qrcode-generator');
// npm install qr-code-styling
const QRCodeStyling = require("qr-code-styling");
// npm i sharp
const sharp = require('sharp');

const path = require('path');
// QR 코드에 넣을 데이터
// 전화번호 설정
const phoneNumber = '01031277711';
const telLink = `tel:07050809109`;
// URL 
const URL1 = 'https://nanonix.help?tn=1';
const URL2 = 'https://nanonix.help?tn=2';
const URL3 = 'https://nanonix.help?tn=3';
// QR 코드 옵션 설정
// 1. 단순 생성
// const qrCodeOptions = {
//   errorCorrectionLevel: 's',
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
// 2. 도트크기 컨트롤
// 복원율
// L<M<Q<H


const orderData = [
  {
      option: {
          temperature: "Ice",
          iceLevel: "보통",
          size: "Tall",
          brewing: "에스프레소"
      },
      price: 4000
  }
  // 여기에 다른 주문 항목이 있다면 추가될 수 있습니다.
];
const orderDataString = JSON.stringify(orderData);


// QR 코드 생성 (SVG 형식)
// 4 => 20 숫자가 커질수록 넣을수잇는 데이터가 커짐(픽셀이 많아짐)
let qrCode = QRgenerator(8, 'L');
qrCode.addData(telLink);
qrCode.make();
let qrSvg = qrCode.createSvgTag({});

// SVG를 PNG로 변환하고 너비 지정하여 파일로 저장
const svgBuffer = Buffer.from(qrSvg);
const filePath = path.join(__dirname, "QR.png");
const width = 500; // 원하는 이미지의 너비 (픽셀 단위)

sharp(svgBuffer)
  .png()
  .resize(width) // 너비 지정, 높이는 자동 조정
  .toFile(filePath, (err, info) => {
    if (err) {
      console.error('QR 코드 생성 중 오류가 발생했습니다:', err);
    } else {
      console.log(`QR 코드가 ${width}px 너비로 PNG 형식으로 성공적으로 생성되었습니다.`, info);
    }
  });

// ==================================================================
// ==================================================================
// // 3. 원형만들기 -
// const qrCodeOptions = {
//   errorCorrectionLevel: 'H',
//   type: 'image/png',
//   quality: 1,
//   margin: 8,
//   width: 500,
//   color: {
//     // dark: '#000000FF',
//     // light: '#FFFFFFFF',
//     light: '#FFD800',
//     dark: '#732002',
//   },
// };

// const tempFilePath = path.join(__dirname, "QR-temp.png");
// const outputFilePath = path.join(__dirname, "QR-circular.png");

// QRCode.toFile(tempFilePath, URL1, qrCodeOptions, (err) => {
//   if (err) {
//     console.error('QR 코드 생성 중 오류:', err);
//   } else {
//     // 생성된 사각형 QR 코드를 원형으로 마스킹합니다.
//     sharp(tempFilePath)
//       .resize(500, 500)
//       .composite([
//         {
//           input: Buffer.from(
//             `<svg width="500" height="500">
//               <circle cx="250" cy="250" r="250" fill="white"/>
//             </svg>`
//           ),
//           blend: 'dest-in'
//         }
//       ])
//       .toFile(outputFilePath)
//       .then(() => {
//         console.log("원형 QR 코드가 생성되었습니다:", outputFilePath);
//       })
//       .catch(err => {
//         console.error('원형 마스킹 중 오류:', err);
//       });
//   }
// });
