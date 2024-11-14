<template>
  <div class="home">
    <div class="title">V-Model Example</div>
    <el-input-pro v-model="value"></el-input-pro>
    <div class="title">Model-Key Example</div>
    <el-input-pro :model="model" valueKey="like"></el-input-pro>
    <div class="title">Slots Example</div>
    <div class="title2">Prefix Slot Example</div>
    <el-input-pro :model="model" valueKey="like">
      <i slot="prefix" class="el-icon-search"></i>
    </el-input-pro>
    <div class="title2">Suffix Slot Example</div>
    <el-input-pro :model="model" valueKey="like">
      <i slot="suffix" class="el-icon-date"></i>
    </el-input-pro>
    <div class="title2">Prepend Slot Example</div>
    <el-input-pro :model="model" valueKey="like">
      <template slot="prepend">Http://</template>
    </el-input-pro>
    <div class="title2">Append Slot Example</div>
    <el-input-pro :model="model" valueKey="like">
      <template slot="append">.com</template>
    </el-input-pro>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      value: 'hello world',
      model: {
        like: 'Hello World',
      },
    };
  },
  computed: {},
  methods: {
    handleClick(done, ev) {
      console.log('args', done, ev);
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
