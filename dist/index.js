"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./auth");
const host = "https://merchant.qpay.mn";
let invoice_code = "";
let authInfo = {
    token_type: "",
    refresh_expires_in: 1,
    refresh_token: "",
    access_token: "",
    expires_in: 1,
    scope: "",
    "not-before-policy": "",
    session_state: "",
};
exports.default = { invoice_code, host, authInfo, auth: auth_1.default };
