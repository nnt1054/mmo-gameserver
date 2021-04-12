import { Engine } from 'mini5-engine'
import SceneList from './scenes/index'

// To Do: might need to bring this out of the file so we can have multiple instances
var game = new Engine(SceneList, 'testScene', {}, mode='server');

export default game;
// game.start();