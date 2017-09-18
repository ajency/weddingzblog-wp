<?php
/**
 * Single variation display
 *
 * This is a javascript-based template for single variations (see https://codex.wordpress.org/Javascript_Reference/wp.template).
 * The values will be dynamically replaced after selecting attributes.
 *
 * @see 	https://docs.woocommerce.com/document/template-structure/
 * @author  WooThemes
 * @package WooCommerce/Templates
 * @version 2.5.0
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
global $product;
?>



<script type="text/template" id="tmpl-variation-template">
	<div class="woocommerce-variation-description">
		{{{ data.variation.variation_description }}}
	</div>

	<!-- <p class="price"><span class="woocommerce-Price-currencySymbol">₹</span><span class=""><?php echo $product->get_variation_sale_price( 'max', true ); ?></span></p> -->

	<div class="woocommerce-variation-price">
		{{{ data.variation.price_html }}}
		<div class="price-summary">

			<!-- <div class="frame-price">
				Wooden Frame: <span class="woocommerce-Price-currencySymbol">₹</span><span class="">100.00</span>
			</div>
			<div class="total-price">
				Total: <span class="woocommerce-Price-currencySymbol">₹</span><span class="">600.00</span>
			</div> -->

			<div class="taxes-text">
				Additional Taxes at checkout
			</div>
		</div>
	</div>

	<div class="woocommerce-variation-availability">
		{{{ data.variation.availability_html }}}
	</div>
</script>
<script type="text/template" id="tmpl-unavailable-variation-template">
	<p><?php _e( 'Sorry, this product is unavailable. Please choose a different combination.', 'woocommerce' ); ?></p>
</script>
