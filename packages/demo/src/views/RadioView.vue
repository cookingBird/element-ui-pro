<template>
  <div class="home">
    <div class="title">Normal Example</div>
    <el-radio-group-pro v-model="value" :options="options"></el-radio-group-pro>
    <el-radio-group-pro
      v-model="valueDefault"
      :options="options"
    ></el-radio-group-pro>
    <div class="title">Model-Key Example</div>
    <el-radio-group-pro
      :model="model"
      valueKey="like"
      :options="options"
    ></el-radio-group-pro>
    <el-radio-group-pro
      :model="model"
      valueKey="likeDefault"
      :options="options"
    ></el-radio-group-pro>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      valueDefault: "选项1",
      model: {
        like: "",
        likeDefault: "选项3",
      },
    };
  },
  computed: {},
  watch: {
    value(v) {
      console.log("watch value", v);
    },
  },
  methods: {
    handleClick(done, ev) {
      console.log("args", done, ev);
      setTimeout(done, 3000);
    },
    dataFetch() {
      const randomLength = Math.floor(Math.random() * 10) % 6;
      return Promise.resolve(this.options.slice(0, randomLength));
    },
    onValueUpdate(val) {
      console.log("onValueUpdate", val);
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  font-size: large;
  margin-bottom: 0.5em;
  text-align: start;
  margin-left: 0.5em;
  padding-bottom: 0.3rem;
  border-bottom: 3px solid #eee;
  margin-top: 1rem;
}
.title2 {
  font-size: medium;
  margin-bottom: 0.5em;
  text-align: start;
  margin-left: 2em;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #eee;
  margin-top: 1rem;
}
</style>
