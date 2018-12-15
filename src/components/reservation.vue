<template>
  <div class="reservation">
    예약게시판
    <div class="board-box">
      <div class="row form-group">
        <div class="col-sm-10"></div>
        <div class="col-sm-2">
          <button v-show="isLogged" type="button" class="btn btn-secondary" @click="createLog()">예약</button>
        </div>
      </div>
      <div class="row">
        <!-- print meeting log list -->
        <table class="table table-striped">
          <thead>
            <tr class="text-center">
              <th class="text-center">예약날짜</th>
              <th class="text-center">내용</th>
              <th class="text-center">작성시간</th>
              <th class="text-center">고객ID</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" @click="readBoard(item)" :key="index" style="cursor: pointer">
              <td scope="col">{{index+1}}</td>
              <td>{{item.질문번호}}</td>
              <td>{{item.내용}}</td>
              <td>{{item.작성시간}}</td>
              <td>{{item.ID}}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
  mounted: function() {
    this.msg = ''
    console.log('예약게시판')
    this.getData()
  },
  computed: {
    isLogged () {
      console.log(this.$store.getters.isLogged)
      return this.$store.getters.isLogged
    },
    getID () {
      this.id = this.$store.getters.getId
      return this.$store.getters.getId
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
      getDate: function(){
        var url = 'http://106.10.32.228:3000/call/reservation'
        console.log(url)
        this.$http.get(url+`?id=${this.id}`)
          .then(result => {
            console.log(result)
            console.log(result.data.status)
            this.list = JSON.parse(result.data.result)
            console.log(this.list)
            this.list.forEach(v => {
              var datainfo = v.희망날짜
              v.희망날짜 = this.$moment(dateinfo).tz('Asia/Seoul').format('YYYY년 M월 D일 H시 m분')
            })
          })
          .catch(error => {
            console.log('서버에러')
            console.log(error)
          })
      },
      submit: function(){
        var url =  'http://106.10.32.228:3000/reservation';
          this.$http.get(url+`?id=${this.id}&password=${this.password}`)
          .then((result)=>{
              if(result.data.status == 'success'){ // 로그인 성공
                  console.log('success')
                  var data = {id:result.data.result.ID,
                    password:result.data.result.비밀번호}
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
.reservation{
  width: 100%;
  padding-top: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align : center;
}
</style>
