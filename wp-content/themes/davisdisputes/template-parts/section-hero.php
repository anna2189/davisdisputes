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

<section class="hero">
  <?php if ( $hero_image_url ) : ?>
    <img class="hero-img" src="<?php echo esc_url( $hero_image_url ); ?>" alt="">
  <?php endif; ?>
  
  <div class="overlay"></div>
  <div class="hero-content">

    <?php
    // MODIFIED: Only display the H1 and P tags if we are on the homepage.
    if ( is_front_page() ) : 
    ?>
      <h1 data-aos="fade-up">
        <?php echo esc_html( get_theme_mod( 'hero_heading', 'DAVIS' ) ); ?>
      </h1>

      <p data-aos="fade-up" data-aos-delay="200">
        <?php echo esc_html( get_theme_mod( 'hero_subheading', 'DISPUTE RESOLUTION' ) ); ?>
      </p>
    <?php 
    endif; // End of the homepage-only check.
    ?>

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