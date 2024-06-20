import QPAY from "../src/index";
import { payment, invoice } from "../src/index";
QPAY.auth
  .TOKEN({
    username: "TOGTOKH_DEV",
    password: "fAjEuRCa",
    invoice_code: "TOGTOKH_DEV_INVOICE",
  })
  .then(async (r) => {
    // const invoice = await QPAY.invoice.CREATE_SIMPLE({
    //   sender_invoice_no: "test1",
    //   invoice_receiver_code: "123",
    //   invoice_description: "2131111",
    //   amount: 200,
    //   callback_url: "",
    // });
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
