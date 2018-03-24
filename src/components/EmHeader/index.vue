<template>
  <transition name="fade">
    <div
      class="em-header"
      :class="{'em-header--fixed': isFixed}"
      v-show="pageAnimated">
      <Affix @on-change="changeFixed">
        <div class="em-header__content">
          <transition name="fade">
            <em-spots :size="spots" v-if="routeChanged"></em-spots>
          </transition>
          <div class="em-container">
            <Row>
              <i-col class="logo" span="1">
                <transition name="fade">
                  <Icon :type="icon" v-show="routeChanged"></Icon>
                </transition>
              </i-col>
              <i-col span="16" class="em-header__info">
                <transition-group name="fade">
                  <h2 key="a" v-show="routeChanged">{{title}}</h2>
                  <p key="b" v-show="routeChanged">{{description}}</p>
                </transition-group>
              </i-col>
              <i-col span="6" class="em-header__control">
                <slot v-if="!nav"></slot>
              </i-col>
            </Row>
          </div>
          <div class="em-header__nav" v-if="nav">
            <div class="em-container">
              <div style="float: right;">
                <div
                  class="em-header__nav__item"
                  :class="{'is-active': value === item.title}"
                  v-for="(item, i) in nav"
                  :key="i"
                  @click="$emit('input', item.title)">
                  <Icon :type="item.icon" v-if="item.icon"></Icon> {{item.title}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Affix>
    </div>
  </transition>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
@c header {
  height: 110px;
  position: relative;

  .ivu-affix .em-header__content {
    padding: 10px 0;
  }

  @m fixed {
    z-index: 20;
  }

  @d nav {
    position: absolute;
    bottom: -1px;
    width: 100%;
    font-size: 13px;

    @d item {
      float: left;
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
      color: #586069;
      cursor: pointer;
      border: solid transparent;
      border-width: 3px 1px 1px;
      border-radius: 3px 3px 0 0;

      i {
        margin-right: 2px;
      }

      @when active {
        color: #24292e;
        background: #f5f7fa;
        border-color: var(--color-primary) #e1e4e8 transparent;
      }
    }
  }

  .logo {
    width: 50px;
    height: 50px;
    background: var(--color-primary);
    border-radius: 4px;
    box-shadow: 0 10px 50px color(var(--color-primary) a(40%));
    color: #fff;
    font-size: 28px;
    text-align: center;
    line-height: 50px;
  }

  @d content {
    padding: 30px 0;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
    overflow-y: hidden;
    width: 100%;
    transition: var(--all-transition);
    position: relative;
  }

  @d control {
    position: relative;
    top: 10px;

  &,
    .ivu-radio-group {
      float: right;
    }
  }

  @d info {
    margin-top: 2px;
    margin-left: 20px;

    h2 {
      font-size: 18px;
      font-weight: 700;
    }

    p {
      font-size: 12px;
      color: #9a9ca0;
      font-weight: 400;
    }
  }
}

</style>

<script>
export default {
  name: 'EmHeader',
  props: {
    title: String,
    description: String,
    icon: String,
    spots: Number,
    nav: Array,
    value: {}
  },
  data () {
    return {
      routeChanged: true,
      isFixed: false
    }
  },
  watch: {
    title: function () {
      this.routeChanged = false
      this.$nextTick(() => {
        this.routeChanged = true
      })
    }
  },
  methods: {
    changeFixed (isFixed) {
      this.isFixed = isFixed
    }
  }
}
</script>
