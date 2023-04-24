    <!-- about bg -->
    <!-- <canvas id="spiral-buffer-kingdom"
      class="aboutBgArea"></canvas> -->
    <!-- ./about bg -->
  <?php  $message = $this->session->flashdata('error'); ?>

<?php ini_set('memory_limit','256M');?>
    <!-- main area -->
    <section class="mainAreaSection" >
      <!-- What We Do Start -->
      <div class="ServiceTop container mt-150">
        <div class="row">
          <div class="serHead col-lg-9 wow fadeInLeft"  data-wow-delay="000ms" data-wow-duration="1500ms">
            <h1>Contact Us</h1>
            <p>Our team will be delighted to help you with your inquiries. Fill the form below somebody from our group will contact you as quickly as possible!
            </p>
          </div>
        </div>
      </div>
      <!-- What We Do End -->



      <!-- WEBSITES Area start-->
      <div class="ServiceTop container mt-100 contactForm">
        <div class="row">
          <div class="col-lg-4 wow pulse"  data-wow-delay="000ms" data-wow-duration="1500ms">
       <div class="ashade-contact-details">
              <h4 class="ashade-contact-details__title">
                <span>Contacts and Socials</span>
                Find Me
              </h4>
              <ul class="ashade-contact-details__list">
                <li>
                  <i class="ashade-contact-icon la la-map-marker"></i>
                  B-1, Nearest Metro Station<br> Sarita Vihar, Exit from Gate No : 1<br> New Delhi-110044
                </li>
                <li>
                  <i class="ashade-contact-icon la la-phone"></i>
                  <a href="tel:+919289134393">+91-9289134393</a>
                </li>
                <li>
                  <i class="ashade-contact-icon la la-envelope"></i>
                  <a href="mailto:info@adgonline.in">info@adgonline.in</a>
                </li>
              </ul>
              <div class="flagArea mt-3">
                <img src="<?= base_url(); ?>assets/front/img/india-flag.jpg">
                <img src="<?= base_url(); ?>assets/front/img/us_flag.jpg">
                <img src="<?= base_url(); ?>assets/front/img/cn_flag.jpg">
                </div>
            </div> 
          </div>
          <div class="col-lg-8 wow pulse"  data-wow-delay="000ms" data-wow-duration="1500ms">
          

<form id="contact_submit" action="contactus" method="post" >
<!-- <?php //echo validation_errors(); ?>   -->
<?php  if(isset($_SESSION['msg']) && $_SESSION['msg']== true )
                  { ?>
                     <div id="sucessmessage" style="background: #c9f3c7; color: #858383; font-size: 15px; padding: 5px 10px; margin-bottom: 10px; border: 1px solid #49f147; "> Thanks for contacting us.. we'll contact you soon!!!</div>
                 <?php  unset($_SESSION['msg']); }
                  ?>

