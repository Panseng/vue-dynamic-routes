<template>
    <div class="defpo-container">
        <span>Default Page 01</span>
    </div>
</template>

<script>
export default {
  name: 'DefPageOne'
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.defpo-container {
    position: fixed;
    @include wh(100%,100%);
    background-color: rgb(221,240,237);
    span{
        @include center;
    }
}
</style>
