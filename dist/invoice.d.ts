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
};
export default _default;
