<template>
  <div class="home">
    <div class="title">Button Example</div>
    <el-button-pro>Button Loading</el-button-pro>
    <el-button-pro @click="handleClick">Button, 3s close Loading</el-button-pro>
    <div class="title">Button Group Example</div>
    <el-button-group-pro :buttons="buttons">
      <template v-slot:SlotButton>
        <i class="el-icon-s-custom"></i>
        SlotButton
      </template>
    </el-button-group-pro>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {};
  },
  computed: {
    buttons() {
      return [
        {
          label: "Disabled Button",
          disabled: true,
          round: true,
        },
        {
          label: "Round Button",
          round: true,
          icon: "el-icon-edit",
        },
        {
          label: "SlotButton",
          type: "success",
          round: true,
        },
      ];
    },
  },
  methods: {
    handleClick(done, ev) {
      console.log("args", done, ev);
      setTimeout(done, 3000);
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
</style>
