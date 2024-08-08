# QPAY

![Alt text](https://developer.qpay.mn/intro.png)

## Example

```bash
    import QPAY from "@togtokh.dev/qpay";

    QPAY.auth
      .TOKEN({
        username: "TOGTOKH_DEV",
        password: "fAjEuRCa",
        invoice_code: "TOGTOKH_DEV_INVOICE",
      })
      .then(async (r) => {
        console.log(QPAY.authInfo);
        await QPAY.auth.REFRESH();
        console.log(QPAY.authInfo);
      })
      .catch((e) => {
        console.log(e);
      });

```

```bash

      const invoice = await QPAY.invoice.CREATE({
      invoice_code: "TEST_INVOICE",
      sender_invoice_no: "123455678",
      invoice_receiver_code: "83",
      sender_branch_code: "BRANCH1",
      invoice_description: "Order No1311 200.00",
      enable_expiry: false,
      allow_partial: false,
      minimum_amount: null,
      allow_exceed: false,
      maximum_amount: null,
      amount: 200,
      callback_url:
        "https://bd5492c3ee85.ngrok.io/payments?payment_id=12345678",
      sender_staff_code: "online",
      note: null,
      invoice_receiver_data: {
        register: "UZ96021105",
        name: "Ganzul",
        email: "test@gmail.com",
        phone: "88614450",
      },
      lines: [
        {
          tax_product_code: "6401",
          line_description: " Order No1311 200.00 .",
          line_quantity: "1.00",
          line_unit_price: "200.00",
          note: "-.",
          discounts: [
            {
              discount_code: "NONE",
              description: " discounts",
              amount: 10,
              note: " discounts",
            },
          ],
          surcharges: [
            {
              surcharge_code: "NONE",
              description: "Хүргэлтийн зардал",
              amount: 10,
              note: " Хүргэлт",
            },
          ],
          taxes: [
            {
              tax_code: "VAT",
              description: "НӨАТ",
              amount: 20,
              note: " НӨАТ",
            },
          ],
        },
      ],
    });

```

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
|     401     | UNAUTHORIZED_ERROR |      Нэвтрэлгүй дуудсан үед гарах алдаа       |
|     403     |  FORBIDDEN_ERROR   |      Хандах эрх хүрээгүй үед гарах алдаа      |
|     409     |    UNIQUE_ERROR    | Бүртгэлийн мэдээлэл давхацсан үед гарах алдаа |
|     422     |  NOT_FOUND_ERROR   |       Мэдээлэл олдоогүй үед гарах алдаа       |
|     500     |   INTERNAL_ERROR   |            Системийн дотоод алдаа             |

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
