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
})(),

(function(){

  if (!("FormData" in window)) {
    return;
  }

  var form = document.querySelector(".member-form");
  var btnClose = document.querySelectorAll(".photo__close");

  if ("FileReader" in window) {
    form.querySelector("#photo-download").addEventListener("change", function(){

      var files = this.files;

      for(var i =0; i < files.length; i++) {
        preview(files[i]);
      }

    });

    function preview(file) {
      var area = document.querySelector(".imgs__photo-wrap");
      if (file.type.match(/image.*/)) {
        var reader = new FileReader();

        reader.addEventListener("load", function(event){
          var imgItem = document.createElement("div");
          var figure = document.createElement("figure");
          var img = document.createElement("img");
          var figcapt = document.createElement("figcaption");
          var btnPhoto = document.createElement("button");

          imgItem.classList.add("imgs__photo-item");
          figure.classList.add("photo");
          img.src = event.target.result;
          img.alt = file.name;
          figcapt.classList.add("photo__title");
          figcapt.innerHTML = file.name.slice(0, 5)+file.name.slice(-4);
          btnPhoto.classList.add("photo__close");

          area.appendChild(imgItem);
          imgItem.appendChild(figure);
          figure.appendChild(img);
          figure.appendChild(figcapt);
          imgItem.appendChild(btnPhoto);
        });



        reader.readAsDataURL(file);
      }
    }
  }

  // [].forEach.call(btnClose, function(close){
  //   close.addEventListener("click", function(event){
  //     event.preventDefault();
  //     area.removeChild(imgItem);
  //   });
  // });

  form.addEventListener("submit", function(event){
    event.preventDefault();

    var data = new FormData(form);

    request(data, function(response){
      console.log(response);
    });
  });

  function request(data, fn){
    var xhr = new XMLHttpRequest;
    var time = (new Date()).getTime();

    xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);
    xhr.addEventListener("readystatechange", function(){
      if (xhr.readyState == 4) {
        fn(xhr.responseText);
      }
    });

    xhr.send(data);
  }


})();