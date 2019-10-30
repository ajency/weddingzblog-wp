<?php get_header(); ?>

<style type="text/css">
  .cart-wrapper{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    z-index: 1200;
    padding: 0;
    transform: translate(500px, 0px);
    transition: all 0.3s ease;
    width: 410px;
    padding-bottom: 52px;
    background: #fff;
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

  .saved-address-item {
    white-space: normal;
    text-align: left;
  }

  @media (max-width: 480px){
    .cart-wrapper{
      width: 100%;
    }
  }

  .custom-modal {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transform: scale(1.1);
    transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
}
</style>


<div class="spacer py-5"></div>
<!-- Selected Location -->

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


<!-- <div class="delivery-location d-flex cursor-pointer">
  <div class="mr-2 ml-2"><i class="fa fa-map-marker" aria-hidden="true"></i></div>
  <div id="selected-location-address" class="font-weight-bold"></div>  
</div> -->


<div class="product-section">  
  <div class="container">
    <div class="row">
      <div class="col-lg-21">
      </div>
      <div class="col-xl-12">
        <h1 class="ft6 product-section__title mb-4">Products</h1>        
        <div class="row product-list">   
          <?php $products = json_decode(file_get_contents(get_template_directory_uri() . '/products.json'), true)['products']; 
            foreach ($products as $key => $product) { ?>

            <div class="col-xl-6 col-lg-7 product-list-item effect trigger<?php echo $key+1 ?>">
                <div class="product-wrapper d-lg-flex align-items-lg-end <?php echo $product['class'] ?>">
                    <div class="product-image lg-w-50">
                        <div class="item">
                            <img src="<?php echo $product['images'][0];?>"  alt="<?php echo $product['title'] ?>" title="<?php echo $product['title'] ?>">
                        </div>
                        <div class="item">
                          <img src="<?php echo $product['images'][1];?>" alt="<?php echo $product['title'] ?>" title="<?php echo $product['title'] ?>">
                        </div>
                        <div class="item">
                            <img src="<?php echo $product['images'][2];?>" alt="<?php echo $product['title'] ?>" title="<?php echo $product['title'] ?>">
                        </div>
                        <div class="item">
                            <img src="<?php echo $product['images'][3];?>" alt="<?php echo $product['title'] ?>" title="<?php echo $product['title'] ?>">
                        </div>
                    </div>

                    <div class="product-info lg-w-50 pl-lg-2"> 
                        <h3 class="product-title h1 ft6"><?php echo $product['title'] ?></h3>               
                        <h4 class="product-excerpt font-weight-light font-size-18 mt-0">
                            <?php echo $product['description'] ?>
                        </h4>
                        <div class="product-meta d-flex">
                            <div class="product-price font-size-25 ft6 mb-0"><img src="<?php echo get_template_directory_uri().'/images/products/ruppeIcon.png';?>" class="" alt="" title=""> 
                                <?php echo $product['default']['sale_price'] ?>
                            </div>
                            
                           <!--  <a href="#" class="btn-add-to-cart btn-add-to-cart-desktop text-primary border-radius-4 border-white text-decoration-none m-0 font-size-25 ft6" title="Add Noodle Salad Bowl to cart">
                            Add to cart  
                            </a> -->

                            <div class="react-add-to-cart-container" data-product_data='<?php echo json_encode($product); ?>'></div>
                        </div>
                    </div>
                </div>      
            </div>

            <?php if($product['put_empty']) : ?>
                <div class="col-xl-6 col-lg-5"></div><div class="col-xl-6 col-lg-5"></div>
            <?php endif; ?>

          <?php } ?>

        </div>
      </div>
    </div>   
  </div>
</div>

<!-- gps modal prompt -->
<div id="react-add-delivery-address-container"></div>

<!-- sign-in container -->
<div id="react-sign-in-container"></div>

<!-- verify-otp container -->
<div id="react-verify-otp-container"></div>

<div class="msg-container">
<!-- Add to cart error  -->
<div class="failure toast d-flex justify-content-center">
  <span class="alert-danger p-15 w-100 d-none" id="failure-toast">
    Add to cart failed
  </span>
</div>

<!-- Add to cart error  -->
<div class="success toast d-flex justify-content-center">
  <span class="alert-success p-15 w-100 d-none" id="success-toast">
    Successfully added to cart
  </span>
</div>


<!-- View cart component -->
<div id="react-view-cart-container" style="width: 100%"></div>
</div>


<div class="cart-wrapper cart-loader" id="root">
  <div class="cart-app-loader">
    Loading...
  </div>
</div>

<div class="backdrop"></div>

<div class="site-loader text-center p-5">
  <img src="<?php echo get_template_directory_uri(); ?>/images/green_grain_bowl.jpg" width="75px" class="mt-5"/> 
</div>

<button id="cart-address-change-trigger" class="d-none"></button>

<div class="backdrop-wrap"></div>

<?php get_footer(); ?>