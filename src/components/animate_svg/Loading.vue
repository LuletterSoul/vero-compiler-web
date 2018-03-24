<template>
  <div v-if="showLoading">
    <fade-transition :is-progressive="true" :fade-in-duration="4000" :fade-out-duration="4000">
      <div v-show="loadingBackground">
        <div :style="loadingWrap" >
        </div>
      </div>
    </fade-transition>
    <div id="loading" class="sk-container">
          <div v-bind:class="skObject">
            <div v-for="(item,index) in skElement" v-bind:class="item">
            </div>
          </div>
        </div>
  </div>
</template>

<script type="text/javascript">
  import FadeTransition from '@/components/transition/FadeTransition';
  export default {
    name: 'Loading',
    props: {
      loadingBackground:{
        type: Boolean,
        default: true,
      },
      showLoading:{
        type: Boolean,
        default:true
      },
      foldingActive: {
        type: Boolean,
        default: false
      },
      gridActive: {
        type: Boolean,
        default: false
      },
      spinnerActive: {
        type: Boolean,
        default: false
      },
      backgroundColor:{
        type: String,
        default :''
      },
    },
    data() {
      return {
        colorSet : [
          '#d35400','#2c3e50','#1abc9c','#2980b9','#7f8c8d'
          ,'#ffcb65','#27ae60'
        ],
        isFoldingActive : this.foldingActive,
        isGridActive: this.gridActive,
        isSpinnerActive: this.spinnerActive
      };
    },
    methods :{
      generateColorBackground: function () {
        if(this.backgroundColor!==''){
          return this.backgroundColor;
        }
        else{
          let randomIndex = Math.floor(Math.random() * this.colorSet.length);
          return this.colorSet[randomIndex];
        }
      }
    },
    computed: {
      skObject: function () {
        if(this.isFoldingActive) {
          this.isGridActive = false;
          this.isSpinnerActive = false;
          return 'sk-folding-cube';
        }
        else if(this.isGridActive){
          this.isFoldingActive = false;
          this.isSpinnerActive = false;
          return 'sk-cube-grid';
        }
        else if(this.isSpinnerActive) {
          this.isFoldingActive = false;
          this.isGridActive = false;
          return 'spinner';
        }
      },
      skElement: function () {
        let loadingCube = [];
        if(this.isFoldingActive) {
          loadingCube[0] = 'sk-cube1 sk-cube';
          loadingCube[1] = 'sk-cube2 sk-cube';
          loadingCube[2] = 'sk-cube4 sk-cube';
          loadingCube[3] = 'sk-cube3 sk-cube';
        }
          else if(this.isGridActive) {
            for(let i=1;i<=9;i++) {
              loadingCube[i-1]='grid'+' grid'+i;
            }
          }
          else if(this.isSpinnerActive) {
            for(let i=1;i<=5;i++) {
              loadingCube[i-1]='rect'+i;
            }
        }
          return loadingCube;
        },
        loadingWrap: function () {
          let loadingBackground = {
            background: '',
            width: '100%',
            height: '100%',
            position: 'fixed'
          };
          loadingBackground.background = this.generateColorBackground();
          loadingBackground.width = '100%';
          loadingBackground.height = '100%';
          return loadingBackground;
        }
      },
    components:{
      FadeTransition
    }
  };
</script>
<style>
  @import "/static/loading/loading.css";
  .loading-wrap{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #27ae60;
    /*text-align: center;*/
  }
</style>
