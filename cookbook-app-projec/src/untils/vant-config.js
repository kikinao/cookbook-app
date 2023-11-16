import { Icon, Search, Tab, Tabs, Swipe, SwipeItem, Image as VanImage, NavBar, NoticeBar, Checkbox, CheckboxGroup, List, PullRefresh, Calendar, Uploader } from 'vant';

export default {
    install(Vue) {
        Vue.use(Icon);
        Vue.use(Search);
        Vue.use(Tab);
        Vue.use(Tabs);
        Vue.use(Swipe);
        Vue.use(SwipeItem);
        Vue.use(VanImage);
        Vue.use(NavBar);
        Vue.use(NoticeBar);
        Vue.use(Checkbox);
        Vue.use(CheckboxGroup);
        Vue.use(List);
        Vue.use(PullRefresh);
        Vue.use(Calendar);
        Vue.use(Uploader);
    }
}
