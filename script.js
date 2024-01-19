let cities = [
 {
  arabicName : "اسوان",
  isoName : "Aswan"
 },
 {
  arabicName : "قنا",
  isoName : "Qena"
 },
 {
  arabicName : "الأقصر",
  isoName : "Luxor"
 },
 {
  arabicName : "سوهاج",
  isoName : "Sohag"
 },
 {
  arabicName : "أسيوط",
  isoName : "Asyut"
 },
 {
  arabicName : "المنيا",
  isoName : "Minya"
 },
 {
  arabicName : "بني سويف",
  isoName : "Beni Suef"
 },
 {
  arabicName : "القاهرة ",
  isoName : "Cairo"
 },
 {
  arabicName : "الأسكندرية ",
  isoName : "Alexandria"
 },
]
for (let city of cities) {
  let content = `
   <option class = "option"> ${city.arabicName}</option>
  `
  document.getElementById("cities-select").innerHTML += content;
}
document.getElementById("cities-select").addEventListener("change",function(){
  let cityName = " "
  for (let city of cities) {
    if(city.arabicName == this.value){
      cityName = city.isoName;
    }
    getPrayerTimingsOfCity(cityName)

  }
  document.getElementById("city-name").innerHTML= this.value
  
})
function getPrayerTimingsOfCity (cityName){
    let params = {
      country : "EG ",
      city : cityName
    }
    axios.get('http://api.aladhan.com/v1/timingsByCity/:date', {
      params: params
    })
    .then(function (response) {
      let timingsData = response.data.data.timings
      let date =  response.data.data.date.readable;
      let weekDate =response.data.data.date.hijri.weekday.ar;
      let dateContainer = ` ${weekDate} ${date}    `
      timingsFilling("fajer-time",timingsData.Fajr);
      timingsFilling("sherok-time",timingsData.Sunrise);
      timingsFilling("dohur-time",timingsData.Dhuhr);
      timingsFilling("asr-time",timingsData.Asr);
      timingsFilling("maghreb-time",timingsData.Maghrib);
      timingsFilling("isha-time",timingsData.Isha);
      document.getElementById("date-timing").innerHTML = dateContainer;
    })
    
    .catch(function (error) {
      console.log(error);
    })
}
getPrayerTimingsOfCity("Aswan")


  function timingsFilling(id , time) {
    document.getElementById(id).innerHTML = time;
  }
