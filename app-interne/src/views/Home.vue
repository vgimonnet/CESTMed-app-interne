<template>
  <div class="home w-100 d-grid container">
    <div v-if="show" style="margin-bottom: 64px;">
      <span class="title">Tortues signalées</span>
      <div class="d-flex align-items-center justify-content-start" style="margin-top: 3.6rem;">
        <turtle-card :turtle="fakeTurtle" :fake="true"/>
      </div>
    </div>

    <span class="title">Tortues actuellement dans le centre</span>
    <div class="row">
      <turtle-card v-for="turtle in turtles" :key="turtle._id" :turtle="turtle" class="col-12 col-sm-6 col-md-3 col-lg-2" :fake="false"/>
    </div>    
  </div>
</template>

<script>
// @ is an alias to /src
import TurtleCard from '@/components/cards/TurtleCard'

export default {
  name: 'Home',
  components: {
    'turtle-card': TurtleCard
  },
  data () {
    return {
      turtles: [],
      show: false,
      fakeTurtle: {
        _id: 0,
        name: 'Tortue 20/03',

      }
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
    document.addEventListener('DOMContentLoaded', () => {
      document.addEventListener('keydown', (e) => {
        if (e.key == 's') {
          this.show = !this.show
        }
      })
    })
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

<style lang="scss" scoped>
  span.title {
    color: #0A1D42;
    font-weight: 800;
    font-style: normal;
    font-size: 3.6rem;
    margin-bottom: 3.6rem;
  }
</style>
