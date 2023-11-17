import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    //数据，相当于data
    state: {
        keyWord: '',
        isShow: false,
        localStorageList: [],
        localStorageFavoriteList: [],
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
        // 设置收藏列表
        setLocalStorageFavoriteList(state, payload) {
            state.localStorageFavoriteList = payload;
        },
        removeLocalStorageFavoriteList(state, payload) {
            state.localStorageFavoriteList = JSON.parse(localStorage.favoriteList || `[]`);

            let c = {
                name: payload.name,
                id: payload.id,
            }

            if (state.localStorageFavoriteList == `[]`) {
                state.localStorageFavoriteList = [];
            }

            let arr = state.localStorageFavoriteList.filter(e => e.id != c.id);
            state.localStorageFavoriteList = arr;
            localStorage.favoriteList = JSON.stringify(state.localStorageFavoriteList);
        },
        pushLocalStorageFavoriteList(state, payload) {
            state.localStorageFavoriteList = JSON.parse(localStorage.favoriteList || `[]`);

            let c = {
                name: payload.name,
                id: payload.id,
            }

            if (state.localStorageFavoriteList == `[]`) {
                state.localStorageFavoriteList = [];
            }

            let i = state.localStorageFavoriteList.findIndex(e => e.id == c.id);
            if (i != -1) return;
            state.localStorageFavoriteList.push(c);
            localStorage.favoriteList = JSON.stringify(state.localStorageFavoriteList);
        }
    },
    // 操作异步操作mutation
    actions: {

    },
})