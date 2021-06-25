<template>
  <div>
    <h2>{{ $route.params.id ? 'Modifier le type de nourriture' : 'Ajouter un type de nourriture' }}</h2>
    <form @submit="submitForm($event)">
      <label for="name">Nom</label>
      <input type="text" id="name" v-model="name" required>

      <input type="submit" :value="$route.params.id ? 'Modifier' : 'Ajouter'">

    </form>
  </div>
</template>

<script>
  export default {
    name: 'NourritureForm',
    data() {
      return {
        name: null
      }
    },
    created () {
      this.unsubscribe = this.$store.subscribe((mutations) => {
        if (mutations.type === 'FOODADDED') {
          this.redirect('ajout tortue succès !')
        } if (mutations.type === 'FOODUPDATED') {
          this.redirect('modification tortue succès !')
        } else if (mutations.type === 'FOODERROR') {
          console.log('erreur de formulaire')
        } else if (mutations.type === 'SINGLEFOOD') {
          this.fillFoodData(mutations.payload.data)
        }
      })
    },
    mounted () {
      this.fetchFood()
    },
    beforeDestroy () {
      this.unsubscribe()
    },
    methods: {
      submitForm (event) {
        event.preventDefault()
        if (typeof this.$route.params.id != 'undefined') {
          this.$store.dispatch('updateFood', {
            id : this.$route.params.id,
            food : {
              name: this.name
            }            
          })  
        } else {
          this.$store.dispatch('addFood', {
            name: this.name
          })
        }
      },
      fetchFood () {
        if (typeof this.$route.params.id != 'undefined') {
          this.$store.dispatch('getOneFood', this.$route.params.id)
        }
      },
      fillFoodData (data) {
        this.name = data.name
      },
      redirect (message) {
        console.log(message)
        this.$router.push({ name: 'NourrituresAdmin' })
      }
    }
  }
</script>