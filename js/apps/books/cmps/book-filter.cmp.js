export default {
    template: `
            <section class="book-filter">
                Filter By:
                <label for="name" class="read" @click="currFilter='name', filterBy.byPrice=0">Name</label> 
                <input id="name" v-if="currFilter === 'name'" type="text" @input="setFilter" placeholder="Search...." v-model="filterBy.byName">
                <label for="price" class="read" @click="currFilter='price', filterBy.byName=''">Price</label>  
                <input id="price" v-if="currFilter === 'price'" type="number" @input="setFilter" placeholder="Max Price!" v-model="filterBy.byPrice">
            </section>
    `,
    data() {
        return {
            filterBy: {
                byName: '',
                byPrice: 0,
            },
            currFilter: null,
        }
    },
    methods: {
        setFilter() {
            this.$emit('filter', this.filterBy)
        }
    }
}
