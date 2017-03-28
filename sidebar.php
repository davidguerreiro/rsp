<?php

/**
*
* Template for the main sidebar. This sidebar changes dinamicaly depeinding on if we are in the homepage or the game page
* In the future they could be more sidebars that's why this approach has been taken
*
* @since 1.0.0
*/

?>

<aside class="main-sidebar">

    <?php

      if( isset( $is_game_template ) ) {

        if( !$is_game_template )
          require_once( 'template-parts/sidebar-home.php' );
        else
          require_once( 'template-parts/sidebar-game.php');

      }
      else
        require_once( 'template-parts/sidebar-home.php' );
    ?>

</aside>
