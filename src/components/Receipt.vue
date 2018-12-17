<template>
  <div class="receipt">
    <br><br>
    <h1 italic> 접수 </h1>
    <br><br>

    <form>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="id">고객 ID</label>
          <input type="text" class="form-control" v-model="id" placeholder="고객ID">
        </div>
        <div class="form-group col-md-6">
          <label for="em_id">담당 직원 번호</label>
          <input type="text" class="form-control" v-model="em_id" placeholder="123456">
        </div>
      </div>
      <div class="form-row">
      <div class="form-group col-md-6">
        <label for="차량번호">차량 번호</label>
        <input type="text" class="form-control" v-model="차량번호" placeholder="가1324">
      </div>
      <div class="form-group col-md-6">
        <label for="문제점">문제점</label>
        <input type="text" class="form-control" v-model="문제점" placeholder="문제점">
      </div>
      <br>
    </div>
    <br>
      <button type="submit" class="btn btn-primary" @click.prevent="submit">접수</button>
    </form>
  </div>
</template>


<script>
export default {
  name: 'join',
  data () {
    return {
      id: '',
      em_id: '',
      차량번호: '',
      문제점: ''
    }
  },
  computed: {
    isLogged () {
        return this.$store.getters.isLogged
    },
    getAuthLevel() {
      return this.$store.getters.getAuthLevel
    }
  },
  methods: {
      submit: function(){
          var url = 'http://106.10.32.228:3000' + `/receipt?id=${this.id}&em_id=${this.em_id}&차량번호=${this.차량번호}&문제점=${this.문제점}`;
          console.log(url)
          this.$http.get(url)

          .then((result)=>{
              if(result.data.status == 'success'){ // 로그인 성공
                  console.log('success')
              }else if(result.data.status == '거절'){
                  console.log('거절')
                  alert('인턴은 접수를 해 줄 수 없습니다!')
              }else {
                console.log('error')
                    this.$notice({
                        type: 'alert',
                        text: '실패하였습니다.'
                    })
              }
            })
          .catch((error)=>{
            console.log('error')
            this.$notice({
                type: 'alert',
                text: '서버에 오류가 있습니다.'
            })
          })

      }


  }
}
</script>



<style media="screen">
.receipt{
  width: 25%;
  padding-top: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align : center;
}
</style>
