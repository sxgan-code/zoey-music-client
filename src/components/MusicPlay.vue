<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {usePlayStore} from "@/store/play-store.ts";
import msg, {PositionTypeEnum} from '@/components/message'
import {useUserStore} from "@/store/user-store.ts";

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
}
const loadedData = () => {
  console.log('音频加载完毕')
  audioRef.value.volume = playStore.getSongPlayingInfo.volume
  if (playStore.getSongPlayingInfo.isPlay) {
    audioRef.value.play()
  }
}
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
onMounted(() => {
})
const baseSongUrl = import.meta.env.VITE_BASE_URL + '/static'
</script>

<template>
  <div class="play-root-box">
    <audio class="audio" ref="audioRef"
           @error="msg.error('服务器错误，请稍后重试')"
           @ended="overAudio"
           @pause="onPause"
           @play="onPlay"
           @loadeddata="loadedData()"
           :key="playStore.songInfo.songId">
      <source :src="baseSongUrl+playStore.getSongInfo.songUrl">
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