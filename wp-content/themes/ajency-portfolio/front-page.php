<?php get_header(); ?>

<style type="text/css">
  .cart-wrapper{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    background: #f5f5f5;
    z-index: 999;
    padding: 30px 15px 0;
    transform: translate(500px, 0px);
    transition: all 0.3s ease;
    width: 430px;
    @media (max-width: 767px){
      width: 50vh;
    }
    @media (max-width: 480px){
      width: 100vh;
    }
  }
  .cart-wrapper.active{
    transform: translate(0,0);
  }

  .cursor-pointer{
    cursor: pointer;
  }

  .gbb-original-price{
    font-size: 80%;
    text-decoration: line-through;
    font-weight: 400;
    margin-left: 5px;
    margin-right: 5px;
  }

  .gbb-discount {
    font-size: 80%;
    font-weight: 400;
  }

  .cart-app-loader{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
  }
</style>

<!-- <div class="container p5">
  <div class="row">
    <div class="col  offset-xl-2 col-xl-8 col12">
      <div class="headerfix ">
        <div class="bread-crumb d-flex">
          <span class="h1 font-weight-light pt-6 pr-2 pr-md-3">/</span>
          <div class="bread-crumb__menu">
             <a  href="<?php echo get_site_url(); ?>" class="actionable text-link h1">Home</a>
            <a href="<?php echo get_site_url(); ?>/software-development-engineering/" class="actionable text-link h1">Engineering</a>
            <a href="<?php echo get_site_url(); ?>/product-user-interface-design/" class="actionable text-link h1">User interface design</a>
            <a href="<?php echo get_site_url(); ?>/website-design/" class="actionable is-active text-link text-black h1">Website design</a> -->

<!-- <a href="#" class="actionable text-link h1">Blog</a>
            <a href="#" class="actionable text-link h1">Careers</a> -->

<!--  
          </div>
        </div>
      </div>
    </div>
  </div>
</div> -->
<div class="seperator">
</div>
<section>
  <div class="container p5">
    <div class="row">
      <div class="col  offset-xl-2 col-xl-8 col12">
        <p class="body-text">
          We <strong class="font-weight-bold h1">design</strong> and <strong class="font-weight-bold h1">code websites </strong> for online stores, real estate projects, hotels, company or product websites, blog and others. Sites we build are buzzword and <strong class="font-weight-bold h1">SEO compliant</strong>, and <strong class="font-weight-bold h1">load under 4 seconds</strong>.</p>
      </div>
    </div>
  </div>
  <div>
  </div>
</section>
<section class="mt-5 mt-md-0">
  <div class="slider variable-width d-flex align-items-center">
    <div>
      <img src="<?php echo get_template_directory_uri(); ?>/images/products/orange_barley_bowl.jpg" alt="Ajency Office Workplace"   class="lazyload blur-up">
    </div>
    <div class="align-items-center">
      <img src="<?php echo get_template_directory_uri(); ?>/images/products/quinoa-n-nuts-bowl.jpg" alt="Ajency Team squad " class="lazyload blur-up">
    </div>
    <div>
      <img src="<?php echo get_template_directory_uri(); ?>/images/products/cracked-wheat-n-chickpea-bowl-chicken.jpg" alt="Ajency located at Panjim" class="lazyload blur-up">
    </div>
  </div>
</section>
<section>
  <div class="container p5">
    <div class="row">
      <div class="col  offset-xl-2 col-xl-8 col12">
        <h3 class="h1 ft6">6 years in the making</h3>
        <p class="body-text">
          We are a boutique agency with a team size of 30+. Not too small where projects depend on 1-2 individuals, but small enough for you to have a chat/coffee/beer with the founders.

        </p>
      </div>
    </div>
  </div>
</section>
<div class="container p5">
  <div class="row">
    <div class="col-12">
      <hr>
    </div>
  </div>
</div>

<!-- Our Work -->

