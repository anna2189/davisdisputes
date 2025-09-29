<?php
/**
 * DavisDisputes functions and definitions
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 * @package DavisDisputes
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '2.0.1' ); // Increment version to force cache bust
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function davisdisputes_setup() {
	load_theme_textdomain( 'davisdisputes', get_template_directory() . '/languages' );

	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );

	register_nav_menus([
		'primary' => esc_html__( 'Primary Menu', 'davisdisputes' ),
		'footer' => esc_html__( 'Footer Menu', 'davisdisputes' ),
	]);

	add_theme_support( 'html5', [
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
		'style',
		'script',
	]);

	add_theme_support( 'custom-background', apply_filters( 'davisdisputes_custom_background_args', [
		'default-color' => 'ffffff',
		'default-image' => '',
	]));

	add_theme_support( 'customize-selective-refresh-widgets' );

	add_theme_support( 'custom-logo', [
		'height'      => 250,
		'width'       => 250,
		'flex-width'  => true,
		'flex-height' => true,
	]);

	add_theme_support( 'custom-header', [
		'default-text-color' => 'ffffff',
		'header-text' => true,
		'wp-head-callback' => 'davisdisputes_header_style'
	]);
}
add_action( 'after_setup_theme', 'davisdisputes_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 */
function davisdisputes_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'davisdisputes_content_width', 640 );
}
add_action( 'after_setup_theme', 'davisdisputes_content_width', 0 );

/**
 * Register widget area.
 */
