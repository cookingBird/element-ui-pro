<template>
  <div class="home">
    <div class="title">V-Model Label Example</div>
    <el-checkbox-pro v-model="value" label="Foo"></el-checkbox-pro>
    <div class="title">Model-Key Slot Example</div>
    <el-checkbox-pro :model="model" valueKey="value"> Bar </el-checkbox-pro>
    <div class="title">Group Example</div>
    <div class="title2">Normal Example</div>
    <el-checkbox-group-pro v-model="checkedCities" :min="1" :options="cities">
    </el-checkbox-group-pro>
    <div>
      {{ stringfy(checkedCities) }}
    </div>
    <div class="title2">Key Example</div>
    <el-checkbox-group-pro v-model="checkedCities2" :selectKey="true" :options="cities2">
    </el-checkbox-group-pro>
    <div>
      {{ stringfy(checkedCities2) }}
    </div>
    <div class="title2">Obj Example</div>
    <el-checkbox-group-pro v-model="checkedCities3" :selectObj="true" :options="cities2">
    </el-checkbox-group-pro>
    <div>
      {{ stringfy(checkedCities3) }}
    </div>
    <div class="title2">Group Button Example</div>
    <el-checkbox-group-pro v-model="checkedCities3" :selectObj="true" :options="cities3">
    </el-checkbox-group-pro>
    <div class="title2">Group Button Split Example</div>
    <el-checkbox-group-pro
      v-model="checkedCities3"
      :selectObj="true"
      :split="true"
      :options="cities3"
    >
    </el-checkbox-group-pro>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      value: false,
      model: {
        value: true,
      },
      checkedCities: ['上海', '北京'],
      cities: ['上海', '北京', '广州', '深圳'],
      checkedCities2: [1, 2],
      cities2: [
        { label: '上海', id: 1 },
        { label: '北京', id: 2 },
        { label: '广州', id: 3 },
        { label: '深圳', id: 4 },
      ],
      cities3: [
        { label: '上海', id: 1, type: 'button' },
        { label: '北京', id: 2, type: 'button' },
        { label: '广州', id: 3, type: 'button' },
        { label: '深圳', id: 4, type: 'button' },
      ],
      checkedCities3: [
        { label: '上海', id: 1 },
        { label: '北京', id: 2 },
      ],
    };
  },
  computed: {},
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
