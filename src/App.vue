<template>
  <div id="app">
    <img src="./assets/logo.png">
    <navigation></navigation>
    <app-nav></app-nav>  <!--네비게이션의 템플릿(nav)가 들어온다.-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
