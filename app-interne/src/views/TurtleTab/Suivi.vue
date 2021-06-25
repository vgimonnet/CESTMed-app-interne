<template>
  <div>
    <div class="w-100 d-flex flex-row justify-content-center align-items-center nav">
      <router-link :to="{ name: 'AjouterDonnee', params: { id: this.$route.params.id } }">
        Ajouter une donnée
        <img src="../../assets/svg/cross.svg" alt="cross logo">
      </router-link>
      <button style="margin: 0rem 1.6rem">A surveiller</button>
      <button>Passer en réhabilitation</button>
    </div>

    <div class="row">
      <div class="col-12 col-md-6 fake">
        <img src="../../assets/fake/fake1.png" alt="fake1">
        <img src="../../assets/fake/fake2.png" alt="fake2">
        <img src="../../assets/fake/fake3.png" alt="fake3">
      </div>
      <div class="col-12 col-md-6 fake">
        <img src="../../assets/fake/fake4.png" alt="fake4">
        <img src="../../assets/fake/fake5.png" alt="fake5">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Suivi',
    mounted () {
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

<style lang="scss" scoped>
  .nav {
    margin-bottom: 3.6rem;
  }

  a, button, [type=submit] {
    display: inline;
    font-size: 2.2rem;
    padding: 1rem 2rem;
    background-color: transparent;
    border: 0.2rem solid #0A1D42;
    border-radius: 1.8rem;
    color: #0A1D42;
    text-decoration: none;
    &:hover {
      background-color: #0A1D42;
      color: white;
    }
    img {
      margin-left: 1rem;
    }
  }

  .fake {
    img {
      margin-bottom: 1.6rem;
    }
  }
</style>