"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const auth_1 = require("./auth");
const axios_master_1 = require("axios-master");
const INFO = async (payment_id) => {
    var _a, _b, _c;
    try {
        const res = await (0, axios_master_1.axiosMasterMain)({
            method: "GET",
            url: `${_1.config.host}/v2/payment/${payment_id}`,
            headers: {
                Authorization: `Bearer ${_1.config.authInfo.access_token}`,
                "Content-Type": "application/json",
            },
        }, {
            shouldRetry: true,
            shouldRetryStatus: [400, 401],
            retryFunction: auth_1.getToken, // Function to refresh the token
            name: "INFO Payment",
            timeout: 20000,
            logger(data) { },
        });
        if (res.payment_id) {
            return {
                success: true,
                message: "success",
                data: res,
            };
        }
        else {
            console.log("FAILED", res);
            return {
                success: false,
                message: "",
            };
        }
    }
    catch (error) {
        console.log("FAILED", (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data);
        return {
            success: false,
            message: ((_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || "error",
        };
    }
};
const CHECK = async (invoice_id) => {
    var _a, _b, _c;
    try {
        const res = await (0, axios_master_1.axiosMasterMain)({
            method: "POST",
            url: `${_1.config.host}/v2/payment/check`,
            data: {
                object_type: "INVOICE",
                object_id: invoice_id,
                offset: {
                    page_number: 1,
                    page_limit: 100,
                },
            },
            headers: {
                Authorization: `Bearer ${_1.config.authInfo.access_token}`,
                "Content-Type": "application/json",
            },
        }, {
            shouldRetry: true,
            shouldRetryStatus: [400, 401],
            retryFunction: auth_1.getToken, // Function to refresh the token
            name: "CHECK Payment",
            timeout: 20000,
            logger(data) { },
        });
        const result = res;
        if (result.rows) {
            if (result.count > 0) {
                return {
                    success: true,
                    message: "Төлөгдсөн",
                    data: res,
                };
            }
            else {
                return {
                    success: false,
                    message: "Төлбөр хүлээгдэж байна",
                    data: res,
                };
            }
        }
        else {
            return {
                success: false,
                message: "Төлбөр хүлээгдэж байна",
                data: res,
            };
        }
    }
    catch (error) {
        console.log("FAILED", (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data);
        return {
            success: false,
            message: ((_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || "error",
        };
    }
};
const CANCEL = async (invoice_id) => {
    var _a, _b, _c;
    try {
        const res = await (0, axios_master_1.axiosMasterMain)({
            method: "DELETE",
            url: `${_1.config.host}/v2/payment/cancel/${invoice_id}`,
            headers: {
                Authorization: `Bearer ${_1.config.authInfo.access_token}`,
                "Content-Type": "application/json",
            },
        }, {
            shouldRetry: true,
            shouldRetryStatus: [400, 401],
            retryFunction: auth_1.getToken, // Function to refresh the token
            name: "CANCEL Payment",
            timeout: 20000,
            logger(data) { },
        });
        if (res) {
            return {
                success: true,
                message: "success",
                data: res,
            };
        }
        else {
            return {
                success: false,
                message: "",
                data: res,
            };
        }
    }
    catch (error) {
        console.log("FAILED", (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data);
        return {
            success: false,
            message: ((_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || "error",
        };
    }
};
const REFUND = async (invoice_id) => {
    var _a, _b, _c;
    try {
        const res = await (0, axios_master_1.axiosMasterMain)({
            method: "DELETE",
            url: `${_1.config.host}/v2/payment/refund/${invoice_id}`,
            headers: {
                Authorization: `Bearer ${_1.config.authInfo.access_token}`,
                "Content-Type": "application/json",
            },
        }, {
            shouldRetry: true,
            shouldRetryStatus: [400, 401],
            retryFunction: auth_1.getToken, // Function to refresh the token
            name: "REFUND Payment",
            timeout: 20000,
            logger(data) { },
        });
        if (res) {
            return {
                success: true,
                message: "success",
                data: res,
            };
        }
        else {
            return {
                success: false,
                message: "",
                data: res,
            };
        }
    }
    catch (error) {
        console.log("FAILED", (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data);
        return {
            success: false,
            message: ((_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || "error",
        };
    }
};
exports.default = { INFO, CHECK, CANCEL, REFUND };
