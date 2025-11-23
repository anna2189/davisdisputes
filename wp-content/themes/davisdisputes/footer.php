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
<script>
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        // First, check if we can find the menu items
        var parents = document.querySelectorAll('.menu-item-has-children');
        alert('Step 1: Found ' + parents.length + ' parent items');
        
        if (parents.length === 0) {
            // Try alternative selectors
            parents = document.querySelectorAll('.page_item_has_children');
            alert('Step 2: Trying alternative selector, found ' + parents.length);
        }
        
        // If still nothing, check menu structure
        if (parents.length === 0) {
            var anyMenu = document.querySelector('.main-navigation');
            alert('Step 3: Menu exists? ' + (anyMenu ? 'Yes' : 'No'));
            
            if (anyMenu) {
                var html = anyMenu.innerHTML.substring(0, 200);
                alert('Menu HTML preview: ' + html);
            }
        }
        
        // If we found parents, try to fix them
        if (parents.length > 0) {
            var firstParent = parents[0];
            var firstLink = firstParent.querySelector('> a');
            
            if (firstLink) {
                alert('Step 4: First parent link text: ' + firstLink.textContent);
                
                // Make it red so we can see it
                firstLink.style.background = 'red';
                firstLink.style.color = 'white';
                
                // Try the simplest possible fix
                firstLink.onclick = function() {
                    alert('Link clicked!');
                    return false;
                };
            }
        }
    }, 2000);
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