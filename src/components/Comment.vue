<template>
<div class="comment">
  댓글 현황
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
  name: 'comment',
  data () {
    return {
      LoginID: '',
      Password: '',
      Name: '',
      Phone: ''
    }
  },
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
