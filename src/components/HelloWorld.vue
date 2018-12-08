<template>
  <div class="hello">
    <body>
      <!--<img src="./assets/logo.png">-->
      <div class = "main">
        <h1>팡석</h1><br/>
        <router-link to="/question">질문게시판</router-link><br/>
        <router-link to="/review">후기게시판</router-link><br/>
      </div>
    </body>
  </div>
</template>

<script>
/*export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}*/
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.main{
  float : right;
  width: 100%;
  padding-top: 50px;
  padding-left: 300px;
  box-sizing: border-box;
}
</style>
