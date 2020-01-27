export default function (Vue, options, {isClient}) {
  if (!options.siteId) {
    console.error('siteId not set')
    return
  }

  if (!options.trackerUrl) options.trackerUrl = '//cdn.usefathom.com/tracker.js'

  // no-op fn
  Vue.prototype.$trackGoal = function () {}

  // no-ssr
  if (!isClient) {
    console.warn('not client')
    return
  }

  // make sure we're not debugging
  if (!options.debug) {
    if (options.host && (options.host != window.location.host)) {
      return
    }
  }

  // set up Fathom
  if (!window.location.host.startsWith('localhost') || options.debug) {
    setupFathom(options);
    Vue.prototype.$trackGoal = trackGoal
  }

  function trackGoal(id) {
    window.fathom('trackGoal', id, 0);
  }

  function setupFathom(options) {
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
    })(document, window, options.trackerUrl, 'fathom');

    window.fathom('set', 'siteId', options.siteId);
    window.fathom('trackPageview');
  }
}
