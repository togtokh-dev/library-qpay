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
