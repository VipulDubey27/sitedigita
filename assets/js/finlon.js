(function ($) {
  "use strict";


  if ($(".wow").length) {
    var wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: true // act on asynchronously loaded content (default is true)
    });
    wow.init();
  }





  
  // window load event

  $(window).on("load", function () {
    if ($(".preloader").length) {
      $(".preloader").fadeOut();
    }
    // thmSwiperInit();

    // if ($(".circle-progress").length) {
    //   $(".circle-progress").appear(function () {
    //     let circleProgress = $(".circle-progress");
    //     circleProgress.each(function () {
    //       let progress = $(this);
    //       let progressOptions = progress.data("options");
    //       progress.circleProgress(progressOptions);
    //     });
    //   });
    // }

    

  });

  // window scroll event


$("#typed").typed({
      strings: ["<strong> The future of business is digital :- </strong> As technology continues to advance and become more pervasive, businesses will need to adapt and evolve to remain competitive and relevant in the market. This involves embracing and leveraging digital technologies to improve operations, create new revenue streams, and deliver better experiences to customers.", "<strong>You can't delegate digital transformation for your company :-</strong> Where it should be holistic change that needs to be embraced and driven by the entire company, including its leadership", "<strong>Digital transformation is not about technology-it's about change :-</strong> while technology is a critical enabler of digital transformation, it is not the sole focus. The essence of digital transformation lies in embracing change and adapting to evolving customer expectations, market conditions, and business models."],
      typeSpeed: 10,
      startDelay: 0,
      backSpeed: -9000,
      backDelay: 2000,
      loop: true,
      cursorChar: "",
      contentType: 'html'
    });






})(jQuery);




$(".ashade-aside-toggler").click(function(){
  $("body").toggleClass("ashade-aside-shown");
});



$(".ashade-aside-close").click(function(){
  $("body").removeClass("ashade-aside-shown");
});
// function isVisible($el) {
//   var winTop = $(window).scrollLeft();
//   var winBottom = winTop + $(window).height();
//   var elTop = $el.offset().top;
//   var elBottom = elTop + $el.height();
//   return ((elBottom<= winBottom) && (elTop >= winTop));
// }
// $(function() {
//   $("#msg").addClass('hide');
//   $(window).scrollLeft(function() {
//      $("#msg").addClass('show');
//   });
// });



// new js 

//      (function() {

//   var quotes = $(".textShowEf");
//   var quoteIndex = -1;

//   function showNextQuote() {
//     ++quoteIndex;
//     quotes.eq(quoteIndex % quotes.length)
//       .fadeIn(2000)
//       .delay(100)
//       .fadeOut(2000, showNextQuote);
//   }

//   showNextQuote();

// })(); 


    

var redBoxHandler = setInterval(function() {
  if(!isElementOutViewport(document.querySelector(".showBox"))){
 // document.querySelector(".red.box").style.border = "2px solid black";
   $("#typedEnd").typed({
      strings: ["at last Digital transformation is a comprehensive process that affects various aspects of a business"],
      typeSpeed: 10,
      startDelay: 0,
      backSpeed: 1,
      backDelay: 2000,
      // loop: true,
      loop: true,
      cursorChar: "",
      contentType: 'html'
    }); 
  }
  else{
     // document.querySelector(".red.box").style.border = "2px solid white";
    //     $("#typedEnd").typed({
    //   strings: ["at last Digital transformation is a comprehensive process that affects various aspects of a business"],
   
    //   typeSpeed: 10,
    // }); 
  
  }
   
}, 500);


function isElementOutViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.bottom < 0 ||
    rect.right < 0 ||
    rect.left > window.innerWidth ||
    rect.top > window.innerHeight
  );
}



// $('.destruct').hover(function() {
//   var bodyWidth = document.body.clientWidth
//   var bodyHeight = document.body.clientHeight;
//   var randPosX = Math.floor((Math.random()*bodyWidth));
//   var randPosY = Math.floor((Math.random()*bodyHeight));
//   var posLog = document.getElementById('pos_log');
//   var posXY = 'x: ' + randPosX + '<br />' + 'y: ' + randPosY;
  
//   $('#rand_pos').css('left', randPosX);
//   $('#rand_pos').css('top', randPosY);
  
//   posLog.innerHTML = posXY
// });




// (function makeDiv(){
//     var divsize = ((Math.random()*100) + 50).toFixed();
//     var color = '#'+ Math.round(0xffffff * Math.random()).toString(16);
//     $newdiv = $('<div/>').addClass("destruct").css({
       
//     });
    
//     var posx = (Math.random() * ($(document).width() - divsize)).toFixed();
//     var posy = (Math.random() * ($(document).height() - divsize)).toFixed();
    
//     $newdiv.css({
//         'position':'absolute',
//         'left':posx+'px',
//         'top':posy+'px',
//         'display':'none'
//     }).appendTo( '.messagesBoxSection' ).fadeIn(500, function(){
//        // makeDiv(); 
//     }); 

//           $( ".destruct" ).hover(
// //   function() {
// //     // $( this ).css({display: 'none'});
// //      //$(this).remove();
// //      let ths = this;
// //      setTimeout(function() { $(ths).remove() }, 2100);
// //     // setTimeout(function() {$(this).remove();}, 2000);
// //   }
// // );
// })();












