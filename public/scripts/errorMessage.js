$(document).ready(function() {
  // --- our code goes here ---
  const $submitButton = $('button.btn.btn-success');
  $submitButton.click(function(event) {
    let data = $('form').serializeArray();
    let dataArr = [];
    for(let object of data) {
      dataArr.push(object.value)
    }
    if(new Set(dataArr).size !== dataArr.length) {
      $('.error').show()
      event.preventDefault();
    }
  })

});

