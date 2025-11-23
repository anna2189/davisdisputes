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
<!-- WORKING SUBMENU FIX -->
<script>
setTimeout(function() {
    var servicesItem = document.querySelector('.menu-item-has-children');
    if (!servicesItem) return;
    
    var servicesLink = servicesItem.querySelector('> a');
    var submenu = servicesItem.querySelector('.sub-menu');
    
    if (!submenu) return;
    
    // Initially hide it properly
    submenu.style.display = 'none';
    
    // Remove href to prevent navigation
    servicesLink.href = 'javascript:void(0)';
    
    // Simple toggle
    servicesLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (submenu.style.display === 'none' || submenu.style.display === '') {
            // SHOW IT
            submenu.style.display = 'block';
            submenu.style.visibility = 'visible';
            submenu.style.opacity = '1';
            submenu.style.position = 'static';
            submenu.style.paddingLeft = '20px';
            submenu.style.background = '#f5f5f5';
            
            // Make sure all items inside are visible
            var items = submenu.querySelectorAll('li, a');
            items.forEach(function(item) {
                item.style.display = 'block';
                item.style.padding = '10px';
            });
            
            servicesItem.classList.add('open');
        } else {
            // HIDE IT
            submenu.style.display = 'none';
            servicesItem.classList.remove('open');
        }
        
        return false;
    });
    
    console.log('Submenu fix applied - submenu found and ready');
}, 1500);
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