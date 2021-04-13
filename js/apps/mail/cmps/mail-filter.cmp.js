export default {
    template: `
        <ul class="mail-filter-list clean-list">
            <li @click="setFolderInbox">Inbox</li>
            <li @click="setFolderStarred">Starred</li>
            <li @click="setFolderSent">Sent Mail</li>
            <li @click="setFolderDrafts">Drafts</li>
        </ul>
    `, data() {
        return {
            folder: 'inbox'
        }
    },
    methods: {
        setFolderInbox() {
            this.folder = 'inbox'
            this.$emit('folderChanged', this.folder)
        },
        setFolderStarred() {
            this.folder = 'starred'
            this.$emit('folderChanged', this.folder)
        },
        setFolderSent() {
            this.folder = 'sent'
            this.$emit('folderChanged', this.folder)
        },
        setFolderDrafts() {
            this.folder = 'drafts'
            this.$emit('folderChanged', this.folder)
        }
    }
}