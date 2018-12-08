<template>
  <div id="app">
    <navigation></navigation>
    <app-nav></app-nav>  <!--네비게이션의 템플릿(nav)가 들어온다.-->
    <router-view></router-view>
    <app-header class = "header">
        <div class="navigate_header">
          <button type="button" class="btn btn-sm" style="float: right;" >
            <router-link to="/login">로그인</router-link>
          </button>
        </div>
    </app-header>

    <div class="footer">
      연락처 : 010-8763-8915<br/>
      Made by 권정훈, 박광석 최유진<br/>
    </div>
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
.header{
  position : fixed;
  left : 0;
  top : 0;
  width: 100%;
  background-color: white;
  color: balck;
  text-align: center;
  border-bottom-style: solid;
  border-bottom-color: prime;
  border-bottom-width: 1px;
  margin-bottom: 50px;
  padding : 3px;
  margin-top: 3px;
}
.footer {
  position : fixed;
  left : 0;
  bottom : 0;
  width : 100%;
  background-color: #2c3e50;
  color : white;
  text-align: center;
  margin-top: 30px;
}
</style>
