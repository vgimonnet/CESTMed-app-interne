<template>
  <div>
    <router-link class="turtle-card" :to="{ name: 'ModifierTortue', params: { id: turtle._id } }">
      <div class="img-container d-flex justify-content-center align-items-center">
        <img src="../../assets/turtle-default.png" alt="Default turtle pic" class="my-auto">
      </div>
      <h2>{{ turtle.name }}</h2>
      <p>
        Durée dans le centre
      </p>
      <p>
        état de santé
      </p>
    </router-link>
    <slot></slot>    
  </div>
</template>

<script>
  export default {
    name: 'TurtleCardAdmin',
    props: ['turtle']
  }
</script>

<style lang="scss" scoped>
  .turtle-card {
    color: black;
    text-decoration: none;
    cursor: pointer;

    .img-container {
      height: 18.5rem;
      width: 18.5rem;
      background-color: #C4C4C4;
      border-radius: 1.5rem;
      margin: auto;
    }
    margin-left: 1rem;

    &:nth-child(1) {
      margin: 0
    }
  }
</style>