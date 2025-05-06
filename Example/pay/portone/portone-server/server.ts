

import express from "express" 

import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";
// npm install --save @portone/server-sdk

const PortOne = require("@portone/server-sdk")
// import PortOne from "@portone/server-sdk";

const portone = PortOne.PortOneClient({ secret: process.env.V2_API_SECRET})



const app = express()
app.use(express.json());
app.use(cors());
// 모든 요청에 대해 경로와 메서드를 콘솔에 출력하는 미들웨어 추가
app.use((req:any, res:any, next:any) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})
app.use(
  "/api/payment/webhook",
  bodyParser.text({
    type: "application/json",
  }),
)
app.use(bodyParser.json())

const items = new Map([
  [
    "shoes",
    {
      name: "신발",
      price: 1000,
      currency: "KRW",
    },
  ],
])

app.get("/api/item", (req:any, res:any) => {
  const id = "shoes"
  res.json({
    id,
    ...items.get(id),
  })
})

app.post("/api/payment/complete", async (req:any, res:any, next:any) => {
  try {
    const { paymentId } = req.body
    if (typeof paymentId !== "string")
      return res.status(400).send("올바르지 않은 요청입니다.").end()
    const payment = await syncPayment(paymentId)
    if (!payment) return res.status(400).send("결제 동기화에 실패했습니다.")
    res.status(200).json({
      status: payment.status,
    })
  } catch (e) {
    next(e)
  }
})

const paymentStore = new Map()
async function syncPayment(paymentId:any) {
  if (!paymentStore.has(paymentId)) {
    paymentStore.set(paymentId, {
      status: "PENDING",
    })
  }
  const payment = paymentStore.get(paymentId)
  let actualPayment
  try {
    actualPayment = await portone.payment.getPayment({ paymentId })
  } catch (e) {
    if (e instanceof PortOne.Errors.PortOneError) return false
    throw e
  }
  if (actualPayment.status === "PAID") {
    if (!verifyPayment(actualPayment)) return false
    if (payment.status === "PAID") return payment
    payment.status = "PAID"
    console.info("결제 성공", actualPayment)
  } else {
    return false
  }
  return payment
}

function verifyPayment(payment:any) {
  if (payment.customData == null) return false
  const customData = JSON.parse(payment.customData)
  const item = items.get(customData.item)
  if (item == null) return false
  return (
    payment.orderName === item.name &&
    payment.amount.total === item.price &&
    payment.currency === item.currency
  )
}

app.post("/api/payment/webhook", async (req:any, res:any, next:any) => {
  try {
    let webhook
    try {
      webhook = await PortOne.Webhook.verify(
        process.env.V2_WEBHOOK_SECRET,
        req.body,
        req.headers,
      )
    } catch (e) {
      if (e instanceof PortOne.Webhook.WebhookVerificationError)
        return res.status(400).end()
      throw e
    }
    if ('data' in webhook && 'paymentId' in webhook.data)
      await syncPayment(webhook.data.paymentId)
    res.status(200).end()
  } catch (e) {
    next(e)
  }
})

const server = app.listen(8080, "localhost", () => {
  console.log("server is running on", server.address())
})