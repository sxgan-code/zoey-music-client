<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {usePlayStore} from '@/store/play-store.ts'
import {useRoute} from "vue-router";
import {getSongsApi, updateSongYelpApi} from "@/api/list";
import {MusicSongType} from "@/api/list/type.ts";

const props = defineProps({
  flag: {
    type: String,
    default: '1',
    required: true
  }
})
const playStore = usePlayStore()

const route = useRoute();
let listId = ref();
listId.value = route.params.listId


/*更改歌曲喜欢状态*/
function isLikeSong(songId: number) {
  var flag = 0
  var songIndex = -1;
  songs.value?.forEach((item: MusicSongType, index) => {
    if (item.songId === songId) {
      songIndex = index
    }
  })
  var song = songs.value![songIndex]
  songs.value![songIndex].isLike = songs.value![songIndex].isLike == 0 ? 1 : 0
  updateSongYelpApi({
    isLike: song!.isLike,
    songId: song!.songId,
    yelpContent: ''
  });
  if (songs.value![songIndex].songId === playStore.songInfo.songId) {
    playStore.songInfo.isLike = songs.value![songIndex].isLike
  }
  console.log(songIndex)
  
}

/*点击控件播放音乐*/
function playMusic(id: number) {
  if (playStore.songInfo.songId === id) {
    playStore.songPlayingInfo.isPlay = !playStore.songPlayingInfo.isPlay
  } else {
    songs.value?.forEach(item => {
      if (item.songId === id) {
        item.listId = listId.value
        playStore.setSongInfo(item)
        playStore.songPlayingInfo.isPlay = true
        playStore.songPlayingInfo.currentScale = 0
        playStore.songPlayingInfo.currentScale = 0
        
      }
    })
  }
  playStore.songPlayingInfo.songs = songs.value
}


// 监听喜欢事件
watch(() => playStore.songInfo.isLike, (newValue, oldValue) => {
  songs.value?.forEach(item => {
    if (item.songId === playStore.songInfo.songId) {
      item.isLike = newValue
    }
    return
  })
})

/**
 * @Description: 根据歌单id查询歌曲列表
 * @Author: sxgan
 * @Date: 2024/4/18 22:57
 **/
const songs = ref<MusicSongType[]>()
onMounted(() => {
  getSongsApi(playStore.getSongList).then(res => {
    songs.value = res.data
    songs.value = songs.value?.reverse()
    playStore.songList.listSize = songs.value?.length
  })
})
</script>

<template>
  <div class="list-content">
    <div class="list-title">
      <div><span>歌曲</span></div>
      <div><span>歌手</span></div>
      <div><span>专辑</span></div>
    </div>
    <div class="song-list">
      <div class="item-list" v-for="item in songs">
        <div class="song-clo-1">
          <div class="song-name">
            <i @click="isLikeSong(item.songId)"
               :class="item.isLike==1?
                 'icon huaweiicon icon-ic_public_favor_filled':'icon huaweiicon icon-ic_public_favor'"></i>
            <span>{{ item.songName.length > 12 ? item.songName.substring(0, 12) + '...' : item.songName }}</span>
          </div>
          <div class="song-control">
            <i :class="item.songId == playStore.songInfo.songId && playStore.songPlayingInfo.isPlay ?
               'icon huaweiicon icon-ic_public_pause_norm' : 'icon huaweiicon icon-ic_public_play_norm'"
               @click="playMusic(item.songId)"></i>
            <i class="icon huaweiicon icon-ic_public_add_norm"></i>
            <i class="icon huaweiicon icon-ic_public_download"></i>
            <i class="icon huaweiicon icon-ic_public_fail"></i>
          </div>
        </div>
        <div class="song-clo-2"><span>{{
            item.musicSinger.singerName.length > 8 ?
                item.musicSinger.singerName.substring(0, 8) + '...' : item.musicSinger.singerName
          }}</span></div>
        <div class="song-clo-3">
            <span>{{
                item.musicAlbum.albumName.length > 12 ? item.musicAlbum.albumName.substring(0, 12) + '...' : item.musicAlbum.albumName
              }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-content {
  height: 100%;
  width: 99%;
  display: flex;
  flex-direction: column;
  
  .list-title {
    height: 2rem;
    width: 90%;
    margin: 0.5rem auto;
    padding-left: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    
    span {
      color: var(--text-color-rgba);
      font-size: 1.2rem;
    }
    
    div:first-child {
      flex: 5;
      padding-left: 1rem;
    }
    
    div:nth-child(2) {
      flex: 3;
    }
    
    div:last-child {
      flex: 4;
    }
    
  }
  
  .song-list {
    height: calc(100vh - 44rem);
    width: 99%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    
    .item-list {
      display: flex;
      flex-direction: row;
      line-height: 4rem;
      width: 90%;
      margin: 0 auto;
      
      .song-clo-1 {
        flex: 5;
        line-height: 4rem;
        display: flex;
        flex-direction: row;
        
        .song-name {
          flex: 12;
          line-height: 4rem;
          
          span {
            color: var(--text-color);
            font-size: 1.4rem;
          }
          
          .song-like {
            color: var(--text-color-light-red);
          }
          
          i {
            cursor: pointer;
            margin: 0 1rem;
            color: var(--text-color);
            font-size: 1.6rem;
          }
        }
        
        .song-control {
          flex: 6;
          line-height: 4rem;
          display: flex;
          justify-content: space-around;
          
          i {
            display: none;
            color: var(--text-color);
            font-size: 1.8rem;
          }
          
          i:hover {
            color: var(--text-active-color);
          }
        }
      }
      
      .song-clo-2 {
        flex: 3;
      }
      
      .song-clo-3 {
        flex: 4;
      }
      
      .song-clo-2, .song-clo-3 {
        span {
          font-size: 1.4rem;
          margin-left: 1rem;
          color: var(--text-color);
        }
      }
    }
    
    .item-list:hover {
      .song-clo-1 .song-control i {
        display: block;
      }
      
      background: var(--bg--rgba);
    }
  }
}
</style>