<script setup lang="ts">
import {ref, watch} from 'vue'
import {usePlayStore} from "@/store/play-store.ts";
import msg, {PositionTypeEnum} from "@/components/message";

const playStore = usePlayStore();
const isLike = ref(true)






const getClassSongName = () => {
  let textLength: number = playStore.songInfo.songName.length + playStore.songInfo.musicSinger.singerName.length
  if (textLength >= 12) {
    return 'song-name scroll-x'
  }
  return 'song-name'
}

function clickVolume() {

}

/**
 * @Description: 歌曲操作相关
 * @Author: sxgan
 * @Date: 2024/4/19 14:39
 **/
/* 播放控制 */
function changePlay() {
  if (playStore.songPlayingInfo.isPlay) {
    playStore.songPlayingInfo.isPlay = false
  } else {
    playStore.songPlayingInfo.isPlay = true
  }
}
/*进度条*/
let allBarDom = ref<HTMLElement>()
let cacheBarDom = ref<HTMLElement>()
let progressBarDom = ref<HTMLElement>()
let pointDom = ref<HTMLElement>()

/*点击进度条*/
function clickBar(e: any) {
  progressBarDom.value!.style.width = e.offsetX + 'px'
  pointDom.value!.style.left = (e.offsetX - 4) + 'px'
  playStore.songPlayingInfo.clickCurrent = e.offsetX / allBarDom.value!.offsetWidth
}

// 禁止点击圆点
function stopClickBar(e: any) {
  e.stopPropagation()
}

// 真实进度变化
watch(() => playStore.songPlayingInfo.currentScale, (newValue, oldValue) => {
  progressBarDom.value!.style.width = newValue * allBarDom.value!.offsetWidth + 'px'
  pointDom.value!.style.left = newValue * allBarDom.value!.offsetWidth - 1 + 'px'
})
watch(() => playStore.songPlayingInfo.cacheTimeScale, (newValue, oldValue) => {
  cacheBarDom.value!.style.width = Math.floor(newValue * 100) + '%';
})

/*上一曲*/
function previousAudio() {
  playStore.songPlayingInfo.overCount = playStore.songPlayingInfo.overCount < 1 ? 10 : playStore.songPlayingInfo.overCount - 1
}

/*下一曲*/
function nextAudio() {
  playStore.songPlayingInfo.overCount = playStore.songPlayingInfo.overCount > 10 ? 0 : playStore.songPlayingInfo.overCount + 1
}
</script>

<template>
  <div class="progress-bar" ref="allBarDom" @click="clickBar($event)">
    <div class="bg-tip">
    </div>
    <div class="cache-bar" ref="cacheBarDom">
    </div>
    <div class="realtime-progress-bar" ref="progressBarDom">
    </div>
    <div class="current-position-point" @click="stopClickBar($event)" ref="pointDom">
    </div>
  </div>
  <div class="play-music-control">
    <div class="song-info">
      <div class="info-box">
        <div class="info-left">
          <!--<i class="iconfont posit-index">&#xeba6;</i>-->
          <img :src="playStore.staticBaseUrl+playStore.songInfo.songPic" v-tooltip="{text:'展开歌曲详情页'}" alt="">
        </div>
        <div class="info-right">
          <div :class="getClassSongName()">
            <span>{{ playStore.songInfo.songName }} - {{ playStore.songInfo.musicSinger.singerName }}</span>
          </div>
          <div class="song-like">
            <i :class="isLike?'icon huaweiicon icon-ic_public_favor_filled':'icon huaweiicon icon-ic_public_favor'"
               v-tooltip="{text:isLike?'取消喜欢':'我喜欢'}"/>
            <i class="icon huaweiicon icon-ic_public_download" v-tooltip="{text:'下载'}"></i>
            <i class="icon huaweiicon icon-ic_public_comments" v-tooltip="{text:'评论'}"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="song-play-control">
      <div class="control-box">
        <span><i class="icon huaweiicon icon-ic_public_drawer_filled i-max"
                 v-tooltip="{text:'顺序播放'}"></i></span>
        <span><i class="icon huaweiicon icon-ic_public_play_last" @click="previousAudio()"
                 v-tooltip="{text:'上一曲'}"></i>
        </span>
        <span>
          <i :class="playStore.songPlayingInfo.isPlay?'icon huaweiicon icon-ic_public_pause_norm':'icon huaweiicon icon-ic_public_play_norm'"
             @click="changePlay()"
             v-tooltip="{text:playStore.songPlayingInfo.isPlay?'暂停':'播放'}"></i>
        </span>
        <span>
          <i class="icon huaweiicon icon-ic_public_play_next"
             @click="nextAudio()"
             v-tooltip="{text:'下一曲'}"></i>
        </span>
        <span>
          <i v-if="playStore.songPlayingInfo.volume>0" class="icon myiconfont my-volume-medium i-max"
             v-tooltip="{text:'音量大小'+playStore.songPlayingInfo.volume*100+'%'}"
             @click="clickVolume()">
            <span class="path1"></span><span class="path2"></span><span class="path3"></span>
          </i>
          <i v-if="playStore.songPlayingInfo.volume==0" class="icon myiconfont my-volume-mute2">
            <span class="path1"></span><span class="path2"></span><span class="path3"></span>
          </i>
        </span>
      </div>
    </div>
    <div class="song-time">
      <div class="play-time">{{ playStore.songPlayingInfo.currentTime }} / {{
          playStore.songPlayingInfo.durationTime
        }}
      </div>
      <div class="play-list">
        <i class="iconfont"
           @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)"
           v-tooltip="{text:'播放队列'}">&#xebbe;</i>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/*进度条*/