<?php  if($message)
                  { ?>
                     <div id="sucessmessage" style="background: #ed1c1c; color: #FFF; font-size: 15px; padding: 5px 10px; margin-bottom: 10px; border: 1px solid #ed1c1c; "><?=$message?></div>
                 <?php  unset($_SESSION['msg']); }
                  ?>
                          <div class="row">
                
                <input type="hidden" name="_token" value="<?=rand(11111111,9999999999)?>"> 

                 <div class="ashade-col col-lg-4 position-relative">
                  <input type="text"  name="name" placeholder="Your Name *" value="" required>
                  <?php  echo form_error('name'); ?>
                                  </div>


                <div class="ashade-col col-lg-4 position-relative">
                  <input type="email"  name="email" placeholder="Your Email *" value="" required>
                  <?php  echo form_error('email'); ?>
                                  </div>


                <div class="ashade-col col-lg-4 position-relative">
                  <input type="number"  name="phone_no" placeholder="Your Phone *" value="" required>
                 <?php  echo form_error('phone_no'); ?>

                                  </div>


              </div>
              <div class="position-relative">
              <textarea name="message"  placeholder="Your Message *" style="height: 150px"></textarea>
                        </div>

                        <div class="captcha position-relative">
              <input id="captcha" type="text" class="form-control" placeholder="Enter Captcha *" name="cap_image">
              <?php  echo form_error('cap_image'); ?>
              <span id='caprel'><?=$cap_image ?></span>
              
              <button type="button"  class="btn btn-danger" class="reload" id="reload">
                &#x21bb;
              </button>
                          </div>
                          <div class="clearfix"></div>

          
              <div class=" ">
                
                <div class=" ">
                  <input type="submit" name="save"  id="submit" class="btn btnSend" value="Send data"/>
                </div>
              </div>
            </form>


            
          </div>
        </div>
      </div>
      <!-- WEBSITES Area end-->




  
      <section class="ashade-section mt-5">
  <div class="container">
        <div class="row">
          <div class="col-lg-4">
            <div class="ashade-contact-details">
              <h4 class="ashade-contact-details__title">
                <span>Branches Office Faridabad </span>
                 INDIA
              </h4>
              <ul class="ashade-contact-details__list">
                <li>
                  <i class="ashade-contact-icon la la-map-marker"></i>
                  103, 104, 105 Eros Plaza, Charmwood Village, Surajkund, Faridabad, Haryana 121009
                </li>
                <li>
                  <i class="ashade-contact-icon la la-phone"></i>
                  <a href="tel:+919289431392">+91-9289431392</a>
                </li>
                <li>
                  <i class="ashade-contact-icon la la-envelope"></i>
                  <a href="mailto:info@adgonline.in">info@adgonline.in</a>
                </li>
              </ul>
              
            </div><!-- .ashade-contact-details -->
          </div><!-- .ashade-col -->

          <div class="col-lg-4">
            <div class="ashade-contact-details">
              <h4 class="ashade-contact-details__title">
                <span>Branches Office</span>
                UNITED STATES
              </h4>
              <ul class="ashade-contact-details__list">
                <li>
                  <i class="ashade-contact-icon la la-map-marker"></i>
                  9433 238th St. Floral Park, NY 11001
                </li>
                <li>
                  <i class="ashade-contact-icon la la-phone"></i>
                  <a href="tel:+19175999455">+1 (917) 599-9455</a>
                </li>
                <li>
                  <i class="ashade-contact-icon la la-envelope"></i>
                  <a href="mailto:info@adgonline.in">info@adgonline.in</a>
                </li>
              </ul>
              
            </div><!-- .ashade-contact-details -->
          </div><!-- .ashade-col -->

          <div class="col-lg-4">
            <div class="ashade-contact-details">
              <h4 class="ashade-contact-details__title">
                <span>Branches Office</span>
                CANADA
              </h4>
              <ul class="ashade-contact-details__list">
                <li>
                  <i class="ashade-contact-icon la la-map-marker"></i>
                  Park Place, 666 Burrard St Suite 500, Vancouver, BC V6C 3P6, Canada
                </li>
                <li>
                  <i class="ashade-contact-icon la la-phone"></i>
                  <a href="tel:+19175999455">+1 (917) 599-9455/56/57</a>
                </li>
                <li>
                  <i class="ashade-contact-icon la la-envelope"></i>
                  <a href="mailto:info@adgonline.in">info@adgonline.in</a>
                </li>
              </ul>
              
            </div><!-- .ashade-contact-details -->
          </div><!-- .ashade-col -->
          
        </div><!-- .ashade-row -->
