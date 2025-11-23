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

<!-- Submenu fix -->
<script>
setTimeout(function() {
    var servicesItem = document.querySelector('.menu-item-has-children');
    if (!servicesItem) return;
    
    var servicesLink = servicesItem.querySelector('> a');
    var submenu = servicesItem.querySelector('.sub-menu');
    
    if (!submenu) return;
    
    // Create NEW visible element
    var newSubmenu = document.createElement('div');
    newSubmenu.innerHTML = submenu.innerHTML;
    newSubmenu.style.cssText = 'display: none; background: yellow !important; border: 3px solid red !important; padding: 20px !important; margin: 10px !important; position: relative !important; z-index: 99999 !important;';
    
    servicesItem.appendChild(newSubmenu);
    
    servicesLink.onclick = function(e) {
        e.preventDefault();
        
        if (newSubmenu.style.display === 'none') {
            newSubmenu.style.display = 'block';
            alert('Yellow box should be visible now!');
        } else {
            newSubmenu.style.display = 'none';
        }
        return false;
    };
    
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