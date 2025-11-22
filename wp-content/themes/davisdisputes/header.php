<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<header id="site-header" class="site-header">
  <div class="container">

    <div class="branding">
      <!-- BLUE HEADER: tagline -->
      <div class="tagline scroll-hidden">
        Turning cross-border disputes into assets
      </div>

      <!-- WHITE HEADER: image logo -->
      <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-logo scroll-visible">
  <img
    src="<?php echo get_stylesheet_directory_uri(); ?>/images/logo/logo_70px.png"
    srcset="<?php echo get_stylesheet_directory_uri(); ?>/images/logo/logo_70px.png 1x,
            <?php echo get_stylesheet_directory_uri(); ?>/images/logo/logo_140px.png 2x"
    alt="<?php bloginfo( 'name' ); ?>"
    class="header-logo-img"
  />
</a>

    </div>

    <button class="mobile-nav-toggle" type="button" aria-controls="primary-menu" aria-expanded="false">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </button>

    <nav class="main-navigation" id="primary-menu">
      <?php
        wp_nav_menu( array(
          'theme_location' => 'primary',
          'menu_class'     => '',
          'container'      => false,
          'fallback_cb'    => 'wp_page_menu',
          'depth'          => 2
        ) );
      ?>
    </nav>

  </div>
</header>
