<!doctype html>
<html lang="en">
  <head>
     <title><?php wp_title(); ?></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
    
    <!-- <script>

        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script','https://ajency.in/wp-content/cache/caos-analytics/analytics.js','ga');
            window[ 'ga-disable-UA-121565233-2' ] = false;
        ga('create', 'UA-121565233-2',
        {
            'cookieName':   'caosLocalGa',
            'cookieDomain': 'ajency.in',
            'cookieExpires':'0',
        });
            ga('send', 'pageview');
    </script> -->

    <link href="https://fonts.googleapis.com/css?family=Work+Sans:400,500|Libre+Baskerville:400,400i" rel="stylesheet">  
    <link href="<?php echo get_template_directory_uri(); ?>/css/custom.css" rel="stylesheet" type="text/css"/>

    <?php wp_head(); ?>
  </head>

  <body>

  	<nav class="fixed-header position-fixed">
      <div class="container mt5  p5">
        <div class="row ">
            <div class="col-6 col-xl-2 col-sm-3">
              <a href="<?php echo get_site_url(); ?>">
              <img src="<?php echo get_template_directory_uri(); ?>/images/green_grain_bowl.jpg" width="120px" class="float-right logo"/>
            </a>
            </div>
            <div class="  offset-sm-5 col-sm-4 offset-xl-8 col-xl-2 col-6">
              <a href="mailto:talktous@ajency.in" class="h4 menu float-left m-0">talktous@ajency.in </a>
            </div>
        </div>
      </div>
    </nav>