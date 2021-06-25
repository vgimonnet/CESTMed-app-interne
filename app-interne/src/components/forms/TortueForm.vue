<template>
  <div style="padding: 1rem 5rem;">
    <h1>{{ $route.params.id ? 'Modification d\'une fiche tortue' : 'Création d\'une nouvelle fiche tortue marine'  }}</h1>
    <form @submit="submitForm($event)" id="form">
      <div class="mb-24 row">
        <div class="col-3"><label for="name" class="label-important">Nom</label></div>
        <div class="col-9"><input type="text" id="name" v-model="name" required class="fill-available" placeholder="Entrez un nom"></div>
      </div>
      <div class="mb-24 d-flex flex-row justify-content-start align-items-center">
        <div class="col-3"><label for="species" class="label-important">Nom scientifique</label></div>
        <div class="col-9">
          <fieldset>
            <input type="radio" name="species" id="species_1" value="CC" v-model="species" class="d-none" @change="toggleLabelStyle($event, 'species')" required>
            <label for="species_1" class="label-btn-choice">Caretta Caretta</label>
            <input type="radio" name="species" id="species_2" value="CM" class="d-none" @change="toggleLabelStyle($event, 'species')">
            <label for="species_2" class="label-btn-choice">Chelonya Midas</label>
            <input type="radio" name="species" id="species_3" value="EI" class="d-none" @change="toggleLabelStyle($event, 'species')">
            <label for="species_3" class="label-btn-choice">Eretmochelys Imbricata</label>
          </fieldset>
        </div>
      </div>

      <hr>

      <div class="row">
        <div class="col-12 col-md-6">
          <div class="mb-24 row">
            <div class="col-6"><label for="size" class="label-important">Longueur (cm)</label></div>
            <div class="col-6"><input type="number" name="size" id="size" v-model="size" required min="0" step="0.1" placeholder="Entrez une taille"></div>
          </div>
          <div class="mb-24 row">
            <div class="col-6"><label for="width" class="label-important">Largeur (cm)</label></div>
            <div class="col-6"><input type="number" name="width" id="width" v-model="width" required min="0" step="0.1" placeholder="Entrez une taille"></div>
          </div>
          <div class="mb-24 row">
            <div class="col-6"><label for="height" class="label-important">Hauteur (cm)</label></div>
            <div class="col-6"><input type="number" name="height" id="height" v-model="height" required min="0" step="0.1" placeholder="Entrez une taille"></div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="mb-24 row">
            <div class="col-6"><label for="weight" class="label-important">Poid (kg)</label></div>
            <div class="col-6"><input type="number" name="weight" id="weight" v-model="weight" required min="0" step="0.1" placeholder="Entrez un poids"></div>
          </div>
          <div class="mb-24 row">
            <div class="col-6"><label for="old" class="label-important">Âge (environ)</label></div>
            <div class="col-6"><input type="number" name="old" id="old" v-model="old" required min="0" step="1" placeholder="Entrez un âge"></div>
          </div>
        </div>

      </div>

      <hr>

      <div class="mb-24 d-flex flex-row justify-content-start align-items-center">
        <div class="col-3"><label for="" class="label-important">Genre</label></div>
        <div class="col-9">
          <fieldset>
            <input type="radio" name="gender" id="gender_1" value="male" v-model="gender" required class="d-none" @change="toggleLabelStyle($event, 'gender')">
            <label for="gender_1" class="label-btn-choice">Femelle</label>
            <input type="radio" name="gender" id="gender_2" value="female" class="d-none" @change="toggleLabelStyle($event, 'gender')">
            <label for="gender_2" class="label-btn-choice">Mâle</label>
            <input type="radio" name="gender" id="gender_3" value="undefined" class="d-none" @change="toggleLabelStyle($event, 'gender')">
            <label for="gender_3" class="label-btn-choice">Non spécifié</label>
          </fieldset>
        </div>
      </div>
      <div class="mb-24 d-flex flex-row justify-content-start align-items-center">
        <div class="col-3"><label for="" class="label-important">État de santé</label></div>
        <div class="col-9">
          <fieldset>
            <input type="checkbox" name="health" id="health_1" data-value="good" v-model="health" class="d-none" @change="toggleLabelStyle($event, 'health')">
            <label for="health_1" class="label-btn-choice">Bonne santé</label>
            <input type="checkbox" name="health" id="health_2" data-value="hurt" class="d-none" @change="toggleLabelStyle($event, 'health')">
            <label for="health_2" class="label-btn-choice">Blessure</label>
            <input type="checkbox" name="health" id="health_3" data-value="epizoite" class="d-none" @change="toggleLabelStyle($event, 'health')">
            <label for="health_3" class="label-btn-choice">Epizoïte</label>
            <input type="checkbox" name="health" id="health_4" data-value="tumor" class="d-none" @change="toggleLabelStyle($event, 'health')">
            <label for="health_4" class="label-btn-choice">Tumeur</label>
            <input type="checkbox" name="health" id="health_5" data-value="other" class="d-none" @change="toggleLabelStyle($event, 'health')">
            <label for="health_5" class="label-btn-choice">Autre</label>
          </fieldset>
        </div>
      </div>
      <div class="mb-24 row">
        <div class="col-3"><label for="entryCause" class="label-important">Cause d'accueil</label></div>
        <div class="col-9"><input type="text" name="entryCause" id="entryCause" v-model="entryCause" required placeholder="Donnez une raison"></div>
      </div>

      <hr>

      <p>Si la tortue est blessé, merci d'indiquer la zone abîmée</p>
      <div class="row">

        <div class="col-12 col-md-6">
          <div class="form-border">
            <p class="d-flex">
              Vue d'au-dessus
              <button type="button" class="btn-unstyled text-dark ml-auto btn-reload" @click="clearCanvas('top')">
                <img src="../../assets/svg/reload-arrow.svg" alt="reload arrow">
              </button>
            </p>
            <div class="text-center d-flex justify-content-center align-items-center">
              <canvas class="health-schema cc top" @click="addInjury($event, 'top')" id="top"></canvas>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="form-border">
            <p class="d-flex">
              Vue d'en-dessous
              <button type="button" class="btn-unstyled text-dark ml-auto btn-reload" @click="clearCanvas('bottom')">
                <img src="../../assets/svg/reload-arrow.svg" alt="reload arrow">            
              </button>
            </p>
            <div class="text-center d-flex justify-content-center align-items-center">
              <canvas class="health-schema cc bottom" @click="addInjury($event, 'bottom')" id="bottom"></canvas>
            </div>
          </div>
        </div>

        <div class=" form col-12 col-md-6 d-flex flex-column">
          <div class="form">
            <div id="file-input-container"></div>
            <button class="btn-unstyled ml-auto" type="button" @click="addAttachment()">
              <img src="../../assets/svg/cross.svg" alt="cross">
            </button>

            <div>
              <b-carousel
                id="carousel-1"
                v-model="slide"
                :interval="7000"
                
                indicators
                background="none"
                img-width="1024"
                img-height="480"
                style="text-shadow: 1px 1px 2px #333;"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
                v-if="pictures.length > 0"
              >
                <b-carousel-slide :img-src="picture.path" v-for="picture in pictures" :key="picture.path"></b-carousel-slide>
              </b-carousel>
              <p class="text-center" v-else>
                Aucune photo
              </p>
            </div>
          </div>

          <button type="button" class="btn">Identifier la tortue</button>
          
        </div>

        <div class="col-12 col-md-6">
          <div class="form">
            <label for="comment" class="p">
              <img src="../../assets/svg/comment.svg" alt="comment logo">
              Ajouter un commentaire général
            </label>
            <textarea name="comment" id="comment" cols="30" rows="10" v-model="comment"></textarea>
          </div>
        </div>      

      </div>

    </form>
  </div>
