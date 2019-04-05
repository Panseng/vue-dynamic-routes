<template>
    <div class="defpt-container">
        <span>Default Page 02</span>
    </div>
</template>

<script>
export default {
  name: 'DefPageTwo'
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.defpt-container {
    position: fixed;
    @include wh(100%, 100%);
    background-color: rgb(255,192,159);
    span {
        @include center;
    }
}
</style>
