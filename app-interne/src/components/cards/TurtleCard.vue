<template>
  <router-link class="turtle-card" :to="{ name: 'VoirTortue', params: { id: turtle._id } }">
    <span class="title">{{ turtle.name }}</span>

    <div class="img-container d-flex justify-content-center align-items-center">
      <img src="../../assets/illustration_tortue_CC_haut.png" alt="Default turtle pic" class="my-auto" height="120" with="1800">
    </div>
    <div class="info">
      {{ fake ? 'Signalée le ': 'Arrivée il y a' }}
      <span class="ml-auto">
        {{ fake ? '25/06/2021' : '8 j' }}
      </span>
    </div>
    <div class="info">
      {{ fake ? '' : 'État de santé' }}
      <span class="ml-auto">
        {{ fake ? `à ${(new Date()).getHours() + ':' + (new Date()).getMinutes()}` : 'Bon'}}
      </span>
    </div>
  </router-link>
</template>

<script>
  export default {
    name: 'TurtleCard',
    props: ['turtle', 'fake']
  }
</script>

<style lang="scss" scoped>
  .turtle-card {
    border: 0.2rem solid #FFBCB7;
    background-color: #FDF5EE;
    color: black;
    padding: 2.4rem 2rem 1.4rem 2rem;
    border-radius: 1.8rem;
    text-decoration: none;
    cursor: pointer;
    width: 24rem;

    // width: 25.7rem;
    height: 23.5rem;

    span.title {
      font-weight: bold;
      font-size: 2.2rem;
    }

    div.info {
      font-size: 1.6rem;
    }

    .img-container {
      // height: 15rem;
      // width: 10rem;
      margin: auto;
    }
    margin-left: 0.8rem;
    margin-bottom: 0.8rem;
  }
</style>