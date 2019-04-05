<template>
  <div class="layout-container">
    <head-top></head-top>
    <transition name="swiper">
      <router-view />
    </transition>
  </div>
</template>

<script>
import headTop from '@/components/common/head'
export default {
  components: { headTop }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
.layout-container{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  .swiper-enter {
    transform: translateX(100%);
  }
  .swiper-leave-to {

    transform: translateX(-100%);
  }
  .swiper-enter-active,
  .swiper-leave-active {
    transition: all 2s ease-in-out;
  }
  .swiper-enter-to,
  .swiper-leave {
    transform: translateX(0);
  }
}

</style>
