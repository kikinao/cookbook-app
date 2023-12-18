import axios from "axios";

export const getMenuData = async () => {
    let { data } = await axios.get(`https://apis.netstart.cn/douguo/recipe/flatcatalogs`);

    return data.result;
}