<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package DavisDisputes
 */

get_header();
?>

	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		<section class="page-hero">
			<div class="section-container">
				<h1 class="page-title"><?php the_title(); ?></h1>
			</div>
			<?php if ( has_post_thumbnail() ) : ?>
				<div class="page-hero-media">
					<?php the_post_thumbnail( 'full', array( 'class' => 'page-hero-image' ) ); ?>
				</div>
			<?php endif; ?>
		</section>
		<?php break; endwhile; endif; // Prime loop for hero and rewind ?>

	<?php rewind_posts(); ?>

	<main id="primary" class="site-main">
		<div class="section-container">
			<?php
			while ( have_posts() ) :
				the_post();

				get_template_part( 'template-parts/content', 'page' );

			endwhile; // End of the loop.
			?>
		</div>
	</main><!-- #main -->

<?php
get_footer();
