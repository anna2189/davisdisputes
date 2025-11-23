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
<!-- FORCE SUBMENU VISIBLE -->
<!-- DIAGNOSTIC: What's actually in the menu? -->
<!-- DIAGNOSTIC: What's actually in the menu? -->
<script>
setTimeout(function() {
    var servicesItem = document.querySelector('.menu-item-has-children');
    if (!servicesItem) {
        alert('No parent item found');
        return;
    }
    
    // Check what's inside Services item
    var html = servicesItem.innerHTML;
    alert('Services contains: ' + html.substring(0, 300));
    
    // Look for submenu
    var submenu = servicesItem.querySelector('.sub-menu');
    if (submenu) {
        alert('Submenu found with ' + submenu.children.length + ' items');
        // Force it visible with red border
        submenu.style.cssText = 'display: block !important; border: 3px solid red !important; background: yellow !important; padding: 20px !important; position: static !important;';
    } else {
        // Try alternative selectors
        var anyUL = servicesItem.querySelector('ul');
        if (anyUL) {
            alert('Found UL with ' + anyUL.children.length + ' items');
            anyUL.style.cssText = 'display: block !important; border: 3px solid red !important; background: yellow !important; padding: 20px !important;';
        } else {
            alert('NO SUBMENU FOUND AT ALL!');
        }
    }
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