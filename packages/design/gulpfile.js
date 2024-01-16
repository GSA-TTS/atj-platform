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

uswds.paths.dist.css = './static/uswds/styles';
uswds.paths.dist.fonts = './static/uswds/fonts';
uswds.paths.dist.img = './static/uswds/img';
uswds.paths.dist.js = './static/uswds/js';

exports.compile = uswds.compile;
exports.init = uswds.init;
exports.update = uswds.updateUswds;
exports.watch = uswds.watch;
