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
<script>
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var parents = document.querySelectorAll('.menu-item-has-children');
        
        parents.forEach(function(parent) {
            var link = parent.querySelector('> a');
            if (!link) return;
            
            link.setAttribute('href', '#');
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (parent.classList.contains('open')) {
                    parent.classList.remove('open');
                } else {
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