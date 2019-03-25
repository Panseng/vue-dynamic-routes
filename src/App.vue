<template>
  <div id="app">
    <head-top></head-top>
    <router-view/>
  </div>
</template>

<script>
import headTop from '@/components/common/head'
export default {
  name: 'App',
  components: {
    headTop
  }
}
</script>

<style lang="scss">
@import './style/common';
</style>
