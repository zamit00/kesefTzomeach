/*window.onload = function() {
  var firstLink = document.getElementById("logo"); // קישור "Home"
  firstLink.scrollIntoView({ behavior: 'smooth' });
  
}*/


function hisht(x) {
  window.open(
    x, 
    '_blank', 
    'width=800,height=600,top=100,left=100,resizable=yes,scrollbars=yes'
  );
}





function chng(x){

  x.classList.toggle("change");
  var btn=document.getElementsByClassName('btn');
  Array.from(btn).forEach(element=>{
    if(element.className==="btn"){element.className="btn btna"}
    else{element.className="btn"}
   
    
});
var allDropdowns = document.querySelectorAll('.dropdown-content');
allDropdowns.forEach(function(dropdown) {dropdown.style.display = "none";});
}

function odot(x){
      var elem = document.getElementById("rev");
      var x=document.getElementById("tafrit");
      x.classList.toggle("change");
      var btn=document.getElementsByClassName('btn');
      Array.from(btn).forEach(element=>{
      if(element.className==="btn"){element.className="btn btna"}
      else{element.className="btn"}});
      elem.scrollIntoView({ behavior: 'smooth' });
      
  taf(x);
}


function taf(button) {

  var allDropdowns = document.querySelectorAll('.dropdown-content');
  allDropdowns.forEach(function(dropdown) {
    if (dropdown !== button.nextElementSibling) {
      dropdown.style.display = "none";
      
    }
  });

  var dropdownContent = button.nextElementSibling;
  if (dropdownContent.style.display === "none" || dropdownContent.style.display === "") {
    
    dropdownContent.style.display = "block";  
  } else {
    dropdownContent.style.display = "none";   
  }
  if(window.innerWidth>768){  hover();}
  
}
function hover(){
var dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(function(dropdown) {
  var dropdownContent = dropdown.querySelector('.dropdown-content');

  
  dropdown.addEventListener('mouseover', function() {
    dropdownContent.style.display = 'block';
  });

  
  dropdown.addEventListener('mouseout', function() {
    dropdownContent.style.display = 'none';
  });
});

}
