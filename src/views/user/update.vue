<template>
    <div id="updateUser" class="app-container">
      <el-row>
        <el-col :span="16">
          <div class="demo-block demo-box">
            <el-form ref="form" label-width="80px">
              <el-form-item label="昵称">
                <el-input v-model="newUserProfile.name"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="newUserProfile.gender" placeholder="性别">
                  <el-option label="男" value="man"></el-option>
                  <el-option label="女" value="women"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="生日">
                <el-col :span="11">
                  <el-date-picker type="date"
                                  style="width: 100%;"
                                  v-model="newUserProfile.birthday"
                                  >
                  </el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item  label="来自">
                <region-picker :data="chinaRegionData" :placeholder="'请选择城市'" v-model="newUserProfile.regionCode">
                </region-picker>
              </el-form-item>
              <el-form-item label="个性签名">
              <el-input v-model="newUserProfile.introduction"></el-input>
            </el-form-item>
              <el-form-item label="可管理">
                <el-switch
                  v-model="isAvailable"
                  on-color="#13ce66"
                  off-color="#ff4949"
                  @change="changeAccountStatus">
                </el-switch>
                <!--<el-switch on-text="" off-text="" v-model=""></el-switch>-->
              </el-form-item>
              <el-form-item label="权限角色">
                <el-checkbox-group>
                  <el-checkbox v-model="roles1" v-for="role in roles" :label="role" :key="role">{{ role }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">
                  保存
                </el-button>
                <el-button @click="returnHome">返回</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="4" :offset="1">
          <div class="user-avatar-container">
            <div class="pan-thumb-container">
              <pan-thumb :image="newUserProfile.avatar"></pan-thumb>
              <el-button type="primary" icon="upload" style="position: relative;bottom: 15px;left: 50%;margin-left: -135px;top: 60px;" @click="imageCropperShow=true">修改头像
              </el-button>
            </div>
            <image-cropper :width="300" :height="300"
                           @close="close()"
                           @crop-success="setUserNewAvatar"
                           @crop-upload-success="cropSuccess"
                           :key="imageCropperKey"
                           v-show="imageCropperShow">
            </image-cropper>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex';
  import  { deepCopyObject } from 'utils/index'
  import ImageCropper from 'components/ImageCropper'
  import PanThumb from 'components/PanThumb'
  import RegionPicker from 'region-picker'
  import regionData from 'region-picker/dist/data.json'
  import { update } from 'api/user'

  export default {
    name: 'updateUser',
    data() {
      return {
        imageCropperShow: false,
        imageCropperShow: false,
        imageCropperKey: 0,
        singlePlace: '450981',
        chinaRegionData: {},
        newUserProfile: {},
        roles1: ['admin'],
        roles2:[],
        birthday:null,
        isAvailable: false
      };
    },
    mounted() {
      this.chinaRegionData = regionData;
      this.newUserProfile = deepCopyObject(this.userProfile);
      this.isAvailable = true;
    },
    computed: {
      ...mapGetters([
        'userProfile',
        'roles'
      ])
    },
    methods: {
      cropSuccess(resData) {
        this.imageCropperShow = false;
        this.imageCropperKey = this.imageCropperKey + 1;
        this.image = resData.files.avatar;
      },
      changeAccountStatus(event) {
        if(event) {
          this.newUserProfile.status = '可用';
        }
        else {
          this.newUserProfile.status = '不可用';
        }
      },
      setUserNewAvatar(createImgUrl) {
        this.newUserProfile.avatar = createImgUrl;
      },
        close() {
          this.imageCropperShow = false;
        },
        change() {
        },
        returnHome() {
          this.$router.push({path: '/'});
        },
        onSubmit() {
          let that = this;
          console.log("Submit");
          this.$confirm('确认更新您的用户信息吗','确认更新',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            beforeClose: (action,instance,done) =>{
              if(action==='confirm'){
                instance.confirmButtonLoading = true;
                return new Promise((resolve,reject) =>{
                  update(that.newUserProfile).then(response => {
                    this.$store.dispatch('GetInfo', response.username).then(() => {
                    }).catch(error => console.log(error));
                      setTimeout(function () {
                        vm.$router.push({path: '/'});
                      },4000);
                    setTimeout(() => {
                      instance.confirmButtonLoading = false;
                    }, 1000);
                    that.$message({
                      type: 'success',
                      message: '更新成功'
                    });
                    that.returnHome();
                    resolve(response);
                    done();
                  }).catch(error =>{
                    instance.confirmButtonLoading = false;
                    done();
                    reject(error);
                  })
                })
              }
              done();
            }
          }).catch(() =>{
            that.$message({
              type:'info',
              message:'取消更新'
            })
          })
        }
      },
  components:{
          ImageCropper,
          PanThumb,
          RegionPicker
        }
    }
</script>

<style>
  .user-avatar-container {
    border: 1px solid #eaeefb;
    border-radius: 4px;
    position: absolute;
    width: 200px;
    height: 260px;
    margin-top: 40px;
  }
  .demo-block.hover {
    box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
  }
  .demo-box {
  margin-bottom: 24px;
  }
  .demo-block {
    border: 1px solid #eaeefb;
    border-radius: 10px;
    transition: .2s;
    margin-top: 40px;
    padding: 24px;
    margin-left: 46px;
  }
  .pan-thumb-container{
    margin-top: 10px;
  }
</style>
