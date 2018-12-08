<template>
  <div class="hello">
    <body>
      <p><img src="./car.png" width="50px" height="50px" ><p/>
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
img{
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.main{
  width: 100%;
  padding-top: 50px;
  margin-left: auto;
  margin-right: auto;
  text-align : center;
}
</style>
