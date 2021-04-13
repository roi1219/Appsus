import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const EMAIL_KEY = 'Email'

export const mailService = {
    query,
    remove,
    save,
    getEmptyMail,
    getById
}

_createEmails()

function query() {
    return storageService.query(EMAIL_KEY)
}

function remove(mailId) {
    return storageService.remove(EMAIL_KEY, mailId)
}

function save(email) {
    if (email.id) {
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}

function getById(id) {
    return storageService.get(EMAIL_KEY, id)
}

function _createEmails() {
    let mails = utilService.loadFromStorage(EMAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        //Todo: make better demo data
        mails.push(_createMail('Puki','pukiMcPuck@bouncy.mail','hi!','Hello',0,'inbox',false))
        mails.push(_createMail('Shuki','shukiMcShocko@jmail.com','Greetings, human!','Welcome to universe',0,'inbox',false))
        mails.push(_createMail('Muki','muki@amazon.mail.org','You made 153485$ this month','Revenue Report',0,'inbox',false))
        mails.push(_createMail('Goliath Bank','noreply@goliathBank.org','Your stocks portfolio was updated.','Stocks Portfolio',0,'inbox',false))
        mails.push(_createMail('Spongebob','spongebob@oceanicmail.com','Your order of 1 krabby patty is on its way','Krabby Patty Order',0,'inbox',false))
        utilService.saveToStorage(EMAIL_KEY, mails)
    }
    return mails;
}

function getEmptyMail() {
    return { id: '', sender: { name: '', address: '' }, content: '', subject: '', timestamp: Date.now(), folder: '', isStarred: false, wasRead: false }
}

function _createMail(senderName, senderAddress, content, subject, timestamp, folder, isStarred) {
    const mail = getEmptyMail();
    mail.id = utilService.makeId();
    mail.sender.name = senderName
    mail.sender.address = senderAddress
    mail.content = content
    mail.subject = subject
    mail.timestamp = timestamp
    mail.folder = folder
    mail.isStarred = isStarred
    return mail
}