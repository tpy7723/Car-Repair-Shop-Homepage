<template>
  <div class="review">
    후기게시판
    <div class="board-box">
      <div class="row form-group">
        <div class="col-sm-10"></div>
        <div class="col-sm-2">
          <button v-show="isLogged" type="button" class="btn btn-secondary" @click="createLog()">글 등록</button>
        </div>
      </div>
      <div class="row">
        <!-- print meeting log list -->
        <table class="table table-striped">
          <thead>
            <tr class="text-center">
              <th class="text-center">접수번호</th>
              <th class="text-center">내용</th>
              <th class="text-center">작성시간</th>
              <th class="text-center">고객ID</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" @click="readBoard(item)" :key="index" style="cursor: pointer">
              <td>{{item.접수번호}}</td>
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
    name: "review",
    data() {
      return {
        msg: '게시판',
        list: []
      }
    },
    computed: {
      isLogged () {
        console.log(this.$store.getters.isLogged)
        return this.$store.getters.isLogged
      }
    },
    mounted: function() {
      this.msg = ''
      console.log('후기게시판')
      this.getData()
    },
    methods: {
      getData: function() {
        var url = 'http://106.10.32.228:3000/call/review'
        console.log(url)
        this.$http.get(url)
          .then(result => {
            console.log(result)
            console.log(result.data.status)
            console.log(result.data.result)
            this.list = result.data.result
            console.log(this.list)
            this.list.forEach(v => {
              var datainfo = v.작성시간
              v.작성시간 = this.$moment(dateinfo).tz('Asia/Seoul').format('YYYY년 M월 D일 H시 m분')
            })
          })
          .catch(error => {
            console.log('서버에러')
            console.log(error)
          })
      },
      createLog: function() {
            this.$router.push("review_add")
      },
      readBoard: function(item){
          this.$router.push({
            name: 'review_detail',
            query: {
              id: item.ID
            }
          })
        }
    }
  }
  </script>



<style media="screen">
.review{
  width: 100%;
  padding-top: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align : center;
}
</style>
