import QPAY, { config } from ".";
import { getToken } from "./auth";
import { axiosMasterMain } from "axios-master";

type invoiceIn1T = {
  invoice_code?: string;
  sender_invoice_no: string;
  sender_branch_code: string; //"branch";
  invoice_receiver_code: string; //"terminal";
  invoice_receiver_data: {
    register: string;
    name: string;
    email: string;
    phone: string | number;
  };
  invoice_description: string;
  enable_expiry?: boolean;
  invoice_due_date?: null | string;
  allow_partial: boolean;
  minimum_amount: null | string;
  allow_exceed: boolean;
  maximum_amount: null | string;
  note: null | string;
  amount: number;
  callback_url: string;
  sender_staff_code: string;
  tax_customer_code?: string;
  lines?: [
    {
      tax_product_code: string | number;
      line_description: string;
      line_quantity: string; //"1.00";
      line_unit_price: string | number; //"10000.00";
      note: string;
      discounts?: {
        discount_code: string;
        description: string;
        amount: number;
        note: string;
      }[];
      surcharges?: {
        surcharge_code: string;
        description: string;
        amount: number;
        note: string;
      }[];
      taxes?: {
        tax_code: string;
        description: string;
        amount: number;
        note: string;
      }[];
    }
  ];
};
type invoiceIn2T = {
  invoice_code?: string;
  sender_invoice_no: string;
  invoice_receiver_code: string;
  invoice_description: string;
  amount: number;
  callback_url: string;
};
type ResultT = {
  invoice_id: string;
  qr_text: string;
  qr_image: string;
  qPay_shortUrl: string;
  urls: {
    name: string; //"qPay wallet";
    description: string; // "qPay хэтэвч";
    logo: string; // "https://s3.qpay.mn/p/e9bbdc69-3544-4c2f-aff0-4c292bc094f6/launcher-icon-ios.jpg";
    link: string; // "qpaywallet://q?qPay_QRcode=0002010102121531279404962794049600240310507517027540014A00000084300010108TDBMMNUB0220000000000004750764705204737253034965405309005802MN5912BUYaNTOGTOKH6011ULAANBAATAR6264011393123298739480518Invoicedescription0721flPCV-Q-yrZ9wpPBO3oY47106QPP_QR781591748801082498179022280020163049D2B";
  }[];
};
type infoResT = {
  invoice_id: string;
  invoice_status: string; //"OPEN";
  sender_invoice_no: string;
  sender_branch_code: string | null;
  sender_branch_data: string | null;
  sender_staff_code: string | null;
  sender_staff_data: string | null;
  sender_terminal_code: string | null;
  sender_terminal_data: string | null;
  invoice_description: string;
  invoice_due_date: string | null;
  enable_expiry: false;
  expiry_date: string;
  allow_partial: false;
  minimum_amount: string | null;
  allow_exceed: false;
  maximum_amount: string | null;
  total_amount: string;
  gross_amount: number;
  tax_amount: number;
  surcharge_amount: number;
  discount_amount: number;
  callback_url: string;
  note: string | null;
  lines: {
    tax_product_code: string | null;
    line_description: string;
    line_quantity: string;
    line_unit_price: string;
    note: string;
    discounts: [];
    surcharges: [];
    taxes: [];
  }[];
  transactions: [];
  inputs: [];
  payments?: {
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

const CREATE = async (
  body: invoiceIn1T
): Promise<{
  success: boolean;
  message: string;
  data?: ResultT;
}> => {
  try {
    const res = await axiosMasterMain(
      {
        method: "POST",
        url: `${config.host}/v2/invoice`,
        data: { invoice_code: config.invoice_code, ...body },
        headers: {
          Authorization: `Bearer ${config.authInfo.access_token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken, // Function to refresh the token
        name: "CREATE Invoice",
        timeout: 20000,
        logger(data) {},
      }
    );

    if (res.invoice_id) {
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

const CREATE_SIMPLE = async (
  body: invoiceIn2T
): Promise<{
  success: boolean;
  message: string;
  data?: ResultT;
}> => {
  try {
    const res = await axiosMasterMain(
      {
        method: "POST",
        url: `${config.host}/v2/invoice`,
        data: { invoice_code: config.invoice_code, ...body },
        headers: {
          Authorization: `Bearer ${config.authInfo.access_token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken, // Function to refresh the token
        name: "CREATE SIMPLE Invoice",
        timeout: 20000,
        logger(data) {
          //  console.log(data);
        },
      }
    );
    if (res.invoice_id) {
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

const INFO = async (
  invoice_id: string
): Promise<{
  success: boolean;
  message: string;
  data?: infoResT;
}> => {
  try {
    const res = await axiosMasterMain(
      {
        method: "GET",
        url: `${config.host}/v2/invoice/${invoice_id}`,
        headers: {
          Authorization: `Bearer ${config.authInfo.access_token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken, // Function to refresh the token
        name: "INFO Invoice",
        timeout: 20000,
        logger(data) {},
      }
    );

    if (res.invoice_id) {
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

const CANCEL = async (
  invoice_id: string
): Promise<{
  success: boolean;
  message: string;
  data?: any;
}> => {
  try {
    const res = await axiosMasterMain(
      {
        method: "DELETE",
        url: `${config.host}/v2/invoice/${invoice_id}`,
        headers: {
          Authorization: `Bearer ${config.authInfo.access_token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken, // Function to refresh the token
        name: "CANCEL Invoice",
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

export default { CREATE, CREATE_SIMPLE, INFO, CANCEL };
