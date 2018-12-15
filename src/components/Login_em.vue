<template>
  <div class="login">
    <br><br>
    <h1 italic> 로그인 </h1>
    <br><br>
    <div class="form-group">
          <label for="id">직원 번호</label>
          <input type="text" class="form-control" id="id"
                 placeholder="ID" v-model="id">
    </div>
    <div class="form-group">
          <label for="password">비밀번호</label>
          <input type="password" class="form-control" id="password"
                 placeholder="Password" v-model="password">
    </div>
    <br>
    <button class="btn btn-primary" @click.prevent="submit">로그인</button>
  </div>

</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      id: '',
      password: '',
      name: '',
      password: ''
    }
  },
  computed: {
    isLogged () {
        return this.$store.getters.isLogged
    }
  },
  methods: {
      logIn(data){
          console.log(data)
          this.$store.commit('logIn', {
              id: this.직원번호,
              name: this.이름//,
              //password: this.password
          })
      },
      submit: function(){
          this.$http.get('106.10.32.228:3000'+`/login_em?id=${this.id}&password=${this.password}`)
          .then((result)=>{
              if(result.data.status == 'success'){ // 로그인 성공
                  console.log('success')
                  this.logIn(result.data)
              }
              else {
                console.log('error')
                    this.$notice({
                        type: 'alert',
                        text: '로그인 정보가 올바르지 않습니다'
                    })
              }
            })
          .catch((error)=>{
            console.log('server error')
            this.$notice({
                type: 'alert',
                text: '서버에 오류가 있습니다.'
            })
          })
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
