import actionNav from '../action-nav.cmp.js'

export default {
    template: `
          <section :style="getStyle">
              <span :class="{fa:isPinned, 'fa-paperclip':isPinned}"></span>
              <p v-if="!isEdit" @click="startEdit">{{info.txt}}</p>
              <form @submit.prevent="edit">
                  <input ref="editInput" v-show="isEdit" type="text" v-model="txt">
              </form>
              <img :src="info.url">
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
            txt: this.info.txt
        }
    },
    methods: {
        edit() {
            this.$emit('edit', this.id, this.txt)
            setTimeout(()=>{
                this.isEdit = !this.isEdit;
            },0);
        },
        startEdit() {
            this.isEdit = !this.isEdit;
            if(this.isEdit){
                setTimeout(() => {
                    this.$refs.editInput.focus();
                }, 0);
            }
        }
    },
    computed: {
        getStyle() {
            return (this.color === 'black') ? 'background-color:black;color:white' : `background-color:${this.color}`;
        },
        getTextColor() {
            return (this.color === 'black') ? 'color:white' : ``;
        }
    },
    components: {
        actionNav
    }
};