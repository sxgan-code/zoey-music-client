<script setup lang="ts">

import {usePlayStore} from "@/store/play-store.ts";
import {useUserStore} from "@/store/user-store.ts";

const playStore = usePlayStore();
const userStore = useUserStore();

function changeBgImg(index: number) {
  localStorage.setItem('bgImg', '/image/skins/2024000' + (index) + '.jpg')
  userStore.bgImg = '/image/skins/2024000' + (index) + '.jpg'
  userStore.isChange = true
}


</script>

<template>
  
  <div class="skins-root-box">
    <h1>背景图片(点击切换)</h1>
    <div class="img-box">
      <div v-for="i in 6">
        <img ref="img" @click="changeBgImg(i)"
             :src="playStore.staticBaseUrl +'/image/skins/2024000'+(i)+'.jpg'"
             alt="">
      </div>
    </div>
  
  </div>
</template>

<style scoped lang="scss">
h1 {
  margin: 3rem;
  color: var(--text-color);
}

.skins-root-box {
  color: var(--text-color);
  height: calc(100vh - 16rem);
  overflow-y: auto;
  
  .img-box {
    height: calc(100vh - 25rem);
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    
    div {
      width: 27rem;
      height: 18rem;
      margin: 2rem;
      background: lightblue;
      
      img {
        width: 27rem;
        height: 18rem;
        object-fit: cover;
        object-position: center;
      }
      
      img:hover {
        transform: scale(1.1);
        transition: 0.5s;
      }
    }
  }
  
}
</style>