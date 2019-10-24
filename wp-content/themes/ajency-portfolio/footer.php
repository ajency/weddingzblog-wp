<footer id="footer">
    <section class="footer-section">
        <div class="container p5">
            <div class="row">
                <div class="col-xl-2 contact-us">
                </div>
                <div class="col-xl-8">
                    <div class="row no-gutters">
                        <div class="col-md-4 contact-details">
                            <h4 class="font-weight-light">
                                <a class=" d-block h4 font-weight-light" href="tel:09975931402" onclick="ga('send', 'event', 'telephone', 'CallNow', 'tel:09975931402');">
                                    +91 99759 31402
                                </a>
                            </h4>
                            <h4 class="font-weight-light">
                                <a class="d-block h4 font-weight-light" href="mailto:talktous@ajency.in" onclick="ga('send', 'event', 'footerid', 'Contact', 'Footer - talktous@ajency.in');">
                                    talktous@ajency.in
                                </a>
                                <br/>
                                <span class="h5">
                                    Career Opportunities:
                                </span>
                                <a class=" d-block h4 font-weight-light" href="mailto:workwithus@ajency.in">
                                    workwithus@ajency.in
                                </a>
                            </h4>
                        </div>
                        <div class="col-md-5 mt-5 mt-md-0 contact-details">
                            <h4 class="font-weight-light w-75">
                                Panjim Convention Center, Panjim. Goa, India.
                                <a class=" font-weight-light h5 " href="https://goo.gl/maps/qmCNWotzNhC2" target="_blank">
                                    (Map)
                                </a>
                            </h4>
                        </div>
                        <div class="col-md-3 mt-5 mt-md-0 contact-details-1">
                            <h4 class="font-weight-light">
                                <a class="d-block h4 font-weight-light" href="https://www.facebook.com/Ajency.in/">
                                    Facebook
                                </a>
                            </h4>
                            <h4 class="font-weight-light">
                                <a class="d-block h4 font-weight-light" href="https://www.linkedin.com/company/ajency-in">
                                    Linkedin
                                </a>
                            </h4>
                        </div>
                    </div>
                    <div class="mt-5">
                        (C) 2018 Digital Dwarves Pvt Ltd. All Right Reserved
                    </div>
                </div>
            </div>
        </div>
    </section>
</footer>
<div class="modal fade" id="imagemodal" tabindex="-1" role="dialog" aria-labelledby="..." aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <img src="" class="imagepreview" style="width: 100%;" >
      </div>
    </div>
  </div>
</div>

<?php if (!is_page_template('archive.php') && !is_singular('post') && !is_page_template('template-blogs.php') && !is_page_template('template-fullwidth.php') ) { ?>
    <noscript id="deferred-styles">
        <link href="<?php echo get_template_directory_uri(); ?>/css/custom.css" rel="stylesheet" type="text/css"/>
        <link href="<?php echo get_bloginfo('url');  ?>/wp-content/themes/ajency-portfolio/style.css" rel="stylesheet" type="text/css"/>
         <!--<link href="<?php echo get_template_directory_uri(); ?>/css/zoom.css" rel="stylesheet" type="text/css"/>-->
        <!--  <link rel="stylesheet" type="text/css" href="http://filamentgroup.github.io/enlarge/src/enlarge.css">-->
    </noscript>
    <script>
        var loadDeferredStyles = function() {
            var addStylesNode = document.getElementById("deferred-styles");
            var replacement = document.createElement("div");
            replacement.innerHTML = addStylesNode.textContent;
            document.body.appendChild(replacement)
            addStylesNode.parentElement.removeChild(addStylesNode);
          };
          var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
          if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
          else window.addEventListener('load', loadDeferredStyles);
          var react_js_file_hashes = <?php echo file_get_contents(get_template_directory_uri() . '/react_file_hash.json'); ?>;
    </script>
<?php } ?>
<link crossorigin="anonymous" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" rel="stylesheet"/>
<?php if (!is_page_template('template-fullwidth.php')) { ?>
     <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<?php } ?>
