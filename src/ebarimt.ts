import axios from "axios";
import QPAY from ".";
type EbarimtResT = {
  id: string;
  ebarimt_by: "QPAY";
  g_wallet_id: string;
  g_wallet_customer_id: string;
  ebarimt_receiver_type: string;
  ebarimt_receiver: string;
  ebarimt_district_code: string;
  ebarimt_bill_type: string;
  g_merchant_id: string;
  merchant_branch_code: string;
  merchant_terminal_code: string;
  merchant_staff_code: string;
  merchant_register_no: string;
  g_payment_id: string;
  paid_by: string;
  object_type: string;
  object_id: string;
  amount: string;
  vat_amount: string;
  city_tax_amount: string;
  ebarimt_qr_data: string;
  ebarimt_lottery: string;
  note: string;
  barimt_status: string;
  barimt_status_date: string;
  ebarimt_sent_email: string;
  ebarimt_receiver_phone: string;
  tax_type: string;
  created_by: string;
  created_date: string;
  updated_by: string;
  updated_date: string;
  status: boolean;
};

const CREATE = async (body: {
  payment_id: string;
  ebarimt_receiver_type: "CITIZEN" | "COMPAYNE";
  ebarimt_receiver?: string;
}): Promise<{
  success: boolean;
  message: string;
  data?: EbarimtResT;
}> => {
  try {
    const res = await axios.post(`${QPAY.host}/v2/ebarimt/create`, body, {
      headers: {
        Authorization: `Bearer ${QPAY.authInfo.access_token}`,
      },
    });
    if (res.data.status) {
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

export default { CREATE };
