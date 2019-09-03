import { create } from '../../out';
import * as plugin from './src';

create({
    container: document.getElementById('app'),
});

window.od.registerPlugin('table', plugin);

if (module.hot) {
    module.hot.accept(['./src/index.js'], () => {
        window.od.registerPlugin('table', require('./src/index.js'));
    });
}
