document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (toggle && menu) toggle.addEventListener('click', () => menu.classList.toggle('open'));

    // Delegated tab switching so it also works for tab bars injected later by
    // renderDetail() (e.g. the 12-section country-office page), not just the
    // static hub pages present at DOMContentLoaded.
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-tab]');
        if (!btn) return;
        const group = btn.closest('[data-tabs]');
        if (!group) return;
        const buttons = group.querySelectorAll('[data-tab]');
        const panels = group.querySelectorAll('[data-panel]');
        buttons.forEach(b => b.classList.toggle('active', b === btn));
        panels.forEach(p => p.classList.toggle('active', p.dataset.panel === btn.dataset.tab));
    });

    document.querySelectorAll('[data-filter-group]').forEach(group => {
        const buttons = group.querySelectorAll('[data-filter]');
        const cards = group.querySelectorAll('[data-kind]');
        buttons.forEach(btn => btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.toggle('active', b === btn));
            const key = btn.dataset.filter;
            cards.forEach(card => {
                card.classList.toggle('is-hidden', key !== 'all' && card.dataset.kind !== key);
            });
        }));
    });

    // Country-office hub search filters the representative cards by country or
    // representative name (cards are rendered by countries-boot.js).
    const officeSearch = document.querySelector('[data-office-search]');
    if (officeSearch) {
        officeSearch.addEventListener('input', () => {
            const q = officeSearch.value.trim().toLowerCase();
            document.querySelectorAll('[data-rep-name]').forEach(card => {
                card.classList.toggle('is-hidden', q && !card.dataset.repName.toLowerCase().includes(q));
            });
        });
    }

    document.querySelectorAll('[data-site-search]').forEach(input => {
        const go = () => {
            const q = input.value.trim();
            if (q) location.href = 'search.html?q=' + encodeURIComponent(q);
        };
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
        const button = input.parentElement && input.parentElement.querySelector('button');
        if (button) button.addEventListener('click', go);
    });

    const form = document.getElementById('contact-form');
    if (form) form.addEventListener('submit', (e) => {
        e.preventDefault();
        const note = document.getElementById('contact-note');
        if (note) note.style.display = 'block';
    });

    document.addEventListener('click', (e) => {
        // Trust-based unlock: step 1 → reveal Alipay QR + amount.
        const unlockStart = e.target.closest('[data-unlock-start]');
        if (unlockStart) {
            const box = unlockStart.closest('[data-unlock]');
            box.querySelector('[data-unlock-step="start"]').hidden = true;
            box.querySelector('[data-unlock-step="pay"]').hidden = false;
        }
        // Step 2 → "I Have Paid" reveals the real contact immediately.
        const unlockPaid = e.target.closest('[data-unlock-paid]');
        if (unlockPaid) {
            const box = unlockPaid.closest('[data-unlock]');
            box.querySelectorAll('.blurred').forEach(el => el.classList.remove('blurred'));
            const pay = box.querySelector('[data-unlock-step="pay"]');
            if (pay) pay.hidden = true;
            let note = box.querySelector('.pay-note');
            if (!note) {
                note = document.createElement('p');
                note.className = 'note pay-note';
                box.appendChild(note);
            }
            note.innerHTML = '<i class="fas fa-circle-check"></i> Contact information unlocked. Thank you — this was a trust-based confirmation; the transfer itself is not automatically verified.';
        }
        // Free WGIH assistance request (no payment).
        const assist = e.target.closest('[data-assist]');
        if (assist) { e.preventDefault(); openAssist(assist.dataset.assist, assist.dataset.assistName); }

        const request = e.target.closest('[data-request]');
        if (request) { e.preventDefault(); openRequest(request.dataset.request); }
    });

    // Free country-representative contact form (visual submit; front-end only).
    document.addEventListener('submit', (e) => {
        const form = e.target.closest('[data-rep-contact]');
        if (!form) return;
        e.preventDefault();
        const done = form.querySelector('.ctry-contact-done');
        if (done) done.style.display = 'block';
        form.querySelector('button[type="submit"]').disabled = true;
    });

    const page = document.body.dataset.page;
    if (page && window.WGIH) renderDetail(page);

    if (location.hash) {
        const target = document.querySelector(location.hash);
        if (target) target.scrollIntoView();
    }
});

function openRequest(title) {
    let modal = document.getElementById('request-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'request-modal';
        modal.className = 'modal';
        modal.innerHTML = '<div class="sheet"><h3>Request This Solution</h3><p id="request-title"></p><form id="request-form"><label>Name</label><input required name="name"><label>Organization</label><input name="org"><label>Email</label><input required type="email" name="email"><label>Where would you use it?</label><textarea name="where" rows="3"></textarea><div style="display:flex;gap:8px;margin-top:14px;"><button class="btn btn-green" type="submit">Submit request</button><button class="btn btn-ghost" type="button" data-close>Close</button></div><p class="note" id="request-done" style="display:none;margin-top:12px;">Saved on this page only. Nothing was sent to a server.</p></form></div>';
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => { if (e.target === modal || e.target.closest('[data-close]')) modal.classList.remove('open'); });
        modal.querySelector('#request-form').addEventListener('submit', (e) => {
            e.preventDefault();
            modal.querySelector('#request-done').style.display = 'block';
        });
    }
    modal.querySelector('#request-title').textContent = title || 'Solution enquiry';
    modal.querySelector('#request-done').style.display = 'none';
    modal.classList.add('open');
}

