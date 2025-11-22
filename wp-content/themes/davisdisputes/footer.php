<footer class="site-footer">
  <div class="footer-top">
    <div class="container">
      <nav class="footer-navigation">
        
        <?php
        wp_nav_menu( [
          'theme_location' => 'footer',
          'container'      => false,
          'menu_id'        => 'footer-menu',
          'menu_class'     => 'footer-links',
          'depth'          => 0,
        ] );
        ?>
      </nav>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container footer-bottom-inner">
      <div class="footer-logo">
        <?php if ( function_exists( 'the_custom_logo' ) && has_custom_logo() ) : ?>
          <?php the_custom_logo(); ?>
        <?php else : ?>
          <span class="footer-site-title"><?php bloginfo( 'name' ); ?></span>
        <?php endif; ?>
      </div>

      <p class="footer-copy">
        &copy; <?php echo date( 'Y' ); ?> Davis Dispute Advisory |
        Site created by <a href="https://adaconsulting.ca" target="_blank" rel="noopener noreferrer">ADA Consulting</a>
      </p>
    </div>
  </div>

</footer>

<?php wp_footer(); ?>
</body>
</html>