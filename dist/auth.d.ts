export declare const getToken: () => Promise<string>;
declare const _default: {
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
export default _default;
