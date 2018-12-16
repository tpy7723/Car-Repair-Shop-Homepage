<template>
  <div class="receipt">
    <br><br>
    <h1 italic> 접수 </h1>
    <br><br>

    <form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="LoginID">고객 ID</label>
      <input type="text" class="form-control" v-model="id" placeholder="LoginID">
    </div>
    <div class="form-group col-md-6">
      <label for="Password">담당 직원 번호</label>
      <input type="password" class="form-control" v-model="em_id" placeholder="123456">
    </div>
  </div>
  <div class="form-row">
  <div class="form-group col-md-6">
    <label for="Name">차량 번호</label>
    <input type="text" class="form-control" v-model="차량번호" placeholder="가1324">
  </div>
  <div class="form-group col-md-6">
    <label for="Phone">문제점</label>
    <input type="text" class="form-control" v-model="문제점" placeholder="문제점">
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
      id: '',
      em_id: '',
      Name: '',
      Phone: ''
    }
  },
  computed: {
    isLogged () {
        return this.$store.getters.isLogged
    },
    getAuthLevel() {
      return this.$store.getters.getAuthLevel
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
          var url = 'http://106.10.32.228:3000' + `/request/join?ID=${this.LoginID}&PHONE=${this.Phone}&NAME=${this.Name}&PASSWORD=${this.Password}`;
          console.log(url)
          this.$http.get(url)

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
.receipt{
  width: 25%;
  padding-top: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align : center;
}
</style>
