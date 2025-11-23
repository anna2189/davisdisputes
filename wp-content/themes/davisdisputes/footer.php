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

<!-- Main menu fix (only load ONCE) -->
<script src="<?php echo get_stylesheet_directory_uri(); ?>/assets/js/safari-menu-fix.js"></script>

<!-- Submenu fix -->
<!-- Submenu Debug -->
<!-- Simple Submenu Fix -->
<script>
setTimeout(function() {
    // Get Services menu item specifically
    var servicesItem = document.querySelector('.menu-item-has-children');
    if (!servicesItem) return;
    
    var servicesLink = servicesItem.querySelector('> a');
    if (!servicesLink) return;
    
    // Get the submenu
    var submenu = servicesItem.querySelector('ul');
    if (!submenu) return;
    
    // Hide submenu initially
    submenu.style.display = 'none';
    
    // Replace the link with a button
    servicesLink.style.cursor = 'pointer';
    servicesLink.removeAttribute('href');
    
    // Simple click handler
    servicesLink.onclick = function(e) {
        e.preventDefault();
        if (submenu.style.display === 'none') {
            submenu.style.display = 'block';
            submenu.style.paddingLeft = '20px';
            servicesItem.classList.add('open');
        } else {
            submenu.style.display = 'none';
            servicesItem.classList.remove('open');
        }
        return false;
    };
    
    console.log('Submenu fix applied');
}, 2000);
</script>

<!-- Force CSS -->
<style>
@media (max-width: 768px) {
    .main-navigation.toggled .menu-item-has-children > ul {
        display: none !important;
    }
    .main-navigation.toggled .menu-item-has-children.open > ul {
        display: block !important;
        padding-left: 20px !important;
    }
}
</style>

</body>
</html>