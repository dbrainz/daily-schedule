// Updates background colors of text blocks
// Current hour is red, past hours are gray, future hours are green
// Writes current date to page title and header
function updateBlockColors() {
  var currentHour=dayjs().hour();
  $("#page-title").text("Work Day Scheduler-" + dayjs().format('MM/DD/YYYY'))
  $(".display-3").text("Work Day Scheduler - " + dayjs().format('MM/DD/YYYY')) 
  for (let blockNum=9; blockNum<18; blockNum++) {
    if (blockNum<currentHour){
      $("#hour-" + blockNum).addClass("past");
      $("#hour-" + blockNum).removeClass("present future");
    } else if (blockNum==currentHour){
      $("#hour-" + blockNum).addClass("present");
      $("#hour-" + blockNum).removeClass("past future");
    } else {
      $("#hour-" + blockNum).addClass("future");
      $("#hour-" + blockNum).removeClass("past present");
    }
  }
}

// Load block text from local storage if anything is stored there
function loadBlockText(){
  for (let blockNum=9; blockNum<18; blockNum++) {
    loadText = localStorage.getItem("ds-hour" + blockNum)
    if (loadText!== null) {
      $("#text-" + blockNum).val(loadText)
    }
  }
}

$(function () {

  updateBlockColors();
  loadBlockText();

  const interval = setInterval(updateBlockColors, 1000);

  $(".saveBtn").on("click",function(){
    hourToSave = $(this).prev().attr("id").substr(5)
    textToSave = $(this).prev().val()
    localStorage.setItem("ds-hour" + hourToSave, textToSave)
  })
});

