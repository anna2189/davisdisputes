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
<script src="<?php echo get_stylesheet_directory_uri(); ?>/assets/js/safari-menu-fix.js"></script>
<?php wp_footer(); ?>

<!-- Main menu fix -->
<script src="<?php echo get_stylesheet_directory_uri(); ?>/js/safari-menu-fix.js"></script>

<!-- Submenu fix -->
<?php wp_footer(); ?>
<script src="<?php echo get_stylesheet_directory_uri(); ?>/assets/js/safari-menu-fix.js"></script>

<!-- FORCEFUL SUBMENU FIX -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Wait for everything to load
    setTimeout(function() {
        // Find all parent menu items
        var parents = document.querySelectorAll('.menu-item-has-children');
        
        parents.forEach(function(parent) {
            var link = parent.querySelector('> a');
            if (!link) return;
            
            // REMOVE the href to prevent navigation
            link.setAttribute('href', '#');
            
            // Add click handler
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle submenu
                if (parent.classList.contains('open')) {
                    parent.classList.remove('open');
                } else {
                    // Close all others first
                    parents.forEach(function(p) {
                        p.classList.remove('open');
                    });
                    parent.classList.add('open');
                }
                
                return false;
            });
        });
        
        console.log('Submenu fix applied to ' + parents.length + ' items');
    }, 1000);
});
</script>

<!-- FORCE CSS directly in page -->
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

</body>
</html>
</body>
</html>