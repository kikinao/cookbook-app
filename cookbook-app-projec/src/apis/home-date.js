import axios from "axios";

export const getRecommendData = async () => {
    let { data } = await axios.get('https://apis.netstart.cn/douguo/home/recommended/0/10');

    return data.result;
}

export const getVideoData = async () => {
    let { data } = await axios.get(`https://apis.netstart.cn/douguo/home/videos/0/20`);

    return data.result;
}

export const getNoteData = async () => {
    let { data } = await axios.get(`https://apis.netstart.cn/douguo/home/notes/0/20`);

    return data.result;
}

export const getAttentionData = async () => {
    let { data } = await axios.get(`https://apis.netstart.cn/douguo/home/ffeeds/0/20`);

    return data;
}