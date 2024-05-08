import {MusicListType, MusicSongType} from "@/api/list/type.ts";

/**
 * 今日推荐
 */
export interface RecommendType {

    /**
     * 今日推荐歌曲
     */
    musicSongVO: MusicSongType

    /**
     * 今日推荐歌单
     */
    musicListVOS: MusicListType[]
}