const group = {
  state:{
    divide:{
      previewGroups:{
        dataMiningGroups:[],
        dataMiningTask:''
      },
      setting:{},
      step:0
  },
    newGroups:[]
  },
  mutations:{
    SET_PREVIEW_GROUPS:(state,groups) =>{
      state.divide.previewGroups = groups;
    },
    SET_SETTING: (state,setting) =>{
      state.divide.setting = setting;
    },
    SET_STEP: (state,step) =>{
      state.divide.step = step;
    },
    SET_NEW_GROUPS: (state,groups) =>{
      state.newGroups = groups;
    },
    RESET: (state) =>{
      state.divide.previewGroups = {
        dataMiningGroups:[],
        dataMiningTask:''
      };
      state.divide.setting={}
    }
  },
  actions:{
    SetPreviewGroups:({commit},groups) =>{
      commit('SET_PREVIEW_GROUPS', groups);
    },
    SetSetting:({commit,setting}) =>{
      commit('SET_SETTING', setting);
    },
    SetStep:({commit},step) =>{
      commit('SET_STEP', step);
    },
    SetNewGroups({commit},newGroups) {
      commit('SET_NEW_GROUPS', newGroups);
    },
    ResetDivideInfo({commit}) {
      commit('RESET');
    }
  }
};

export default group;
