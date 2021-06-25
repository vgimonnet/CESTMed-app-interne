<template>
  <div class="food">
    <h1>Nourritures</h1>
    <router-link v-bind:to="{ name: 'AjouterNourriture' }">Ajouter</router-link>
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="food in foods" :key="food._id">
          <td>{{ food.name }}</td>
          <td>
            <router-link v-bind:to="{ name: 'ModifierNourriture', params: {id: food._id} }">Modifer</router-link>
            <button @click="deleteFood(food._id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'NourrituresAdmin',
    data () {
      return {
        foods: []
      }
    },
    created () {
      this.unsubscribe = this.$store.subscribe((mutations) => {
        if (mutations.type === 'FOODLIST') {
          this.foods = mutations.payload.data
        } else if (mutations.type === 'FOODDELETED') {
          this.fetchFoods()
        }
      })
    },
    mounted () {
      this.fetchFoods()
    },
    beforeDestroy () {
      this.unsubscribe()
    },
    methods: {
      fetchFoods () {
        this.$store.dispatch('getFoods')
      },
      deleteFood (id) {
        this.$store.dispatch('deleteFood', id)
      }
    }
  }
</script>
