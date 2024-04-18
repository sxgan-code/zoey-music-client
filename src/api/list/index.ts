import request from "@/utils/http";
import {ResponseResult} from "@/api/common-types.ts";
import {MusicListMapType} from "@/api/list/type.ts";

/**
 * 获取用户歌单列表
 */
export function getUserMusicListApi(): Promise<ResponseResult<MusicListMapType>> {
    return request({
        url: "/list/getUserSongList",
        method: "get",
        data: new Date().getTime(),
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
}