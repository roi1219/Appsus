export default {
    template: `
    <section>
        <h6>Which note would you like to add?</h6>
        <div class="note-type-btn">
            <button :class="{selected:cmp.type==='noteTxt'}" title="reminder" class="fa fa-ellipsis-h" @click="changeCmp('noteTxt')"></button>
            <button :class="{selected:cmp.type==='noteTodos'}" title="todo list" class="fa fa-list-ul" @click="changeCmp('noteTodos')"></button>
            <button :class="{selected:cmp.type==='noteImg'}" title="image" class="fa fa-image" @click="changeCmp('noteImg')"></button>
            <button :class="{selected:cmp.type==='noteVid'}" title="video" class="fa fa-video" @click="changeCmp('noteVid')"></button>
            <button :class="{selected:cmp.type==='noteAud'}" title="audio" class="fa fa-music" @click="changeCmp('noteAud')"></button>
        </div>
        <!-- TODO: FORM -->
        <form @submit.prevent="saveNote">
            <input ref="input" v-if="cmp.type==='noteTxt'" type="text" placeholder="what's on your'e mind?" v-model="cmp.info.txt">
            <input ref="input" v-if="cmp.type==='noteTodos'" type="text" placeholder="what's your'e todos?" v-model="todo.txt">
            <button title="add todo" class="fa fa-plus" v-if="cmp.type==='noteTodos'" type="button" @click="addTodo"></button>
            <input  v-if="cmp.type==='noteImg'" type="file" @change="ImgInput" />
            <input ref="input" v-if="cmp.type==='noteVid'" type="url" placeholder="Enter video URL" v-model="cmp.info.url"/>
            <input ref="input" v-if="cmp.type==='noteAud'" type="url" placeholder="Enter audio URL" v-model="cmp.info.url"/>
            <button title="save" class="fa fa-save" v-if="cmp.type" @click="saveNote"></button>
        </form>
    </section>
    `,
    data() {
        return {
            cmp: {
                type: 'noteTxt',
                info: {},
                color: '#ffffff',
                isPinned: false
            },
            todo: {
                txt: null,
                isDone: false
            }
        }
    },
    methods: {
        changeCmp(type) {
            this.cmp.type = type;
            this.cmp.info = {}
            if (this.cmp.type === 'noteTxt') this.cmp.info.txt = null;
            if (this.cmp.type === 'noteTodos') this.cmp.info.todos = [];
            if (this.cmp.type === 'noteImg' ||
                this.cmp.type === 'noteAud' ||
                this.cmp.type === 'noteVid') this.cmp.info = { url: null, txt: null };
            if (this.cmp.type === 'noteImg') return;
            setTimeout(() => {
                this.$refs.input.focus();
            }, 0);
        },
        saveNote(ev) {
            this.$emit('save', this.cmp);
            this.cmp = {
                type: null,
                info: {},
                color: '#ffffff',
                isPinned: false
            }
        },
        addTodo() {
            this.cmp.info.todos.push(this.todo);
            this.todo = {
                txt: null,
                isDone: false
            };
            setTimeout(() => {
                this.$refs.input.focus();
            }, 0);
        },
        ImgInput(ev) {
            this.loadImageFromInput(ev)
        },
        loadImageFromInput(ev) {
            var reader = new FileReader()
            reader.onload = (event) => {
                this.cmp.info.url = event.target.result
                console.log(this.cmp);
            }
            reader.readAsDataURL(ev.target.files[0])
        }
    },
    mounted() {
        setTimeout(() => {
            this.$refs.input.focus();
        }, 0);
    }
}