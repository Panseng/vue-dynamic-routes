<template>
  <div class="header-container">
    <h4>header</h4>
  </div>
</template>

<script>
export default {
  name: "head"
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.header-container {
  @include wh(100%, 8%);
  background-color: rgb(76,180,231);
  position: relative;
  h4{
    @include center;
  }
}
</style>
