type PaymentInfoResT = {
    payment_id: string;
    payment_status: string;
    payment_fee: string;
    payment_amount: string;
    payment_currency: string;
    payment_date: string;
    payment_wallet: string;
    object_type: string;
    object_id: string;
    next_payment_date: null | string;
    next_payment_datetime: null | string;
    transaction_type: string;
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
declare const _default: {
    INFO: (payment_id: string) => Promise<{
        success: boolean;
        message: string;
        data?: PaymentInfoResT;
    }>;
    CHECK: (invoice_id: string) => Promise<{
        success: boolean;
        message: string;
        data?: PaymentCheckResT;
    }>;
    CANCEL: (invoice_id: string) => Promise<{
        success: boolean;
        message: string;
        data?: PaymentCheckResT;
    }>;
    REFUND: (invoice_id: string) => Promise<{
        success: boolean;
        message: string;
        data?: PaymentCheckResT;
    }>;
};
export default _default;
