# QPay

A QPay payment-gateway client for Node.js and TypeScript — authenticate, manage invoices, check and refund payments, and issue eBarimt receipts.

## Install

```bash
npm i @togtokh.dev/qpay
```

## Features

- Authentication with access-token retrieval and token refresh (`auth.TOKEN`, `auth.REFRESH`).
- Invoice management — full and simplified invoice creation, lookup, and cancellation (`invoice.CREATE`, `invoice.CREATE_SIMPLE`, `invoice.INFO`, `invoice.CANCEL`).
- Payment operations — single-payment lookup, per-invoice payment checks, cancellation, and refunds (`payment.INFO`, `payment.CHECK`, `payment.CANCEL`, `payment.REFUND`).
- eBarimt receipt issuance for citizens and companies (`ebarimt.CREATE`).
- Shared `config` holding the host, invoice code, credentials, and the live auth session.
- Fully typed with TypeScript declarations; every method returns a uniform `Promise<{ success, message, data? }>` result.

## Quick start

```ts
import QPAY from "@togtokh.dev/qpay";

async function main() {
  // 1. Authenticate — stores the access token on the shared config.
  await QPAY.auth.TOKEN({
    username: "YOUR_USERNAME",
    password: "YOUR_PASSWORD",
    invoice_code: "YOUR_INVOICE_CODE",
  });

  // (optional) refresh the token later using the stored refresh token
  // await QPAY.auth.REFRESH();

  // 2. Create an invoice.
  const invoice = await QPAY.invoice.CREATE_SIMPLE({
    sender_invoice_no: "1234567",
    invoice_receiver_code: "83",
    invoice_description: "Order No1311 200.00",
    amount: 200,
    callback_url: "https://example.com/payments?payment_id=1234567",
  });

  if (!invoice.success) {
    throw new Error(invoice.message);
  }

  const invoiceId = invoice.data!.invoice_id;
  console.log("QR text:", invoice.data!.qr_text);
  console.log("Short URL:", invoice.data!.qPay_shortUrl);

  // 3. Check whether the invoice has been paid.
  const payment = await QPAY.payment.CHECK(invoiceId);
  console.log("Paid amount:", payment.data?.paid_amount);
}

main().catch(console.error);
```

## API

