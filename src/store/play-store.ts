import {defineStore} from 'pinia'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const usePlayStore = defineStore('play', {
    // other options...
    // 推荐使用 完整类型推断的箭头函数
    state: () => {
        return {
            songList: {
                songlistId: "LIST-0D44A50E-97F5-4CC0-55C2-6F16A69A546F",
                songlistName: "只此一生",
                songlistInfo: "多年后，再回想年少时的迷茫和执着，或许原因都不记得了。青春就是让你张扬地笑，也给你莫名的痛。",
                songlistStyle: "",
                songlistPic: "/Resource/image/songListImg/109951163443093546.jpg",
                userId: "USER-432C2877-9106-4C3D-951E-7EBC0AC0234C",
                block: "create@@",
                songs: null,
                count: 0
            },
            songInfo: {
                songId: '8',
                name: '天外来物',
                pic: 'http://localhost:9090/music/api/pic/Resource/image/songImg/下一站，茶山刘.png',
                singer: '薛之谦',
                album: '天外来物',
                song_time: '4:25',
                songUrl: '',
                isLike: '1',
                songListId: 'LIST-188F3265-75A9-0308-1082-BE570358BA2A'
            },
            songPlayingInfo: {
                isPlay: true, // 播放状态
                currentTime: '00:00', // 当前播放时间
                current: 0, // 当前播放时间
                durationTime: '00:00',// 当前歌曲的总时长
                duration: 0,// 当前歌曲的总时长
                clickCurrent: 0, // 点击的进度
                cacheTime: 0, // 当前缓存时间
                loopStyle: 'list', // 当前播放格式 one:单曲循环，list:列表循环，random：随机循环
                volume: 0.1, // 音量
                overCount: 0 // 每次播放完毕都会加一，上线为10会重置
            }
        }
    },
    actions: {},
    getters: {
        // 返回歌单
        getSongList: (state) => state.songList,
        // 返回当前播放歌曲的信息
        getSongInfo: (state) => state.songInfo,
        // 返回当前播放状态等信息
        getSongPlayingInfo: (state) => state.songPlayingInfo
    }

})