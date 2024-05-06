"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const _1 = require(".");
const CREATE = async (body) => {
    var _a, _b, _c;
    try {
        const res = await axios_1.default.post(`${_1.default.host}/v2/ebarimt/create`, body, {
            headers: {
                Authorization: `Bearer ${_1.default.authInfo.access_token}`,
            },
        });
        if (res.data.status) {
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
exports.default = { CREATE };
