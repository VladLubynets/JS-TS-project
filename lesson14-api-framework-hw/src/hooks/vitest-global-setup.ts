// import { initGlobal } from '../global';
import { ApiWorld } from '../api.world';

// exports.mochaGlobalSetup = function () {
//     console.log('global hook');
//     initGlobal();
// };
const world = new ApiWorld();
export { world };
