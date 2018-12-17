<template>
  <div class="login">
    <br><br>
    <h1 italic> 고객 회원가입 </h1>
    <br><br>

    <form name="registerForm" action="register_ok.asp" method="post">
      <div class="login">
    <div class="login">
      <label for="LoginID">ID</label>
      <input type="text" class="form-control" id='LoginID' v-model="LoginID" placeholder="LoginID">
    </div>
    <div class="login">
      <label for="Password">Password</label>
      <input type="password" class="form-control" id='password' v-model="Password" placeholder="Password">
    </div>
    <div class="login">
      <label for="Password">Re-Password</label>
      <input type="password" class="form-control" id='pw_ok' placeholder="Re-Password">
    </div>
  <div class="login">
    <label for="Name">Name</label>
    <input type="text" class="form-control" id='name' v-model="Name" placeholder="홍길동">
  </div>
  <div class="login">
    <label for="Phone">Phone</label>
    <input type="text" class="form-control" id='phone' v-model="Phone" placeholder="010-3017-2440">
  </div>
  <br>

<br>
  <button type="submit" class="btn btn-primary" @click.prevent="goBack">       뒤로가기       </button>
  <button type="submit" class="btn btn-primary" @click.prevent="submit">       제출       </button>
  </div>
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
    goBack: function() {
      this.$router.push("/login")
    },
      logIn(data){
          console.log(data)
          this.$store.commit('logIn', {
              id: this.id,
              password: this.password
          })
      },
      submit: function(){
        var regex;
        var LoginID = registerForm.LoginID.value;
        var password= registerForm.password.value;
        var pw_ok = registerForm.pw_ok.value;
        var name = registerForm.name.value;
        var phone= registerForm.phone.value;
        if(LoginID==""){alert("ID를 입력해주세요"); return;}
        if(password==""){alert("Password를 입력해주세요"); return;}
        if(pw_ok==""){alert("비밀번호 확인을 입력해주세요"); return;}
        if(name==""){alert("Name을 입력해주세요"); return;}
        if(phone==""){alert("Phone을 입력해주세요"); return;}
        if(password!=pw_ok){alert("비밀번호와 비밀번호 확인이 다릅니다"); return;}
        regex=/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
        if(regex.test(phone)===false) {
          alert("잘못된 전화번호입니다.");
          return;
        }
          var url = 'http://106.10.32.228:3000' + `/request/join?ID=${this.LoginID}&PHONE=${this.Phone}&NAME=${this.Name}&PASSWORD=${this.Password}`;
          console.log(url)
          this.$http.get(url)

          .then((result)=>{
              if(result.data.status == 'success'){ // 로그인 성공
                  console.log('success')
                  alert("성공적으로 가입되었습니다! 로그인 해주세요~");
                  this.$router.push("/")
              }
              else {
                console.log('error')
                alert("중복된 데이터가 있습니다!");
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
  width: 60%;
  padding-top: 10px;
  text-align : center;

}
</style>
