<template>
  <div class="loading">
    <van-loading
      size="60px"
      type="spinner"
      color="#ffc533"
      text-color="#efc035"
      text-size="16"
      vertical
      >{{ randomText }}</van-loading
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      textArr: [
        "入厨先洗手，上灶莫多言。",
        "一生对锅勺,一心烹佳肴。",
        "没有做不好的菜，只有没有做好的菜。",
        "烹饪,是一半烟火,一半清欢。",
        "裁缝造人,厨师做菜。",
      ],
    };
  },
  computed: {
    randomText() {
      return this.textArr[parseInt(Math.random() * 4)];
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  text-align: center;
  margin: 40vh auto;
  z-index: 351;
}
</style>