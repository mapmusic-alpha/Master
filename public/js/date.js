/*






//select the buttons 

const timefilter = document.getElementById("timefilter")
const days = timefilter.getElementsByTagName("button")
console.log(days)

//getDates
function getDayOne(){
  const dayOneAsLocalTimeString = new Date().toLocaleDateString()
  const end = dayOneAsLocalTimeString.lastIndexOf(".")
  var dayOneWithoutYear = dayOneAsLocalTimeString.slice(0, end)
  return dayOneWithoutYear
}



function getDayTwo(){
  const dayOne = new Date()
  
  const dayTwo = new Date(dayOne)
  dayTwo.setDate(dayOne.getDate() + 1)
  
  const dayTwoAsLocalTimeString = dayTwo.toLocaleDateString()
  const end = dayTwoAsLocalTimeString.lastIndexOf(".")
  const dayTwoWithoutYear = dayTwoAsLocalTimeString.slice(0, end)
  return dayTwoWithoutYear
  
}



function getDayThree(){
  const dayOne = new Date()
  
  const dayThree = new Date(dayOne)
  dayThree.setDate(dayOne.getDate() + 2)
  
  const dayThreeAsLocalTimeString = dayThree.toLocaleDateString()
  const end = dayThreeAsLocalTimeString.lastIndexOf(".")
  const dayThreeWithoutYear = dayThreeAsLocalTimeString.slice(0, end)
  return dayThreeWithoutYear
}


function getDayFour(){
  const dayOne = new Date()
  
  const dayFour = new Date(dayOne)
  dayFour.setDate(dayOne.getDate() + 3)
  
  const dayFourAsLocalTimeString = dayFour.toLocaleDateString()
  const end = dayFourAsLocalTimeString.lastIndexOf(".")
  const dayFourWithoutYear = dayFourAsLocalTimeString.slice(0, end)
  return dayFourWithoutYear
}


function getDayFive(){
  const dayOne = new Date()
  
  const dayFive = new Date(dayOne)
  dayFive.setDate(dayOne.getDate() + 4)
  
  const dayFiveAsLocalTimeString = dayFive.toLocaleDateString()
  const end = dayFiveAsLocalTimeString.lastIndexOf(".")
  const dayFiveWithoutYear = dayFiveAsLocalTimeString.slice(0, end)
  return dayFiveWithoutYear
}


function getDaySix(){
  const dayOne = new Date()
  
  const daySix = new Date(dayOne)
  daySix.setDate(dayOne.getDate() + 5)
  
  const daySixAsLocalTimeString = daySix.toLocaleDateString()
  const end = daySixAsLocalTimeString.lastIndexOf(".")
  const daySixWithoutYear = daySixAsLocalTimeString.slice(0, end)
  return daySixWithoutYear
}

function getDaySeven(){
   const dayOne = new Date()
  
  const daySeven = new Date(dayOne)
  daySeven.setDate(dayOne.getDate() + 6)
  
  const daySevenAsLocalTimeString = daySeven.toLocaleDateString()
  const end = daySevenAsLocalTimeString.lastIndexOf(".")
  const daySevenWithoutYear = daySevenAsLocalTimeString.slice(0, end)
  return daySevenWithoutYear
}


//get Dates in button

document.getElementById("one").innerHTML = getDayOne()
document.getElementById("two").innerHTML = getDayTwo()
document.getElementById("three").innerHTML = getDayThree()
document.getElementById("four").innerHTML = getDayFour()
document.getElementById("five").innerHTML = getDayFive()
document.getElementById("six").innerHTML = getDaySix()
document.getElementById("seven").innerHTML = getDaySeven()


//add on click events => return date & visual feedbak(not done)

for (let day of days){
  day.addEventListener("click", function() {
     console.log(day.innerHTML)
    day.classList.toggle("activeDate")
  })
}
*/