</div>

      </section>







      <!-- we are ready start -->
      <section class="weAreReady mt-100">
      <div class="weAreReady-svg"> 
        <svg width="1049.1"
          height="108.15"
          viewBox="0 0 1049.1 108.15"
          xmlns="http://www.w3.org/2000/svg">
          <g id="svgGroup"
            stroke-linecap="round"
            fill-rule="evenodd"
            font-size="9pt"
            stroke="#000"
            stroke-width="0.25mm"
            fill="none"
            style="stroke:#000;stroke-width:0.25mm;fill:none">
            <path
              d="M 46.2 106.35 L 28.5 106.35 L 0 4.8 L 14.1 0.3 L 37.8 91.2 L 60.15 12.3 L 78 12.3 L 100.2 91.2 L 123.75 0.75 L 136.95 4.8 L 108.6 106.35 L 90.9 106.35 L 68.7 27.45 L 46.2 106.35 Z"
              id="0"
              vector-effect="non-scaling-stroke" />
            <path
              d="M 215.7 106.35 L 152.7 106.35 L 152.7 1.35 L 215.7 1.35 L 215.7 13.65 L 166.95 13.65 L 166.95 45.6 L 208.95 45.6 L 208.95 57.6 L 166.95 57.6 L 166.95 94.05 L 215.7 94.05 L 215.7 106.35 Z"
              id="1"
              vector-effect="non-scaling-stroke" />
            <path
              d="M 366.15 102.6 L 353.1 107.85 L 341.4 77.85 L 292.8 77.85 L 281.1 107.55 L 268.95 102.6 L 310.05 1.35 L 325.65 1.35 L 366.15 102.6 Z M 317.1 15.45 L 297.3 65.85 L 336.75 65.85 L 317.1 15.45 Z"
              id="3"
              vector-effect="non-scaling-stroke" />
            <path
              d="M 455.7 101.85 L 442.35 108.15 L 429.3 79.65 Q 425.391 71.239 419.89 66.664 A 24.316 24.316 0 0 0 416.85 64.5 A 29.478 29.478 0 0 0 408.599 61.196 Q 404.912 60.299 400.597 60.075 A 56.771 56.771 0 0 0 397.65 60 L 395.4 60 L 395.4 106.35 L 381.15 106.35 L 381.15 1.65 A 371.851 371.851 0 0 1 392.695 0.736 A 323.669 323.669 0 0 1 396.375 0.525 A 281.911 281.911 0 0 1 405.85 0.203 A 339.402 339.402 0 0 1 411.9 0.15 Q 431.1 0.15 440.775 7.95 Q 450.43 15.734 450.45 27.999 A 31.288 31.288 0 0 1 450.45 28.05 A 29.82 29.82 0 0 1 449.474 35.88 A 22.008 22.008 0 0 1 443.925 45.675 A 31.534 31.534 0 0 1 436.539 51.191 Q 431.634 53.897 425.1 55.65 A 35.485 35.485 0 0 1 430.243 58.444 A 30.641 30.641 0 0 1 432.3 59.925 Q 435.253 62.245 438.008 66.015 A 43.941 43.941 0 0 1 438.375 66.525 A 46.667 46.667 0 0 1 440.579 69.967 Q 442.425 73.125 444.3 77.25 L 455.7 101.85 Z M 395.4 12.75 L 395.4 48 L 411.9 48 Q 422.7 48 429.45 43.2 Q 436.2 38.4 436.2 29.4 A 14.717 14.717 0 0 0 431.29 18.204 A 19.909 19.909 0 0 0 429.9 17.025 A 20.884 20.884 0 0 0 423.354 13.692 Q 418.481 12.15 411.9 12.15 A 298.818 298.818 0 0 0 407.349 12.183 Q 404.902 12.22 402.75 12.3 Q 398.7 12.45 395.4 12.75 Z"
              id="4"
              vector-effect="non-scaling-stroke" />
            <path
              d="M 536.7 106.35 L 473.7 106.35 L 473.7 1.35 L 536.7 1.35 L 536.7 13.65 L 487.95 13.65 L 487.95 45.6 L 529.95 45.6 L 529.95 57.6 L 487.95 57.6 L 487.95 94.05 L 536.7 94.05 L 536.7 106.35 Z"
              id="5"
              vector-effect="non-scaling-stroke" />
            <path
              d="M 676.5 101.85 L 663.15 108.15 L 650.1 79.65 Q 646.191 71.239 640.69 66.664 A 24.316 24.316 0 0 0 637.65 64.5 A 29.478 29.478 0 0 0 629.399 61.196 Q 625.712 60.299 621.397 60.075 A 56.771 56.771 0 0 0 618.45 60 L 616.2 60 L 616.2 106.35 L 601.95 106.35 L 601.95 1.65 A 371.851 371.851 0 0 1 613.495 0.736 A 323.669 323.669 0 0 1 617.175 0.525 A 281.911 281.911 0 0 1 626.65 0.203 A 339.402 339.402 0 0 1 632.7 0.15 Q 651.9 0.15 661.575 7.95 Q 671.23 15.734 671.25 27.999 A 31.288 31.288 0 0 1 671.25 28.05 A 29.82 29.82 0 0 1 670.274 35.88 A 22.008 22.008 0 0 1 664.725 45.675 A 31.534 31.534 0 0 1 657.339 51.191 Q 652.434 53.897 645.9 55.65 A 35.485 35.485 0 0 1 651.043 58.444 A 30.641 30.641 0 0 1 653.1 59.925 Q 656.053 62.245 658.808 66.015 A 43.941 43.941 0 0 1 659.175 66.525 A 46.667 46.667 0 0 1 661.379 69.967 Q 663.225 73.125 665.1 77.25 L 676.5 101.85 Z M 616.2 12.75 L 616.2 48 L 632.7 48 Q 643.5 48 650.25 43.2 Q 657 38.4 657 29.4 A 14.717 14.717 0 0 0 652.09 18.204 A 19.909 19.909 0 0 0 650.7 17.025 A 20.884 20.884 0 0 0 644.154 13.692 Q 639.281 12.15 632.7 12.15 A 298.818 298.818 0 0 0 628.149 12.183 Q 625.702 12.22 623.55 12.3 Q 619.5 12.45 616.2 12.75 Z"
              id="7"
              vector-effect="non-scaling-stroke" />
            <path
              d="M 757.5 106.35 L 694.5 106.35 L 694.5 1.35 L 757.5 1.35 L 757.5 13.65 L 708.75 13.65 L 708.75 45.6 L 750.75 45.6 L 750.75 57.6 L 708.75 57.6 L 708.75 94.05 L 757.5 94.05 L 757.5 106.35 Z"
              id="8"
              vector-effect="non-scaling-stroke" />
            <path
              d="M 862.95 102.6 L 849.9 107.85 L 838.2 77.85 L 789.6 77.85 L 777.9 107.55 L 765.75 102.6 L 806.85 1.35 L 822.45 1.35 L 862.95 102.6 Z M 813.9 15.45 L 794.1 65.85 L 833.55 65.85 L 813.9 15.45 Z"
              id="9"
              vector-effect="non-scaling-stroke" />
            <path
              d="M 877.95 106.05 L 877.95 1.65 Q 885 0.9 891.75 0.525 Q 898.5 0.15 907.2 0.15 A 72.912 72.912 0 0 1 918.216 0.94 Q 924.96 1.971 930.525 4.35 Q 940.35 8.55 946.725 15.9 Q 953.1 23.25 956.175 32.925 A 66.384 66.384 0 0 1 959.133 49.418 A 77.259 77.259 0 0 1 959.25 53.7 A 67.963 67.963 0 0 1 957.028 71.246 A 62.703 62.703 0 0 1 956.1 74.4 Q 952.95 84.15 946.425 91.575 Q 939.9 99 929.775 103.275 A 51.535 51.535 0 0 1 918.656 106.481 Q 913.452 107.4 907.513 107.529 A 90.289 90.289 0 0 1 905.55 107.55 A 280.47 280.47 0 0 1 899.443 107.487 Q 896.422 107.421 893.733 107.286 A 152.251 152.251 0 0 1 890.625 107.1 Q 884.25 106.65 877.95 106.05 Z M 892.2 13.2 L 892.2 94.35 A 65.35 65.35 0 0 0 897.094 94.856 A 73.924 73.924 0 0 0 898.8 94.95 Q 902.25 95.1 906 95.1 Q 919.5 95.1 928.05 89.85 Q 936.6 84.6 940.65 75.225 A 48.437 48.437 0 0 0 944.032 63.114 A 63.753 63.753 0 0 0 944.7 53.7 A 50.858 50.858 0 0 0 940.65 33.45 Q 936.6 24 928.2 18.225 Q 920.335 12.818 908.394 12.473 A 57.012 57.012 0 0 0 906.75 12.45 A 147.347 147.347 0 0 0 902.587 12.506 A 111.296 111.296 0 0 0 898.8 12.675 Q 895.2 12.9 892.2 13.2 Z"
              id="10"
              vector-effect="non-scaling-stroke" />
            <path
              d="M 1012.95 106.35 L 998.7 106.35 L 998.7 66.45 L 962.25 7.2 L 974.25 0 L 1006.35 53.25 L 1037.85 0.6 L 1049.1 7.2 L 1012.95 66.45 L 1012.95 106.35 Z"
              id="11"
              vector-effect="non-scaling-stroke" />
          </g>
        </svg>
      </div> 
        <div class="weAreReady-par">
        <h4>to transform your digital landscape </h4>
        <h3>and exceed your expectations</h3>
      </div>
      <div class="banner">
        <a href="contactus" class="butn butn__new"><span>Contact Us</span></a>
      </div>
      </section>
      <!-- we are ready end -->



<!-- <script type="text/javascript">
    $(document).ready(function(){
     
      $('#reload').click(function(e){
        e.preventDefault();
          $.ajax({
          url: "http://localhost/new-adgonline/home/reload_captcha",
          method : "GET", 
          dataType:'json',
          success: function(res){
            $('#caprel').html(res.data.image)
          }
        });
       
      });
    });
</script> -->