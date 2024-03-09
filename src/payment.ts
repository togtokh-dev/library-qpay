import axios from "axios";
import QPAY from ".";

const CREATE = async (
  body: invoiceIn1T
): Promise<{
  success: boolean;
  message: string;
  data?: ResultT;
}> => {
  try {
    const res = await axios.post(
      `${QPAY.host}/v2/invoice`,
      { invoice_code: QPAY.invoice_code, ...body },
      {
        headers: {
          Authorization: `Bearer ${QPAY.authInfo.access_token}`,
        },
      }
    );
    if (res.data.invoice_id) {
      return {
        success: true,
        message: "success",
        data: res.data,
      };
    } else {
      console.log("FAILED", res.data);
      return {
        success: false,
        message: "",
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
const CREATE_SIMPLE = async (
  body: invoiceIn2T
): Promise<{
  success: boolean;
  message: string;
  data?: ResultT;
}> => {
  try {
    const res = await axios.post(
      `${QPAY.host}/v2/invoice`,
      { invoice_code: QPAY.invoice_code, ...body },
      {
        headers: {
          Authorization: `Bearer ${QPAY.authInfo.access_token}`,
        },
      }
    );
    if (res.data.invoice_id) {
      return {
        success: true,
        message: "success",
        data: res.data,
      };
    } else {
      console.log("FAILED", res.data);
      return {
        success: false,
        message: "",
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
const INFO = async (
  invoice_id: string
): Promise<{
  success: boolean;
  message: string;
  data?: infoResT;
}> => {
  try {
    const res = await axios.get(`${QPAY.host}/v2/invoice/${invoice_id}`, {
      headers: {
        Authorization: `Bearer ${QPAY.authInfo.access_token}`,
      },
    });
    if (res.data.invoice_id) {
      return {
        success: true,
        message: "success",
        data: res.data,
      };
    } else {
      console.log("FAILED", res.data);
      return {
        success: false,
        message: "",
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
const CANCEL = async (
  invoice_id: string
): Promise<{
  success: boolean;
  message: string;
  data?: any;
}> => {
  try {
    const res = await axios.delete(`${QPAY.host}/v2/invoice/${invoice_id}`, {
      headers: {
        Authorization: `Bearer ${QPAY.authInfo.access_token}`,
      },
    });
    if (res.data) {
      return {
        success: true,
        message: "success",
        data: res.data,
      };
    } else {
      console.log("FAILED", res.data);
      return {
        success: false,
        message: "",
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
export default { CREATE, CREATE_SIMPLE, INFO, CANCEL };
