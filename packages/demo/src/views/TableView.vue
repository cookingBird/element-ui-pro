<template>
  <div class="home">
    <div class="title">Normal Table Example</div>
    <el-table-pro :data="tableData" :columns="columns"></el-table-pro>
    <div class="title">Normal Slot Header Table Example</div>
    <el-table-pro :data="tableData" :columns="columns">
      <template #nameHeader> Name Header </template>
    </el-table-pro>
    <div class="title">Normal Slot Content Table Example</div>
    <el-table-pro :data="tableData" :columns="columns">
      <template #name="{ row }"> {{ '---' + row.name + '---' }} </template>
    </el-table-pro>
    <div class="title">Cascader Slot Header Table Example</div>
    <el-table-pro :data="tableData" :columns="columns">
      <template #tagHeader> Tag Header </template>
    </el-table-pro>
    <div class="title">Cascader Slot Content Table Example</div>
    <el-table-pro :data="tableData" :columns="columns">
      <template #tag="{ row }"> {{ '---' + row.tag + '---' }} </template>
    </el-table-pro>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
        },
      ],
    };
  },
  computed: {
    columns() {
      return [
        {
          prop: 'name',
          label: '姓名',
        },
        {
          prop: 'info',
          label: '信息',
          children: [
            {
              prop: 'address',
              label: '地址',
            },
            {
              prop: 'tag',
              label: '标签',
            },
          ],
        },
        {
          prop: 'date',
          label: '日期',
        },
      ];
    },
  },
  methods: {
    handleChange() {
      console.log('checkedCities', this.checkedCities);
    },
    handleUpdateValue() {
      console.log('handleUpdateValue', this.checkedCities2);
    },
    handleClick(done, ev) {
      console.log('args', done, ev);
      setTimeout(done, 3000);
    },
    dataFetch() {
      const randomLength = Math.floor(Math.random() * 10) % 6;
      return Promise.resolve(this.options.slice(0, randomLength));
    },
    stringfy(obj) {
      return JSON.stringify(obj);
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
