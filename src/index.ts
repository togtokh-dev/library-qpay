import auth from "./auth";
import invoice from "./invoice";
import payment from "./payment";
const host = "https://merchant.qpay.mn"; //https://merchant-sandbox.qpay.mn
let invoice_code = "";
let authInfo: authInfoT = {
  token_type: "",
  refresh_expires_in: 1,
  refresh_token: "",
  access_token: "",
  expires_in: 1,
  scope: "",
  "not-before-policy": "",
  session_state: "",
};
export default { invoice_code, host, authInfo, auth, invoice, payment };
export { default as invoice } from "./invoice";
export { default as payment } from "./payment";
