// Publisher - Subscriber
export const eventBus = new Vue()

// Emits, but no one will be notified
// eventBus.$emit('puk', 12);

// eventBus.$on('puk', (val) => {
//     console.log('Puk Happened', val)
// })
// eventBus.$on('puk', (val) => {
//     console.log('Observing that Puk ', val)
// })

window.myBus = eventBus;