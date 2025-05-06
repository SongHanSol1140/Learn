import PortOne, { Entity } from "@portone/browser-sdk/v2"
import { useEffect, useState } from "react"

interface Item {
  id: string;
  name: string;
  price: number;
  currency: string;
}

interface PaymentStatus {
  status: string;
  message?: string; // message 속성 추가 (아래 오류 해결에도 필요)
}


export function App() {
  const [item, setItem] = useState<Item | null>(null); // null 허용 또는 초기값 설정
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({ status: "IDLE" });

  useEffect(() => {
    async function loadItem() {
      const response = await fetch("http://localhost:8080/api/item")
      setItem(await response.json())
    }

    loadItem().catch((error) => console.error(error))
  }, [])

  if (item == null) {
    return (
      <dialog open>
        <article aria-busy>결제 정보를 불러오는 중입니다.</article>
      </dialog>
    )
  }

  function randomId() {
    return Array.from(crypto.getRandomValues(new Uint32Array(2)))
      .map((word) => word.toString(16).padStart(8, "0"))
      .join("");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPaymentStatus({ status: "PENDING" })
    const paymentId = randomId()
    const payment = await PortOne.requestPayment({
      // storeId: "store-e4038486-8d83-41a5-acf1-844a009e0d94",
      // channelKey: "channel-key-ebe7daa6-4fe4-41bd-b17d-3495264399b5",
      storeId: "store-c17fccb3-c18b-4e61-9250-e8123c4402f8",
      channelKey: "channel-key-9123b124-4c8d-4292-b8ae-c2282b43a689",
      paymentId,
      orderName: item.name,
      totalAmount: item.price,
      currency: item.currency as Entity.Currency,
      payMethod: "CARD",
      // payMethod: "EASY_PAY",
      customData: {
        item: item.id,
      },
    })
    if (payment?.code !== undefined) { // Optional Chaining 사용
      setPaymentStatus({
        status: "FAILED",
        message: payment.message,
      });
      return;
    }
    const completeResponse = await fetch("http://localhost:8080/api/payment/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentId: payment?.paymentId, // Optional Chaining 사용

      }),
    })
    if (completeResponse.ok) {
      const paymentComplete = await completeResponse.json()
      setPaymentStatus({
        status: paymentComplete.status,
      })
    } else {
      setPaymentStatus({
        status: "FAILED",
        message: await completeResponse.text(),
      })
    }
  }

  const isWaitingPayment = paymentStatus.status !== "IDLE"

  const handleClose = () =>
    setPaymentStatus({
      status: "IDLE",
    })

  return (
    <>
      <main>
        <form onSubmit={handleSubmit}>
          {item && (
            <article>
              <div className="item">
                <div className="item-image">
                  <img src={`/${item.id}.png`} alt={item.name} />
                </div>
                <div className="item-text">
                  <h5>{item.name}</h5>
                  <p>{item.price.toLocaleString()}원</p>
                </div>
              </div>
              <div className="price">
                <label>총 구입 가격</label>
                {item.price.toLocaleString()}원
              </div>
            </article>
          )}
          <button
            type="submit"
            aria-busy={isWaitingPayment}
            disabled={isWaitingPayment}
          >
            결제
          </button>
        </form>
      </main>
      {paymentStatus.status === "FAILED" && (
        <dialog open>
          <header>
            <h1>결제 실패</h1>
          </header>
          <p>{paymentStatus.message}</p>
          <button type="button" onClick={handleClose}>
            닫기
          </button>
        </dialog>
      )}
      <dialog open={paymentStatus.status === "PAID"}>
        <header>
          <h1>결제 성공</h1>
        </header>
        <p>결제에 성공했습니다.</p>
        <button type="button" onClick={handleClose}>
          닫기
        </button>
      </dialog>
    </>
  )
}
export default App;