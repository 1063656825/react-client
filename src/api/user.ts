import request from "./request";
import { RegisterInfo, ResponseData, UserInfoResponse } from "../types/user";

/**
 * 用户相关的 api 都放在这里
 */

export function getCaptcha(): Promise<any> {
  return request({
    url: "/res/captcha",
    method: "GET"
  });
}

/**
 * 查询用户是否存在
 */
export function userIsExist(loginId: string): Promise<any> {
    return request({
      url: `/api/user/userIsExist/${loginId}`,
      method: "GET",
    });
  }
  
  /**
   * 用户注册
   */
  export function addUser(newUserInfo: RegisterInfo): Promise<ResponseData<UserInfoResponse>> {
    return request({
      url: "/api/user",
      data: newUserInfo,
      method: "POST",
    });
  }