"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const _1 = require("./");
const TOKEN = async (body) => {
    var _a, _b, _c;
    try {
        _1.default.invoice_code = body.invoice_code;
        const res = await axios_1.default.post(`${_1.default.host}/v2/auth/token`, {}, {
            headers: {
                Authorization: `Basic ${Buffer.from(body.username + ":" + body.password).toString("base64")}`,
            },
        });
        const tokenRes = res.data;
        if (tokenRes.access_token) {
            console.log("SUCCESS");
            _1.default.authInfo = tokenRes;
            return {
                success: true,
                message: "success",
            };
        }
        else {
            console.log("FAILED", tokenRes);
            return {
                success: false,
                message: tokenRes.message,
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
const REFRESH = async () => {
    var _a, _b, _c;
    try {
        const res = await axios_1.default.post(`${_1.default.host}/v2/auth/refresh`, {}, {
            headers: {
                Authorization: `Bearer ${_1.default.authInfo.refresh_token}`,
            },
        });
        const tokenRes = res.data;
        if (tokenRes.access_token) {
            console.log("SUCCESS");
            _1.default.authInfo = tokenRes;
            return {
                success: true,
                message: "success",
            };
        }
        else {
            console.log("FAILED", tokenRes);
            return {
                success: false,
                message: tokenRes.message,
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
exports.default = { TOKEN, REFRESH };
