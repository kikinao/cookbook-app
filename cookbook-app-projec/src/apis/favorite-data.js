import axios from "axios";

export const getFavoriteData = async (curId) => {
    let { data } = await axios.get(`https://apis.netstart.cn/douguo/recipe/detail/${curId}`)

    return data.result;
}