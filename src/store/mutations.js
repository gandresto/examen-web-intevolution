export default {
    colocarNuevoUsuario(state, usuario){
        state.usuarios.push(usuario);
    },
    eliminarUsuario(state, id){
        state.usuarios = state.usuarios.filter(
            usuario => usuario.id != id
        );
    },
    colocarListaAEliminar(state, lista){
        state.listaAEliminar = lista;
    }
}