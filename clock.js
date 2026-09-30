window.SkyClock = (function () {
  var KEY = "meteoradar_time";

  function getSim() {
    try {
      var o = JSON.parse(localStorage.getItem(KEY));
      if (o && typeof o.base === "number" && typeof o.at === "number") {
        var drift = Date.now() - o.at;
        return new Date(o.base + drift);
      }
    } catch (e) {}
    return null;
  }

  function setSim(d) {
    localStorage.setItem(KEY, JSON.stringify({ base: d.getTime(), at: Date.now() }));
  }

  function clearSim() {
    localStorage.removeItem(KEY);
  }

  function isSim() {
    return getSim() !== null;
  }

  function now() {
    return getSim() || new Date();
  }

  return {
    now: now,
    setSim: setSim,
    clearSim: clearSim,
    isSim: isSim
  };
})();