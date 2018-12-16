<template>
<div class="comment">
  <br><br><br>
  댓글 달리지 않은 게시글
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
            <th class="text-center">질문번호</th>
            <th class="text-center">내용</th>
            <th class="text-center">작성시간</th>
            <th class="text-center">고객ID</th>
            <th class="text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index" style="cursor: pointer">
            <td>{{item.질문번호}}</td>
            <td>{{item.내용}}</td>
            <td>{{item.작성시간}}</td>
            <td>{{item.ID}}</td>
            <td><button type="button" class="btn btn-primary" @click="Add_comment(item)">댓글 달기</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: "question",
    data() {
      return {
        msg: '게시판',
        list: [],
        time: 0,
        duration: 5000
      }
    },
    computed: {
      isLogged () {
        console.log(this.$store.getters.isLogged)
        return this.$store.getters.isLogged
      },
      user_id() {
        return this.$store.getters.getId
      }
    },
    mounted: function() {
      this.msg = ''
      console.log('질문게시판')
      this.getData()
    },
    methods: {
      Add_comment: function(item) {
        this.$router.push({
          name: 'Comment_add',
          query: {
            num: item.질문번호
          }
        })
      },
      getData: function() {
        var url = 'http://106.10.32.228:3000/call/notcommentedquestion'
        console.log(url)
        this.$http.get(url)
          .then(result => {
            console.log(result)
            console.log(result.data.status)
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
    }
  }
  </script>


<style media="screen">
.login{
  width: 25%;
  padding-top: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align : center;
}
</style>
