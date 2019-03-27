<template>
  <div class="layout-container">
    <head-top></head-top>
    <router-view></router-view>
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
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
