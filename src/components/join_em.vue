<template>
<div class="join_em">
  <br><br>
  <h1 italic> 직원 회원가입 </h1>
  <br><br>

  <form>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="LoginID">Employ Number</label>
        <input type="text" class="form-control" v-model="LoginID" placeholder="123456">
      </div>
      <div class="form-group col-md-6">
        <label for="Password">Password</label>
        <input type="password" class="form-control" v-model="Password" placeholder="Password">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="Name">Name</label>
        <input type="text" class="form-control" v-model="Name" placeholder="홍길동">
      </div>
      <div class="form-group col-md-6">
        <label for="Phone">Phone</label>
        <input type="text" class="form-control" v-model="Phone" placeholder="010-3017-2440">
      </div>
      <br>
    </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="Start_date">Start Working Date</label>
      <input type="text" class="form-control" v-model="Start_date" placeholder="2018-12-01">
    </div>
    <div class="form-group col-md-6">
      <label for="Supervisor">Supervisor Num</label>
      <input type="text" class="form-control" v-model="Supervisor" placeholder="123456 or NULL">
    </div>
    <br>
  </div>
<br>
<button type="submit" class="btn btn-primary" @click.prevent="submit"> 제출 </button>
</form>
</div>
</template>


<script>
export default {
  name: 'join_em',
  data() {
    return {
      LoginID: '',
      Password: '',
      Name: '',
      Phone: '',
      Start_date: '',
      Supervisor: ''
    }
  },
  computed: {
    isLogged() {
      return this.$store.getters.isLogged
    }
  },
  methods: {
    logIn(data) {
      console.log(data)
      this.$store.commit('logIn', {
        id: this.id,
        password: this.password
      })
    },
    submit: function() {
      var url = 'http://106.10.32.228:3000' + `/request/join_em?ID=${this.LoginID}&PHONE=${this.Phone}&NAME=${this.Name}&START=${this.Start_date}&SUPER=${this.Supervisor}&PASSWORD=${this.Password}`;
      console.log(url)
      this.$http.get(url)

        .then((result) => {
          if (result.data.status == 'success') { // 로그인 성공
            console.log('success')
            this.$router.push("/")
          } else {
            console.log('error')
            this.$notice({
              type: 'alert',
              text: '로그인 정보가 올바르지 않습니다'
            })
          }
        })
        .catch((error) => {
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
.login {
  width: 25%;
  padding-top: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
</style>
