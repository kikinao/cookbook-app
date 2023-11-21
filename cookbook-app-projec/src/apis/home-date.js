import axios from "axios";

export const getRecommendData = async (type = 0) => {
    let { data } = await axios.get(`https://apic.netstart.cn/douguo/home/recommended/${type}/10`);

    return data.result;
}

export const getVideoData = async (type = 0) => {
    let { data } = await axios.get(`https://apic.netstart.cn/douguo/home/videos/${type}/20`);

    return data.result;
}

export const getNoteData = async (type = 0) => {
    let { data } = await axios.get(`https://apic.netstart.cn/douguo/home/notes/${type}/20`);

    return data.result;
}

export const getAttentionData = async (type = 0) => {
    let { data } = await axios.get(`https://apic.netstart.cn/douguo/home/ffeeds/${type}/20`);

    return data.result;
}

export const getActivityData = async () => {
    let { data } = await axios.get(`https://apic.netstart.cn/douguo/home/events/getlists?offset=0limit=20`);

    return data.data;
}