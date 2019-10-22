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

<div class=" py-5"></div>

<!-- Selected Location -->
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
          <div class="col-lg-3 col-sm-6 product-list-item">
            <div class="product-wrapper">
              <div class="product-image position-relative">
                <img src="<?php echo get_template_directory_uri().'/images/products/product_one.png';?>" class="img-fluid" alt="Noodle Salad Bowl" title="Noodle Salad Bowl">
                <h4 class="product-title letter-spacing-5 text-white mb-0 pl-4 pr-4">Noodle Salad Bowl</h4>
                </div>
              <div class="product-info pt-3 pb-3 pl-4 pr-4">                
                <div class="product-excerpt line-clamp-2 font-size-15 text-grey mb-3">
                  Buckwheat noodles and a colorful mix of greens, roasted vegetables and teriyaki tofu. Served with a very Asian soy-sesame & ginger dressing.
                </div>
                <div class="product-meta d-flex">
                  <div class="product-price font-size-24"><img src="<?php echo get_template_directory_uri().'/images/products/ruppeIcon.png';?>" class="" alt="" title=""> 450</div>
                  <a href="#" class="btn btn-add-to-cart bg-primary text-white border-radius-4 border-white" title="Add Noodle Salad Bowl to cart">Add to cart</a>
                </div>
              </div>
            </div>      
          </div>
          <div class="col-lg-3 col-sm-6 product-list-item">
            <div class="product-wrapper">
              <div class="product-image position-relative">
                <img src="<?php echo get_template_directory_uri().'/images/products/product_one.png';?>" class="img-fluid" alt="Noodle Salad Bowl" title="Noodle Salad Bowl">
                <h4 class="product-title letter-spacing-5 text-white mb-0 pl-4 pr-4">Noodle Salad Bowl</h4>
                </div>
              <div class="product-info pt-3 pb-3 pl-4 pr-4">                
                <div class="product-excerpt line-clamp-2 font-size-15 text-grey mb-3">
                  Buckwheat noodles and a colorful mix of greens, roasted vegetables and teriyaki tofu. Served with a very Asian soy-sesame & ginger dressing.
                </div>
                <div class="product-meta d-flex">
                  <div class="product-price font-size-24"><img src="<?php echo get_template_directory_uri().'/images/products/ruppeIcon.png';?>" class="" alt="" title=""> 450</div>
                  <a href="#" class="btn btn-add-to-cart bg-primary text-white border-radius-4 border-white" title="Add Noodle Salad Bowl to cart">Add to cart</a>
                </div>
              </div>
            </div>      
          </div>
          <div class="col-lg-3 col-sm-6 product-list-item">
            <div class="product-wrapper">
              <div class="product-image position-relative">
                <img src="<?php echo get_template_directory_uri().'/images/products/product_one.png';?>" class="img-fluid" alt="Noodle Salad Bowl" title="Noodle Salad Bowl">
                <h4 class="product-title letter-spacing-5 text-white mb-0 pl-4 pr-4">Noodle Salad Bowl</h4>
                </div>
              <div class="product-info pt-3 pb-3 pl-4 pr-4">                
                <div class="product-excerpt line-clamp-2 font-size-15 text-grey mb-3">
                  Buckwheat noodles and a colorful mix of greens, roasted vegetables and teriyaki tofu. Served with a very Asian soy-sesame & ginger dressing.
                </div>
                <div class="product-meta d-flex">
                  <div class="product-price font-size-24"><img src="<?php echo get_template_directory_uri().'/images/products/ruppeIcon.png';?>" class="" alt="" title=""> 450</div>
                  <a href="#" class="btn btn-add-to-cart bg-primary text-white border-radius-4 border-white" title="Add Noodle Salad Bowl to cart">Add to cart</a>
                </div>
              </div>
            </div>      
          </div>
          <div class="col-lg-3 col-sm-6 product-list-item">
            <div class="product-wrapper">
              <div class="product-image position-relative">
                <img src="<?php echo get_template_directory_uri().'/images/products/product_one.png';?>" class="img-fluid" alt="Noodle Salad Bowl" title="Noodle Salad Bowl">
                <h4 class="product-title letter-spacing-5 text-white mb-0 pl-4 pr-4">Noodle Salad Bowl</h4>
                </div>
              <div class="product-info pt-3 pb-3 pl-4 pr-4">                
                <div class="product-excerpt line-clamp-2 font-size-15 text-grey mb-3">
                  Buckwheat noodles and a colorful mix of greens, roasted vegetables and teriyaki tofu. Served with a very Asian soy-sesame & ginger dressing.
                </div>
                <div class="product-meta d-flex">
                  <div class="product-price font-size-24"><img src="<?php echo get_template_directory_uri().'/images/products/ruppeIcon.png';?>" class="" alt="" title=""> 450</div>
                  <a href="#" class="btn btn-add-to-cart bg-primary text-white border-radius-4 border-white" title="Add Noodle Salad Bowl to cart">Add to cart</a>
                </div>
              </div>
            </div>      
          </div>
          <div class="col-lg-3 col-sm-6 product-list-item">
            <div class="product-wrapper">
              <div class="product-image position-relative">
                <img src="<?php echo get_template_directory_uri().'/images/products/product_one.png';?>" class="img-fluid" alt="Noodle Salad Bowl" title="Noodle Salad Bowl">
                <h4 class="product-title letter-spacing-5 text-white mb-0 pl-4 pr-4">Noodle Salad Bowl</h4>
                </div>
              <div class="product-info pt-3 pb-3 pl-4 pr-4">                
                <div class="product-excerpt line-clamp-2 font-size-15 text-grey mb-3">
                  Buckwheat noodles and a colorful mix of greens, roasted vegetables and teriyaki tofu. Served with a very Asian soy-sesame & ginger dressing.
                </div>
                <div class="product-meta d-flex">
                  <div class="product-price font-size-24"><img src="<?php echo get_template_directory_uri().'/images/products/ruppeIcon.png';?>" class="" alt="" title=""> 450</div>
                  <a href="#" class="btn btn-add-to-cart bg-primary text-white border-radius-4 border-white" title="Add Noodle Salad Bowl to cart">Add to cart</a>
                </div>
              </div>
            </div>      
          </div>
        </div>
      </div>
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