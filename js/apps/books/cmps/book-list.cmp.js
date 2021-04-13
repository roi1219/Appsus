import bookPreview from './book-preview.cmp.js'

export default {
    props: ['books'],
    template: `
    <section class="book-list">
        <ul>
            <li v-for="book in books" :key="book.id">
                <book-preview :book="book" />
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        select(book) {
            this.$emit('selected', book);
        }
    },
    components: {
        bookPreview
    }
}