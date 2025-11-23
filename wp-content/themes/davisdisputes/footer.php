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
<script>
setTimeout(function() {
    var servicesItem = document.querySelector('.menu-item-has-children');
    if (!servicesItem) return;
    
    var servicesLink = servicesItem.querySelector('> a');
    if (!servicesLink) return;
    
    // Find ALL possible submenus
    var submenu = servicesItem.querySelector('.sub-menu') || 
                  servicesItem.querySelector('ul') ||
                  servicesItem.querySelector('.children');
    
    if (!submenu) {
        alert('No submenu found!');
        return;
    }
    
    // Make submenu visible but hidden initially
    submenu.style.cssText = 'display: none; visibility: visible !important; opacity: 1 !important; position: static !important; padding-left: 20px !important;';
    
    // Remove link navigation
    servicesLink.href = '#';
    
    // Click handler
    servicesLink.onclick = function(e) {
        e.preventDefault();
        
        if (submenu.style.display === 'none') {
            // FORCE IT VISIBLE
            submenu.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important; position: static !important; padding-left: 20px !important; background: #f0f0f0 !important;';
            
            // Also make sure all child LI and A tags are visible
            var items = submenu.querySelectorAll('li, a');
            items.forEach(function(item) {
                item.style.display = 'block';
                item.style.visibility = 'visible';
                item.style.opacity = '1';
            });
            
            servicesItem.classList.add('open');
        } else {
            submenu.style.display = 'none';
            servicesItem.classList.remove('open');
        }
        return false;
    };
    
    console.log('Force submenu fix applied');
}, 2000);
</script>

<!-- Also add this CSS to force visibility -->
<style>
.menu-item-has-children.open .sub-menu,
.menu-item-has-children.open > ul {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    height: auto !important;
    overflow: visible !important;
    max-height: none !important;
}
.menu-item-has-children.open .sub-menu li,
.menu-item-has-children.open > ul li {
    display: block !important;
    visibility: visible !important;
}
</style>

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