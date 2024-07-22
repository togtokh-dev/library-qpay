type authInfoT = {
    token_type: string;
    refresh_expires_in: number;
    refresh_token: string;
    access_token: string;
    expires_in: number;
    scope: string;
    "not-before-policy": string;
    session_state: string;
};
export declare const config: {
    invoice_code: string;
    host: string;
    authInfo: authInfoT;
    auth: {
        username: string;
        password: string;
    };
};
declare const _default: {
    auth: {
        TOKEN: (body: {
            username: string;
            password: string;
            invoice_code: string;
        }) => Promise<{
            success: boolean;
            message: string;
        }>;
        REFRESH: () => Promise<{
            success: boolean;
            message: string;
        }>;
    };
    invoice: {
        CREATE: (body: {
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
            invoice_due_date?: string;
            allow_partial: boolean;
            minimum_amount: string;
            allow_exceed: boolean;
            maximum_amount: string;
            note: string;
            amount: number;
            callback_url: string;
            sender_staff_code: string;
            tax_customer_code?: string;
            lines?: [{
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
            }];
        }) => Promise<{
            success: boolean;
            message: string;
            data?: {
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
        }>;
        CREATE_SIMPLE: (body: {
            invoice_code?: string;
            sender_invoice_no: string;
            invoice_receiver_code: string;
            invoice_description: string;
            amount: number;
            callback_url: string;
        }) => Promise<{
            success: boolean;
            message: string;
            data?: {
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
        }>;
        INFO: (invoice_id: string) => Promise<{
            success: boolean;
            message: string;
            data?: {
                invoice_id: string;
                invoice_status: string;
                sender_invoice_no: string;
                sender_branch_code: string;
                sender_branch_data: string;
                sender_staff_code: string;
                sender_staff_data: string;
                sender_terminal_code: string;
                sender_terminal_data: string;
                invoice_description: string;
                invoice_due_date: string;
                enable_expiry: false;
                expiry_date: string;
                allow_partial: false;
                minimum_amount: string;
                allow_exceed: false;
                maximum_amount: string;
                total_amount: string;
                gross_amount: number;
                tax_amount: number;
                surcharge_amount: number;
                discount_amount: number;
                callback_url: string;
                note: string;
                lines: {
                    tax_product_code: string;
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
                    next_payment_date: string;
                    next_payment_datetime: string;
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
        }>;
        CANCEL: (invoice_id: string) => Promise<{
            success: boolean;
            message: string;
            data?: any;
        }>;
    };
    payment: {
        INFO: (payment_id: string) => Promise<{
            success: boolean;
            message: string;
            data?: {
                payment_id: string;
                payment_status: string;
                payment_fee: string;
                payment_amount: string;
                payment_currency: string;
                payment_date: string;
                payment_wallet: string;
                object_type: string;
                object_id: string;
                next_payment_date: string;
                next_payment_datetime: string;
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
        }>;
        CHECK: (invoice_id: string) => Promise<{
            success: boolean;
            message: string;
            data?: {
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
                    next_payment_date: string;
                    next_payment_datetime: string;
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
        }>;
        CANCEL: (invoice_id: string) => Promise<{
            success: boolean;
            message: string;
            data?: {
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
                    next_payment_date: string;
                    next_payment_datetime: string;
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
        }>;
        REFUND: (invoice_id: string) => Promise<{
            success: boolean;
            message: string;
            data?: {
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
                    next_payment_date: string;
                    next_payment_datetime: string;
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
        }>;
    };
    ebarimt: {
        CREATE: (body: {
            payment_id: string;
            ebarimt_receiver_type: "CITIZEN" | "COMPAYNE";
            ebarimt_receiver?: string;
        }) => Promise<{
            success: boolean;
            message: string;
            data?: {
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
        }>;
    };
};
export default _default;
export { default as invoice } from "./invoice";
export { default as payment } from "./payment";
export { default as ebarimt } from "./ebarimt";
