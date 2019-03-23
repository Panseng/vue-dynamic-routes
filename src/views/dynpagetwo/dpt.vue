<template>
    <div class="dynpt-container">
        <span>Dynamic Page 02</span>
    </div>
</template>

<script>
export default {
  name: 'DynPageTwo'
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.dynpt-container {
    @include wh(100%, 100%);
    background-color: white;
    span {
        @include center;
    }
}
</style>
