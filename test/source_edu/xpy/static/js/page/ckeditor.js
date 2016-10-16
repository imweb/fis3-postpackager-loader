/*!js/page/ckeditor.dep.js*/
;define('js/page/ckeditor.dep', function(require, exports, module) {

  
  console.log('ckeditor.dep.js');

});
/*!js/page/ckeditor.js*/
;define('js/page/ckeditor', function(require, exports, module) {

  
  
  require('js/page/ckeditor.dep');
  console.log('ckeditor.js');

});