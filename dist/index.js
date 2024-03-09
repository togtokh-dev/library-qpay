"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payment = exports.invoice = void 0;
const auth_1 = require("./auth");
const invoice_1 = require("./invoice");
const payment_1 = require("./payment");
const host = "https://merchant.qpay.mn"; //https://merchant-sandbox.qpay.mn
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
exports.default = { invoice_code, host, authInfo, auth: auth_1.default, invoice: invoice_1.default, payment: payment_1.default };
var invoice_2 = require("./invoice");
Object.defineProperty(exports, "invoice", { enumerable: true, get: function () { return invoice_2.default; } });
var payment_2 = require("./payment");
Object.defineProperty(exports, "payment", { enumerable: true, get: function () { return payment_2.default; } });
