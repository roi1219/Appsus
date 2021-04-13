import { myRouter } from './routes.js'
import appHeader from './cmps/app-header.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'

const options = {
    el: '#app',
    router: myRouter,
    template: `
    <section>
    <div class="main-screen" @click="toggleMenu"></div>
        <user-msg/>
        <app-header/>
        <router-view/>
        <footer>
            &copy copyrights 2021
        </footer>
    </section>
    `,
    data() {
        return {
        }
    },
    components: {
        appHeader,
        userMsg
    },
    methods:{
      toggleMenu(){
          console.log('toggle');
        document.body.classList.toggle('menu-open');
      }
    }
}

const app = new Vue(options)