<section id="our-bowl" class="overflow-h aj-engineering">
  <div class="container p5">
    <div class="row">
    <div class="col-lg-2"></div>
      <div class="col-xl-8 our-work aj-engineering-work">

        <h1 class="font-weight-bold d-block d-md-none mobile-header mb-4 text-muted">Our Bowls</h1>

        <div class="items mb-5 ">
          <div id="showdiv1" class="text-black text-link pf-1">
            <h1 class="ft6">Orange Barley Bowl</h1>
            <!-- <h5 class="font-weight-light">
            A Sequoia-backed omnichannel marketplace for health products.
          </h5> -->
          </div>

          <div id="div1">
            <span aria-hidden="true" class="close">&times; Close</span>
            <div class="prj-container">
              <div class="col-12">
                <div class="ajency-portfolio portfolio-1">
                  <img src="<?php echo get_template_directory_uri(); ?>/images/products/orange_barley_bowl.jpg" alt="orange-barley-bowl">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="items mb-5">
          <div id="showdiv2" class="text-black text-link pf-2">
            <h1 class="ft6">Cracked Wheat & Chickpea Bowl</h1>
          </div>
          <div id="div2">
            <span aria-hidden="true" class="close">&times; Close</span>

            <div class="prj-container">
              <div class="col-12">
                <div class="portfolio-section portfolio-2">
                  <img src="<?php echo get_template_directory_uri(); ?>/images/products/cracked-wheat-n-chickpea-bowl-chicken.jpg" alt="cracked-wheat-n-chickpea-bowl-chicken">
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="items mb-5">
          <div id="showdiv4" class="text-black text-link pf-4">
            <h1 class="ft6">Quinoa & Nuts Bowl</h1>
          </div>
          <div id="div4">
            <span aria-hidden="true" class="close">&times; Close</span>

            <div class="prj-container">
              <div class="col-12">
                <div class="portfolio-section portfolio-3">
                  <img src="<?php echo get_template_directory_uri(); ?>/images/products/quinoa-n-nuts-bowl.jpg" alt="quinoa-n-nuts-bowl">
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="items mb-5">
          <div id="showdiv5" class="text-black text-link  pf-5">
            <h1 class="ft6">Thai Brown Rice Bowl</h1>
          </div>
          <div id="div5">
            <span aria-hidden="true" class="close">&times; Close</span>

            <div class="prj-container">
              <div class="portfolio-section portfolio-1">
                <img src="<?php echo get_template_directory_uri(); ?>/images/products/thai-brown-rice-bowl-panner.jpg" alt="thai-brown-rice-bowl-panner">
              </div>
            </div>

          </div>
        </div>


        <div class="scroll-left d-block d-xl-none">
          <div class="row no-gutter fixed-header shadow">
            <div class="col-1 ml-3 p-0">
              <h3 class="m-0 font-weight-bold back">
                <img class="btn-back mt-1 " src="<?php echo get_template_directory_uri(); ?>/img/left-arrow.png" style="width:20px;" />
              </h3>
            </div>
            <div class="col-7 pl-0">
              <h3 class="modal-title font-weight-bold back" id="exampleModalLabel">Back</h3>
            </div>
          </div>

          <div class="img-section">
            <div class="mobile-slick ">
              <div>
                <div class="mb-3 p-4">
                  <h1 class="ft6">Healthkart.com</h1>
                  <h5 class="font-weight-light">
                    Sequoia backed omnichannel marketplace for health products.
                  </h5>
                </div>
                <div>
                  <img src="<?php echo get_template_directory_uri(); ?>/img/portfolio/healthkart/healthkart-homepage-mo-10px.jpg" data-srcset="<?php echo get_template_directory_uri(); ?>/img/portfolio/healthkart/Healthkart-Homepage-1600px.jpg 1600w, <?php echo get_template_directory_uri(); ?>/img/portfolio/healthkart/Healthkart-Homepage-800px.jpg 800w, <?php echo get_template_directory_uri(); ?>/img/portfolio/healthkart/Healthkart-Homepage-400px.jpg 400w" data-sizes="100w" class="img-fluid lazyload blur-up">
                </div>
              </div>

              <div style="background:#FFFAF1">
                <div class="mb-3 p-4">
                  <h1 class="ft6">Commonfloor.com</h1>
                  <h5 class="font-weight-light">
                    Tiger Global and Google Capital backed Real estate platform.
                  </h5>
                </div>
                <div>

                  <img src="<?php echo get_template_directory_uri(); ?>/img/portfolio/commonfloor/commonfloor-homepage-mo-10px.jpg" data-srcset="<?php echo get_template_directory_uri(); ?>/img/portfolio/commonfloor/Commonfloor-Homepage-1600px.jpg 1600w, <?php echo get_template_directory_uri(); ?>/img/portfolio/commonfloor/Commonfloor-Homepage-800px.jpg 800w, <?php echo get_template_directory_uri(); ?>/img/portfolio/commonfloor/Commonfloor-Homepage-400px.jpg 400w" data-sizes="100w" class="img-fluid lazyload blur-up">
                </div>
              </div>

              <div style="background:#F5FAFF">
                <div class="mb-3 p-4">
                  <h1 class="ft6">Growthinvest.com</h1>
                  <h5 class="font-weight-light">
                    London based platform that helps startups raise early stage investment.
                  </h5>
                </div>
                <div>

                  <img src="<?php echo get_template_directory_uri(); ?>/img/portfolio/growthinvest/growthInvest-homepage-mo-10px.jpg" data-srcset="<?php echo get_template_directory_uri(); ?>/img/portfolio/growthinvest/GrowthInvest-Homepage-1600px.jpg 1600w, <?php echo get_template_directory_uri(); ?>/img/portfolio/growthinvest/GrowthInvest-Homepage-800px.jpg 800w, <?php echo get_template_directory_uri(); ?>/img/portfolio/growthinvest/GrowthInvest-Homepage-400px.jpg 400w" data-sizes="100w" class="img-fluid lazyload blur-up">
                </div>
              </div>

              <div>
                <div class="mb-3 p-4">
                  <h1 class="ft6">Weddingz.in</h1>
                  <h5 class="font-weight-light">
                    Online marketplace for Wedding industry. Acquired by Softbank backed Oyo Rooms in 2018.
                  </h5>
                </div>
                <div>

                  <img src="<?php echo get_template_directory_uri(); ?>/img/portfolio/weddingz/weddingz-homepage-mo-10px.jpg" data-srcset="<?php echo get_template_directory_uri(); ?>/img/portfolio/weddingz/Weddingz-Homepage-1600px.jpg 1600w, <?php echo get_template_directory_uri(); ?>/img/portfolio/weddingz/Weddingz-Homepage-800px.jpg 800w, <?php echo get_template_directory_uri(); ?>/img/portfolio/weddingz/Weddingz-Homepage-400px.jpg 400w" data-sizes="100w" class="img-fluid lazyload blur-up">
                </div>
              </div>

              <div>
                <div class="mb-3 p-4">
                  <h1 class="ft6">Mylan</h1>
                  <h5 class="font-weight-light">
                    A tele-medicine solution that helps hospitals reduce costs of patient visits.
                  </h5>
                </div>
                <div>
                  <img src="<?php echo get_template_directory_uri(); ?>/img/portfolio/mylan/mylan-homepage-mo-10px.jpg" data-srcset="<?php echo get_template_directory_uri(); ?>/img/portfolio/mylan/mylan-homepage-1600px.jpg 1600w, <?php echo get_template_directory_uri(); ?>/img/portfolio/mylan/mylan-homepage-800px.jpg 800w, <?php echo get_template_directory_uri(); ?>/img/portfolio/mylan/mylan-homepage-400px.jpg 400w" data-sizes="100w" class="img-fluid lazyload blur-up">
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="aj-our-work">
          <h1 class="font-weight-bold display-3">Our Bowls</h1>
          <p class="body-text">
            Seeing is believing. Some of our best work.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- End of Our Work -->


