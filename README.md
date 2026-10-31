<h1 align="center">Без слежки</h1>

<p align="center">Аддон <a href="https://github.com/YMDMod/YMDMod">YMDMod</a>, блокирующий телеметрию и рекламные трекеры Яндекс Музыки.</p>

<p align="center">
  <a href="https://github.com/YMDMod/privacy/releases/latest"><img src="https://img.shields.io/github/v/release/YMDMod/privacy?label=version" alt="Version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/YMDMod/privacy?label=license" alt="License"></a>
</p>

---

### Возможности

- Блокировка трекеров Google (Ads, Analytics, Tag Manager) и пикселя Facebook, которые клиент загружает при запуске
- Блокировка рекламного SDK Яндекса
- Блокировка Яндекс.Метрики вместе с картой кликов и продуктовой аналитикой
- Блокировка замеров скорости, отчётов об ошибках и логов плеера
- Вкладка «Без слежки» на странице мода: сколько запросов заблокировано с запуска клиента

### Установка

Установите аддон из вкладки «Каталог» на странице мода. Блокировка начинает действовать сразу, полностью —
со следующего запуска клиента.

### Что блокируется

| Группа | Адреса |
|---|---|
| Реклама и трекеры | `*.doubleclick.net`, `www.google.com/rmkt`, `www.google.com/ccm`, `www.googletagmanager.com`, `*.google-analytics.com`, `connect.facebook.net`, `www.facebook.com/tr`, `yandex.ru/ads`, `yastatic.net/partner-code-bundles`, `an.yandex.ru`, `*.adfox.ru` |
| Карта кликов и cookie | `mc.yandex.ru/clmap`, `mc.yandex.ru/metrika/match.html`, `mc.yandex.ru/metrika/advert.gif`, `*.mc.yandex.ru` |
| Яндекс.Метрика | `mc.yandex.ru`, а также `.by`, `.kz`, `.uz`, `.com`, `.com.tr` |
| Скорость и ошибки | `yandex.ru/clck` |
| Логи плеера | `log.strm.yandex.ru`, `strm.yandex.ru/perf` |

Учёт прослушиваний, рекомендации «Моей волны», обновления клиента и воспроизведение не затрагиваются.

### Требования

YMDMod 0.2.0 или новее.

---

<p align="center">Распространяется по лицензии <a href="LICENSE">MIT</a>.</p>
