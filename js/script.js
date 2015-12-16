(function(){

  var minus       = document.querySelectorAll(".range-control__minus");
  var plus        = document.querySelectorAll(".range-control__plus");
  var rangeInput  = document.querySelectorAll(".range-control__input");

  var parsedInput1 = parseInt(rangeInput[0].value, 10);
  var parsedInput2 = parseInt(rangeInput[1].value, 10);
  var output1 = rangeInput[0];
  var output2 = rangeInput[1];

  minus[0].addEventListener("click", function(event){
    event.preventDefault();
    if (parsedInput1 > 0) output1.value = parsedInput1-- + ' ' + 'дней';
  });

  plus[0].addEventListener("click", function(event){
    event.preventDefault();
    (parsedInput1 < 365)?   output1.value = parsedInput1++ + ' ' + 'дней' :
                                      alert("Не более 365 дней");
  });


  minus[1].addEventListener("click", function(event){
    event.preventDefault();
    if (parsedInput2 > 0) output2.value = parsedInput2-- + ' ' + 'чел';
  });

  plus[1].addEventListener("click", function(event){
    event.preventDefault();
    (parsedInput2 < 50)?  output2.value = parsedInput2++ + ' ' + 'чел' :
                          alert("Не более 50 человек");
  });

  output1.addEventListener("change", function(){
    if (isNaN(output1.value)) alert("Введите число");
  });
})();