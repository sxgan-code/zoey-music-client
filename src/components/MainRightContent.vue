<script setup lang="ts">
import {onMounted, ref} from "vue";
import {usePlayStore} from '@/store/play-store.ts'
import {useUserStore} from '@/store/user-store.ts'
import msg, {PositionTypeEnum} from "@/components/message";
import {useRoute} from "vue-router";
import {getSongsApi} from "@/api/list";
import {MusicSongType} from "@/api/list/type.ts";

const playStore = usePlayStore()
const userStore = useUserStore()
const index = ref(1)
const route = useRoute();
let listId = ref();
listId.value = route.params.listId

/*点击更改列表标题文字样式*/
function changeStyle(val: number) {
  msg.warning('开发中。。。', PositionTypeEnum.TOP)
  index.value = val;
}

/*更改歌曲喜欢状态*/
function isLikeSong(songId: number) {
  var flag = 0
  songs.value?.forEach((item: MusicSongType) => {
    if (item.songId == songId) {
      if (item.isLike == 0) {
        item.isLike = 1
        flag = 1
      } else {
        item.isLike = 0
        flag = 0
      }
      if (item.songId == playStore.songInfo.songId) {
        playStore.songInfo.isLike = flag
      }
    }
  })
}

/**
 * @Description: 根据歌单id查询歌曲列表
 * @Author: sxgan
 * @Date: 2024/4/18 22:57
 **/
const songs = ref<MusicSongType[]>()
onMounted(() => {
  getSongsApi(playStore.getSongList).then(res => {
    songs.value = res.data
  })
})

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
}

// 监听上一曲下一曲

</script>

<template>
  <div class='content-top'>
    <div class="song-list-pic">
      <img :src="playStore.staticBaseUrl+playStore.songList.listPic" alt="">
    </div>
    <div class="song-list-info">
      <div class="info-title">
        <div>
          <span>{{ playStore.songList.listName }}</span>
        </div>
        <div>
          <span @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)"><i class="iconfont">&#xe7e9;</i>编辑</span>
          <span @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)"><i class="iconfont">&#xeb9e;</i>投稿</span>
        </div>
      </div>
      <div class="info-style">
        <div>
          <img src="@/assets/images/avatar.png" alt="">
          <span class="info-style-name"
                @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)">
            {{ userStore.userInfo.email }}
          </span>
        </div>
        <div>
          <span v-for="item in playStore.songList.listStyle?.split(',')">{{ item }}</span>
        </div>
      </div>
      <div class="info-introduction">
        <span>{{ playStore.songList.listInfo }}</span>
      </div>
      <div class="info-btn">
        <div @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)"><i class="iconfont">&#xe922;</i>播放全部</div>
        <div @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)"><i class="iconfont">&#xebda;</i>下载</div>
        <div @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)"><i class="iconfont">&#xeb91;</i>批量操作</div>
        <div @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)"><i class="iconfont">&#xe8bf;</i>播放全部</div>
      </div>
    </div>
  </div>
  <div class="content-list">
    <div class="list-top">
      <div>
        <span :class="index==1?'sel-title-span':''" @click="changeStyle(1)">歌曲{{ playStore.songList.listSize }}</span>
        <span :class="index==2?'sel-title-span':''" @click="changeStyle(2)">最近收藏</span>
        <span :class="index==3?'sel-title-span':''" @click="changeStyle(3)">评论</span>
      </div>
      <div>
        <span @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)"><i class="iconfont">&#xe8bb;</i>搜索</span>
        <span @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)"><i class="iconfont">&#xe69e;</i>排序</span>
      </div>
    </div>
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
              <i :id="'item-'+index" @click="isLikeSong(item.songId)"
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
  </div>
</template>

