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

export interface UserInfo extends UserInfoResponse {
    token?: string;
}

export interface UserInfoResponse {
    avatar: string;
    enabled: boolean;
    intro: string;
    lastLoginDate: string;
    loginId: string;
    loginPwd: string;
    mail: string;
    nickname: string;
    points: number;
    qq: string;
    registerDate: string;
    wechat: string;
    _id: string;
}

export interface ResponseData<T> {
    code: number;
    data: T;
    msg: string;
}