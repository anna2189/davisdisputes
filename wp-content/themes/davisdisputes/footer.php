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

<!-- iOS-Specific Submenu Fix -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Detect iOS (works for all iOS browsers)
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    setTimeout(function() {
        var parents = document.querySelectorAll('.menu-item-has-children');
        
        parents.forEach(function(parent) {
            var link = parent.querySelector('> a');
            var submenu = parent.querySelector('.sub-menu');
            
            if (!link || !submenu) return;
            
            // Prevent navigation
            link.href = '#';
            link.style.cursor = 'pointer';
            
            // For iOS, use both touchstart AND click
            if (isIOS) {
                // iOS touch handler
                link.addEventListener('touchstart', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Toggle submenu directly with inline styles
                    if (submenu.style.display === 'block') {
                        submenu.style.display = 'none';
                        parent.classList.remove('open');
                    } else {
                        // Hide all other submenus
                        document.querySelectorAll('.sub-menu').forEach(function(s) {
                            s.style.display = 'none';
                        });
                        document.querySelectorAll('.menu-item-has-children').forEach(function(p) {
                            p.classList.remove('open');
                        });
                        
                        // Show this submenu
                        submenu.style.display = 'block';
                        parent.classList.add('open');
                    }
                }, {passive: false});
            } else {
                // Android/Desktop click handler
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    parent.classList.toggle('open');
                });
            }
        });
    }, 1500);
});
</script>

<!-- Simple CSS without blocking rules -->
<style>
@media (max-width: 768px) {
    .menu-item-has-children .sub-menu {
        padding-left: 20px;
    }
    .menu-item-has-children.open > a::after {
        transform: rotate(180deg);
    }
}
</style>

</body>
</html>