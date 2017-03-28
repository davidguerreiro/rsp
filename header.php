<?php

/**
 * Header Template
 *
 * @since 1.0.0
 */

/**
 * PHP basic funcionality library
 */
require_once( './inc/utilities.php' );


const VERSION = '0.1';
const STATUS  = 'Beta';

?>


<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" href="./css/awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" href="./css/normalize.css">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans|Overpass+Mono|Press+Start+2P">
    <title>RSP</title>
  </head>
  <body>
    <header class="main-header">
      <nav>
        <ul class="header">
          <li>
            <span>RSP - <?php echo VERSION; ?> - <?php echo STATUS; ?></span>
          </li>
        </ul>
      </nav>
    </header>
    <section id="main">
