<template>
  <div class="receipt">
    <br><br>
    <h1 italic> 차량 등록 </h1>
    <br>
    <div class="card">
      <h3 italic> {{getId}}고객님의 등록된 차량 정보 </h3>
      <br>
      <div class="card-body">
        <table class="table table-striped">
          <thead>
            <tr class="text-center">
              <th class="text-center">차량번호</th>
              <th class="text-center">모델</th>
              <th class="text-center">연식</th>
              <th class="text-center"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="index" >
              <td>{{item.차량번호}}</td>
              <td>{{item.모델}}</td>
              <td>{{item.연식}}</td>
              <td><button type="button" class="btn btn-primary" @click="deleteCar(item)">삭제</button></td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>


    <div class="card">
      <div class="card-body">
        <h3 italic> 차량 추가 </h3>
        <br>
        <form name="registerForm">
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="num">차량 번호</label>
              <input type="text" class="form-control" id='num' v-model="num" placeholder="가1324">
            </div>
            <div class="form-group col-md-4">
              <label for="model">차량 모델</label>
              <input type="text" class="form-control" id='model' v-model="model" placeholder="차량모델">
            </div>
            <div class="form-group col-md-4">
              <label for="years">연식</label>
              <input type="text" class="form-control" id='year' v-model="years" placeholder="연식">
            </div>
        </div>
        <br>
          <button type="submit" class="btn btn-primary" @click.prevent="submit">추가</button>
        </form>

      </div>
    </div>
            <br><br><br> .
  </div>
</template>


<script>
export default {
  name: 'join',
  data () {
    return {
      id: '',
      model: '',
      num: '',
      years: '',
      list:[]
    }
  },
  computed: {
    isLogged () {
        return this.$store.getters.isLogged
    },
    getAuthLevel() {
      return this.$store.getters.getAuthLevel
    },
    getId() {
      return this.$store.getters.getId
    }
  },
  mounted: function(){
    this.getData()
  },
  methods: {
      submit: function(){
          var num = registerForm.num.value;
          var model = registerForm.model.value;
          var year = registerForm.year.value;
          if(num==""){alert("차량 번호를 입력해주세요"); return;}
          if(model==""){alert("차량 모델을 입력해주세요"); return;}
          if(year==""){alert("차량 연식을 입력해주세요"); return;}

          var url = 'http://106.10.32.228:3000' + `/create/car?id=${this.getId}&model=${this.model}&num=${this.num}&years=${this.years}`;
          console.log(url)
          this.$http.get(url)
          .then((result)=>{
              if(result.data.status == 'success'){ // 로그인 성공
                  console.log('success')
              }
              else {
                console.log('error')
                    this.$notice({
                        type: 'alert',
                        text: '실패하였습니다.'
                    })
              }
            })
          .catch((error)=>{
            console.log('server success')
            this.$notice({
                type: 'alert',
                text: '서버에 오류가 있습니다.'
            })
          })
          this.getData()
      },
      getData: function(){
        var url = 'http://106.10.32.228:3000/data/car'
        this.$http.get(url+`?id=${this.getId}`)
        .then((result)=>{
            if(result.data.status == 'success'){ // 로그인 성공
                console.log('success')
                this.list = result.data.result
                console.log(this.list)
            }
            else {
              console.log('error')
                  this.$notice({
                      type: 'alert',
                      text: '실패하였습니다.'
                  })
            }
          })
        .catch((error)=>{
          console.log('server success')
          this.$notice({
              type: 'alert',
              text: '서버에 오류가 있습니다.'
          })
        })
      },
      deleteCar: function(item){
        var url = 'http://106.10.32.228:3000/delete/car'
        this.$http.get(url+`?id=${item.차량번호}`)
        .then((result)=>{
            if(result.data.status == 'success'){ // 로그인 성공
                console.log('success')
                this.list = result.data.result
                console.log(this.list)
            }
            else {
              console.log('error')
                  this.$notice({
                      type: 'alert',
                      text: '실패하였습니다.'
                  })
            }
          })
        .catch((error)=>{
          console.log('server success')
          this.$notice({
              type: 'alert',
              text: '서버에 오류가 있습니다.'
          })
        })
        this.getData()
      }
  }
}
</script>



<style media="screen">
.receipt{
  width: 80%;
  padding-top: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align : center;
}
</style>
