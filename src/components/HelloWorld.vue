<template>
  <div class="hello">
    <body>
      <div class = "main">
        <p><img src="./car.png" width="150px" height="150px" ><p/>
        <br>
        <h3 style='color : red' v-show="isLogged">{{this.ID}}</h3>
        <br>
        <h3 v-show="isLogged && this.em == 0">{{this.list[0].이름}}님 안녕하세요~</h3>
        <br>
        <h3 v-show="isLogged && this.em == 0">이용횟수: {{this.list[0].서비스이용횟수}} 이므로</h3>
        <h3 v-show="isLogged && this.em == 0">할인율: {{this.discount}}% 입니다! </h3>
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
        ID: this.$store.getters.getId,
        discount:'0',
        list:[0],
        em:0,
      }
    },
    mounted: function() {
      this.getData()
      console.log(this.ID)
    },
    methods: {
      getData: function() {
        var url = 'http://106.10.32.228:3000/hello'+`?ID=${this.$store.getters.getId}`
        console.log(url)
        this.$http.get(url)
          .then(result => {
            if(result.data.status == 'success'){ // 로그인 성공
              console.log(result)
              console.log(result.data.status)
              this.list = result.data.result
              if (this.list[0].서비스이용횟수>=5){
                this.discount=5;
              }
            }else if(result.data.status == '직원'){
              console.log('직원')
              console.log(this.isLogged)
              this.em=1;
            }
          })
          .catch(error => {
            console.log('서버에러')
            console.log(error)
          })
      }
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
