type invoiceIn1T = {
    invoice_code?: string;
    sender_invoice_no: string;
    sender_branch_code: string;
    invoice_receiver_code: string;
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
            line_quantity: string;
            line_unit_price: string | number;
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
        name: string;
        description: string;
        logo: string;
        link: string;
    }[];
};
type infoResT = {
    invoice_id: string;
    invoice_status: string;
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
declare const _default: {
    CREATE: (body: invoiceIn1T) => Promise<{
        success: boolean;
        message: string;
        data?: ResultT;
    }>;
    CREATE_SIMPLE: (body: invoiceIn2T) => Promise<{
        success: boolean;
        message: string;
        data?: ResultT;
    }>;
    INFO: (invoice_id: string) => Promise<{
        success: boolean;
        message: string;
        data?: infoResT;
    }>;
    CANCEL: (invoice_id: string) => Promise<{
        success: boolean;
        message: string;
        data?: any;
    }>;
};
export default _default;
