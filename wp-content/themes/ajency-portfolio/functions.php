<?php
function wp_after_theme_setup() {
    add_theme_support( 'custom-logo');
}
add_action( 'after_setup_theme', 'wp_after_theme_setup' );

/* Enqueue Theme scripts and styles here **/
    function wpdocs_theme_name_scripts() {
        wp_register_style( 'google-fonts', 'https://fonts.googleapis.com/css?family=Libre+Baskerville:400,400i|Work+Sans:400,500' );
        wp_register_style( 'custom-css', get_template_directory_uri().'/css/custom.css', array(), '', false );
        
        wp_enqueue_style( 'google-fonts' );
        
        if (is_page_template('archive.php') || is_singular('post')) {
            wp_enqueue_style( 'custom-css' );
        }
    }
    add_action( 'wp_enqueue_scripts', 'wpdocs_theme_name_scripts' );
/** end of scripts and styles */

    function sm_custom_meta() {
        add_meta_box( 'sm_meta', __( 'Featured Posts', 'sm-textdomain' ), 'sm_meta_callback', 'post' );
    }
    function sm_meta_callback( $post ) {
        $featured = get_post_meta( $post->ID );
        ?>

    	<p>
        <div class="sm-row-content">
            <label for="meta-checkbox">
                <input type="checkbox" name="meta-checkbox" id="meta-checkbox" value="yes" <?php if ( isset ( $featured['meta-checkbox'] ) ) checked( $featured['meta-checkbox'][0], 'yes' ); ?> />
                <?php _e( 'Feature this post', 'sm-textdomain' )?>
            </label>

        </div>
    </p>

        <?php
    }
    add_action( 'add_meta_boxes', 'sm_custom_meta' );


    /**
     * Saves the custom meta input
     */
    function sm_meta_save( $post_id ) {

        // Checks save status
        $is_autosave = wp_is_post_autosave( $post_id );
        $is_revision = wp_is_post_revision( $post_id );
        $is_valid_nonce = ( isset( $_POST[ 'sm_nonce' ] ) && wp_verify_nonce( $_POST[ 'sm_nonce' ], basename( __FILE__ ) ) ) ? 'true' : 'false';

        // Exits script depending on save status
        if ( $is_autosave || $is_revision || !$is_valid_nonce ) {
            return;
        }

     // Checks for input and saves
    if( isset( $_POST[ 'meta-checkbox' ] ) ) {
        update_post_meta( $post_id, 'meta-checkbox', 'yes' );
    } else {
        update_post_meta( $post_id, 'meta-checkbox', '' );
    }

    }
    add_action( 'save_post', 'sm_meta_save' );

    add_theme_support( 'post-thumbnails' );

    function excerpt($limit) {
      $excerpt = explode(' ', get_the_excerpt(), $limit);
      if (count($excerpt)>=$limit) {
        array_pop($excerpt);
        $excerpt = implode(" ",$excerpt).'...';
      } else {
        $excerpt = implode(" ",$excerpt);
      }
      $excerpt = preg_replace('`[[^]]*]`','',$excerpt);
      return $excerpt;
    }