<div class="aj-engineering">
  <div class="scroll-left d-block d-xl-none">
    <div class="row no-gutter fixed-header shadow">
      <div class="col-1 ml-3 p-0">
        <h3 class="m-0 font-weight-bold back">
          <img class="btn-back mt-1 " src="<?php echo get_template_directory_uri(); ?>/img/left-arrow.png" style="width:20px;" />
        </h3>
      </div>
      <div class="col-7 pl-0">
        <h3 class="modal-title font-weight-bold back" id="exampleModalLabel">Back</h3>
      </div>
    </div>

    <div class="img-section">
      <div class="mobile-slick ">
        <div>
          <div class="mb-3 p-4">
            <h1 class="ft6">Orange Barley Bowl</h1>
          </div>
          <div>

            <div class="prj-container">
              <div class="col-12">
                <div class="portfolio-section pf-1">

                </div>
              </div>
            </div>

          </div>
        </div>

        <div style="background:#FFFAF1">
          <div class="mb-3 p-4">
            <h1 class="ft6">Cracked Wheat & Chickpea Bowl (Chicken)</h1>
          </div>
          <div>

          <div class="prj-container">
            <div class="col-12">
              <div class="portfolio-section pf-2">

              </div>
            </div>
          </div>

          </div>
        </div>

        <div style="background:#F5FAFF">
          <div class="mb-3 p-4">
            <h1 class="ft6">Cracked Wheat & Chickpea Bowl</h1>
          </div>
          <div>

            <!-- Growthinvest -->
            <div class="prj-container">
              <div class="col-12">
                <div class="portfolio-section pf-3">

                </div>
              </div>
            </div>
            <!-- End of Growthinvest -->
          </div>
        </div>

        <!--  -->

        <div style="background:#fdf9f6">
          <div class="mb-3 p-4">
            <h1 class="ft6">Weddingz.in</h1>
          </div>
          <div>

            <!-- Weddingz -->
            <div class="prj-container">
              <div class="col-12">
                <div class="portfolio-section pf-4">

                </div>
              </div>
            </div>
            <!-- End of Weddingz -->
          </div>
        </div>

        <div style="background:#fcfcfc">
          <div class="mb-3 p-4">
            <h1 class="ft6">Mylan</h1>
            <h5 class="font-weight-light">
              A tele-medicine solution that helps hospitals reduce costs of patient visits.
            </h5>
          </div>
          <div>
            <!-- Mylan -->
            <div class="prj-container">
              <div class="portfolio-section project-mylan">
                <div class="header-top">
                  <picture>
                    <source media="(min-width: 992px)" srcset="<?php echo get_template_directory_uri(); ?>/img/portfolio_assets/mylan/mylan-desktop.png">
                    <source media="(max-width: 991px)" srcset="<?php echo get_template_directory_uri(); ?>/img/portfolio_assets/mylan/mylan-mobile.png">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/portfolio_assets/mylan/mylan-desktop.png" class="img-responsive" alt="header">
                  </picture>
                </div>

                <div class="container-fluid p-0">
                  <div class="project-info">
                    <div class="row">
                      <div class="col-6 col-lg-3 info-col mb-3">
                        <div class="info-box team-member">
                          <h3 class="info-value">Multi-Tenant Architecture</h2>
                        </div>
                      </div>
                      <div class="col-6 col-lg-3 info-col order-lg-2 mb-3">
                        <div class="info-box team-member">
                          <h3 class="info-value">NHS monitored pilot</h3>
                        </div>
                      </div>
                      <div class="col-6 col-lg-3 info-col order-lg-1 mb-3">
                        <div class="info-box lang-used">
                          <h3 class="info-value">Compliant with patient privacy laws</h3>
                        </div>
                      </div>
                      <div class="col-6 col-lg-3 info-col mb-3 order-lg-3">
                        <div class="info-box prj-progress">
                          <h3 class="info-value date">2015-2017</h3>
                          <label class="info-label">Project duration</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="omniplatform">
                  <div class="section-header">
                    <h2 class="section-title">Omniplatform</h2>
                    <p>A tele-medicine solution that helps hospitals reduce cost of patient visits</p>
                  </div>
                  <picture>
                    <source media="(min-width: 992px)" srcset="<?php echo get_template_directory_uri(); ?>/img/portfolio_assets/mylan/omniplatform-desktop.png">
                    <source media="(max-width: 991px)" srcset="<?php echo get_template_directory_uri(); ?>/img/portfolio_assets/mylan/omniplatform-mobile.png">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/portfolio_assets/mylan/omniplatform-desktop.png" class="img-responsive" alt="header">
                  </picture>
                </div>

              </div>
            </div>
            <!-- End of Mylan -->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

