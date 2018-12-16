<template>
  <div class="login">
    <br><br>
    <h1 italic> 로그인 </h1>
    <br><br>
    <div v-if = "isLogged">
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>이미 로그인 되어있습니다!</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <div v-else>
      <div class="form-group">
            <label for="id">회원 ID</label>
            <input type="text" class="form-control" id="id"
                   placeholder="ID" v-model="id">
      </div>
      <div class="form-group">
            <label for="password">비밀번호</label>
            <input type="password" class="form-control" id="password"
                   placeholder="Password" v-model="password">
      </div>
      <br>
      <button class="btn btn-primary" @click.prevent="submit">Login</button>
      <button type="button" class="btn btn-outline-primary btn-sm" style="padding:10px;">
        <router-link to="/join">회원가입</router-link>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      id: '',
      password: ''
    }
  },
  computed: {
    isLogged () {
      console.log(this.$store.getters.isLogged)
      return this.$store.getters.isLogged
    }
  },
  methods: {
      logIn(data){
          console.log(data)
          this.$store.commit('logIn', {
              id: this.id,
              authLevel: '1'
          })
      },
      submit: function(){
        var url =  'http://106.10.32.228:3000/login';
          this.$http.get(url+`?id=${this.id}&password=${this.password}`)
          .then((result)=>{
              if(result.data.status == 'success'){ // 로그인 성공
                  console.log('success')
                  var data = {id:result.data.result.ID}
                  this.logIn(result.data)
                  this.$router.push("/")
              }
              else if(result.data.status == 'no-user'){
                console.log("no user")
                alert('존재하지 않는 사용자입니다.')
              }
              else {
                console.log('error')
              }
            })
          .catch((error)=>{
            console.log('server success')
            this.$notice({
                type: 'alert',
                text: '서버에 오류가 있습니다.'
            })
          })
      },
      goBack: function(){
        this.$router.push("/")
      }
  }
}
</script>



<style media="screen">
.login{
  width: 25%;
  padding-top: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align : center;
}
</style>
