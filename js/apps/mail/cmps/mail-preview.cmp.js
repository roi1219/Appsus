export default {
    props: ['mail'],
    template: `
    <div class="mail-preview">
                    
                    <button class="btn-info" v-if="mail.isStarred" @click="toggleStar(mail)">★</button>
                    <button class="btn-info" v-else @click="toggleStar(mail)">☆</button>
                    <div class="mail-preview-inner-container">
                    <div class="contact-container" @click="display(mail.id)" v-bind:class="{bold : isBold}">
                        {{mail.sender.name}}
                    </div>
                    <div  @click="display(mail.id)" class="mail-preview-other-inner-container">
                        <div v-bind:class="{bold : isBold}">
                            {{mail.subject}}
                            {{mail.content}}
                        </div>
                        <div v-bind:class="{bold : isBold}">
                            {{mail.timestamp}}
                        </div>
                    </div>
                    </div>
                    <button class="mail-delete-btn btn-danger" @click="remove(mail.id)"><i class="fa fa-trash" aria-hidden="true"></i></button>

                    
    </div>
    `,
    data () {
        return {
            mailData: this.mail
        }
    },
    methods: {
        remove(mailId){
            this.$emit('remove',mailId)
        },
        display(mailId){
            this.$emit('display',mailId)
        },
        toggleStar(mail){
            mail.isStarred = !mail.isStarred
            this.$emit('star',mail)
        },
    },
    computed: {
        isBold(){
            return !this.mail.wasRead
        }
    }
}