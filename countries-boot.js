(function () {
    if (!window.WGIH) return;

    // Representative-first hub: professional photo, full name, country, flag,
    // title, public office contact, and a clear "Explore Country Office" link.
    const grid = document.getElementById('rep-grid');
    if (!grid || !WGIH.countries) return;

    grid.innerHTML = WGIH.countries.map(c => {
        const rep = c.rep || { name: 'Representative to be announced', title: 'Country Representative', photo: WGIH.img.earth };
        const flag = c.iso
            ? '<span class="rep-card-flag"><img class="flag-img" src="https://flagcdn.com/' + c.iso + '.svg" alt="' + esc(c.name) + ' flag"></span>'
            : '<span class="rep-card-flag">' + c.flag + '</span>';
        return (
            '<article class="rep-card" data-rep-name="' + esc(rep.name + ' ' + c.name) + '">' +
            '<div class="rep-card-photo"><img src="' + rep.photo + '" alt="' + esc(rep.name) + '" loading="lazy">' + flag + '</div>' +
            '<div class="rep-card-body">' +
            '<h3>' + esc(rep.name) + '</h3>' +
            '<p class="rep-card-title">' + esc(rep.title) + '</p>' +
            '<p class="rep-card-country"><i class="fas fa-location-dot"></i> ' + esc(c.name) + ' · ' + esc(c.city) + '</p>' +
            '<p class="rep-card-contact"><i class="fas fa-envelope"></i> ' + esc(c.email) + '</p>' +
            '<p class="rep-card-contact"><i class="fas fa-phone"></i> ' + esc(c.phone) + '</p>' +
            '<a class="rep-card-link" href="country.html?id=' + c.id + '">Explore Country Office <i class="fas fa-arrow-right"></i></a>' +
            '</div></article>'
        );
    }).join('');

    function esc(value) {
        return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
    }
})();
