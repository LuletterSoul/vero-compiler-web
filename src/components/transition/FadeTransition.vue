<template>
  <div id="fadeTransition">
    <transition :class="false"
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter"
                @before-leave="beforeLeave"
                @leave="leave"
                @after-leave="afterLeave"
                @appear="appear"
                @before-appear="beforeAppear">
      <div v-show="activeStatus">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'fadeTransition',
    props:{
      isActive: {
        type:Boolean,
        default: true
      },
      fadeInDuration: {
        type:Number,
        default: 1000
      },
      fadeOutDuration: {
        type: Number,
        default: 1000
      },
      isProgressive: {
        type: Boolean,
        default: false
      },
      fadeInOnly: {
        type: Boolean,
        default: false
      },
      fadeOutOnly: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        inlineFadeInDuration: this.fadeInDuration,
        inlineFadeOutDuration: this.fadeOutDuration,
        /*
        inline active demonstrate progressive mode usage,avoiding
        modify parent component props when exchange css animation.
         */
        inlineIsActive:this.isActive,
        inlineIsProgressive: this.isProgressive
      }
    },
    computed: {
      transitionMode:function () {
        if(this.isProgressive){
          console.info("Progressive mode must enable in-and-out props.Current computed object will be noneffective.");
          return;
        }
        if(this.fadeInOnly&&this.fadeOutOnly) {
          console.error("Fade mode can't be set at 'false' or 'true' at the same time.");
          return null;
        }
        else if(this.fadeInOnly){
          return "transition.fadeIn";
        }
        else if(this.fadeOutOnly) {
          return "transition.fadeOut";
        }
      },
      fadeEventName: function () {
        if(this.fadeInOnly) {
          return 'fadeInEnd';
        }
        else if(this.fadeOutOnly) {
          return 'fadeOutEnd';
        }
      },
      fadeDuration: function () {
        if(this.fadeInOnly) {
          return this.fadeInDuration;
        }
        else if(this.fadeOutOnly) {
          return this.fadeOutDuration;
        }
        else if(this.isProgressive){
          return this.fadeInDuration;
        }
        else{
          console.error("Fade mode must be set at out-in-progressive one of them.");
        }
      },
      activeStatus: function () {
        if(this.isProgressive) {
          //if current mode is progressive,active flag will be return as inline active which can be fixed internally.
          return this.inlineIsActive;
        }
        else{
          return this.isActive;
        }
      }
    },
    methods: {
      beforeEnter:function (el){
      },
      enter: function(el, done) {
        let vm = this;
        if(this.isProgressive) {
          Velocity(el, "transition.fadeIn",
            {
              duration: vm.fadeInDuration,
              complete: function () {
                vm.inlineIsActive = false;
                vm.$emit('fadeInEnd');
              }
            },done);
        }
        else{
          console.log("Enter this.");
          vm.generateAnimation(el, done);
        }
      },
      afterEnter:function (el) {
//        this.$emit('fadeInEnd');
      },
      beforeLeave: function(el){
      },
      leave: function(el,done) {
        let vm = this;
        if(this.isProgressive) {
          Velocity(el, "transition.fadeOut",
            {
              duration: vm.fadeInDuration,
              complete: function () {
                vm.inlineIsActive = true;
                vm.$emit('fadeOutEnd');
              }
            },done);
        }
        else{
          vm.generateAnimation(el, done);
        }
      },
      afterLeave: function(el) {
      },
      beforeAppear: function(el){
        el.style = 'display:none';
      },
      appear: function(el,done){
        let vm = this;
        if(this.isProgressive) {
          Velocity(el, "transition.fadeIn",
            {
              duration: vm.fadeInDuration,
              complete: function () {
                vm.inlineIsActive = false;
                vm.$emit('fadeInEnd');
              }
            },done);
        }
        else{
          if(vm.transitionMode==='transition.fadeOut') {
            return;
          }
          vm.generateAnimation(el, done);
        }
      },
      generateAnimation: function (el,done) {
        let vm = this;
        Velocity(el, vm.transitionMode,
          {
            duration: vm.fadeDuration,
            complete: function () {
              vm.$emit(vm.fadeEventName);
            }
          },done);
      },
    }
  };
</script>

<style>
</style>
