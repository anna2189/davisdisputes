<?php
/**
 * Plugin Name: ADA Single Card Block
 * Description: A simple Gutenberg block that renders a modern card with editable title, text, and optional button. No build step required.
 * Version: 0.1.1
 * Author: AdaConsulting
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: ada-single-card-block
 *
 * @package ada-single-card-block
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ada_single_card_block_register() {
    register_block_type( __DIR__ );
}
add_action( 'init', 'ada_single_card_block_register' );
