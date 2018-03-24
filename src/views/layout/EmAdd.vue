<template>
  <transition name="fadeUp">
    <div
      class="em-add"
      :class="custClass"
      :style="custStyle"
      v-show="pageAnimated">
      <Icon :type="icon"></Icon>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'EmAdd',
  props: {
    icon: {
      type: String,
      default: 'plus-round'
    },
    color: {
      type: String,
      default: 'primary'
    },
    bottom: {
      type: Number,
      default: 30
    }
  },
  computed: {
    custClass () {
      return [
        this.color === 'red' ? 'is-red' : 'is-primary'
      ]
    },
    custStyle () {
      return {
        bottom: this.bottom + 'px'
      }
    }
  }
}
</script>

<style>
.em-add {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  position: fixed;
  right: calc(var(--base-padding) - 10px);
  text-align: center;
  color: #fff;
  line-height: 42px;
  font-size: 18px;
  cursor: pointer;
  transition: var(--all-transition);
  z-index: 90;
}

:root {
  --base-padding: 20px;
  --body-width: 1020px;
  --all-transition: all .3s;
  --color-primary: #2d8cf0;
  --color-primary-hover:#3da3e8;
  --color-red: #f84c5b;
}

.em-add.is-primary {
  background: var(--color-primary);
  box-shadow: 0 10px 30px rgba(45,140,240,.4);
}
.em-add.is-primary:hover {
  background: rgba(45,140,240,.8);
}

.em-add.is-red {
  background: var(--color-red);
  box-shadow: 0 10px 30px color(var(--color-red) a(40%));
}

.em-add.is-red:hover {
  background: color(var(--color-red) a(80%));
}
</style>