/** Free "Request WGIH Assistance" modal — visual-only submit (matches the
 * prototype's other front-end forms). Kept separate from the paid unlock. */
function openAssist(type, itemName) {
    let modal = document.getElementById('assist-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'assist-modal';
        modal.className = 'modal';
        modal.innerHTML = '<div class="sheet"><h3><i class="fas fa-hand-holding-heart"></i> Request WGIH Assistance – FREE</h3><p id="assist-title" style="color:#5d7380;font-size:13px;"></p><form id="assist-form"><label>Your name</label><input required name="name"><label>Email</label><input required type="email" name="email"><label>Organization (optional)</label><input name="org"><label>How can WGIH help connect you?</label><textarea name="message" rows="3"></textarea><div style="display:flex;gap:8px;margin-top:14px;"><button class="btn btn-green" type="submit">Send request to WGIH</button><button class="btn btn-ghost" type="button" data-close>Close</button></div><p class="note" id="assist-done" style="display:none;margin-top:12px;">Request sent to WGIH — our team will follow up. (Front-end prototype: nothing is transmitted to a server yet.)</p></form></div>';
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => { if (e.target === modal || e.target.closest('[data-close]')) modal.classList.remove('open'); });
        modal.querySelector('#assist-form').addEventListener('submit', (e) => {
            e.preventDefault();
            modal.querySelector('#assist-done').style.display = 'block';
        });
    }
    modal.querySelector('#assist-title').textContent = itemName ? ('Regarding: ' + itemName) : '';
    modal.querySelector('#assist-done').style.display = 'none';
    modal.classList.add('open');
}

function renderDetail(page) {
    const mount = document.getElementById('mount');
    if (!mount) return;
    const id = new URLSearchParams(location.search).get('id');
    const data = window.WGIH;
    if (page === 'solution') return renderSolution(mount, find(data.solutions, id) || data.solutions[1]);
    if (page === 'company') return renderCompany(mount, find(data.companies, id) || data.companies[0]);
    if (page === 'investor') return renderInvestor(mount, find(data.investors, id) || data.investors[0]);
    if (page === 'program') return renderProgram(mount, find(data.programs, id) || data.programs[0]);
    if (page === 'country') return renderCountry(mount, find(data.countries, id) || data.countries[0]);
    if (page === 'article') return renderArticle(mount, find(data.articles, id) || data.articles[0]);
    if (page === 'event') return renderEvent(mount, find(data.events, id) || data.events[0]);
    if (page === 'search') return renderSearch(mount);
}

