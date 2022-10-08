// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePassword = exports.validateEmail = exports.submitSignUpForm = exports.setValue = exports.setFormValue = exports.getValidationStatus = exports.changeFormValidation = void 0;
var formValues = {}; // Сюда пишутся значения формы (Object как в Java, или dict из Python)

var formValidation = {}; // Сюда пишутся статусы валидации каждого поля. Если поле ни разу не валидировалось,
// то при обращении к Object вернётся undefined, который при логическом сравнении обрабатывается как false

formValidation.password = false;
formValidation.passwordreg = false;
formValidation.email = false;
formValidation.emailreg = false;

var setValue = function setValue(id) {
  var object = document.getElementById(id);
  object.value = "";
};

exports.setValue = setValue;

var changeFormValidation = function changeFormValidation() {
  setValue("password");
  setValue("passwordreg");
  setValue("email");
  setValue("emailreg");
  formValidation.password = false;
  formValidation.passwordreg = false;
  formValidation.email = false;
  formValidation.emailreg = false;
  var btnsgnup = document.getElementById('sign_up_btn');
  btnsgnup.disabled = true;
  var btnsgnin = document.getElementById('sign_in_btn');
  btnsgnin.disabled = true;
}; // Объявляется и инициализируется константная переменная
// Инициализация функцией, заданной в стрелочном виде


exports.changeFormValidation = changeFormValidation;

var validatePassword = function validatePassword(password) {
  //formValidation.password = e.target.value
  console.log("Password validation..."); //console.log(e)
  // Напишите код валидации здесь и присвойте true/false в объект(словарь) formValidation
  // formValidation.password = ...  // formValidation['password'] = ... - то же самое, но другой синтаксис
  //return formValidation.password !== undefined   // Это заглушка, return вероятно надо переписать

  var password_length = password.length;
  var max = 15;
  var min = 6;
  var reg = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])');
  var password_id = document.activeElement.id; //const password_1 = document.getElementById(password_id);
  //var baton = document.getElementById('sign_up_btn');

  if (password_length == 0 || password_length >= max || password_length < min || !password.match(reg)) {
    formValidation.password = false;
    console.log("Error"); //password_1.classList.add("invalid")
    //baton.disabled = true;
  } else {
    formValidation.password = true; //password_1.classList.remove("invalid")
    // password_1.classList.add("valid")
    // baton.disabled = false;
  }

  return formValidation.password;
};

exports.validatePassword = validatePassword;

var validateEmail = function validateEmail(email) {
  // Создадим шаблон регулярного выражения. В нём применяются шаблонные строки
  // Гуглить по тегам: "шаблонные строки js", "регулярные выражения"
  var regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (String(email).toLowerCase().match(regExp) == null) {
    return false;
  } else {
    return true;
  } //return String(email)
  //.toLowerCase()
  //.match(regExp);

}; // Функция возвращающая true если все валидации пройдены, и false если хотя бы одна не пройдена


exports.validateEmail = validateEmail;

var getValidationStatus = function getValidationStatus() {
  // Происходит функциональная мгаия, читай строчку кода ниже как:
  // Получить значения (не ключи) из объекта, затем применить к каждому значению функцию двойного логического отрицания
  // (преобразование к булевому типу) и результаты всех применений это true, то вернуть true, иначе - false
  return Object.values(formValidation).every(function (validationStatus) {
    return !!validationStatus;
  });
}; // Функция возвращающая которая ставит значение поля в форме по ключу


exports.getValidationStatus = getValidationStatus;

var setFormValue = function setFormValue(valueKey, newValue, validator) {
  //formValues[valueKey] = newValue
  console.log(formValidation);

  if (validator !== undefined) {
    formValidation[valueKey] = validator(newValue);
  }

  var button;
  var passwordreg = document.getElementById(valueKey);

  if (formValidation[valueKey] == false) {
    passwordreg.classList.add("invalid");

    if (valueKey == "password" || valueKey == "email") {
      button = document.getElementById('sign_up_btn');
    } else {
      button = document.getElementById('sign_in_btn');
    }

    button.disabled = true;
  } else {
    passwordreg.classList.remove("invalid");
    passwordreg.classList.add("valid");

    if (valueKey == "password" || valueKey == "email") {
      button = document.getElementById('sign_up_btn');
    } else {
      button = document.getElementById('sign_in_btn');
    }

    if (formValidation["password"] == true && formValidation["email"] == true || formValidation["passwordreg"] == true && formValidation["emailreg"] == true) {
      button.disabled = false;
    }
  }
}; // Функция для обработки отправки формы регистрации
// В этой функции должен быть http запрос на сервер для регистрации пользователя (сейчас просто демонстрация)


exports.setFormValue = setFormValue;

var submitSignUpForm = function submitSignUpForm() {
  if (!getValidationStatus()) {
    console.log("FORM IS INCORRECT");
    return false;
  }

  console.log("FORM IS FINE");
  console.log(formValues);
  return true;
};

