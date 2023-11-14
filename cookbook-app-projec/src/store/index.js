import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    //数据，相当于data
    state: {
        keyWord: '',
        isShow: false,
        localStorageList: [],
    },
    //里面定义方法，操作state方发
    mutations: {
        setKeyWord(state, value) {
            state.keyWord = value;
        },
        setIsShow(state, payload) {
            state.isShow = payload;
        },
        setLocalStorageList(state, payload) {
            state.localStorageList = payload;
        },
        pushLocalStorageList(state, payload) {
            let n = {
                name: payload.name,
            };

            // 手动修改localStorageList为[]
            if (state.localStorageList == `[]`) {
                state.localStorageList = [];
            }

            // 查找是否搜索过该内容
            let i = state.localStorageList.findIndex((e) => e.name == n.name);
            if (i != -1) return;
            state.localStorageList.push(n);
            localStorage.historyList = JSON.stringify(state.localStorageList);
        },
    },
    // 操作异步操作mutation
    actions: {

    },
})