<template>
  <div class="home">
    <div class="title">Inline Form Example</div>
    <el-form-pro :model="model" :columns="columns" :inline="true"></el-form-pro>
    <div class="title">Normal Form Example</div>
    <el-form-pro :model="model" :options="options"></el-form-pro>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      model: {},
    };
  },
  computed: {
    columns() {
      return [
        {
          prop: 'name',
          formItemProps: {
            label: '姓名',
          },
          slotIs: 'input',
          slotProps: {},
        },
        {
          prop: 'age',
          formItemProps: {
            label: '年龄',
          },
          slotIs: 'input',
          slotProps: {},
        },
        {
          prop: 'sex',
          formItemProps: {
            label: '性别',
          },
          slotIs: 'select',
          slotProps: {
            options: [
              {
                label: '男',
                value: 1,
              },
              {
                label: '女',
                value: 0,
              },
            ],
          },
        },
      ];
    },
    options() {
      return {
        labelWidth: '120px',
        row: {},
        columns: [
          {
            col: {
              span: 12,
            },
            prop: 'name',
            formItemProps: {
              label: '姓名',
            },
            slotIs: 'input',
            slotProps: {},
          },
          {
            col: {
              span: 12,
            },
            prop: 'age',
            formItemProps: {
              label: '年龄',
            },
            slotIs: 'input',
            slotProps: {},
          },
          {
            col: {
              span: 12,
            },
            prop: 'sex',
            formItemProps: {
              label: '性别',
            },
            wrapperProps: {
              class: 'w-full',
            },
            slotIs: 'select',
            slotProps: {
              options: [
                {
                  label: '男',
                  value: 1,
                },
                {
                  label: '女',
                  value: 0,
                },
              ],
            },
          },
        ],
      };
    },
  },
  watch: {},
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
