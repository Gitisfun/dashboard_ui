import menuList from '../../logic/constants/menu'

const state = {
    currentMenuItem:  {
        id: 1,
        name: "Home",
        icon: "home",
        group: "Home",
        route: "/",
        isActive: false,
    },
    menu: menuList
}

const getters = {
    allMenuItems: (state) => state.menu,
    currentMenuItem: (state) => state.currentMenuItem
}

const actions = {
    async switchMenuItem({commit}, menuItem){        
        commit('setMenuItem', menuItem)
    }
}

const mutations = {
    setMenuItem: (state, menuItem) => (state.currentMenuItem = menuItem)
}

export default {
    state,
    getters,
    actions,
    mutations
}