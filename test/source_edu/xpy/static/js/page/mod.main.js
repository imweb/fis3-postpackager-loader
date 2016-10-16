/*!js/page/db.main.js*/
;define('js/page/db.main', function(require, exports, module) {

  require('js/base/db');
  
  console.log('db.main.js');

});
/*!js/page/modal.js*/
;define('js/page/modal', function(require, exports, module) {

  console.log('modal');

});

/*!js/page/jquery.upload.js*/
;define('js/page/jquery.upload', function(require, exports, module) {

  require('js/base/jquery');
  console.log('jquery.upload');

});
/*!js/page/mod.main.js*/
;define('js/page/mod.main', function(require, exports, module) {

  
  // mod.main.js  依赖 db.main,modal,jquery.upload
  require('js/page/db.main');
  require('js/page/modal');
  require('js/page/jquery.upload');
  
  console.log('mod.main');
  
  require(['js/page/ckeditor','js/page/ckeditor.jquery'],function(){
      console.log('async ckeditor');
  });

});