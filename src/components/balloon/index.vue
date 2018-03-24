<template>
  <div id = "balloon" class="balloon-content">
    <span v-for="balloonStyle in balloonObject" class="decorate" :style="balloonStyle">
    </span>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'balloon',
    props: {
      balloonSizeRange: {
        type: Object,
        default: function () {
          return {
            min: 20,
            max: 60
          };
        }
      },
      balloonCount:{
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        balloonObject:[],
        scrollPosition :0
      };
    },
    created() {
      for(let index = 0;index< this.balloonCount;++index) {
        this.balloonObject.push(this.randomBalloon());
      }
    },
    computed: {
      drawBase() {
        return  100 / this.balloonCount;
      }
    },
    methods: {
      generateBackgroundColor() {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        return 'rgb(' + red + ',' + green + ',' + blue + ')';
      },
      generateBalloonParam() {
        let max = this.balloonSizeRange.max;
        let min = this.balloonSizeRange.min;
        return Math.ceil(Math.random() * (max - min)) + min;
      },
      generateLeftOffset() {
        let max = this.drawBase + this.scrollPosition;
        let min = this.scrollPosition;
        this.scrollPosition += this.drawBase;
        return Math.random() * (max - min) + min;
      },
      randomBalloon() {
        let backgroundColor = this.generateBackgroundColor();
        let balloonRadius = this.generateBalloonParam();
        let leftOffset =  this.generateLeftOffset();
        return {
          background: backgroundColor,
          width: balloonRadius + 'px',
          height: balloonRadius + 'px',
          marginTop: Math.random() * 100 + '%',
          marginLeft: leftOffset + '%',
//          top: Math.random() * 100 + '%',
        };
      }
    }
  };
</script>
<style>
  .balloon-content{
    position: relative;
  }
  .decorate {
    border-radius: 50%;
    position: absolute;
    opacity: .13;
  }
</style>
