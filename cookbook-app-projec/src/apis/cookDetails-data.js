import axios from "axios";

export const getCookDetailsData = async (curId) => {
    let { data } = await axios.get(`https://apis.netstart.cn/douguo/recipe/detail/${curId}`);

    return data.result;
}

export const getFlatcomments = async (curId) => {
    let { data } = await axios.get(`https://apis.netstart.cn/douguo/recipe/flatcomments/${curId}/0/20`)

    return data.result;
}