<?php
/**
 * Single Product tabs
 *
 * @author  WooThemes
 * @package WooCommerce/Templates
 * @version 2.4.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Filter tabs and allow third parties to add their own
 *
 * Each tab is an array containing title, callback and priority.
 * @see woocommerce_default_product_tabs()
 */
$tabs = apply_filters( 'woocommerce_product_tabs', array() );

if ( ! empty( $tabs ) ) : ?>

	<div class="woocommerce-tabs wc-tabs-wrapper">
		<ul class="tabs wc-tabs">
			<?php foreach ( $tabs as $key => $tab ) : ?>
				<li class="<?php echo esc_attr( $key ); ?>_tab">
					<a href="#tab-<?php echo esc_attr( $key ); ?>"><?php echo apply_filters( 'woocommerce_product_' . $key . '_tab_title', esc_html( $tab['title'] ), $key ); ?></a>
				</li>
			<?php endforeach; ?>
		</ul>
		<?php foreach ( $tabs as $key => $tab ) : ?>
			<div class="panel entry-content wc-tab" id="tab-<?php echo esc_attr( $key ); ?>">
				<?php call_user_func( $tab['callback'], $key, $tab ); ?>
			</div>
		<?php endforeach; ?>
	</div>

<?php endif; ?>

<div class="art-info">
	<div class="art-details">
		<h3>
			Artwork Details
		</h3>
		<ul>
			<li>Finish: Colourfast Ink on Canvas</li>
			<li>Wipeable &amp; dustable. Easy to maintain. Ready to Mount on Wall</li>
			<li>Package Contents: 1 Digital Art Print on Premium Canvas</li>
			<li>Premium Canvas Art Print. This Art Print is a Best Seller. </li>
			<li>This Painting is a Exquisite Painting by the Famous Artist. </li>
			<li>The canvas print is sure to add beauty and aesthetics to your space.</li>
			<li>This Art print offers beautiful color accuracy on a high-quality canvas that is ready for framing. </li>
			<li>Giclée (French for “to spray”) is a printing process where millions of ink droplets are sprayed onto the canvas surface creating natural color transitions. </li>
			<li>Size: 30 cm X 38.1 cm Best Selling Art Print. High Quality Canvas with Long Lasting Ink. </li>
			<li>In the Box: Gallery Wrapped on Pure Wooden Frame, Ready to Mount on Wall.</li>
			<li>Best Selling, High Quality Canvas Art Print.
		</ul>
	</div>

	<div class="frame-sizes">
		<h3>
			Frame Size Guide
		</h3>
		<p>
			Refer to the below image to understand the difference in canvas sizes.
		</p>
		<img src="<?php echo get_stylesheet_directory_uri(); ?>/img/frame-size-guide.jpg">
	</div>

	<div class="frame-types">
		<h3>
			Frame Types
		</h3>
		<div class="type-wrapper">
			<div class="type-image frame-1"></div>
			<div class="type-info">
				<h5>Wood Frame</h5>
				<p>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
				</p>
			</div>
		</div>
		<div class="type-wrapper">
			<div class="type-info text-right">
				<h5>Metal Frame</h5>
				<p>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
				</p>
			</div>
			<div class="type-image frame-2"></div>
		</div>
		<div class="type-wrapper">
			<div class="type-image frame-3"></div>
			<div class="type-info">
				<h5>Vintage Frame</h5>
				<p>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
				</p>
			</div>
		</div>

		<div class="back-wrapper">
			<div class="back-text">
				<h6>But what about the back?</h6>
				<p>Here's a sample view of the backside of a painting with a frame so you know what to expect. </p>
			</div>
			<img src="<?php echo get_stylesheet_directory_uri(); ?>/img/frame_back.jpg">
		</div>
	</div>

	<ul class="benefits">
		<li class="free_delivery">
			<div class="element">
				<div class="fa fa-truck"></div>
				<div class="content">
					Free Home Delivery
				</div>
				<div class="separator"></div>
				<div class="msg">
					<div>
						Whatever you order, our products ship free. Always.
					</div>
				</div>
			</div>
		</li>
		<li class="returns">
			<div class="element">
				<div class="fa fa-retweet"></div>
				<div class="content">
					On-The-Spot Returns
				</div>
				<div class="separator"></div>
				<div class="msg">
					<div>
						Didn't like it? No problem. Return it on the spot at the time of delivery.
					</div>
				</div>
			</div>
		</li>
		<li class="cod">
			<div class="element">
				<div class="fa fa-money"></div>
				<div class="content">
					C.O.D
				</div>
				<div class="separator"></div>
				<div class="msg">
					<div>
						You can pay by Cash or Card at the time of delivery.
					</div>
				</div>
			</div>
		</li>
		<li class="emi">
			<div class="element">
				<div class="fa fa-inr"></div>
				<div class="content">
					Easy Finance
				</div>
				<div class="separator"></div>
				<div class="msg">
					<div>
						Pay via EMIs on credit cards or avail interest-free loans.
					</div>
				</div>
			</div>
		</li>
	</ul>

</div>
