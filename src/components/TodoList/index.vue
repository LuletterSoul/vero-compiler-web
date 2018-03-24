<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <input class="new-todo" autofocus autocomplete="off" placeholder="待处理事项" @keyup.enter="addTodo">
    </header>
    <!-- main section -->
    <section class="main" v-show="todos.length">
      <input class="toggle-all" id="toggle-all" type="checkbox" :checked="allChecked" @change="toggleAll({ done: !allChecked })">
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <transition-group name="slide-fade">
          <todo @toggleTodo='toggleTodo' @editTodo='editTodo' @deleteTodo='deleteTodo' v-for="(todo, index) in filteredTodos" :key="index"
                :todo="todo"></todo>
        </transition-group>
      </ul>
    </section>
    <!-- footer -->
    <footer class="footer" v-show="todos.length">
      <div class="display-filter">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('item') }} left
      </span>
        <ul class="filters">
          <li v-for="(val, key) in filters" :key="key">
            <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{ key | capitalize }}</a>
          </li>
        </ul>
      </div>
      <button class="clear-completed" v-show="todos.length > remaining" @click="clearCompleted">
        全部清除
      </button>
    </footer>
  </section>
</template>

<script>
import Todo from './Todo.vue'
const STORAGE_KEY = 'todos'
const filters = {
  显示全部: todos => todos,
  显示未完成: todos => todos.filter(todo => !todo.done),
  显示已完成: todos => todos.filter(todo => todo.done)
}
const defalutList = [
  { text: '查看任务分配', done: false },
  { text: '调整任务分配', done: false },
  { text: '跟踪进度', done: false }
]
export default {
  components: { Todo },
  data() {
    return {
      visibility: '显示全部',
      filters,
      todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || defalutList
    }
  },
  computed: {
    allChecked() {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return this.todos.filter(todo => !todo.done).length
    }
  },
  methods: {
    setLocalStorgae() {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    addTodo(e) {
      const text = e.target.value
      if (text.trim()) {
        this.todos.push({
          text,
          done: false
        })
        this.setLocalStorgae()
      }
      e.target.value = ''
    },
    toggleTodo(val) {
      val.done = !val.done
      this.setLocalStorgae()
    },
    deleteTodo(todo) {
      console.log(todo)
      this.todos.splice(this.todos.indexOf(todo), 1)
      this.setLocalStorgae()
    },
    editTodo({ todo, value }) {
      console.log(todo, value)
      todo.text = value
      this.setLocalStorgae()
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.done)
      this.setLocalStorgae()
    },
    toggleAll({ done }) {
      this.todos.forEach(todo => {
        todo.done = done
        this.setLocalStorgae()
      })
    }
  },
  filters: {
    pluralize: (n, w) => n === 1 ? w : w + 's',
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  }
}
</script>

<style lang="scss">
  @import './index.scss';

  .slide-fade-enter-active {
    transition: all .5s ease;
  }
  .slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(20px);
    opacity: 0;
  }
</style>
