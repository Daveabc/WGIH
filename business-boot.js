(function () {
    if (!window.WGIH) return;

    const flagImg = (iso) => iso
        ? '<img class="flag-img" src="https://flagcdn.com/' + iso + '.svg" alt="" loading="lazy">'
        : '';

    // ---- Top hero banner: rotate through factory/manufacturing images ----
    const hero = document.getElementById('biz-hero');
    if (hero && WGIH.businessHero && WGIH.businessHero.length) {
        const slides = WGIH.businessHero;
        const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let h = 0;
        const paint = (n) => {
            h = (n + slides.length) % slides.length;
            hero.style.backgroundImage = "url('" + slides[h].image + "')";
        };
        paint(0);
        if (!reduce) {
            let hTimer = setInterval(() => paint(h + 1), 5000);
            hero.addEventListener('mouseenter', () => clearInterval(hTimer));
            hero.addEventListener('mouseleave', () => { hTimer = setInterval(() => paint(h + 1), 5000); });
        }
    }

    // ---- Left column: product categories ----
    const cats = WGIH.productCategories || [];
    const catList = document.getElementById('categories');
    if (catList) {
        catList.innerHTML = '<li><button type="button" class="active" data-cat="all"><i class="fas fa-border-all"></i> All categories</button></li>' +
            cats.map(c => '<li><button type="button" data-cat="' + c.id + '"><i class="fas ' + c.icon + '"></i> ' + c.name + '</button></li>').join('');
    }

    // ---- Centre column: manufacturer cards, filterable by category ----
    const card = (item) =>
        '<a class="maker" href="company.html?id=' + item.id + '">' +
        '<div class="maker-photo"><img src="' + item.image + '" alt=""></div>' +
        '<div class="maker-body"><strong>' + item.name + '</strong><em>' + (item.country || '') + ' · ' + item.category + '</em>' +
        '<p class="maker-intro">' + (item.intro || '').slice(0, 92) + (item.intro && item.intro.length > 92 ? '…' : '') + '</p>' +
        '<p class="maker-products">' + (item.mainProducts || []).slice(0, 3).map(p => '<span>' + p + '</span>').join('') + '</p>' +
        '<span class="maker-btn">View profile <i class="fas fa-arrow-right"></i></span></div></a>';

    const featured = document.getElementById('featured-makers');
    const allMakers = document.getElementById('all-makers');
    const heading = document.getElementById('makers-heading');
    const renderMakers = (catId) => {
        const list = catId === 'all' ? WGIH.companies : WGIH.companies.filter(c => c.categoryId === catId);
        if (featured) {
            featured.innerHTML = list.length
                ? list.map(card).join('')
                : '<p class="note" style="grid-column:1/-1;">No sample manufacturers are tagged to this category yet. Browse all categories or view the full directory below.</p>';
        }
        if (heading) {
            const label = catId === 'all' ? 'All categories' : (cats.find(c => c.id === catId) || {}).name;
            heading.innerHTML = '<i class="fas fa-industry"></i> Manufacturers &amp; Suppliers' + (catId === 'all' ? '' : ' <span class="maker-filter-tag">— ' + label + '</span>');
        }
    };
    if (catList) {
        catList.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-cat]');
            if (!btn) return;
            catList.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
            renderMakers(btn.dataset.cat);
        });
    }
    renderMakers('all');
    if (allMakers) allMakers.innerHTML = WGIH.companies.map(card).join('');

    // ---- Right column: investor teasers + partner-opportunity teasers ----
    const investorTeasers = document.getElementById('investor-teasers');
    if (investorTeasers && WGIH.investors) {
        investorTeasers.innerHTML = WGIH.investors.map(inv =>
            '<a class="investor-teaser" href="investor.html?id=' + inv.id + '">' +
            '<img src="' + inv.photo + '" alt="">' +
            '<div><span class="investor-teaser-flag">' + inv.country + '</span>' +
            '<strong>' + inv.headline + '</strong></div>' +
            '<i class="fas fa-chevron-right"></i></a>'
        ).join('');
    }

    const oppTeasers = document.getElementById('opp-teasers');
    if (oppTeasers && WGIH.opportunities) {
        oppTeasers.innerHTML = WGIH.opportunities.map(o =>
            '<a class="opp-teaser" href="company.html?id=' + o.id + '">' +
            '<img src="' + (o.photo || '') + '" alt="">' +
            '<div><span class="badge gold">' + o.role + '</span><strong>' + o.industry + '</strong><small><i class="fas fa-location-dot"></i> ' + o.where + '</small></div>' +
            '<i class="fas fa-chevron-right"></i></a>'
        ).join('');
    }

    // ---- Full dealer / venture card grids (existing sections, enriched) ----
    document.getElementById('dealer-list').innerHTML = WGIH.opportunities.map(item =>
        '<a class="panel opp-card" href="company.html?id=' + item.id + '">' +
        '<img src="' + (item.photo || '') + '" alt="">' +
        '<div class="opp-card-body"><span class="badge gold">' + item.role + '</span><h3 style="margin:8px 0;">' + item.industry + '</h3>' +
        '<p><strong>Where.</strong> ' + item.where + '</p><p>' + item.need + '</p>' +
        '<span class="opp-card-cta">Explore &amp; inquire <i class="fas fa-arrow-right"></i></span></div></a>'
    ).join('');
    document.getElementById('venture-list').innerHTML = WGIH.ventures.map(item =>
        '<a class="panel opp-card" href="#request-' + item.id + '" data-request="' + item.title + '">' +
        '<img src="' + (item.photo || '') + '" alt="">' +
        '<div class="opp-card-body"><span class="badge blue">' + item.model + '</span> <span class="badge gray">' + item.status + '</span>' +
        '<h3 style="margin:8px 0;">' + item.title + '</h3><p>' + item.country + ' · ' + item.sector + '</p><p>' + item.need + '</p>' +
        '<span class="opp-card-cta">Express interest <i class="fas fa-arrow-right"></i></span></div></a>'
    ).join('');
})();
