<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts';
  require('echarts/theme/macarons'); // echarts 主题
  import { debounce } from 'utils';
  import { getSystemStatistics } from '../../../api/dashboard.js';
  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        chart: null,
        studentWeekTraffic:null,
        teacherWeekTraffic:null,
        options:{
          xAxis: {
            data: [],
            boundaryGap: false
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          yAxis: {},
          series: [{
            name: 'Teacher Traffic',
            itemStyle: {
              normal: {
                areaStyle: {}
              }
            },
            smooth: true,
            type: 'line',
            data : [],
            animationDuration: 2600,
            animationEasing: 'cubicInOut'
          },
            {
              name: 'Student Traffic',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: 'rgba(2, 197, 233, 0.2)',
                  lineStyle: {
                    color: 'rgba(2, 197, 233, 0.2)'
                  },
                  areaStyle: {
                    color: 'rgba(99,194,255, 0.6)'
                  }
                }
              },
              data: [],
              animationDuration: 2000,
              animationEasing: 'quadraticOut'
            }]
        }
      };
    },
    created() {
    },
    mounted() {
      this.initChart();
      this.fetchStatistics();
      if (this.autoResize) {
        this.__resizeHanlder = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100);
        window.addEventListener('resize', this.__resizeHanlder)
      }
      // 监听侧边栏的变化
      const sidebarElm = document.getElementsByClassName('sidebar-container')[0];
      sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      if (this.autoResize) {
        window.removeEventListener('resize', this.__resizeHanlder)
      }

      const sidebarElm = document.getElementsByClassName('sidebar-container')[0];
      sidebarElm.removeEventListener('transitionend', this.__resizeHanlder);

      this.chart.dispose();
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons');
      },
      fetchStatistics() {
        let vm = this;
        return new Promise((resolve, reject)=> {
          getSystemStatistics().then(response => {
            vm.studentWeekTraffic = response.studentWeekTraffic;
            vm.teacherWeekTraffic = response.teacherWeekTraffic;
            vm.updateOptions();
            vm.chart.setOption(vm.options);
            resolve(response);
          }).catch(error =>{
            reject(error);
          })
        })
      },
      updateOptions(){
        this.options.xAxis.data = this.xAxisData;
        this.options.series[1].data = this.yStudentAxisData;
        this.options.series[0].data = this.yTeacherAxisData;
        }
      },
      computed:{
      xAxisData() {
        if(this.studentWeekTraffic) {
          let map = this.studentWeekTraffic.dayTrafficMap;
          let xAxisData = [];
          for (var key in map) {
            xAxisData.push(key.substring(0, 3));
          }
          return xAxisData;
        }
        return null;
      },
      yStudentAxisData() {
        if(this.studentWeekTraffic) {
          let map = this.studentWeekTraffic.dayTrafficMap;
          let yStudentAxisData = [];
          for (var key in map) {
            yStudentAxisData.push(map[key]);
          }
          return yStudentAxisData;
        }
        return null;
      },
      yTeacherAxisData() {
        if(this.teacherWeekTraffic) {
          let map = this.teacherWeekTraffic.dayTrafficMap;
          let yTeacherAxisData = [];
          for(var key in map) {
            yTeacherAxisData.push(map[key]);
          }
          return yTeacherAxisData;
        }
        return null;
      }
    }
}
</script>
