import axios from "axios";

export const getCookDetailsData = async (curId) => {
    let { data } = await axios.get(`https://apic.netstart.cn/douguo/recipe/detail/${curId}`);

    return data.result;
}