<footer class="site-footer">
  <div class="footer-top">
    <div class="container">
      <nav class="footer-navigation">
        <button class="mobile-nav-toggle footer-mobile-toggle" aria-controls="footer-menu" aria-expanded="false">
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
        </button>
        <?php
        wp_nav_menu( [
          'theme_location' => 'footer',
          'container'      => false,
          'menu_id'        => 'footer-menu',
          'menu_class'     => 'footer-links',
          'depth'          => 1,
        ] );
        ?>
      </nav>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container">
      <p>&copy; <?php echo date('Y'); ?> Davis Dispute Advisory | Site created by <a href="https://adaconsulting.ca" target="_blank" rel="noopener noreferrer">ADA Consulting</a></p>
    </div>
  </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
