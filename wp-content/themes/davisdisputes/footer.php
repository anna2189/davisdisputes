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

<!-- Working submenu fix (the nuclear version that works) -->
<script>
setTimeout(function() {
    var servicesItem = document.querySelector('.menu-item-has-children');
    if (!servicesItem) return;
    
    var servicesLink = servicesItem.querySelector('> a');
    var submenu = servicesItem.querySelector('.sub-menu');
    
    if (!submenu) return;
    
    // Remove all styles from original submenu
    submenu.removeAttribute('style');
    submenu.className = '';
    
    var allChildren = submenu.querySelectorAll('*');
    allChildren.forEach(function(child) {
        child.removeAttribute('style');
        child.style.display = 'block';
        child.style.visibility = 'visible';
        child.style.opacity = '1';
    });
    
    // Create new container with submenu content
    var newSubmenu = document.createElement('div');
    newSubmenu.innerHTML = submenu.innerHTML;
    newSubmenu.style.cssText = 'display: none; padding: 10px 0 10px 20px;';
    
    servicesItem.appendChild(newSubmenu);
    
    // Toggle handler
    servicesLink.onclick = function(e) {
        e.preventDefault();
        
        if (newSubmenu.style.display === 'none') {
            newSubmenu.style.display = 'block';
            servicesItem.classList.add('open');
        } else {
            newSubmenu.style.display = 'none';
            servicesItem.classList.remove('open');
        }
        return false;
    };
    
}, 2000);
</script>

<!-- Submenu styles -->
<style>
@media (max-width: 768px) {
    .main-navigation.toggled .menu-item-has-children.open > a::after {
        transform: rotate(90deg);
    }
}
</style>

</body>
</html>