export interface MusicListMapType {
    collects: MusicListType[]
    creates: MusicListType[]

    [property: string]: any
}

export interface MusicListType {
    /**
     * 歌单号
     */
    listId?: number
    /**
     * 歌单名
     */
    listName: string

    /**
     * 歌单类型: 1：创建，2：收藏，3创建及收藏
     */
    listType?: number

    /**
     * 歌单简介
     */
    listInfo: string

    /**
     * 歌单风格
     */
    listStyle?: string

    /**
     * 歌单图片地址
     */
    listPic?: string

    /**
     * 歌单播放数量
     */
    playCount: number
    /**
     * 歌单歌曲数量
     */
    listSize?: number
    /**
     * 所属用户
     */
    userId?: number

    /**
     * 创建时间
     */
    createTime?: string

    /**
     * 更新时间
     */
    updateTime?: string
}

export interface MusicSongType {
    /**
     * 歌曲ID
     */

    songId: number
    /**
     * 歌曲所属歌单
     */
    listId: number
    /**
     * 歌曲名称
     */
    songName: string

    /**
     * 歌曲地址
     */
    songUrl?: string
    /**
     * 是否喜欢
     */
    isLike: number
    /**
     * 歌曲图片地址
     */
    songPic?: string

    /**
     * 歌词文件地址
     */
    lyricUrl?: string

    /**
     * 歌曲风格
     */
    songStyle?: string

    /**
     * 歌曲发行时间
     */
    releaseDate?: string

    /**
     * 所属专辑
     */
    albumId?: number

    /**
     * 歌手id
     */
    singerId?: number

    /**
     * 删除标志：0-未删除，1-已删除
     */
    delFlag?: number

    /**
     * 创建时间
     */
    createTime?: string

    /**
     * 更新时间
     */
    updateTime?: string

    /**
     * 所属歌手
     */
    musicSinger: MusicSingerType

    /**
     * 所属专辑
     */
    musicAlbum: MusicAlbumType

}

export interface MusicSongYelpVOType {
    /**
     * 歌曲点评ID
     */
    songYelpId?: number

    /**
     * 用户歌曲评论
     */
    yelpContent?: string

    /**
     * 用户ID
     */
    userId?: number

    /**
     * 歌曲ID
     */
    songId?: number

    /**
     * 是否喜欢: 1-喜欢，0-不喜欢
     */
    isLike?: number

    /**
     * 创建时间
     */
    createTime?: string

    /**
     * 更新时间
     */
    updateTime?: string
}

export interface MusicAlbumType {
    albumId: number
    albumName: string
    albumPic: string
    createTime: string
    delFlag: number
    releaseDate: string
    singerId: number
    updateTime: string
}

export interface MusicSingerType {
    address: string
    createTime: string
    delFlag: number
    singerId: number
    singerName: string
    singerPic: string
    updateTime: string
}
