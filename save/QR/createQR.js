// npm i qrcode
const QRCode = require('qrcode');

// 1) QR에 담을 데이터
const data = '101-ABCDEFGHIJKLMNOPQRSTUVWXYZ/2,'
+ "101-ABCDEFGHIJKLMNOPQRSTUVWXYZ/2,"
+ "101-ABCDEFGHIJKLMNOPQRSTUVWXYZ/2,"
+ "101-ABCDEFGHIJKLMNOPQRSTUVWXYZ/2,"
+ "101-ABCDEFGHIJKLMNOPQRSTUVWXYZ/2,"
+ "101-ABCDEFGHIJKLMNOPQRSTUVWXYZ/2,"
+ "101-ABCDEFGHIJKLMNOPQRSTUVWXYZ/2,"
+ "101-ABCDEFGHIJKLMNOPQRSTUVWXYZ/2,"

// 2) 옵션 설정
const options = {
  errorCorrectionLevel: 'L',  // L | M | Q | H
  version: 10,                 // 1~40 (작을수록 단순, 클수록 복잡)
  margin: 2,                  // 테두리 빈 칸(module 개수 단위)
  scale: 10                    // 각 모듈(정사각형) 픽셀 크기
};

// 3) 파일로 바로 저장
QRCode.toFile('QR.png', data, options)
  .then(() => {
    console.log('✅ QR.png 생성 완료');
  })
  .catch(err => {
    console.error('❌ 생성 오류:', err);
  });
