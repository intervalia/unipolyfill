//http://es6-features.org/#NumberSafetyChecking
(function() {
  var version = 1;
  var scriptPath = '';
  var info = [];
  var checks = [
    {name:'promise', prop:'window.Promise'},
    {name:'fetch', prop:'window.fetch'},
    {name:'find', prop:'Array.prototype.find'},
    {name:'findindex', prop:'Array.prototype.findIndex'},
    {name:'from', prop:'Array.from'},
    {name:'trimleft', prop:'String.prototype.trimLeft'},
    {name:'trimright', prop:'String.prototype.trimRight'},
    {name:'startswith', prop:'String.prototype.startsWith'},
    {name:'endswith', prop:'String.prototype.endsWith'},
    {name:'repeat', prop:'String.prototype.repeat'},
    {name:'isfinite', prop:'Number.isFinite'},
    {name:'isinteger', prop:'Number.isInteger'},
    {name:'isnan', prop:'Number.isNaN'},
    {name:'issafeinteger', prop:'Number.isSafeInteger'},
    {name:'trunc', prop:'Math.trunc'},
    {name:'sign', prop:'Math.sign'},
    {name:'test', prop:'Math.sdadasda'}
  ];
  var i, needSomething, requestList;

  var scriptTag = document.querySelector('script[src*="polyfillCheck.js"]');
  if (scriptTag) {
    if (scriptTag.attributes.request) {
      requestList = scriptTag.attributes.request.value.split(',');
      requestList.forEach(function(request, index) {
        requestList[index] = request.trim().toLowerCase();
      });
    }
    if (scriptTag.attributes.path) {
      i = (scriptPath = scriptTag.attributes.path.value).length-1;
      if (scriptPath[i] !== '/') {
        scriptPath += '/';
      }
    }

    checks.forEach(function(check) {
      var needed = false;
      var name = check.name.toLowerCase();
      var node = window;

      if (!requestList || requestList.indexOf(name) > -1) {
        needed = check.prop.split('.').some(function(part) {
          node = node[part];
          return (!node);
        });
      }

      if (needed) {
        needSomething = true;
      }

      info.push(needed?'1':'0');
    });

    if (needSomething) {
      i = document.createElement('script');
      i.src = scriptPath+version+'/polyFillAll.'+info.join('')+'.js';
      scriptTag.insertAdjacentElement('afterend', i);
    }
  }

  console.log(info.join(''));
})();
