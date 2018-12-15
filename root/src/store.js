/*import Vue from 'vue'
import Vues from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        isLogged: false,
        id: '',
        password: ''
    },
    getters:{
        isLogged: function(state){
          return state.isLogged
        }
    },
    mutations: {
      login: function(state, payload){
            state.isLogged = true
            state.id = payload.id
            state.password = payload.password
        },
        logOut: function(state, payload){
            state.isLogged = false
            state.id = ''
            state.password = ''
        }
    }
});
*/
