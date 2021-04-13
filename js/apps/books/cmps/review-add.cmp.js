import { bookService } from '../services/book-service.js'
import {eventBus} from '../../../services/event-bus.service.js'

export default {
    props: ['book'],
    template: `
    <section class="review-add"> 
        <form @submit="saveReview">
            <h3>add a review</h3>
            <label for="username">Name:</label>
            <input v-model="name" ref="nameInput" type="text" name="username" id="username" placeholder="full name" required>
            <label for="rating">Rate:</label>
            <!-- <select name="rating" id="rating">
                <option v-for="(star,idx) in 5" value="star">⭐</option>
            </select> -->
            <input v-model.number="rating" type="number" name="rating" id="rating" min="1" max="5" placeholder="1-5" required>
            <label for="date">When did you read the book?</label>
            <input ref="dateInput" v-model="date" type="date" name="date" id="date" >
            <label for="review">Your review:</label>
            <textarea v-model="review" name="review" id="review" cols="30" rows="5" required></textarea>
            <button>add</button>
        </form>
        <section class="reviews">
            <section>
                <h3>Reviews</h3>
                <ul v-if="book && book.reviews.length>0">
                    <li v-for="(review,idx) in book.reviews" :key="idx" class="review">
                        <p>
                            {{review.date}}|
                            {{review.name}}|
                            {{review.rating}}/5⭐|
                            {{review.review}}
                        </p>
                        <button @click="deleteReview(idx)">Delete</button>
                    </li>
                </ul>
                <!-- <h5 v-else>Be the first to add a review!</h5> -->
            </section>
        </section>
    </section>
    `,
    data() {
        return {
            name: null,
            rating: null,
            date: null,
            review: null
        }
    },
    methods: {
        deleteReview(idx){
            this.book.reviews.splice(idx,1);
            bookService.save(this.book)
            .then(book=>{
                const msg={
                    txt:'review deleted',
                    type:'success'
                }
                eventBus.$emit('show-msg',msg);
            })
            .catch(err=>{
                const msg={
                    txt:'Error! Try again later',
                    type:'error'
                }
                eventBus.$emit('show-msg',msg);

            })
        },
        saveReview(ev) {
            ev.preventDefault();
            if(!this.date){
                this.date=Date.now();
                this.date=new Date(this.date).toLocaleDateString();
            } 
            this.book.reviews.push({
                name: this.name,
                rating: this.rating,
                date: this.date,
                review: this.review
            })
            bookService.save(this.book)
                .then(book=>{
                    const msg={
                        txt:'review addedd',
                        type:'success',
                        path:`/book/${book.id}`
                    }
                    eventBus.$emit('show-msg',msg);
                })
                .catch(err=>{
                    const msg={
                        txt:'Error! Try again later',
                        type:'error'
                    }
                    eventBus.$emit('show-msg',msg);

                })
                this.name=null;
                this.rating=null;
                this.date=null;
                this.review=null;
        },
        getDate(){
            const date=new Date(Date.now()).toLocaleDateString('zh-Hans-CN').split('/')
            .map(num=>{
                    if(num.length===1){
                        return '0'+num;
                    }
                    else return num;
                
            }).join('-');
            this.$refs.dateInput.defaultValue=date;
        }
    },
    mounted() {
        this.$refs.nameInput.focus();
        this.getDate();
    },
    destroyed() {
    }
}