export default {
    template: `
    <section class="home">
        <h1>What do you want to do?</h1>
        <div class="main-content">
            <div class="box">
                <router-link to="/mail">
                <img src="img/mail.png">
            </router-link>
        </div>
        <div class="box">
            <router-link to="/book">
            <img src="img/book.png">
        </router-link>
    </div>
    <div class="box">
        <router-link to="/keep">
        <img src="img/note1.jpg">
            </router-link>
            </div>
        </div>
    </section>
    `
}