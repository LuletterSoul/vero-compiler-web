const student = {
  state:{
    newStudents:[]
  },
  mutations:{
    SET_NEW_STUDENTS:(state,students) =>{
      state.newStudents = students;
      console.log(state.newStudents);
    },
  },
  actions:{
    SetNewStudents:({commit},students) =>{
      commit('SET_NEW_STUDENTS', students);
    },
  }
};
export default student;
