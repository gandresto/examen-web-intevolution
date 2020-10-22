export default {
    colocarNuevoUsuario(state, usuario){
        state.usuarios.push(usuario);
    },
    removerSeleccionados(state){
        state.usuarios = state.usuarios.filter(
            usuario => !state.listaAEliminar.includes(usuario)
        );
    },
    colocarListaAEliminar(state, lista){
        state.listaAEliminar = lista;
    }
}