Every method is asynchronous and resolves to a `Response` object (see [Response](#response)).

### `auth`

| Method | Signature |
| --- | --- |
| `TOKEN` | `TOKEN(body: { username: string; password: string; invoice_code: string }): Promise<Response>` |
| `REFRESH` | `REFRESH(): Promise<Response>` |

- `TOKEN` — exchanges credentials for an access token and stores the session on `config.authInfo`.
- `REFRESH` — renews the access token using the stored refresh token (call `TOKEN` first).

### `invoice`

| Method | Signature |
| --- | --- |
| `CREATE` | `CREATE(body): Promise<Response<InvoiceData>>` |
| `CREATE_SIMPLE` | `CREATE_SIMPLE(body): Promise<Response<InvoiceData>>` |
| `INFO` | `INFO(invoice_id: string): Promise<Response<InvoiceInfo>>` |
| `CANCEL` | `CANCEL(invoice_id: string): Promise<Response>` |

`CREATE` body fields:

| Field | Type | Required |
| --- | --- | --- |
| `invoice_code` | `string` | optional |
| `sender_invoice_no` | `string` | required |
| `sender_branch_code` | `string` | required |
| `invoice_receiver_code` | `string` | required |
| `invoice_receiver_data` | `{ register: string; name: string; email: string; phone: string \| number }` | required |
| `invoice_description` | `string` | required |
| `enable_expiry` | `boolean` | optional |
| `invoice_due_date` | `string` | optional |
| `allow_partial` | `boolean` | required |
| `minimum_amount` | `string` | required |
| `allow_exceed` | `boolean` | required |
| `maximum_amount` | `string` | required |
| `note` | `string` | required |
| `amount` | `number` | required |
| `callback_url` | `string` | required |
| `sender_staff_code` | `string` | required |
| `tax_customer_code` | `string` | optional |
| `lines` | `Line[]` (one entry) with `tax_product_code`, `line_description`, `line_quantity`, `line_unit_price`, `note`, and optional `discounts` / `surcharges` / `taxes` arrays | optional |

`CREATE_SIMPLE` body fields:

| Field | Type | Required |
| --- | --- | --- |
| `invoice_code` | `string` | optional |
| `sender_invoice_no` | `string` | required |
| `invoice_receiver_code` | `string` | required |
| `invoice_description` | `string` | required |
| `amount` | `number` | required |
| `callback_url` | `string` | required |

Both `CREATE` and `CREATE_SIMPLE` resolve with `data` of shape `{ invoice_id, qr_text, qr_image, qPay_shortUrl, urls: { name, description, logo, link }[] }`.

`INFO(invoice_id)` resolves with the full invoice record (status, amounts, lines, transactions, and any `payments`). `CANCEL(invoice_id)` cancels the invoice.

### `payment`

| Method | Signature |
| --- | --- |
| `INFO` | `INFO(payment_id: string): Promise<Response<PaymentInfo>>` |
| `CHECK` | `CHECK(invoice_id: string): Promise<Response<PaymentList>>` |
| `CANCEL` | `CANCEL(invoice_id: string): Promise<Response<PaymentList>>` |
| `REFUND` | `REFUND(invoice_id: string): Promise<Response<PaymentList>>` |

- `INFO(payment_id)` — details of a single payment (`payment_id`, `payment_status`, `payment_amount`, `payment_currency`, `p2p_transactions`, etc.).
- `CHECK(invoice_id)` — lists payments for an invoice: `{ count, paid_amount, rows: Payment[] }`.
- `CANCEL(invoice_id)` — cancels payments for an invoice; resolves with the same `{ count, paid_amount, rows }` shape.
- `REFUND(invoice_id)` — refunds payments for an invoice; resolves with the same `{ count, paid_amount, rows }` shape.

### `ebarimt`

| Method | Signature |
| --- | --- |
| `CREATE` | `CREATE(body: { payment_id: string; ebarimt_receiver_type: "CITIZEN" \| "COMPAYNE"; ebarimt_receiver?: string }): Promise<Response<EbarimtData>>` |

Issues an eBarimt receipt for a completed payment. `data` contains the full eBarimt record, including `ebarimt_qr_data`, `ebarimt_lottery`, `amount`, `vat_amount`, and `barimt_status`.

### `config`

A shared, mutable configuration object (named export):

```ts
import { config } from "@togtokh.dev/qpay";
```

| Field | Type | Description |
| --- | --- | --- |
| `host` | `string` | Base URL of the QPay API. |
| `invoice_code` | `string` | Default invoice code used for requests. |
| `auth` | `{ username: string; password: string }` | Credentials set by `auth.TOKEN`. |
| `authInfo` | `authInfoT` | Live auth session: `token_type`, `access_token`, `refresh_token`, `expires_in`, `refresh_expires_in`, `scope`, `not-before-policy`, `session_state`. |

> The package also re-exports `invoice`, `payment`, and `ebarimt` as named exports, equivalent to the properties on the default export.

## Response

Every method resolves to a uniform result and never rejects on an API error — check `success` instead:

```ts
type Response<T = any> = {
  success: boolean;   // true when the API call succeeded
  message: string;    // human-readable status or error message
  data?: T;           // present on success; shape depends on the method
};
```

The `message` field carries the QPay status or error key (see the tables below); `data` is populated only when `success` is `true`.

## BANK CODE

|  №  | bank code |                English                 |         Монгол         |
| :-: | :-------: | :------------------------------------: | :--------------------: |
|  1  |  010000   |            Bank of Mongolia            |      Монгол банк       |
|  2  |  020000   |              Capital bank              |      Капитал банк      |
|  3  |  040000   | Trade and Development bank of Mongolia | Худалдаа хөгжлийн банк |
|  4  |  050000   |               Khan bank                |       Хаан банк        |
|  5  |  150000   |              Golomt bank               |      Голомт банк       |
|  6  |  190000   |               Trans bank               |  Тээвэр хөгжлийн банк  |
|  7  |  210000   |               Arig bank                |       Ариг банк        |
|  8  |  220000   |              Credit bank               |      Кредит банк       |
|  9  |  290000   |                NIB bank                |        ҮХО банк        |
| 10  |  300000   |             Capitron bank              |     Капитрон банк      |
| 11  |  320000   |                Xac bank                |        Хас банк        |
| 12  |  330000   |            Chingiskhan bank            |    Чингисхаан банк     |
| 13  |  340000   |               State bank               |      Төрийн банк       |
| 14  |  360000   |       National Development bank        |     Хөгжлийн банк      |
| 15  |  380000   |               Bogd bank                |       Богд банк        |
| 16  |  900000   |               State fund               |       Төрийн сан       |
| 17  |  990000   |              Mobi Finance              |       Мобифинанс       |
| 18  |  991000   |                 M bank                 |         М банк         |
| 20  |  993000   |               Invescore                |     Инвэскор ББСБ      |
| 21  |  100000   |               Test bank                |       Тест банк        |

## CURRENCY CODE

|  №  | currency_code |     Валют     |
| :-: | :-----------: | :-----------: |
|  1  |      MNT      |    Төгрөг     |
|  2  |      USD      | Америк доллар |
|  3  |      CNY      |     Юань      |
|  4  |      JPY      |      Иен      |
|  5  |      RUB      |     Рубль     |
|  6  |      EUR      |     Евро      |

## STATUS MESSAGE

| STATUS CODE |    Description     |                    Тайлбар                    |
| :---------: | :----------------: | :-------------------------------------------: |
|     200     |      SUCCESS       |                   Амжилттай                   |
|     400     |  VALIDATION_ERROR  |    Параметр буруу илгээсэн үед гарах алдаа    |
|     401     | UNAUTHORIZED_ERROR |       Нэвтрэлгүй дуудсан үед гарах алдаа       |
|     403     |  FORBIDDEN_ERROR   |      Хандах эрх хүрээгүй үед гарах алдаа      |
|     409     |    UNIQUE_ERROR    | Бүртгэлийн мэдээлэл давхацсан үед гарах алдаа |
|     422     |  NOT_FOUND_ERROR   |       Мэдээлэл олдоогүй үед гарах алдаа       |
|     500     |   INTERNAL_ERROR   |             Системийн дотоод алдаа             |

## ERROR MESSAGE

|                  KEY                   |                               MON                               |                          ENG                           |
| :------------------------------------: | :-------------------------------------------------------------: | :----------------------------------------------------: |
|        ACCOUNT_BANK_DUPLICATED         |                   Банкны данс давхацсан байна                   |          Bank account is already registered!           |
|       ACCOUNT_SELECTION_INVALID        |                      Дансны сонголт буруу                       |             Account selection is invalid!              |
|         AUTHENTICATION_FAILED          |                    Нэвтрэх нэр нууц үг буруу                    |         Your username and password are wrong!          |
|         BANK_ACCOUNT_NOTFOUND          |                      Банкны данс олдсонгүй                      |               Bank account is not found!               |
|         BANK_MCC_ALREADY_ADDED         |                Банкны MCC кодыг нэмчихсэн байна                 |               Bank MCC is already added!               |
|           BANK_MCC_NOT_FOUND           |                    Банкны MCC код олдсонгүй                     |                 Bank MCC is not found!                 |
|         CARD_TERMINAL_NOTFOUND         |                Картын терминал бүртгэлгүй байна                 |            Card terminal is not registered!            |
|            CLIENT_NOTFOUND             |                   Клиентийн бүртгэл олдсонгүй                   |               Client is not registered!                |
|       CLIENT_USERNAME_DUPLICATED       |              Клиентийн хэрэглэгчийн нэр давхацсан               |           Client username is already exist!            |
|           CUSTOMER_DUPLICATE           |         Харилцагчийн регистрийн дугаар давхацсан байна!         |             Customer register duplicated!              |
|           CUSTOMER_NOTFOUND            |                 Харилцагч бүртгэгдээгүй байна!                  |                Customer not registered!                |
|       CUSTOMER_REGISTER_INVALID        |               Харилцагч регистрийн дугаар байна!                |              Customer register is wrong!               |
|      EBARIMT_CANCEL_NOTSUPPERDED       |        qPay үйлчилгээ и-баримтыг цуцлах боломжгүй байна.        | qPay service eBarimt unregister function not supported |
|         EBARIMT_NOT_REGISTERED         |                    и-Баримт үүсээгүй байна.                     |                eBarimt not registered!                 |
|        EBARIMT_QR_CODE_INVALID         | Төлбөр хүлээн авагчийн илгээсэн и-баримт-ын QR код буруу байна. |          eBarimt QR code invalid by merchant           |
|            INFORM_NOTFOUND             |                   Мэдэгдэлийн хаяг олдсонгүй                    |                  Inform is not found!                  |
|         INPUT_CODE_REGISTERED          |                  Input code бүртгэгдсэн байна                   |           Input code is already registered!            |
|             INPUT_NOTFOUND             |                         Input олдсонгүй                         |              Input is already registered!              |
|             INVALID_AMOUNT             |                         Үнийн дүн буруу                         |                   Amount is invalid!                   |
|          INVALID_OBJECT_TYPE           |                        object_type буруу                        |                Object type is invalid!                 |
|        INVOICE_ALREADY_CANCELED        |                   Нэхэмжлэл цуцлагдсан байна                    |             Invoice is already cancelled!              |
|          INVOICE_CODE_INVALID          |                     Нэхэмжлэлийн код буруу                      |                 Invoice code is wrong!                 |
|        INVOICE_CODE_REGISTERED         |               Нэхэмжлэлийн код бүртгэгдсэн байна                |          Invoice code is already registered!           |
|         INVOICE_LINE_REQUIRED          |                  Нэхэмжлэлийн мөр шаардлагатай                  |               Invoice line is required!                |
|            INVOICE_NOTFOUND            |                       Нэхэмжлэл олдсонгүй                       |                 Invoice is not found!                  |
|              INVOICE_PAID              |                       Нэхэмжлэл төлөгдсөн                       |                    Invoice is paid!                    |
| INVOICE_RECEIVER_DATA_ADDRESS_REQUIRED |     Нэхэмжлэл хүлээн авагчийн хаягийн мэдээлэл шаардлагатай     |         Invoice receiver address is required!          |
|  INVOICE_RECEIVER_DATA_EMAIL_REQUIRED  |        Нэхэмжлэл хүлээн авагчийн имэйл хаяг шаардлагатай        |          Invoice receiver email is required!           |
|  INVOICE_RECEIVER_DATA_PHONE_REQUIRED  |      Нэхэмжлэл хүлээн авагчийн утасны дугаар шаардлагатай       |          Invoice receiver phone is required!           |
|     INVOICE_RECEIVER_DATA_REQUIRED     |         Нэхэмжлэл хүлээн авагчийн мэдээлэл шаардлагатай         |           Invoice receiver data is required!           |
|             MAX_AMOUNT_ERR             |                     Үнийн дүн хэт их байна                      |             Amount is over than max value!             |
|              MCC_NOTFOUND              |                        MCC код олдсонгүй                        |                   MCC is not found!                    |
|      MERCHANT_ALREADY_REGISTERED       |                   Мерчантын бүртгэл давхацсан                   |            Merchant is already registered!             |
|           MERCHANT_INACTIVE            |                        Мерчант идэвхигүй                        |                 Merchant is inactive!                  |
|           MERCHANT_NOTFOUND            |                    Мерчант бүртгэлгүй байна                     |              Merchant is not registered!               |
|             MIN_AMOUNT_ERR             |                    Үнийн дүн хэт бага байна                     |           Amount is less than minimum value!           |
|             NO_CREDENDIALS             |                Хандах эрхгүй байна. Нэвтрэнэ үү.                |       Your credential is invalid. Please login!        |
|           OBJECT_DATA_ERROR            |                        object_data алдаа                        |                 Object data is wrong!                  |
|         P2P_TERMINAL_NOTFOUND          |                  P2P терминал бүртгэлгүй байна                  |            P2P terminal is not registered!             |
|        PAYMENT_ALREADY_CANCELED        |                     Төлбөр цуцлагдсан байна                     |             Payment is already cancelled!              |
|            PAYMENT_NOT_PAID            |                 Төлбөр төлөлт хийгдээгүй байна                  |                 Payment has not paid!                  |
|            PAYMENT_NOTFOUND            |                        Төлбөр олдсонгүй                         |                 Payment is not found!                  |
|           PERMISSION_DENIED            |                    Хандах эрх хүрэхгүй байна                    |         Your access permission is not allowed!         |
|           QRACCOUNT_INACTIVE           |                        QR данс идэвхигүй                        |                QR account is inactive!                 |
|           QRACCOUNT_NOTFOUND           |                        QR данс олдсонгүй                        |                QR account is not found!                |
|            QRCODE_NOTFOUND             |                        QR код олдсонгүй                         |                 QR code is not found!                  |
|              QRCODE_USED               |                     QR код ашиглагдаж байна                     |                QR code is already used!                |
|      SENDER_BRANCH_DATA_REQUIRED       |            Илгээгчийн салбарын мэдээлэл шаардлагатай            |            Sender branch data is required!             |
|           TAX_LINE_REQUIRED            |                    Татварын мөр шаардлагатай                    |                 Tax line is required!                  |
|       TAX_PRODUCT_CODE_REQUIRED        |            Татварын бүтээгдэхүүний код шаардлагатай             |             Tax product code is required!              |
|        TRANSACTION_NOT_APPROVED        |              Гүйлгээний мөр зөвшөөрөгдөөгүй байна               |           Transaction line is not approved!            |
|          TRANSACTION_REQUIRED          |                Гүйлгээний мөр шаардлагатай байна                |             Transaction line is required!              |

## License

ISC
