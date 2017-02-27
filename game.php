<?php

  //Game template : Matches happen here
  require( 'header.php' );

  $is_game_template = true;

?>

<section class="game-section">
  <div id="game">

    <!--Player 2 data -->
    <div class="player-data" data-id="enemy_01">
      <ul class="player-data__ul player-2">
        <li>
          <span id="player-2-name">Player 2 (Enemy)</span>
        </li>
        <li class="player-2-health-wrapper">
            <ul class="health-container" id="player-2-lives">
              <li><i class="fa fa-heart active"></i></li>
              <li><i class="fa fa-heart active"></i></li>
            </ul>
        </li>
      </ul>
    </div>

    <!--Game board -->
    <div class="game-board" id="game-board">

      <!--Player 2 decision board-->
      <div class="player-decision-box" id="player-2-decision">
        <div class="game-board__icon-container" id="player-2-icon-container">
          <i class="fa fa-hand-rock-o player-2-icon" aria-hidden="true"></i>
        </div>
      </div>

      <!-- Results boxese -->
      <div class="game-board__result-box result-win" id="player-2-result-box">
        <i class="fa fa-check" aria-hidden="true" id="player-2-result-icon"></i>
      </div>
      <div class="game-board__result-box result-lose" id="player-1-result-box">
        <i class="fa fa-times" aria-hidden="true" id="player-1-result-icon"></i>
      </div>

      <!--Player 1 decision board -->
      <div clas="player-decision-box" id="player-1-decision">
        <div class="game-board__icon-container" id="player-1-icon-container">
          <i class="fa fa-hand-scissors-o player-1-icon" aria-hidden="true"></i>
        </div>
      </div>

    </div>

    <!--Player 1 data -->
    <div class="player-data player-1" data-id="player-1">
      <ul class="player-data__ul">
        <li>
          <span id="player-1-name">Player 1</span>
        </li>
        <li>
            <ul class="health-container" id="player-1-lives">
              <li><i class="fa fa-heart active"></i></li>
              <li><i class="fa fa-heart active"></i></li>
              <li><i class="fa fa-heart active"></i></li>
              <li><i class="fa fa-heart active"></i></li>
            </ul>
        </li>
      </ul>

      <!--Player 1 options -->
      <!-- TODO: Player 1 options will be moved to the console -->
      <!--
      <ul class="player-options">
        <li id="rock">
          <span><i class="fa fa-hand-rock-o" aria-hidden="true"></i> Rock</span>
        </li>
        <li id="scissors">
          <span><i class="fa fa-hand-scissors-o" aria-hidden="true"></i> Scissors</span>
        </li>
        <li id="paper">
          <span><i class="fa fa-hand-paper-o" aria-hidden="true"></i> Paper</span>
        </li>
      </ul>
    -->

    </div>

    <!-- Console -->
    <!-- TODO: Console and interactive options are now displayed
               on the sidebar. This code below will be kept until
               the sidebar system in completely functional.
               Remove this code when the game development
               is finished -->
    <!--
    <div class="text-infobox-container">
      <div class="console" id="text-infobox">

        <p class="console__p">
          The game against <b>Player 2</b> has just started ! Choose an option to start playing. Think carefully ...
        </p>

        <!-- Console options section
        <nav id="console__options">

          <!-- Console actions menu
          <ul class="console-menu__main">
            <li><a href="#" class="console-option__a" id="bag"><i class="fa fa-briefcase"></i><span>Bag</span></a></li>
            <li><a href="#" class="console-option__a" id="play"><i class="fa fa-hand-pointer-o"></i><span>Play !</span></a></li>
            <li><a href="#" class="console-option__a" id="tip"><i class="fa fa-info"></i><span>Tip</span></a></li>
          </ul>

          <!-- Console items menu

          <ul class="console-menu__main console-menu__block">
            <li><a href="#" class="console-option__a" id="potion"><i class="fa fa-flask" aria-hidden="true"></i><span>Potion x <span id="potion-q">1</span></span></a></li>
            <li><a href="#" class="console-option__a" id="scaner"><i class="fa fa-tablet" aria-hidden="true"></i><span>Scaner x <span id="scaner-q">1</span></span></a></li>
            <li><a href="#" class="console-option__a" id="back"><i class="fa fa-reply" aria-hidden="true"></i><span>Close bag</span></a></li>
          </ul>

          <!--
          <p class="console__p" id="tip-text">
            Scanner has been used !
          </p>
        -->

          <!-- Scanner item ul list -->
          <!--
          <ul class="console-menu__main console-menu__block">
            <li><a href="#" class="console-option__a" id="scanner-rock"><i class="fa fa-hand-rock-o" aria-hidden="true"></i>33.33  %</a></li>
            <li><a href="#" class="console-option__a" id="scanner-scssrs"><i class="fa fa-hand-scissors-o fa-rotate-90" aria-hidden="true"></i>33.33 %</a></li>
            <li><a href="#" class="console-option__a" id="scanner-paper"><i class="fa fa-hand-paper-o" aria-hidden="true"></i>33.33 %</a></li>
          </ul>


        </nav>
        <p class="console_static_text">* Reset the browser will restart the game</p>
      </div>
    </div>
    -->

  </div>
</section>


<?php

  require( 'sidebar.php' );

  require( 'footer.php' );

?>
