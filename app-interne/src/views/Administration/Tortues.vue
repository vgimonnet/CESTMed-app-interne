<template>
  <div class="turtle">
    <h1>Tortues</h1>
    <router-link v-bind:to="{ name: 'AjouterTortue' }">Ajouter</router-link>
    <div class="d-flex align-items-center justify-content-start">
      <turtle-card-admin v-for="turtle in turtles" :key="turtle._id" :turtle="turtle">
        <button @click="archiveTurtle(turtle._id)">Archiver</button>
        <button @click="deleteTurtle(turtle._id)">Supprimer</button>
      </turtle-card-admin>
    </div>
    <!-- <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Espèce</th>
          <th>Âge</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="turtle in turtles" :key="turtle._id">
          <td>{{ turtle.name }}</td>
          <td>{{ turtle.species }}</td>
          <td>{{ turtle.old }}</td>
          <td>
            <router-link v-bind:to="{ name: 'ModifierTortue', params: {id: turtle._id} }">Modifer</router-link>
            <button @click="deleteTurtle(turtle._id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>

<script>
  import TurtleCardAdmin from '@/components/cards/TurtleCardAdmin.vue'

  export default {
    components: { 
      'turtle-card-admin': TurtleCardAdmin
    },
    name: 'TortuesAdmin',
    data () {
      return {
        turtles: []
      }
    },
    created () {
      this.unsubscribe = this.$store.subscribe((mutations) => {
        if (mutations.type === 'TURTLELIST') {
          this.turtles = mutations.payload.data
        } else if (mutations.type === 'TURTLEDELETED') {
          this.fetchTurtles()
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
      },
      deleteTurtle (id) {
        this.$store.dispatch('deleteTurtle', id)
      },
      archiveTurtle (id) {
        console.log(`TODO : Archive methods (turtle id : ${id})`)
      }
    }
  }
</script>
