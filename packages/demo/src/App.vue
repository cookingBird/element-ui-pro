<template>
  <div id="app">
    <nav>
      <router-link to="/"> Home </router-link> |
      <router-link to="/about"> About </router-link> |
      <router-link to="/button"> Button </router-link> |
      <router-link to="/select"> Select </router-link> |
      <router-link to="/input"> Input </router-link> |
      <router-link to="/radio"> Radio </router-link> |
      <router-link to="/checkbox"> Checkbox </router-link> |
      <router-link to="/form"> Form </router-link> |
      <router-link to="/table"> Table </router-link> |
      <router-link to="/table-slot"> TableSlot </router-link> |
      <router-link to="/datePicker"> DatePicker </router-link> |
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
