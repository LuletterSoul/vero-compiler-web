<template>
  <div style="margin: 20px">
    <el-row>
      <el-col :offset="10">
        <div class="title">
          语法分析定义
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="21" :span="2">
        <el-button class="btn-item" type="primary" plain icon="el-icon-upload" @click="uploadDialogVisible = true">导入语法产生式
        </el-button>
      </el-col>
      <el-col>
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
            <div style="margin-left: 155px" slot="tip">导入适合LR(1)分析的语法产生式</div>
          </el-upload>
          <span slot="footer" class="dialog-footer">
      <el-button @click="hannleCancelClick">取 消</el-button>
         <el-button type="primary" @click="submitImport">确 定</el-button>
        </span>
        </el-dialog>
      </el-col>
    </el-row>


    <el-row style="margin-top: 20px">
      <el-col>
        <Table border
               :loading="listLoading"
               :columns="productionColumns"
               :data="_productions"
               size='large'
               @on-selection-change="handleSelectionChange"
               stripe></Table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {createTokenLexer, createTokens,getFileLines,createGrammarReadLexer, analysis,getLexerErrors} from 'api/compiler';
  export default {
    name: "syntax",
    data( ){
      return {
        productionColumns: [
          {
            title: '序号',
            type: 'index',
            width: 70,
            align: 'center'
          },
          {
            title: '左部',
            align: 'center',
            width: 200,
            key: 'left'
          },
          {
            title: '全式',
            align: 'center',
            key: 'detail'
          },
        ],
        fileList: [],
        total: null,
        listLoading: false,
        uploadDialogVisible: false,
        multipleSelection: []
      };
    },
    methods:{
      handleImportClick() {
        this.uploadDialogVisible = true
      },
      hannleCancelClick() {
        this.uploadDialogVisible =false
      },
      handleFileRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleFilePreview(file) {
        console.log(file.response);
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
        createGrammarReadLexer(fd).then((res) => {
          //将导入的成功的数据同步
          vm.$message({
            type: 'success',
            message: '语法导入成功'
          });
          vm.productions = res;
          vm.$store.dispatch('SetSyntaxProductions',vm.productions);
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
    },
    computed:{
      _productions() {
        return this.$store.getters.syntaxProductions;
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