function davisdisputes_widgets_init() {
	register_sidebar([
		'name'          => esc_html__( 'Sidebar', 'davisdisputes' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'davisdisputes' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	]);
}
add_action( 'widgets_init', 'davisdisputes_widgets_init' );

/**
 * Enqueue Modern Scripts and Styles
 */
function davisdisputes_enqueue_assets() {
	// Google Fonts - Professional Typography
	wp_enqueue_style( 'google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:wght@300;400;700&display=swap', [], null );
	
	// Adobe Fonts (keep your existing)
	wp_enqueue_style( 'adobe-fonts', 'https://use.typekit.net/mde6cbv.css', [], null );
	
	// GSAP for Professional Animations
	wp_enqueue_script( 'gsap-core', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', [], '3.12.2', true );
	wp_enqueue_script( 'gsap-scrolltrigger', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js', ['gsap-core'], '3.12.2', true );
	
	// Original theme styles
	$main_css = get_stylesheet_directory() . '/style.css';
	$main_css_version = file_exists($main_css) ? filemtime($main_css) : '2.0.0';
	wp_enqueue_style('davisdisputes-style', get_stylesheet_uri(), array(), $main_css_version);
	wp_style_add_data( 'davisdisputes-style', 'rtl', 'replace' );
	
	// Modern Theme Styles
	$css_file = get_template_directory() . '/assets/css/modern-theme.css';
	$css_version = file_exists($css_file) ? filemtime($css_file) : '2.0.0';
	wp_enqueue_style( 'davisdisputes-modern', get_template_directory_uri() . '/assets/css/modern-theme.css', ['davisdisputes-style'], $css_version );
	
	// Modern Theme Scripts
	$js_file = get_template_directory() . '/assets/js/modern-animations.js';
	$js_version = file_exists($js_file) ? filemtime($js_file) : '2.0.0';
	wp_enqueue_script( 'davisdisputes-modern', get_template_directory_uri() . '/assets/js/modern-animations.js', ['gsap-scrolltrigger'], $js_version, true );
	
	// Pass data to JavaScript
	wp_localize_script( 'davisdisputes-modern', 'davisAjax', [
		'ajaxurl' => admin_url( 'admin-ajax.php' ),
		'nonce' => wp_create_nonce( 'davis_nonce' )
	]);

	// Custom JS (keep existing) - check if file exists first
	$custom_js = get_template_directory() . '/js/custom.js';
	if ( file_exists($custom_js) ) {
		wp_enqueue_script( 'davisdisputes-custom', get_template_directory_uri() . '/js/custom.js', ['davisdisputes-modern'], filemtime($custom_js), true );
	}

	// Comment reply script
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'davisdisputes_enqueue_assets' );

/**
 * Styles the header text and description.
 */
function davisdisputes_header_style() {
	$text_color = get_header_textcolor();

	if ( ! display_header_text() ) {
		echo '<style>.site-title, .site-description { position: absolute; clip: rect(1px,1px,1px,1px); }</style>';
	} else {
		echo '<style>.site-title a, .site-description { color: #' . esc_attr( $text_color ) . '; }</style>';
	}
}

/**
 * Include other theme files for custom functionality.
 */
require get_template_directory() . '/inc/custom-header.php';
require get_template_directory() . '/inc/template-tags.php';
require get_template_directory() . '/inc/template-functions.php';
require get_template_directory() . '/inc/customizer.php';

if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

/**
 * Prints the mobile menu script directly into the footer.
 * This is a failsafe method to avoid script loading conflicts.
 */
function davisdisputes_footer_menu_script() {
    ?>
    <script type="text/javascript" id="davisdisputes-footer-menu-js">
    document.addEventListener('click', function (event) {
        // Find the closest parent element which is the toggle button
        const navToggle = event.target.closest('.mobile-nav-toggle');

        if (navToggle) {
            event.preventDefault(); // Stop any default action
            const primaryNav = document.querySelector('.main-navigation');

            if (primaryNav) {
                primaryNav.classList.toggle('toggled');
                const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
                navToggle.setAttribute('aria-expanded', !isExpanded);
            }
        }
    });
    </script>
    <?php
}
add_action('wp_footer', 'davisdisputes_footer_menu_script', 99);

/**
 * Custom Post Types for Services and Case Studies
 */
function davisdisputes_register_post_types() {
    // Services Post Type
    register_post_type( 'services', [
        'labels' => [
            'name' => __( 'Services', 'davisdisputes' ),
            'singular_name' => __( 'Service', 'davisdisputes' ),
            'add_new' => __( 'Add New Service', 'davisdisputes' ),
            'add_new_item' => __( 'Add New Service', 'davisdisputes' ),
            'edit_item' => __( 'Edit Service', 'davisdisputes' ),
            'new_item' => __( 'New Service', 'davisdisputes' ),
            'view_item' => __( 'View Service', 'davisdisputes' ),
            'search_items' => __( 'Search Services', 'davisdisputes' ),
            'not_found' => __( 'No services found', 'davisdisputes' ),
            'not_found_in_trash' => __( 'No services found in trash', 'davisdisputes' ),
        ],
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-portfolio',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
        'rewrite' => ['slug' => 'services'],
        'show_in_rest' => true,
    ]);
    
    // Case Studies Post Type
    register_post_type( 'case_studies', [
        'labels' => [
            'name' => __( 'Case Studies', 'davisdisputes' ),
            'singular_name' => __( 'Case Study', 'davisdisputes' ),
            'add_new' => __( 'Add New Case Study', 'davisdisputes' ),
            'add_new_item' => __( 'Add New Case Study', 'davisdisputes' ),
            'edit_item' => __( 'Edit Case Study', 'davisdisputes' ),
            'new_item' => __( 'New Case Study', 'davisdisputes' ),
            'view_item' => __( 'View Case Study', 'davisdisputes' ),
            'search_items' => __( 'Search Case Studies', 'davisdisputes' ),
            'not_found' => __( 'No case studies found', 'davisdisputes' ),
            'not_found_in_trash' => __( 'No case studies found in trash', 'davisdisputes' ),
        ],
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-awards',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
        'rewrite' => ['slug' => 'experience'],
        'show_in_rest' => true,
    ]);
}
add_action( 'init', 'davisdisputes_register_post_types' );

/**
 * Advanced Customizer Options
 */
function davisdisputes_modern_customizer( $wp_customize ) {
    // Hero Section
    $wp_customize->add_section( 'hero_modern', [
        'title' => __( 'Hero Section - Modern', 'davisdisputes' ),
        'priority' => 30,
    ]);
    
    $wp_customize->add_setting( 'hero_main_title', [
        'default' => 'Clarity. Strategy. Recovery.',
        'transport' => 'refresh',
        'sanitize_callback' => 'sanitize_text_field',
    ]);
    
    $wp_customize->add_control( 'hero_main_title', [
        'label' => __( 'Main Title', 'davisdisputes' ),
        'section' => 'hero_modern',
        'type' => 'text',
    ]);
    
    $wp_customize->add_setting( 'hero_tagline', [
        'default' => 'Turning complex disputes into assets',
        'transport' => 'refresh',
        'sanitize_callback' => 'sanitize_text_field',
    ]);
    
    $wp_customize->add_control( 'hero_tagline', [
        'label' => __( 'Tagline', 'davisdisputes' ),
        'section' => 'hero_modern',
        'type' => 'text',
    ]);
    
    // Contact Information
    $wp_customize->add_section( 'contact_info', [
        'title' => __( 'Contact Information', 'davisdisputes' ),
        'priority' => 40,
    ]);
    
    $wp_customize->add_setting( 'linkedin_company_url', [
        'sanitize_callback' => 'esc_url_raw',
    ]);
    $wp_customize->add_control( 'linkedin_company_url', [
        'label' => __( 'LinkedIn Company URL', 'davisdisputes' ),
        'section' => 'contact_info',
        'type' => 'url',
    ]);
    
    $wp_customize->add_setting( 'linkedin_personal_url', [
        'sanitize_callback' => 'esc_url_raw',
    ]);
    $wp_customize->add_control( 'linkedin_personal_url', [
        'label' => __( 'LinkedIn Personal URL', 'davisdisputes' ),
        'section' => 'contact_info',
        'type' => 'url',
    ]);
    
    $wp_customize->add_setting( 'cv_download_url', [
        'sanitize_callback' => 'esc_url_raw',
    ]);
    $wp_customize->add_control( 'cv_download_url', [
        'label' => __( 'CV Download URL', 'davisdisputes' ),
        'section' => 'contact_info',
        'type' => 'url',
    ]);
}
add_action( 'customize_register', 'davisdisputes_modern_customizer' );

/**
 * AJAX Handler for Dynamic Content Loading
 */
function davisdisputes_load_case_studies() {
    check_ajax_referer( 'davis_nonce', 'nonce' );
    
    $category = sanitize_text_field( $_POST['category'] );
    
    $args = [
        'post_type' => 'case_studies',
        'posts_per_page' => -1,
        'meta_key' => 'case_category',
        'meta_value' => $category,
    ];
    
    $query = new WP_Query( $args );
    
    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
            $query->the_post();
            ?>
            <div class="case-card" data-gsap="fade-up">
                <?php if ( get_field('case_value') ) : ?>
                    <div class="case-value"><?php the_field('case_value'); ?></div>
                <?php endif; ?>
                <h3 class="case-title"><?php the_title(); ?></h3>
                <p class="case-description"><?php the_excerpt(); ?></p>
            </div>
            <?php
        }
    } else {
        echo '<p>No case studies found for this category.</p>';
    }
    
    wp_reset_postdata();
    wp_die();
}
add_action( 'wp_ajax_load_case_studies', 'davisdisputes_load_case_studies' );
add_action( 'wp_ajax_nopriv_load_case_studies', 'davisdisputes_load_case_studies' );

/**
 * Fix cookie security issues
 */
function davisdisputes_fix_cookie_security() {
    // Fix for secure cookie warnings in development
    if (!is_ssl() && (defined('WP_DEBUG') && WP_DEBUG)) {
        // Only apply in development/debug mode
        add_action('init', function() {
            // Set secure cookie parameters for development
            if (function_exists('session_set_cookie_params')) {
                session_set_cookie_params([
                    'lifetime' => 0,
                    'path' => '/',
                    'domain' => '',
                    'secure' => false, // Allow non-HTTPS in development
                    'httponly' => true,
                    'samesite' => 'Lax'
                ]);
            }
        });
    }
}
add_action('after_setup_theme', 'davisdisputes_fix_cookie_security');

/**
 * Remove problematic cookie warnings from plugins
 */
function davisdisputes_clean_cookie_warnings() {
    // Suppress cookie-related PHP warnings in development
    if (defined('WP_DEBUG') && WP_DEBUG) {
        // Filter out cookie warnings from error reporting
        add_filter('wp_php_error_message', function($message, $error) {
            if (strpos($message, 'cookie') !== false || strpos($message, 'pll_language') !== false) {
                return ''; // Suppress cookie-related warnings
            }
            return $message;
        }, 10, 2);
    }
}
add_action('init', 'davisdisputes_clean_cookie_warnings');
