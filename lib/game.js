// including p2 and pixi per: https://github.com/photonstorm/phaser#webpack
import 'pixi.js';
import 'p2';
import 'phaser';
import HitDetection from './helpers/hit-detection.js';
import Thug from './badguy_1.js';
import PatDino from './actors/enemy-patdino.js';

import * as Debugger from './helpers/debug-commands.js';

import LevelOne from './levels/level-01.js';

class Game extends Phaser.Game {
  constructor() {
		super(800, 600, Phaser.AUTO, '', null);
    this.data = {}; // initialize data prop
    // Add Levels
    this.state.add('LevelOne', LevelOne, false);
    
    // Start the game
		this.state.start('LevelOne');
  }
}
new Game();