<!-- Selected Location -->
<div class="delivery-location d-flex cursor-pointer">
  <div class="mr-2 ml-2"><i class="fa fa-map-marker" aria-hidden="true"></i></div>
  <div id="selected-location-address" class="font-weight-bold"></div>  
</div>


<!-- Products -->
<div>
  <h1>
    Products
  </h1>
  <div class="d-flex p-2 m-2">
        <div class="p-2 m-2">
            <div class="product-image" style="width: 100px; height: 100px;">
              <img width="100" height="72" src="http://greengrainbowl.com/wp-content/themes/ajency-portfolio/images/products/orange_barley_bowl.jpg" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="">  
            </div>
            
            <h5>
                 <a href="javascript:void(0)">
                  Orange Barley Bowl                
                 </a>
            </h5>
            <span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">₹</span>100.00</span>
            <small class="gbb-original-price text-muted">₹150</small>
            <span class="gbb-discount text-danger">33% OFF</span>
            <!-- Add to cart button -->
            <div class="react-add-to-cart-container cursor-pointer" data-variant_id="bupD3ekj2qEketZ0Kpf9" data-product_data='{ "product_id" : "yykiWcEv48MtR2oRiWla", "title" : "Orange Barley Bowl", "default" : "72mIBZ9aTr8Okr05SfSN", "variants" : [ { "id" : "72mIBZ9aTr8Okr05SfSN", "mrp" : 150, "sale_price" : 100, "size" : "Small" }, { "id" : "bupD3ekj2qEketZ0Kpf9", "mrp" : 300, "sale_price" : 250, "size" : "Regular" }, { "id" : "EvG1uPu3uFKZpxAh35OP", "mrp" : 500, "sale_price" : 450, "size" : "Large" } ] }'></div>
       </div>


        <div class="p-2 m-2">
            <div class="product-image" style="width: 100px; height: 100px;">
              <img width="100" height="72" src="http://greengrainbowl.com/wp-content//themes/ajency-portfolio/images/products/cracked-wheat-n-chickpea-bowl-chicken.jpg" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="">  
            </div>
            
            <h5>
                <a href="javascript:void(0)">
                  Cracked Wheat &amp; Chickpea Bowl                 
                </a>
            </h5>
            <span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">₹</span>400.00</span>            
            <small class="gbb-original-price text-muted">₹500</small>
            <span class="gbb-discount text-danger">20% OFF</span>
            <!-- Add to cart button -->
            <div class="react-add-to-cart-container cursor-pointer" data-variant_id="5awRHIDbXVNMEZhoYjtZ" data-product_data='{ "product_id" : "ReAlsVnx73KSVrYGvbsn", "title" : "Cracked Wheat & Chickpea Bowl", "default" : "5awRHIDbXVNMEZhoYjtZ", "variants" : [ { "id" : "5awRHIDbXVNMEZhoYjtZ", "mrp" : 500, "sale_price" : 400, "size" : "Regular" } ] }'></div>
       </div>


        <div class="p-2 m-2">
            <div class="product-image" style="width: 100px; height: 100px;">
              <img width="100" height="72" src="http://greengrainbowl.com/wp-content/themes/ajency-portfolio/images/products/thai-brown-rice-bowl-panner.jpg" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="">  
            </div>
            
            <h5>
                <a href="javascript:void(0)">
                  Thai Brown Rice Bowl                 
                </a>
            </h5>
            <span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">₹</span>400.00</span>
            <small class="gbb-original-price text-muted">₹450</small>
            <span class="gbb-discount text-danger">11% OFF</span>            
            <!-- Add to cart button -->
            <div class="react-add-to-cart-container cursor-pointer" data-variant_id="Nwn6e8h6OWVBpMFN0c9z" data-product_data='{ "product_id" : "moVonufnFw46emRbKy7W", "title" : "Thai Brown Rice Bowl", "default" : "Nwn6e8h6OWVBpMFN0c9z", "variants" : [ { "id" : "Nwn6e8h6OWVBpMFN0c9z", "mrp" : 450, "sale_price" : 400, "size" : "Regular" } ] }'></div>
       </div>


        <div class="p-2 m-2">
            <div class="product-image" style="width: 100px; height: 100px;">
              <img width="100" height="72" src="http://greengrainbowl.com/wp-content/themes/ajency-portfolio/images/products/quinoa-n-nuts-bowl.jpg" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="">  
            </div>
            
            <h5>
                <a href="javascript:void(0)">
                  Quinoa &amp; Nuts Bowl                 
                </a>
            </h5>
            <span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">₹</span>200.00</span>            <!-- Add to cart button -->
            <div class="react-add-to-cart-container cursor-pointer" data-variant_id="dlI88p2ORp3Wk6W0Hq3t" data-product_data='{ "product_id" : "JS42fGblvs7VJ8uxXuaD", "title" : "Quinoa & Nuts Bowl", "default" : "WpKYzupzbBimyAt3WOrg", "variants" : [ { "id" : "WpKYzupzbBimyAt3WOrg", "mrp" : 200, "sale_price" : 200, "size" : "Small" }, { "id" : "dlI88p2ORp3Wk6W0Hq3t", "mrp" : 300, "sale_price" : 300, "size" : "Regular" }, { "id" : "auYzBeDEuvqIiu1gxx9J", "mrp" : 400, "sale_price" : 400, "size" : "Large" } ] }'></div>
       </div>
  </div>  
