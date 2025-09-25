<?php
/**
 * Template Name: Homepage Layout
 *
 * This is the main template file for the homepage layout.
 *
 * @package DavisDisputes
 */

// This loads your header.php file (including the <head> and opening <body> tag)
get_header(); 

// This loads your template-parts/section-hero.php file
get_template_part('template-parts/section', 'hero'); 

?>

<main id="main" class="site-main">
    <?php
    // Standard WordPress loop to display any content you add in the page editor
    if ( have_posts() ) :
        while ( have_posts() ) : the_post();
            the_content();
        endwhile;
    endif;
    ?>
</main><?php
// This loads your footer.php file
get_footer(); 
?>