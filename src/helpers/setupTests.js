window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
    };
  };

const noop = () => {};
Object.defineProperty(window, "scrollTo", { value: noop, writable: true });
