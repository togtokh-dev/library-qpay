import auth from "./auth";

const host = "https://merchant.qpay.mn";
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
export default { invoice_code, host, authInfo, auth };
