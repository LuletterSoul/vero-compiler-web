<template>
  <div style="margin: 20px">
    <el-row v-if ="!disable">
      <el-col :offset="10">
        <div class="title">
          词法分析流程
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="22" :span="1">
        <el-button class="btn-item" type="primary" plain icon="el-icon-upload" @click="uploadDialogVisible = true" v-if="!disable">输入文本
        </el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:20px;">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>词法分析文件</span>
          </div>
          <p v-for="(line,index) in _line" :key="index" style="font-size: 16px">{{line}}</p>
        </el-card>
      </el-col>

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
          <div style="margin-left: 200px" slot="tip">上传待进行词法分析的文件</div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
      <el-button @click="hannleCancelClick">取 消</el-button>
         <el-button type="primary" @click="submitImport">确 定</el-button>
        </span>
      </el-dialog>

    </el-row>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <el-row style="margin-bottom: 20px">
          <el-col :offset="12">
            <div style="font-size: 20px;">
              Token流
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <Table border
                   :loading="listLoading"
                   :columns="tokenColumns"
                   :data="_tokens"
                   size='large'
                   @on-selection-change="handleSelectionChange"
                   stripe></Table>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row style="margin-bottom: 20px">
          <el-col :offset="12">
            <div style="font-size: 20px;">
              词法错误
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <Table border
                   :loading="listLoading"
                   :columns="errorColumns"
                   :data="_errors"
                   :no-data-text="'无词法错误'"
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
  import {createTokenLexer, createTokens,getFileLines,createGrammarReadLexer, analysis,getLexerErrors} from 'api/compiler';

  export default {
    name: "lexer",
    props:{
      disable:false
    },
    data() {
      return {
        tokenColumns: [
          {
            title: '序号',
            type: 'index',
            width: 70,
            align: 'center'
          },
          {
            title: 'Token',
            align: 'center',
            width: 500,
            key: 'content'
          },
          {
            title: '类型',
            align: 'center',
            key: 'type'
          },
        ],
        errorColumns: [
          {
            title: '序号',
            type: 'index',
            width: 70,
            align: 'center'
          },
          {
            title: '词法错误',
            align: 'center',
            key: 'detail'
          },
        ],
        fileList: [],
        total: null,
        listLoading: false,
        uploadDialogVisible: false,
        multipleSelection: [],
        result:{}
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
        createTokens(fd).then((result) => {
          //将导入的成功的数据同步
          vm.$message({
            type: 'success',
            message: '词法分析器生成成功'
          });
          vm.result = result;
          vm.$store.dispatch('SetTokens', vm.result.lexemeDtos);
          vm.$store.dispatch('SetErrors',  vm.result.errorDtos);
          getFileLines().then(res => {
            vm.$store.dispatch('SetLines', res);
          });
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
    computed: {
      _tokens() {
        return this.$store.getters.tokens;
      },
      _line(){
        return this.$store.getters.lines.map( (l,index) => {return index + ":         "  + l});
      },
      _errors(){
        return this.$store.getters.errors;
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
