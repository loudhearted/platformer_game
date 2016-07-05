import HealthBars from '../ui/healthbars.js';
import Player from '../actors/player.js';

export default class Level extends Phaser.State {
  constructor() {
    super();
    this.playerGroup = null;
    this.enemyGroup = null;
    this.backgroundLayer = null;
    this.boss = null;
    this.bossBar = null;
  }

  _createPlayers() {
    this.playerGroup = this.add.group();
    this.playerGroup.name = "PlayerGroup";

    let player = new Player(this, 'One', this.enemyGroup)
    player.create();
    this.playerGroup.add(player.sprite)
  }

  _createHealthbars() {
    this.game.data.healthbars = new HealthBars(this.game);
    this.playerGroup.forEach(
      function(player) {
        this.game.data.healthbars.renderPlayerHealthBar(player)
      },
      this, //context
      true // check if exists
    )
  }

  updatePlayers() {
    this.playerGroup.forEach(
      function(player) {
        player.update();
      },
      this, //context
      true // check if exists
    )
  }

  preload() {
    this.game.load.atlasJSONArray('assets', 'lib/assets/sprites/assets.png', 'lib/assets/sprites/assets.json'); // can probably be moved to a preload state when there's more levels

    // Overwrite Phaser's damage function
    // Use the onZeroHealth event to do something other than Phaser's default kill() function when health reaches zero
    // onZeroHealth does not exist by default, so create onZeroHealth & add listeners on a per-actor basis (in _addSpriteEvents function)
    Phaser.Sprite.prototype.damage = function(amount) {
     if (this.alive) {
       this.health -= amount;
       if (this.health <= 0) {
         if (this.events.onZeroHealth) {
           this.events.onZeroHealth.dispatch(this);
         } else {
           this.kill(); // default Phaser action
         }
       }
     }
     return this;
    }
  }

  create() {
    this.game.world.setBounds(0,0,2000,600);

    this.enemyGroup = this.add.group(
      null, // parent,
      'enemyGroup', // name,
      false, // addToStage,
      true, // enableBody,
      Phaser.Physics.ARCADE // physicsBodyType
    )

    this._createPlayers();
    this._createHealthbars();
  }

  update() {
    this.updatePlayers();
  }
}
