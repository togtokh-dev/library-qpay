import axios from "axios";
import QPAY from ".";

const INFO = async (
  payment_id: string
): Promise<{
  success: boolean;
  message: string;
  data?: PaymentInfoResT;
}> => {
  try {
    const res = await axios.get(`${QPAY.host}/v2/payment/${payment_id}`, {
      headers: {
        Authorization: `Bearer ${QPAY.authInfo.access_token}`,
      },
    });
    if (res.data.payment_id) {
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
const CHECK = async (
  invoice_id: string
): Promise<{
  success: boolean;
  message: string;
  data?: PaymentCheckResT;
}> => {
  try {
    const res = await axios.post(
      `${QPAY.host}/v2/payment/check`,
      {
        object_type: "INVOICE",
        object_id: invoice_id,
        offset: {
          page_number: 1,
          page_limit: 100,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${QPAY.authInfo.access_token}`,
        },
      }
    );
    const result: PaymentCheckResT = res.data;
    if (result.rows) {
      if (result.count > 0) {
        return {
          success: true,
          message: "Төлөгдсөн",
          data: res.data,
        };
      } else {
        return {
          success: false,
          message: "Төлбөр хүлээгдэж байна",
          data: res.data,
        };
      }
    } else {
      return {
        success: false,
        message: "Төлбөр хүлээгдэж байна",
        data: res.data,
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
  data?: PaymentCheckResT;
}> => {
  try {
    const res = await axios.delete(
      `${QPAY.host}/v2/payment/cancel/${invoice_id}`,
      {
        headers: {
          Authorization: `Bearer ${QPAY.authInfo.access_token}`,
        },
      }
    );
    if (res.data) {
      return {
        success: true,
        message: "success",
        data: res.data,
      };
    } else {
      return {
        success: false,
        message: "",
        data: res.data,
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
const REFUND = async (
  invoice_id: string
): Promise<{
  success: boolean;
  message: string;
  data?: PaymentCheckResT;
}> => {
  try {
    const res = await axios.delete(
      `${QPAY.host}/v2/payment/refund/${invoice_id}`,
      {
        headers: {
          Authorization: `Bearer ${QPAY.authInfo.access_token}`,
        },
      }
    );
    if (res.data) {
      return {
        success: true,
        message: "success",
        data: res.data,
      };
    } else {
      return {
        success: false,
        message: "",
        data: res.data,
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
export default { INFO, CHECK, CANCEL, REFUND };
