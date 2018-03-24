const lexer = {
  state: {
    lexerProductions: [],
    syntaxProductions:[],
    tokens:[],
    lines:[],
    errors:[],
    result:{
      analysisTable :{
        rows:[]
      }
    }
  },
  mutations: {
    'SET_LEXER_PRODUCTION': (state, productions) => {
      state.lexerProductions = productions;
    },
    'SET_SYNTAX_PRODUCTIONS': (state, productions) => {
      state.syntaxProductions = productions;
    },
    'SET_TOKENS': (state, tokens) => {
      state.tokens = tokens;
    },
    'SET_LINES':(state,lines) =>{
      state.lines = lines;
    },
    'SET_ERRORS':(state,errors) =>{
      state.errors = errors;
    },
    'SET_RESULT':(state,result) =>{
      state.result = result;
    }
  },
  actions: {
    // 获取用户信息
    SetLexerProductions({commit}, productions) {
      commit('SET_LEXER_PRODUCTION', productions);
    },
    SetSyntaxProductions({commit}, productions) {
      commit('SET_SYNTAX_PRODUCTIONS', productions);
    },
    SetTokens({commit},tokens){
      commit('SET_TOKENS',tokens)
    },
    SetLines({commit},lines){
      commit('SET_LINES', lines);
    },
    SetErrors({commit},errors){
      commit('SET_ERRORS', errors);
    },
    SetResult({commit},result){
      commit('SET_RESULT', result);
    }
  }
};

export default lexer;
