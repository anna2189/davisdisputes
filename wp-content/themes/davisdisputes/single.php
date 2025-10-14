<?php
/**
 * The template for displaying all single posts
 * @package DavisDisputes
 */
get_header(); ?>

<main id="primary" class="site-main">
  <?php while ( have_posts() ) : the_post(); ?>

    <?php if ( has_post_thumbnail() ) : ?>
      <figure class="post-thumb"><?php the_post_thumbnail( 'large' ); ?></figure>
    <?php endif; ?>

    <h1 class="entry-title"><?php the_title(); ?></h1>

    <article class="entry-content">
      <?php the_content(); ?>
    </article>

  <?php endwhile; ?>
</main>

<?php get_footer();
