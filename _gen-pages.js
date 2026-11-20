const fs = require('fs');
const path = require('path');

const nav = [
  ['index.html', 'home', 'fa-home', 'Home'],
  ['solutions.html', 'solutions', 'fa-satellite', 'Space & Geospatial Solutions'],
  ['business.html', 'business', 'fa-industry', 'Business & Manufacturers'],
  ['academy.html', 'academy', 'fa-graduation-cap', 'Training & Academy'],
  ['countries.html', 'countries', 'fa-map-marker-alt', 'Country Offices'],
  ['news.html', 'news', 'fa-newspaper', 'News & Events'],
  ['partners.html', 'partners', 'fa-users', 'Our Partners'],
  ['about.html', 'about', 'fa-info-circle', 'About WGIH']
];

function chrome(title, active, body, scripts, dataPage) {
  const links = nav.map(([href, key, icon, label]) =>
    `<li><a href="${href}" class="nav-item${key === active ? ' active' : ''}"><i class="fas ${icon}"></i> ${label}</a></li>`
  ).join('\n                ');
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="pages.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body${dataPage ? ` data-page="${dataPage}"` : ''}>
    <header class="header">
        <div class="header-top">
            <div class="header-left">
                <a href="index.html" class="logo-section" style="text-decoration:none;color:inherit;">
                    <img src="images/wgih-logo.png" alt="WGIH Logo" class="logo">
                    <div class="logo-text"><div class="org-name">WGIH</div><div class="org-subtitle">World Geospatial<br>Information Home</div></div>
                </a>
                <div class="tagline">Connect the World • Empower the Future</div>
            </div>
            <div class="header-right">
                <div class="language-selector"><i class="fas fa-globe"></i>
                    <select aria-label="Language"><option>English</option><option>中文</option><option>Español</option></select>
                </div>
                <div class="auth-buttons"><a href="#" class="login-btn">Login</a><a href="#" class="register-btn">Register</a></div>
                <div class="search-box">
                    <input type="text" placeholder="Search WGIH..." data-site-search>
                    <button type="button" aria-label="Search"><i class="fas fa-search"></i></button>
                </div>
            </div>
        </div>
        <nav class="navbar">
            <button class="nav-toggle" type="button" aria-label="Open menu"><i class="fas fa-bars"></i></button>
            <ul class="nav-menu">
                ${links}
            </ul>
        </nav>
    </header>
    ${body}
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section"><div class="footer-logo"><img src="images/wgih-logo-white.svg" alt="WGIH"><h4>WGIH</h4><p>Together for a Connected, Innovative and Prosperous World</p></div></div>
            <div class="footer-section"><h5>Quick Links</h5><ul><li><a href="about.html">About WGIH</a></li><li><a href="news.html">News & Events</a></li><li><a href="about.html#contact">Contact Us</a></li></ul></div>
            <div class="footer-section"><h5>Services</h5><ul><li><a href="solutions.html">Geospatial Solutions</a></li><li><a href="academy.html">Training Programs</a></li><li><a href="business.html">Marketplace</a></li></ul></div>
            <div class="footer-section"><h5>Follow Us</h5><div class="social-links"><a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a><a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a><a href="#" aria-label="X"><i class="fab fa-twitter"></i></a><a href="#" aria-label="WeChat"><i class="fab fa-weixin"></i></a></div></div>
        </div>
        <div class="footer-bottom"><p>&copy; 2026 WGIH. All Rights Reserved | Building a Global Geospatial Community</p></div>
    </footer>
    ${scripts}
</body>
</html>
`;
}

const pages = {};

pages['solutions.html'] = chrome('Space & Geospatial Solutions | WGIH', 'solutions', `
<main class="page-main">
    <section class="page-hero video-hero" style="background-image:url('images/hero-satellite.jpg')">
        <video class="hero-video" autoplay muted loop playsinline poster="images/hero-satellite.jpg">
            <source src="images/solutions-hero.mp4" type="video/mp4">
        </video>
        <div class="geo-sweep" aria-hidden="true"></div>
        <div class="wrap">
            <p class="crumb"><a href="index.html">Home</a> / Space & Geospatial Solutions</p>
            <h1>Space & Geospatial Solutions</h1>
            <p class="lede">Advanced Technology. Real-World Applications.</p>
            <a class="btn btn-green" href="#services">Explore Solutions <i class="fas fa-arrow-right"></i></a>
        </div>
    </section>
    <div class="wrap section" data-tabs>
        <div class="pills" id="services">
            <button class="active" data-tab="services" type="button">Services</button>
            <button data-tab="data" type="button">Geospatial Data</button>
            <button data-tab="solutions" type="button">Solutions</button>
            <button data-tab="cases" type="button">Case Studies</button>
        </div>
        <section class="tab-panel active" data-panel="services">
            <h2><i class="fas fa-satellite"></i> Our Key Services</h2>
            <p class="panel-lede">From orbit to the field — core capabilities WGIH coordinates for governments, operators and communities.</p>
            <div class="shot-grid">
                <a class="shot" href="solution.html?id=satellite"><img src="images/hero-satellite.jpg" alt=""><span>Satellite & Remote Sensing</span></a>
                <a class="shot" href="solution.html?id=surveying"><img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=700&q=80" alt=""><span>GIS & Mapping Services</span></a>
                <a class="shot" href="solution.html?id=telecom"><img src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=700&q=80" alt=""><span>GNSS & Positioning</span></a>
                <a class="shot" href="solution.html?id=disaster"><img src="https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=700&q=80" alt=""><span>Disaster Monitoring</span></a>
                <a class="shot" href="solution.html?id=environment"><img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=700&q=80" alt=""><span>Environmental Monitoring</span></a>
            </div>
            <p style="margin:10px 0 18px;text-align:right;"><a href="#catalog">View All Services</a></p>
            <h2>Featured Applications</h2>
            <div class="app-grid">
                <a class="shot" href="solution.html?id=disaster"><img src="images/gallery-1.jpg" alt=""><span>Disaster Management</span></a>
                <a class="shot" href="solution.html?id=agriculture"><img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=700&q=80" alt=""><span>Smart Agriculture</span></a>
                <a class="shot" href="solution.html?id=mining"><img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=700&q=80" alt=""><span>Mining & Resources</span></a>
                <a class="shot" href="solution.html?id=urban"><img src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=700&q=80" alt=""><span>Urban Planning</span></a>
                <a class="shot" href="solution.html?id=water"><img src="https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=700&q=80" alt=""><span>Water Resources</span></a>
            </div>
        </section>
        <section class="tab-panel" data-panel="data">
            <h2>Geospatial Data</h2>
            <div class="card-grid">
                <article class="panel"><h3>Imagery</h3><p>Optical and radar satellite scenes, aerial photos and drone captures for base maps and change detection.</p></article>
                <article class="panel"><h3>Terrain & climate</h3><p>Elevation, rivers, rainfall and coastlines used in flood, farm and infrastructure work.</p></article>
                <article class="panel"><h3>Ground truth</h3><p>Survey control, field observations and sensor feeds that keep maps honest.</p></article>
            </div>
        </section>
        <section class="tab-panel" data-panel="solutions" id="catalog">
            <h2>Solutions by sector</h2>
            <p class="note">Each card opens a detail page: the problem, the workflow, data, software, hardware, outputs and a request button. Manufacturer brands are kept off these technical pages.</p>
            <div class="card-grid" id="solution-catalog"></div>
        </section>
        <section class="tab-panel" data-panel="cases">
            <h2>Case Studies</h2>
            <div class="card-grid">
                <a class="panel" href="article.html?id=addis-demo"><h3>Addis ground-station demonstration</h3><p>Sample country-office story. Open the article layout.</p></a>
                <a class="panel" href="solution.html?id=disaster"><h3>Basin early warning</h3><p>How imagery, terrain, weather and sensors sit on one dashboard.</p></a>
                <a class="panel" href="solution.html?id=agriculture"><h3>Field-scale crop advice</h3><p>From a national picture down to extension officers.</p></a>
            </div>
        </section>
    </div>
</main>`, '<script src="content.js"></script><script src="pages.js"></script><script>document.getElementById("solution-catalog").innerHTML=WGIH.solutions.filter(s=>s.group==="solution").map(s=>`<a class="panel" href="solution.html?id=${s.id}"><h3>${s.title}</h3><p>${s.sector}</p></a>`).join("");</script>');

pages['business.html'] = chrome('Business & Manufacturers | WGIH', 'business', `
<main class="page-main">
    <section class="page-hero biz-hero-rotator" id="biz-hero" style="background-image:url('https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1800&q=80')">
        <div class="wrap">
            <p class="crumb"><a href="index.html">Home</a> / Business & Manufacturers</p>
            <h1>Business & Manufacturers</h1>
            <p class="lede">Direct from Verified Chinese Manufacturers – No Middleman</p>
            <a class="btn btn-green" href="#marketplace">Explore Marketplace <i class="fas fa-arrow-right"></i></a>
        </div>
    </section>

    <div class="wrap">
        <div class="stat-row">
            <article class="stat"><i class="fas fa-building"></i><div><b>1,000+ Verified Companies</b><span>Directory scale shown in the design</span></div></article>
            <article class="stat"><i class="fas fa-boxes-stacked"></i><div><b>20+ Product Categories</b><span>Industry groups in one marketplace</span></div></article>
            <article class="stat"><i class="fas fa-earth-africa"></i><div><b>Global Trade Opportunities</b><span>Dealers, imports and distribution</span></div></article>
            <article class="stat"><i class="fas fa-handshake"></i><div><b>Direct Investment & JV</b><span>Projects and manufacturing partnerships</span></div></article>
        </div>
        <p class="note">Figures and “verified” styling follow the approved layout. Individual companies below are sample profiles. This prototype does not certify them.</p>

        <div class="biz-grid" id="marketplace">
            <aside class="biz-cats panel">
                <h2><i class="fas fa-layer-group"></i> Product Categories</h2>
                <ul class="biz-cat-list" id="categories"></ul>
            </aside>

            <div class="biz-makers">
                <div class="biz-makers-head">
                    <h2 id="makers-heading"><i class="fas fa-industry"></i> Manufacturers &amp; Suppliers</h2>
                    <a href="#directory">View All <i class="fas fa-arrow-right"></i></a>
                </div>
                <div class="maker-grid" id="featured-makers"></div>
            </div>

            <aside class="biz-side">
                <div class="biz-side-block biz-invest-accent">
                    <div class="biz-side-head"><h2><i class="fas fa-circle-dollar-to-slot"></i> Investors Looking for Opportunities</h2></div>
                    <p class="biz-side-note">Chinese investors exploring joint ventures and manufacturing partnerships in Africa and other international markets, through WGIH.</p>
                    <div class="investor-teaser-list" id="investor-teasers"></div>
                </div>
                <div class="biz-side-block">
                    <div class="biz-side-head"><h2><i class="fas fa-handshake"></i> Companies Seeking International Partners</h2></div>
                    <p class="biz-side-note">Dealer, distributor, representative and joint-venture roles open right now.</p>
                    <div class="opp-teaser-list" id="opp-teasers"></div>
                </div>
            </aside>
        </div>

        <div class="band" id="ventures" style="background-image:url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80')">
            <div><h3>Invest & Partner Globally</h3><p>Find joint ventures, technology transfer and local manufacturing partnerships.</p></div>
            <a class="btn btn-yellow" href="#investors">Explore Opportunities <i class="fas fa-arrow-right"></i></a>
        </div>
        <h2 id="dealers"><i class="fas fa-store"></i> Dealer & Distributor Opportunities</h2>
        <div class="card-grid opp-card-grid" id="dealer-list"></div>
        <h2 id="investors" style="margin-top:22px;"><i class="fas fa-chart-line"></i> Investors & Joint Ventures</h2>
        <div class="card-grid opp-card-grid" id="venture-list"></div>
        <h2 id="directory" style="margin-top:22px;">Manufacturer directory</h2>
        <div class="maker-grid" id="all-makers" style="margin-bottom:36px;"></div>
    </div>
</main>`, '<script src="content.js"></script><script src="pages.js"></script><script src="business-boot.js"></script>');

pages['academy.html'] = chrome('Training & Academy | WGIH', 'academy', `
<main class="page-main">
    <section class="page-hero" style="background-image:url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=80')">
        <div class="wrap">
            <p class="crumb"><a href="index.html">Home</a> / Training & Academy</p>
            <h1>Training & Academy</h1>
            <p class="lede">Learn · Grow · Excel</p>
            <p class="lede" style="margin-top:-12px;font-size:14px;">Access world-class training, scholarships and international programs.</p>
            <a class="btn btn-yellow" href="#programs">Apply Now <i class="fas fa-arrow-right"></i></a>
        </div>
    </section>
    <div class="wrap section" data-tabs data-filter-group id="programs">
        <div class="pills">
            <button class="active" data-tab="degrees" type="button">International Programs</button>
            <button data-tab="professional" type="button">Training & Conferences</button>
        </div>
        <section class="tab-panel active" data-panel="degrees">
            <div class="split-3">
                <article class="panel"><h2>Program Categories</h2><ul class="side-list">
                    <li><button type="button" data-filter="all" class="active">All degrees</button></li>
                    <li><button type="button" data-filter="Bachelor's Degree">Bachelor's Degree</button></li>
                    <li><button type="button" data-filter="Master's Degree">Master's Degree</button></li>
                    <li><button type="button" data-filter="PhD Programs">PhD Programs</button></li>
                    <li><button type="button" data-filter="Postdoctoral Opportunities">Postdoctoral</button></li>
                </ul></article>
                <article class="panel feature-program">
                    <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80" alt="">
                    <div>
                        <span class="badge gold">Fully Funded</span><span class="badge">Sample</span>
                        <h3 style="margin:8px 0;">International Master's Program in Geospatial Science</h3>
                        <p>China · On campus · Sample dates Sep 2026 – Aug 2027</p>
                        <a class="btn btn-green" style="margin-top:10px;" href="program.html?id=masters-geospatial">View Details <i class="fas fa-arrow-right"></i></a>
                    </div>
                </article>
                <article class="panel"><h2>What You'll Gain</h2><ul class="check-list"><li><i class="fas fa-check"></i>Global Education</li><li><i class="fas fa-check"></i>Practical geospatial skills</li><li><i class="fas fa-check"></i>International Network</li><li><i class="fas fa-check"></i>Career Opportunities</li></ul></article>
            </div>
            <div class="filter-bar">
                <input data-academy-search placeholder="Search area, country or university" style="border-radius:10px;">
            </div>
            <div class="card-grid" id="degree-list"></div>
        </section>
        <section class="tab-panel" data-panel="professional">
            <h2 class="sol-h"><i class="fas fa-chalkboard-user"></i> Training, Conferences &amp; Professional Development</h2>
            <p class="panel-lede">Conferences, seminars, workshops, short courses, online study, certification, study visits, industrial training, technical demonstrations, capacity building and executive training — across geospatial, space, engineering, agriculture, AI, business, energy, environment and manufacturing.</p>
            <div class="acad-cat-grid" id="pro-cat-grid">
                <button type="button" class="acad-cat-tile acad-cat-all active" data-cat-filter="all"><i class="fas fa-border-all"></i><span>All Types</span></button>
                <button type="button" class="acad-cat-tile" data-cat-filter="International Conferences" style="background-image:url('images/event-1.jpg')"><i class="fas fa-microphone-lines"></i><span>International Conferences</span></button>
                <button type="button" class="acad-cat-tile" data-cat-filter="Professional Training" style="background-image:url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=700&q=80')"><i class="fas fa-chalkboard-user"></i><span>Professional Training</span></button>
                <button type="button" class="acad-cat-tile" data-cat-filter="International Seminars" style="background-image:url('images/gallery-2.jpg')"><i class="fas fa-comments"></i><span>International Seminars</span></button>
                <button type="button" class="acad-cat-tile" data-cat-filter="Technical Workshops" style="background-image:url('images/gallery-3.jpg')"><i class="fas fa-screwdriver-wrench"></i><span>Technical Workshops</span></button>
                <button type="button" class="acad-cat-tile" data-cat-filter="Short-Term Training" style="background-image:url('images/training-image.jpg')"><i class="fas fa-clock"></i><span>Short-Term Training</span></button>
                <button type="button" class="acad-cat-tile" data-cat-filter="Online Programs" style="background-image:url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80')"><i class="fas fa-laptop"></i><span>Online Programs</span></button>
                <button type="button" class="acad-cat-tile" data-cat-filter="Physical Training" style="background-image:url('images/hero-satellite.jpg')"><i class="fas fa-person-hiking"></i><span>Physical Training</span></button>
                <button type="button" class="acad-cat-tile" data-cat-filter="Study Visits and Exchange Programs" style="background-image:url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=700&q=80')"><i class="fas fa-plane-departure"></i><span>Study Visits &amp; Exchange</span></button>
                <button type="button" class="acad-cat-tile" data-cat-filter="Professional Certification" style="background-image:url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=700&q=80')"><i class="fas fa-certificate"></i><span>Professional Certification</span></button>
            </div>
            <div class="card-grid" id="pro-list"></div>
        </section>
    </div>

    <div class="wrap section" id="study-china">
        <h2 class="sol-h"><i class="fas fa-building-columns"></i> Study in China – University &amp; Postgraduate Opportunities</h2>
        <p class="panel-lede">Selected Chinese universities offering Bachelor's, Master's, PhD and postdoctoral pathways in geospatial, aerospace and Earth-system fields. Admission specifics are illustrative — confirm directly with each university.</p>
        <div class="uni-wall" id="university-wall"></div>
    </div>

    <div class="wrap">
        <div class="band" style="background-image:url('images/training-image.jpg')">
            <h3>Empower Your Future with WGIH Training Programs</h3>
            <a class="btn btn-yellow" href="program.html?id=short-gis">Explore More <i class="fas fa-arrow-right"></i></a>
        </div>
    </div>
</main>`, '<script src="content.js"></script><script src="pages.js"></script><script src="academy-boot.js"></script>');

pages['countries.html'] = chrome('Country Offices | WGIH', 'countries', `
<main class="page-main">
    <section class="page-hero" style="background-image:url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=80')">
        <div class="wrap">
            <p class="crumb"><a href="index.html">Home</a> / Country Offices</p>
            <h1>Country Offices</h1>
            <p class="lede">Local Presence. Global Impact.</p>
            <p class="lede" style="margin-top:-10px;font-size:14px;">Our representatives connect you to opportunities worldwide.</p>
            <a class="btn btn-green" href="#directory">Explore Countries <i class="fas fa-arrow-right"></i></a>
        </div>
    </section>
    <div class="wrap section" id="directory">
        <div class="search-line"><input data-office-search placeholder="Search a country or representative"></div>

        <h2 class="sol-h"><i class="fas fa-user-tie"></i> Meet Our Country Representatives</h2>
        <p class="panel-lede">WGIH works through representatives on the ground — each one a direct, named gateway into local cooperation.</p>
        <div class="rep-grid" id="rep-grid"></div>

        <h2 class="sol-h" style="margin-top:34px;"><i class="fas fa-earth-americas"></i> Our Global Network</h2>
        <div class="ctry-map-row">
            <div class="map-stage">
                <img class="map" src="images/world-map.svg" alt="World map of WGIH offices">
                <a class="map-dot" style="left:58%;top:46%" href="country.html?id=ethiopia" data-country="Ethiopia" aria-label="Ethiopia"></a>
                <a class="map-dot" style="left:44%;top:49%" href="country.html?id=ghana" data-country="Ghana" aria-label="Ghana"></a>
                <a class="map-dot" style="left:59%;top:52%" href="country.html?id=kenya" data-country="Kenya" aria-label="Kenya"></a>
                <a class="map-dot" style="left:48%;top:46%" href="country.html?id=nigeria" data-country="Nigeria" aria-label="Nigeria"></a>
                <a class="map-dot" style="left:55%;top:70%" href="country.html?id=south-africa" data-country="South Africa" aria-label="South Africa"></a>
            </div>
            <article class="panel"><h2>What a country office does</h2><ul class="check-list"><li><i class="fas fa-graduation-cap"></i>Training Programs</li><li><i class="fas fa-briefcase"></i>Business Opportunities</li><li><i class="fas fa-diagram-project"></i>Project Cooperation</li><li><i class="fas fa-masks-theater"></i>Cultural Events</li></ul></article>
        </div>

        <div class="mini-cards">
            <a href="country.html?id=ethiopia"><i class="fas fa-flag"></i><div><strong>National Projects & Success Stories</strong><p>Open a country profile</p></div></a>
            <a href="partners.html"><i class="fas fa-handshake"></i><div><strong>Local Partnerships</strong><p>How cooperation is presented</p></div></a>
            <a href="news.html#events"><i class="fas fa-calendar"></i><div><strong>Upcoming Events</strong><p>Sample calendar</p></div></a>
        </div>
    </div>
</main>`, '<script src="content.js"></script><script src="pages.js"></script><script src="countries-boot.js"></script>');

pages['news.html'] = chrome('News & Events | WGIH', 'news', `
<main class="page-main">
    <section class="page-hero" style="background-image:url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=80')">
        <div class="wrap">
            <p class="crumb"><a href="index.html">Home</a> / News & Events</p>
            <h1>News & Events</h1>
            <p class="lede">Stay Informed. Get Involved.</p>
            <p class="lede" style="margin-top:-10px;font-size:14px;">Latest updates, events and international activities.</p>
            <a class="btn btn-green" href="#room">Explore More <i class="fas fa-arrow-right"></i></a>
        </div>
    </section>
    <div class="wrap section" data-tabs id="room">
        <div class="pills">
            <button class="active" data-tab="latest" type="button">Latest News</button>
            <button data-tab="events" type="button" id="events">Upcoming Events</button>
            <button data-tab="photos" type="button" id="gallery">Photo Gallery</button>
            <button data-tab="videos" type="button">Video Gallery</button>
        </div>
        <section class="tab-panel active" data-panel="latest">
            <div class="news-grid">
                <div>
                    <div class="pills" data-filter-group id="news-filters">
                        <button class="active" data-filter="all" type="button">All</button>
                        <button data-filter="WGIH Announcements" type="button">Announcements</button>
                        <button data-filter="Space and Satellite News" type="button">Space</button>
                        <button data-filter="International Cooperation" type="button">Cooperation</button>
                        <button data-filter="Business and Industry News" type="button">Business</button>
                        <button data-filter="Country Office Activities" type="button">Country offices</button>
                    </div>
                    <div class="news-list-page" id="article-list"></div>
                </div>
                <a class="panel event-feature" href="event.html?id=summit-2026">
                    <img src="images/event-1.jpg" alt="">
                    <div>
                        <div class="date-stamp"><span>DEC</span><b>15</b><span>2025</span></div>
                        <h3>Global Space & Geospatial Summit</h3>
                        <p>Beijing, China</p>
                        <span class="btn btn-yellow">Register Now</span>
                    </div>
                </a>
            </div>
        </section>
        <section class="tab-panel" data-panel="events"><div class="card-grid" id="event-list"></div></section>
        <section class="tab-panel" data-panel="photos">
            <div class="gallery-mosaic">
                <a href="images/gallery-1.jpg"><img src="images/gallery-1.jpg" alt="Gallery"></a>
                <a href="images/gallery-2.jpg"><img src="images/gallery-2.jpg" alt="Gallery"></a>
                <a href="images/gallery-3.jpg"><img src="images/gallery-3.jpg" alt="Gallery"></a>
                <a href="images/gallery-4.jpg"><img src="images/gallery-4.jpg" alt="Gallery"></a>
                <a href="images/gallery-5.jpg"><img src="images/gallery-5.jpg" alt="Gallery"></a>
                <a href="images/gallery-6.jpg"><img src="images/gallery-6.jpg" alt="Gallery"></a>
                <a href="images/news-1.jpg"><img src="images/news-1.jpg" alt="News"></a>
                <a href="images/training-image.jpg"><img src="images/training-image.jpg" alt="Training"></a>
            </div>
        </section>
        <section class="tab-panel" data-panel="videos">
            <div class="card-grid">
                <article class="panel"><h3>Summit floor</h3><p>Video slot for a confirmed recording. The play control is visual in this prototype.</p><a class="btn btn-navy" href="images/gallery-6.jpg">View still</a></article>
                <article class="panel"><h3>Factory walkthrough</h3><p>Reserved for a manufacturer virtual tour once a real listing is approved.</p></article>
                <article class="panel"><h3>Training classroom</h3><p>Reserved for an academy highlight film.</p></article>
            </div>
        </section>
        <p class="note" style="margin:18px 0 32px;">Publications and reports will sit in this newsroom when official files are available. Sample stories above are layout content only.</p>
    </div>
</main>`, '<script src="content.js"></script><script src="pages.js"></script><script src="news-boot.js"></script>');

pages['partners.html'] = chrome('Our Partners | WGIH', 'partners', `
<main class="page-main">
    <section class="page-hero" style="background-image:url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1800&q=80')">
        <div class="wrap">
            <p class="crumb"><a href="index.html">Home</a> / Our Partners</p>
            <h1>Our Partners</h1>
            <p class="lede">Institutions, universities, technology teams and industry groups that cooperate with WGIH.</p>
        </div>
    </section>
    <div class="wrap section">
        <p class="note">Sample directory for the visual prototype. These names are design placeholders. They are not confirmed WGIH partners, and their logos are not used here.</p>
        <section class="partner-block"><h3>Strategic Partners</h3><div class="logo-wall"><a class="logo-tile" href="#profile-strategic"><b>SA</b><span>Sample Space Agency</span></a><a class="logo-tile" href="#profile-strategic"><b>NM</b><span>Sample National Mapping Agency</span></a></div></section>
        <section class="partner-block"><h3>Government and Institutional Partners</h3><div class="logo-wall"><a class="logo-tile" href="#profile-gov"><b>ML</b><span>Sample Ministry of Lands</span></a><a class="logo-tile" href="#profile-gov"><b>DM</b><span>Sample Disaster Authority</span></a></div></section>
        <section class="partner-block"><h3>Universities and Research Institutions</h3><div class="logo-wall"><a class="logo-tile" href="#profile-uni"><b>GU</b><span>Sample Geospatial University</span></a><a class="logo-tile" href="#profile-uni"><b>RI</b><span>Sample Remote Sensing Institute</span></a></div></section>
        <section class="partner-block"><h3>Technology Partners</h3><div class="logo-wall"><a class="logo-tile" href="#profile-tech"><b>EO</b><span>Sample Earth Observation Lab</span></a><a class="logo-tile" href="#profile-tech"><b>GN</b><span>Sample GNSS Studio</span></a></div></section>
        <section class="partner-block"><h3>Industry and Manufacturing Partners</h3><div class="logo-wall"><a class="logo-tile" href="business.html"><b>IN</b><span>See manufacturer samples</span></a><a class="logo-tile" href="business.html#dealers"><b>DL</b><span>Dealer opportunities</span></a></div></section>
        <section class="partner-block"><h3>International and Development Organizations</h3><div class="logo-wall"><a class="logo-tile" href="#profile-dev"><b>DV</b><span>Sample Development Program</span></a><a class="logo-tile" href="#profile-dev"><b>RG</b><span>Sample Regional Body</span></a></div></section>
        <article class="panel" id="profile-strategic" style="margin-bottom:28px;"><h2>Cooperation profile</h2><p>A confirmed partner page will show the organization, the form of cooperation, the countries involved and the activities underway. This prototype keeps that layout without presenting any organization as already signed.</p><p style="margin-top:8px;"><a href="about.html#contact">Talk about a partnership</a></p></article>
    </div>
</main>`, '<script src="pages.js"></script>');

function shell(title, active, dataPage) {
  return chrome(title, active, '<main class="page-main" id="mount"></main>', '<script src="content.js"></script><script src="pages.js"></script>', dataPage);
}

pages['solution.html'] = shell('Solution | WGIH', 'solutions', 'solution');
pages['company.html'] = shell('Manufacturer | WGIH', 'business', 'company');
pages['investor.html'] = shell('Investor | WGIH', 'business', 'investor');
pages['program.html'] = shell('Program | WGIH', 'academy', 'program');
pages['country.html'] = shell('Country Office | WGIH', 'countries', 'country');
pages['article.html'] = shell('News | WGIH', 'news', 'article');
pages['event.html'] = shell('Event | WGIH', 'news', 'event');
pages['search.html'] = shell('Search | WGIH', 'home', 'search');

for (const [name, html] of Object.entries(pages)) {
  fs.writeFileSync(path.join(__dirname, name), html);
  console.log('wrote', name);
}
