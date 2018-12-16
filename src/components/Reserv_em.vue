<template lang="html">
  <div class="reserv_em">
    <div class="board-box">
      <div class="row form-group">
        <div class="col-sm-10"></div>
      </div>
      <div class="row">
        <!-- print meeting log list -->
        <table class="table table-striped">
          <thead>
            <tr class="text-center">
              <th class="text-center">#</th>
              <th class="text-center">예약번호</th>
              <th class="text-center">고객ID</th>
              <th class="text-center">희망날짜</th>
              <th class="text-center">픽업장소</th>
              <th class="text-center"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="index">
              <td>{{index+1}}</td>
              <td>{{item.예약번호}}</td>
              <td>{{item.ID}}</td>
              <td>{{item.희망날짜}}</td>
              <td>{{item.픽업장소}}</td>
              <td><button type="button" class="btn btn-primary" @click="call(item)">승인</button></td>
            </tr>
          </tbody>
        </table>
        </table>
      </div>
    </div>
    <br/>
    <br/>
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
      log_id:''
    }
  },
  mounted: function() {
    this.msg = ''
    console.log('후기게시판')
    this.getData()
  },
  watched: function(){
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
      var url = 'http://106.10.32.228:3000/reserv_em'
      console.log(url)
      this.$http.get(url)
        .then(result => {
          console.log(result)
          console.log(result.data.status)
          this.list = result.data.result
          console.log(this.list)
        })
        .catch(error => {
          console.log('서버에러')
          console.log(error)
        })
    },
    call: function(item){
      var url = 'http://106.10.32.228:3000/call/reserv_em'
      console.log(url)
      this.$http.get(url+`?id=${item.예약번호}`)
        .then(result => {
          console.log(result)
          console.log(result.data.status)
        })
        .catch(error => {
          console.log('서버에러')
          console.log(error)
        })
        this.getData()
    }
  }
}
</script>

<style media="screen">
.reserv_em {
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
