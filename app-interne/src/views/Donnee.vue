<template>
  <div v-if="turtle">
    <form @submit="formSubmit($event)" class="m-5">
      <h1>Ajout d'une donnée sur le tortue {{ turtle.name }}</h1>
      <div id="selection-choice">
        <div class="d-flex justify-content-center align-items-center">
          <span >
            <label for="volunteer" class="label">Référent  :</label>
            <input list="volunteers" v-model="volunteer" name="volunteer" id="volunteer" required>
            <datalist id="volunteers">
              <option value="CESTMed">CESTMed</option>
              <option value="Virgine Hochart">Virgine Hochart</option>
              <option value="Laurie Sartout">Laurie Sartout</option>
              <option value="Audrey Zahoua">Audrey Zahoua</option>
              <option value="Jonathan Metz">Jonathan Metz</option>
              <option value="Valentin Gimonnet">Valentin Gimonnet</option>
            </datalist>  
          </span>

          <span class="ml-auto">
            <label for="date" class="label">Date :</label>
            <input type="date" name="date" id="date" v-model="date" required @change="show()">
          </span>
        </div>

        <div class="choice">
          <label for="datatype" class="label">Ajouter une donnée de :</label>
          <fieldset class="choice-list">
            <input type="radio" name="datatype" id="datatype_1" value="healt" v-model="datatype" class="d-none" @change="toggleLabelStyle($event, 'datatype')" required>
            <label for="datatype_1" class="label-choice">
              <img src="../assets/svg/data-health.svg" alt="data health logo">
              Soins appliqués
            </label>
            <input type="radio" name="datatype" id="datatype_2" value="food" class="d-none" @change="toggleLabelStyle($event, 'datatype')">
            <label for="datatype_2" class="label-choice">
              <img src="../assets/svg/data-food.svg" alt="data health logo">
              Nourriture
            </label>
            <input type="radio" name="datatype" id="datatype_3" value="feces" class="d-none" @change="toggleLabelStyle($event, 'datatype')">
            <label for="datatype_3" class="label-choice">
              <img src="../assets/svg/data-poo.svg" alt="data health logo">
              Fécès
            </label>
            <input type="radio" name="datatype" id="datatype_4" value="clean" class="d-none" @change="toggleLabelStyle($event, 'datatype')">
            <label for="datatype_4" class="label-choice">
              <img src="../assets/svg/data-clean.svg" alt="data clean logo">
              Nettoyage
            </label>
            <input type="radio" name="datatype" id="datatype_5" value="weight" class="d-none" @change="toggleLabelStyle($event, 'datatype')">
            <label for="datatype_5" class="label-choice">
              <img src="../assets/svg/data-weight.svg" alt="data weight logo">
              Poid
            </label>
          </fieldset>
        </div>
      </div>

      <div class="datatype_1 form-datatype d-none">
        Soin
      </div>

      <div class="datatype_2 form-datatype d-none" id="food-form">

        <div class="d-flex flex-row justify-content-between align-items-baseline">
          <div class="d-flex flex-row justify-content-start align-items-center" style="margin-bottom: 15rem;">
            <span style="font-size: 2.2rem; margin-right: 4.5rem;" class="d-flex flex-column justify-content-center align-items-start">
              Thématique 
              <span>de la donnée :</span>
            </span>
            <label for="datatype_1" class="label-choice">
              <img src="../assets/svg/data-health.svg" alt="data health logo">
              Soins appliqués
            </label>
          </div>
          <button type="button" class="btn" @click="reset()">Choisir une autre thématique</button>
        </div>

        <div class="row">
          <div class="col-12 col-md-6">
            <h2>Choisir un type de nourriture</h2>
            <fieldset>
              <span v-for="nourriture in nourritures" :key="nourriture._id">
                <input type="radio" name="food" :id="'foodd' + nourriture._id" :value="nourriture.name" v-model="foodData.typeOfFoodGiven" class="d-none" @click="addFoodToContainer($event, 'active-label-blue', 'container-donnes')" required>
                <label :for="'foodd' + nourriture._id" class="label-btn">{{ nourriture.name }}</label>
              </span>
              <span>
                <input type="radio" name="food" id="foodd_0" value="Autre" v-model="foodData.typeOfFoodGiven" class="d-none" @click="addFoodToContainer($event, 'active-label-blue', 'container-donnes')" required>
                <label for="foodd_0" class="label-btn">Autre</label>
              </span>
            </fieldset>          
            <h2 style="margin-top: 3.5rem">
              Repas donnés aujourd'hui <span class="count count-blue">{{ foodData.total }}</span>
            </h2>
            <div id="container-donnes" class="d-flex flex-row flex-wrap">

            </div>
          </div>

          <div class="col-12 col-md-6">
            <h2>Choisir un type de nourriture</h2>
            <fieldset>
              <span v-for="nourriture in nourritures" :key="nourriture._id">
                <input type="radio" name="food" :id="'foodr' + nourriture._id" :value="nourriture.name" v-model="foodData.typeOfFoodRestant" class="d-none" @click="addFoodToContainer($event, 'active-label-red', 'container-restants')" required>
                <label :for="'foodr' + nourriture._id" class="label-btn">{{ nourriture.name }}</label>
              </span>
              <span>
                <input type="radio" name="food" id="food_0" value="Autre" v-model="foodData.typeOfFoodRestant" class="d-none" @click="addFoodToContainer($event, 'active-label-red', 'container-restants')" required>
                <label for="food_0" class="label-btn">Autre</label>
              </span>
            </fieldset>
              <h2 style="margin-top: 3.5rem">
                Repas restants aujourd'hui <span class="count count-red">{{ foodData.restant }}</span>
              </h2>
              <div id="container-restants" class="d-flex flex-row flex-wrap">

              </div>
          </div>
        </div>

        <div style="margin-top: 16.5rem;" class="d-flex">
          <button type="button" class="ml-auto btn-save" @click="$router.go(-1)">Enregistrer</button>
        </div>
      </div>

      <!-- <div class="datatype_2 form-datatype d-none" id="food-form">
        <div class="d-flex flex-row justify-content-between align-items-baseline" style="margin-bottom: 15rem;">
          <div class="d-flex flex-row justify-content-start align-items-center">
            <span style="font-size: 2.2rem; margin-right: 4.5rem;" class="d-flex flex-column justify-content-center align-items-start">
              Thématique 
              <span>de la donnée :</span>
            </span>
            <label for="datatype_1" class="label-choice">
              <img src="../assets/svg/data-health.svg" alt="data health logo">
              Soins appliqués
            </label>
          </div>
          <button type="button" class="btn">Choisir une autre thématique</button>
        </div>
        <p>
          Repas donnés aujourd'hui: {{ foodData.total }}
        </p>

        <p>
          Repas restants aujourd'hui: {{ foodData.restant }}
        </p>

        <div>
          Ajouter :
          <span>
            <button @click="foodData.nbToGive--" type="button">-</button>
            {{ foodData.nbToGive }}
            <button @click="foodData.nbToGive++" type="button">+</button>
          </span>

          Type : 
          <label for="food">Nom scientifique</label>
          <fieldset>
            <span v-for="nourriture in nourritures" :key="nourriture._id">
              <input type="radio" name="food" :id="'food' + nourriture._id" :value="nourriture.name" v-model="foodData.typeOfFoodGiven" class="d-none" @change="toggleLabelStyle($event, 'food')" required>
              <label :for="'food' + nourriture._id" class="label-btn">{{ nourriture.name }}</label>
            </span>
            <span>
              <input type="radio" name="food" id="food_0" value="other" v-model="foodData.typeOfFoodGiven" class="d-none" @change="toggleLabelStyle($event, 'food')" required>
              <label for="food_0" class="label-btn">Autre</label>
            </span>
          </fieldset>

          <button @click="addFood('given')">Ajouter</button>
        </div>

        <p>Repas restants :</p>
        <div>
          Ajouter :
          <span>
            <button @click="foodData.restant--" type="button">-</button>
            {{ foodData.restant }}
            <button @click="foodData.restant++" type="button">+</button>
          </span>

          Type : 
          <label for="food">Nom scientifique</label>
          <fieldset>
            <span v-for="nourriture in nourritures" :key="nourriture._id">
              <input type="radio" name="food" :id="'food' + nourriture._id" :value="nourriture.name" v-model="foodData.typeOfFoodRestant" class="d-none" @change="toggleLabelStyle($event, 'food')" required>
              <label :for="'food' + nourriture._id" class="label-btn">{{ nourriture.name }}</label>
            </span>
            <span>
              <input type="radio" name="food" id="food_0" value="other" v-model="foodData.typeOfFoodRestant" class="d-none" @change="toggleLabelStyle($event, 'food')" required>
              <label for="food_0" class="label-btn">Autre</label>
            </span>
          </fieldset>

          <button @click="addFood('given')">Ajouter</button>
        </div>

        <hr class="mx-auto w-50">

        <div>
          Historique des repas
          <ul>
            <li v-for="element in historique" :key="element">
              Date : {{ element.date }} Repas donnés : {{ element.give }} Référent : {{ element.volunteer }}
            </li>
          </ul>
        </div>
      </div> -->

      <div class="datatype_3 form-datatype d-none">
        Fécès
      </div>

      <div class="datatype_4 form-datatype d-none">
        Nettoyage
      </div>

      <div class="datatype_5 form-datatype d-none">
        Poid
      </div>

    </form>
  </div>
