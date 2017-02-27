<?php

/**
* This is the sidebar as displayed in the home page
*
*/

?>

  <div class="main-sidebar__element">
    <nav>
      <ul class="main-sidebar__ul">
        <li>
          <a href="#" id="new-game" class="main-sidebar__a" data-field="new-game-container">New Game</a>
        </li>
        <li id="new-game-container" class="hidden">
          <form action="" id="new-game-form" method="post">
            <label for="player_name">Choose a name: </label>
            <input type="text" name="player-name" placeholder="Enter your name">
            <input type="submit" value="Start Game">
          </form>
        </li>
        <li>
          <a href="#" id="about" class="main-sidebar__a" data-field="about-container">About</a>
        </li>
        <li id="about-container" class="hidden">
          <p class="main-sidebar__p">
            This is just some random text that I will delete somewhere in the future. In a near future I hope.
          </p>
        </li>
        <li>
          <a href="#" id="hall-of-the-fame" class="main-sidebar__a" title="Visit the Hall of Fame" data-field="hall-of-fame-container">Hall of fame</a>
        </li>
        <li id="hall-of-fame-container" class="hidden">
          <p class="main-sidebar__p">
              The hall of fame has records of the players who have been skillful enough to beat the game. Is your name the recorded for all the eternity ?
          </p>
          <a href="hall-of-the-fame.php" class="main-sidebar__internal-link" title="See Hall of the Fame">See the Hall</a>
        </li>
        <li class="hidden" id="game-sidebar-element">
            <a href="#" id="exit" class="main-sidebar__a" title="Exit game" data-field="exit-container">Exit</a>
        </li>
        <li id="exit-container" class="hidden">
            <p class="main-sidebar__p">Sure ?</p>
            <a href="main.php" class="main-sidebar__internal-link" title="Exit game">Yes</a>
            <a href="#" class="main-sidebar__internal-link" title="Continue playing">No</a>
        </li>
      </ul>
    </nav>
  </div>
