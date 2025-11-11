import { initGlobal } from '../global';

exports.mochaGlobalSetup = function () {
    console.log('global hook');
    initGlobal();
};
