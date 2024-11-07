<template>
  <div class="home">
    <el-button-pro>Button Loading</el-button-pro>
    <el-button-pro @click="handleClick">Button, 3s close Loading</el-button-pro>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  methods: {
    handleClick(done, ev) {
      console.log("args", done, ev);
      setTimeout(done, 3000);
    },
  },
};
</script>
