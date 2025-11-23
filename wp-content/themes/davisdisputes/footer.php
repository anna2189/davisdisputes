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

<!-- Submenu toggle fix -->
<script>
setTimeout(function() {
    var parents = document.querySelectorAll('.menu-item-has-children');
    
    parents.forEach(function(parent) {
        var link = parent.querySelector('> a');
        var submenu = parent.querySelector('.sub-menu');
        
        if (!link || !submenu) return;
        
        // Prevent navigation
        link.href = 'javascript:void(0)';
        
        // Toggle submenu on click
        link.onclick = function(e) {
            e.preventDefault();
            
            // Close other submenus
            parents.forEach(function(p) {
                if (p !== parent) {
                    p.classList.remove('open');
                    var otherSub = p.querySelector('.sub-menu');
                    if (otherSub) otherSub.style.display = 'none';
                }
            });
            
            // Toggle this submenu
            if (parent.classList.contains('open')) {
                parent.classList.remove('open');
                submenu.style.display = 'none';
            } else {
                parent.classList.add('open');
                submenu.style.display = 'block';
            }
            
            return false;
        };
    });
}, 1000);
</script>

<!-- Submenu styles -->
<style>
@media (max-width: 768px) {
    .main-navigation.toggled .sub-menu {
        padding-left: 20px !important;
        background: rgba(248, 249, 250, 0.5);
    }
    .main-navigation.toggled .menu-item-has-children.open > a::after {
        transform: rotate(90deg);
    }
}
</style>

</body>
</html>