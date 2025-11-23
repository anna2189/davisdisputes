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
      <p class="footer-copy">
        &copy; <?php echo date( 'Y' ); ?> Davis Dispute Advisory |
        Site created by <a href="https://adaconsulting.ca" target="_blank" rel="noopener noreferrer">ADA Consulting</a>
      </p>
    </div>
  </div>
</footer>

<?php wp_footer(); ?>

<!-- Main menu fix -->
<script src="<?php echo get_stylesheet_directory_uri(); ?>/assets/js/safari-menu-fix.js"></script>

<!-- Simple inline submenu fix -->
<script>
window.addEventListener('load', function() {
    setTimeout(function() {
        var items = document.querySelectorAll('.menu-item-has-children > a');
        items.forEach(function(item) {
            item.href = '#';
            item.style.cursor = 'pointer';
        });
    }, 3000);
});
</script>

</body>
</html>