<style scoped lang="scss">
.content-top {
  height: 22rem;
  width: 80vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: "HarmonyOS Sans", sans-serif;
  
  .song-list-pic {
    width: 20rem;
    
    img {
      display: block;
      margin: 0 auto;
      width: 16rem;
      height: 16rem;
      border-radius: 1rem;
    }
  }
  
  .song-list-info {
    flex: 1;
    height: 20rem;
    display: flex;
    flex-direction: column;
    
    .info-title {
      height: 8rem;
      display: flex;
      flex-direction: row;
      
      div:first-child {
        flex: 1;
        height: 8rem;
        
        span {
          color: var(--text-color);
          font-weight: bold;
          line-height: 8rem;
          font-size: 3.5rem;
          font-family: "HarmonyOS Sans", sans-serif;
        }
      }
      
      div:last-child {
        width: 16rem;
        height: 8rem;
        display: flex;
        align-items: center;
        
        span {
          i {
            color: var(--text-color);
            font-size: 1.2rem;
            margin-right: 0.4rem;
          }
          
          color: var(--text-color);
          width: 5rem;
          margin: 0 0.8rem;
          border-radius: 0.3rem;
          font-size: 1.2rem;
          text-align: center;
          line-height: 2.5rem;
        }
        
        span:hover {
          background: var(--text-deep-rgba-1);
        }
      }
    }
    
    .info-style {
      width: 100%;
      flex: 2;
      display: flex;
      flex-direction: row;
      
      div:first-child {
        display: flex;
        flex-direction: row;
        align-items: center;
        
        img {
          display: inline-block;
          width: 3rem;
          height: 3rem;
          border-radius: 1.5rem;
          margin-right: 1rem;
        }
        
        span {
          color: var(--text-color);
          font-size: 1.4rem;
        }
        
        span:hover {
          cursor: pointer;
          color: var(--text-active-color)
        }
      }
      
      div:last-child {
        display: flex;
        flex-direction: row;
        align-items: center;
        
        span {
          font-family: 'HarmonyOS Sans', sans-serif;
          font-size: 1.4rem;
          margin-left: 2rem;
          color: var(--text-color);
        }
      }
    }
    
    .info-introduction {
      flex: 2;
      display: flex;
      flex-direction: row;
      align-items: center;
      line-height: 2rem;
      margin: 1rem 0;
      
      span {
        font-family: 'HarmonyOS Sans', sans-serif;
        font-size: 1.4rem;
        color: var(--text-color);
      }
    }
    
    .info-btn {
      flex: 3;
      display: flex;
      flex-direction: row;
      align-items: center;
      
      div {
        font-size: 1.4rem;
        margin-right: 6rem;
        color: var(--text-color);;
        line-height: 3.2rem;
        width: 10rem;
        text-align: center;
        border-radius: 1.8rem;
        background: var(--text-deep-rgba-1);
      }
      
      div:first-child {
        background: var(--text-deep-rgba-2);
      }
      
      div:hover {
        background: var(--text-deep-rgba-2);
      }
    }
  }
}

.content-list {
  height: calc(100vh - 38rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  
  .list-top {
    height: 6vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    
    div:first-child {
      flex: 8;
      display: flex;
      
      span {
        display: inline-block;
        width: 8rem;
        color: var(--text-color);
        text-align: center;
        font-size: 1.4rem;
        line-height: 3rem;
        margin: 0 1.5rem;
        
      }
      
      span:hover {
        color: var(--text-active-color);
      }
      
      .sel-title-span {
        color: var(--text-active-color);
      }
      
      .sel-title-span::after {
        display: block;
        content: '';
        width: 2.5rem;
        margin: 0 auto;
        border-bottom: 3px solid var(--text-active-color);
      }
    }
    
    div:last-child {
      margin-top: 0.5rem;
      flex: 2;
      
      span {
        i {
          font-size: 1.2rem;
          margin-right: 0.5rem;
        }
        
        display: inline-block;
        width: 5rem;
        color: var(--text-color);
        text-align: center;
        font-size: 1.2rem;
        line-height: 2.5rem;
        border-radius: 0.3rem;
        margin: 0 1rem;
      }
      
      span:hover {
        background: var(--text-deep-rgba-1);
      }
    }
  }
  
  .list-content {
    height: calc(100vh - 34rem);
    width: 100%;
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
      width: 100%;
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
  
}
</style>