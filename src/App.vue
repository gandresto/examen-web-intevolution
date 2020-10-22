<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col sm=12>
          <b-button variant="success">
            Añadir usuario
          </b-button>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm=12 md=3>
          <label for="buscar-usuario">Buscar usuario</label>
        </b-col>
        <b-col sm=12 md=9>
          <b-form-input id="buscar-usuario" v-model="text" placeholder="Nombre">
          </b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm=12>
          <b-table striped :items="usuarios"></b-table>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm=12 md=3>
          Eliminar usuarios marcados
        </b-col>
        <b-col sm=12 md=9>
          <b-button id="eliminar-usuarios" variant="danger">
            Eliminar
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data(){
    return {
      usuarios: [
        {
          nombre: "Andrés",
          edad: 26,
          genero: "Hombre"
        },
        {
          nombre: "Itzel",
          edad: 23,
          genero: "Mujer"
        },
      ]
    }
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
  .row{
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
  }
</style>