</div>

<!-- gps modal prompt -->
<div id="react-add-delivery-address-container"></div>

<!-- Add to cart error  -->
<div class="failure toast d-flex justify-content-center">
  <span class="alert-danger d-none" id="failure-toast">
    Add to cart failed
  </span>
</div>

<!-- Add to cart error  -->
<div class="success toast d-flex justify-content-center">
  <span class="alert-success d-none" id="success-toast">
    Successfully added to cart
  </span>
</div>

<!-- View cart component -->
<div id="react-view-cart-container" style="width: 100%"></div>


<div class="cart-wrapper" id="root">
  <div class="cart-app-loader">
    Loading...
  </div>
</div>

<div class="container p5">
  <div class="row">
    <div class="col-12">
      <hr>
    </div>
  </div>
</div>
<section id="we-are-hiring">
  <div class="container p5">
    <div class="row">
      <div class="col  offset-xl-2 col-xl-8 col12">
        <h3 class="h1 ft6">We're Hiring</h3>
        <p class="body-text">To help you decide if we are the right fit for you.</p>
        <div class="seperator">
        </div>
        <div class="accordion aj-faq" id="accordionExample">
          <div class="card">
            <div class="card-header" id="headingOne">
              <a class=" text-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <h2 class="pt-2 pb-2 m-0 ">Position 1 </h2>
              </a>
            </div>

            <div id="collapseOne" class="collapse  " aria-labelledby="headingOne" data-parent="#accordionExample">
              <div class="card-body">
                <p class="body-text">As they say, horses for the courses. Each site is different and we take a call on whether to use Wordpress, Shopify, Squarespace or any other.</p>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingTwo">

              <a class=" text-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                <h2 class="pt-2 pb-2 m-0 ">Position 2</h2>
              </a>
              </h5>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
              <div class="card-body">
                <p class="body-text">The right answer would be "It depends". It is difficult to give a cost without details of the kind of website you want. However, if it helps to have rough ball parks, then it can vary from $500 (Rs.30,000/-) to $5000 (Rs.3,50,000/-)</p>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingThree">

              <a class=" text-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                <h2 class="pt-2 pb-2 m-0 ">Position 3</h2>
              </a>
            </div>
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
              <div class="card-body">
                <p class="body-text">Distance has never been a challenge. We regularly work with clients in Singapore, London, Australia, Norway, USA, Delhi, Mumbai and even Uruguay! The world truly is flat.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>

<div class="container p5">
  <div class="row">
    <div class="col-12">
      <hr>
    </div>
  </div>
</div>

<?php get_footer(); ?>