<script type="text/javascript">
    window.lazySizesConfig = window.lazySizesConfig || {};
      lazySizesConfig.loadMode = 3;
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/animation.gsap.js" type="text/javascript"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js"></script>

<script>
    // init controller
    var controller = new ScrollMagic.Controller();
    var controller2 = new ScrollMagic.Controller();
</script>

<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.scrollify.js" type="text/javascript"></script>

<script src="<?php echo get_template_directory_uri(); ?>/js/combine.js" type="text/javascript">
</script>
<script src="<?php echo get_template_directory_uri(); ?>/js/custom.js" type="text/javascript">
</script>

<script src="https://www.gstatic.com/firebasejs/7.2.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.2.1/firebase-auth.js"></script>
<script>
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyC-w19gW41OaoyjuK4jHPVN5JtviKGB7KQ",
        authDomain: "project-ggb-dev.firebaseapp.com",
        databaseURL: "https://project-ggb-dev.firebaseio.com",
        projectId: "project-ggb-dev",
        storageBucket: "project-ggb-dev.appspot.com",
        messagingSenderId: "1034785903670",
        appId: "1:1034785903670:web:496c7762259b7fb3b9f497"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
</script>


<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/view-cart.js?_3" type="text/javascript"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/add-to-cart.js?_3" type="text/javascript"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/gps-modal-prompt.js?_3" type="text/javascript"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/sign-in.js?_3" type="text/javascript"></script>

<script type="text/javascript">
    if ($(window).innerWidth() < 767) {
        // build scene
        var scene = new ScrollMagic.Scene({
                            triggerElement: ".trigger1", 
                            triggerHook: 'onLeave', 
                            duration: '150%'
                        })
                        // animate color and top border in relation to scroll position
                        .setTween(".cardone", { scale: 0.75, opacity: 0}) // the tween durtion can be omitted and defaults to 1
                        .setPin(".trigger1", {pushFollowers: false})
                        // .offset(-10)
                        // .addIndicators({name: "2 (duration: 300)"}) // add indicators (requires plugin)
                        .addTo(controller);
        var scene = new ScrollMagic.Scene({
                            triggerElement: ".trigger2", 
                            triggerHook: 'onLeave', 
                            duration: '150%'
                        })
                        // animate color and top border in relation to scroll position
                        .setTween(".cardtwo", { scale: 0.75, opacity: 0}) // the tween durtion can be omitted and defaults to 1
                        .setPin(".trigger2", {pushFollowers: false})
                        // .offset(-10)
                        // .addIndicators({name: "2 (duration: 300)"}) // add indicators (requires plugin)
                        .addTo(controller);
        var scene = new ScrollMagic.Scene({
                            triggerElement: ".trigger3", 
                            triggerHook: 'onLeave', 
                            duration: '150%'
                        })
                        // animate color and top border in relation to scroll position
                        .setTween(".cardthree", { scale: 0.75, opacity: 0}) // the tween durtion can be omitted and defaults to 1
                        .setPin(".trigger3", {pushFollowers: false})
                        // .offset(-10)
                        // .addIndicators({name: "2 (duration: 300)"}) // add indicators (requires plugin)
                        .addTo(controller);
        var scene = new ScrollMagic.Scene({
                            triggerElement: ".trigger4", 
                            triggerHook: 'onLeave', 
                            duration: '150%'
                        })
                        // animate color and top border in relation to scroll position
                        .setTween(".cardfour", { scale: 0.75, opacity: 0}) // the tween durtion can be omitted and defaults to 1
                        .setPin(".trigger4", {pushFollowers: false})
                        // .offset(-10)
                        // .addIndicators({name: "2 (duration: 300)"}) // add indicators (requires plugin)
                        .addTo(controller);


        // $(function() {
        //   $.scrollify({
        //     section : ".product-list-item",
        //     setHeights: false,
        //     // scrollbars: true,
        //     standardScrollElements: "#we-are-hiring, #our-bowls, .footer",
        //     scrollSpeed: 750,
        //     updateHash: false,
        //     // offset: -20
        //   });
        // });
    }
</script>
    <?php wp_footer(); ?>

    </body>
</html>
