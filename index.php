<?php
/*
Plugin Name: LG - Quicksand Menus
Version: 0.1
Plugin URI: http://lifegadget.co/plugins
Description: Adds appropriate 3rd party JS and CSS to enable Quicksand Navigation (http://http://razorjack.net/quicksand). Libraries needed include: jquery.css-transform and jquery.easing.1.3.
Author: Ken Snyder
Author URI: http://ken.net
*/
/**
 * Copyright (c) 2012 Ken Snyder. All rights reserved.
 *
 * Released under the GPL license
 * http://www.opensource.org/licenses/gpl-license.php
 *
 * This is an add-on for WordPress
 * http://wordpress.org/
 *
 * **********************************************************************
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * **********************************************************************
 */

// include() or require()
include_once('includes/lg-quicksand.php');

// settings or configuration details


// Wordpress hooks and loadtime functions

// add_action('init', 'QuickSand::initialise');
add_action('wp_enqueue_scripts', 'QuickSand::add_dependant_scripts');

// Private internal functions


// Public functions




/* END OF FILE */