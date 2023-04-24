(function ($) {
  "use strict";


  if ($(".scroll-to-target").length) {
    $(".scroll-to-target").on("click", function () {
      var target = $(this).attr("data-target");
      // animate
      $("html, body").animate(
        {
          scrollTop: $(target).offset().top
        },
        1000
      );

      return false;
    });
  }

  if ($(".contact-form-validated").length) {
    $(".contact-form-validated").validate({
      // initialize the plugin
      rules: {
        name: {
          required: true
        },
        email: {
          required: true,
          email: true
        },
        message: {
          required: true
        },
        subject: {
          required: true
        }
      },
      submitHandler: function (form) {
        // sending value with ajax request
        $.post(
          $(form).attr("action"),
          $(form).serialize(),
          function (response) {
            $(form).parent().find(".result").append(response);
            $(form).find('input[type="text"]').val("");
            $(form).find('input[type="email"]').val("");
            $(form).find("textarea").val("");
          }
        );
        return false;
      }
    });
  }

  


  function dynamicCurrentMenuClass(selector) {
    let FileName = window.location.href.split("/").reverse()[0];

    selector.find("li").each(function () {
      let anchor = $(this).find("a");
      if ($(anchor).attr("href") == FileName) {
        $(this).addClass("current");
      }
    });
    // if any li has .current elmnt add class
    selector.children("li").each(function () {
      if ($(this).find(".current").length) {
        $(this).addClass("current");
      }
    });
    // if no file name return
    if ("" == FileName) {
      selector.find("li").eq(0).addClass("current");
    }
  }

  if ($(".main-menu__list").length) {
    // dynamic current class
    let mainNavUL = $(".main-menu__list");
    dynamicCurrentMenuClass(mainNavUL);
  }

  if ($(".main-menu").length && $(".mobile-nav__container").length) {
    let navContent = document.querySelector(".main-menu__nav").innerHTML;
    let mobileNavContainer = document.querySelector(".mobile-nav__container");
    mobileNavContainer.innerHTML = navContent;
  }
  if ($(".sticky-header__content").length) {
    let navContent = document.querySelector(".main-menu").innerHTML;
    let mobileNavContainer = document.querySelector(".sticky-header__content");
    mobileNavContainer.innerHTML = navContent;
  }

  if ($(".mobile-nav__container .main-menu__list").length) {
    let dropdownAnchor = $(
      ".mobile-nav__container .main-menu__list .dropdown > a"
    );
    dropdownAnchor.each(function () {
      let self = $(this);
      let toggleBtn = document.createElement("BUTTON");
      toggleBtn.setAttribute("aria-label", "dropdown toggler");
      toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
      self.append(function () {
        return toggleBtn;
      });
      self.find("button").on("click", function (e) {
        e.preventDefault();
        let self = $(this);
        self.toggleClass("expanded");
        self.parent().toggleClass("expanded");
        self.parent().parent().children("ul").slideToggle();
      });
    });
  }

  if ($(".mobile-nav__toggler").length) {
    $(".mobile-nav__toggler").on("click", function (e) {
      e.preventDefault();
      $(".mobile-nav__wrapper").toggleClass("expanded");
      $("body").toggleClass("locked");
    });
  }

  if ($(".search-toggler").length) {
    $(".search-toggler").on("click", function (e) {
      e.preventDefault();
      $(".search-popup").toggleClass("active");
      $(".mobile-nav__wrapper").removeClass("expanded");
      $("body").toggleClass("locked");
    });
  }
  if ($(".mini-cart__toggler").length) {
    $(".mini-cart__toggler").on("click", function (e) {
      e.preventDefault();
      $(".mini-cart").toggleClass("expanded");
      $(".mobile-nav__wrapper").removeClass("expanded");
      $("body").toggleClass("locked");
    });
  }
  if ($(".odometer").length) {
    $(".odometer").appear(function (e) {
      var odo = $(".odometer");
      odo.each(function () {
        var countNumber = $(this).attr("data-count");
        $(this).html(countNumber);
      });
    });
  }

  if ($(".dynamic-year").length) {
    let date = new Date();
    $(".dynamic-year").html(date.getFullYear());
  }

  if ($(".wow").length) {
    var wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: true // act on asynchronously loaded content (default is true)
    });
    wow.init();
  }

  if ($("#donate-amount__predefined").length) {
    let donateInput = $("#donate-amount");
    $("#donate-amount__predefined")
      .find("li")
      .on("click", function (e) {
        e.preventDefault();
        let amount = $(this).find("a").text();
        donateInput.val(amount);
        $("#donate-amount__predefined").find("li").removeClass("active");
        $(this).addClass("active");
      });
  }

  $(".add").on("click", function () {
    if ($(this).prev().val() < 999) {
      $(this)
        .prev()
        .val(+$(this).prev().val() + 1);
    }
  });
  $(".sub").on("click", function () {
    if ($(this).next().val() > 1) {
      if ($(this).next().val() > 1)
        $(this)
          .next()
          .val(+$(this).next().val() - 1);
    }
  });

  if ($(".tabs-box").length) {
    $(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
      e.preventDefault();
      var target = $($(this).attr("data-tab"));

      if ($(target).is(":visible")) {
        return false;
      } else {
        target
          .parents(".tabs-box")
          .find(".tab-buttons")
          .find(".tab-btn")
          .removeClass("active-btn");
        $(this).addClass("active-btn");
        target
          .parents(".tabs-box")
          .find(".tabs-content")
          .find(".tab")
          .fadeOut(0);
        target
          .parents(".tabs-box")
          .find(".tabs-content")
          .find(".tab")
          .removeClass("active-tab");
        $(target).fadeIn(300);
        $(target).addClass("active-tab");
      }
    });
  }

  if ($(".range-slider-price").length) {
    var priceRange = document.getElementById("range-slider-price");

    noUiSlider.create(priceRange, {
      start: [30, 150],
      limit: 200,
      behaviour: "drag",
      connect: true,
      range: {
        min: 10,
        max: 200
      }
    });

    var limitFieldMin = document.getElementById("min-value-rangeslider");
    var limitFieldMax = document.getElementById("max-value-rangeslider");

    priceRange.noUiSlider.on("update", function (values, handle) {
      (handle ? $(limitFieldMax) : $(limitFieldMin)).text(values[handle]);
    });
  }

  function thmSwiperInit() {
    let thmSwiperSliders = $(".thm-swiper__slider");
    if (thmSwiperSliders.length) {
      thmSwiperSliders.each(function () {
        let elm = $(this);
        let options = elm.data("swiper-options");
        let thmSwiperSlider = new Swiper(
          elm,
          "object" === typeof options ? options : JSON.parse(options)
        );
      });
    }
  }

  let thmOwlCarousels = $(".thm-owl__carousel");
  if (thmOwlCarousels.length) {
    thmOwlCarousels.each(function () {
      let elm = $(this);
      let options = elm.data("owl-options");
      let thmOwlCarousel = elm.owlCarousel(
        "object" === typeof options ? options : JSON.parse(options)
      );
    });
  }

  let thmOwlNavCarousels = $(".thm-owl__carousel--custom-nav");
  if (thmOwlNavCarousels.length) {
    thmOwlNavCarousels.each(function () {
      let elm = $(this);
      let owlNavPrev = elm.data("owl-nav-prev");
      let owlNavNext = elm.data("owl-nav-next");
      $(owlNavPrev).on("click", function (e) {
        elm.trigger("prev.owl.carousel");
        e.preventDefault();
      });

      $(owlNavNext).on("click", function (e) {
        elm.trigger("next.owl.carousel");
        e.preventDefault();
      });
    });
  }

  // custom coursor
  if ($(".custom-cursor").length) {
    var cursor = document.querySelector(".custom-cursor__cursor");
    var cursorinner = document.querySelector(".custom-cursor__cursor-two");
    var a = document.querySelectorAll("a");

    document.addEventListener("mousemove", function (e) {
      var x = e.clientX;
      var y = e.clientY;
      cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
    });

    document.addEventListener("mousemove", function (e) {
      var x = e.clientX;
      var y = e.clientY;
      cursorinner.style.left = x + "px";
      cursorinner.style.top = y + "px";
    });

    document.addEventListener("mousedown", function () {
      cursor.classList.add("click");
      cursorinner.classList.add("custom-cursor__innerhover");
    });

    document.addEventListener("mouseup", function () {
      cursor.classList.remove("click");
      cursorinner.classList.remove("custom-cursor__innerhover");
    });

    a.forEach((item) => {
      item.addEventListener("mouseover", () => {
        cursor.classList.add("custom-cursor__hover");
      });
      item.addEventListener("mouseleave", () => {
        cursor.classList.remove("custom-cursor__hover");
      });
    });
  }

  // window load event

  $(window).on("load", function () {
    if ($(".preloader").length) {
      $(".preloader").fadeOut();
    }
    thmSwiperInit();

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
    if ($(".post-filter").length) {
      var postFilterList = $(".post-filter li");
      // for first init
      $(".filter-layout").isotope({
        filter: ".filter-item",
        animationOptions: {
          duration: 500,
          easing: "linear",
          queue: false
        }
      });
      // on click filter links
      postFilterList.on("click", function () {
        var Self = $(this);
        var selector = Self.attr("data-filter");
        postFilterList.removeClass("active");
        Self.addClass("active");

        $(".filter-layout").isotope({
          filter: selector,
          animationOptions: {
            duration: 500,
            easing: "linear",
            queue: false
          }
        });
        return false;
      });
    }

    if ($(".post-filter.has-dynamic-filter-counter").length) {
      // var allItem = $('.single-filter-item').length;

      var activeFilterItem = $(".post-filter.has-dynamic-filter-counter").find(
        "li"
      );

      activeFilterItem.each(function () {
        var filterElement = $(this).data("filter");
        var count = $(".filter-layout").find(filterElement).length;
        $(this).append("<sup>[" + count + "]</sup>");
      });
    }
  });

  // window scroll event

  $(window).on("scroll", function () {
    if ($(".stricked-menu").length) {
      var headerScrollPos = 130;
      var stricky = $(".stricked-menu");
      if ($(window).scrollTop() > headerScrollPos) {
        stricky.addClass("stricky-fixed");
      } else if ($(this).scrollTop() <= headerScrollPos) {
        stricky.removeClass("stricky-fixed");
      }
    }
    if ($(".scroll-to-top").length) {
      var strickyScrollPos = 100;
      if ($(window).scrollTop() > strickyScrollPos) {
        $(".scroll-to-top").fadeIn(500);
      } else if ($(this).scrollTop() <= strickyScrollPos) {
        $(".scroll-to-top").fadeOut(500);
      }
    }
  });



