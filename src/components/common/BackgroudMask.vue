<script setup lang="ts">

</script>

<template>
  <div  class="bg-mask">
    <img src="@/assets/images/20240005.jpg" alt="">
  </div>
</template>

<style scoped lang="scss">
.bg-mask{
  position: fixed;
  left: 0;
  top: 0;
  z-index: -9;
  width: 100vw;
  height: 100vh;
  img {
    width: 100vw;
    height: 100vh;
    object-fit:cover;
    object-position: center;
    //background-size: cover;
    opacity: 0.94;
  }
}
</style>