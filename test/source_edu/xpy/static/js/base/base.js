/*!js/base/db.js*/
;define('js/base/db', function(require, exports, module) {

  console.log('db');

});
/*!js/base/base.js*/
;define('js/base/base', function(require, exports, module) {

  // base.js 依赖jquery,badjs,db
  require('js/base/jquery');
  require('js/base/badjs');
  require('js/base/db');
  
  console.log('base');
  
  require('http://qq.com/tvp.js');
  require('https://qq.com/httpssss.js');
  require('http://qzs.qq.com/tencentvideo_v1/tvu/js/ftnh5/tvu.uploader.js');

});