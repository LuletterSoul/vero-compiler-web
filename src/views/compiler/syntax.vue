<template>
  <div style="margin: 20px">
    <el-row>
      <el-col :offset="10">
        <div class="title">
          语法分析流程
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="22" :span="2">
        <el-button class="btn-item" type="primary" plain icon="el-icon-upload" @click="uploadDialogVisible = true">
          输入文件
        </el-button>
      </el-col>
      <el-col style="margin-top: 20px">
        <el-dialog
          title="导入文法"
          :visible.sync="uploadDialogVisible"
          width="30%">
          <el-upload
            class="upload-container"
            drag
            action="Deprecated"
            ref="importExcel"
            :auto-upload="false"
            :on-remove="handleFileRemove"
            :before-remove="beforeFileRemove"
            :before-upload="handleBeforeUpload"
            :file-list="fileList"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将语法文件拖到此处，或<em>点击上传</em></div>
            <div style="margin-left: 155px" slot="tip">输入待分析文本</div>
          </el-upload>
          <span slot="footer" class="dialog-footer">
      <el-button @click="hannleCancelClick">取 消</el-button>
         <el-button type="primary" @click="submitImport">确 定</el-button>
        </span>
        </el-dialog>
      </el-col>
    </el-row>

    <el-row style="margin-top: 50px">
      <lexer :disable="true">
      </lexer>
    </el-row>

    <el-row style="margin-top: 50px">
      <el-col>
        <el-row>
          <el-col :offset="10">
            <div style="font-size: 20px;">
              基于LR(1)的语法分析表
            </div>
          </el-col>
        </el-row>
      <el-row style="margin-top: 20px">
        <el-col>
          <el-table
            :data="_result.analysisTable.rows"
            border
            fit
            highlight-current-row
            style="width: 100%">
            <el-table-column
              prop="status"
              label="状态"
              width="150"
              align="center">
            </el-table-column>
            <el-table-column label="ACTION" align="center" :width="800">
              <el-table-column
                v-for="(item,index) in _result.analysisTable.terminals"
                :key="index"
                :label="item"
                align="center"
                width="120">
                <template slot-scope="scope">{{ handleActionDisplay(scope.row.actionCellMap[item]) }}</template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="GOTO" align="center">
              <el-table-column
                v-for="(item,index) in _result.analysisTable.noTerminals"
                :key="index"
                :label="item"
                align="center"
                width="120">
                <template slot-scope="scope">{{ handleGotoDisplay(scope.row.gotoCellMap[item]) }}</template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      </el-col>
    </el-row>
    <el-row style="margin-top: 50px">
      <el-col>
        <el-row style="margin-bottom: 20px">
          <el-col :offset="10">
            <div style="font-size: 20px;">
              基于LR(1)语法分析表的分析过程
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <Table border
                   :loading="listLoading"
                   :columns="processColumn"
                   :data="_history"
                   size='large'
                   @on-selection-change="handleSelectionChange"
                   stripe></Table>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    createTokenLexer,
    createTokens,
    getFileLines,
    createGrammarReadLexer,
    analysis,
    getLexerErrors
  } from 'api/compiler';
  import lexer from './lexer'

  export default {
    name: "syntax",
    components:{lexer},
    data() {
      return {
        fileList: [],
        total: null,
        result:{},
        listLoading: false,
        uploadDialogVisible: false,
        multipleSelection: [],
        processColumn:[
          {
            title: '序号',
            type: 'index',
            width: 70,
            align: 'center'
          },
          {
            title: '状态栈',
            align: 'center',
            key: 'status'
          },
          {
            title: '符号栈',
            align: 'center',
            key: 'symbol'
          },
          {
            title: '输入串',
            align: 'center',
            key: 'input'
          },
          {
            title: 'ACTION',
            align: 'center',
            key: 'action'
          },
          {
            title: 'GOTO',
            align: 'center',
            key: 'goto'
          }
        ]
      };
    },
    methods: {
      handleImportClick() {
        this.uploadDialogVisible = true
      },
      hannleCancelClick() {
        this.uploadDialogVisible = false
      },
      handleFileRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleFilePreview(file) {
        console.log(file.response);
      },
      handleActionDisplay(action) {
        let display = ' ';
        if(action.index === -1){
          return display;
        }
        else if(action.type ==='SHFIT'){
          return 'S' + action.index;
        }
        else if(action.type ==='REDUCE'){
          return 'r' + action.index;
        }
        else{
          return 'ACCEPT';
        }
      },
      handleGotoDisplay(goto){
        if(goto.gotoStatus === -1){
          return ' ';
        }else{
          return goto.gotoStatus;
        }
      },
      beforeFileRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleBeforeUpload(file) {
        let vm = this;
        let fd = new FormData();
        fd.append('file', file);
        analysis(fd).then((res) => {
          //将导入的成功的数据同步
          vm.$message({
            type: 'success',
            message: '词法分析器生成成功'
          });
          vm.result = res;
          vm.$store.dispatch('SetResult',vm.result);
          if(vm.result.errorDtos !==undefined) {
            vm.$store.dispatch('SetErrors',vm.result.errorDtos);
          }
          else{
            vm.$store.dispatch('SetErrors',[]);
          }
          if(vm.result.lexemeDtoList!==undefined) {
            vm.$store.dispatch('SetTokens',vm.result.lexemeDtoList);
          }else{
            vm.$store.dispatch('SetTokens',[]);
          }
          if(vm.result.preLines!==undefined) {
            vm.$store.dispatch('SetLines',vm.result.preLines);
          }else{
            m.$store.dispatch('SetLines',[]);
          }
          this.listLoading = false;
          vm.uploadDialogVisible = false;
        }).catch(error => {
          console.log(error);
          vm.uploadDialogVisible = false;
        });
      },
      submitImport() {
        this.$refs.importExcel.submit();
      },
      handleGoto(action){
        if(action.nextStatus !==undefined) {
          return action.nextStatus;
        }else{
          return ' ';
        }
      },
      handleAction(action) {
        if(action.type ==='SHFIT'){
          return 'S' + action.status;
        }
        else if(action.type ==='REDUCE'){
          return 'r' + action.status;
        }
        else{
          return 'ACCEPT';
        }
      },
    },
    computed: {
      _productions() {
        return this.$store.getters.syntaxProductions;
      },
      _result() {
        return this.$store.getters.result;
      },
      _history(){
        let vm = this;
        let history = this.$store.getters.result.analysisHistories;
        if(history===undefined ) {
          return [];
        }
        else{
          return history.map( h =>{
            return {
              input: h.input ===undefined ? '': h.input.join(),
              symbol:h.symbol===undefined ? '':h.symbol.join(),
              status:h.status===undefined? '':h.status.join(),
              action:vm.handleAction(h.action),
              goto:vm.handleGoto(h.action)
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .title {
    alignment: center;
    margin-bottom: 20px;
    width: 100%;
    font: bold 36px 微软雅黑;
  }
</style>
