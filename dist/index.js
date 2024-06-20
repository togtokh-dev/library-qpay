"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ebarimt = exports.payment = exports.invoice = exports.config = void 0;
const auth_1 = require("./auth");
const invoice_1 = require("./invoice");
const payment_1 = require("./payment");
const ebarimt_1 = require("./ebarimt");
exports.config = {
    invoice_code: "",
    host: "https://merchant.qpay.mn",
    authInfo: {
        token_type: "",
        refresh_expires_in: 1,
        refresh_token: "",
        access_token: "",
        expires_in: 1,
        scope: "",
        "not-before-policy": "",
        session_state: "",
    },
    auth: {
        username: "", // username
        password: "", // password
    },
};
exports.default = {
    auth: auth_1.default,
    invoice: invoice_1.default,
    payment: payment_1.default,
    ebarimt: ebarimt_1.default,
};
var invoice_2 = require("./invoice");
Object.defineProperty(exports, "invoice", { enumerable: true, get: function () { return invoice_2.default; } });
var payment_2 = require("./payment");
Object.defineProperty(exports, "payment", { enumerable: true, get: function () { return payment_2.default; } });
var ebarimt_2 = require("./ebarimt");
Object.defineProperty(exports, "ebarimt", { enumerable: true, get: function () { return ebarimt_2.default; } });
