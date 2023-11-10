<template>
  <div class="home">
    <van-search v-model="value" show-action placeholder="腌萝卜">
      <template #action>
        <van-icon
          name="list-switch"
          size="24px"
          :style="[{ textAlign: 'center' }]"
        />
      </template>
    </van-search>
    我是首页
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      value: "",
    };
  },
  components: {},
};
</script>
