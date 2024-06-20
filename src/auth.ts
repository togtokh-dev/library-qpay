import axios from "axios";
import QPAY, { config } from "./";
type AuthResT = {
  token_type: string;
  refresh_expires_in: number;
  refresh_token: string;
  access_token: string;
  expires_in: number;
  scope: string;
  "not-before-policy": string;
  session_state: string;
  message?: string;
};

const TOKEN = async (body: {
  username: string;
  password: string;
  invoice_code: string;
}): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    config.invoice_code = body.invoice_code;
    const res = await axios.post(
      `${config.host}/v2/auth/token`,
      {},
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            body.username + ":" + body.password
          ).toString("base64")}`,
        },
      }
    );
    const tokenRes: AuthResT = res.data;
    if (tokenRes.access_token) {
      config.auth.username = body.username;
      config.auth.password = body.password;
      console.log("SUCCESS");
      config.authInfo = tokenRes;
      return {
        success: true,
        message: "success",
      };
    } else {
      console.log("FAILED", tokenRes);
      return {
        success: false,
        message: tokenRes.message,
      };
    }
  } catch (error) {
    console.log("FAILED", error?.response?.data);
    return {
      success: false,
      message: error?.response?.data?.message || "error",
    };
  }
};
const REFRESH = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const res = await axios.post(
      `${config.host}/v2/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${config.authInfo.refresh_token}`,
        },
      }
    );
    const tokenRes: AuthResT = res.data;
    if (tokenRes.access_token) {
      console.log("SUCCESS");
      config.authInfo = tokenRes;
      return {
        success: true,
        message: "success",
      };
    } else {
      console.log("FAILED", tokenRes);
      return {
        success: false,
        message: tokenRes.message,
      };
    }
  } catch (error) {
    console.log("FAILED", error?.response?.data);
    return {
      success: false,
      message: error?.response?.data?.message || "error",
    };
  }
};
export const getToken = async (): Promise<string> => {
  try {
    const res = await axios.post(
      `${config.host}/v2/auth/token`,
      {},
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            config.auth.username + ":" + config.auth.password
          ).toString("base64")}`,
        },
      }
    );
    const tokenRes: AuthResT = res.data;
    if (tokenRes.access_token) {
      config.authInfo = tokenRes;
      return tokenRes.access_token;
    } else {
      console.log("FAILED", tokenRes);
      return "";
    }
  } catch (error) {
    console.log("FAILED", error?.response?.data);
    return "";
  }
};
export default { TOKEN, REFRESH };
