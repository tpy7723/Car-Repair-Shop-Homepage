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
      <div v-if="sql_r==='success'" class="row">
        <!-- print meeting log list -->
        <table class="table table-striped">
          <thead>
            <tr class="text-center">
              <th class="text-center">#</th>
              <th class="text-center">예약승인</th>
              <th class="text-center">희망날짜</th>
              <th class="text-center">픽업장소</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" @click="readBoard(item)" :key="index" style="cursor: pointer">
              <td scope="col">{{index+1}}</td>
              <td>{{item.예약승인}}</td>
              <td>{{item.희망날짜}}</td>
              <td>{{item.픽업장소}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <div class="alert alert-info alert-dismissible fade show" role="alert">
          <strong>고객님의 예약 기록이 없습니다.</strong>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      list: [],
      msg: 'Welcome to Your Vue.js App',
      sql_r: 'success'

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
      getId () {
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
      getData: function(){
        var url = 'http://106.10.32.228:3000/call/reservation'
        console.log(url)
        this.$http.get(url+`?ID=${this.getId}`)
          .then(result => {
            console.log(result)
            console.log(result.data.status)
            console.log(result.data.Msg)
            if(result.data.Msg==='no-result'){
                console.log('no result')
                this.sql_r='fail'
            }
            else{
              this.list = result.data.result
              console.log('결과'+this.list)
              this.list.forEach(v => {
                var datainfo = v.희망날짜
                v.희망날짜 = this.$moment(dateinfo).tz('Asia/Seoul').format('YYYY년 M월 D일 H시 m분')
              })
            }
          })
          .catch(error => {
            console.log('서버에러')
            console.log(error)
          })
      },
      submit: function(){
        this.$router.push("reserve_add")
      },
      goBack: function(){
        this.$router.push("/")
      },
      createLog: function(){
        this.$router.push("reserv_add")
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
