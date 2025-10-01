<?php
/**
 * Template part for displaying the hero section.
 */

// Get the URL of the current page's Featured Image in full size.
$hero_image_url = get_the_post_thumbnail_url( get_the_ID(), 'full' );

// If no Featured Image is set for this page, fall back to the global image from the Customizer.
if ( ! $hero_image_url ) {
    $hero_image_url = get_theme_mod( 'hero_image_url' );
}
?>

<section class="hero hero-section">
  <?php if ( $hero_image_url ) : ?>
    <img class="hero-img" src="<?php echo esc_url( $hero_image_url ); ?>" alt="Davis Dispute Advisory">
  <?php endif; ?>
  
  <div class="overlay"></div>
  <div class="hero-content">

    <?php
    // The "Call to Action" button will still appear on all pages that use this template.
    $cta_text = get_theme_mod( 'hero_cta_text' );
    $cta_link = get_theme_mod( 'hero_cta_link' );

    if ( ! empty( $cta_text ) && ! empty( $cta_link ) ) :
    ?>
      <a href="<?php echo esc_url( $cta_link ); ?>" class="btn-primary" data-aos="zoom-in" data-aos-delay="400">
        <?php echo esc_html( $cta_text ); ?>
      </a>
    <?php endif; ?>

  </div>
</section>