</template>

<script>
  export default {
    name: 'Donnee',
    data () {
      return {
        date: null,
        volunteer: null,
        datatype: null,
        foodData: {
          total: 0,
          restant: 0,
          nbToGive: 0,
          nbRestant: 0,
          typeOfFoodGiven: null,
          typeOfFoodRestant: null
        },
        nourritures: [],
        historique: [],
        turtle: null,
        idDiv: 0
      }
    },
    created () {
      const now = new Date()
      let dateToString = now.getFullYear()
      if (now.getMonth() < 9) {
        dateToString += `-0${now.getMonth() + 1}`
      } else {
        dateToString += `-${now.getMonth() + 1}`
      }
      if (now.getDate() < 10) {
        dateToString += `-0${now.getDate()}`
      } else {
        dateToString += `-${now.getDate()}`
      }
      this.date = dateToString
      this.volunteer = 'CESTMed'
      this.unsubscribe = this.$store.subscribe((mutations) => {
        if (mutations.type === 'FOODLIST') {
          this.nourritures = mutations.payload.data
        } else if (mutations.type === 'SINGLETURTLE') {
          this.turtle = mutations.payload.data
        }
      })
    },
    mounted () {
      this.fetchNourritures()
      this.fetchTurtle()
      document.getElementById('date').value = this.date
    },
    beforeDestroy () {},
    methods: {
      formSubmit (event) {
        event.preventDefault()
      },
      fetchNourritures () {
        this.$store.dispatch('getFoods')
      },
      fetchTurtle () {
        this.$store.dispatch('getOneTurtle', this.$route.params.id)
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

        if (type == 'datatype') {
          let forms = document.querySelectorAll('.form-datatype')
          for (let i = 0; i < forms.length; i++) {
            let form = forms[i]
            if (!form.classList.contains('d-none')) {
              form.classList.add('d-none')
            }            
          }
        }

        if (label.classList.contains('active-label')) {
          label.classList.remove('active-label')
        } else {
          label.classList.add('active-label')
        }

        if (type == 'datatype') {
          document.querySelector(`.${radio.id}`).classList.remove('d-none')
          document.getElementById('selection-choice').classList.add('d-none')
        }

        if (type == 'species') {
          this.species = radio.getAttribute('value')
        }
      },
      show() {
        console.log(this.date)
      },
      addFood (type) {
        if (type == 'given') {
          this.historique.push({
            date: this.date,
            give: this.foodData.nbToGive + ' ' + (this.foodData.typeOfFoodGiven[0]).toUpperCase(),
            volunteer: this.volunteer
          })
          this.foodData.total += this.foodData.nbToGive
          this.foodData.nbToGive = 0
          
        } else if (type == 'restant') {
          this.foodData.restant += this.foodData.nbRestant
          this.foodData.nbRestant = 0
        }
      },
      addFoodToContainer (event, label, containerId) {
        const radio = event.currentTarget
        let labelRadio = document.querySelector(`label[for="${radio.id}"]`)
        let selectedLabel = document.querySelectorAll(`.${label}`)
        for (let i = 0; i < selectedLabel.length; i++) {
          selectedLabel[i].classList.remove(label)          
        }

        if (!labelRadio.classList.contains(label)) {
          labelRadio.classList.add(label)
        }

        let classDiv = ''
        let styleDiv =''
        if (containerId == 'container-donnes') {
          this.foodData.total++
          classDiv = "border-blue"
          styleDiv = 'background-color: #E3EDFF; color: #0A1D42; border-color: #7391CB; padding: 0.6rem 1.4rem; font-weight: 700; border-radius: 1.2rem; margin-left: 1.6rem; margin-bottom: 1.6rem;'
        } else if (containerId == 'container-restants') {
          this.foodData.restant++
          classDiv = "border-red"
          styleDiv = 'background-color: #FDF5EE; color: #DB3F33; border-color: #DB3F33; padding: 0.6rem 1.4rem; font-weight: 700; border-radius: 1.2rem; margin-left: 1.6rem; margin-bottom: 1.6rem;'
        }

        let container = document.getElementById(containerId)
        container.insertAdjacentHTML('beforeend', `
          <div class="${ classDiv }" style="${styleDiv}">
            ${radio.value}
            <span style="font-size: 2.4rem;" class="remove-element ${classDiv}" id="remove${this.idDiv}">x</span>
          </div>
        `)

        let food = document.getElementById(`remove${this.idDiv}`)
        food.addEventListener('click', () => {
          food.parentElement.remove()
          if (food.classList.contains('border-blue')) {
            this.foodData.total-- 
          } else if (food.classList.contains('border-red')) {
            this.foodData.restant--
          }
        })          

        this.idDiv++
      },
      reset () {
        document.getElementById('selection-choice').classList.remove('d-none')
        document.getElementById('food-form').classList.add('d-none')
      }
    },
  }
