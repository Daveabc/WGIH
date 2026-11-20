(function () {
    if (!window.WGIH) return;
    const list = document.getElementById('article-list');
    if (list) {
        list.innerHTML = WGIH.articles.map(item => '<a class="news-row" data-kind="' + item.cat + '" href="article.html?id=' + item.id + '"><img src="' + item.image + '" alt=""><div><small>' + item.date + ' · ' + item.cat + '</small><strong>' + item.title + '</strong></div></a>').join('');
    }
    const events = document.getElementById('event-list');
    if (events) {
        events.innerHTML = WGIH.events.map(item => '<a class="panel" href="event.html?id=' + item.id + '"><span class="badge blue">' + item.status + '</span><h3 style="margin:8px 0;">' + item.title + '</h3><p>' + item.date + ' · ' + item.where + '</p></a>').join('');
    }
    const filters = document.getElementById('news-filters');
    if (filters && list) {
        filters.querySelectorAll('[data-filter]').forEach(btn => btn.addEventListener('click', () => {
            filters.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('active', b === btn));
            const key = btn.dataset.filter;
            list.querySelectorAll('[data-kind]').forEach(row => {
                row.classList.toggle('is-hidden', key !== 'all' && row.dataset.kind !== key);
            });
        }));
    }
})();
