<?php

  /**
  * Main template
  */
  require_once( 'header.php' );

  $is_game_template = false;

 ?>

<section class="game-section">
  <h1 class="main__title">Rock - Scissors - Paper</h1>
  <ul class="main__icons">
    <li><i class="fa fa-hand-rock-o" aria-hidden="true"></i></li>
    <li><i class="fa fa-hand-scissors-o fa-rotate-90" aria-hidden="true"></i></li>
    <li><i class="fa fa-hand-paper-o" aria-hidden="true"></i></li>
  </ul>
  <div class="main__p-wrapper">
    <p class="main__p">
      Play RSP against three ultra powerful players controled by the machine. Is this a game based only on luck ? Try your best ;)
    </p>
    <p class="main__p">
      Use the menu on the right to start playing.
    </p>
  </div>
</section>


<?php

  //Main menu is displayed in the sidebar
  require_once( 'sidebar.php');

  require_once( 'footer.php' );

?>
