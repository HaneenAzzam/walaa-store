/* Walaa Fadel storefront: rendering, routing, search, demo cart. Content lives in data.js. */
(() => {
const W = window.WALAA;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- helpers ---------- */
const ICONS = {
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  bag: '<path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  'arrow-left': '<path d="M20 12H4m6-6-6 6 6 6"/>',
  'arrow-right': '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  check: '<path d="m5 12 4 4L20 5"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>'
};
const icon = n => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ''}</svg>`;
const img = name => (window.ASSET_MAP && window.ASSET_MAP[name]) || `assets/${name}.jpg`;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = v => new Intl.NumberFormat('ar-SA', { maximumFractionDigits: 2, numberingSystem: 'latn' }).format(v);
const money = v => v === null ? '<span class="price-note">السعر في المتجر</span>' : `${fmt(v)}<span class="currency">ر.س</span>`;

/* ---------- data ---------- */
const COVERS = ['cov-iris', 'cov-olive', 'cov-arch', 'cov-journal', 'cov-bowl'];
const products = W.products.map((p, i) => ({
  id: p[0], name: p[1], price: p[2], cat: p[3], desc: p[4], date: p[5],
  cover: p[3] === 'group' ? 'cov-bowl' : COVERS[i % COVERS.length],
  url: `https://walaafadel.com/p${p[0]}`
}));
const byId = id => products.find(p => p.id === id);
const inCat = c => products.filter(p => p.cat === c);
const typeLabel = p => p.cat === 'recorded' ? 'جلسة مسجلة' : p.cat === 'private' ? 'جلسة خاصة' : 'لقاء حضوري';
const tagLabel = p => p.cat === 'recorded' ? 'مسجلة' : p.cat === 'private' ? 'خاصة' : 'حضوري';
const MONTHS = { 'أكتوبر': 10, 'نوفمبر': 11, 'ديسمبر': 12 };
const dateParts = d => { const [day, month] = d.split(' '); return { day, month, order: (MONTHS[month] || 0) * 100 + Number(day) }; };
const events = () => inCat('group').sort((a, b) => dateParts(a.date).order - dateParts(b.date).order);
const eventAt = p => { const d = dateParts(p.date); return new Date(new Date().getFullYear(), (MONTHS[d.month] || 1) - 1, Number(d.day)); };
const upcoming = () => events().filter(p => eventAt(p) > new Date());
const norm = s => String(s).replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/[ً-ٟ]/g, '');

/* ---------- shared blocks ---------- */
const sectionHead = (kicker, title, text, link) => `<div class="sec-head"><div>${kicker ? `<p class="kicker">${kicker}</p>` : ''}<h2>${title}</h2>${text ? `<p class="sec-text">${text}</p>` : ''}</div>${link ? `<a class="more" href="${link[0]}">${link[1]} ${icon('arrow-left')}</a>` : ''}</div>`;
const addBtn = p => p.price === null ? '' : `<button class="btn btn-solid btn-sm" type="button" data-add="${p.id}" aria-label="أضيفي ${esc(p.name)} إلى السلة">للسلة</button>`;

function card(p) {
  const label = p.cat === 'group' ? 'التفاصيل والحجز' : 'تفاصيل الجلسة';
  return `<article class="card"><a class="card-media" href="#product/${p.id}" tabindex="-1" aria-hidden="true"><img src="${img(p.cover)}" alt="" loading="lazy" width="600" height="600"><span class="card-tag">${tagLabel(p)}</span></a><div class="card-body"><h3><a href="#product/${p.id}">${p.name}</a></h3><p>${p.desc}</p>${p.date ? `<p class="card-date">${p.date}</p>` : ''}<div class="card-price price">${money(p.price)}</div><div class="card-actions"><a class="btn btn-ghost btn-sm" href="#product/${p.id}">${label}</a>${addBtn(p)}</div></div></article>`;
}

function eventRow(p) {
  const d = dateParts(p.date);
  return `<article class="event"><div class="event-date" role="text" aria-label="${p.date}"><strong>${d.day}</strong><span>${d.month}</span></div><div class="event-info"><h3><a href="#product/${p.id}">${p.name}</a></h3><p>${p.desc}</p></div><div class="event-cta"><span class="price">${money(p.price)}</span><a class="btn btn-solid btn-sm" href="#product/${p.id}">التفاصيل والحجز</a></div></article>`;
}

function privateRow(p) {
  return `<article class="prow"><div class="prow-info"><h3><a href="#product/${p.id}">${p.name}</a></h3><p>${p.desc}</p></div><div class="prow-end"><span class="price">${money(p.price)}</span><a class="text-link" href="#product/${p.id}">تفاصيل الجلسة ${icon('arrow-left')}</a></div></article>`;
}

const faqHTML = () => `<div class="faq-list">${W.faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>`;

