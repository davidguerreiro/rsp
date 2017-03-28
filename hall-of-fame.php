<?php


/**
 * Hall of fame template
 *
 * @since 1.0.0
 */

require( 'header.php' );

$players = ppt_get_best_players();
var_dump( $players );
die();

?>

<section class="game-section page">
  <h2 class="page-title">Hall of the fame</h2>
  <p class="page-text">
    The name of the best players in the world
    have been recorded here for all the eternity.
    Is your name here ?
  </p>
  <h3 class="page-subtitle">Players list</h3>

  <?php

     
  ?>
  <ul class="page-list">
    <li>
      <ul class="page-list-sub">
        <li class="page-list-sub__player-name">Player name</li>
        <li class="page-list-sub__player-date">00/00/2010 12:12:12</li>
      </ul>
    </li>
    <li>
      <ul class="page-list-sub">
        <li class="page-list-sub__player-name">Player nameasdasdasd</li>
        <li class="page-list-sub__player-date">00/00/2010 12:12:12</li>
      </ul>
    </li>
    <li>
      <ul class="page-list-sub">
        <li class="page-list-sub__player-name">Player name</li>
        <li class="page-list-sub__player-date">00/00/2010 12:12:12</li>
      </ul>
    </li>
    <li>
      <ul class="page-list-sub">
        <li class="page-list-sub__player-name">Player name</li>
        <li class="page-list-sub__player-date">00/00/2010 12:12:12</li>
      </ul>
    </li>
  </ul>
</section>


<?php

require( 'sidebar.php' );

require( 'footer.php' );

?>
