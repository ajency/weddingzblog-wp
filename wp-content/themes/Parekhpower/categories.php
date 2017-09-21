<?php
/*
Template Name: Categories Template
*/
?>

<?php get_header(); ?>



<div class="container">
<?php 
$all_cats = get_categories(array( 'taxonomy' => 'category' )) ;
// echo "<pre>";
// print_r($all_cats);
echo "<ul class='product-categories'>";
foreach ($all_cats as $catkey => $catvalue) {

// echo "<br/> ".$catvalue->name." - ".$catvalue->term_id." - ".$catvalue->category_description;


echo "<li><a href='#'>";

// fetch img
$img_url="";
if (function_exists('z_taxonomy_image_url')){
 $img_url =  z_taxonomy_image_url( $catvalue->term_id ,'large'  );
} 

if($img_url!="" && $img_url !=false){
?><img src="<?php echo $img_url; ?>"  />
<?php
}

echo "<h3>$catvalue->name</h3>";



echo "</a></li>";


}
echo "</ul>";
?>
</div>

<?php get_footer(); ?>