export default {
    template: `
    <section>
        <label for="filter">Search A Note:</label><br/>
        <input @input="setFilter" type="text" id="filter" name="filter" v-model="filterKey">
    </section>
    `,
    data() {
        return {
            filterKey: null
        }
    },
    methods: {
        setFilter() {
            this.$emit('filter', this.filterKey)
        }
    }
}