export default {
    props:['mail'],
    template:`<div>
    <h1>{{mail.subject}}</h1>
    <h2><span>{{mail.sender.name}}</span> <span>{{mail.sender.address}}</span></h2>
    <p>{{mail.content}}</p>
    </div>
    `,
    created() {
        this.mail.wasRead = true
        this.$emit('wasRead',this.mail)
    }
}