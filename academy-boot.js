(function () {
    if (!window.WGIH) return;

    const fundingClass = { 'Fully Funded': 'gold', 'Partially Funded': 'blue', 'Self-Funded': 'gray', 'Free Participation': 'green-free' };
    const degreeCard = (item) =>
        '<a class="panel" data-kind="' + item.degree + '" href="program.html?id=' + item.id + '">' +
        '<span class="badge ' + (fundingClass[item.funding] || 'gold') + '">' + (item.funding === 'Free Participation' ? '<i class="fas fa-gift"></i> ' : '') + item.funding + '</span>' +
        '<h3 style="margin:8px 0;">' + item.title + '</h3><p>' + item.country + ' · ' + item.area + ' · ' + item.university + '</p>' +
        '<p>Deadline: ' + item.deadline + '</p></a>';

    const proCard = (item) =>
        '<a class="panel acad-pro-card" data-pro-type="' + item.degree + '" href="program.html?id=' + item.id + '">' +
        '<div class="acad-pro-photo"><img src="' + item.image + '" alt="" loading="lazy">' +
        '<span class="badge ' + (fundingClass[item.funding] || 'gold') + ' acad-pro-badge">' + (item.funding === 'Free Participation' ? '<i class="fas fa-gift"></i> FREE' : item.funding) + '</span></div>' +
        '<div class="acad-pro-body"><span class="acad-pro-type">' + item.degree + '</span>' +
        '<h3>' + item.title + '</h3><p>' + item.country + ' · ' + item.mode + '</p>' +
        '<span class="acad-pro-cta">View details <i class="fas fa-arrow-right"></i></span></div></a>';

    const degrees = WGIH.programs.filter(item => item.kind === 'degree');
    const pros = WGIH.programs.filter(item => item.kind === 'professional');
    const degreeList = document.getElementById('degree-list');
    const proList = document.getElementById('pro-list');
    if (degreeList) degreeList.innerHTML = degrees.map(degreeCard).join('');
    if (proList) proList.innerHTML = pros.map(proCard).join('');

    const search = document.querySelector('[data-academy-search]');
    if (search && degreeList) {
        search.addEventListener('input', () => {
            const q = search.value.trim().toLowerCase();
            degreeList.querySelectorAll('a').forEach(link => {
                link.classList.toggle('is-hidden', q && !link.textContent.toLowerCase().includes(q));
            });
        });
    }

    // Training & Conferences category tiles filter the professional-program grid.
    const catGrid = document.getElementById('pro-cat-grid');
    if (catGrid && proList) {
        catGrid.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-cat-filter]');
            if (!btn) return;
            catGrid.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
            const key = btn.dataset.catFilter;
            proList.querySelectorAll('[data-pro-type]').forEach(card => {
                card.classList.toggle('is-hidden', key !== 'all' && card.dataset.proType !== key);
            });
        });
    }

    // "Study in China" university wall.
    const wall = document.getElementById('university-wall');
    if (wall && WGIH.universities) {
        wall.innerHTML = WGIH.universities.map(u => {
            const firstProgram = (u.programIds || [])[0];
            return '<article class="uni-card">' +
                '<div class="uni-card-head' + (u.logoDark ? ' uni-logo-dark' : '') + '"><img src="' + u.logo + '" alt="' + u.name + '"></div>' +
                '<div class="uni-card-body">' +
                '<h3>' + u.name + '</h3><p class="uni-card-city"><i class="fas fa-location-dot"></i> ' + u.city + '</p>' +
                '<div class="uni-card-areas">' + u.studyAreas.map(a => '<span>' + a + '</span>').join('') + '</div>' +
                '<p class="uni-card-levels"><i class="fas fa-graduation-cap"></i> ' + u.levels.join(' · ') + '</p>' +
                '<p class="uni-card-note">' + u.note + '</p>' +
                (firstProgram ? '<a class="uni-card-link" href="program.html?id=' + firstProgram + '">View programs <i class="fas fa-arrow-right"></i></a>' : '') +
                '</div></article>';
        }).join('');
    }
})();
