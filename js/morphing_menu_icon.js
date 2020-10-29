var menu = document.getElementById('menu');
var hamburger = document.getElementById('hamburger');

menu.onclick = function(){
  if(hamburger.classList.contains('active')){
    hamburger.classList.remove('active');
  }
  else {
    hamburger.classList.add('active');
  }
};