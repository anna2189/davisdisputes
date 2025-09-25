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
      <p class="site-slogan"><?php bloginfo( 'description' ); ?></p>

      <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="text-logo">
        <span class="text-logo-main"><?php echo esc_html( get_theme_mod( 'hero_heading', 'DAVIS' ) ); ?></span>
        <span class="text-logo-sub"><?php echo esc_html( get_theme_mod( 'hero_subheading', 'DISPUTE RESOLUTION' ) ); ?></span>
      </a>
    </div>

    <button class="mobile-nav-toggle" aria-controls="primary-menu" aria-expanded="false">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </button>

    <nav class="main-navigation" id="primary-menu">
      <?php
        wp_nav_menu( array(
          'theme_location' => 'menu-1',
          'menu_class'     => '',
          'container'      => false
        ) );
      ?>
    </nav>
  </div>
</header>