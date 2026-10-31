const GROUPS = [
  ['ads', 'Реклама и трекеры'],
  ['clicks', 'Карта кликов и cookie'],
  ['metrika', 'Яндекс.Метрика'],
  ['rum', 'Скорость и ошибки'],
  ['player', 'Логи плеера'],
];

module.exports = {
  start(ymd) {
    ymd.addStyle(`
#ymd-overlay .pv-grid{display:grid;grid-template-columns:220px 90px;gap:6px 12px;font-size:13px;align-items:center}
#ymd-overlay .pv-num{font-variant-numeric:tabular-nums;text-align:right}
#ymd-overlay .pv-title{font-weight:600;margin-bottom:8px}
`);

    const el = (tag, cls, text) => {
      const node = document.createElement(tag);
      if (cls) node.className = cls;
      if (text !== undefined) node.textContent = text;
      return node;
    };

    ymd.ui.addPage({
      id: 'main',
      title: 'Без слежки',
      render(container) {
        const summary = el('div', 'ymd-card');
        container.append(summary);

        const draw = ({ stats }) => {
          const grid = el('div', 'pv-grid');
          for (const [key, label] of GROUPS) grid.append(el('div', '', label), el('div', 'pv-num', String(stats[key])));
          summary.replaceChildren(el('div', 'pv-title', 'Заблокировано с запуска клиента'), grid);
        };

        const off = ymd.on('privacy:stats', draw);
        ymd.emit('privacy:get');
        const timer = ymd.setInterval(() => ymd.emit('privacy:get'), 2000);
        return () => {
          if (typeof off === 'function') off();
          clearInterval(timer);
        };
      },
    });
  },
};
