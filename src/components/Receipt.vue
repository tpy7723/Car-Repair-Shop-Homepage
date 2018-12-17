<template>
  <div class="receipt">
    <br><br>
    <h1 italic> 접수 </h1>
    <br><br>

    <form name="registerForm">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="id">고객 ID</label>
          <input type="text" class="form-control" id='id' v-model="id" placeholder="고객ID">
        </div>
        <div class="form-group col-md-6">
          <label for="em_id">담당 직원 번호</label>
          <input type="text" class="form-control" id='em_id' v-model="em_id" placeholder="123456">
        </div>
      </div>
      <div class="form-row">
      <div class="form-group col-md-6">
        <label for="차량번호">차량 번호</label>
        <input type="text" class="form-control" id='num' v-model="차량번호" placeholder="가1324">
      </div>
      <div class="form-group col-md-6">
        <label for="문제점">문제점</label>
        <input type="text" class="form-control" id='problem' v-model="문제점" placeholder="문제점">
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
        var id = registerForm.id.value;
        var em_id= registerForm.em_id.value;
        var num = registerForm.num.value;
        var problem = registerForm.problem.value;

        if(id==""){alert("고객 ID를 입력해주세요"); return;}
        if(em_id==""){alert("담당 직원 번호를 입력해주세요"); return;}
        if(num==""){alert("차량 번호를 입력해주세요"); return;}
        if(problem==""){alert("문제점을 입력해주세요"); return;}

          var url = 'http://106.10.32.228:3000' + `/receipt?id=${this.id}&em_id=${this.em_id}&차량번호=${this.차량번호}&문제점=${this.문제점}`;
          console.log(url)
          this.$http.get(url)

          .then((result)=>{
              if(result.data.status == 'success'){ // 로그인 성공
                  console.log('success')
                  alert("등록 성공하였습니다")
              }else if(result.data.status == '거절'){
                  console.log('거절')
                  alert('인턴은 접수를 해 줄 수 없습니다!')
              }else {
                console.log('error')
                alert("등록 실패하였습니다")
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
