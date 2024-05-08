import request from "@/utils/http";
import {type ResponseResult} from "@/api/common-types.ts";
import {type RecommendType} from "@/api/online/type.ts";


/**
 * 根据歌单id获取歌曲列表
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