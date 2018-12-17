<template>
  <div class="hello">
    <body>
      <div class = "main">
        <p><img src="./car.png" width="150px" height="150px" ><p/>
        <br>
        <h3 style='color : red' v-show="isLogged">{{this.ID}}</h3>
        <br>
        <h3 v-show="isLogged">안녕하세요~</h3>

      </div>
    </body>
  </div>
</template>


<script>
  export default {
    name: "hello",
    data() {
      return {
        Log: this.$store.getters.isLogged,
        ID: this.$store.getters.getId
      }
    },
    mounted: function() {
      this.msg = ''
      console.log('질문게시판')
      this.getData()
    },
    computed: {
      isLogged () {
        console.log(this.$store.getters.isLogged)
        this.Log = this.$store.getters.isLogged
        return this.$store.getters.isLogged
      },
      getID () {
        this.ID = this.$store.getters.getId
        return this.$store.getters.getId
      }
  }
}
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
  padding-top: 100px;
  margin-left: auto;
  margin-right: auto;
  text-align : center;
}
</style>
