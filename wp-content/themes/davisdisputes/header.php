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
  <!-- Tagline in blue header -->
  <p class="tagline scroll-hidden">
    <?php bloginfo( 'description' ); ?>
  </p>

  <!-- Logo from Site Identity (Customizer) for white header -->
  <?php if ( has_custom_logo() ) : ?>
    <div class="site-logo scroll-visible">
      <?php echo get_custom_logo(); ?>
    </div>
  <?php endif; ?>
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
