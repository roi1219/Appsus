import mailList from '../cmps/mail-list.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import mailSearch from '../cmps/mail-search.cmp.js'
import { mailService } from '../services/mail-service.js'
import mailCompose from '../cmps/mail-compose.cmp.js'
import mailReadUnreadFilter from '../cmps/mail-read-unread-filter.cmp.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    template: `
    <section class="mail">
        <div class = "search-container">
            <div class="secondary-container">
                <mail-search @searched="getSearch"></mail-search>
                <mail-read-unread-filter @readUnreadFilterChanged="setReadUnreadFilter"></mail-read-unread-filter>
            </div>
            <div class="dropdown menu-btn" @click="toggleDropdown">
                 <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 </button>
                 <div v-if="isDropdownDisplayed" class="mail-dropdown" aria-labelledby="dropdownMenuButton">
                     <button class="composer-btn" @click="showComposer">+ Compose</button>
                     <mail-filter @folderChanged="getFolder"></mail-filter>
                 </div>
            </div>
        </div>
        <mail-list :mails="mailsToShow" @remove="removeMail" @starred="saveMail" @wasRead="saveMail"></mail-list>
        <mail-compose :mail="mailToEdit" v-if="composerVisible" @closeMe="hideComposer" @saveNewMail="saveMail"></mail-compose>
    </section>
    `,
    data() {
        return {
            mails: [],
            searchString: '',
            filterByFolder: 'inbox',
            composerVisible: false,
            mailToEdit: mailService.getEmptyMail(),
            readUnreadFilter: 'all',
            isDropdownDisplayed: false
        }
    },
    methods: {
        loadMails() {
            mailService.query()
                .then(mails => this.mails = mails)
        },
        removeMail(mailId) {
            mailService.remove(mailId)
                .then(this.loadMails)
        },
        getSearch(searchString) {
            this.searchString = searchString
        },
        getFolder(folder) {
            this.filterByFolder = folder
        },
        saveMail(mail) {
            mailService.save(mail)
                .then(console.log('saved!'))
                .then(this.loadMails)
        },
        showComposer() {
            this.composerVisible = true
        },
        hideComposer() {
            console.log('comp');
            this.composerVisible = false
        },
        setReadUnreadFilter(filter) {
            this.readUnreadFilter = filter
        },
        toggleDropdown() {
            this.isDropdownDisplayed = !this.isDropdownDisplayed
        },
        noteMail() {
            this.composerVisible=true;
            const info=this.$route.params.txt;
            console.log('info:', info)
            this.mailToEdit.content=info;
        }
    },
    computed: {
        mailsToShow() {
            let mailsInFolder = [];

            if (this.filterByFolder === 'inbox') {
                this.mails.forEach(mail => {
                    if (mail.folder === 'inbox') mailsInFolder.push(mail)
                });
            }

            if (this.filterByFolder === 'sent') {
                this.mails.forEach(mail => {
                    if (mail.folder === 'outbox') mailsInFolder.push(mail)
                });
            }

            if (this.filterByFolder === 'starred') {
                this.mails.forEach(mail => {
                    if (mail.isStarred) mailsInFolder.push(mail)
                });
            }

            if (this.filterByFolder === 'drafts') {
                this.mails.forEach(mail => {
                    if (mail.folder === 'drafts') mailsInFolder.push(mail)
                });
            }
            // if (!this.searchString) return mailsInFolder

            const searchStringLowercased = this.searchString.toLowerCase()
            const mailsToShow = mailsInFolder.filter(mail => {
                return (mail.sender.name.toLowerCase().includes(searchStringLowercased) ||
                    mail.sender.address.toLowerCase().includes(searchStringLowercased) ||
                    mail.subject.toLowerCase().includes(searchStringLowercased) ||
                    mail.content.toLowerCase().includes(searchStringLowercased))
            })

            if (this.readUnreadFilter === 'read') {
                const mailAfterReadUnreadFilter = mailsToShow.filter(mail => {
                    return mail.wasRead
                })
                return mailAfterReadUnreadFilter
            }
            else if (this.readUnreadFilter === 'unread') {
                const mailAfterReadUnreadFilter = mailsToShow.filter(mail => {
                    return !mail.wasRead
                })
                return mailAfterReadUnreadFilter
            }

            return mailsToShow
        },
        noteInfo(){
            return this.$route.params.txt
        }
    },
    mounted() {
        this.loadMails()
    },
    created() {
        // eventBus.$on('note-mail', this.noteMail)
        if(this.noteInfo){
            console.log('enter');
            this.noteMail();
        }
    },
    components:
    {
        mailList, mailFilter, mailSearch, mailCompose, mailReadUnreadFilter
    }
}