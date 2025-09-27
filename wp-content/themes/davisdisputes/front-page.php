<?php get_header(); ?>
<?php get_template_part('template-parts/section', 'hero'); ?>
<?php get_template_part('template-parts/section', 'offer'); ?>
<?php get_template_part('template-parts/section', 'approach'); ?>

<main>
  <?php 
 if ( have_posts() ) :
      while ( have_posts() ) : the_post();
          the_content(); // This will display the content from your assigned front page
      endwhile;
  endif;
  ?>
</main>

<?php get_footer(); ?>
