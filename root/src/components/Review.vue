<template>
  <div class="review">
    후기게시판
    <div class="board-box">
      <div class="row form-group">
        <div class="col-sm-10"></div>
        <div class="col-sm-2" >
          <button type="button" class="btn btn-secondary"
        @click="createLog()">글 등록</button>
        </div>
      </div>
      <div class="row">
          <!-- print meeting log list -->
          <table class="table table-striped">
            <thead>
               <tr class="text-center">
                <th class="text-center" scope="col">#</th>
                <th class="text-center">작성자</th>
                <th class="text-center">접수번호</th>
                <th class="text-center">내용</th>
                <th class="text-center">작성시간</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" @click="readBoard(item)" :key="index" style="cursor: pointer">
                <td scope="col">{{index+1}}</td>
                <td>{{item.ID}}</td>
                <td>{{item.접수번호}}</td>
                <td>{{item.내용}}</td>
                <td>{{item.작성시간}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name : "Review",
  data(){
    return {
      msg: '게시판',
      list : []
    }
  },
  mounted:function(){
    this.msg = ''
    console.log('리뷰게시판')
    this.getData()
  },
  methods:{
    getData: function(){
      var url = this.$config.targetURL+'/call/review'
      console.log(url)
      this.$http.get(rul)
      .then(result=>{
        console.log(result)
        console.log(result.data.status)
        this.list = JSON.parse(result.data.result)
        this.list.forEach(v=>{
          var datainfo = v.writetime
          v.writetime = this.$moment(dateinfo).tz('Asia/Seoul').format('YYYY년 M월 D일 H시 m분')
        })
      })
      .catch(error=>{
        console.log('서버에러')
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
