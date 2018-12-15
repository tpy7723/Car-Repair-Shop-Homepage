<template>
  <body>
  <div class="reserv_add">
    <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Dropdown button
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something else here</a>
    </div>
  </div>
  <br/>
  <select name='fruits'>
    <option value='' selected>-- 선택 --</option>
    <option value='http://www.naver.com'>사과</option>
    <option value='banana'>바나나</option>
    <option value='lemon'>레몬</option>
  </select>
</div>
</body>
</template>

<script>
export default {
  name: "reservation_add",
  data() {
    return {
      id: this.$store.getters.getId,
      date:'',
      month:'',
      year:'',
      today:''
    }
  },
  mounted: function() {
    console.log('예약신청게시판')
    this.getDate()
  },
  methods: {
    goBack: function() {
      this.$router.push("reservation")
    },
    getDate(){
      this.today = new Date();
    },
    submitLog: function() {
      var reserv_date = this.year+'-'+this.month+'-'+this.date
      var url = 'http://106.10.32.228:3000' + `/request/reservation?id=${this.id}&date=${this.reserv_date}`;

      console.log(url)
      this.$http.get(url)
        .then((result) => {
          if (result.data.status == 'success') {
            console.log('success')
            this.$router.push("reservation")
          } else {
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
</script>

<style media="screen">
.reserv_add {
  width: 100%;
  padding-top: 20px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
</style>
