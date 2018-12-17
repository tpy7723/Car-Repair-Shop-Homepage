<template lang="html">
  <div class="log_em">
    <br><br>
    <h1 italic> 직원의 수리기록 </h1>
    <h5 italic> (수리상태 : 수리 전=0, 수리 중=1, 수리 완료=2) </h5>

    <div class="log_em">
      <div class="row form-group">
        <div class="col-sm-10"></div>
      </div>
      <div class="log_em">
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
      <form name="registerForm">
                <h2 class="log_em" italic> <수리완료 날짜 갱신> </h2>
        <table class="table table-striped">
            <tbody>
              <tr>
                <td>접수번호<input id="num" type="text" class="form-control" v-model="log_id"></td>
                <td>년<input id="year" type="text" class="form-control" v-model="year"></td>
                <td>월<input id="month" type="text" class="form-control" v-model="month"></td>
                <td>일<input id="date" type="text" class="form-control" v-model="day"></td>
              </tr>
            </tbody>

          </table>
          <button type="button" class="btn btn-primary" @click="editFinish()">갱신</button>
        </form>
        </br>
        <form name="registerForm2">
          <h2 class="log_em" italic> <가격 갱신> </h2>
          <table class="table table-striped">
            <tbody>
              <tr>
                <td>접수번호<input id="register" type="text" class="form-control" v-model="log_id"></td>
                <td>가격 <input id="money" type="text" class="form-control" v-model="pay"></td>

              </tr>
            </tbody>
        </table>
        <button type="button" class="btn btn-primary" @click="editPay()">갱신</button>
      </form>
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
      var num = registerForm.num.value;
      var year = registerForm.year.value;
      var month = registerForm.month.value;
      var date = registerForm.date.value;


      if(num==""){alert("접수번호를 입력해주세요"); return;}
      if(year==""){alert("연도를 입력해주세요"); return;}
      if(month==""){alert("월자를 입력해주세요"); return;}
      if(date==""){alert("일자를 입력해주세요"); return;}


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
      var register = registerForm2.register.value;
      var money = registerForm2.money.value;
      if(money==""){alert("금액을 입력해주세요"); return;}
      if(register==""){alert("접수번호를 입력해주세요"); return;}

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
    width: 100%;
    padding-bottom: 20px;
    padding-top: 50px;
    padding-left: 50px;
    padding-right: 50px;
    text-align: center;
}
#edit{
  width:50%;
  margin-left: auto;
  margin-right: auto;
}
</style>