</template>

<script>
  export default {
    name: 'TortueForm',
    data() {
      return {
        name: null,
        species: null,
        health: null,
        size: null,
        width: null,
        height: null,
        weight: null,
        otherMesure: null,
        old: null,
        entryCause: null,
        comment: null,
        gender: null,
        pictures: [],
        injuries: [],
        slide: 0,
        sliding: null
      }
    },
    created () {
      this.unsubscribe = this.$store.subscribe((mutations) => {
        if (mutations.type === 'TURTLEADDED') {
          console.log('ajout tortue succès !')
          this.$router.push({ name: 'Home' })
        } if (mutations.type === 'TURTLEUPDATED') {
          console.log('modification tortue succès !')
          this.$router.push({ name: 'Home' })
        } else if (mutations.type === 'TURTLEERROR') {
          console.log('erreur de formulaire')
        } else if (mutations.type === 'SINGLETURTLE') {
          this.fillTurtleData(mutations.payload.data)
        }
      })
    },
    mounted () {
      this.fetchTurtle()
    },
    beforeDestroy () {
      this.unsubscribe()
    },
    methods: {
      submitForm (event) {
        event.preventDefault()
        this.health = ''
        let selectedHealthState = document.querySelectorAll('input[name="health"]:checked')
        for (let i = 0; i < selectedHealthState.length; i++) {
          if (i == 0) {
            this.health += selectedHealthState[i].dataset.value
          } else {
            this.health += '@' + selectedHealthState[i].dataset.value            
          }
          
        }
        if (typeof this.$route.params.id != 'undefined') {
          this.$store.dispatch('updateTurtle', {
            id : this.$route.params.id,
            turtle : {
              name: this.name,
              species: this.species,
              health: this.health,
              size: this.size,
              width: this.width,
              height: this.height,
              weight: this.weight,
              otherMesure: this.otherMesure,
              old: this.old,
              comment: this.comment,
              entryCause: this.entryCause,
              gender: this.gender,
              injuries: this.injuries,
              pictures: this.pictures
            }
          })  
        } else {
          this.$store.dispatch('addTurtle', {
            name: this.name,
            species: this.species,
            health: this.health,
            size: this.size,
            width: this.width,
            height: this.height,
            weight: this.weight,
            otherMesure: this.otherMesure,
            old: this.old,
            comment: this.comment,
            entryCause: this.entryCause,
            gender: this.gender,
            injuries: this.injuries,
            pictures: this.pictures
          })
        }
      },
      fetchTurtle () {
        if (typeof this.$route.params.id != 'undefined') {
          this.$store.dispatch('getOneTurtle', this.$route.params.id)
        }
      },
      fillTurtleData (data) {
        this.name = data.name
        this.species = data.species
        this.health = data.health
        this.size = data.size
        this.width = data.width
        this.height = data.height
        this.weight = data.weight
        this.otherMesure = data.otherMesure
        this.old = data.old
        this.comment = data.comment
        this.entryCause = data.entryCause
        this.gender = data.gender
        data.attachments.forEach((attachment) => {
          if (!attachment.isMedicalDoc) {
            this.pictures.push(attachment)
          }
        })
        data.injuries.forEach((injury) => {
          this.injuries.push(injury)
        })
      },
      addInjury (event, idCanvas) {
        var canvas = document.getElementById(idCanvas);
        if (canvas.getContext)
        {
          var ctx = canvas.getContext('2d')
          const rect = canvas.getBoundingClientRect()

          const R = 15;

          let scaleX = canvas.width / rect.width
          let scaleY = canvas.height / rect.height

          let x = (event.clientX - rect.x) * scaleX
          let y = (event.clientY - rect.y) * scaleY

          ctx.beginPath();
          ctx.arc(x, y, R, 0, 2 * Math.PI);
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#FF0000';
          ctx.stroke();

          this.injuries.push({
            'coordX': x,
            'coordY': y,
            'side': idCanvas,
          })
        }
      },
      clearCanvas (idCanvas) {
        const canvas = document.getElementById(idCanvas)
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)
      },
      addAttachment () {
        document.getElementById('file-input-container').insertAdjacentHTML('beforeend', `
          <input type="file" name="picture_${this.pictures.length + 1}" id="picture_${this.pictures.length + 1}" style="display: none">
        `)
        let input = document.getElementById(`picture_${this.pictures.length + 1}`)
        input.click()
        input.addEventListener('change', () => {
          console.log('input', input)
          'carouselTurtlePicturesContainer'
          if (input.files && input.files[0]) {
            let reader = new FileReader()
            var self = this
            reader.onload = (e) => {
              self.pictures.push({
                'path': e.target.result,
                'isMedical': false,
                'turtle': self.$route.params.id ? self.$route.params.id : null
              })
            }

            reader.readAsDataURL(input.files[0]);
          }

        })
      },
      prevent (event) {
        event.preventDefault()
      },
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      },
      toggleLabelStyle (event, type) {
        const radio = event.currentTarget
        let label = document.querySelector(`label[for="${radio.id}"]`)
        let activeLabels = document.querySelectorAll(`.active-label`)
        for (let i = 0; i < activeLabels.length; i++) {
          let activeLabel = activeLabels[i]
          if (activeLabel.getAttribute('for').includes(type)) {
            if (activeLabel.classList.contains('active-label')) {
              activeLabel.classList.remove('active-label')
            } else {
              activeLabel.classList.add('active-label')
            }
          }
        }
        if (label.classList.contains('active-label')) {
          label.classList.remove('active-label')
        } else {
          label.classList.add('active-label')
        }

        if (type == 'species') {
          this.species = radio.getAttribute('value')
        } else if (type == 'gender') {
          this.gender = radio.getAttribute('value')
        }
      }
    },
    watch: {
      species: function (val) {
        let illustrations = document.getElementsByClassName('health-schema')
        for (let i = 0; i < illustrations.length; i++) {
          let illustration = illustrations[i]

          if (illustration.id == 'top' && !illustration.classList.contains(val.toLowerCase())) {
            illustration.className = `health-schema ${val.toLowerCase()} top`
          } else if (illustration.id == 'bottom' && !illustration.classList.contains(val.toLowerCase())) {
            illustration.className = `health-schema ${val.toLowerCase()} bottom`
          }
        }
      },
      health: function (val) {
        console.log('val', val)
        console.log(this.health)
      }
    }
  }
