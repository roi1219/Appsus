export default {
    template: `
            <input class="mail-searchbox" ref="searchInput" type="text" placeholder="Search mail..." @input="setSearch" v-model="searchString">
    `,
    data() {
        return {
            searchString: ''
        }
    },
    methods: {
        setSearch() {
            this.$emit('searched', this.searchString)
        }
    },
    mounted(){
        this.$refs.searchInput.focus()
    }
}