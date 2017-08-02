var store = {
  save: function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  fetch: function (key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }
}

var list = store.fetch('todo');

var vm = new Vue({
  el: '#todo',
  data: {
    list: list,
    todo: '',
    editTodos: '',      // 记录正在编辑的数据
    beforeTitle: '',    // 记录正在编辑之前的title
    visibility: 'all'  // 通过这个属性变化对数据进行筛选
  },
  methods: {
    addTodo: function (event) {
      // 向list添加数据
      // 这里的this是vue实例
      this.list.push({
        title: this.todo,
        isChecked: false,
      })
      this.todo = '';
    },
    deleteTodo: function (todo) {
      // 删除任务
      var index = this.list.indexOf(todo);
      this.list.splice(index, 1);
    },
    editTodo: function (todo) {
      // 编辑任务
      this.editTodos = todo;
      this.beforeTitle = todo.title;
    },
    edited: function (todo) {
      // 编辑完成
      this.editTodos = '';
    },
    editback: function (todo) {
      // 取消编辑
      todo.title = this.beforeTitle;
      this.beforeTitle = '';
      this.editTodos = '';
    }
  },
  directives: {
    'focus': {
      update: function (el, binding) {
        if (binding.value) {
          el.focus();
        }
      }
    }
  },
  computed: {
    noCheckedNum: function () {
      return this.list.filter(function (item) {
        return !item.isChecked
      }).length
    },
    filterList: function () {
      var filter = {
        all: function (list) {
          return list;
        },
        unfinished: function (list) {
          return list.filter(function (item) {
            return !item.isChecked
          })
        },
        finished: function (list) {
          return list.filter(function (item) {
            return item.isChecked
          })
        }
      }
      return filter[this.visibility] ? filter[this.visibility](list) : list;
    }
  },
  watch: {
    // 这是浅监控，只能监控list，不能监控到list内部的某个属性的变化，将deep设为true就可以深度监控
    // 监控list这个属性，当list对应的值发生变化就会执行这个匿名函数
    list: {
      handler: function () {
        store.save('todo', this.list);
      },
      deep: true
    }
  }
})

function watchHash() {
  var hash = window.location.hash.slice(1);
  vm.visibility = hash;
}
watchHash();
window.addEventListener('hashchange', watchHash)


