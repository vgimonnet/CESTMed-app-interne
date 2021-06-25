<template>
  <nav class="w-100 d-flex" v-if="$route.name == 'Home'" id="top-navbar">
    <div class="ml-auto">
      <!-- <button class="btn-action">Exporter les données</button> -->
      <router-link :to="{ name: 'AjouterTortue' }" class="btn-green">
        Ajouter une tortue
        <img src="../assets/svg/plus-green.svg" alt="green plus logo">
      </router-link>
      <button class="mr-btn ml-btn">
        Créer un live
        <img src="../assets/svg/cam.svg" alt="cam logo">
      </button>
      <button>Téléconsultation</button>
    </div>
  </nav>
  <nav class="w-100 d-flex" v-else-if="['VoirTortue', 'VoirTortueSuivi', 'VoirTortueDetail', 'VoirTortueAide'].includes($route.name)" id="top-navbar">
    <button class="btn-unstyled" @click="$router.go(-1)">
      <img src="../assets/svg/arrow.svg" alt="">
    </button>
    <div class="ml-auto">
      <button class="btn-action">
        Exporter
        <img src="../assets/svg/download.svg" alt="export logo">
      </button>
      <button class="btn-action">Téléconsultation</button>
    </div>
  </nav>
  <nav class="w-100 d-flex" v-else-if="$route.name == 'AjouterTortue' || $route.name == 'ModifierTortue'" id="top-navbar">
    <button class="btn-unstyled" @click="$router.go(-1)">
      <img src="../assets/svg/arrow.svg" alt="">
    </button>
    <div class="ml-auto">
      <button type="submit" form="form" class="btn-green">
        {{ $route.params.id ? 'Modifier la fiche' : 'Créer la fiche' }}
        <img src="../assets/svg/plus-green.svg" alt="plus green">
      </button>
      <!-- <button class="btn-action">Enregistrer</button> -->
    </div>
  </nav>
  <nav v-else>
    <button class="btn-unstyled" @click="$router.go(-1)">
      <img src="../assets/svg/arrow.svg" alt="">
    </button>
  </nav>
</template>
