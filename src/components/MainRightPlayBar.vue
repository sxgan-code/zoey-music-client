<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {usePlayStore} from "@/store/play-store.ts";
import msg, {PositionTypeEnum} from "@/components/message";
import {updateSongYelpApi} from "@/api/list";

const playStore = usePlayStore();
const isLike = ref(true)


const getClassSongName = () => {
  let textLength: number = playStore.songInfo.songName.length + playStore.songInfo.musicSinger.singerName.length
  if (textLength >= 12) {
    return 'song-name scroll-x'
  }
  return 'song-name'
}

/**
 * @Description: 播放暂停控制
 * @Author: sxgan
 * @Date: 2024/4/19 14:39
 **/
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

/**
 * @Description: 点击进度条
 * @Author: sxgan
 * @Date: 2024/4/19 21:03
 **/
function clickBar(e: any) {
  progressBarDom.value!.style.width = e.offsetX + 'px'
  pointDom.value!.style.left = (e.offsetX - 4) + 'px'
  playStore.songPlayingInfo.clickCurrent = e.offsetX / allBarDom.value!.offsetWidth
}

/**
 * @Description: 禁止点击圆点
 * @Author: sxgan
 * @Date: 2024/4/19 21:03
 **/
function stopClickBar(e: any) {
  e.stopPropagation()
}

/**
 * @Description: 监听进度变化
 * @Author: sxgan
 * @Date: 2024/4/19 21:03
 **/
watch(() => playStore.songPlayingInfo.currentScale, (newValue, oldValue) => {
  progressBarDom.value!.style.width = newValue * allBarDom.value!.offsetWidth + 'px'
  pointDom.value!.style.left = newValue * allBarDom.value!.offsetWidth - 1 + 'px'
})
watch(() => playStore.songPlayingInfo.cacheTimeScale, (newValue, oldValue) => {
  cacheBarDom.value!.style.width = Math.floor(newValue * 100) + '%';
})

/**
 * @Description: 上一曲
 * @Author: sxgan
 * @Date: 2024/4/19 20:46
 **/
function previousAudio() {
  playStore.initSongPlayingInfo()
  for (var i = 0; i <= playStore.songPlayingInfo.songs!.length; i++) {
    if (playStore.songPlayingInfo.songs![i].songId === playStore.songInfo.songId) {
      if (i === 0) {
        playStore.setSongInfo(playStore.songPlayingInfo.songs![playStore.songPlayingInfo.songs!.length - 1])
      } else {
        playStore.setSongInfo(playStore.songPlayingInfo.songs![i - 1])
      }
      playStore.songPlayingInfo.isPlay = true
      return
    }
  }
}

/**
 * @Description: 下一曲
 * @Author: sxgan
 * @Date: 2024/4/19 20:46
 **/
function nextAudio() {
  playStore.initSongPlayingInfo()
  for (var i = 0; i <= playStore.songPlayingInfo.songs!.length; i++) {
    if (playStore.songPlayingInfo.songs![i].songId === playStore.songInfo.songId) {
      if (i === playStore.songPlayingInfo.songs!.length - 1) {
        playStore.setSongInfo(playStore.songPlayingInfo.songs![0])
      } else {
        playStore.setSongInfo(playStore.songPlayingInfo.songs![i + 1])
      }
      playStore.songPlayingInfo.isPlay = true
      return
    }
  }
}

/**
 * @Description: 点击音量条
 * @Author: sxgan
 * @Date: 2024/4/19 22:03
 **/
const myVolProgressBar = ref<HTMLElement>()
const volBarStrip = ref<HTMLElement>()
const volBarDots = ref<HTMLElement>()

function clickVolumeBar(e: any) {
  var clickHeight = e.target.clientHeight - e.offsetY
  volBarStrip.value!.style.height = clickHeight + 'px'
  volBarDots.value!.style.marginBottom = clickHeight - 4 + 'px'
  playStore.songPlayingInfo.volume = Math.floor((clickHeight / myVolProgressBar.value!.offsetHeight) * 100)
}

const volumeBoxRef = ref<HTMLElement>()
const openVolumeBox = () => {
  volumeBoxRef.value!.style.display = 'block'
}

// 点击事件，用于隐藏div
function hideBox(event: any) {
  // 检查事件是否来自hide-volume-box元素,且不是点击的元素
  if (event.target.className.indexOf('hide-volume-box') === -1
      && event.target.className.indexOf('my-volume-medium') === -1
      && volumeBoxRef.value != null) {
    volumeBoxRef.value!.style.display = 'none';
  }
}

