import React, { useEffect } from 'react';

const NicePaySandbox = () => {
  // 컴포넌트가 마운트되면 결제창 JS SDK를 로드합니다.
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://pay.nicepay.co.kr/v1/js/";
    script.async = true;
    document.body.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거 (옵션)
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 임의의 주문번호 생성 함수
  const generateOrderId = (length = 8) => {
    return Math.random().toString(16).substr(2, length);
  };

  // 결제창 호출 함수
  const serverAuth = () => {
    // SDK 로드 여부 확인
    if (window.AUTHNICE) {
      window.AUTHNICE.requestPay({
        clientId: 'S2_0cfd4b3d97a84fa0a3237d111f0cf796', // 테스트 상점에서 발급받은 클라이언트키 입력
        method: 'kakaopay',
        orderId: generateOrderId(),
        amount: 1004,
        goodsName: '나이스페이-상품',
        returnUrl: 'http://localhost:3000/serverAuth',
        fnError: function (result) {
          alert('고객용메시지 : ' + result.msg + '\n개발자확인용 : ' + result.errorMsg);
        }
      });
    } else {
      console.error("AUTHNICE SDK가 아직 로드되지 않았습니다.");
    }
  };

  return (
    <div>
      <button onClick={serverAuth}>serverAuth 결제하기</button>
    </div>
  );
};

export default NicePaySandbox;
