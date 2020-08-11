import { Engine } from 'mini5-engine'
import SceneList from './scenes/index'

var game = new Engine(SceneList, 'testScene', {}, true);

export default game;
// game.start();