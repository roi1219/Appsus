import actionNav from '../action-nav.cmp.js'

export default {
    template: `
          <section :style="getStyle">
          <span :class="{fa:isPinned, 'fa-paperclip':isPinned}"></span>
              <ul>
                  <li v-for="(todo,idx) in info.todos" @click="checkTodo(idx)">
                      <span v-if="!isEdit">{{todo.txt}}</span>
                      <span v-if="!isEdit" :class="{fa:todo.isDone,'fa-check-circle':todo.isDone}"></span>
                      <form @submit.prevent="edit">
                        <input v-if="isEdit" type="text" v-model="todos[idx].txt">
                    </form>
                    <hr/>
                </li>
                <li v-if="isEdit">
                    <input ref="newTodoInput" type="text" v-model="newTodo.txt">
                </li>
              </ul>
              <action-nav
                     :info="info"
                     :color="color"
                     :isPinned="isPinned"
                     :id="id"
                     :isEdit="isEdit"
                     @edit="edit"
                     @startEdit="startEdit"  
                     >
                </action-nav>
            </section>
            `,
    props: ["info", "id", "color", "isPinned"],
    data() {
        return {
            isEdit: false,
            todos: this.info.todos,
            newTodo: {
                isDone: false,
                txt: null
            }
        }
    },
    methods: {
        edit() {
            if (this.newTodo.txt) {
                this.todos.push(this.newTodo);
                setTimeout(() => {
                    this.newTodo.txt = null;
                }, 0);
            }
            this.$emit('edit', this.id, this.todos)
            this.isEdit = !this.isEdit;
        },
        startEdit() {
            this.isEdit = !this.isEdit;
            if (this.isEdit) {
                setTimeout(() => {
                    // this.$refs.editInput.focus();
                }, 0);
            }
        },
        checkTodo(idx) {
            if (this.isEdit) return;
            this.todos[idx].isDone = !this.todos[idx].isDone;
            this.$emit('edit', this.id, this.todos);
        }

    },
    computed: {
        getStyle() {
            return (this.color === 'black') ? 'background-color:black;color:white' : `background-color:${this.color}`
        },
        getTextColor() {
            return (this.color === 'black') ? 'color:white' : ``;
        }
    },
    components: {
        actionNav
    }
};