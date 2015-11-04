// edu打包方案
//


var files; // 原始文件
var isDone = false; // 是否已经合并打包
var packs = {}; // 打入resourceMap
var resoucemap = '';

// 根据moduleId查找文件
var getFileByModuleId = function (id) {
    for (var key in files) {
        var file = files[key];
        if (file.rExt === '.js' && (file.moduleId === id || file.id === id)) {
            return file;
        }
    }
    return null;
};

// 递归获取某个文件的所有依赖
var getDeps = function (file) {
    if (file.__deps) return;
    file.__deps = [];
    file.requires.forEach(function (id) {
        var _file = getFileByModuleId(id);
        if (!_file) return;
        if (!_file.__deps) getDeps(_file);
        _file.__deps.concat([_file.moduleId]).forEach(function (id) {
            // 防止重复依赖
            if (file.__deps.indexOf(id) !== -1) return;
            // 防止循环依赖
            if (id === file.moduleId) return;
            file.__deps.push(id);
        });
    });
};

// 递归分析某个文件打包时的忽略项
var getIgnores = function (file, ignores) {
    if (file.__ignores) return;
    file.__ignores = [];
    if (!ignores) ignores = [];
    ignores.forEach(function (id) {
        var _file = getFileByModuleId(id);
        if (!_file) return;
        // 先获取该文件的依赖
        if (!_file.__deps) getDeps(_file);
        if (!_file.__ignores) getIgnores(_file);
        _file.__deps.concat([_file.moduleId]).concat(_file.__ignores).forEach(function (id) {
            // 防止重复，其实无所谓
            if (file.__ignores.indexOf(id) !== -1) return;
            // 防止忽略自己
            if (id === file.moduleId) return;
            file.__ignores.push(id);
        });
    });
};

// 遍历files
var loopFiles = function (fn) {
    Object.keys(files).forEach(function (subpath) {
        var file = files[subpath];
        fn.call(file, file);
    });
};


// 打包
var pack = function (ret, settings) {
    if (isDone) return;
    // 初始化jsPacks配置
    if (!Array.isArray(settings.jsPacks)) {
        settings.jsPacks = [settings.jsPacks];
    }

    // 获取依赖列表和忽略列表
    settings.jsPacks.forEach(function (conf) {
        loopFiles(function (file) {
            if (!conf.match.test(file.basename)) return;
            getDeps(file);
            getIgnores(file, conf.ignores);
            if (file.__deps.length === 0) return;
            var content = file.__deps.concat([file.moduleId]).map(function (id) {
                if (file.__ignores.indexOf(id) !== -1) return;
                var item = getFileByModuleId(id);
                var c = (item.isJsLike ? '/*!' + item.id + '*/\n;' : '/*!' + item.id + '*/\n');
                // 使用原始内容合并，否则可能重复合并
                c += typeof item.__baseContent === 'undefined' ? item.getContent() : item.__baseContent;
                // 派送事件
                var message = {
                    item: item,
                    content: c
                };
                fis.emit('pack:file', message);
                return message.content;
            }).join('\n');
            // 备份原始内容
            file.__baseContent = file.getContent();
            file.setContent(content);
            var moduleId = file.moduleId || file.id.replace(/\.js$/i, '');
            if(conf.useMap){
                packs[moduleId] = {url:file.getUrl()};
            }
        });
    });
    isDone = true;
    resoucemap = 'require.resourceMap(' + JSON.stringify({
        res: packs
    }, null, 2) + ')';
    resoucemap = '<script type="text/javascript">' + resoucemap + '</script>';
};

module.exports = function (file, ret, settings, opts) {
    files = ret.src;
    pack(ret, settings);
    var content = file.getContent();
    content = content.replace(opts.resourcePlaceHolder || '<!--RESOURCEMAP_PLACEHOLDER-->', resoucemap);
    file.setContent(content);
};