<?php
/**
 * DavisDisputes functions and definitions
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 * @package DavisDisputes
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
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
		'menu-1' => esc_html__( 'Primary', 'davisdisputes' ),
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
 * Enqueue scripts and styles.
 */
function davisdisputes_enqueue_assets() {
	// ADDED: Enqueue Adobe Fonts stylesheet
	wp_enqueue_style( 'adobe-fonts', 'https://use.typekit.net/mde6cbv.css', [], null );

	// MODIFIED: This line now includes a cache-busting version number
	wp_enqueue_style('davisdisputes-style', get_stylesheet_uri(), array(), filemtime(get_stylesheet_directory() . '/style.css'));
	wp_style_add_data( 'davisdisputes-style', 'rtl', 'replace' );

	// AOS animation library
	wp_enqueue_style( 'aos-css', 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css', [], null );
	wp_enqueue_script( 'aos-js', 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js', [], null, true );
	wp_add_inline_script( 'aos-js', 'AOS.init();' );

	// Custom JS
	wp_enqueue_script( 'davisdisputes-custom', get_template_directory_uri() . '/js/custom.js', ['aos-js'], null, true );

	// REMOVED: The old navigation script that was causing a conflict.
	// wp_enqueue_script( 'davisdisputes-navigation', get_template_directory_uri() . '/js/navigation.js', [], _S_VERSION, true );

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