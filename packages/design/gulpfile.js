/**
 * Import uswds-compile
 */
const uswds = require('@uswds/compile');

/**
 * USWDS version
 * Set the major version of USWDS you're using
 * (Current options are the numbers 2 or 3)
 */
uswds.settings.version = 3;

uswds.paths.dist.css = './dist/styles';
uswds.paths.dist.fonts = './dist/fonts';
uswds.paths.dist.img = './dist/images';
uswds.paths.dist.js = './dist/js';

exports.compile = uswds.compile;
exports.init = uswds.init;
exports.update = uswds.updateUswds;
exports.watch = uswds.watch;
