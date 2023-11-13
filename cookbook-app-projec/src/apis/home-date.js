import axios from "axios";

export const getRecommendData = async () => {
    let { data } = await axios.get('https://apis.netstart.cn/douguo/home/recommended/0/10');

    return data.result;
}