<header class="site-header">
  <div class="container">
    <?php
      if ( function_exists('the_custom_logo') && has_custom_logo() ) {
        the_custom_logo();
      } else {
        echo '<a href="'.home_url().'"><h1>'.get_bloginfo('name').'</h1></a>';
      }
    ?>
    <nav class="site-nav">
      <?php wp_nav_menu( [
        'theme_location' => 'menu-1',
        'menu_class'     => 'main-menu',
      ] ); ?>
    </nav>
  </div>
</header>
