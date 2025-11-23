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

<!-- iOS Submenu Fix - Final Version -->
<script>
(function() {
    'use strict';
    
    // Wait for everything to load
    window.addEventListener('load', function() {
        setTimeout(function() {
            var parents = document.querySelectorAll('.menu-item-has-children');
            
            parents.forEach(function(parent) {
                var link = parent.querySelector('> a');
                var submenu = parent.querySelector('.sub-menu');
                
                if (!link || !submenu) return;
                
                // Make link non-navigable
                link.setAttribute('href', 'javascript:void(0)');
                link.style.cursor = 'pointer';
                
                // For iOS, we need to use a click event with special handling
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Toggle the submenu
                    if (parent.classList.contains('open')) {
                        parent.classList.remove('open');
                        submenu.style.display = 'none';
                    } else {
                        // Close all other submenus
                        parents.forEach(function(p) {
                            p.classList.remove('open');
                            var sub = p.querySelector('.sub-menu');
                            if (sub) sub.style.display = 'none';
                        });
                        
                        // Open this submenu
                        parent.classList.add('open');
                        submenu.style.display = 'block';
                        submenu.style.visibility = 'visible';
                        submenu.style.opacity = '1';
                        submenu.style.position = 'relative';
                        submenu.style.paddingLeft = '20px';
                    }
                    
                    return false;
                }, false);
                
                // iOS needs this to make elements clickable
                link.style.webkitTapHighlightColor = 'transparent';
                link.style.webkitTouchCallout = 'none';
            });
            
            console.log('Submenu fix applied to', parents.length, 'items');
        }, 2000);
    });
})();
</script>

</body>
</html>