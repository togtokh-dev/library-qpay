"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const _1 = require(".");
const INFO = async (payment_id) => {
    var _a, _b, _c;
    try {
        const res = await axios_1.default.get(`${_1.default.host}/v2/payment/${payment_id}`, {
            headers: {
                Authorization: `Bearer ${_1.default.authInfo.access_token}`,
            },
        });
        if (res.data.payment_id) {
            return {
                success: true,
                message: "success",
                data: res.data,
            };
        }
        else {
            console.log("FAILED", res.data);
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
        const res = await axios_1.default.post(`${_1.default.host}/v2/payment/check`, {
            object_type: "INVOICE",
            object_id: invoice_id,
            offset: {
                page_number: 1,
                page_limit: 100,
            },
        }, {
            headers: {
                Authorization: `Bearer ${_1.default.authInfo.access_token}`,
            },
        });
        const result = res.data;
        if (result.rows) {
            if (result.count > 0) {
                return {
                    success: true,
                    message: "Төлөгдсөн",
                    data: res.data,
                };
            }
            else {
                return {
                    success: false,
                    message: "Төлбөр хүлээгдэж байна",
                    data: res.data,
                };
            }
        }
        else {
            return {
                success: false,
                message: "Төлбөр хүлээгдэж байна",
                data: res.data,
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
        const res = await axios_1.default.delete(`${_1.default.host}/v2/payment/cancel/${invoice_id}`, {
            headers: {
                Authorization: `Bearer ${_1.default.authInfo.access_token}`,
            },
        });
        if (res.data) {
            return {
                success: true,
                message: "success",
                data: res.data,
            };
        }
        else {
            return {
                success: false,
                message: "",
                data: res.data,
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
        const res = await axios_1.default.delete(`${_1.default.host}/v2/payment/refund/${invoice_id}`, {
            headers: {
                Authorization: `Bearer ${_1.default.authInfo.access_token}`,
            },
        });
        if (res.data) {
            return {
                success: true,
                message: "success",
                data: res.data,
            };
        }
        else {
            return {
                success: false,
                message: "",
                data: res.data,
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
