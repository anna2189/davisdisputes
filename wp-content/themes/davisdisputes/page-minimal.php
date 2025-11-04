<?php
/**
 * Template Name: Minimal (No Hero, Small Margin)
 * Description: Same layout as no-title template, but without featured image and with small top margin.
 * @package DavisDisputes
 */

defined('ABSPATH') || exit;
get_header();
?>

<main id="primary" class="site-main">
  <?php while ( have_posts() ) : the_post(); ?>

    <div class="entry-content entry-content--minimal">
      <?php the_content(); ?>
    </div>

  <?php endwhile; ?>
</main>

<?php get_footer();

