import request from "@/utils/http";
import {AxiosPromise} from "axios";
import {LoginData, LoginResult, VerifyCodeResult} from "./types";

/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi(data: LoginData): AxiosPromise<LoginResult> {
    console.log(data + '==============')
    const requestJsonData = JSON.stringify(data)
    console.log('json data ==' + requestJsonData)
    const formData = new FormData();
    formData.append("username", data.email);
    formData.append("password", data.password);
    formData.append("verifyCode", data.verifyCode || "");
    return request({
        url: "/card/auth/signin",
        method: "post",
        data: requestJsonData,
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "multipart/form-data",
        },
    });
}

/**
 * 获取验证码
 */
export function getCaptchaApi(data: LoginData): AxiosPromise<VerifyCodeResult> {
    const requestJsonData = JSON.stringify(data)
    console.log("auth.ts getCaptchaApi requestData:" + requestJsonData)
    return request({
        url: "/card/auth/getVerifyCode",
        method: "post",
        data: requestJsonData,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
