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

  @media (max-width: 767px){
    .cart-wrapper{
      width: 50vh;
    }
    
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


<div class="delivery-location d-flex cursor-pointer">
  <div class="mr-2 ml-2"><i class="fa fa-map-marker" aria-hidden="true"></i></div>
  <div id="selected-location-address" class="font-weight-bold"></div>  
</div>


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

<!-- sign-in modal prompt -->
<div id="react-sign-in-container"></div>

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


<div class="cart-wrapper" id="root">
  <div class="cart-app-loader">
    Loading...
  </div>
</div>

<button class="trigger">Click here to trigger the modal!</button>

<div class="slide-in flex-slide-in" id="phoner_number">
  <div class="slide-in-header header-container d-flex align-items-center">
      <div class="app-name d-flex align-items-center">					
          <img src="http://greengrainbowl-com.digitaldwarve.staging.wpengine.com/wp-content/themes/ajency-portfolio/images/slidein/Newlogo.png" className="app-log" alt="Green Grain Bowl" title="Green Grain Bowl"/>
      </div>
      <div class="app-chekout text-green">
          <img src="http://greengrainbowl-com.digitaldwarve.staging.wpengine.com/wp-content/themes/ajency-portfolio/images/slidein/checkout.png" className="app-log" alt="Green Grain Bowl" title="Green Grain Bowl"/>
          Secure <br/>Checkout
      </div>
      <h3 class="app-close bg-primary m-0 text-white btn-pay m-0">
          <span aria-hidden="true"><img src="http://greengrainbowl-com.digitaldwarve.staging.wpengine.com/wp-content/themes/ajency-portfolio/images/slidein/remove.png" className="app-log" alt="Green Grain Bowl" title="Green Grain Bowl" /></span>
      </h3>
  </div>
  <div class="slide-in-content">
      <div class="spacer-210"></div>
      <h3 class="h1 ft6">Login</h3>
      <h4 class="font-weight-light mt-4 pb-4">
        Having an account with GGB makes it dead simple to place orders
      </h4>
      <div class="mb-3 pt-4 pb-2">
        <input type="tel" class="w-100 p-3 border-green h5 ft6 rounded-0" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="10 digit mobile number">
      </div>
      <div class="btn-wrapper pt-4">
        <div class="btn-inner-wrap">
          <button type="button" class="btn-reset text-white border-green bg-primary p-3 text-left h5 ft6 mb-0 rounded-0 w-100">Submit</button>
          <i class="text-white fa fa-arrow-right" aria-hidden="true"></i>
        </div>
      </div>
  </div>
</div>

<div class="slide-in flex-slide-in visible" id="otp">
  <div class="slide-in-header header-container d-flex align-items-center">
      <div class="app-name d-flex align-items-center">					
          <img src="http://greengrainbowl-com.digitaldwarve.staging.wpengine.com/wp-content/themes/ajency-portfolio/images/slidein/Newlogo.png" className="app-log" alt="Green Grain Bowl" title="Green Grain Bowl"/>
      </div>
      <div class="app-chekout text-green">
          <img src="http://greengrainbowl-com.digitaldwarve.staging.wpengine.com/wp-content/themes/ajency-portfolio/images/slidein/checkout.png" className="app-log" alt="Green Grain Bowl" title="Green Grain Bowl"/>
          Secure <br/>Checkout
      </div>
      <h3 class="app-close bg-primary m-0 text-white btn-pay m-0">
          <span aria-hidden="true"><img src="http://greengrainbowl-com.digitaldwarve.staging.wpengine.com/wp-content/themes/ajency-portfolio/images/slidein/remove.png" className="app-log" alt="Green Grain Bowl" title="Green Grain Bowl" /></span>
      </h3>
  </div>
  <div class="slide-in-content">
      <div class="spacer-210"></div>
      <h3 class="h1 ft6">Verify Mobile</h3>
      <h4 class="font-weight-light mt-4 pb-4">
        Enter the 6 digit code sent to the number 
      </h4>
      <div class="mb-1 pt-4">
        <input type="number" class="w-100 p-3 border-green h5 ft6 rounded-0" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="Enter OTP">
        <!-- <input id="partitioned" type="text" maxlength="" /> -->
      </div>
      <h6 class="mb-4 pb-3">Didn't receive the code? <a href="#">RESEND</a></h6>
      <div class="btn-wrapper pt-4">
        <div class="btn-inner-wrap">
        <button type="button" class="btn-reset text-white border-green bg-primary p-3 text-left h5 ft6 mb-0 rounded-0 w-100">Verify OTP</button>
          <i class="text-white fa fa-arrow-right" aria-hidden="true"></i>
        </div>
      </div>
  </div>
</div>

<script>
var modal = document.querySelector(".slide-in");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".app-close");

function toggleModal() {
    modal.classList.toggle("visible");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

</script>

<div class="backdrop-wrap"></div>

<?php get_footer(); ?>