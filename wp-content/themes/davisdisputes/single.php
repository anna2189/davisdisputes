<?php
/**
 * The template for displaying all single posts
 * @package DavisDisputes
 */
get_header(); ?>

<style>
/* * This CSS block is for demonstration. 
 * For real-world use, this should be moved to style.css.
 */

/* 1. Style the main content area (to center it and limit width) */
#primary.site-main {
  max-width: 80%; 
  margin: 80px auto; /* Space top/bottom, center horizontally */
  padding: 0 5%;    /* Side padding for responsiveness */
}

/* 2. Style the Featured Image */
.post-thumb {
  margin: 0 auto 2rem;
  width: 100%;
}

.post-thumb img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 4px;
}

/* 3. Style the Post Title (H1 kept for SEO, but styled smaller like H4/H5) */
.entry-title-styled {
  /* H4-like size: clamp(min, preferred, max) */
  font-size: clamp(1.5rem, 4vw, 2rem); 
  font-weight: 700;
  line-height: 1.3;
  color: #0a0466; 
  margin-bottom: 2rem;
  padding-top: 1rem;
}

/* 4. Style the Article Content */
.entry-content {
  line-height: 1.75;
  font-size: 1.125rem;
  color: #333;
}

.entry-content p,
.entry-content ul,
.entry-content ol {
    margin-bottom: 1.5rem;
}
</style>

<main id="primary" class="site-main">
  <?php while ( have_posts() ) : the_post(); ?>

    <?php if ( has_post_thumbnail() ) : ?>
      <figure class="post-thumb"><?php the_post_thumbnail( 'large' ); ?></figure>
    <?php endif; ?>

    <h1 class="entry-title-styled"><?php the_title(); ?></h1>

    <article class="entry-content">
      <?php the_content(); ?>
    </article>

  <?php endwhile; ?>
</main>

<?php get_footer(); ?>