import QPAY from "../src/index";

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