function pageHead(title, text, crumb) {
  return `<section class="page-head"><div class="wrap"><nav class="breadcrumb" aria-label="مسار التنقل"><a href="#">الرئيسية</a><span aria-hidden="true">/</span><span>${crumb || title}</span></nav><h1>${title}</h1>${text ? `<p>${text}</p>` : ''}</div></section>`;
}

const aboutMedia = () => `<div class="about-media"><div class="about-frame"><img src="${img('about-main')}" alt="وعاء صوتي نحاسي وأغصان مجففة على قماش طبيعي" loading="lazy" width="1000" height="964"></div><p class="caption">صورة توضيحية، بانتظار صور ولاء الأصلية</p></div>`;

/* ---------- home ---------- */
function home() {
  const rec = inCat('recorded'), grp = upcoming(), prv = inCat('private');
  const minRec = Math.min(...rec.filter(p => p.price !== null).map(p => p.price));
  const counts = { recorded: rec.length, group: events().length, private: prv.length, journal: 0, affirmation: 0 };
  const circles = [
    ['وقت لنفسي', 'recorded', 'entry-olive'], ['أعيش تجربة', 'group', 'entry-bowl'], ['أكتب وأكتشف', 'journal', 'entry-journal'],
    ['مساحة خاصة', 'private', 'entry-arch'], ['التوكيدات', 'affirmation', 'cov-iris']
  ].map(([t, to, art]) => `<a class="circle" href="#catalog/${to}"><span class="circle-img"><img src="${img(art)}" alt="" loading="lazy" width="300" height="300"></span><strong>${t}</strong><small>${counts[to] ? `${counts[to]} تجربة` : 'قريبًا'}</small></a>`).join('');
  const marquee = ['الجلسات المسجلة', 'اللقاءات الحضورية', 'الجلسات الخاصة', 'المفكرات والتدوين', 'التوكيدات', 'ساوند هيلينغ', 'تأمل وصوت']
    .map(t => `<span>${t}</span><svg viewBox="0 0 64 58" aria-hidden="true"><path d="M32 45C16 38 19 19 32 6c13 13 16 32 0 39ZM32 45C15 46 5 33 6 18c17 2 27 12 26 27Zm0 0c17 1 27-12 26-27-17 2-27 12-26 27Z"/></svg>`).join('');
  const strip = `<div class="strip" aria-hidden="true"><div class="strip-track">${marquee}${marquee}</div></div>`;
  const tabs = [['all', 'الكل'], ['recorded', 'الجلسات المسجلة'], ['group', 'اللقاءات'], ['private', 'الجلسات الخاصة']];
  return `
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <h1>مساحة تتقرّبي فيها <span class="hl">من نفسك أكثر</span></h1>
      <p class="hero-lead">من الصوت والتأمل إلى الكتابة واكتشاف الذات، اختاري المساحة الأقرب لكِ وابدئي بوقت صغير لنفسك.</p>
      <div class="hero-actions"><a class="btn btn-solid" href="#choose">اكتشفي مساحتك</a><a class="btn btn-ghost" href="#catalog/all">كل التجارب</a></div>
    </div>
    <div class="hero-art">
      <div class="hero-photo"><img src="${img('hero')}" alt="وعاء صوتي نحاسي وأداة الطرق على قماش طبيعي في ضوء الصباح" width="1536" height="1024" fetchpriority="high"></div>
      <span class="chip-float chip-a">${icon('check')} تستمعين في وقتك</span>
      <span class="chip-float chip-b">${icon('shield')} إتمام الطلب عبر سلة</span>
    </div>
  </div>
</section>
${strip}

<section class="sec" id="choose"><div class="wrap">
  <div class="sec-head center"><div><h2>إيش تحتاجي <span class="hl">اليوم؟</span></h2><p class="sec-text">كل يوم يحمل احتياجًا مختلفًا. اختاري المساحة الأقرب لكِ.</p></div></div>
  <div class="circles">${circles}</div>
</div></section>

<section class="sec sec-tight"><div class="wrap promos">
  <article class="promo promo-peach"><div class="promo-copy"><span class="badge">من ${fmt(minRec)} ر.س</span><h3>جلسات مسجلة <span class="hl">لوقتك</span></h3><p>${rec.length} جلسة صوت وتأمل، استمعي لها متى ما ناسبك.</p><a class="btn btn-solid btn-sm" href="#catalog/recorded">تصفّحي الجلسات</a></div><img src="${img('cov-olive')}" alt="" loading="lazy" width="400" height="400"></article>
  <article class="promo promo-plum"><div class="promo-copy"><span class="badge badge-light">${grp.length} لقاءات قادمة</span><h3>نلتقي ونتشارك <span class="hl">التجربة</span></h3><p>رحلات صوتية وتأمل جماعية بمواعيد محددة.</p><a class="btn btn-light btn-sm" href="#catalog/group">اللقاءات الحضورية</a></div><img src="${img('event-side')}" alt="" loading="lazy" width="400" height="400"></article>
</div></section>

<section class="sec"><div class="wrap about-grid">
  <div class="collage">
    <img class="c1" src="${img('about-main')}" alt="وعاء صوتي نحاسي وأغصان مجففة على قماش طبيعي" loading="lazy" width="500" height="500">
    <img class="c2" src="${img('writing')}" alt="مفكرة مفتوحة وغصن مجفف" loading="lazy" width="300" height="300">
    <img class="c3" src="${img('research')}" alt="غصن زيتون عليه ثمار" loading="lazy" width="300" height="300">
    <span class="seal" aria-hidden="true"><svg viewBox="0 0 64 58"><path d="M32 45C16 38 19 19 32 6c13 13 16 32 0 39ZM32 45C15 46 5 33 6 18c17 2 27 12 26 27Zm0 0c17 1 27-12 26-27-17 2-27 12-26 27ZM15 48c10 8 24 8 34 0"/></svg></span>
  </div>
  <div class="about-copy">
    <h2>رحلة نحو <span class="hl">راحة أعمق</span> مع نفسك</h2>
    <p class="about-lead">أهلًا، أنا ولاء. بدأت رحلتي في المختبرات الطبية، ثم قادني فضولي إلى الصحة الشمولية والصوت والكوتشينغ واكتشاف الذات.</p>
    <p>هنا أشاركك تجارب وأدوات تختارين منها ما يناسب مرحلتك.</p>
    <dl class="stats"><div><dd>${products.length}</dd><dt>تجربة</dt></div><div><dd>${rec.length}</dd><dt>جلسة مسجلة</dt></div><div><dd>${grp.length}</dd><dt>لقاءات قادمة</dt></div></dl>
    <a class="btn btn-ghost" href="#about">تعرّفي على ولاء</a>
  </div>
</div></section>

<section class="sec sec-lilac"><div class="wrap">
  <div class="sec-head"><div><h2>الأكثر <span class="hl">اختيارًا</span></h2></div><a class="more" href="#catalog/all">كل التجارب ${icon('arrow-left')}</a></div>
  <div class="tabs" role="tablist" aria-label="نوع التجربة">${tabs.map(([k, l], i) => `<button type="button" role="tab" class="tab" data-tab="${k}" aria-selected="${i === 0}">${l}</button>`).join('')}</div>
  <div class="products" id="pick-grid"></div>
</div></section>

${grp.length ? `<section class="sec" id="countdown-sec"><div class="wrap">
  <div class="count-banner">
    <img class="count-side count-l" src="${img('cov-bowl')}" alt="" loading="lazy" width="300" height="400">
    <div class="count-main">
      <h2>اللقاء القادم: <span class="hl" id="cd-name"></span></h2>
      <p id="cd-date"></p>
      <div class="cd" role="timer" aria-label="الوقت المتبقي للقاء">${[['d', 'يوم'], ['h', 'ساعة'], ['m', 'دقيقة'], ['s', 'ثانية']].map(([k, l]) => `<div class="cd-unit"><div class="flip" id="cd-${k}"><span class="fl up">0</span><span class="fl down">0</span><span class="fl fold-top">0</span><span class="fl fold-bot">0</span></div><span class="cd-label">${l}</span></div>`).join('<i aria-hidden="true">:</i>')}</div>
      <a class="btn btn-solid" id="cd-link" href="#catalog/group">التفاصيل والحجز</a>
    </div>
    <img class="count-side count-r" src="${img('cov-arch')}" alt="" loading="lazy" width="300" height="400">
  </div>
</div></section>` : ''}

${strip}

<section class="sec"><div class="wrap">
  <div class="sec-head"><div><h2>جلسات خاصة <span class="hl">لكِ وحدك</span></h2><p class="sec-text">تجارب فردية، وقتها لكِ. اقرئي تفاصيل كل جلسة وطريقة تنسيق موعدها قبل الاختيار.</p></div><a class="more" href="#catalog/private">كل الجلسات الخاصة ${icon('arrow-left')}</a></div>
  <div class="private-grid">
    <a class="tall" href="#catalog/private"><img src="${img('private')}" alt="زهرة سوسن بنفسجية على ورق ناعم" loading="lazy" width="502" height="627"><span class="tall-cap"><strong>جلسة فردية</strong><small>من ${fmt(Math.min(...prv.map(p => p.price)))} ر.س</small></span></a>
    <div class="products products-2">${prv.map(card).join('')}</div>
  </div>
</div></section>

<section class="sec voices"><div class="wrap">
  <div class="sec-head center"><div><h2>إيش قالوا <span class="hl">عن التجربة؟</span></h2><p class="sec-text">كلمات حقيقية من تقييمات الزائرات في المتجر الحالي.</p></div></div>
  <div class="v-grid">${W.testimonials.map(t => `<figure class="v-item"><span class="v-q" aria-hidden="true">”</span><blockquote>${t.quote}</blockquote><figcaption><span class="v-avatar" aria-hidden="true">ز</span><span><strong>زائرة</strong><small>${t.source.replace('من تقييم زائرة في ', 'تقييم في ')}</small></span></figcaption></figure>`).join('')}
    <figure class="v-item v-cta"><span class="v-q" aria-hidden="true">”</span><blockquote>جرّبي جلسة واحدة، وقرّري بنفسك.</blockquote><a class="btn btn-light btn-sm" href="#catalog/recorded">ابدئي من الجلسات المسجلة</a></figure>
  </div>
</div></section>

<section class="sec" id="home-faq"><div class="wrap faq-layout">
  <div class="faq-col"><h2>أسئلة ممكن <span class="hl">تدور في بالك</span></h2>${faqHTML()}</div>
  <aside class="faq-box"><h3>عندك سؤال ثاني؟</h3><p>اقرئي الأسئلة الشائعة كاملة، أو تواصلي معنا عبر المتجر الأصلي.</p><a class="btn btn-light" href="#faq">كل الأسئلة</a></aside>
</div></section>

<section class="sec sec-tight"><div class="wrap"><div class="closing"><h2>خذي وقتك… واختاري المساحة الأقرب لكِ.</h2><a class="btn btn-light" href="#catalog/all">اكتشفي جميع التجارب</a></div></div></section>`;
}

