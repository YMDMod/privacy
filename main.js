'use strict';

const METRIKA_TLDS = ['ru', 'by', 'kz', 'uz', 'com', 'com.tr'];

const PATTERNS = [
  '*://*.doubleclick.net/*',
  '*://www.google.com/rmkt/*',
  '*://www.google.com/ccm/*',
  '*://www.googletagmanager.com/*',
  '*://*.google-analytics.com/*',
  '*://connect.facebook.net/*',
  '*://www.facebook.com/tr*',
  '*://yastatic-net.ru/s3/music-frontend-static/tag-sandbox/*',
  '*://yandex.ru/ads/*',
  '*://yastatic.net/partner-code-bundles/*',
  '*://an.yandex.ru/*',
  '*://*.adfox.ru/*',
  ...METRIKA_TLDS.map((tld) => `*://*.mc.yandex.${tld}/*`),
  '*://yandex.ru/clck/*',
  '*://log.strm.yandex.ru/*',
  '*://strm.yandex.ru/perf*',
];

const AD_HOSTS = /(^|\.)(doubleclick\.net|googletagmanager\.com|google-analytics\.com|connect\.facebook\.net|an\.yandex\.ru|adfox\.ru)$/;
const METRIKA_HOST = new RegExp(`(^|\\.)mc\\.yandex\\.(${METRIKA_TLDS.join('|').replace(/\./g, '\\.')})$`);

function groupsOf(url) {
  let u;
  try {
    u = new URL(url);
  } catch {
    return [];
  }
  const host = u.hostname;
  const route = host + u.pathname;
  if (AD_HOSTS.test(host)) return ['ads'];
  if (/^www\.google\.com\/(rmkt|ccm)\//.test(route) || /^www\.facebook\.com\/tr/.test(route)) return ['ads'];
  if (/^yastatic-net\.ru\/s3\/music-frontend-static\/tag-sandbox\//.test(route)) return ['ads'];
  if (/^yandex\.ru\/ads\//.test(route) || /^yastatic\.net\/partner-code-bundles\//.test(route)) return ['ads'];
  if (METRIKA_HOST.test(host)) {
    const sync = !/^mc\./.test(host) || /^\/(clmap\/|metrika\/match\.html|metrika\/advert\.gif)/.test(u.pathname);
    return sync ? ['clicks', 'metrika'] : ['metrika'];
  }
  if (/^yandex\.ru\/clck\//.test(route)) return ['rum'];
  if (host === 'log.strm.yandex.ru' || /^strm\.yandex\.ru\/perf/.test(route)) return ['player'];
  return [];
}

let sessions = [];

module.exports = {
  activate(api) {
    const stats = { ads: 0, clicks: 0, metrika: 0, rum: 0, player: 0 };

    const handler = (details, callback) => {
      const group = groupsOf(details.url)[0];
      if (!group) {
        callback({});
        return;
      }
      stats[group]++;
      callback({ cancel: true });
    };

    const attach = (session) => {
      if (!session || sessions.includes(session)) return;
      session.webRequest.onBeforeRequest({ urls: PATTERNS }, handler);
      sessions.push(session);
    };

    attach(api.electron.session.defaultSession);
    const win = api.mainWindow();
    if (win) attach(win.webContents.session);

    api.on('privacy:get', () => api.emit('privacy:stats', { stats }));
    api.onDispose(() => {
      for (const session of sessions) session.webRequest.onBeforeRequest(null);
      sessions = [];
    });
    api.log('блокировка включена');
  },

  deactivate() {
    for (const session of sessions) session.webRequest.onBeforeRequest(null);
    sessions = [];
  },
};
