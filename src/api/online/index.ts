import request from "@/utils/http";
import {type ResponseResult} from "@/api/common-types.ts";
import {type RecommendType} from "@/api/online/type.ts";
import {MusicListType} from "@/api/list/type.ts";


/**
 * 推荐页获取今日推荐数据
 */
export function getTodayRecommendApi(): Promise<ResponseResult<RecommendType>> {
    return request({
        url: "/online/today/recommend",
        method: "get",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
}

/**
 * 获取私荐歌单列表
 */
export function getPrivateRecommendListApi(): Promise<ResponseResult<MusicListType[]>> {
    return request({
        url: "/online/private/list",
        method: "get",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
}