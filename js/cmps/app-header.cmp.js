export default {
    template:`
    <section class="header">
      <section class="main-content">
        <img src="img/appsus.svg" alt="">
        <nav @click="toggleMenu">
          <router-link to="/" >Home</router-link>
          <router-link to="/mail" >Mail</router-link>
          <router-link to="/book" >Book</router-link>
          <router-link to="/keep" >Keep</router-link>
          <router-link to="/about" >About</router-link>
        </nav>
        <button class="toggle-btn" @click="toggleMenu">☰</button>
      </section>
</section>
    `,
    methods:{
      toggleMenu(){
        document.body.classList.toggle('menu-open');
      }
    }
}