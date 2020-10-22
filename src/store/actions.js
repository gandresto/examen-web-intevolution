import { uuidv4 } from './../helpers';

export default {
    ponerNuevoUsuario({commit}, usuario){
        usuario.id = uuidv4();
        commit('colocarNuevoUsuario', usuario);
    },
    ponerListaAEliminar({commit}, lista){
        commit('colocarListaAEliminar', lista)
    }
}