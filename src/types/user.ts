export type LoginInfo = {
    loginId: string;
    loginPwd: string;
    captcha: string;
    remember: boolean;
};

export type RegisterInfo = {
    loginId: string;
    nickname: string;
    captcha: string;
}
