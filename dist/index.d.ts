declare const _default: {
    invoice_code: string;
    host: string;
    authInfo: authInfoT;
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
};
export default _default;
