export default function (Vue, options, {isClient}) {
  if (!options.siteId) {
    console.error('siteId not set')
    return
  }

  if (!isClient) return

  // testing helper
  Vue.prototype.$trackGoal = _ => {}

  if (options.host && !options.host != window.location.host) return

  if (options.debug || !window.location.host.startsWith('localhost')) {
    // set up window.fathom
    (function (f, a, t, h, o, m) {
      a[h] =
        a[h] ||
        function () {
          (a[h].q = a[h].q || []).push(arguments);
        };

      (o = f.createElement('script')),
        (m = f.getElementsByTagName('script')[0]);
      o.async = 1;
      o.src = t;
      o.id = 'fathom-script';
      m.parentNode.insertBefore(o, m);
    })(document, window, '//cdn.usefathom.com/tracker.js', 'fathom');

    window.fathom('set', 'siteId', options.siteId);
    window.fathom('trackPageview');

    // create goal helper function
    Vue.prototype.$trackGoal = (id) => {
      if (isClient) {
        window.fathom('trackGoal', id, 0);
      }
    }
  }
}

