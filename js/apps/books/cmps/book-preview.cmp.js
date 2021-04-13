export default {
    props: ['book'],
    template: `
    <router-link :to="'/book/'+book.id" class="book-preview">
            <h3>{{book.title}}</h3>
            <h5 v-for="author in book.authors">{{author}}</h5>
            <span>{{formattedPrice}}</span>
            <img :src="book.thumbnail" :alt="book.title">
            <router-link :to="'/book/'+book.id" class="details">Details</router-link>
    </router-link>
    `,
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
        formattedPrice() {
            const symbol = (this.book.listPrice.currencyCode === 'USD') ? '$' :
                (this.book.listPrice.currencyCode === 'ILS') ? '₪' : '€';
            return this.book.listPrice.amount + symbol;
        }
    },
    created() {
    }
}