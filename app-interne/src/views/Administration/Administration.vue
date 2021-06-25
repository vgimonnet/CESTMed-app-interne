<template>
  <div class="administration">
    <h1>This is the administration page</h1>
    <nav>
      <router-link v-bind:to="{ name: 'TortuesAdmin' }">Tortues</router-link> |
      <router-link v-bind:to="{ name: 'NourrituresAdmin' }">Nourritures</router-link> |
      <router-link v-bind:to="{ path: '/' }">Paramétrages</router-link> |
    </nav>
    <router-view></router-view>
  </div>
</template>
