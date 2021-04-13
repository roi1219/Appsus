import homePage from './pages/home-page.cmp.js'
import bookApp from './apps/books/pages/book-app.cmp.js'
import bookDetails from './apps/books/pages/book-details.cmp.js'
import bookAdd from './apps/books/pages/book-add.cmp.js'
import keepApp from './apps/keep/pages/keep-app.cmp.js'
import mailApp from './apps/mail/pages/mail-app.cmp.js'
import aboutPage from './pages/about-page.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/book',
        component: bookApp,
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
    {
        path:'/add',
        component:bookAdd
    },
    {
        path: '/keep',
        component: keepApp
    },
    {
        path: '/mail',
        component: mailApp
    },
    {
        path:'/mail/:txt?',
        component:mailApp
    },
    {
        path: '/about',
        component: aboutPage
    }
]

export const myRouter = new VueRouter({ routes })