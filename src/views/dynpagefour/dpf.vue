<template>
    <div class="dynpf-container">
        <span>Dynamic Page 04</span>
    </div>
</template>

<script>
export default {
  name: 'DynPageFour'
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.dynpf-container {
    position: fixed;
    @include wh(100%, 100%);
    background-color: rgb(255,238,147);
    span {
        @include center;
    }
}
</style>
