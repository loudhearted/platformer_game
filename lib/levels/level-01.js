import Level from './level-prototype.js';
import Background from '../assets/backgrounds/background.js';

export default class LevelOne extends Level {
  constructor() {
    super();
  }

  _createThugs(num) {

  }

  _createBoss() {
    // Add PatDino
    this.boss = new PatDino(game, enemyGroup, playersGroup);
    this.boss.create();

    this.bossBar = this.game.healthbars.renderBossHealthBar(patDino.sprite);
  }

  preload() {
    super.preload();
    this.game.load.image('background', 'lib/assets/backgrounds/scene.png');
  }

  create() {
    let background = this.game.add.image(0, 0, 'background');
    // background.anchor.setTo(.5,.5);
    background.scale.setTo(.5,.5);

    super.create();
  }

  update() {
    super.update();

  }
}
