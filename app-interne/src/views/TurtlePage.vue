<template>
  <div v-if="turtle" class="w-100" id="turtle-page">

    <div class="row w-100">

      <div class="col-12 col-md-7 carousel-container">
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="7000"
          controls
          indicators
          background="none"
          img-width="1024"
          img-height="480"
          label-next=''
          label-prev=''
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <b-carousel-slide>
            <div class="text-center d-flex flex-column justify-content-center align-items-center">
              <canvas :class="'health-schema ' + turtle.species.toLowerCase() + ' top'" id="top"></canvas>
            </div>
          </b-carousel-slide>
          <b-carousel-slide>
            <div class="text-center d-flex flex-column justify-content-center align-items-center">
              <canvas :class="'health-schema ' + turtle.species.toLowerCase() + ' bottom'" id="bottom"></canvas>
            </div>
          </b-carousel-slide>
        </b-carousel>
      </div>
      <!-- {{ turtle }} -->
      <div class="col-12 col-md-5">
        <h1>{{ turtle.name }}</h1>
        <h2>{{ scientificName + ' ' + turtle.number }}</h2>
        <div id="data-turtle">
          <p>
            En centre depuis 
            <span>
              {{ getDaysNumber(turtle.dateCreated) }}
            </span>            
          </p>
          <p>
            Sexe 
            <span>
              {{ gender }}
            </span>
          </p>
          <p>
            Âge 
            <span>
              {{ turtle.old }} ans
            </span>
          </p>
          <p>
            Taille 
            <span>
              {{ turtle.size }} cm
            </span>
          </p>
          <p>
            Poids 
            <span>
              {{ turtle.weight }} kg
            </span>
          </p>
        </div>
        <div id="comment">
          <p class="title-comment">
            <img src="../assets/svg/commentaire.svg" alt="comment logo">
            Commentaire général
          </p>
          
          <p class="comment-text">
            {{ turtle.comment }}
          </p>
          <p class="comment-data">
            Publié le <span class="bold">02/04/2021</span>
            <span class="ml-auto">
              Par <span class="white-card">CESTMed</span>
            </span>
          </p>
        </div>
      </div>

    </div>

    <nav id="tab">
      <router-link :to="{ name: 'VoirTortueSuivi' }" id="firstTab">Tableau de suivi</router-link>
      <router-link :to="{ name: 'VoirTortueDetail' }">Détails</router-link>
      <router-link :to="{ name: 'VoirTortueAide' }">Aide</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'TurtlePage',
    data() {
      return {
        turtle: null,
        scientificName: 'Non spécifié',
        pictures: [],
        documents: [],
        slide: 0,
        sliding: null,
        gender: 'Non spécifié'
      }
    },
    created () {
      this.unsubscribe = this.$store.subscribe((mutations) => {
        if (mutations.type === 'SINGLETURTLE') {
          this.getTurtleData(mutations.payload.data)
        }
      })
    },
    mounted () {
      this.fetchTurtle()
    },
    beforeDestroy () {
      this.unsubscribe()
    },
    updated () {
      this.createHealthIllustration()
      if (this.$route.name == 'VoirTortue') {
        document.getElementById('firstTab').click()
      }
    },
    methods: {
      fetchTurtle () {
        this.$store.dispatch('getOneTurtle', this.$route.params.id)
      },
      getTurtleData (data) {
        this.turtle = data
        if (this.turtle.species == 'CC') {
          this.scientificName = 'Caretta Caretta'
        } else if (this.turtle.species == 'CM') {
          this.scientificName = 'Chelonya Midas'
        } else if (this.turtle.species == 'EI') {
          this.scientificName = 'Eretmochelys Imbricata'
        }

        if (this.turtle.gender == 'male') {
          this.gender = 'Mâle'
        } else if (this.turtle.gender == 'female') {
          this.gender = 'Femelle'
        } else if (this.turtle.gender == 'undefined') {
          this.gender = 'Non spécifié'
        }

        data.attachments.forEach((attachment) => {
          if (attachment.isMedicalDoc) {
            this.documents.push(attachment)
          } else {
            this.pictures.push(attachment)
          }
        })
        
      },
      createHealthIllustration () {
        this.turtle.injuries.forEach((injury) => {
          let canvas = document.getElementById(injury.side);
          if (canvas.getContext)
          {

            let ctx = canvas.getContext('2d')
            const R = 15;

            ctx.beginPath();
            ctx.arc(injury.coordX, injury.coordY, R, 0, 2 * Math.PI);
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#FF0000';
            ctx.stroke();
          }
        })
      },
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      },
      getDaysNumber (date) {
        const now = new Date()
        const arrivedAt = new Date(date)
        const diffTime = Math.abs(now - arrivedAt);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        
        return diffDays == 0 ? 'aujourd\'hui' : `${diffDays}j`
      }
    },
    watch : {
      $route () {
        this.fetchTurtle()
      }
    }

  }
</script>

<style lang="scss" scoped>
  #turtle-page {
    padding: 1rem 5rem;
    h1 {
      font-weight: 800;
      font-style: normal;
      font-size: 3.6rem;
    }

    h2 {
      color: #458445;
      font-size: 2.2rem;
      font-weight: 700;
      background-color: #E0FFE0;
      border-radius: 1.2rem;
      padding: 1rem 1.6rem;
      width: fit-content;
    }

    #data-turtle {
      // margin-top: 2.6rem;
      font-size: 2.2rem;
      line-height: 2rem;
      p {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        span {
          margin-left: auto;
        }
        padding-bottom: 1.8rem;
        border-bottom: 0.2rem #7391CB solid;
        margin-top: 1.8rem;
        &:first-child {
          margin-top: 2.6rem;
        }
      }
    }

    #comment {
      padding: 1rem;
      background-color: #FDF5EE;
      border-radius: 1.8rem;
      padding: 2.4rem;
      margin-top: 3rem;
      .title-comment {
        color: #7391CB;
        font-size: 2.2rem;
        font-weight: 700;
        img {
          margin-right: 1.6rem;
        }
      }
      .comment-text {
        font-size: 1.8rem;
      }

      .comment-data {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.6rem;
        span.ml-auto {
          margin-left: auto;
        }
        span.bold {
          font-weight: 700;
          margin-left: 1.2rem;
        }
        span.white-card {
          color: #7391CB;
          padding: 1rem;
          background-color: #FFFFFF;
          border-radius: 1.2rem;
          margin-left: 1.2rem;
        }
      }
    }

    nav#tab {
      margin-top: 1rem;
      margin-bottom: 2rem;
      border-bottom: 0.2rem #7391CB solid;
      padding-bottom: 1.2rem;
      a {
        font-size: 2.2rem;
        padding: 1.3rem 2rem;
        border-radius: 1.8rem 1.8rem 0 0;
        &.router-link-active {
          background-color: #E3EDFF;
          font-weight: 700;
          
        }
      }
    }
  }
  
</style>