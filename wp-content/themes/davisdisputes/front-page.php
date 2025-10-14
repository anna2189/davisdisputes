<?php get_header(); ?>
<?php get_template_part('template-parts/section', 'hero'); ?>
<?php get_template_part('template-parts/section', 'intro'); ?>
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

<?php
// News Section - Display 3 latest posts if any exist
$news_posts = new WP_Query(array(
    'post_type' => 'post',
    'posts_per_page' => 3,
    'post_status' => 'publish'
));

if ($news_posts->have_posts()) :
?>
<section class="news-section">
    <div class="section-container">
        <h2 class="news-title">News</h2>
        <div class="news-grid">
            <?php while ($news_posts->have_posts()) : $news_posts->the_post(); ?>
                <article class="news-item">
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="news-thumbnail">
                            <a href="<?php the_permalink(); ?>">
                                <?php the_post_thumbnail('medium', array('class' => 'news-image')); ?>
                            </a>
                        </div>
                    <?php endif; ?>
                    <div class="news-content">
                        <h3 class="news-item-title">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h3>
                        <div class="news-meta">
                            <time class="news-date" datetime="<?php echo esc_attr(get_the_date('c')); ?>">
                                <?php echo esc_html(get_the_date()); ?>
                            </time>
                        </div>
                        <div class="news-excerpt">
                            <?php the_excerpt(); ?>
                        </div>
                        <a href="<?php the_permalink(); ?>" class="news-read-more">Read More</a>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>
    </div>
</section>
<?php 
endif;
wp_reset_postdata();
?>

<?php get_footer(); ?>
