import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    //数据，相当于data
    state: {
        keyWord: '',
    },
    //里面定义方法，操作state方发
    mutations: {
        setKeyWord(state, value) {
            state.keyWord = value;
        }
    },
    // 操作异步操作mutation
    actions: {

    },
})