</script>

<style lang="scss" scoped>
  h1 {
    font-size: 3.6rem;
    font-weight: 900;
    font-style: normal;
    margin-bottom: 5.2rem;
  }

  .btn {
    display: inline;
    font-size: 2.2rem;
    padding: 1rem 2rem;
    background-color: white;
    border: 0.2rem solid #0A1D42;
    border-radius: 1.8rem;
    color: #0A1D42;
  }

  p, .p {
    font-size: 2.2rem;
  }

  .carousel-item {
    max-height: 50rem;
    width: auto;
  }

  .mb-24 {
    margin-bottom: 2.4rem;
  }

  .btn-reload {
    img {
      height: 2rem;
    }
  }

  #form {
    font-size: 1.6rem;
    // padding: 1rem 5rem;
    .label-important {
      font-size: 2.2rem;
      font-weight: 700;
    }

    .form {
      background-color: #FDF5EE;
      // padding: 1rem 1.6rem;
      border-radius: 1.8rem;
    }

    .form-border {
      border-radius: 1.8rem;
      border: 0.2rem #0A1D42 solid;
      padding: 1rem;
    }

    hr {
      margin-top: 1.6rem;
      margin-bottom: 4rem;
    }

    input, textarea {
      border-radius: 1.2rem;
      padding-left: 1rem;
      // margin-left: 7rem;
      border-color: #0A1D42;
      font-size: 1.8rem;
      &::placeholder {
        color: #7391CB;
      }
      &[type=text], &[type=number] {
        height: 4.8rem;
      }
    }
  }

  .label-btn-choice {
    padding: 0.8rem 1.2rem;
    background-color: transparent;
    border-radius: 1.2rem;
    border: 0.2rem #0A1D42 solid;
    &.active-label {
      background-color: #E3EDFF;
      // border-color: #E3EDFF;
      font-weight: 700;
    }
  }

  fieldset {
    // margin-left: 1.2rem;
    label {
      margin-right: 1.6rem;
      &:last-child {
        margin-right: 0rem;
      }
    }
  }
</style>