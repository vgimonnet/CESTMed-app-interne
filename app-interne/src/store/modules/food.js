export default {
  state: {
      foodAdded: null,
      foodList: null,
      foodListError: null,
      singleFood: null,
      foodUpdated: null,
      foodDeleted: null,
      randomFoodList: null,
      nbFoods: null,
      searchFoodsError: null,
      foodError: null
  },
  getters: {},
  mutations: {
      FOODADDED(state, payload){state.foodAdded = payload.data},
      FOODLIST(state, payload){state.foodList = payload.data},
      FOODLISTERROR(state, payload){state.foodListError = payload.data},
      SINGLEFOOD(state, payload){state.singleFood = payload.data},
      FOODUPDATED(state, payload){state.foodUpdated = payload.data},
      FOODDELETED(state, payload){state.foodDeleted = payload.data},
      RANDOMFOODLIST(state, payload){state.randomFoodList = payload.data},
      NBFOODS(state, payload){state.nbFoods = payload.data},
      SEARCHFOODSERROR(state, payload){state.searchFoodsError = payload.data},
      FOODERROR(state, payload){state.foodError = payload.data}
  },
  actions: {
    getFoods(context) {
      fetch('http://localhost:11666/v1/food', {
        method: 'GET'
      })
      .then(response => {
        
        return !response.ok
        ? console.log(response)
        : response.json(response)
      })
      .then(apiResponse => {
        if (apiResponse.err) {
          context.commit('FOODLISTERROR', { data: apiResponse.err })

          return true;
        }
        // Commit changes
        context.commit('FOODLIST', {data: apiResponse.data})
      })
      .catch(error => console.log(error))
    },
    getOneFood(context, id) {
      fetch(`http://localhost:11666/v1/food/${id}`, {
        method: 'GET',
        credentials: 'include'
      })
      .then(response => {
        return !response.ok
        ? console.log(response)
        : response.json(response)
      })
      .then(apiResponse => {
        if (apiResponse.err) {
          context.commit('FOODERROR', { data: apiResponse.err })

          return true;
        }
        // Commit changes
        context.commit('SINGLEFOOD', {data: apiResponse.data})
      })
      .catch(error => console.log(error))
    },
    addFood(context, data) {
      fetch('http://localhost:11666/v1/food', {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          desc: data.desc,
          abv: data.abv,
          ibu: data.ibu,
          ebc: data.ebc,
          appearance: data.appearance,
          taste: data.taste,
          country: data.country,
          releaseDate: data.releaseDate,
          style: data.style,
          brewery: data.brewery,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      .then(response => {
        return !response.ok
        ? console.log(response)
        : response.json(response)
      })
      .then(apiResponse => {
        if (apiResponse.err) {
          context.commit('FOODLISTERROR', { data: apiResponse.err })

          return true;
        }
        // Commit changes
        context.commit('FOODADDED', {data: true})
      })
      .catch(error => console.log(error))
    },
    updateFood(context, data) {
      fetch(`http://localhost:11666/v1/food/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: data.food.name,
          desc: data.food.desc,
          abv: data.food.abv,
          ibu: data.food.ibu,
          ebc: data.food.ebc,
          appearance: data.food.appearance,
          taste: data.food.taste,
          country: data.food.country,
          releaseDate: data.food.releaseDate,
          style: data.food.style,
          brewery: data.food.brewery,
            
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      .then(response => {
        return !response.ok
        ? console.log(response)
        : response.json(response)
      })
      .then(apiResponse => {
        if (apiResponse.err) {
          context.commit('FOODLISTERROR', { data: apiResponse.err })

          return true;
        }
        // Commit changes
        context.commit('FOODUPDATED', {data: true})
      })
      .catch(error => console.log(error))
    },
    deleteFood(context, id) {
      fetch(`http://localhost:11666/v1/food/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      .then(response => {
        return !response.ok
        ? console.log(response)
        : response.json(response)
      })
      .then(apiResponse => {
        if (apiResponse.err) {
          context.commit('FOODLISTERROR', { data: apiResponse.err })

          return true;
        }
        // Commit changes
        context.commit('FOODDELETED', {data: true})
      })
      .catch(error => console.log(error))
    },
    getRandomFoods(context, limit){
      fetch(`http://localhost:11666/v1/food/random/${limit}`, {
        method: 'GET'
      })
      .then(response => {
          
        return !response.ok
        ? console.log(response)
        : response.json(response)
      })
      .then(apiResponse => {
        if (apiResponse.err) {
          context.commit('FOODLISTERROR', { data: apiResponse.err })

          return true;
        }
        // Commit changes
        context.commit('RANDOMFOODLIST', {data: apiResponse.data})
      })
      .catch(error => console.log(error))
    },
    searchFoods(context, params) {
      fetch(`http://localhost:11666/v1/search/foods/${params.limit}/${params.page}/${params.name}/${params.style}/${params.country}`, {
        method: 'GET'
      })
      .then(response => {
          
        return !response.ok
        ? console.log(response)
        : response.json(response)
      })
      .then(apiResponse => {
        if (apiResponse.err) {
          context.commit('SEARCHFOODSERROR', { data: apiResponse.err })

          return true;
        }
        // Commit changes
        context.commit('FOODLIST', { data: apiResponse.data.foods })
        context.commit('NBFOODS', { data: apiResponse.data.nbFoods })
      })
      .catch(error => console.log(error))
    },
  }
}