<template>
    <div id="animateTransition">
      <transition-group
                  @before-enter="beforeEnter"
                  @enter="enter"
                  @after-enter="afterEnter"
                  @before-leave="beforeLeave"
                  @leave="leave"
                  @after-leave="afterLeave"
                  @before-appear="beforeAppear"
                  @appear="appear">
        <slot class="flip-list-move">
        </slot>
      </transition-group>
    </div>
</template>

<script type="text/javascript">
  export default {
    name: 'AnimateTransition',
    props: {
      duration: {
        type: Number,
        default: 1200
      },
      delay: {
        type: Number,
        default: 500
      },
      inStyle:{
        type: String,
        default: 'transition.slideUpBigIn'
      },
      outStyle:{
        type: String,
        default: 'transition.slideUpBigOut'
      },
        linkIndex:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    methods: {
      beforeEnter: function(el){
        el.style = 'display:none';
      },
      enter: function(el,done){
        let vm = this;
        let dynamicDelay;
        let isDynamicDelay = false;
        //渲染延迟特效
        if(this.linkIndex&&el.dataset.index!==undefined) {
          dynamicDelay = el.dataset.index * 150;
          isDynamicDelay = true;
        }
        Velocity(el, vm.inStyle,
                      { duration:vm.duration,
                        delay : isDynamicDelay?dynamicDelay:vm.delay ,
                        opacity: 1, height: '1.6em',
                        complete:function () {
                          vm.$emit('InEnd');
                        }
                      },done);
      },
      afterEnter: function (el) {
        this.$emit('InEnd');
      },
      beforeLeave:function (el){
        let vm = this;
      },
      leave:function(el,done) {
        let vm = this;
//        if(this.linkIndex&&el.dataset.index!==undefined) {
//          vm.delay = el.dataset.index * 150;
//        }
        Velocity(el, vm.outStyle
          ,{
            duration: vm.duration,
            delay: vm.delay,
            opacity: 0, height: 0,
              complete:function () {
                vm.$emit('OutEnd');
              }
            },
          done
        );
      },
      afterLeave: function (el) {
//        this.$emit('slideOutEnd');
      },
      beforeAppear:function(el){
        el.style = 'display:none';
      },
      appear:function (el,done) {
        let vm = this;
        Velocity(el, vm.inStyle,
          { duration:vm.duration,
            delay : vm.delay},done);
      }
    }
  };
</script>
<style scoped>
  .flip-list-move {
    transition: transform 1s;
  }
</style>
