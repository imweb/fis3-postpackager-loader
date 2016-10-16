/*!js/page1/db.info.js*/
;define('js/page1/db.info', function(require, exports, module) {

  
  require('js/base/db');
  console.log('db.info');

});
/*!js/page/modal.js*/
;define('js/page/modal', function(require, exports, module) {

  console.log('modal');

});
/*!js/page1/jquery.form.js*/
;define('js/page1/jquery.form', function(require, exports, module) {

  console.log('jquery.form');

});
/*!js/page1/mod.main.info.js*/
;define('js/page1/mod.main.info', function(require, exports, module) {

  require('js/page1/db.info');
  require('js/page/modal');
  require('js/page1/jquery.form');
  
  console.log('mod.main.info');

});