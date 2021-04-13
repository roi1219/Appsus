import{storageService} from '../../../services/async-storage.service.js'

export const keepService={
    query,
    remove,
    save,
    getById,
    getIdxById,
    saveNotes
}

function query(){
    var notes=storageService.query('notes');
    return Promise.resolve(notes);
}
function remove(noteId) {
    return storageService.remove('notes', noteId);
}

function save(note) {
    if (note.id) {
        return storageService.put('notes', note);
    } else {
        return storageService.post('notes', note);
    }
}

function saveNotes(notes){
    console.log('notes:', notes)
    return storageService.saveAll('notes',notes)
}

function getById(id) {
    return storageService.get('notes', id);
}

function getIdxById(id) {
    return storageService.getIdx('notes', id);
}
