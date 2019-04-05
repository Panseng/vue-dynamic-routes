<template>
    <div class="dynpo-container">
        <span>Dynamic Page 01</span>
    </div>
</template>

<script>
export default {
  name: 'DynPageOne'
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.dynpo-container {
    position: fixed;
    @include wh(100%, 100%);
    background-color: rgb(226,219,190);
    span {
        @include center;
    }
}
</style>
