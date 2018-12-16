<template lang="html">
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{this.id}}님의 {{this.num}}</h5>
    </div>
    <ul  v-for="(item, index) in list" :key="index" class="list-group list-group-flush">
      <li class="list-group-item">문제점 :<br/>{{item.문제점}}</li>
      <li class="list-group-item">담당직원 : {{item.이름}}</li><!--직원과 join해서 직원의 이름을 보여줘야 한다.-->
      <li class="list-group-item">수리시작날짜 : {{item.수리시작날짜}}</li><!--수리 비용까지 sql에서 넘겨줘야한다.-->
      <li class="list-group-item">수리완료날짜 : {{item.수리완료날짜}}</li><!--수리 비용까지 sql에서 넘겨줘야한다.-->
    </ul>
  </div>
</template>

<script>
export default { //후기에 대한 디테일한 수리기록을 보여준다.
  name: "review_detail",
  data() {
    return {
      msg: '게시판',
      num:'',
      id:'',
      list:[]
    }
  },
  computed: {
    isLogged () {
      return this.$store.getters.isLogged
    }
  },
  mounted: function() {
    this.msg = ''
    console.log('detail후기게시판')
    this.getData()
  },
  methods: {
    getData: function(){
      console.log('in detail_review')
      this.num = this.$route.query.num
      this.id = this.$route.query.id
      console.log(this.num)
      var url = 'http://106.10.32.228:3000/call/review_detail'
      this.$http.get(url+`?num=${this.num}`)
      .then(result => {
        console.log(result.data.status)
        this.list = result.data.result
        console.log(this.list)
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
.card {
  padding-top: 10px;
  margin-left: auto;
  margin-right: auto;
}
</style>
