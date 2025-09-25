<?php
/**
 * DavisDisputes Theme Customizer
 *
 * @package DavisDisputes
 */

/**
 * Add theme options to the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function davisdisputes_customize_register( $wp_customize ) {

	// --- HERO SECTION ---
	$wp_customize->add_section('hero', [
		'title'       => __( 'Hero Section', 'davisdisputes' ),
		'priority'    => 30,
	]);

	// Hero Background Image
	$wp_customize->add_setting('hero_image_url');
	$wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'hero_image_url_control', [
		'label'    => __( 'Hero Background Image', 'davisdisputes' ),
		'section'  => 'hero',
		'settings' => 'hero_image_url',
	]));

	// Hero Heading
	$wp_customize->add_setting('hero_heading', [
		'default'   => 'DAVIS',
		'transport' => 'refresh',
	]);
	$wp_customize->add_control('hero_heading_control', [
		'label'     => __( 'Hero Heading', 'davisdisputes' ),
		'section'   => 'hero',
		'settings'  => 'hero_heading',
		'type'      => 'text',
	]);

	// Hero Subheading
	$wp_customize->add_setting('hero_subheading', [
		'default'   => 'DISPUTE RESOLUTION',
		'transport' => 'refresh',
	]);
	$wp_customize->add_control('hero_subheading_control', [
		'label'     => __( 'Hero Subheading', 'davisdisputes' ),
		'section'   => 'hero',
		'settings'  => 'hero_subheading',
		'type'      => 'text',
	]);

	// Hero CTA Button Text
	$wp_customize->add_setting('hero_cta_text', [
		'default'   => 'Learn More',
		'transport' => 'refresh',
	]);
	$wp_customize->add_control('hero_cta_text_control', [
		'label'     => __( 'CTA Button Text', 'davisdisputes' ),
		'section'   => 'hero',
		'settings'  => 'hero_cta_text',
		'type'      => 'text',
	]);

	// Hero CTA Button Link
	$wp_customize->add_setting('hero_cta_link', [
		'default'   => '#',
		'transport' => 'refresh',
	]);
	$wp_customize->add_control('hero_cta_link_control', [
		'label'     => __( 'CTA Button Link', 'davisdisputes' ),
		'section'   => 'hero',
		'settings'  => 'hero_cta_link',
		'type'      => 'url',
	]);
}
add_action( 'customize_register', 'davisdisputes_customize_register' );