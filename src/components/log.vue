<template lang="html">
  <div class="log">
    {{this.id}}고객님의 수리기록
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
              <th class="text-center">내용</th>
              <th class="text-center">수리시작날짜</th>
              <th class="text-center">수리완료날짜</th>
              <th class="text-center">직원번호</th>
              <th class="text-center"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="index" style="cursor: pointer">
              <td>{{item.접수번호}}</td>
              <td>{{item.내용}}</td>
              <td>{{item.수리시작날짜}}</td>
              <td>{{item.수리완료날짜}}</td>
              <td>{{item.직원번호}}</td>
              <td><button type="button" class="btn btn-primary" @click="review(item)">삭제</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'log',
    data() {
      return {
        msg: '게시판',
        list: [],
        id: this.$store.getters.getId
      }
    },
    mounted: function() {
      this.msg = ''
      console.log('후기게시판')
      this.getData()
    },
    methods: {
      getData: function() {
        var url = 'http://106.10.32.228:3000/log'
        console.log(url)
        this.$http.get(url+`?ID=${this.id}`)
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
      }
    }
  }
  </script>

</script>

<style media="screen">
.log{
  width: 100%;
  padding-top: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align : center;
}
</style>