function find(list, id) { return list.find(item => item.id === id); }
function esc(value) {
    return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

/** National flag as an <img> (flagcdn) so it renders reliably — emoji flags
 * fall back to letter pairs ("CN"/"ET") on some platforms (notably Windows). */
function flagImg(iso) {
    return iso ? `<img class="flag-img" src="https://flagcdn.com/${esc(iso)}.svg" alt="">` : '';
}

/** Prominent FREE "Request WGIH Assistance" block — a no-payment path where
 * WGIH introduces the visitor to a company, investor, program or partner.
 * Visually distinct from the paid direct-contact unlock. */
function assistanceBlock(type, itemName) {
    return `
        <article class="panel assist-block">
            <div class="assist-head"><span class="assist-free">FREE</span><h2><i class="fas fa-hand-holding-heart"></i> Request WGIH Assistance</h2></div>
            <p>Ask WGIH to introduce or connect you — no payment required. Our team receives your request directly and follows up.</p>
            <button class="btn btn-green assist-btn" type="button" data-assist="${esc(type)}" data-assist-name="${esc(itemName)}">Request WGIH Assistance – FREE <i class="fas fa-arrow-right"></i></button>
        </article>`;
}

/** Trust-based paid unlock panel. Step 1 masked → step 2 Alipay QR + amount →
 * "I Have Paid" reveals the real contact immediately (front-end trust step,
 * NOT an automatically verified payment). Contact markup is passed in and
 * stays `.blurred` until revealed. */
function unlockPanel(contactRowsHtml, price, label, extraNote) {
    return `
        <article class="panel unlock" data-unlock>
            <h2><i class="fas fa-lock"></i> Unlock ${esc(label || 'Contact Information')}</h2>
            <p class="price">${esc(price)}</p>
            <p style="font-size:13px;color:#5d7380;">${extraNote || 'Public profile stays open. Direct contact details stay covered until you complete the simple Alipay step below.'}</p>
            <div class="blurred" data-contact style="margin:10px 0;">${contactRowsHtml}</div>

            <div data-unlock-step="start">
                <button class="btn btn-navy" type="button" data-unlock-start><i class="fas fa-unlock"></i> Unlock Contact Information</button>
            </div>

            <div data-unlock-step="pay" hidden>
                <div class="pay-alipay">
                    <img src="images/alipay-qr.jpg" alt="Alipay receiving QR code" class="pay-qr">
                    <div>
                        <p class="pay-amount">Scan with Alipay and transfer <strong>${esc(price)}</strong></p>
                        <ol class="pay-steps"><li>Open Alipay and scan this QR code.</li><li>Transfer the amount shown.</li><li>Tap “I Have Paid” to reveal the contact.</li></ol>
                        <button class="btn btn-green" type="button" data-unlock-paid><i class="fas fa-check"></i> I Have Paid</button>
                        <p class="pay-trust"><i class="fas fa-circle-info"></i> Trust-based step: this confirms you have transferred the amount. A QR transfer cannot be automatically verified here, so the contact is revealed on your confirmation.</p>
                    </div>
                </div>
            </div>
        </article>`;
}

function renderSolution(mount, item) {
    document.title = item.title + ' | WGIH';
    const banner = item.banner || item.image;
    const icon = item.icon || 'fa-earth-asia';
    const tagline = item.tagline || item.sector;
    const benefits = (item.benefits && item.benefits.length) ? item.benefits : item.outputs;
    // Scenarios fall back to the first workflow steps so every solution shows this section.
    const scenarios = (item.scenarios && item.scenarios.length) ? item.scenarios
        : item.workflow.slice(0, 3).map((step, i) => ({ icon: ['fa-1','fa-2','fa-3'][i], title: 'Step ' + (i + 1), text: step }));

    const workflowHtml = item.workflow.map((step, i) =>
        `<div class="sol-step"><span class="sol-step-num">${i + 1}</span><p>${esc(step)}</p>${i < item.workflow.length - 1 ? '<i class="fas fa-chevron-right sol-step-arrow"></i>' : ''}</div>`
    ).join('');

    const benefitsHtml = benefits.map(b =>
        `<li><i class="fas fa-circle-check"></i><span>${esc(b)}</span></li>`
    ).join('');

    const scenariosHtml = scenarios.map(s =>
        `<article class="sol-scenario"><div class="sol-scenario-icon"><i class="fas ${esc(s.icon || 'fa-location-crosshairs')}"></i></div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></article>`
    ).join('');

    const galleryHtml = (item.gallery && item.gallery.length)
        ? `<div class="sol-gallery">${item.gallery.map(src => `<a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="" loading="lazy"></a>`).join('')}</div>`
        : '';

    const casesHtml = (item.cases && item.cases.length)
        ? `<h2 class="sol-h"><i class="fas fa-circle-nodes"></i> Example applications & case studies</h2>
           <div class="sol-cases">${item.cases.map(c => `
                <a class="sol-case" href="${c.href || ('#request-' + item.id)}">
                    <div class="sol-case-body">
                        <span class="sol-case-flag"><i class="fas fa-location-dot"></i> ${esc(c.where)}</span>
                        <h3>${esc(c.title)}</h3>
                        <p>${esc(c.text)}</p>
                        <span class="badge ${c.illustrative ? 'gold' : 'blue'}">${c.illustrative ? 'Illustrative scenario' : 'Real-world application'}</span>
                    </div>
                </a>`).join('')}</div>`
        : '';

    const statsHtml = (item.stats && item.stats.length)
        ? `<div class="sol-stats">${item.stats.map(s => `<div class="sol-stat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join('')}</div>`
        : '';

    mount.innerHTML = `
        <section class="page-hero detail-hero sol-hero" style="background-image:url('${banner}')">
            <div class="wrap">
                <p class="crumb"><a href="index.html">Home</a> / <a href="solutions.html">Space & Geospatial Solutions</a> / ${esc(item.title)}</p>
                <span class="sol-hero-chip"><i class="fas ${icon}"></i> ${esc(item.sector)}</span>
                <h1>${esc(item.title)}</h1>
                <p class="lede">${esc(tagline)}</p>
                <button class="btn btn-yellow" data-request="${esc(item.title)}">Request This Solution <i class="fas fa-arrow-right"></i></button>
            </div>
        </section>
        <div class="wrap section">
            <div class="sol-intro">
                <div>
                    <h2 class="sol-h"><i class="fas fa-triangle-exclamation"></i> The challenge</h2>
                    <p class="sol-lede">${esc(item.problem)}</p>
                </div>
                ${statsHtml}
            </div>

            <h2 class="sol-h"><i class="fas fa-diagram-project"></i> How the solution works</h2>
            <div class="sol-flow">${workflowHtml}</div>

            <h2 class="sol-h"><i class="fas fa-lightbulb"></i> Practical application scenarios</h2>
            <div class="sol-scenarios">${scenariosHtml}</div>

            ${galleryHtml}

            <div class="sol-benefits-band">
                <div class="sol-benefits-head"><h2><i class="fas fa-seedling"></i> Expected benefits & outcomes</h2><p>What a country, ministry or operator can expect this solution to deliver.</p></div>
                <ul class="sol-benefits">${benefitsHtml}</ul>
            </div>

            ${casesHtml}

            <p class="note sol-note"><i class="fas fa-circle-info"></i> We lead with the solution and its value. Detailed equipment, software and procurement configurations are tailored to each country and discussed during consultation.</p>

            <div class="sol-request" id="request-${item.id}">
                <div>
                    <h2>Could this address your country's challenge?</h2>
                    <p>Tell WGIH about your situation and we will shape ${esc(item.title.toLowerCase())} around it — data, partners and training included.</p>
                </div>
                <button class="btn btn-yellow" data-request="${esc(item.title)}">Request This Solution <i class="fas fa-arrow-right"></i></button>
            </div>
        </div>`;
}

function renderCompany(mount, item) {
    document.title = item.name + ' | WGIH';
    const badge = item.unverified ? '<span class="badge gray">Unverified sample</span>' : '<span class="badge gray">Illustrative listing</span>';
    const facts = [
        ['fa-location-dot', 'Country', item.country || '—'],
        ['fa-boxes-stacked', 'Category', item.category],
        ['fa-gears', 'Capability', item.capability || '—'],
        ['fa-earth-africa', 'Export focus', item.exports || '—']
    ];
    const opp = (WGIH.opportunities || []).find(o => o.id === item.id);
    const contactRows = `
        <p>Contact: ${esc(item.contact.person)}</p>
        <p>Telephone: ${esc(item.contact.phone)}</p>
        <p>Email: ${esc(item.contact.email)}</p>
        <p>WeChat: ${esc(item.contact.wechat)}</p>
        <p>Address: ${esc(item.contact.address)}</p>`;
    mount.innerHTML = `
        <section class="page-hero detail-hero biz-detail-hero" style="background-image:url('${item.image}')">
            <div class="wrap">
                <p class="crumb"><a href="business.html">Business & Manufacturers</a> / ${esc(item.name)}</p>
                <span class="sol-hero-chip"><i class="fas fa-industry"></i> ${esc(item.category)}</span>
                <h1>${esc(item.name)}</h1>
                <p class="lede">${esc(item.line)}${item.country ? ' · ' + esc(item.country) : ''}</p>
                ${badge}
            </div>
        </section>
        <div class="wrap" style="padding:22px 0 40px;">
            <p class="note">Sample company profile for the visual prototype. WGIH is not presented as a middleman, and no verification, certificate or partnership is claimed.</p>

            <div class="biz-fact-row">
                ${facts.map(f => `<article class="biz-fact"><i class="fas ${f[0]}"></i><div><span>${esc(f[1])}</span><b>${f[2]}</b></div></article>`).join('')}
            </div>

            <div class="detail-grid">
                <div>
                    <article class="panel" style="margin-bottom:14px;"><h2><i class="fas fa-circle-info"></i> Company introduction</h2><p>${esc(item.intro)}</p></article>

                    <h2 class="sol-h"><i class="fas fa-images"></i> Factory &amp; production gallery</h2>
                    <div class="sol-gallery" style="margin-top:0;">
                        ${item.gallery.map((src, i) => `<a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="" loading="lazy"></a>`).join('')}
                    </div>

                    <article class="panel" style="margin:14px 0;"><h2><i class="fas fa-industry"></i> Manufacturing capacity &amp; facilities</h2><p>${esc(item.capacity)}</p><ul class="check-list" style="margin-top:8px;">${item.lines.map(l => `<li><i class="fas fa-gear"></i>${esc(l)}</li>`).join('')}</ul></article>

                    <article class="panel biz-video" style="margin-bottom:14px;">
                        <h2><i class="fas fa-circle-play"></i> Factory walkthrough</h2>
                        <div class="biz-video-frame" style="background-image:url('${item.gallery[item.gallery.length - 1] || item.image}')">
                            <video class="hero-video" muted loop playsinline poster="${item.gallery[item.gallery.length - 1] || item.image}"><source src="images/company-${esc(item.id)}.mp4" type="video/mp4"></video>
                            <span class="biz-video-badge"><i class="fas fa-play"></i> Video slot — drop in a factory tour</span>
                        </div>
                    </article>

                    <article class="panel"><h2><i class="fas fa-table-list"></i> Products &amp; specifications</h2><table class="spec-table">${item.products.map(row => `<tr><td>${esc(row[0])}</td><td>${esc(row[1])}</td></tr>`).join('')}</table></article>
                </div>
                <aside>
                    <article class="panel" style="margin-bottom:14px;"><h2><i class="fas fa-award"></i> Quality, OEM &amp; export</h2><p>${esc(item.certifications)}</p><p style="margin-top:8px;">${esc(item.oem)}</p><p style="margin-top:8px;"><strong>Export markets.</strong> ${esc(item.exports)}</p><p style="margin-top:8px;">${esc(item.experience)}</p></article>
                    ${opp ? `<article class="panel biz-opp-highlight" style="margin-bottom:14px;"><span class="badge gold">${esc(opp.role)}</span><h2 style="margin:8px 0 4px;"><i class="fas fa-handshake"></i> Partnership opportunity</h2><p><strong>Where.</strong> ${esc(opp.where)}</p><p>${esc(opp.need)}</p><button class="btn btn-green" style="margin-top:10px;" data-request="${esc(item.name)} — ${esc(opp.role)}">Express interest <i class="fas fa-arrow-right"></i></button></article>` : ''}
                    <article class="panel" style="margin-bottom:14px;"><h2><i class="fas fa-store"></i> Dealership &amp; partnership</h2><p>${esc(item.dealership)}</p></article>
                    ${assistanceBlock('company', item.name)}
                    ${unlockPanel(contactRows, item.price, 'Contact Information')}
                </aside>
            </div>
        </div>`;
}

function renderInvestor(mount, item) {
    document.title = item.name + ' | WGIH Investors';
    const chips = (arr, cls) => (arr || []).map(x => `<span class="badge ${cls}">${esc(x)}</span>`).join(' ');
    const contactRows = `
        <p>Contact: ${esc(item.contact.person)}</p>
        <p>Telephone: ${esc(item.contact.phone)}</p>
        <p>Email: ${esc(item.contact.email)}</p>
        <p>WeChat: ${esc(item.contact.wechat)}</p>`;
    mount.innerHTML = `
        <section class="page-hero detail-hero biz-detail-hero" style="background-image:url('${WGIH.img.handshake}')">
            <div class="wrap">
                <p class="crumb"><a href="business.html">Business & Manufacturers</a> / Investors / ${esc(item.name)}</p>
                <span class="sol-hero-chip sol-hero-chip-invest"><i class="fas fa-circle-dollar-to-slot"></i> Investor profile</span>
                <h1>${esc(item.headline)}</h1>
                <p class="lede">${esc(item.country)}</p>
            </div>
        </section>
        <div class="wrap" style="padding:22px 0 40px;">
            <p class="note">Illustrative investor profile for the visual prototype. The portrait is a stock image, figures are sample ranges, and no real investor, budget or commitment is implied.</p>
            <div class="detail-grid">
                <div>
                    <article class="panel investor-hero" style="margin-bottom:14px;">
                        <img src="${item.photo}" alt="">
                        <div>
                            <h2 style="margin:0;">${esc(item.name)}</h2>
                            <p class="meta-line"><span><i class="fas fa-location-dot"></i>${esc(item.country)}</span><span><i class="fas fa-sack-dollar"></i>${esc(item.budgetRange)}</span></p>
                            <p>${esc(item.background)}</p>
                        </div>
                    </article>
                    <article class="panel" style="margin-bottom:14px;"><h2><i class="fas fa-briefcase"></i> Current business activities</h2><p>${esc(item.activities)}</p></article>
                    <article class="panel" style="margin-bottom:14px;"><h2><i class="fas fa-layer-group"></i> Preferred investment sectors</h2><div class="chip-wrap">${chips(item.sectors, 'blue')}</div></article>
                    <article class="panel" style="margin-bottom:14px;"><h2><i class="fas fa-earth-americas"></i> Markets of interest</h2><div class="chip-wrap">${chips(item.markets, 'gold')}</div></article>
                    <article class="panel"><h2><i class="fas fa-handshake"></i> Desired joint-venture opportunities</h2><ul class="check-list" style="margin-top:8px;">${item.jvInterests.map(j => `<li><i class="fas fa-check"></i>${esc(j)}</li>`).join('')}</ul></article>
                </div>
                <aside>
                    <article class="panel" style="margin-bottom:14px;"><h2><i class="fas fa-sack-dollar"></i> Investment range</h2><p class="price">${esc(item.budgetRange)}</p><p style="font-size:13px;color:#5d7380;">Illustrative range for the prototype.</p></article>
                    ${item.docs && item.docs.length ? `<article class="panel" style="margin-bottom:14px;"><h2><i class="fas fa-file-lines"></i> Investment documents</h2><ul class="check-list" style="margin-top:8px;">${item.docs.map(d => `<li><i class="fas fa-file-pdf"></i>${esc(d)}</li>`).join('')}</ul></article>` : ''}
                    ${assistanceBlock('investor', item.name)}
                    ${unlockPanel(contactRows, item.price, 'Investor Contact')}
                </aside>
            </div>
        </div>`;
}

const fundingBadge = {
    'Fully Funded': 'gold', 'Partially Funded': 'blue', 'Self-Funded': 'gray', 'Free Participation': 'green-free'
};

function renderProgram(mount, item) {
    document.title = item.title + ' | WGIH';
    const cover = item.cover;
    const isFree = item.funding === 'Free Participation';
    const badgeClass = fundingBadge[item.funding] || 'gold';
    const uni = (WGIH.universities || []).find(u => (u.programIds || []).includes(item.id));
    mount.innerHTML = `
        <section class="page-hero detail-hero sol-hero" style="background-image:url('${item.image}')">
            <div class="wrap">
                <p class="crumb"><a href="academy.html">Training & Academy</a> / ${esc(item.title)}</p>
                <span class="badge ${badgeClass} acad-funding-badge">${isFree ? '<i class="fas fa-gift"></i> ' : ''}${esc(item.funding)}${isFree ? ' — FREE' : ''}</span>
                <h1>${esc(item.title)}</h1>
                <p class="lede">${esc(item.summary)}</p>
            </div>
        </section>
        <div class="wrap" style="padding:22px 0 40px;">
            <p class="note">Illustrative program. Paying to view a contact does not guarantee selection, admission or funding.${isFree ? ' Free participation means no training/participation fee is charged for this track — it does not necessarily mean every travel or accommodation expense is covered.' : ''}</p>

            <div class="biz-fact-row">
                <article class="biz-fact"><i class="fas fa-university"></i><div><span>Organizer</span><b>${esc(item.organizer)}</b></div></article>
                <article class="biz-fact"><i class="fas fa-calendar"></i><div><span>Dates</span><b>${esc(item.dates)}</b></div></article>
                <article class="biz-fact"><i class="fas fa-location-dot"></i><div><span>Location &amp; mode</span><b>${esc(item.country)} · ${esc(item.mode)}</b></div></article>
                <article class="biz-fact"><i class="fas fa-language"></i><div><span>Language</span><b>${esc(item.language || 'English')}</b></div></article>
            </div>

            <div class="detail-grid">
                <div>
                    <article class="panel" style="margin-bottom:14px;">
                        <h2><i class="fas fa-clipboard-check"></i> Eligibility &amp; application</h2>
                        <p><strong>Eligibility.</strong> ${esc(item.eligibility)}</p>
                        <p style="margin-top:8px;"><strong>Participation fee.</strong> ${esc(item.fee)}</p>
                        <p style="margin-top:8px;"><strong>Deadline.</strong> ${esc(item.deadline)}</p>
                        ${item.admissionNote ? `<p class="note" style="margin-top:12px;"><i class="fas fa-circle-info"></i> ${esc(item.admissionNote)}</p>` : ''}
                    </article>
                    <article class="panel" style="margin-bottom:14px;"><h2><i class="fas fa-star"></i> What participants gain</h2><ul class="check-list">${item.gains.map(g => `<li><i class="fas fa-check"></i>${esc(g)}</li>`).join('')}</ul></article>
                    <article class="panel"><h2><i class="fas fa-sack-dollar"></i> Funding coverage</h2><div class="fund-grid">
                        ${[['Accommodation', cover.accommodation], ['Airfare', cover.airfare], ['Meals', cover.meals], ['Local transportation', cover.local], ['Pocket money', cover.pocket], ['Conditions', cover.note]].map(row => `<article><b>${row[0]}</b><span>${esc(row[1])}</span></article>`).join('')}
                    </div></article>
                    ${uni ? `<article class="panel" style="margin-top:14px;display:flex;gap:14px;align-items:center;"><span class="uni-logo-tile${uni.logoDark ? ' uni-logo-dark' : ''}"><img src="${uni.logo}" alt="${esc(uni.name)}"></span><div><h2 style="margin:0 0 4px;">Hosted by ${esc(uni.name)}</h2><p style="margin:0;color:#5d7380;font-size:13px;">${esc(uni.city)} · ${uni.studyAreas.join(', ')}</p></div></article>` : ''}
                </div>
                <aside>
                    ${assistanceBlock('program', item.title)}
                    ${unlockPanel(
                        `<p>${esc(item.contact.person)}</p><p>${esc(item.contact.phone)}</p><p>${esc(item.contact.email)}</p><p>${esc(item.contact.venue)}</p>`,
                        item.price,
                        'Program Contact Details',
                        'This is a WGIH information-access fee, separate from and unrelated to the program participation fee above. Eligibility, dates, fees and funding stay visible either way. Direct organizer contacts and the precise venue stay covered until you complete the simple Alipay step below.'
                    )}
                </aside>
            </div>
        </div>`;
}

function renderCountry(mount, item) {
    document.title = 'WGIH ' + item.name + ' | Country Office';
    const rep = item.rep || { name: 'Representative to be announced', title: 'Country Representative', photo: WGIH.img.earth };
    const countryNews = (WGIH.articles || []).filter(a => a.cat === item.newsCat);
    const countryEvents = (WGIH.events || []).filter(e => (e.where || '').includes(item.name));

    const galleryHtml = (item.gallery || []).map(src => `<a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="" loading="lazy"></a>`).join('');

    const panels = [
        { id: 'overview', label: 'Overview & Facts', icon: 'fa-earth-africa', html: `
            <h2 class="sol-h"><i class="fas fa-earth-africa"></i> Overview &amp; Country Facts</h2>
            <p class="sol-lede">${esc(item.intro)}</p>
            <table class="spec-table" style="margin-top:10px;max-width:520px;">${item.facts.map(row => `<tr><td>${esc(row[0])}</td><td>${esc(row[1])}</td></tr>`).join('')}</table>
        ` },
        { id: 'representative', label: 'Representative & Office', icon: 'fa-user-tie', html: `
            <h2 class="sol-h"><i class="fas fa-user-tie"></i> Representative &amp; Office</h2>
            <article class="panel" style="display:grid;grid-template-columns:130px 1fr;gap:16px;align-items:center;margin-bottom:14px;">
                <img src="${rep.photo}" alt="${esc(rep.name)}" style="width:130px;height:130px;object-fit:cover;border-radius:14px;">
                <div><h3 style="margin:0 0 4px;">${esc(rep.name)}</h3><p style="color:#0b6e4f;font-weight:700;margin-bottom:6px;">${esc(rep.title)}</p><p class="meta-line"><span><i class="fas fa-location-dot"></i>${esc(item.city)}, ${esc(item.name)}</span><span><i class="fas fa-phone"></i>${esc(item.phone)}</span><span><i class="fas fa-envelope"></i>${esc(item.email)}</span></p></div>
            </article>
            <p class="note"><i class="fas fa-circle-info"></i> Public office lines are shown as sample contact points and stay visible here — they are never placed behind a pay-to-unlock step. Personal mobile numbers are not published.</p>
        ` },
        { id: 'culture', label: 'Cultural Exchange', icon: 'fa-masks-theater', html: `
            <h2 class="sol-h"><i class="fas fa-masks-theater"></i> Cultural Exchange</h2>
            <ul class="check-list">${(item.culture || []).map(c => `<li><i class="fas fa-circle-check"></i>${esc(c)}</li>`).join('')}</ul>
        ` },
        { id: 'projects', label: 'Projects & Achievements', icon: 'fa-trophy', html: `
            <h2 class="sol-h"><i class="fas fa-trophy"></i> Projects &amp; Achievements</h2>
            <div class="sol-gallery" style="margin-top:0;margin-bottom:16px;">${galleryHtml}</div>
            <ul class="check-list">${(item.achievements || item.projects || []).map(a => `<li><i class="fas fa-circle-check"></i>${esc(a)}</li>`).join('')}</ul>
        ` },
        { id: 'trade', label: 'Trade & Business', icon: 'fa-briefcase', html: `
            <h2 class="sol-h"><i class="fas fa-briefcase"></i> Trade &amp; Business</h2>
            <p class="sol-lede">${esc(item.business)}</p>
            <div class="chip-wrap" style="margin-top:10px;">${(item.tradeFocus || []).map(t => `<span class="badge blue">${esc(t)}</span>`).join('')}</div>
            <p style="margin-top:14px;"><a class="btn btn-green" href="business.html">Explore manufacturers &amp; opportunities <i class="fas fa-arrow-right"></i></a></p>
        ` },
        { id: 'investment', label: 'Investment Opportunities', icon: 'fa-sack-dollar', html: `
            <h2 class="sol-h"><i class="fas fa-sack-dollar"></i> Investment Opportunities</h2>
            <p class="sol-lede">${esc(item.investment)}</p>
            <p style="margin-top:14px;"><a class="btn btn-yellow" href="business.html#investors">See investors &amp; joint ventures <i class="fas fa-arrow-right"></i></a></p>
        ` },
        { id: 'space', label: 'Geospatial & Space Activities', icon: 'fa-satellite', html: `
            <h2 class="sol-h"><i class="fas fa-satellite"></i> Geospatial &amp; Space Activities</h2>
            <p class="sol-lede">${esc(item.space)}</p>
            <p style="margin-top:14px;"><a class="btn btn-green" href="solutions.html">Browse geospatial solutions <i class="fas fa-arrow-right"></i></a></p>
        ` },
        { id: 'institutions', label: 'Institutional Cooperation', icon: 'fa-building-columns', html: `
            <h2 class="sol-h"><i class="fas fa-building-columns"></i> Institutional Cooperation</h2>
            <p class="sol-lede">${esc(item.cooperation)}</p>
            <ul class="check-list" style="margin-top:10px;">${(item.institutions || []).map(i => `<li><i class="fas fa-building"></i>${esc(i)}</li>`).join('')}</ul>
        ` },
        { id: 'training', label: 'Training & Education', icon: 'fa-graduation-cap', html: `
            <h2 class="sol-h"><i class="fas fa-graduation-cap"></i> Training &amp; Education</h2>
            <p class="sol-lede">${esc(item.training)}</p>
            <p style="margin-top:14px;"><a class="btn btn-green" href="academy.html">Open Academy &amp; Training <i class="fas fa-arrow-right"></i></a></p>
        ` },
        { id: 'news', label: 'News & Updates', icon: 'fa-newspaper', html: `
            <h2 class="sol-h"><i class="fas fa-newspaper"></i> News &amp; Updates</h2>
            ${countryNews.length ? `<div class="news-list-page">${countryNews.map(a => `<a class="news-row" href="article.html?id=${a.id}"><img src="${a.image}" alt=""><div><small>${esc(a.date)} · ${esc(a.cat)}</small><strong>${esc(a.title)}</strong></div></a>`).join('')}</div>` : `<p class="note">${esc(item.news)}</p>`}
        ` },
        { id: 'events', label: 'Events & Activities', icon: 'fa-calendar-days', html: `
            <h2 class="sol-h"><i class="fas fa-calendar-days"></i> Events &amp; Activities</h2>
            ${countryEvents.length ? `<div class="card-grid">${countryEvents.map(e => `<a class="panel" href="event.html?id=${e.id}"><span class="badge blue">${esc(e.status)}</span><h3 style="margin:8px 0;">${esc(e.title)}</h3><p>${esc(e.date)} · ${esc(e.where)}</p></a>`).join('')}</div>` : `<p class="note">No country-tagged upcoming events yet. See the <a href="news.html#events">newsroom calendar</a> for all WGIH events.</p>`}
        ` },
        { id: 'reports', label: 'Reports & Publications', icon: 'fa-file-lines', html: `
            <h2 class="sol-h"><i class="fas fa-file-lines"></i> Reports &amp; Publications</h2>
            <ul class="check-list">${(item.reports || []).map(r => `<li><i class="fas fa-file-pdf"></i>${esc(r)}</li>`).join('')}</ul>
        ` }
    ];

    const pillsHtml = panels.map((p, i) => `<button type="button" class="${i === 0 ? 'active' : ''}" data-tab="${p.id}"><i class="fas ${p.icon}"></i> ${p.label}</button>`).join('');
    const panelsHtml = panels.map((p, i) => `<section class="tab-panel ${i === 0 ? 'active' : ''}" data-panel="${p.id}">${p.html}</section>`).join('');

    mount.innerHTML = `
        <section class="page-hero detail-hero ctry-hero" style="background-image:url('${item.hero || WGIH.img.earth}')">
            <div class="wrap">
                <p class="crumb"><a href="countries.html">Country Offices</a> / ${esc(item.name)}</p>
                <h1><span class="ctry-hero-flag">${flagImg(item.iso) || item.flag}</span> WGIH ${esc(item.name)}</h1>
                <p class="lede">${esc(item.blurb)}</p>
                <div class="ctry-hero-rep">
                    <img src="${rep.photo}" alt="${esc(rep.name)}">
                    <div><strong>${esc(rep.name)}</strong><span>${esc(rep.title)}</span></div>
                </div>
            </div>
        </section>
        <div class="wrap section" data-tabs>
            <p class="note">Sample country profile and illustrative representative. Not a confirmed appointment. Representative and office contact details above stay public and are never covered by a pay-to-unlock step.</p>
            <div class="pills ctry-pills">${pillsHtml}</div>
            ${panelsHtml}

            <section class="ctry-contact" id="contact-rep">
                <div class="ctry-contact-head">
                    <span class="assist-free">FREE</span>
                    <h2><i class="fas fa-envelope-open-text"></i> Contact Your Country Representative</h2>
                </div>
                <p>Send a message directly to <strong>${esc(rep.name)}</strong>, ${esc(rep.title)}. This service is completely free — no payment, no contact-unlock fee and no registration required.</p>
                <form class="ctry-contact-form" data-rep-contact="${esc(item.id)}" data-rep-name="${esc(rep.name)}">
                    <div class="ctry-contact-row">
                        <label>Your name<input name="name" required></label>
                        <label>Email<input name="email" type="email" required></label>
                    </div>
                    <label>Message<textarea name="message" rows="4" required placeholder="How can the ${esc(item.name)} representative help you?"></textarea></label>
                    <button class="btn btn-green" type="submit">Send message <i class="fas fa-paper-plane"></i></button>
                    <p class="note ctry-contact-done" style="display:none;">Thank you — your message has been prepared for the ${esc(item.name)} representative. (Front-end prototype: delivery to the representative/WGIH requires backend email or storage configuration — see note below.)</p>
                </form>
            </section>
        </div>`;
}

function renderArticle(mount, item) {
    document.title = item.title + ' | WGIH News';
    mount.innerHTML = `
        <section class="page-hero detail-hero" style="background-image:url('${item.image}')">
            <div class="wrap">
                <p class="crumb"><a href="news.html">News & Events</a> / ${esc(item.cat)}</p>
                <h1>${esc(item.title)}</h1>
                <p class="lede">${esc(item.date)}</p>
            </div>
        </section>
        <div class="wrap" style="padding:22px 0 48px;max-width:860px;">
            <article class="panel">${item.body.map(p => `<p style="margin-bottom:12px;">${esc(p)}</p>`).join('')}<p><a class="btn btn-green" href="news.html">Back to newsroom</a></p></article>
        </div>`;
}

function renderEvent(mount, item) {
    document.title = item.title + ' | WGIH Events';
    mount.innerHTML = `
        <section class="page-hero detail-hero" style="background-image:url('${item.image}')">
            <div class="wrap">
                <p class="crumb"><a href="news.html#events">Events</a> / ${esc(item.status)}</p>
                <h1>${esc(item.title)}</h1>
                <p class="lede">${esc(item.date)} · ${esc(item.where)}</p>
                <a class="btn btn-yellow" href="academy.html">Register interest</a>
            </div>
        </section>
        <div class="wrap detail-grid">
            <article class="panel"><h2>About this event</h2><p>${esc(item.summary)}</p><h2 style="margin-top:16px;">Agenda</h2><ul class="check-list">${item.agenda.map(a => `<li><i class="fas fa-calendar"></i>${esc(a)}</li>`).join('')}</ul></article>
            <article class="panel"><h2>Take part</h2><p>${esc(item.register)}</p><a class="btn btn-green" style="margin-top:12px;" href="program.html?id=summit-training">View the training track</a></article>
        </div>`;
}

function renderSearch(mount) {
    const q = (new URLSearchParams(location.search).get('q') || '').trim().toLowerCase();
    document.title = 'Search | WGIH';
    const pool = [
        ...WGIH.solutions.map(s => ({ href: 'solution.html?id=' + s.id, title: s.title, text: s.sector + ' ' + s.problem })),
        ...WGIH.companies.map(s => ({ href: 'company.html?id=' + s.id, title: s.name, text: s.category + ' ' + s.line })),
        ...WGIH.programs.map(s => ({ href: 'program.html?id=' + s.id, title: s.title, text: s.area + ' ' + s.funding })),
        ...WGIH.countries.map(s => ({ href: 'country.html?id=' + s.id, title: 'WGIH ' + s.name, text: s.city + ' ' + s.blurb })),
        ...WGIH.articles.map(s => ({ href: 'article.html?id=' + s.id, title: s.title, text: s.cat })),
        ...WGIH.events.map(s => ({ href: 'event.html?id=' + s.id, title: s.title, text: s.where }))
    ];
    const hits = pool.filter(item => !q || (item.title + ' ' + item.text).toLowerCase().includes(q));
    mount.innerHTML = `<div class="wrap" style="padding:28px 0 48px;"><h1 style="margin-bottom:8px;">Search</h1><p style="margin-bottom:16px;">Results for “${esc(q)}”</p><div class="news-list-page">${hits.map(hit => `<a class="news-row" href="${hit.href}"><img src="images/wgih-logo.png" alt=""><div><small>Page</small><strong>${esc(hit.title)}</strong></div></a>`).join('') || '<p>No matching pages in the prototype.</p>'}</div></div>`;
}
