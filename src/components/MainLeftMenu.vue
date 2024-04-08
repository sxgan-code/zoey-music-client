<script setup lang="ts">
import {ref} from "vue";
import {usePlayStore} from '@/store/play-store.ts'
import songlistMockData from "@/assets/mock/songlist-mock-data.ts";

const playStore = usePlayStore()

const creates = ref(songlistMockData.creates)
const collects = ref(songlistMockData.collects)


/*打开歌单对应页面*/
function openSysPage(sysFlag: string) {
  // ElMessageBox.confirm(
  //     '功能暂未实现!!!',
  //     '提示',
  //     {
  //       confirmButtonText: '确认',
  //       type: 'warning',
  //       center: true,
  //     }
  // )
}

function openPage(songlistId: string) {
  // songListId.value = songlistId
  // router.push("/efairy/main/MusicPavilion/" + songlistId)
}
</script>

<template>
  <div class="menu-block">
    <div class="my-music-title">在线音乐</div>
    <div class="my-music-list">
      <div class="like-music" @click="openSysPage('mylove')">
        <i class="icon huaweiicon icon-ic_public_home"></i> <span>推荐</span>
      </div>
      <div class="local-down" @click="openSysPage('down')">
        <i class="icon huaweiicon icon-ic_device_earphone_roc"></i> <span>乐馆</span>
      </div>
      <div class="recent-play" @click="openSysPage('recentplay')">
        <i class="icon huaweiicon icon-e8067f9-fa0c-4dc2-a249-ffde979e3a5f"></i> <span>视频</span>
      </div>
      <div class="audition-list" @click="openSysPage('auditionlist')">
        <i class="icon huaweiicon icon-a11-6e8d-4075-a5fb-773f53432fb8"></i> <span>雷达</span>
      </div>
    </div>
  </div>
  <div class="menu-block">
    <div class="my-music-title">我的音乐</div>
    <div class="my-music-list">
      <div class="like-music" @click="openSysPage('mylove')">
        <i class="icon huaweiicon icon-ic_public_favor"></i> <span>我喜欢</span>
      </div>
      <div class="local-down" @click="openSysPage('down')">
        <i class="icon huaweiicon icon-ic_gallery_move_out"></i> <span>本地和下载</span>
      </div>
      <div class="recent-play" @click="openSysPage('recentplay')">
        <i class="icon huaweiicon icon-ic_public_time"></i> <span>最近播放</span>
      </div>
      <div class="audition-list" @click="openSysPage('auditionlist')">
        <i class="icon huaweiicon icon-ic_device_earphone"></i> <span>试听列表</span>
      </div>
      <div class="purchased-music" @click="openSysPage('purchasedmusic')">
        <i class="icon huaweiicon icon-ic_public_appstore"></i> <span>已购音乐</span>
      </div>
    </div>
  </div>
  <div class="menu-block">
    <div class="my-music-title">创建的歌单</div>
    <div class="my-music-list">
      <div :class="playStore.songInfo.songListId==item.songlistId?'love-collect selectNode':'love-collect'"
           v-for="(item,index) in creates"
           @click="openPage(item.songlistId)">
        <span>{{ item.songlistName.length > 6 ? item.songlistName.substring(0, 7) + '...' : item.songlistName }}</span>
        <div
            :class="playStore.songInfo.songListId==item.songlistId&&playStore.songPlayingInfo.isPlay?'play-img':''"></div>
      </div>
    </div>
  </div>
  <div class="menu-block">
    <div class="my-music-title">收藏的歌单</div>
    <div class="my-music-list">
      <div :class="playStore.songInfo.songListId==item.songlistId?'love-collect selectNode':'love-collect'"
           v-for="item in collects"
           @click="openPage(item.songlistId)">
        <span>{{ item.songlistName.length > 6 ? item.songlistName.substring(0, 7) + '...' : item.songlistName }}</span>
        <div
            :class="playStore.songInfo.songListId==item.songlistId&&playStore.songPlayingInfo.isPlay?'play-img':''"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-block {
  width: 16rem;
  margin: 0 2rem;
  color: var(--text--light);
  .my-music-title {
    font-family: 'HarmonyOS Sans';
    font-size: 1.2rem;
    width: 16rem;
    margin: 1rem 0 0.5rem 0;
    line-height: 2rem;
  }

  .my-music-list {
    display: flex;
    flex-direction: column;
    font-size: 1.4rem;

    > div {
      //height: 3rem;
      //line-height: 3rem;
      width: 16rem;
      margin: 0.5rem 0;
      border-radius: 0.5rem;
      i {
        line-height: 3rem;
        font-size: 1.8rem;
        font-weight: lighter;
        margin: 0 1rem;
      }

      > span {
        margin: auto 0;
      }
    }

    .love-collect {
      height: 3rem;
      line-height: 3rem;
      width: 16rem;
      margin-left: 0.5rem;
      border-radius: 0.5rem;
      display: flex;
      flex-direction: row;
      align-items: center;

      span {
        width: 12rem;
        display: block;
        line-height: 3rem;
        margin-left: 1rem;
      }

      .play-img {
        display: block;
        width: 1.6rem;
        height: 0.9rem;
        line-height: 3rem;
        background: url("@/assets/images/wave.gif") repeat;
        background-size: 60%;
      }
    }

    div:hover {
      background: var(--bg--active-rgba);
    }

    .selectNode {
      color: var(--el-color-white);
      background: var(--bg--active-rgba);
    }
  }
}
</style>