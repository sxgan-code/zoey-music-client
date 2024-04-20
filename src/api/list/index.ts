import request from "@/utils/http";
import {ResponseResult} from "@/api/common-types.ts";
import {MusicListMapType, MusicListType, MusicSongType, MusicSongYelpVOType} from "@/api/list/type.ts";

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

/**
 * 根据歌单id获取歌曲列表
 */
export function getSongsApi(data: MusicListType): Promise<ResponseResult<MusicSongType[]>> {
    return request({
        url: "/list/getSongList",
        method: "post",
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
}

/**
 * 更新用户歌曲点评
 */
export function updateSongYelpApi(data: MusicSongYelpVOType): Promise<ResponseResult<string>> {
    return request({
        url: "/song/updateSongYelp",
        method: "post",
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
}