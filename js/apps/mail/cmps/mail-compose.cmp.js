import {mailService} from '../services/mail-service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    props:['mail'],
    template:`
        <div>
            <button @click="onClose">X</button>
            <form>
                <input type="email" placeholder="To..." v-model="recepient">
                <input type="text" placeholder="Subject" v-model="subject">
                <input type="text" v-model="content">
                <button @click="sendMail">Send</button>
            </form>
        </div>
    `,
    data() {
        return {
            recepient:this.mail.sender.address,
            subject:this.mail.subject,
            content:this.mail.content
        }
    },
    methods:{
        sendMail(ev){
            ev.preventDefault()

            const newEmail = mailService.getEmptyMail()
            newEmail.sender.address = this.recepient
            newEmail.subject = (this.subject==='') ? '(no subject)' : this.subject
            newEmail.content = this.content
            newEmail.folder = 'inbox'
            this.$emit('saveNewMail',newEmail)
            eventBus.$emit('show-msg',{txt:'Mail sent!'})
            if (this.recepient==='admin@appsus.org'){
                newEmail.folder = 'outbox'
                this.$emit('saveNewMail',newEmail)
            }
            this.$emit('closeMe')
        },
        onClose(){
            if(this.recepient!=='' || this.content!=='' || this.subject!==''){
                const newDraft = mailService.getEmptyMail()
                newDraft.subject = this.subject
                newDraft.content = this.content
                newDraft.folder = 'drafts'
                newDraft.wasRead = true
                this.$emit('saveNewMail',newDraft)
                eventBus.$emit('show-msg',{txt:'Saved as Draft'})
            }
            this.$emit('closeMe')
        }
    }
}