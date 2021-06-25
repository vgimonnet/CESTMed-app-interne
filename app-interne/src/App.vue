<template>
  <div id="app" class="d-flex flex-row justify-content-start align-items-start min-vh-100">
    <img src="./assets/deco1.png" alt="deco 1" id="deco1" v-if="$route.name == 'Home'">
    <img src="./assets/deco2.png" alt="deco 2" id="deco2" v-if="$route.name == 'Home'">
    <header-app />
    <div class="w-100" id="main">
      <top-navbar />
      <router-view />
    </div>
  </div>
</template>

<script>
  import HeaderApp from '@/statics/HeaderApp'
  import TopNavbar from '@/statics/TopNavbar'

  export default {
    name: 'App',
    components: {
      'header-app': HeaderApp,
      'top-navbar': TopNavbar
    },
    updated () {
      let turtleLinks = document.querySelectorAll('a[data-turtlelink="turtle"]')
      for (let i = 0; i < turtleLinks.length; i++) {
        if (turtleLinks[i].dataset.turtle == this.$route.params.id) {
          turtleLinks[i].classList.add("router-link-exact-active")
          turtleLinks[i].classList.add("router-link-active")
        }        
      }
    }
  }
</script>

<style lang="scss">
  #app {
    // font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    color: #2c3e50;
    main {
      margin-top: 10rem;
    }
  }
  #deco1 {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: -1;
  }
  #deco2 {
    position: fixed;
    bottom: 5%;
    right: 10%;
    z-index: -1;
  }
</style>
