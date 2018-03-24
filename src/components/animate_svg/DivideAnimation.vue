<template>
  <div v-show="isActive">
    <div class="sk-folding-line sk-position-1">
      <div class="sk-cube1 sk-cube"></div>
      <div class="sk-cube2 sk-cube"></div>
      <div class="sk-cube4 sk-cube"></div>
      <div class="sk-cube3 sk-cube"></div>
    </div>
  <div class="sk-folding-line sk-position-2">
    <div class="sk-cube1 sk-cube"></div>
    <div class="sk-cube2 sk-cube"></div>
    <div class="sk-cube4 sk-cube"></div>
    <div class="sk-cube3 sk-cube"></div>
  </div>
  <div class="sk-folding-line sk-position-3">
    <div class="sk-cube1 sk-cube"></div>
    <div class="sk-cube2 sk-cube"></div>
    <div class="sk-cube4 sk-cube"></div>
    <div class="sk-cube3 sk-cube"></div>
  </div>
  <div class="sk-folding-line sk-position-4">
    <div class="sk-cube1 sk-cube"></div>
    <div class="sk-cube2 sk-cube"></div>
    <div class="sk-cube4 sk-cube"></div>
    <div class="sk-cube3 sk-cube"></div>
  </div>
  <div class="sk-folding-line sk-position-5">
    <div class="sk-cube1 sk-cube"></div>
    <div class="sk-cube2 sk-cube"></div>
    <div class="sk-cube4 sk-cube"></div>
    <div class="sk-cube3 sk-cube"></div>
  </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'DivideAnimation',
    props: {
      isActive: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
      }
    },
    method: {

    }
  };
</script>

<style>
  @import "../../styles/divide.scss";
</style>
