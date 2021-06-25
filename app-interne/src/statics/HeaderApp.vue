<template>
  <header class="d-grid">
    <nav class="d-flex flex-column align-items-baseline" id="top-nav">
      <router-link to="/#" style="margin-bottom: 5rem">
        <img src="../assets/logos/logo.svg" alt="home logo">
      </router-link>

      <router-link to="/">
        <img src="../assets/svg/home.svg" alt="home logo">
        Accueil
      </router-link>
      <a>
        <img src="../assets/svg/turtle.svg" alt="turtle logo">
        Tortues du centre
      </a>
      <div v-if="['VoirTortue', 'VoirTortueSuivi', 'VoirTortueDetail', 'VoirTortueAide'].includes($route.name)" class="d-flex flex-column pl-1 w-100">
        <router-link v-for="turtle in turtles" :key="turtle._id" :to="{ name: 'VoirTortue', params: { id: turtle._id} }" :data-turtle="turtle._id" data-turtlelink="turtle">
          <img src="../assets/svg/turtle.svg" alt="turtle logo">
          {{ turtle.name }}
        </router-link>
      </div>
      <router-link to="/#">
        <img src="../assets/svg/turtle-transit.svg" alt="turtle logo">
        Tortues en transit
      </router-link>
      <router-link to="/#">
        <img src="../assets/svg/graph.svg" alt="graph logo">
        Statistiques
      </router-link>
    </nav>

    <nav class="d-flex flex-column align-items-baseline mt-auto" id="bottom-nav">
      <router-link to="/#">Archives</router-link>
      <router-link to="/#">Connaissances</router-link>
      <router-link to="/#">Communication</router-link>
      <router-link :to="{ name: 'Administration' }">Profil administrateur</router-link>
      <router-link to="/#">Paramétres</router-link>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'HeaderApp',
    data () {
      return {
        turtles: [],
        showTurtles: false
      }
    },
    created () {
      this.unsubscribe = this.$store.subscribe((mutations) => {
        if (mutations.type === 'TURTLELIST') {
          this.turtles = mutations.payload.data
        }
      })
    },
    mounted () {
      this.fetchTurtles()
    },
    beforeDestroy () {
      this.unsubscribe()
    },
    methods: {
      fetchTurtles () {
        this.$store.dispatch('getTurtles')
      }
    }
  }
</script>

<style lang="scss">
  header {
    height: 400vh;
    background: #E3EDFF;
    font-size: 1.8rem;
    color: #0A1D42;
    width: 30%;
  }

  nav {
    padding: 30px;

    &#top-nav {
      position: fixed;
      a {
        margin-bottom: 1.6rem;
      }
    }

    &#bottom-nav {
      position: fixed;
      bottom: 0;
      a {
        margin-bottom: 0.8rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    a {
      color: #0A1D42;
      text-decoration: none;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      width: -webkit-fill-available;

      &.router-link-exact-active {
        font-weight: bold;
        color: #0A1D42;
        background-color: #fff;
        padding-top: 2rem;
        padding-bottom: 2rem;
        border-radius: 1.8rem;
      }

      img {
        margin-right: 1rem;
      }
        padding-left: 2rem

    }
  }

  .pl-1 {
    padding-left: 1rem;
  }
</style>