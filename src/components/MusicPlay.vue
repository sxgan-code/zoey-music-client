<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {usePlayStore} from "@/store/play-store.ts";
import msg from '@/components/message'

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
/**
 * @Description: 音频监听
 * @Author: sxgan
 * @Date: 2024/4/17 17:14
 **/
const playStore = usePlayStore()
const audioRef = ref()
watch(() => playStore.getSongPlayingInfo.isPlay, (newValue, oldValue) => {
  if (newValue) {
    audioRef.value.play()
  } else {
    audioRef.value.pause()
    
  }
})
onMounted(() => {
  audioRef.value.volume = playStore.getSongPlayingInfo.volume
})
const url = import.meta.env.VITE_BASE_URL + '/static' + playStore.getSongInfo.songUrl

</script>

<template>
  <div class="play-root-box">
    <audio class="audio" ref="audioRef"
           @error="msg.error('服务器错误，请稍后重试')"
           @ended="overAudio"
           @pause="onPause"
           @play="onPlay">
      <source :src="url" type="audio/mpeg">
    </audio>
  </div>
</template>

<style scoped lang="scss">

</style>