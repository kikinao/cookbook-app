import axios from "axios";

export const getHotResult = async () => {
    let { data } = await axios.get('https://apis.netstart.cn/douguo/recipe/search/hot');

    return data.result.suggests;
};

export const getSearchKeyword = async (kw) => {
    let { data } = await axios.get(`https://apis.netstart.cn/douguo/recipe/search/suggests?kw=${kw}`)

    return data.result;
}