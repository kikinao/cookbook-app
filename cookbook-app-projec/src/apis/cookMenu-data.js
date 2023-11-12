import axios from "axios";

export const getMenuData = async () => {
    let { data } = await axios.get(`https://apic.netstart.cn/douguo/recipe/flatcatalogs`);

    return data.result;
}