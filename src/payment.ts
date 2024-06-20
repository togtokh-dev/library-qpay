import QPAY, { config } from ".";
import { getToken } from "./auth";
import { axiosMasterMain } from "axios-master";

type PaymentInfoResT = {
  payment_id: string;
  payment_status: string; //"PAID";
  payment_fee: string;
  payment_amount: string;
  payment_currency: string;
  payment_date: string;
  payment_wallet: string;
  object_type: string; //"INVOICE";
  object_id: string;
  next_payment_date: null | string;
  next_payment_datetime: null | string;
  transaction_type: string; //"P2P";
  card_transactions: any[];
  p2p_transactions: {
    id: string;
    transaction_bank_code: string;
    account_bank_code: string;
    account_bank_name: string;
    account_number: string;
    status: string;
    amount: string;
    currency: string;
    settlement_status: string;
  }[];
};

type PaymentCheckResT = {
  count: number;
  paid_amount: number;
  rows: {
    payment_id: string;
    payment_status: string;
    payment_amount: string;
    trx_fee: string;
    payment_currency: string;
    payment_wallet: string;
    payment_type: string;
    next_payment_date: null | string;
    next_payment_datetime: null | string;
    card_transactions: [];
    p2p_transactions: {
      id: string;
      transaction_bank_code: string;
      account_bank_code: string;
      account_bank_name: string;
      account_number: string;
      status: string;
      amount: string;
      currency: string;
      settlement_status: string;
    }[];
  }[];
};

const INFO = async (
  payment_id: string
): Promise<{
  success: boolean;
  message: string;
  data?: PaymentInfoResT;
}> => {
  try {
    const res = await axiosMasterMain(
      {
        method: "GET",
        url: `${config.host}/v2/payment/${payment_id}`,
        headers: {
          Authorization: `Bearer ${config.authInfo.access_token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken, // Function to refresh the token
        name: "INFO Payment",
        timeout: 20000,
        logger(data) {},
      }
    );

    if (res.payment_id) {
      return {
        success: true,
        message: "success",
        data: res,
      };
    } else {
      console.log("FAILED", res);
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
    const res = await axiosMasterMain(
      {
        method: "POST",
        url: `${config.host}/v2/payment/check`,
        data: {
          object_type: "INVOICE",
          object_id: invoice_id,
          offset: {
            page_number: 1,
            page_limit: 100,
          },
        },
        headers: {
          Authorization: `Bearer ${config.authInfo.access_token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken, // Function to refresh the token
        name: "CHECK Payment",
        timeout: 20000,
        logger(data) {},
      }
    );

    const result: PaymentCheckResT = res;
    if (result.rows) {
      if (result.count > 0) {
        return {
          success: true,
          message: "Төлөгдсөн",
          data: res,
        };
      } else {
        return {
          success: false,
          message: "Төлбөр хүлээгдэж байна",
          data: res,
        };
      }
    } else {
      return {
        success: false,
        message: "Төлбөр хүлээгдэж байна",
        data: res,
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
    const res = await axiosMasterMain(
      {
        method: "DELETE",
        url: `${config.host}/v2/payment/cancel/${invoice_id}`,
        headers: {
          Authorization: `Bearer ${config.authInfo.access_token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken, // Function to refresh the token
        name: "CANCEL Payment",
        timeout: 20000,
        logger(data) {},
      }
    );

    if (res) {
      return {
        success: true,
        message: "success",
        data: res,
      };
    } else {
      return {
        success: false,
        message: "",
        data: res,
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
    const res = await axiosMasterMain(
      {
        method: "DELETE",
        url: `${config.host}/v2/payment/refund/${invoice_id}`,
        headers: {
          Authorization: `Bearer ${config.authInfo.access_token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken, // Function to refresh the token
        name: "REFUND Payment",
        timeout: 20000,
        logger(data) {},
      }
    );

    if (res) {
      return {
        success: true,
        message: "success",
        data: res,
      };
    } else {
      return {
        success: false,
        message: "",
        data: res,
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
