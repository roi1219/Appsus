import { eventBus } from '../../../services/event-bus.service.js'
export default {
    template: `
                <nav>
                  <button :style="getTextColor" v-if="!isPinned" title="pin" @click="pin" class="fas fa-thumbtack"></button>
                  <button :style="getTextColor" v-if="isPinned" :class="{rotate:isPinned}" title="un pin" @click="unpin" class="fas fa-thumbtack"></button>
                  <button :style="getTextColor" @click="isChangeColor=!isChangeColor" class="fas fa-palette">
                      <nav v-if="isChangeColor">
                          <span @click="changeColor('red')" style="background-color:red">&nbsp;</span>
                          <span @click="changeColor('lightblue')" style="background-color:lightblue">&nbsp;</span>
                          <span @click="changeColor('lightgreen')" style="background-color:lightgreen">&nbsp;</span>
                          <span @click="changeColor('brown')" style="background-color:brown">&nbsp;</span>
                          <span @click="changeColor('orange')" style="background-color:orange">&nbsp;</span>
                          <span @click="changeColor('pink')" style="background-color:pink">&nbsp;</span>
                          <span @click="changeColor('white')" style="background-color:white">&nbsp;</span>
                          <span @click="changeColor('black')" style="background-color:black">&nbsp;</span>
                      </nav>
                  </button>
                  <button :style="getTextColor" v-if="!isEdit" title="add title" @click.self="startEdit" class="fas fa-edit"></button>
                  <button :style="getTextColor" v-if="isEdit" title="save" @click.self="edit" class="fas fa-save"></button>
                  <!-- <router-link to="/mail"></router-link> -->
                  
                  <button :style="getTextColor" title="delete" @click="remove" class="fas fa-trash"></button>
                   <button>
                      <router-link :to="'/mail/'+info.txt" :style="getTextColor" title="mail" @click="mail" class="fas fa-paper-plane"></router-link>
                   </button>
                </nav>
    `,
    props: ["info", "id", "color", "isPinned", "isEdit"],
    data() {
        return {
            isChangeColor: false,
            // isActionEdit: this.isEdit,
            txt: this.info.txt,
        }
    },
    methods: {
        edit() {
            this.$emit('edit', this.id, this.txt);
            // setTimeout(() => {
            //     this.isActionEdit = !this.isActionEdit;
            // }, 0);
        },
        remove() {
            eventBus.$emit('remove', this.id);
        },
        pin() {
            eventBus.$emit('pin', this.id);
        },
        unpin() {
            eventBus.$emit('unpin', this.id);
        },
        changeColor(color) {
            eventBus.$emit('changeColor', this.id, color);
        },
        startEdit() {
            // this.isActionEdit = !this.isActionEdit;
            this.$emit('startEdit');
        },
        mail() {
            // eventBus.$emit('mail', this.info);
            // eventBus.$emit('note-mail',this.info);
            // this.$router.push('/mail');
        }
    },
    computed: {
        getStyle() {
            return (this.color === 'black') ? 'background-color:black;color:white' : `background-color:${this.color}`;
        },
        getTextColor() {
            return (this.color === 'black') ? 'color:white' : ``;
        },
        // getInfoString(){
        //     var str='';
        //     if(this.info.txt) str+=`txt=${this.info.txt}`;
        //     if(this.info.url) str+=`&url=${this.info.url}`;
        //     if(this.info.todos) str+=`&todos=${this.info.todos}`;
        //     return str;
        // }
    }
}