export default {
  state: {
      turtleAdded: null,
      turtleList: null,
      turtleListError: null,
      singleTurtle: null,
      turtleUpdated: null,
      turtleDeleted: null,
      randomTurtleList: null,
      nbTurtles: null,
      searchTurtlesError: null,
      turtleError: null
  },
  getters: {},
  mutations: {
      TURTLEADDED(state, payload){state.turtleAdded = payload.data},
      TURTLELIST(state, payload){state.turtleList = payload.data},
      TURTLELISTERROR(state, payload){state.turtleListError = payload.data},
      SINGLETURTLE(state, payload){state.singleTurtle = payload.data},
      TURTLEUPDATED(state, payload){state.turtleUpdated = payload.data},
      TURTLEDELETED(state, payload){state.turtleDeleted = payload.data},
      RANDOMTURTLELIST(state, payload){state.randomTurtleList = payload.data},
      NBTURTLES(state, payload){state.nbTurtles = payload.data},
      SEARCHTURTLESERROR(state, payload){state.searchTurtlesError = payload.data},
      TURTLEERROR(state, payload){state.turtleError = payload.data}
  },
  actions: {
    getTurtles(context) {
      fetch('http://localhost:11666/v1/turtle', {
        method: 'GET'
      })
      .then(response => {
        
        return !response.ok
        ? console.log(response)
        : response.json(response)
      })
      .then(apiResponse => {
        if (apiResponse.err) {
          context.commit('TURTLELISTERROR', { data: apiResponse.err })

          return true;
        }
        // Commit changes
        context.commit('TURTLELIST', {data: apiResponse.data})
      })
      .catch(error => console.log(error))
    },
    getOneTurtle(context, id) {
      fetch(`http://localhost:11666/v1/turtle/${id}`, {
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
          context.commit('TURTLEERROR', { data: apiResponse.err })

          return true;
        }
        // Commit changes
        context.commit('SINGLETURTLE', {data: apiResponse.data})
      })
      .catch(error => console.log(error))
    },
    addTurtle(context, data) {
      fetch('http://localhost:11666/v1/turtle', {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          species: data.species,
          health: data.health,
          size: data.size,
          width: data.width,
          height: data.height,
          weight: data.weight,
          otherMesure: data.otherMesure,
          old: data.old,
          comment: data.comment,
          entryCause: data.entryCause,
          gender: data.gender,
          injuriesData: data.injuries,
          picturesData: data.pictures,
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
          context.commit('TURTLEERROR', { data: apiResponse.err })

          return true;
        }
        // Commit changes
        context.commit('TURTLEADDED', {data: true})
      })
      .catch(error => console.log(error))
    },
    updateTurtle(context, data) {
      fetch(`http://localhost:11666/v1/turtle/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: data.turtle.name,
          species: data.turtle.species,
          health: data.turtle.health,
          size: data.turtle.size,
          width: data.turtle.width,
          height: data.turtle.height,
          weight: data.turtle.weight,
          otherMesure: data.turtle.otherMesure,
          old: data.turtle.old,
          comment: data.turtle.comment,
          entryCause: data.turtle.entryCause,
          gender: data.turtle.gender,
          injuries: data.turtle.injuries,
          pictures: data.turtle.pictures
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
          context.commit('TURTLELISTERROR', { data: apiResponse.err })

          return true;
        }
        // Commit changes
        // context.commit('TURTLEUPDATED', {data: true})
      })
      .catch(error => console.log(error))
    },
    deleteTurtle(context, id) {
      fetch(`http://localhost:11666/v1/turtle/${id}`, {
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
          context.commit('TURTLELISTERROR', { data: apiResponse.err })

          return true;
        }
        // Commit changes
        context.commit('TURTLEDELETED', {data: true})
      })
      .catch(error => console.log(error))
    },
    getRandomTurtles(context, limit){
      fetch(`http://localhost:11666/v1/turtle/random/${limit}`, {
        method: 'GET'
      })
      .then(response => {
          
        return !response.ok
        ? console.log(response)
        : response.json(response)
      })
      .then(apiResponse => {
        if (apiResponse.err) {
          context.commit('TURTLELISTERROR', { data: apiResponse.err })

          return true;
        }
        // Commit changes
        context.commit('RANDOMTURTLELIST', {data: apiResponse.data})
      })
      .catch(error => console.log(error))
    },
    searchTurtles(context, params) {
      fetch(`http://localhost:11666/v1/search/turtles/${params.limit}/${params.page}/${params.name}/${params.style}/${params.country}`, {
        method: 'GET'
      })
      .then(response => {
          
        return !response.ok
        ? console.log(response)
        : response.json(response)
      })
      .then(apiResponse => {
        if (apiResponse.err) {
          context.commit('SEARCHTURTLESERROR', { data: apiResponse.err })

          return true;
        }
        // Commit changes
        context.commit('TURTLELIST', { data: apiResponse.data.turtles })
        context.commit('NBTURTLES', { data: apiResponse.data.nbTurtles })
      })
      .catch(error => console.log(error))
    },
  }
}