<template lang="html">
    <div class="">
      <br><br><br>
      <h1>{{this.num}}번 수리의 사용 부품</h1>
      <table class="table table-striped">
        <thead>
          <tr class="text-center">
            <th class="text-center">#</th>
            <th class="text-center">모델번호</th>
            <th class="text-center">부품명</th>
            <th class="text-center">사용된 개수</th>
            <th class="text-center">공급업체명</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td>{{index+1}}</td>
            <td>{{item.모델번호}}</td>
            <td>{{item.부품명}}</td>
            <td>{{item.개수}}</td>
            <td>{{item.업체명}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
export default {
  name: 'log',
  data() {
    return {
      msg: '게시판',
      list: [],
      num:''
    }
  },
  mounted: function() {
    this.msg = ''
    console.log('세부로그게시판')
    this.getData()
  },
  methods: {
    getData:function(){
      var url = 'http://106.10.32.228:3000/detail/log'
      console.log(this.$route.query.num)
      this.num = this.$route.query.num
      this.$http.get(url + `?ID=${this.num}`)
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
    }
  }
}
</script>

<style lang="css">
</style>
