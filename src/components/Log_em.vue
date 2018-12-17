<template lang="html">
  <div class="log_em">
    <br><br>
    <h1 italic> 직원의 수리기록 </h1>
    <h5 italic> (수리상태 : 수리 전=0, 수리 중=1, 수리 완료=2) </h5>
    <br><br>
    <div class="board-box">
      <div class="row form-group">
        <div class="col-sm-10"></div>
      </div>
      <div class="row">
        <!-- print meeting log list -->
        <table class="table table-striped">
          <thead>
            <tr class="text-center">
              <th class="text-center">접수번호</th>
              <th class="text-center">문제점</th>
              <th class="text-center">수리시작날짜</th>
              <th class="text-center">수리완료날짜</th>
              <th class="text-center">수리상태</th>
              <th class="text-center">금액</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="index">
              <td>{{item.접수번호}}</td>
              <td>{{item.문제점}}</td>
              <td>{{item.수리시작날짜}}<button type="button" class="btn btn-primary" @click="editStart(item)">갱신</button></td>
              <td>{{item.수리완료날짜}}</td>
              <td>{{item.수리상태}}<button type="button" class="btn btn-primary" @click="editState(item)">갱신</button></td>
              <td>{{item.금액}}</td>
            </tr>
          </tbody>
        </table>
      </br>
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <table class="table table-striped">
          <h5 italic> 수리완료날짜 갱신하기 </h5>
            <tbody>
              <tr>
                <td>접수번호:<input id="edit" type="text" class="form-control" v-model="log_id"></td>
                <td><input id="edit" type="text" class="form-control" v-model="year">년</td>
                <td><input id="edit" type="text" class="form-control" v-model="month">월</td>
                <td><input id="edit" type="text" class="form-control" v-model="day">일</td>
                <td><button type="button" class="btn btn-primary" @click="editFinish()">갱신</button></td>
              </tr>
            </tbody>
          </table>
        </br>
          가격 갱신하기
          <table class="table table-striped">
            <tbody>
              <tr>
                <td>가격 : <input id="edit" type="text" class="form-control" v-model="pay"></td>
                <td>접수번호:<input id="edit" type="text" class="form-control" v-model="log_id"></td>
                <td><button type="button" class="btn btn-primary" @click="editPay()">갱신</button></td>
              </tr>
            </tbody>
        </table>
      </div>
    </div>
    <br/>
    <br/>
    <br><br><br> .
  </div>
</template>

<script>
export default {
  name: 'log',
  data() {
    return {
      msg: '게시판',
      list: [],
      year:'',
      month:'',
      day:'',
      log_id:'',
      pay:''
    }
  },
  mounted: function() {
    this.msg = ''
    console.log('후기게시판')
    this.getData()
  },
  computed: {
    isLogged () {
      console.log(this.$store.getters.isLogged)
      return this.$store.getters.isLogged
    },
    getId(){
      return this.$store.getters.getId
    }
  },
  methods: {
    getData: function() {
      var url = 'http://106.10.32.228:3000/log_em'
      console.log(url)
      this.$http.get(url + `?ID=${this.getId}`)
        .then(result => {
          console.log(result)
          console.log(result.data.status)
          this.list = result.data.result
          console.log(this.list)
          this.list.forEach(v => {
            var datainfo = v.수리시작날짜
            v.수리시작날짜 = this.$moment(dateinfo).tz('Asia/Seoul').format('YYYY년 M월 D일 H시 m분')
            var datainfo = v.수리완료날짜
            v.수리완료날짜 = this.$moment(dateinfo).tz('Asia/Seoul').format('YYYY년 M월 D일 H시 m분')
          })
        })
        .catch(error => {
          console.log('서버에러')
          console.log(error)
        })
    },
    editStart: function(item){
      var url = 'http://106.10.32.228:3000/editStart/log_em'
      this.$http.get(url + `?ID=${item.접수번호}`)
        .then(result => {
          console.log(result)
          console.log(result.data.status)
        })
        .catch(error => {
          console.log('서버에러')
          console.log(error)
        })
        this.getData()
    },
    editState: function(item){
      var url = 'http://106.10.32.228:3000/editState/log_em'
      this.$http.get(url + `?ID=${item.접수번호}`)
        .then(result => {
          console.log(result)
          console.log(result.data.status)
        })
        .catch(error => {
          console.log('서버에러')
          console.log(error)
        })
        this.getData()
    },
    editFinish: function(){
      var url = 'http://106.10.32.228:3000/editFinish/log_em'
      this.$http.get(url + `?ID=${this.log_id}&year=${this.year}&month=${this.month}&day=${this.day}`)
        .then(result => {
          console.log(result)
          console.log(result.data.status)
          this.list = result.data.result
          console.log(this.list)
          this.list.forEach(v => {
            var datainfo = v.수리시작날짜
            v.수리시작날짜 = this.$moment(dateinfo).tz('Asia/Seoul').format('YYYY년 M월 D일 H시 m분')
            var datainfo = v.수리완료날짜
            v.수리완료날짜 = this.$moment(dateinfo).tz('Asia/Seoul').format('YYYY년 M월 D일 H시 m분')
          })
          this.getData()
        })
        .catch(error => {
          console.log('서버에러')
          console.log(error)
        })
    },
    editPay: function(){
      var url = 'http://106.10.32.228:3000/editPay/log_em'
      this.$http.put(url + `?val=${this.pay}&num=${this.log_id}`)
        .then(result => {
          console.log(result)
          console.log(result.data.status)
          this.getData()
        })
        .catch(error => {
          console.log('서버에러')
          console.log(error)
        })
    }

  }
}
</script>

<style media="screen">
.log_em {
  width: 95%;
  padding-top: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
#edit{
  width:50%;
  margin-left: auto;
  margin-right: auto;
}
</style>
