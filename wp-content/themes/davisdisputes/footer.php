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
<script>
(function() {
    function fixSubmenus() {
        document.querySelectorAll('.menu-item-has-children > a').forEach(function(link) {
            link.onclick = function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const parent = this.parentElement;
                    parent.classList.toggle('open');
                    const submenu = parent.querySelector('.sub-menu, > ul');
                    if (submenu) {
                        submenu.style.display = parent.classList.contains('open') ? 'block' : 'none';
                    }
                    return false;
                }
            };
        });
    }
    setTimeout(fixSubmenus, 100);
    setTimeout(fixSubmenus, 500);
    setTimeout(fixSubmenus, 1000);
})();
</script>

</body>
</html>
</body>
</html>