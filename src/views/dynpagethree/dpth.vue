<template>
    <div class="dynpth-container">
        <span>Dynamic Page 03</span>
    </div>
</template>

<script>
export default {
  name: 'DynPageThree'
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.dynpth-container {
    @include wh(100%, 100%);
    background-color: rgb(163,163,128);
    span {
        @include center;
    }
}
</style>
