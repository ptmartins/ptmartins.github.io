// DOM Caching
const range = document.getElementById('range'),
      text = document.querySelector('.progress-text'), 
      bar = document.getElementById('bar'); 

range.addEventListener('input', changeValue);

function changeValue(e) {
  let value = e.target.value;
  text.innerText = value + '%';  
  bar.style.width = value + "%";       
}