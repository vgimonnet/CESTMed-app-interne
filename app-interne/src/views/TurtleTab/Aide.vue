<template>
  <div>
    <h1>Aide sur la tortue</h1>
  </div>
</template>

<script>
  export default {
    name: 'Aide',
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