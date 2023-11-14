import axios from "axios";

export const getHotResult = async () => {
    let { data } = await axios.get('https://apis.netstart.cn/douguo/recipe/search/hot');

    return data.result.suggests;
};

export const getSearchKeyword = async (kw) => {
    let { data } = await axios.get(`https://apis.netstart.cn/douguo/recipe/search/suggests?kw=${kw}`)

    return data.result;
}

export const getSearchResult = async (kw, order = 0) => {
    let { data } = await axios.get(`https://apis.netstart.cn/douguo/recipe/search?keyword=${kw}&order=${order}&type=0&offset=0&limit=20`)


    return data.result;
}