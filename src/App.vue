<template>
  <div id="app" class="app-container">
      <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  };
</script>
<style lang="scss">
  .global-background{

  }
  @import './styles/index.scss'; // 全局自定义的css样式
</style>
