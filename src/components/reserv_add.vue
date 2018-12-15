<template>
<div class="quest_add">
  예약신청
  <select name='날짜'>
    <option value='' selected>-- 선택 --</option>
    <option value=''>사과</option>
    <option value='banana'>바나나</option>
    <option value='lemon'>레몬</option>
  </select>
</div>
</template>

<script>
export default {
  name: "reservation_add",
  data() {
    return {
      id: '',
      date:'',
      month:'',
      year:'',
      today:''
    }
  },
  mounted: function() {
    console.log('예약신청게시판')
    this.getID()
    this.getDate()
  },
  computed: {
    getID () {
      this.id = this.$store.getters.getId
      return this.$store.getters.getId
    }
  },
  methods: {
    goBack: function() {
      this.$router.push("reservation")
    },
    getDate(){
      this.today = new Date();
    },
    submitLog: function() {
      console.log(text_.value)
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
.quest_add {
  width: 100%;
  padding-top: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
</style>
