import {defineStore} from 'pinia'
import {MusicListType} from "@/api/list/type.ts";

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const usePlayStore = defineStore('play', {
    // other options...
    // 推荐使用 完整类型推断的箭头函数
    state: () => {
        return {
            songList: {
                listId: 0,
                listName: '',
                listType: 1,
                listInfo: '',
                listStyle: '',
                listPic: '',
                userId: 0,
                createTime: '',
                updateTime: '',
            } as MusicListType,
            songInfo: {
                songId: '0005',
                // name: '我好想在哪儿见过你-纯享版',
                name: '天外来物-纯享版',
                pic: 'http://localhost:9090/music/api/pic/Resource/image/songImg/下一站，茶山刘.png',
                singer: '薛之谦',
                album: '天外来物',
                song_time: '4:25',
                songUrl: '/songs/林俊杰-关键词.mp3',
                isLike: '1',
                songListId: 'LIST-188F3265-75A9-0308-1082-BE570358BA2A'
            },
            songPlayingInfo: {
                isPlay: false, // 播放状态
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
        getSongPlayingInfo: (state) => state.songPlayingInfo,
    }

})