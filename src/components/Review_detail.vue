<template lang="html">
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{id}}님의 {{this.list.접수번호}}</h5>
      <p class="card-text">문제점 :<br/>{{this.list.문제점}}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">담당직원 : {{this.list.이름}}</li><!--직원과 join해서 직원의 이름을 보여줘야 한다.-->
      <li class="list-group-item">수리시작날짜 : {{this.list.수리시작날짜}}</li><!--수리 비용까지 sql에서 넘겨줘야한다.-->
      <li class="list-group-item">수리완료날짜 : {{this.list.수리완료날짜}}</li><!--수리 비용까지 sql에서 넘겨줘야한다.-->
    </ul>
  </div>
</template>

<script>
export default { //후기에 대한 디테일한 수리기록을 보여준다.
  name: "review_detail",
  data() {
    return {
      msg: '게시판',
      id:'',
      list:[]
    }
  },
  created: function(){
    this.id = this.$route.query.id
    console.log(this.id)
    var url = 'http://106.10.32.228:3000/call/review_detail'
    this.$http.get(url+`?ID=this.id`)
    .then(result => {
      console.log(result.data.status)
      this.list = result.data.result
      console.log(this.list)
    })
    .catch(error => {
      console.log('서버에러')
      console.log(error)
    })
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
  }
}
</script>

<style lang="css">
</style>
