<?php


/**
 * Hall of fame template
 *
 * @since 1.0.0
 */

require( 'header.php' );

$players = ppt_get_best_players();

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

     if( is_array( $players ) && count( $players ) > 0 ):
  ?>
       <ul class="page-list">
        <?php
        
         foreach( $players as $player ) :

        ?>
         <li>
           <ul class="page-list-sub">
             <li class="page-list-sub__player-name"><?php echo $player->name; ?></li>
             <li class="page-list-sub__player-date"><?php echo $player->date; ?></li>
           </ul>
         </li>

         <?php
          endforeach;
         ?>
       </ul>
  <?php
     endif;
  ?>
</section>


<?php

require( 'sidebar.php' );

require( 'footer.php' );

?>
