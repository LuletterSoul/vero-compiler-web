const getters = {
  errors: state =>state.lexer.errors,
  tokens: state => state.lexer.tokens,
  lexerProductions: state => state.lexer.lexerProductions,
  syntaxProductions:state=>state.lexer.syntaxProductions,
  result:state=>state.lexer.result,
  lines: state =>state.lexer.lines,
  sidebar: state => state.app.sidebar,
  status: state => state.user.status,
  password:state => state.user.password,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  disposableToken: state => state.user.disposableToken,
  accessToken: state => state.user.accessToken,
  applyCredential:state => state.user.applyCredential,
  avatar: state => state.user.avatar,

  username: state => state.user.userProfile.username,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  userProfile: state =>state.user.userProfile,
  currentUserId:state =>state.user.userProfile.userId,

  previewGroups:state => state.group.divide.previewGroups,
  divideStep: state =>state.group.divide.step,
  newGroups: state =>state.group.newGroups,

  newStudents:state=>state.student.newStudents,
};
export default getters