</script>

<style lang="scss" scoped>
  * > {
    color: #0A1D42;
  }
  h1 {
   font-size: 3.6rem;
   font-style: normal;
   font-weight: 900;
   margin-bottom: 3rem;
  }
  ul {
    list-style: none;
  }
  .label {
    font-size: 2.2rem;    
  }

  .label-choice {
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    border: 0.2rem #FFBCB7 solid;
    background-color: #FDF5EE;
    border-radius: 1.8rem;
    padding: 2.4rem 2rem;
    font-size: 2.2rem;
    font-weight: 700;
    img {
      margin-bottom: 1.6rem;
    }
  }

  .choice {
    margin-top: 9rem;
    .label {
      margin-bottom: 3.2rem;
    }
    
    .choice-list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      label {
        width: 25.7rem;
        margin-left: 1.6rem;
        margin-bottom: 1.6rem;
      }
    }
  }
  #date, #volunteer {
    height: 4.7rem;
    font-size: 1.8rem;
    font-family: 'circe';
    padding-left: 1rem;
    margin-left: 1rem;
    border-radius: 1.2rem;
    border-color: #0A1D42;
    &::placeholder {
      color: #7391CB;
    }
  }

  #food-form {
    font-size: 1.6rem;
  }

  .btn {
    font-size: 1.8rem;
    padding: 1.4rem;
    border: 0.2rem #0A1D42 solid;
    border-radius: 1.2rem;
  }

  h2 {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }

  .label-btn {
    margin-right: 1.6rem;
    &last-child {
      margin-right: 0rem;
    }
  }

  .count {
    font-size: 1.8rem;
    font-weight: 700;
    padding: 1rem 1.5rem;
    border-radius: 1.2rem;
    margin-left: 2.2rem;

    &.count-blue {
      background-color: #E3EDFF;
      color: #7391CB;
    }
    &.count-red {
      background-color: #FDF5EE;
      color: #DB3F33;
    }    
  }

  .btn-save {
    color: #458445;
    border: 0.2rem #458445 solid;
    padding: 2.2rem 2.8rem;
    background-color: #E0FFE0;
    border-radius: 1.8rem;
    font-size: 2.2rem;
  }

  .active-label-blue {
    background-color: #E3EDFF;
    color: #7391CB;
    border-color: #E3EDFF;
  }

  .border-blue {
    background-color: #E3EDFF;
    color: #7391CB;
    border-color: #7391CB;
  }

  .active-label-red {
    background-color: #FFBCB7;
    color: #DB3F33;
    border-color: #FFBCB7;
  }

  .border-red {
    background-color: #FFBCB7;
    color: #DB3F33;
    border-color: #DB3F33;
  }
</style>