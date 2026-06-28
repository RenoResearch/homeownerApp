#!/usr/bin/env node
/**
 * Static SEO page generator for Reno Research.
 *
 * Pre-renders one crawlable HTML page per firm and per blog at clean URLs:
 *   /firms/<slug>/index.html   (slug = firm publicId, e.g. home4u-pte-ltd)
 *   /blogs/<slug>/index.html   (slug = blog slug)
 *
 * Pages are fully baked (title, meta, OG, canonical and visible content are all
 * in the HTML) so search engines index real content without running JS. Styling
 * is lifted from the dynamic firm.html / blog.html so the two never drift.
 *
 * Re-run on each deploy to refresh content:
 *   node generate-static-pages.mjs
 *
 * Requires Node 18+ (global fetch).
 */
import { writeFile, mkdir, readFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const API = process.env.RENO_API || 'https://api.renoresearch.sg';
const SITE = 'https://renoresearch.sg';
const ROOT = dirname(fileURLToPath(import.meta.url));
const TODAY = new Date().toISOString().slice(0, 10);

/* ------------------------------------------------------------------ utils */
function esc(s){ return (s ?? '').toString().replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function stripHtml(s){ return (s || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(); }
function titleCase(s){ return String(s||'').replace(/_/g,' ').replace(/\b\w/g, c => c.toUpperCase()); }
function fmtDate(d){ if(!d) return ''; try { return new Date(d).toLocaleDateString('en-SG',{year:'numeric',month:'long',day:'numeric'}); } catch { return ''; } }
function stars(n){ const r=Math.round(n||0); return '★★★★★'.slice(0,r) + '☆☆☆☆☆'.slice(0,5-r); }
const AV_COLORS = ['#E8A41E','#2E7D6B','#7D5BA6','#C0392B','#2D6CB0','#D98324','#3E8E7E','#9B4F96','#B7791F','#5C6BC0'];
function colorFor(name){ let h=0; for(let i=0;i<(name||'').length;i++) h=(h*31+name.charCodeAt(i))>>>0; return AV_COLORS[h%AV_COLORS.length]; }
function initials(name){ const p=(name||'?').trim().split(/\s+/).filter(Boolean); return ((p[0]?.[0]||'?')+(p[1]?.[0]||'')).toUpperCase(); }

async function getJson(url, opts){
  const res = await fetch(url, { headers: { Accept: 'application/json' }, ...opts });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

// Pull the <style>…</style> block out of a dynamic page so static pages match it.
async function styleFrom(file){
  const html = await readFile(join(ROOT, file), 'utf8');
  const m = html.match(/<style>[\s\S]*?<\/style>/i);
  return m ? m[0] : '<style></style>';
}

// Shared GA snippet + fonts, identical to the dynamic pages.
const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">`;
const GA = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-PWKB2Y6H6F"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-PWKB2Y6H6F');</script>`;

// App bar with absolute links (pages live in /firms/<slug>/ subfolders).
function appbar(active){
  const link = (href, label, key) => `<a href="${href}"${active===key?' class="active"':''}>${label}</a>`;
  return `<header class="appbar">
  <div class="wrap inner">
    <a class="brand" href="/index.html" aria-label="Reno Research home">
      <span class="chip">R</span>
      <span class="name"><b>Reno Research</b><span>Renovation matchmaking</span></span>
    </a>
    <nav class="nav">
      ${link('/firms.html','Firms','firms')}
      ${link('/portfolio.html','Portfolio','portfolio')}
      ${link('/packages.html','Packages','packages')}
      ${link('/events.html','Events','events')}
      ${link('/blogs.html','Guides','blogs')}
      <a href="/loan.html">Loan</a>
    </nav>
    <a href="/index.html#lead" class="btn btn-gold" style="padding:.65rem 1.2rem">Get matched</a>
    <button class="menu-btn" aria-label="Menu" onclick="document.querySelector('.nav').style.display=getComputedStyle(document.querySelector('.nav')).display==='flex'?'none':'flex'">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
    </button>
  </div>
</header>`;
}

function docHead({ title, description, canonical, image, ogType, style, jsonld }){
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="canonical" href="${esc(canonical)}" />
<meta name="robots" content="index, follow, max-image-preview:large" />
<meta name="theme-color" content="#1B1B2E" />
<meta name="geo.region" content="SG" />
<meta name="geo.placename" content="Singapore" />
<link rel="icon" href="/favicon.ico" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<meta property="og:type" content="${esc(ogType||'website')}" />
<meta property="og:site_name" content="Reno Research" />
<meta property="og:locale" content="en_SG" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:url" content="${esc(canonical)}" />
<meta property="og:image" content="${esc(image || SITE + '/og-image.jpg')}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(description)}" />
<meta name="twitter:image" content="${esc(image || SITE + '/og-image.jpg')}" />
${GA}
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
${FONTS}
${style}
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
</head>`;
}

// Minimal self-contained lightbox used by firm showroom photos.
const LIGHTBOX_HTML = `<div class="lightbox" id="lightbox">
  <button class="lb-close" id="lbClose" aria-label="Close"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
  <img id="lbImg" alt="">
</div>`;
const LIGHTBOX_JS = `<script>
(function(){
  var lb=document.getElementById('lightbox'),img=document.getElementById('lbImg');
  function open(s){ if(!s) return; img.src=s; lb.classList.add('open'); document.body.style.overflow='hidden'; }
  function close(){ lb.classList.remove('open'); document.body.style.overflow=''; }
  document.getElementById('lbClose').addEventListener('click',close);
  lb.addEventListener('click',function(e){ if(e.target===lb) close(); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') close(); });
  document.querySelectorAll('[data-full]').forEach(function(el){ el.addEventListener('click',function(){ open(el.getAttribute('data-full')); }); });
})();
</script>`;

/* ----------------------------------------------------------------- firms */
function renderFirmBody(f){
  const name = f.companyName || 'Renovation firm';
  const logo = f.companyLogo || '';
  const desc = (f.companyDescription || '').trim();
  const address = (f.address || '').trim();
  const services = (f.selectedContractorServices || []).filter(Boolean);
  const styles = (f.selectedRenovationStyles || []).filter(Boolean);
  const certs = (f.certifications || []).filter(Boolean);
  const shots = (f.showroomImageUrls || []).filter(Boolean);
  const projects = (f.portfolio || []).filter(Boolean);
  const gp = f.googlePlaces || null;
  const rating = gp?.overallRating || 0;
  const totalReviews = gp?.totalReviews || 0;
  const reviews = (gp?.reviews || []).filter(r => r && (r.text || r.comment)).slice(0, 5);
  const tier = (f.data?.membership?.type || 'free').toLowerCase();
  const badge = ['platinum','gold','silver'].includes(tier) ? `<span class="badge ${tier}">${tier}</span>` : '';

  const avatar = logo
    ? `<img class="flogo" src="${esc(logo)}" alt="${esc(name)} logo">`
    : `<span class="fav" style="background:${colorFor(name)}">${esc(initials(name))}</span>`;

  const specRow = (k, v) => v ? `<div class="spec-row"><span class="k">${esc(k)}</span><span class="v">${esc(v)}</span></div>` : '';

  return `${appbar('firms')}
<main class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/index.html">Home</a><span class="sep">/</span>
    <a href="/firms.html">Firms</a><span class="sep">/</span>
    <span>${esc(name)}</span>
  </nav>
</main>
<section class="firm">
  <div class="wrap">
    <div class="fhero">
      ${badge}
      ${avatar}
      <div class="fhead">
        <h1>${esc(name)}</h1>
        ${address ? `<div class="loc"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>${esc(address)}</div>` : ''}
        <div class="fstats">
          <div class="fstat"><b>${rating > 0 ? '<span class="star">★</span> ' + rating.toFixed(1) : 'New'}</b><span>${totalReviews ? totalReviews + ' Google reviews' : 'on Reno Research'}</span></div>
          ${f.experience ? `<div class="fstat"><b>${esc(f.experience)}+</b><span>years experience</span></div>` : ''}
          ${f.teamSize ? `<div class="fstat"><b>${esc(f.teamSize)}</b><span>team size</span></div>` : ''}
          ${projects.length ? `<div class="fstat"><b>${projects.length}</b><span>projects</span></div>` : ''}
        </div>
      </div>
    </div>
    <div class="layout">
      <div class="main">
        ${desc ? `<div class="section"><h2>About</h2><div class="note">${esc(desc)}</div></div>` : ''}
        ${services.length ? `<div class="section"><h2>Services</h2><div class="chips">${services.map(s => `<span class="chip-tag spec">${esc(titleCase(s))}</span>`).join('')}</div></div>` : ''}
        ${styles.length ? `<div class="section"><h2>Design styles</h2><div class="chips">${styles.map(s => `<span class="chip-tag">${esc(titleCase(s))}</span>`).join('')}</div></div>` : ''}
        ${certs.length ? `<div class="section"><h2>Certifications</h2><div class="chips">${certs.map(c => `<span class="chip-tag">${esc(c)}</span>`).join('')}</div></div>` : ''}
        ${shots.length ? `<div class="section"><h2>Showroom</h2><div class="shots">${shots.map(u => `<img src="${esc(u)}" alt="${esc(name)} showroom" loading="lazy" data-full="${esc(u)}">`).join('')}</div></div>` : ''}
        ${projects.length ? `<div class="section"><h2>Recent projects</h2><div class="pf-grid">${projects.slice(0,8).map(p => {
          const cover = p.coverImage || (p.imageUrls && p.imageUrls[0]) || (p.images && p.images[0]) || '';
          const title = (p.title || '').trim() || `${p.renovationType || p.propertyType || 'Renovation'} project`;
          const pid = p.portfolioId || p._id || '';
          const inner = `${cover ? `<img class="cv" src="${esc(cover)}" alt="${esc(title)}" loading="lazy">` : `<div class="cv"></div>`}<div class="bd"><b>${esc(title)}</b></div>`;
          return pid ? `<a class="pf-card" href="/portfolio-item.html?id=${encodeURIComponent(pid)}">${inner}</a>` : `<div class="pf-card">${inner}</div>`;
        }).join('')}</div></div>` : ''}
        ${reviews.length ? `<div class="section"><h2>What clients say</h2><div class="reviews">${reviews.map(r => `<div class="review"><div class="rtop"><span class="rname">${esc(r.authorName || r.author_name || 'Google user')}</span><span class="rstars">${stars(r.rating)}</span></div><div class="rtext">${esc(r.text || r.comment || '')}</div></div>`).join('')}</div></div>` : ''}
      </div>
      <aside class="aside">
        <div class="specs">
          ${specRow('Address', address)}
          ${specRow('Experience', f.experience ? `${f.experience} years` : '')}
          ${specRow('Team size', f.teamSize)}
          ${specRow('Rating', rating > 0 ? `${rating.toFixed(1)} / 5 (${totalReviews})` : 'Not yet rated')}
          ${specRow('Membership', ['platinum','gold','silver'].includes(tier) ? titleCase(tier) : '')}
          ${specRow('UEN', f.uen)}
        </div>
        <div class="sidecta">
          <h3>Work with ${esc(name.split(/\s+/)[0])}</h3>
          <p>Get matched and receive a free quote tailored to your project.</p>
          <a href="/index.html#lead" class="btn btn-gold" style="width:100%">Get matched</a>
        </div>
      </aside>
    </div>
  </div>
</section>
${LIGHTBOX_HTML}
${LIGHTBOX_JS}`;
}

function firmPage(f, style){
  const name = f.companyName || 'Renovation firm';
  const slug = f.publicId;
  const desc = (f.companyDescription || '').trim().slice(0, 160)
    || `${name} — a vetted renovation firm on Reno Research${f.address ? ', ' + f.address : ''}.`;
  const canonical = `${SITE}/firms/${slug}/`;
  const rating = f.googlePlaces?.overallRating || 0;
  const jsonld = {
    '@context':'https://schema.org','@type':'LocalBusiness',
    name, description: desc, url: canonical,
    ...(f.companyLogo ? { image: f.companyLogo } : {}),
    ...(f.address ? { address: f.address } : {}),
    ...(rating > 0 ? { aggregateRating: { '@type':'AggregateRating', ratingValue: rating, reviewCount: f.googlePlaces?.totalReviews || 0 } } : {}),
  };
  return `${docHead({ title: `${name} | Reno Research`, description: desc, canonical, image: f.companyLogo, ogType:'profile', style, jsonld })}
<body>
${renderFirmBody(f)}
</body>
</html>`;
}

/* ----------------------------------------------------------------- blogs */
function blogHref(b){ return b.slug ? `/blogs/${b.slug}/` : `/blog.html?id=${encodeURIComponent(b._id || '')}`; }

function renderBlogBody(b){
  const paras = stripHtml(b.mainContent).split(/\n+/).filter(Boolean).map(p => `<p>${esc(p)}</p>`).join('');
  const related = (b.relatedArticles || []).filter(Boolean);
  return `${appbar('blogs')}
<main class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/index.html">Home</a><span class="sep">/</span>
    <a href="/blogs.html">Guides</a><span class="sep">/</span>
    <span>${esc(b.title || 'Article')}</span>
  </nav>
</main>
<article class="article">
  <div class="wrap">
    <div class="col">
      ${b.category ? `<div class="rcat">${esc(b.category)}</div>` : ''}
      <h1>${esc(b.title || '')}</h1>
      ${b.subtitle ? `<p class="rsub">${esc(b.subtitle)}</p>` : ''}
      <div class="rmeta">
        ${b.readTimeMinutes ? `<span class="stat"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>${b.readTimeMinutes} min read</span>` : ''}
        <span class="stat"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>${(b.viewCount||0).toLocaleString()} views</span>
        ${b.createdAt ? `<span class="stat">${esc(fmtDate(b.createdAt))}</span>` : ''}
      </div>
      ${b.coverImage ? `<img class="rcover" src="${esc(b.coverImage)}" alt="${esc(b.title)}">` : ''}
      <div class="content">${paras || '<p>No content available.</p>'}</div>
      ${(b.tagsList||[]).length ? `<div class="rtags">${b.tagsList.map(t => `<span class="chip-tag">${esc(t)}</span>`).join('')}</div>` : ''}
      <div class="cta">
        <h3>Planning a renovation?</h3>
        <p>Get matched with vetted firms that fit your budget and style — free.</p>
        <a href="/index.html#lead" class="btn btn-gold">Get matched</a>
      </div>
      ${related.length ? `<section class="related"><h2>Related guides</h2><div class="rel-grid">${related.map(r => `<a class="rel-card" href="${blogHref(r)}">${r.coverImage ? `<img class="cv" src="${esc(r.coverImage)}" alt="${esc(r.title)}" loading="lazy">` : `<div class="cv"></div>`}<div class="bd"><b>${esc(r.title || 'Untitled')}</b></div></a>`).join('')}</div></section>` : ''}
    </div>
  </div>
</article>`;
}

function blogPage(b, style){
  const desc = stripHtml(b.subtitle) || stripHtml(b.mainContent).slice(0, 160);
  const canonical = `${SITE}/blogs/${b.slug}/`;
  const jsonld = {
    '@context':'https://schema.org','@type':'Article',
    headline: b.title, description: desc, url: canonical,
    ...(b.coverImage ? { image: b.coverImage } : {}),
    ...(b.createdAt ? { datePublished: new Date(b.createdAt).toISOString() } : {}),
    ...(b.updatedAt ? { dateModified: new Date(b.updatedAt).toISOString() } : {}),
    publisher: { '@type':'Organization', name:'Reno Research' },
  };
  return `${docHead({ title: `${b.title || 'Renovation guide'} | Reno Research`, description: desc, canonical, image: b.coverImage, ogType:'article', style, jsonld })}
<body>
${renderBlogBody(b)}
</body>
</html>`;
}

/* ------------------------------------------------------------------ main */
async function writePage(rel, html){
  const dir = join(ROOT, rel);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), html, 'utf8');
}

async function buildFirms(style){
  const out = [];
  // Slug source: RENO_FIRM_SLUGS=a,b regenerates just those firms; otherwise the
  // full directory from /search-firms (which must expose publicId — deploy first).
  let slugs;
  const override = (process.env.RENO_FIRM_SLUGS || '').split(',').map(s => s.trim()).filter(Boolean);
  if (override.length){
    slugs = override;
    console.log(`  → ${slugs.length} firm(s) from RENO_FIRM_SLUGS`);
  } else {
    let json;
    try { json = await getJson(`${API}/search-firms?page=1&limit=1000`); }
    catch (e){ console.error('  ✗ could not list firms:', e.message); return out; }
    slugs = (json.data || []).map(f => f.publicId).filter(Boolean);
    console.log(`  → ${slugs.length} firms with slugs (of ${(json.data||[]).length} total)`);
  }
  for (const slug of slugs){
    try {
      const rich = (await getJson(`${API}/getdesignerbypublicid/${encodeURIComponent(slug)}`)).designer;
      if (!rich || !rich.publicId){ console.warn(`  · skip ${slug} (no detail)`); continue; }
      await writePage(`firms/${rich.publicId}`, firmPage(rich, style));
      out.push(`/firms/${rich.publicId}/`);
    } catch (e){ console.warn(`  · skip ${slug}: ${e.message}`); }
  }
  return out;
}

async function buildBlogs(style){
  const out = [];
  let page = 1, totalPages = 1, all = [];
  do {
    try {
      const json = await getJson(`${API}/gethomeownerblogs?page=${page}&limit=50`);
      all = all.concat(json.data || []);
      totalPages = json.pagination?.totalPages || 1;
    } catch (e){ console.error('  ✗ could not list blogs:', e.message); break; }
    page++;
  } while (page <= totalPages);

  // The list endpoint already returns mainContent + relatedArticles, so we render
  // straight from it — no per-blog detail fetch (which would bump viewCount each run).
  const blogs = all.filter(b => b.slug);
  console.log(`  → ${blogs.length} blogs with slugs (of ${all.length} total)`);
  for (const b of blogs){
    try {
      await writePage(`blogs/${b.slug}`, blogPage(b, style));
      out.push(`/blogs/${b.slug}/`);
    } catch (e){ console.warn(`  · skip ${b.slug}: ${e.message}`); }
  }
  return out;
}

function buildSitemap(firmUrls, blogUrls){
  const staticPages = [
    ['/', 'weekly', '1.0'],
    ['/firms.html', 'daily', '0.9'],
    ['/portfolio.html', 'daily', '0.9'],
    ['/loan.html', 'monthly', '0.9'],
    ['/events.html', 'daily', '0.8'],
    ['/packages.html', 'weekly', '0.7'],
    ['/blogs.html', 'daily', '0.7'],
  ];
  const url = (loc, freq, pri) => `  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${pri}</priority>\n  </url>`;
  const body = [
    ...staticPages.map(([l,f,p]) => url(l,f,p)),
    ...firmUrls.map(u => url(u, 'weekly', '0.6')),
    ...blogUrls.map(u => url(u, 'monthly', '0.6')),
  ].join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

async function main(){
  const clean = process.argv.includes('--clean');
  if (clean){
    await rm(join(ROOT, 'firms'), { recursive: true, force: true }).catch(()=>{});
    await rm(join(ROOT, 'blogs'), { recursive: true, force: true }).catch(()=>{});
    console.log('Cleaned firms/ and blogs/');
  }
  const [firmStyle, blogStyle] = await Promise.all([styleFrom('firm.html'), styleFrom('blog.html')]);

  console.log('Generating firm pages…');
  const firmUrls = await buildFirms(firmStyle);
  console.log('Generating blog pages…');
  const blogUrls = await buildBlogs(blogStyle);

  await writeFile(join(ROOT, 'sitemap.xml'), buildSitemap(firmUrls, blogUrls), 'utf8');
  console.log(`\n✓ ${firmUrls.length} firm + ${blogUrls.length} blog pages written.`);
  console.log(`✓ sitemap.xml updated with ${firmUrls.length + blogUrls.length + 7} URLs.`);
}

main().catch(e => { console.error('Generator failed:', e); process.exit(1); });
