<script setup lang="ts">
import {ref} from 'vue'
import {usePlayStore} from "@/store/play-store.ts";

const playStore = usePlayStore();
const isLike = ref('1')

function stopClickBar(event: Event) {

}

function previousAudio() {

}

/*进度条*/
let allBarDom = ref<HTMLElement>()
let cacheBarDom = ref<HTMLElement>()
let progressBarDom = ref<HTMLElement>()
let pointDom = ref<HTMLElement>()

/*点击进度条*/
function clickBar(e: any) {
  console.log(e.target)
  console.log(e.offsetX)
  progressBarDom.value!.style.width = e.offsetX + 'px'
  pointDom.value!.style.marginLeft = (e.offsetX - 4) + 'px'
  playStore.songPlayingInfo.clickCurrent = e.offsetX / allBarDom.value!.offsetWidth * playStore.songPlayingInfo.duration
  console.log(playStore.songPlayingInfo.clickCurrent)
  // progressBarDom.value!.style.width = allBarDom.value!.offsetWidth +'px'
}

/* 播放控制 */
function changePlay() {
  if (playStore.songPlayingInfo.isPlay) {
    playStore.songPlayingInfo.isPlay = false
  } else {
    playStore.songPlayingInfo.isPlay = true
  }
}

function nextAudio() {

}

function clickVolume() {

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
          <i class="iconfont posit-index">&#xeba6;</i>
          <img src="@/assets/images/avatar.png" alt="">
        </div>
        <div class="info-right">
          <div class="song-name">
            <span>{{ playStore.songInfo.name }} - {{ playStore.songInfo.singer }}</span>
          </div>
          <div class="song-like">
            <i :class="isLike=='1'?'icon huaweiicon icon-ic_public_favor_filled':'icon huaweiicon icon-ic_public_favor'"></i>
            <i class="icon huaweiicon icon-ic_public_download"></i>
            <i class="icon huaweiicon icon-ic_public_comments"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="song-play-control">
      <div class="control-box">
        <span><i class="icon huaweiicon icon-ic_public_drawer_filled i-max"></i></span>
        <span><i class="icon huaweiicon icon-ic_public_play_last" @click="previousAudio()"></i></span>
        <span>
          <i :class="playStore.songPlayingInfo.isPlay?'icon huaweiicon icon-ic_public_pause_norm':'icon huaweiicon icon-ic_public_play_norm'"
             @click="changePlay()"></i>
        </span>
        <span>
          <i class="icon huaweiicon icon-ic_public_play_next" @click="nextAudio()"></i>
        </span>
        <span>
          <i class="icon huaweiicon icon-ic_public_sound_filled i-max" @click="clickVolume()"></i>
        </span>
      </div>
    </div>
    <div class="song-time">
      <div class="play-time">{{ playStore.songPlayingInfo.currentTime }} / {{
          playStore.songPlayingInfo.durationTime
        }}
      </div>
      <div class="play-list"><i class="iconfont">&#xebbe;</i></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/*进度条*/
.progress-bar {
  width: 80vw;
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
    background: var(--bg--rgba-3);
  }

  .realtime-progress-bar {
    position: absolute;
    top: 0.375rem;
    z-index: 3;
    display: block;
    width: 0vw;
    height: 0.25rem;
    background: var(--text-active--color);
  }

  .current-position-point {
    position: absolute;
    z-index: 3;
    margin-left: -0.5rem;
    height: 1rem;
    width: 1rem;
    border-radius: 0.5rem;
    background: var(--text-active--color);
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
          color: var(--bg--rgba-5);
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
            margin: 0 1rem;
            color: var(--el-color-white);
          }
        }

        i {
          margin: 0 0.7rem;
        }
        .song-like {
          font-size: 1.8rem;
          color: var(--el-color-white);

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
          color: var(--text-active--color)
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
        color: var(--text--color);
      }

      span i:hover {
        cursor: pointer;
        color: var(--text-active--color)
      }

      span .i-max {
        //display: block;
        font-size: 2rem;
      }

      span .i-max-isPlay {
        display: block;
        font-size: 3rem;
        padding-right: 1rem;
        color: var(--text-active--color)
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
      color: var(--text-grey-light);
    }

    .play-list {
      margin: 0 2rem 0 0.5rem;

      i {
        color: var(--text-grey-light);
        font-size: 2.8rem;
      }

    }
  }
}
</style>