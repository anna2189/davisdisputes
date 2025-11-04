<?php
/**
 * Template Name: Minimal (No Hero, No Top Margin)
 * Description: Same layout as no-title template, but without featured image and without top margin.
 * @package DavisDisputes
 */

defined('ABSPATH') || exit;
get_header();
?>

<main id="primary" class="site-main site-main--minimal">
  <?php while ( have_posts() ) : the_post(); ?>

    <div class="entry-content">
      <?php the_content(); ?>
    </div>

  <?php endwhile; ?>
</main>

<?php get_footer();
