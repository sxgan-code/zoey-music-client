<script setup lang="ts">

/* 打开一个子窗口*/
import BackgroudMask from "@/components/common/BackgroudMask.vue";

const openChildWin = (path: string) => {
  let data = {
    width: 500,
    height: 600,
    url: path
  }
  console.log(path)
  window.ipcRenderer.invoke('renderer-open-win', data);
}
</script>

<template>
  <div class="main-box-root">
    <backgroud-mask/>
    <div class="head-box">

    </div>
    <div class="content-box">
      <div class="left-menu"></div>
      <div class="right-box"></div>
    </div>
  </div>
  <button type="button" @click="openChildWin('/login')">打开一个窗口</button>
</template>

<style scoped lang="scss">
.main-box-root{
  width: 100vw;
  height: 100vh;
  .head-box{
    height: 8rem;
    width: 100vw;
    background: rgba(#254612,0.3);
    -webkit-app-region: drag; // 整个菜单栏可拖拽
  }
  .content-box{
    width: 100vw;
    height: calc(100vh - 8rem);
    display: flex;
    .left-menu{
      width: 24rem;
      height: 100%;
      background: rgba(#751423,0.3);
    }
    .right-box{
      width: calc(100vw - 24rem);
      height: 100%;
      background: rgba(#222,0.3);
    }
  }
}

</style>