import { Icon, Search, Tab, Tabs, Swipe, SwipeItem, Image as VanImage } from 'vant';

export default {
    install(Vue) {
        Vue.use(Icon);
        Vue.use(Search);
        Vue.use(Tab);
        Vue.use(Tabs);
        Vue.use(Swipe);
        Vue.use(SwipeItem);
        Vue.use(VanImage);
    }
}
