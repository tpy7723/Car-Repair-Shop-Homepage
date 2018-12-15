<template>
  <div class="join">
    <br><br>
    <h1 italic> 회원가입 </h1>
    <br><br>

    <form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="LoginID">ID</label>
      <input type="text" class="form-control" id="LoginID" placeholder="LoginID">
    </div>
    <div class="form-group col-md-6">
      <label for="Password">Password</label>
      <input type="password" class="form-control" id="Password" placeholder="Password">
    </div>
  </div>
  <div class="form-row">
  <div class="form-group col-md-6">
    <label for="Name">Name</label>
    <input type="text" class="form-control" id="Name" placeholder="Name">
  </div>
  <div class="form-group col-md-6">
    <label for="Phone">Phone</label>
    <input type="text" class="form-control" id="Phone" placeholder="Phone">
  </div>
  <br>
</div>
<br>
  <button type="submit" class="btn btn-primary" @click.prevent="submit">       제출       </button>
</form>
  </div>
</template>


<script>
export default {
  name: 'join',
  data () {
    return {
      LoginID: '',
      Password: '',
      Name: '',
      Phone: ''
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
              id: this.id,
              password: this.password
          })
      },
      submit: function(){
          this.$http.get(this.$config.targetURL+`/join?ID=${this.LoginID}&비밀번호=${this.Password}&이름=${this.Name}&전화번호=${this.Phone}`)
          .then((result)=>{
              if(result.data.status == 'success'){ // 로그인 성공
                  console.log('success')

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
            console.log('server success')
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