$(document).ready(function(){
  $('.rtl-slider').slick({
    centerMode: false,
     autoplay:true,
  autoplaySpeed:1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.rtl-slider-nav'
  });
  $('.rtl-slider-nav').slick({
    centerMode: true,
     autoplay:true,
  autoplaySpeed:1500,
    slidesToShow: 7,
    slidesToScroll: 1,
    vertical: true,
    asNavFor: '.rtl-slider',
    focusOnSelect: true,
    prevArrow: ".thumb-prev",
    nextArrow: ".thumb-next",
  });
});


 $(document).ready(function() {
                    
                    var options = {
                        html: true,
                        trigger: "hover",
                        title: "",
                        //html element
                        //content: $("#popover-content")
                        content: $('[data-name="popover-content"]')
                        //Doing below won't work. Shows title only
                        //content: $("#popover-content").html()
            
                    }
                    var exampleEl = document.getElementById('example')
                    var popover = new bootstrap.Popover(exampleEl, options)
                })



                $(document).ready(function() {
                    
                    var options = {
                        html: true,
                        trigger: "hover",
                        title: "",
                        //html element
                        //content: $("#popover-content")
                        content: $('[data-name="popover-content-2"]')
                        //Doing below won't work. Shows title only
                        //content: $("#popover-content").html()
            
                    }
                    var exampleEl = document.getElementById('example2')
                    var popover = new bootstrap.Popover(exampleEl, options)
                })



                 $(document).ready(function() {
                    
                    var options = {
                        html: true,
                        trigger: "hover",
                        title: "",
                        //html element
                        //content: $("#popover-content")
                        content: $('[data-name="popover-content-3"]')
                        //Doing below won't work. Shows title only
                        //content: $("#popover-content").html()
            
                    }
                    var exampleEl = document.getElementById('example3')
                    var popover = new bootstrap.Popover(exampleEl, options)
                })


                   $(document).ready(function() {
                    
                    var options = {
                        html: true,
                        trigger: "hover",
                        title: "",
                        //html element
                        //content: $("#popover-content")
                        content: $('[data-name="popover-content-4"]')
                        //Doing below won't work. Shows title only
                        //content: $("#popover-content").html()
            
                    }
                    var exampleEl = document.getElementById('example4')
                    var popover = new bootstrap.Popover(exampleEl, options)
                })

                   $(document).ready(function() {
                    
                    var options = {
                        html: true,
                        trigger: "hover",
                        title: "",
                        //html element
                        //content: $("#popover-content")
                        content: $('[data-name="popover-content-5"]')
                        //Doing below won't work. Shows title only
                        //content: $("#popover-content").html()
            
                    }
                    var exampleEl = document.getElementById('example5')
                    var popover = new bootstrap.Popover(exampleEl, options)
                })

                   $(document).ready(function() {
                    
                    var options = {
                        html: true,
                        trigger: "hover",
                        title: "",
                        //html element
                        //content: $("#popover-content")
                        content: $('[data-name="popover-content-6"]')
                        //Doing below won't work. Shows title only
                        //content: $("#popover-content").html()
            
                    }
                    var exampleEl = document.getElementById('example6')
                    var popover = new bootstrap.Popover(exampleEl, options)
                })

})(jQuery);


/*---------------------
    Shuffle JS
--------------------- */
// Portfolio Style 1 
if ($('.shuffle-box').length > 0) {
    var Shuffle = window.Shuffle;
    var myShuffle = new Shuffle(document.querySelector('.shuffle-box'), {
    itemSelector: '.single-shuffle',
    sizer: '.my-sizer-element',
    buffer: 1,
    });

    $('input[name="shuffle-filter"]').on('change', function (evt) {
    var input = evt.currentTarget;
    if (input.checked) {
        myShuffle.filter(input.value);
    }
    });
}



$(document).ready(function () {

    var navListItems = $('div.setup-panel div a'),
            allWells = $('.setup-content'),
            allNextBtn = $('.nextBtn');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
                $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url'],input[type='radio'],select"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-primary').trigger('click');
});