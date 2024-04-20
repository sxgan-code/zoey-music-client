<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {usePlayStore} from "@/store/play-store.ts";
import msg, {PositionTypeEnum} from '@/components/message'
import {useUserStore} from "@/store/user-store.ts";


/**
 * @Description: 音频监听
 * @Author: sxgan
 * @Date: 2024/4/17 17:14
 **/
const playStore = usePlayStore()
const userStore = useUserStore()
const audioRef = ref()
watch(() => playStore.getSongPlayingInfo.isPlay, (newValue, oldValue) => {
  if (!userStore.userInfo.isLogin) {
    msg.warning('请先登录', PositionTypeEnum.TOP)
    playStore.getSongPlayingInfo.isPlay = false
  } else if (newValue) {
    audioRef.value.play()
  } else {
    audioRef.value.pause()
  }
})
// 点击进度条
watch(() => playStore.getSongPlayingInfo.clickCurrent, (newValue, oldValue) => {
  console.log('当前点击的new值' + newValue)
  audioRef.value.currentTime = audioRef.value.duration * newValue;
})
onMounted(() => {
})
const onPlay = () => {
  console.log('开始播放声音');
}
// 当音频暂停
const onPause = () => {
  console.log('暂停播放声音');
}
//播放完毕执行
const overAudio = () => {
  console.log('播放声音完毕');
  playStore.songPlayingInfo.isPlay = false
  playStore.initSongPlayingInfo()
  // 自动下一曲
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
const loadedData = () => {
  console.log('音频加载完毕')
  audioRef.value.volume = playStore.getSongPlayingInfo.volume
  if (playStore.getSongPlayingInfo.isPlay) {
    audioRef.value.play()
  }
  var totalTime = audioRef.value.duration;
  var min: any = Math.floor(totalTime / 60 % 60);
  if (min < 10) {
    min = '0' + min;
  }
  var sec: any = Math.floor(totalTime % 60);
  if (sec < 10) {
    sec = '0' + sec;
  }
  playStore.songPlayingInfo.durationTime = min + ':' + sec;
}
const timeUpdate = () => {
  let timeDisplay;
  //用秒数来显示当前播放进度
  timeDisplay = Math.floor(audioRef.value.currentTime);//获取实时时间
  var songRealSchedule = audioRef.value.currentTime / audioRef.value.duration;
  playStore.songPlayingInfo.currentScale = songRealSchedule;
  // 歌曲实时缓存比
  var timeRanges = audioRef.value.buffered;
  if (timeRanges.length > 0) {
    var bufferTime = timeRanges.end(timeRanges.length - 1) / audioRef.value.duration;
    playStore.songPlayingInfo.cacheTimeScale = bufferTime;
  }
  
  
  //处理时间
  //分钟
  let minute: any = timeDisplay / 60;
  let minutes: any = parseInt(minute);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  //秒
  let second = timeDisplay % 60;
  let seconds: any = Math.round(second);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  //将实时时间存储全局状态中
  playStore.songPlayingInfo.currentTime = minutes + ":" + seconds;
}
</script>

<template>
  <div class="play-root-box">
    <audio class="audio" ref="audioRef"
           @error="msg.error('歌曲加载失败，请稍后重试')"
           @ended="overAudio"
           @pause="onPause"
           @play="onPlay"
           @loadeddata="loadedData()"
           @timeupdate="timeUpdate()"
           :key="playStore.songInfo.songId">
      <source :src="playStore.staticBaseUrl + playStore.getSongInfo.songUrl">
    </audio>
  </div>
</template>

<style scoped lang="scss">
.audio {
  position: fixed;
  top: 5rem;
  left: 5rem;
  z-index: 9999;
}
</style>