function drawPicks(tab) {
  const grid = $('#pick-grid'); if (!grid) return;
  const rank = { recorded: 0, group: 1, private: 2 };
  const picks = W.homePicks.recorded.map(byId).concat(upcoming(), inCat('private'), inCat('recorded').filter(p => !W.homePicks.recorded.includes(p.id)));
  const list = (tab === 'all' ? picks : picks.filter(p => p.cat === tab)).slice(0, 8);
  grid.innerHTML = list.map(card).join('');
  $$('.tab').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === tab)));
}

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
let cdTimer;
function flipTo(el, v) {
  if (!el || el.dataset.v === v) return;
  const first = el.dataset.v === undefined, old = el.dataset.v ?? v;
  el.dataset.v = v;
  const [up, down, ft, fb] = el.children;
  up.textContent = v;
  if (first || reduced()) { down.textContent = ft.textContent = fb.textContent = v; return; }
  ft.textContent = old; down.textContent = old; fb.textContent = v;
  el.classList.remove('go'); void el.offsetWidth; el.classList.add('go');
  clearTimeout(el._t);
  el._t = setTimeout(() => { down.textContent = v; el.classList.remove('go'); }, 640);
}
function initCountdown() {
  clearInterval(cdTimer);
  const name = $('#cd-name'); if (!name) return;
  const next = upcoming().map(p => ({ p, at: eventAt(p) }))[0];
  if (!next) { $('#countdown-sec').hidden = true; return; }
  name.textContent = next.p.name;
  $('#cd-date').textContent = `${next.p.date} · ${next.p.desc}. الموعد مرجعي، يُؤكَّد عند الحجز.`;
  $('#cd-link').href = `#product/${next.p.id}`;
  const pad = n => String(n).padStart(2, '0');
  const tick = () => {
    let s = Math.max(0, Math.floor((next.at - new Date()) / 1000));
    const d = Math.floor(s / 86400); s -= d * 86400; const h = Math.floor(s / 3600); s -= h * 3600; const m = Math.floor(s / 60); s -= m * 60;
    flipTo($('#cd-d'), pad(d)); flipTo($('#cd-h'), pad(h)); flipTo($('#cd-m'), pad(m)); flipTo($('#cd-s'), pad(s));
  };
  tick(); cdTimer = setInterval(() => { if (!$('#cd-s')) return clearInterval(cdTimer); tick(); }, 1000);
}

