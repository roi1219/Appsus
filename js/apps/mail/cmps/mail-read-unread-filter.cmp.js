export default {
    template:`
    <select id="read-unread-filter" v-model="selected" @change="emitReadUnreadFilter">
        <option value="all">All</option>
        <option value="read">Read</option>
        <option value="unread">Unread</option>
    </select>
    `,
    data(){
        return{
            selected: 'all'
        }
    },
    methods:{
        emitReadUnreadFilter(){
            this.$emit('readUnreadFilterChanged',this.selected)
        }
    }
}