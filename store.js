window.SkyGateStore = (function () {
  var KEY = "skygate_users";

  function getAll() {
    try {
      var list = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function save(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function findByEmail(email) {
    var needle = (email || "").trim().toLowerCase();
    return getAll().find(function (u) {
      return u.email.toLowerCase() === needle;
    });
  }

  function findById(id) {
    return getAll().find(function (u) { return u.id === id; });
  }

  function add(user) {
    var list = getAll();
    user.id = user.id || ("u" + Date.now() + Math.floor(Math.random() * 1000));
    user.createdAt = user.createdAt || new Date().toISOString();
    list.push(user);
    save(list);
    return user;
  }

  function update(id, patch) {
    var list = getAll();
    var idx = list.findIndex(function (u) { return u.id === id; });
    if (idx === -1) return null;
    list[idx] = Object.assign({}, list[idx], patch);
    save(list);
    return list[idx];
  }

  function remove(id) {
    var list = getAll();
    var next = list.filter(function (u) { return u.id !== id; });
    save(next);
    return next.length !== list.length;
  }

  return {
    getAll: getAll,
    findByEmail: findByEmail,
    findById: findById,
    add: add,
    update: update,
    remove: remove
  };
})();