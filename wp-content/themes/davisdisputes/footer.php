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

<!-- iOS Safari Submenu Fix -->
<script>
// Detect iOS Safari
var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if (isIOS) {
    document.addEventListener('touchstart', function() {}, true);
    
    window.addEventListener('load', function() {
        var checkCount = 0;
        var checker = setInterval(function() {
            checkCount++;
            
            var parents = document.querySelectorAll('.menu-item-has-children');
            if (parents.length > 0) {
                clearInterval(checker);
                
                parents.forEach(function(parent) {
                    var link = parent.querySelector('> a');
                    var submenu = parent.querySelector('.sub-menu');
                    
                    if (link && submenu) {
                        // Remove href completely on iOS
                        link.removeAttribute('href');
                        link.style.cursor = 'pointer';
                        
                        // Hide submenu initially
                        submenu.style.display = 'none';
                        
                        // Use touchend instead of click for iOS
                        link.addEventListener('touchend', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            if (submenu.style.display === 'none') {
                                submenu.style.display = 'block';
                                parent.classList.add('open');
                            } else {
                                submenu.style.display = 'none';
                                parent.classList.remove('open');
                            }
                        }, false);
                    }
                });
            }
            
            if (checkCount > 10) clearInterval(checker);
        }, 500);
    });
}
</script>

<!-- iOS-specific CSS -->
<style>
@supports (-webkit-touch-callout: none) {
    /* iOS only styles */
    .menu-item-has-children > a {
        cursor: pointer !important;
        -webkit-touch-callout: none !important;
    }
    .menu-item-has-children .sub-menu {
        -webkit-transform: translate3d(0,0,0);
    }
}
</style>

</body>
</html>