exports.submitSignUpForm = submitSignUpForm;
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

var _utils = require("./utils.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

////// ДЕМОНСТРАЦИОННЫЙ УЧАСТОК КОДА. На оценку не влияет, исключительно для саморазвития.
// Предлагаю "поиграться" с частями кода ниже, чтобы познакомиться с JS
// Получаем элемент и меняем его класс, который определеён в библиотеке стилей materialize
var password = document.getElementById('password');
password.classList.add("valid");
password.classList.remove("valid"); // В браузере можно посмотреть, что из себя представляет документ
// (CTRL+SHIFT+i для открытия консоли и открыть вкладку "консоль", туда будет залогированно значение)

console.log("Document");
console.log(document); // Если запросить id, которого нет в DOM дереве - вернется undefined
// => надо быть осторожней: коллега может поменять id вашего элемента и упадёт !ВАШ! код
// const first_name = document.getElementById('first_name_invalid');
// first_name.oninput = (e) => validatePassword(e)
// Селекция по классу. Может пригодится, для того, чтобы упростить обработку полей в двух формах.
// Чтобы не делать кучу уникальных айди, можно определённым полям формы давать один класс и обрабатывать их в цикле
// const passwords = document.querySelectorAll('.password')
// console.log(passwords)
// for (const password of passwords) {
//   password.style.background = "red"
// }
////// КОНЕЦ ДЕМОНСТРАЦИОННОГО УЧАСТКА КОДА. Дальше код для оцениваемой части задания
// Выписываем все айдишники HTMl-элементов в константы для переиспользования

var first_name_id = 'first_name';
var last_name_id = 'last_name';
var password_id = 'password';
var email_id = 'email';
var sign_in_link_id = 'sign_in_link';
var sign_up_form_id = 'sign_up_form';
var sign_up_btn_id = 'sign_up_btn';
var sign_in_link_id_reg = 'sign_in_link_reg';
var sign_in_form_id = 'sign_in_form';
var btnsgnup = document.getElementById('sign_up_btn');
btnsgnup.disabled = true;
var btnsgnin = document.getElementById('sign_in_btn');
btnsgnin.disabled = true; // Получаем элемент DOM-дерева по id и присваиваем значение аттрибуту oninput
// oninput вызывается с параметром "event" каждый раз, когда ввод меняется
// Значение, которое мы присваеваем этому аттрибуту - это функция, определённая в стрелочном стиле
// Гуглить по тегам "события JS", "onchange/oninput HTML", "стрелочные функции JS", ...
//const first_name = document.getElementById(first_name_id);
//first_name.oninput = (e) => setFormValue(first_name_id, e.target.value)  // Установить значение без валидации
//const email = document.getElementById(email_id);
//email.oninput = (e) => setFormValue(email_id, e.target.value, validateEmail) // Установить значение с валидацией

var emails = document.querySelectorAll("#email, #emailreg");
console.log(emails);

var _iterator = _createForOfIteratorHelper(emails),
    _step;

try {
  var _loop = function _loop() {
    var email = _step.value;

    email.oninput = function (e) {
      return (0, _utils.setFormValue)(email.id, e.target.value, _utils.validateEmail);
    }; // Установить значение с валидацией

  };

  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    _loop();
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

var passwords = document.querySelectorAll("#password, #passwordreg");
console.log(passwords);

var _iterator2 = _createForOfIteratorHelper(passwords),
    _step2;

try {
  var _loop2 = function _loop2() {
    var password = _step2.value;

    password.oninput = function (e) {
      return (0, _utils.setFormValue)(password.id, e.target.value, _utils.validatePassword);
    }; // Установить значение с валидацией

  };

  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
    _loop2();
  } // Меняем стили объекта DOM дерева. Это позволяет скрыть форму регистрации и показать форму авторизации
  // Объект формы не исключается из DOM дерева, а просто становистя невидимым

} catch (err) {
  _iterator2.e(err);
} finally {
  _iterator2.f();
}

var switch_to_sign_in = document.getElementById(sign_in_link_id);

switch_to_sign_in.onclick = function (e) {
  document.getElementById(sign_up_form_id).style.display = "none";
  document.getElementById(sign_in_form_id).style.display = "";
  changeFormValidation();
};

var sign_up_btn = document.getElementById(sign_up_btn_id);

sign_up_btn.onclick = function (e) {
  // При нажатии кнопки в форме по умолчанию происходит перезагрузка страницы.
  // Чтобы отключить его, нужно отменить стандартное поведение события
  e.preventDefault();
  (0, _utils.submitSignUpForm)();
};

var switch_to_sign_in_reg = document.getElementById(sign_in_link_id_reg);

switch_to_sign_in_reg.onclick = function (e) {
  document.getElementById(sign_up_form_id).style.display = "";
  document.getElementById(sign_in_form_id).style.display = "none";
  changeFormValidation();
};
},{"./utils.js":"js/utils.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49347" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map