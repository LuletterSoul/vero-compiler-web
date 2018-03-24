import fetch from '@/utils/fetch';

export function createTokenLexer(source) {
  return fetch({
    url:'/compiler/token_lexer',
    method:'post',
    data:source
  })
}

export function createGrammarReadLexer(source) {
  return fetch({
    url:'/compiler/grammar_lexer',
    method:'post',
    data:source
  })
}

export function getFileLines(source) {
  return fetch({
    url:'/compiler/lines',
    method:'get'
  })
}

export function getLexerErrors(source) {
  return fetch({
    url:'/compiler/errors',
    method:'get'
  })
}

export function createTokens(source) {
  return fetch({
    url:'/compiler/tokens',
    method:'post',
    data:source
  })
}
export function analysis(source) {
  return fetch({
    url:'/compiler/analysis_result',
    method:'post',
    data:source
  })
}