/* ---------- catalog ---------- */
const state = { cat: 'all', sort: 'default', q: '' };
function catalogPage(cat) {
  state.cat = W.categories[cat] ? cat : 'all';
  state.sort = 'default'; state.q = '';
  const title = W.categories[state.cat];
  return `${pageHead(title, W.categoryIntro[state.cat])}
<div class="toolbar"><div class="wrap toolbar-inner">
  <div class="chips" role="navigation" aria-label="أنواع التجارب">${Object.entries(W.categories).map(([k, l]) => `<a class="chip" href="#catalog/${k}" ${state.cat === k ? 'aria-current="page"' : ''}>${l}</a>`).join('')}</div>
  <div class="tools">
    <label class="tool-search"><span class="sr-only">ابحثي في هذه المجموعة</span>${icon('search')}<input id="catalog-q" type="search" placeholder="ابحثي بالاسم…" autocomplete="off"></label>
    <label class="sort"><span>الترتيب</span><select id="catalog-sort"><option value="default">المقترح</option><option value="low">السعر: الأقل أولًا</option><option value="high">السعر: الأعلى أولًا</option><option value="name">الاسم</option></select></label>
  </div>
</div></div>
<section class="sec catalog"><div class="wrap"><p class="count" id="catalog-count" aria-live="polite"></p><div id="catalog-results"></div></div></section>`;
}
function drawCatalog() {
  let list = state.cat === 'all' ? products.slice() : inCat(state.cat);
  const base = list.length;
  if (state.q) { const n = norm(state.q); list = list.filter(p => norm(`${p.name} ${p.desc}`).includes(n)); }
  if (state.sort === 'low') list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
  if (state.sort === 'high') list.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
  if (state.sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
  const box = $('#catalog-results'), count = $('#catalog-count');
  if (!base) {
    const pend = W.pendingCategories[state.cat] || { title: 'قريبًا', text: 'سيُضاف المحتوى هنا بعد اعتماده.' };
    count.textContent = '';
    box.innerHTML = `<div class="empty"><h2>${pend.title}</h2><p>${pend.text}</p><a class="btn btn-ghost" href="#catalog/recorded">اكتشفي الجلسات المسجلة</a></div>`;
    return;
  }
  count.textContent = state.q ? `${list.length} نتيجة لـ «${state.q}»` : `${list.length} تجربة`;
  if (!list.length) {
    box.innerHTML = `<div class="empty"><h2>لم نجد نتيجة مطابقة</h2><p>جرّبي اسمًا أقصر، أو تصفّحي كل التجارب.</p><div class="empty-actions"><button class="btn btn-ghost" type="button" data-clear-q>مسح البحث</button><a class="btn btn-solid" href="#catalog/all">كل التجارب</a></div></div>`;
    return;
  }
  box.innerHTML = state.cat === 'group' ? `<div class="events-list wide">${list.map(eventRow).join('')}</div>` : `<div class="products">${list.map(card).join('')}</div>`;
}

/* ---------- product ---------- */
function detail(p) {
  const d = W.details[p.id] || {};
  const format = p.cat === 'recorded' ? 'مسجلة، تستمعين في وقتك' : p.cat === 'group' ? 'حضوري جماعي' : (p.desc.includes('أونلاين') ? 'فردية · أونلاين' : 'جلسة فردية');
  const when = p.cat === 'recorded' ? (d.duration || 'مذكورة في صفحة المنتج الأصلي') : p.cat === 'group' ? `${p.date} (موعد مرجعي)` : 'يُنسَّق عند الحجز';
  const how = d.delivery || (p.cat === 'group' ? 'المكان والتفاصيل عند الحجز في المتجر الأصلي' : p.cat === 'private' ? 'تنسيق الموعد عبر المتجر الأصلي' : 'موضّحة في صفحة المنتج الأصلي');
  const facts = [['نوع التجربة', typeLabel(p)], ['الصيغة', format], [p.cat === 'recorded' ? 'المدة' : 'الموعد', when], [p.cat === 'recorded' ? 'طريقة الوصول' : 'طريقة التقديم', how]];
  const buy = p.price === null
    ? `<a class="btn btn-solid btn-block" href="${p.url}" target="_blank" rel="noopener">السعر والتفاصيل في المتجر ↗</a>`
    : `<button class="btn btn-solid btn-block" type="button" data-add="${p.id}">${icon('bag')} ${p.cat === 'group' ? 'أضيفي للحجز التجريبي' : 'أضيفي إلى السلة'}</button>`;
  const related = inCat(p.cat).filter(x => x.id !== p.id).slice(0, 4);
  return `<div class="wrap crumbs"><nav class="breadcrumb" aria-label="مسار التنقل"><a href="#">الرئيسية</a><span aria-hidden="true">/</span><a href="#catalog/${p.cat}">${W.categories[p.cat]}</a><span aria-hidden="true">/</span><span>${p.name}</span></nav></div>
<section class="wrap detail">
  <div class="detail-media"><img src="${img(p.cover)}" alt="" width="600" height="600"><span class="card-mark">Walaa Fadel</span></div>
  <div class="detail-info">
    <p class="kicker">${typeLabel(p)}</p>
    <h1>${p.name}</h1>
    <p class="lead">${p.desc}. خذي وقتك في قراءة تفاصيل التجربة، واختاري ما يناسبك.</p>
    <div class="detail-price price">${money(p.price)}</div>
    <dl class="facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    <div class="buy-row">${buy}<a class="btn btn-ghost btn-block" href="${p.url}" target="_blank" rel="noopener">صفحة المنتج في متجر ولاء ↗</a></div>
    <ul class="reassure"><li>${icon('shield')} إتمام الطلب عبر متجر سلة</li><li>${icon('check')} تفاصيل الوصول بعد إتمام الطلب</li></ul>
    <div class="faq-list">
      <details open><summary>ماذا تتضمن؟</summary><p>${d.includes || `هذه ${typeLabel(p)} بعنوان «${p.name}». المحتوى الكامل والمدة وطريقة التقديم في صفحة الخدمة الأصلية.`}</p></details>
      <details><summary>لمن تناسب؟</summary><p>الوصف المتاح: ${p.desc}. تفاصيل الفئة المناسبة وتعليمات الاستعداد مذكورة في صفحة المنتج الأصلية، فاقرئيها قبل الشراء.</p></details>
      <details><summary>طريقة الوصول أو تنسيق الموعد</summary><p>${d.access || (p.cat === 'recorded' ? 'طريقة الاستلام ومدة الوصول تختلف حسب المنتج؛ راجعي صفحة المنتج الأصلية.' : 'راجعي التاريخ والمكان وآلية تحديد الموعد في المتجر الأصلي قبل الدفع. المواعيد المعروضة هنا ليست تأكيدًا للتوافر.')}</p></details>
      <details><summary>التنبيهات والسياسات</summary><p>هذه الجلسات ليست بديلًا للعلاج الطبي أو النفسي. راجعي التنبيهات وسياسة الإلغاء والاسترجاع الخاصة بالخدمة قبل الشراء.</p></details>
    </div>
    <p class="fine">السعر مرجعي من بيانات التصميم؛ السعر النهائي والتوافر في متجر سلة.</p>
  </div>
</section>
<div class="buybar"><div><small>${p.name}</small><span class="price">${money(p.price)}</span></div>${p.price === null ? `<a class="btn btn-solid" href="${p.url}" target="_blank" rel="noopener">التفاصيل ↗</a>` : `<button class="btn btn-solid" type="button" data-add="${p.id}">${icon('bag')} للسلة</button>`}</div>
${related.length ? `<section class="sec sec-white"><div class="wrap">${sectionHead('', 'مساحات قد تهمك', '', [`#catalog/${p.cat}`, 'عرض الكل'])}<div class="products">${related.map(card).join('')}</div></div></section>` : ''}`;
}

/* ---------- other pages ---------- */
function aboutPage() {
  return `${pageHead('عن ولاء', 'تعرّفي على ولاء، وعلى المساحة التي تجمع تجاربها وأدواتها.')}
<section class="sec sec-ivory"><div class="wrap about-grid">
  ${aboutMedia()}
  <div class="about-copy"><p class="kicker">أهلًا، أنا ولاء فاضل</p><h2>وهنا مساحة تتقرّبين فيها من نفسك أكثر.</h2>
  <p class="about-lead">بدأت رحلتي في المختبرات الطبية، ثم قادني فضولي إلى الصحة الشمولية والصوت والكوتشينغ واكتشاف الذات.</p>
  <p>من الصوت والتأمل الذاتي إلى الكتابة والكوتشينغ، تجمع هذه المساحة تجارب وأدوات تساعدك على تخصيص وقت لنفسك بالطريقة التي تناسبك.</p>
  <blockquote class="about-quote">«أساعدك بما يخدم مرحلتك الحالية… بكل حب.»</blockquote></div>
</div></section>
<section class="sec"><div class="wrap narrow"><h2>كيف تقدّم التجارب؟</h2><p>يمكنك الاختيار بين محتوى مسجل، لقاءات حضورية جماعية، أو جلسات خاصة. تعرّفي على محتوى كل تجربة وآلية تقديمها وشروطها قبل الحجز.</p><div class="button-row"><a class="btn btn-solid" href="#choose">اختاري مساحتك</a><a class="btn btn-ghost" href="#catalog/all">كل التجارب</a></div><p class="fine">تُضاف صورة ولاء الشخصية وسيرتها ومؤهلاتها المعتمدة في النسخة النهائية.</p></div></section>`;
}
function researchPage() {
  return `${pageHead('فضولك له مساحة', 'المعرفة والمصادر: مساحة للقراءة والتعرّف على موضوعات الصوت والتأمل.', 'المعرفة والمصادر')}
<section class="sec"><div class="wrap"><div class="narrow"><h2>للفهم أيضًا مكان في الرحلة.</h2><p>سيضم هذا القسم مقالات مبسطة مرتبطة بالمصادر الأصلية، مع توضيح ما تقوله الدراسات وحدود نتائجها.</p></div>
<div class="topics">${W.research.map(([t, d]) => `<div class="topic"><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
<p class="fine center">لا توجد مقالات منشورة بعد. تُنشر المقالات بعد تزويدنا بالمصادر ومراجعة محتواها.</p></div></section>`;
}
function faqPage() {
  return `${pageHead('الأسئلة الشائعة', 'كل ما يساعدك على فهم الخيارات وطريقة الشراء والوصول.')}<section class="sec"><div class="wrap narrow">${faqHTML()}</div></section>`;
}

/* ---------- router ---------- */
function route() {
  const hash = decodeURIComponent(location.hash.slice(1));
  let html, title = 'ولاء فاضل — مساحة أقرب لنفسك', nav = '';
  if (!hash || hash === 'choose') html = home();
  else if (hash.startsWith('catalog/')) { html = catalogPage(hash.split('/')[1]); title = `${W.categories[state.cat]} | ولاء فاضل`; nav = `catalog/${state.cat}`; }
  else if (hash.startsWith('product/')) {
    const p = byId(hash.split('/')[1]);
    if (p) { html = detail(p); title = `${p.name} | ولاء فاضل`; nav = `catalog/${p.cat}`; }
    else html = `${pageHead('لم نجد هذه الجلسة', 'يمكنك العودة لاكتشاف جميع التجارب.')}<section class="sec"><div class="wrap"><a class="btn btn-solid" href="#catalog/all">كل التجارب</a></div></section>`;
  }
  else if (hash === 'about') { html = aboutPage(); title = 'عن ولاء | ولاء فاضل'; nav = 'about'; }
  else if (hash === 'research') { html = researchPage(); title = 'المعرفة والمصادر | ولاء فاضل'; }
  else if (hash === 'faq') { html = faqPage(); title = 'الأسئلة الشائعة | ولاء فاضل'; }
  else html = home();
  document.title = title;
  document.body.classList.toggle('has-buybar', hash.startsWith('product/') && !!byId(hash.split('/')[1]));
  $('#main').innerHTML = html;
  $$('.main-nav a').forEach(a => { const on = a.dataset.nav === nav; on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'); });
  icons(); setMenu(false);
  $$('dialog[open]').forEach(d => d.close());
  if ($('#catalog-results')) drawCatalog();
  if ($('#pick-grid')) drawPicks('all');
  initCountdown();
  if (hash === 'choose') $('#choose').scrollIntoView(); else window.scrollTo({ top: 0, behavior: 'instant' });
  $('#main').focus({ preventScroll: true });
}
function icons() { $$('[data-icon]').forEach(el => { el.outerHTML = icon(el.dataset.icon); }); }
function setMenu(open) { $('#mobile-nav').hidden = !open; $('#menu-toggle').setAttribute('aria-expanded', String(open)); }

/* ---------- demo cart ---------- */
let cart = [];
try { cart = JSON.parse(localStorage.getItem('walaa-cart') || '[]').filter(x => byId(x.id) && byId(x.id).price !== null && Number.isInteger(x.qty) && x.qty > 0).map(x => ({ id: x.id, qty: Math.min(x.qty, 20) })); } catch { cart = []; }
const cartTotal = () => cart.reduce((n, x) => n + byId(x.id).price * x.qty, 0);
function saveCart() {
  try { localStorage.setItem('walaa-cart', JSON.stringify(cart)); } catch {}
  const n = cart.reduce((s, x) => s + x.qty, 0), badge = $('#cart-count');
  badge.textContent = n; badge.hidden = !n;
  $('#cart-open').setAttribute('aria-label', n ? `فتح السلة، ${n} عناصر` : 'فتح السلة');
}
let toastTimer;
function toast(text, withCart) {
  const el = $('#toast');
  el.innerHTML = `${icon('check')}<span>${text}</span>${withCart ? '<button type="button" data-open-cart>عرض السلة</button>' : ''}`;
  el.classList.add('visible'); clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('visible'), 4000);
}
function addCart(id) {
  const p = byId(id); if (!p || p.price === null) return;
  const item = cart.find(x => x.id === id);
  if (item) item.qty = Math.min(20, item.qty + 1); else cart.push({ id, qty: 1 });
  saveCart(); toast(`أُضيفت «${p.name}» إلى السلة التجريبية`, true);
}
function openCart() { drawCart(); $('#toast').classList.remove('visible'); $('#cart-dialog').showModal(); }
function drawCart() {
  const items = $('#cart-items'), summary = $('#cart-summary');
  if (!cart.length) {
    items.innerHTML = `<div class="empty"><h2>سلّتك فارغة</h2><p>اكتشفي الجلسات وأضيفي ما يناسبك.</p><a class="btn btn-solid" href="#catalog/all">اكتشفي التجارب</a></div>`;
    summary.innerHTML = ''; return;
  }
  items.innerHTML = cart.map(x => {
    const p = byId(x.id);
    return `<div class="cart-item"><a class="cart-thumb" href="#product/${p.id}" tabindex="-1" aria-hidden="true"><img src="${img(p.cover)}" alt="" width="600" height="600"></a><div><h3><a href="#product/${p.id}">${p.name}</a></h3><small>${typeLabel(p)}</small><div class="quantity"><button type="button" data-qty="${p.id}" data-delta="-1" aria-label="تقليل كمية ${esc(p.name)}">−</button><span>${x.qty}</span><button type="button" data-qty="${p.id}" data-delta="1" aria-label="زيادة كمية ${esc(p.name)}">+</button><button class="remove" type="button" data-remove="${p.id}">إزالة</button></div></div><span class="price">${money(p.price * x.qty)}</span></div>`;
  }).join('');
  summary.innerHTML = `<div class="total-row"><span>الإجمالي</span><strong class="price">${money(cartTotal())}</strong></div><a class="btn btn-solid btn-block" href="${W.storeUrl}" target="_blank" rel="noopener">إتمام الطلب في متجر ولاء ↗</a><button class="btn btn-ghost btn-block" type="button" data-close="cart-dialog">متابعة التصفح</button><p class="fine">هذه سلة تجريبية للتصميم ولا تُرسل إلى سلة. الشراء الفعلي يتم بالسعر والتوافر الحاليين في المتجر الأصلي.</p>`;
}

/* ---------- search dialog ---------- */
function searchResults() {
  const q = $('#search-input').value.trim();
  const found = q ? products.filter(p => norm(`${p.name} ${p.desc} ${W.categories[p.cat]}`).includes(norm(q))) : products.slice(0, 4);
  $('#search-results').innerHTML = found.length
    ? `<p class="count">${q ? `${found.length} نتيجة` : 'جلسات للاستكشاف'}</p>${found.slice(0, 12).map(p => `<a href="#product/${p.id}" class="search-result"><span class="cart-thumb"><img src="${img(p.cover)}" alt="" width="600" height="600"></span><span><strong>${p.name}</strong><small>${typeLabel(p)}</small></span><span class="price">${money(p.price)}</span></a>`).join('')}${found.length > 12 ? '<a class="text-link" href="#catalog/all">عرض كل النتائج في المتجر</a>' : ''}`
    : `<div class="empty"><h2>لم نجد نتيجة مطابقة</h2><p>جرّبي اسمًا أقصر، أو تصفّحي كل الجلسات.</p><a class="text-link" href="#catalog/all">كل التجارب ${icon('arrow-left')}</a></div>`;
}
function openSearch() { $('#search-dialog').showModal(); searchResults(); $('#search-input').focus(); }

/* ---------- events ---------- */
document.addEventListener('click', e => {
  const t = e.target;
  const add = t.closest('[data-add]'); if (add) addCart(add.dataset.add);
  const tab = t.closest('[data-tab]'); if (tab) drawPicks(tab.dataset.tab);
  if (t.closest('[data-open-cart]')) openCart();
  const hint = t.closest('[data-hint]'); if (hint) { $('#search-input').value = hint.dataset.hint; searchResults(); }
  const close = t.closest('[data-close]'); if (close) $('#' + close.dataset.close).close();
  const rem = t.closest('[data-remove]'); if (rem) { cart = cart.filter(x => x.id !== rem.dataset.remove); saveCart(); drawCart(); }
  const qty = t.closest('[data-qty]'); if (qty) { const it = cart.find(x => x.id === qty.dataset.qty); if (it) { it.qty = Math.max(1, Math.min(20, it.qty + Number(qty.dataset.delta))); saveCart(); drawCart(); } }
  if (t.closest('[data-clear-q]')) { state.q = ''; const i = $('#catalog-q'); if (i) i.value = ''; drawCatalog(); }
  const link = t.closest('a[href^="#"]');
  if (link && link.hash === location.hash) {
    $$('dialog[open]').forEach(d => d.close()); setMenu(false);
    if (link.hash === '#choose') $('#choose')?.scrollIntoView({ behavior: 'smooth' }); else window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
document.addEventListener('input', e => { if (e.target.id === 'catalog-q') { state.q = e.target.value.trim(); drawCatalog(); } });
document.addEventListener('change', e => { if (e.target.id === 'catalog-sort') { state.sort = e.target.value; drawCatalog(); } });
$('#cart-open').addEventListener('click', openCart);
$('#search-open').addEventListener('click', openSearch);
$('#search-form').addEventListener('submit', e => { e.preventDefault(); searchResults(); });
$('#search-input').addEventListener('input', searchResults);
$('#menu-toggle').addEventListener('click', () => setMenu($('#mobile-nav').hidden));
$$('dialog').forEach(d => d.addEventListener('click', e => {
  if (e.target === d) { const r = d.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close(); }
}));
$('.skip').addEventListener('click', e => { e.preventDefault(); $('#main').focus(); $('#main').scrollIntoView(); });
window.addEventListener('scroll', () => $('#header').classList.toggle('scrolled', window.scrollY > 8), { passive: true });
window.addEventListener('hashchange', route);

$('#year').textContent = new Date().getFullYear();
saveCart(); icons(); route();
})();
