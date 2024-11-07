<template>
  <div class="home">
    <div class="title">Normal Example</div>
    <el-select-pro v-model="value" :options="options"></el-select-pro>
    <el-select-pro v-model="valueDefault" :options="options"></el-select-pro>
    <div class="title">Model-Key Example</div>
    <el-select-pro
      :model="model"
      valueKey="like"
      :options="options"
    ></el-select-pro>
    <el-select-pro
      :model="model"
      valueKey="likeDefault"
      :options="options"
    ></el-select-pro>
    <div class="title">Slot Example</div>
    <div class="title2">Prefix Slot Example</div>
    <el-select-pro v-model="value" :options="options">
      <template #prefix>
        <i class="el-icon-edit" />
      </template>
    </el-select-pro>
    <div class="title2">Empty Slot Example</div>
    <el-select-pro v-model="value">
      <template #empty> 暂无数据 </template>
    </el-select-pro>
    <div class="title">Fetch Example</div>
    <el-select-pro v-model="value" :fetch="dataFetch"></el-select-pro>
    <div class="title">Effect Fetch Example</div>
    <el-input-pro
      :model="model"
      valueKey="like"
      style="width: 220px"
    ></el-input-pro>
    <el-select-pro
      :model="model"
      valueKey="likeDefault"
      effectKey="like"
      :fetch="dataFetch"
    ></el-select-pro>
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
  methods: {
    handleClick(done, ev) {
      console.log("args", done, ev);
      setTimeout(done, 3000);
    },
    dataFetch() {
      const randomLength = Math.floor(Math.random() * 10) % 6;
      return Promise.resolve(this.options.slice(0, randomLength));
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
