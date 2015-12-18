(function(){

  var range = document.querySelectorAll(".range-control");

  for (i=0; i < range.length; i++) {
    numberField(range[i]);
  }

  function numberField(elements){
    var input = elements.querySelector(".range-control__input");
    var minus = elements.querySelector(".range-control__minus");
    var plus  = elements.querySelector(".range-control__plus");

    plus.addEventListener("tap", function(event){
      event.preventDefault();
      calculate(true);
    });

    minus.addEventListener("tap", function(event){
      event.preventDefault();
      calculate(false);
    });

    function calculate(num){
      var value = parseInt(input.value, 10);

      if (isNaN(value)) {
        value = 0;
      }

      if (num) {
        input.value = (value < 365) ? (value + 1 + " " + "дней") : (value = 365 + " " + "дней");
      }
      else {
        input.value = (value > 0) ? (value - 1 + " " + "дней") : (value = 0 + " " + "дней");
      }
    }
  }

})(),

(function(){

  if (!("FormData" in window) || !("FileReader" in window)) {
    return;
  }

  var form = document.querySelector(".member-form");
  var area = form.querySelector(".imgs__photo-wrap");
  var queue = [];
  var template = document.querySelector("#image-template").innerHTML;


  form.querySelector("#photo-download").addEventListener("change", function(){

    var files = this.files;

    for (var i =0; i < files.length; i++) {
      preview(files[i]);
    }
    this.value = "";

  });

  function preview(file) {
    if (file.type.match(/image.*/)) {
      var reader = new FileReader();

      reader.addEventListener("load", function(event){
        var html = Mustache.render(template, {
                "image": event.target.result,
                "name": file.name
              });

        var div = document.createElement("div");
        div.classList.add("imgs__photo-item");
        div.innerHTML = html;

        area.appendChild(div);

        div.querySelector(".photo__close").addEventListener("click", function(event){
          event.preventDefault();
          removePreview(div);
        });

        queue.push({file: file, div: div}); 
      });



      reader.readAsDataURL(file);
    }
  }

  function removePreview(div) {
    queue = queue.filter(function(element){
      return element.div != div;
    });

    div.parentNode.removeChild(div);
  }

  form.addEventListener("submit", function(event){
    event.preventDefault();

    var data = new FormData(form);

    queue.forEach(function(element){
      data.append("images", element.file);
    });

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

})(),

(function(){
  var toggler = document.querySelector(".header-top__toggle");
  var topActive = document.querySelector(".header-top");
  var menuActive = document.querySelector(".main-menu__list");
  toggler.onclick = function(event){
    event.preventDefault();
    toggler.classList.toggle("header-top__toggle--close");
    menuActive.classList.toggle("main-menu__list--active")
    topActive.classList.toggle("header-top--active");
  }
})();