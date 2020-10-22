<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col sm=12>
          <b-button variant="primary" v-b-modal.modal-crear-usuario>
            Añadir usuario
          </b-button>
          <b-modal id="modal-crear-usuario" title="Crear usuario">
            <b-row>
              <b-col sm=12 md=3 class="text-md-right">
                <label for="input-nombre">Nombre</label>
              </b-col>
              <b-col sm=12 md=9>
                <b-form-input 
                  id="input-nombre" 
                  v-model="nuevoUsuario.nombre" 
                  placeholder="Nombre"
                >
                </b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm=12 md=3 class="text-md-right">
                <label for="input-edad">Edad</label>
              </b-col>
              <b-col sm=12 md=9>
                <b-form-input 
                  id="input-edad" 
                  v-model="nuevoUsuario.edad"
                  placeholder="Edad"
                  type="number"
                  min=1
                  max=99
                >
                </b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm=12 md=3 class="text-md-right">
                <label for="input-genero">Género</label>
              </b-col>
              <b-col sm=12 md=9>
                <b-form-input id="input-genero" v-model="nuevoUsuario.genero" placeholder="Género">
                </b-form-input>
              </b-col>
            </b-row>
            <template #modal-footer>
              <b-col sm=12 class="text-right">
                <b-button
                  variant="danger"
                  @click="$bvModal.hide('modal-crear-usuario')"
                >
                  Cancelar
                </b-button>
                <b-button
                  variant="primary"
                  :disabled='!nuevoUsuarioEsValido'
                  @click="agregarNuevoUsuario"
                >
                  Añadir
                </b-button>
              </b-col>
            </template>
          </b-modal>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm=12 md=3 class="text-md-right">
          <label for="buscar-usuario">Buscar usuario</label>
        </b-col>
        <b-col sm=12 md=9>
          <b-form-input id="buscar-usuario" v-model="consulta" placeholder="Nombre">
          </b-form-input>
        </b-col>
      </b-row>
      <b-form-group>
        <b-form-checkbox
          id="checkbox-marcar-todos"
          name="checkbox-marcar-todos"
          v-model="estanTodosMarcados"
          :indeterminate="estadoIndeterminado"
          @change="alternarSeleccionarTodos"
        >{{estanTodosMarcados ? 'Desmarcar todos' : 'Marcar todos'}}</b-form-checkbox>
      </b-form-group>
      <b-row>
        <b-col sm=12>
          <b-table 
            striped
            ref="tablaUsuarios"
            selectable
            selected-variant="primary"
            select-mode="multi"
            :fields="campos"
            :items="usuarios"
            :filter="consulta"
            :filter-included-fields="camposBusqueda"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            responsive="sm"
            @row-selected="actualizarUsuariosPorEliminar"
          >
          <!-- @filtered="onFiltered" -->
            <template v-slot:cell(seleccionado)="{ rowSelected }">
              <template v-if="rowSelected">
                <span aria-hidden="true">&check;</span>
                <span class="sr-only">Seleccionado</span>
              </template>
              <template v-else>
                <span aria-hidden="true">&nbsp;</span>
                <span class="sr-only">No seleccionado</span>
              </template>
            </template>
          </b-table>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm=12 md=3 class="text-md-right">
          Eliminar usuarios marcados
        </b-col>
        <b-col sm=12 md=9>
          <b-button 
            id="eliminar-usuarios" 
            variant="danger" 
            @click="eliminarUsuariosMarcados"
            :disabled="true && !estanTodosMarcados"
            >
            Eliminar
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data(){
    return {
      nuevoUsuario: {
        id: '',            
        nombre: "",
        edad: 0,
        genero: ""
      },
      estadoIndeterminado: false,
      estanTodosMarcados:false,
      consulta: "",
      camposBusqueda: ["nombre"],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      campos: [
        { key: 'seleccionado', label: 'Marcar', sortable: true, sortDirection: 'desc' },
        { key: 'nombre', label: 'Nombre', sortable: true, sortDirection: 'desc' },
        { key: 'edad', label: 'Edad', sortable: true, class: 'text-center' },
        { key: 'genero', label: 'Género', sortable: true},
      ],
    }
  },
  methods: {
    ...mapActions(['ponerNuevoUsuario', 'ponerEnListaParaEliminar']),
    alternarSeleccionarTodos(checked) {
      // console.log(checked);
      if (checked) this.$refs.tablaUsuarios.selectAllRows();
      else this.$refs.tablaUsuarios.clearSelected();
    },
    agregarNuevoUsuario(){
      if(this.nuevoUsuarioEsValido){
        this.ponerNuevoUsuario(this.nuevoUsuario)
        this.nuevoUsuario = {
          id: '',            
          nombre: "",
          edad: 0,
          genero: ""
        };
        this.$bvModal.hide('modal-crear-usuario')
      }
    },
    actualizarUsuariosPorEliminar(usuariosAEliminar){
       if (usuariosAEliminar.length == 0) {
        this.estadoIndeterminado = false;
        this.estanTodosMarcados = false;
      } else if (
        usuariosAEliminar.length == this.usuarios.length
      ) {
        this.estadoIndeterminado = false;
        this.estanTodosMarcados = true;
      } else {
        this.estadoIndeterminado = true;
        this.estanTodosMarcados = false;
      }
      this.ponerEnListaPorEliminar(usuariosAEliminar);
    },
  },
  computed: {
    ...mapGetters(['usuarios']),
    usuariosFiltrados(){
      return this.usuarios
    },
    nuevoUsuarioEsValido(){
      return this.nuevoUsuario && 
        this.nuevoUsuario.nombre.length > 0 &&
        this.nuevoUsuario.edad > 0 &&
        this.nuevoUsuario.edad < 100 &&
        this.nuevoUsuario.genero.length > 0;
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
