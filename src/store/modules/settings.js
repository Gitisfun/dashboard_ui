const state = {
    isTableUpdateVisible: false
}

const getters = {
    getTableUpdatedByIsVisible: (state) => state.isTableUpdateVisible,
}

const actions = {
    async changeTableUpdatedByIsVisible({commit}, value){        
        commit('setTableUpdatedByIsVisible', value)
    }
}

const mutations = {
    setTableUpdatedByIsVisible: (state, value) => (state.isTableUpdateVisible = value)
}

export default {
    state,
    getters,
    actions,
    mutations
}