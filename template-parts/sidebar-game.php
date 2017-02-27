<?php

/**
*
* This is the sidebar displayed in the game template
*
*/


?>

<div class="game-sidebar__element">
    <!-- The console is now displayed on the sidebar-->
    <div class="console" id="console-element">
      <p class="console__p">
        The game against Player 2 has just started !
        Choose an option to start playing.
      </p>
    </div>
</div>
<div class="game-sidebar__element">
  <nav>
    <ul class="main-sidebar__ul">
      <li>
        <a href="#" id="play" class="main-sidebar__a" data-field="player-options-container">
          <i class="fa fa-chevron-right" aria-hidden="true"></i>
          <span>Play !</span>
        </a>
      </li>

      <!-- Player 1 options -->
      <li id="player-options-container" class="hidden">
        <ul class="game-sidebar__sub-ul player-options">
          <li class="help-option">
            Which option you wanna play ?
          </li>
          <li id="rock" class="player-option">
            <i class="fa fa-hand-rock-o" aria-hidden="true"></i><span>Rock</span>
          </li>
          <li id="scrss" class="player-option">
            <i class="fa fa-hand-scissors-o" aria-hidden="true"></i><span>Scissors</span>
          </li>
          <li id="paper" class="player-option">
            <i class="fa fa-hand-paper-o" aria-hidden="true"></i><span>Paper</span>
          </li>
        </ul>
      </li>

      <!-- Items menu -->
      <li>
        <a href="#" id="bag" class="main-sidebar__a" data-field="bag-container">
          <i class="fa fa-briefcase" aria-hidden="true"></i>
          <span>Bag</span>
        </a>
      </li>
      <li id="bag-container" class="hidden">
        <ul class="game-sidebar__sub-ul bag-options">
          <li class="help-option">
            Which object you wanna use ?
          </li>
          <li>
            <a href="#" class="bag-a" id="potion">
              <i class="fa fa-flask" aria-hidden="true"></i>
              Potion
            </a>
            <span class="item-q" id="potion-q">
              <span class="item-q__indicator">x</span> 2
            </span>
          </li>
          <li>
            <a href="#" class="bag-a" id="scanner">
              <i class="fa fa-superpowers" aria-hidden="true"></i>
              Scanner
            </a>
            <span class="item-q" id="scanner-q">
              <span class="item-q__indicator">x</span> 1
            </span>
          </li>
          <li>
            <a href="#" class="bag-a" id="close-bag">
              <i class="fa fa-angle-up" aria-hidden="true"></i>
              Close bag
            </a>
          </li>
        </ul>
      </li>

      <!-- Tip option -->
      <li>
        <a href="#" id="tip" class="main-sidebar__a">
          <i class="fa fa-info" aria-hidden="true"></i>
          <span>Tip</span>
        </a>
      </li>

      <!-- Exit game option -->
      <li>
        <a href="#" class="main-sidebar__a" data-field="exit-options">
          <i class="fa fa-times" aria-hidden="true"></i>
          <span>Exit</span>
        </a>
      </li>
      <li id="exit-options" class="hidden">
        <ul class="game-sidebar__sub-ul">
          <li class="help-option">
            Are you sure ?
          </li>
          <li class="player-option">
            <a href="#" id="no-exit" title="keep playing!">No</a>
          </li>
          <li class="player-option">
            <a href="main.php" title="Exit game">Yes please</a>
          </li>
        </ul>
      </li>

    </ul>
  </nav>
</div>
