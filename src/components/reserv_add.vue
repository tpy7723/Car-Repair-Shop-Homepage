<template>
  <body>
  <div class="reserv_add">
    <br><br>
    <h1 italic> 예약 등록 </h1>
    <br>
    (해당 달의 예약만 신청 가능합니다!)<br><br>
  희망 일자 입력
  <input type="text" class="form-control" v-model="day" placeholder="1~31일 중 숫자만 입력해주세요">
  <br/>
  희망 픽업 장소
  <input type="text" class="form-control" v-model="loc" placeholder="희망 픽업 장소의 주소를 입력해주세요">
  <br>
  <button type="submit" class="btn btn-primary" @click.prevent="goBack">       뒤로가기       </button>
  <button type="submit" class="btn btn-primary" @click.prevent="submitLog">예약</button>
</div>
</body>
</template>

<script>
export default {
  name: "reservation_add",
  data() {
    return {
      day:'',
      loc:''
    }
  },
  computed: {
    getId () {
        return this.$store.getters.getId
    }
  },
  mounted: function() {
    console.log('예약신청게시판')
  },
  methods: {
    goBack: function() {
      this.$router.push("reservation")
    },
    submitLog: function() {
      var today = new Date();
      var year = today.getFullYear()
      var month = today.getMonth() +1
      if(this.day < today.getDate()){
        alert('날짜를 확인하여 주십시오');
      }
      else if(this.day>31){
        alert('날짜를 확인하여 주십시오');
      }
      else{
        var reserv_date = year+'-'+month+'-'+this.day
        console.log(reserv_date)
        var url = 'http://106.10.32.228:3000' + `/request/reservation?id=${this.getId}&date=${reserv_date}&loc=${this.loc}`;

        console.log(url)
        this.$http.get(url)
          .then((result) => {
            if (result.data.status == 'success') {
              console.log('success')
              alert("등록 성공하였습니다")
              this.$router.push("reservation")
            } else {
              alert("등록 실패하였습니다")
              console.log('error')
            }
          })
          .catch((error) => {
            console.log('server error')
            console.log(error)
            this.$notice({
              type: 'alert',
              text: '서버에 오류가 있습니다.'
            })
          })
      }
    }
  }

}
</script>

<style media="screen">
.reserv_add {
  width: 50%;
  padding-top: 20px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
</style>
