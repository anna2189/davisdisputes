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

<!-- Submenu Toggle Fix -->
<script>
window.addEventListener('load', function() {
    setTimeout(function() {
        var parents = document.querySelectorAll('.menu-item-has-children');
        
        parents.forEach(function(parent) {
            var link = parent.querySelector('> a');
            var submenu = parent.querySelector('.sub-menu');
            
            if (!link || !submenu) return;
            
            // Remove link navigation
            link.href = 'javascript:void(0)';
            link.style.cursor = 'pointer';
            
            // Click handler for all devices including iOS
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle open class
                if (parent.classList.contains('open')) {
                    parent.classList.remove('open');
                    submenu.style.removeProperty('display');
                } else {
                    // Close others
                    parents.forEach(function(p) {
                        p.classList.remove('open');
                        var otherSub = p.querySelector('.sub-menu');
                        if (otherSub) otherSub.style.removeProperty('display');
                    });
                    
                    // Open this one
                    parent.classList.add('open');
                    submenu.style.setProperty('display', 'block', 'important');
                }
                
                return false;
            });
        });
    }, 1500);
});
</script>

</body>
</html>