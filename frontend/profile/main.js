$(document).ready(function() {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
  });


 $("#status").click(function(){
     
     $(".btn-color").removeClass("btn-color");
     $("#status").addClass("btn-color");
     $(".show").addClass("hide");
     $(".show").removeClass("show");
     $("#stat").removeClass("hide");
     $("#stat").addClass("show");
     
  });

  $("#vedio").click(function(){
     
    $(".btn-color").removeClass("btn-color");
    $("#vedio").addClass("btn-color");

   document.getElementById("upload").innerHTML="<h1>helllonot</h1>"
 });

 $("#photo").click(function(){
     
    $(".btn-color").removeClass("btn-color");
    $("#photo").addClass("btn-color");
    $(".show").addClass("hide");
    $(".show").removeClass("show");
    $("#pic").removeClass("hide");
    $("#pic").addClass("show");

   
 });