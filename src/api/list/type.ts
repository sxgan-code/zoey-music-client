export interface MusicListMapType {
    collects: MusicListType[];
    creates: MusicListType[];

    [property: string]: any;
}

export interface MusicListType {
    /**
     * 歌单号
     */
    listId?: number;

    /**
     * 歌单名
     */
    listName: string;

    /**
     * 歌单类型: 1：创建，2：收藏，3创建及收藏
     */
    listType?: number;

    /**
     * 歌单简介
     */
    listInfo?: string;

    /**
     * 歌单风格
     */
    listStyle?: string;

    /**
     * 歌单图片地址
     */
    listPic?: string;
    /**
     * 歌单歌曲数量
     */
    listSize?: number;
    /**
     * 所属用户
     */
    userId?: number;

    /**
     * 创建时间
     */
    createTime?: string;

    /**
     * 更新时间
     */
    updateTime?: string;
}