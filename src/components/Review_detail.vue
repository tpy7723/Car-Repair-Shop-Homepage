<template lang="html">
  <div class="card">
      <div class="card" style="width: 40rem;">
        <div class="card-body">
          <h1 class="card-title">접수번호: {{this.num}}</h1>
          <br>
          <h4 class="card-title text-left">고객ID :    {{this.id}}</h4>
        </div>
        <ul  v-for="(item, index) in list" :key="index" class="list-group list-group-flush text-left">
          <li class="list-group-item"><h4>문제점 :</h4>{{item.문제점}}</li>
          <li class="list-group-item"><h4>담당직원 :</h4> {{item.이름}}</li><!--직원과 join해서 직원의 이름을 보여줘야 한다.-->
          <li class="list-group-item"><h4>수리시작날짜 :</h4> {{item.수리시작날짜}}</li><!--수리 비용까지 sql에서 넘겨줘야한다.-->
          <li class="list-group-item"><h4>수리완료날짜 :</h4> {{item.수리완료날짜}}</li><!--수리 비용까지 sql에서 넘겨줘야한다.-->
        </ul>
        <br>
        <button type="submit" class="btn btn-primary" @click.prevent="goBack">       뒤로가기       </button>

      </div>
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
    goBack: function() {
      this.$router.push("review")
    },
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
  padding: 80px;
  margin-left: auto;
  margin-right: auto;
  text-ailgn : 'left';
}
</style>