// 绑定到window，确保即使点击框内也能监听外部点击
document.body.addEventListener('click', hideBox);

onMounted(() => {
  // 初始化音量条
  var initHeight = 90 * (playStore.songPlayingInfo.volume / 100)
  volBarStrip.value!.style.height = initHeight + 'px'
  volBarDots.value!.style.marginBottom = initHeight - 4 + 'px'
})

/**
 * @Description: 点击喜欢按钮
 * @Author: sxgan
 * @Date: 2024/4/20 19:09
 **/
function clickLikeBtn() {
  playStore.songInfo.isLike = playStore.songInfo.isLike === 0 ? 1 : 0
  updateSongYelpApi({
    isLike: playStore.songInfo.isLike,
    songId: playStore.songInfo.songId,
    yelpContent: ''
  })
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
            <i :class="playStore.songInfo.isLike?'icon huaweiicon icon-ic_public_favor_filled':'icon huaweiicon icon-ic_public_favor'"
               @click="clickLikeBtn()"
               v-tooltip="{text:playStore.songInfo.isLike?'取消喜欢':'我喜欢'}"/>
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
             :key="playStore.songPlayingInfo.isPlay?1:0"
             v-tooltip="{text:playStore.songPlayingInfo.isPlay?'暂停':'播放'}"></i>
        </span>
        <span>
          <i class="icon huaweiicon icon-ic_public_play_next"
             @click="nextAudio()"
             v-tooltip="{text:'下一曲'}"></i>
        </span>
        <span>
          <i v-if="playStore.songPlayingInfo.volume>0" :key="playStore.songPlayingInfo.volume"
             class="icon myiconfont my-volume-medium i-max"
             v-tooltip="{text:'音量大小'+playStore.songPlayingInfo.volume+'%'}"
             @click="openVolumeBox()">
            <span class="path1"></span><span class="path2"></span><span class="path3"></span>
          </i>
          <i v-if="playStore.songPlayingInfo.volume==0" :key="playStore.songPlayingInfo.volume"
             class="icon myiconfont my-volume-mute2"
             v-tooltip="{text:'音量大小'+playStore.songPlayingInfo.volume+'%'}"
             @click="openVolumeBox()">
            <span class="path1"></span><span class="path2"></span><span class="path3"></span>
          </i>
        </span>
        <div class="volume hide-volume-box" id="id-volume-box" ref="volumeBoxRef">
          <div class="volume-box hide-volume-box">
            <div class="volume-bar-box hide-volume-box" ref="myVolProgressBar" @click="clickVolumeBar($event)">
              <div class="volume-strip hide-volume-box" ref="volBarStrip">
                <div id="vol-dots" @click="stopClickBar($event)" class="volume-dots hide-volume-box"
                     ref="volBarDots"></div>
              </div>
            </div>
            <div class="volume-number-box hide-volume-box">
              {{ playStore.songPlayingInfo.volume + '%' }}
            </div>
          </div>
        
        </div>
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
        position: relative;
        z-index: 2;
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
      
      .volume {
        position: absolute;
        display: none;
        
        .volume-box {
          background: var(--text-deep-rgba-2);
          position: relative;
          bottom: 14rem;
          left: 9.4rem;
          height: 12rem;
          width: 3rem;
          padding-top: 1rem;
          border-radius: 0.7rem;
          
          .volume-bar-box {
            position: absolute;
            height: 9rem;
            width: 0.4rem;
            border-radius: 0.2rem;
            background: var(--text-deep-rgba-2);
            margin: 0 1.3rem;
          }
          
          .volume-strip {
            position: absolute;
            bottom: 0;
            border-radius: 0.2rem;
            width: 0.4rem;
            height: 3rem;
            background: var(--text-active-color);
          }
          
          .volume-dots {
            position: absolute;
            left: -0.2rem;
            bottom: 0;
            width: 0.8rem;
            height: 0.8rem;
            margin-bottom: 2.6rem;
            border-radius: 0.4rem;
            background: var(--text-active-color);
          }
          
          .volume-number-box {
            position: absolute;
            bottom: 1rem;
            text-align: center;
            width: 3rem;
            height: 1rem;
            color: var(--text-color);
          }
        }
        
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