.progress-bar {
  width: 100%;
  height: 1rem;
  position: relative;
  
  .bg-tip {
    position: absolute;
    top: 0.375rem;
    z-index: 1;
    display: block;
    width: 80vw;
    height: 0.25rem;
    background: var(--bg--rgba-1);
  }
  
  .cache-bar {
    position: absolute;
    top: 0.375rem;
    z-index: 2;
    display: block;
    width: 0;
    height: 0.25rem;
    background: var(--bg-light-rgba-2);
  }
  
  .realtime-progress-bar {
    position: absolute;
    top: 0.375rem;
    z-index: 3;
    display: block;
    width: 0vw;
    height: 0.25rem;
    background: var(--text-active-color);
  }
  
  .current-position-point {
    position: absolute;
    z-index: 3;
    margin-left: -0.5rem;
    height: 1rem;
    width: 1rem;
    border-radius: 0.5rem;
    background: var(--text-active-color);
    display: none;
  }
}

.progress-bar:hover {
  .current-position-point {
    display: block;
  }
}

/*播放控制*/
.play-music-control {
  //width: 80vw;
  height: 100%;
  display: flex;
  flex-direction: row;
  
  .song-info {
    flex: 2;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .info-box {
      width: 30rem;
      height: 4rem;
      display: flex;
      align-items: center;
      
      .info-left {
        display: flex;
        align-items: center;
        width: 4rem;
        height: 4rem;
        overflow: hidden;
        
        .posit-index {
          display: none;
          position: absolute;
          z-index: 1;
          bottom: 3rem;
          font-weight: bold;
          color: var(--text-color);
          font-size: 4rem;
        }
        
        img {
          width: 4rem;
          height: 4rem;
          border-radius: 0.5rem;
        }
        
        //img:hover .posit-index{
        //    bottom: 1rem;
        //    cursor: pointer;
        //    display: block;
        //}
      }
      
      
      .info-right {
        //border: 1px solid lawngreen;
        height: 4rem;
        width: 20rem;
        margin-left: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        .song-name {
          width: 14rem;
          overflow: hidden;
          
          span {
            display: block;
            font-size: 1.2rem;
            color: var(--text-color);
          }
        }
        
        i {
          margin: 0 0.7rem;
        }
        
        .song-like {
          font-size: 1.8rem;
          color: var(--text-color-rgba);
          
          .is-like {
            color: var(--text-color-light-red);
          }
        }
        
        .song-like i:hover {
          cursor: pointer;
        }
        
        i:nth-child(n+2) {
          //margin: 0 0.5rem;
          color: var(--bg--active--rgba)
        }
        
        i:nth-child(n+2):hover {
          cursor: pointer;
          color: var(--text-active-color)
        }
      }
    }
  }
  
  .song-play-control {
    flex: 2;
    
    .control-box {
      width: 20rem;
      height: 5rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      
      span i {
        line-height: 5rem;
        font-size: 3rem;
        margin: 0 1rem;
        color: var(--text-color);
      }
      
      span i:hover {
        cursor: pointer;
        color: var(--text-active-color)
      }
      
      span .i-max {
        //display: block;
        font-size: 2rem;
      }
      
      span .i-max-isPlay {
        display: block;
        font-size: 3rem;
        padding-right: 1rem;
        color: var(--text-active-color)
      }
      
      .tip-volume {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 5rem;
        height: 30rem;
        background: lightcoral;
      }
    }
  }
  
  .song-time {
    flex: 1;
    height: 5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    
    .play-time {
      font-size: 1.4rem;
      color: var(--text-color-rgba);
    }
    
    .play-list {
      margin: 0 2rem 0 0.5rem;
      
      i {
        color: var(--text-color);
        font-size: 2.8rem;
      }
      
    }
  }
}
</style>