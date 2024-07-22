import QPAY from "../src/index";
import { payment, invoice } from "../src/index";
QPAY.auth
  .TOKEN({
    username: "TOGTOKH_DEV",
    password: "fAjEuRCa",
    invoice_code: "TOGTOKH_DEV_INVOICE",
  })
  .then(async (r) => {
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
    // // // //d58a2b45-25a6-4a42-8061-b3700387405b
    // // console.log(invoice);
    // const payemnt = await QPAY.payment.CHECK(`${invoice.data?.invoice_id}`);
    // console.log(payemnt.data?.rows);
    //496237254784964
    // const ebarimt = await QPAY.ebarimt.CREATE({
    //   payment_id: "496237254784964",
    //   ebarimt_receiver_type: "CITIZEN",
    // });
    // console.log(ebarimt);
  })
  .catch((e) => {
    console.log(e);
  });
