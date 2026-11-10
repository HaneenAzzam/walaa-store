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
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14.2c2.9.3 5 2.6 5 5.8"/>',
  calendar: '<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16"/><path d="m9 15 2 2 4-4"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  headphones: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.8"/><rect x="17" y="14" width="4" height="6" rx="1.8"/>',
  lotus: '<path d="M12 19c-3.6-1.7-4.7-5.9-2.6-9.9.9-1.7 1.9-2.9 2.6-3.6.7.7 1.7 1.9 2.6 3.6 2.1 4 1 8.2-2.6 9.9Z"/><path d="M12 19c-4.4.4-7.7-2.2-8.4-6.6 3.5-.3 6.3.9 7.8 3.3"/><path d="M12 19c4.4.4 7.7-2.2 8.4-6.6-3.5-.3-6.3.9-7.8 3.3"/><path d="M8 21.2h8"/>',
  pen: '<path d="M4.5 20.5 5.6 16 16.8 4.8a2 2 0 0 1 2.8 0l.6.6a2 2 0 0 1 0 2.8L9 19.4l-4.5 1.1Z"/><path d="m14.5 7.1 2.4 2.4"/>',
  heart: '<path d="M12 20.5s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.8a4.2 4.2 0 0 1 7.5 2.5c0 5.6-7.5 10.2-7.5 10.2Z"/>'
};
const icon = n => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ''}</svg>`;
const img = name => /^https?:/.test(name) ? name : (window.ASSET_MAP && window.ASSET_MAP[name]) || `assets/${name}.${name === 'hero-hand' ? 'webp' : 'jpg'}`;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = v => new Intl.NumberFormat('ar-SA', { maximumFractionDigits: 2, numberingSystem: 'latn' }).format(v);
const money = v => v === null ? '<span class="price-note">السعر في المتجر</span>' : `${fmt(v)}<span class="currency">ر.س</span>`;

/* ---------- data ---------- */
/* product covers per category, cropped from Walaa's photos (Drive folder «صور للموقع») */
const COVERS = {
  recorded: ['cover-1', 'cover-2', 'cover-3', 'cover-4', 'cover-5'],
  group: ['cover-group'],
  private: ['cover-private-1', 'cover-private-2'],
  journal: ['cover-journal']
};
const products = W.products.map((p, i) => ({
  id: p[0], name: p[1], price: p[2], cat: p[3], desc: p[4], date: p[5],
  cover: p[7] || (COVERS[p[3]] || COVERS.recorded)[i % (COVERS[p[3]] || COVERS.recorded).length],
  url: p[6] || `https://walaafadel.com/-/p${p[0]}`
}));
const byId = id => products.find(p => p.id === id);
const inCat = c => products.filter(p => p.cat === c);
const typeLabel = p => p.cat === 'recorded' ? 'جلسة مسجلة' : p.cat === 'private' ? 'جلسة خاصة' : p.cat === 'journal' ? 'مفكرة وتدوين' : 'لقاء حضوري';
const tagLabel = p => p.cat === 'recorded' ? 'مسجلة' : p.cat === 'private' ? 'خاصة' : p.cat === 'journal' ? 'مفكرة' : 'حضوري';
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
  const label = p.cat === 'group' ? 'التفاصيل والحجز' : p.cat === 'journal' ? 'التفاصيل' : 'تفاصيل الجلسة';
  return `<article class="card"><a class="card-media" href="#product/${p.id}" tabindex="-1" aria-hidden="true"><img src="${img(p.cover)}" alt="" loading="lazy" width="600" height="600"><span class="card-tag">${tagLabel(p)}</span></a><div class="card-body"><h3><a href="#product/${p.id}">${p.name}</a></h3><p>${p.desc}</p>${p.date ? `<p class="card-date">${p.date}</p>` : ''}<div class="card-price price">${money(p.price)}</div><div class="card-actions"><a class="btn btn-ghost btn-sm" href="#product/${p.id}">${label}</a>${addBtn(p)}</div></div></article>`;
}

function eventRow(p) {
  const d = dateParts(p.date);
  return `<article class="event"><div class="event-date" role="text" aria-label="${p.date}"><strong>${d.day}</strong><span>${d.month}</span></div><div class="event-info"><h3><a href="#product/${p.id}">${p.name}</a></h3><p>${p.desc}</p></div><div class="event-cta"><span class="price">${money(p.price)}</span><a class="btn btn-solid btn-sm" href="#product/${p.id}">التفاصيل والحجز</a></div></article>`;
}

function privateRow(p) {
  return `<article class="prow"><div class="prow-info"><h3><a href="#product/${p.id}">${p.name}</a></h3><p>${p.desc}</p></div><div class="prow-end"><span class="price">${money(p.price)}</span><a class="text-link" href="#product/${p.id}">تفاصيل الجلسة ${icon('arrow-left')}</a></div></article>`;
}

const faqHTML = (list = W.faqs) => `<div class="faq-list">${list.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>`;

function pageHead(title, text, crumb) {
  return `<section class="page-head"><div class="wrap"><nav class="breadcrumb" aria-label="مسار التنقل"><a href="#">الرئيسية</a><span aria-hidden="true">/</span><span>${crumb || title}</span></nav><h1>${title}</h1>${text ? `<p>${text}</p>` : ''}</div></section>`;
}

const aboutMedia = () => `<div class="about-media"><div class="about-frame"><img src="${img('about-main')}" alt="ولاء تعزف على وعاء صوتي كريستالي بنفسجي" loading="lazy" width="800" height="1000"></div></div>`;

/* ---------- home ---------- */
/* Home order follows the visitor's questions: what is this (hero) → which one is for me (4 ways in, with prices)
   → show me something to buy (recorded picks) → how do I get it (3 steps) → what's coming up (next gathering)
   → one-to-one (private) → can I trust it (numbers + reviews) → who is Walaa → questions → start now. */
function home() {
  const rec = inCat('recorded'), prv = inCat('private'), grp = upcoming();
  const trial = Object.assign({ button: 'ابدئي بتجربة مجانية', url: W.storeUrl }, W.freeTrial || {});
  const counts = { recorded: rec.length, group: events().length, private: prv.length, journal: inCat('journal').length, affirmation: 0 };
  const from = c => { const ps = inCat(c).map(p => p.price).filter(v => v !== null); return ps.length ? Math.min(...ps) : null; };
  /* four boxes: the four ways in from data.js (entries), each with its count and starting price */
  const boxes = W.entries.map(e => {
    const n = counts[e.to], p = from(e.to);
    return `<a class="need-card" href="#catalog/${e.to}"><span class="need-ico">${icon(e.icon)}</span><strong>${e.title}</strong><span class="need-text">${e.text}</span><small>${n ? `${n} تجربة${p !== null ? ` · تبدأ من ${fmt(p)} ر.س` : ''}` : 'قريبًا'}</small><span class="need-btn">اكتشفي</span></a>`;
  }).join('');
  const picks = W.homePicks.recorded.map(byId).filter(Boolean);
  return `
<section class="hero">
  <img class="hero-img" src="${img('hero-hand')}" alt="يد تمسك مطرقة خشبية فوق وعاء صوتي نحاسي في ضوء دافئ" width="1536" height="1024" fetchpriority="high">
  <div class="wrap hero-inner"><div class="hero-copy">
    <p class="hero-kicker">أهلًا أنا ولاء فاضل</p>
    <h1 class="hero-title">وهنا مساحة تقتربي فيها من نفسك أكثر</h1>
    <p class="hero-lead">من الصوت والتأمل الذاتي إلى الكتابة والكوتشينغ، أقدم لك تجارب وأدوات مختلفة تساعدك تفهمي نفسك وتخصصي وقتًا لك بالطريقة اللي تناسبك.</p>
    <div class="hero-actions"><a class="btn btn-trial" href="${trial.url}" target="_blank" rel="noopener">${trial.button} ${icon('arrow-left')}</a></div>
  </div></div>
</section>

<section class="sec need-sec" id="choose">
  <img class="need-bg" src="${img('need-bg')}" alt="" aria-hidden="true" loading="lazy" width="1600" height="900">
  <div class="wrap">
    <div class="need-head"><p class="need-kicker">مساحات ولاء</p><h2>إيش تحتاجي <span class="hl">اليوم؟</span></h2><span class="need-rule" aria-hidden="true"></span><p>اختاري المساحة الأقرب لك</p></div>
    <div class="need-grid">${boxes}</div>
  </div>
</section>

${picks.length ? `<section class="sec sec-lilac" id="start-here"><div class="wrap">
  ${sectionHead('', 'ابدئي من <span class="hl">هنا</span>', 'جلسات مسجلة تسمعينها في وقتك، تضيفينها للسلة بضغطة.', ['#catalog/recorded', `كل الجلسات المسجلة (${rec.length})`])}
  <div class="products">${picks.map(card).join('')}</div>
</div></section>` : ''}

${grp.length ? `<section class="sec" id="countdown-sec"><div class="wrap">
  ${sectionHead('', 'عيشي تجربة معنا', 'لقاءات حضورية بمواعيد محددة. المواعيد مرجعية، ويُؤكَّد التوافر عند الحجز.', ['#catalog/group', 'كل اللقاءات'])}
  <div class="count-banner">
    <img class="count-side count-l" src="${img('event-left')}" alt="" loading="lazy" width="600" height="750">
    <div class="count-main">
      <p class="next-kicker">اللقاء القادم</p>
      <h2><span class="hl">${grp[0].name}</span></h2>
      <ul class="next-facts"><li>${icon('calendar')} ${grp[0].date}</li><li>${grp[0].desc}</li><li class="price">${money(grp[0].price)}</li></ul>
      <p>الموعد مرجعي، ويُؤكَّد التوافر عند الحجز.</p>
      <a class="btn btn-solid" href="#product/${grp[0].id}">التفاصيل والحجز</a>
    </div>
    <img class="count-side count-r" src="${img('event-right')}" alt="" loading="lazy" width="600" height="750">
  </div>
  ${grp.length > 1 ? `<div class="events-list">${grp.slice(1).map(p => eventRow(p)).join('')}</div>` : ''}
</div></section>` : ''}

${prv.length ? `<section class="sec" id="private-home"><div class="wrap private-layout">
  <figure class="private-media"><img src="${img('need-private')}" alt="يدان على آلة شروتي بوكس خشبية" loading="lazy" width="640" height="800"></figure>
  <div>
    ${sectionHead('', 'مساحة <span class="hl">خاصة لكِ</span>', 'جلسات فردية، وقتها لكِ وحدك. يُنسَّق الموعد عند الحجز.', ['#catalog/private', 'كل الجلسات الخاصة'])}
    <div class="prows">${prv.map(privateRow).join('')}</div>
  </div>
</div></section>` : ''}

<section class="sec sec-lilac" id="reviews"><div class="wrap">
  <div class="sec-head center"><div><h2>إيش قالوا عن <span class="hl">التجربة؟</span></h2></div></div>
  <div class="quotes">${W.testimonials.map(t => `<figure class="quote"><svg class="q-mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.4 6.2C6.2 7.3 4 10 4 13.6V18h5.8v-5.6H6.9c.1-2 1.2-3.5 3.1-4.2L9.4 6.2Zm9.6 0c-3.2 1.1-5.4 3.8-5.4 7.4V18h5.8v-5.6h-2.9c.1-2 1.2-3.5 3.1-4.2L19 6.2Z"/></svg><blockquote>${t.quote}</blockquote><figcaption>${t.source}</figcaption></figure>`).join('')}</div>
  <p class="trust-line"><span><b dir="ltr">5000+</b> عميل</span><i aria-hidden="true"></i><span><b dir="ltr">100+</b> جلسة حضورية</span></p>
</div></section>

<section class="sec"><div class="wrap about-grid">
  <div class="collage">
    <img class="c1" src="${img('about-main')}" alt="ولاء تعزف على وعاء صوتي كريستالي بنفسجي" loading="lazy" width="800" height="1000">
    <img class="c2" src="${img('about-2')}" alt="وعاءان صوتيان كريستاليان وردي وأزرق" loading="lazy" width="600" height="600">
    <img class="c3" src="${img('about-3')}" alt="وعاء صوتي بنفسجي أمام طبل كبير" loading="lazy" width="600" height="600">
    <span class="seal" aria-hidden="true"><svg viewBox="0 0 64 58"><path d="M32 45C16 38 19 19 32 6c13 13 16 32 0 39ZM32 45C15 46 5 33 6 18c17 2 27 12 26 27Zm0 0c17 1 27-12 26-27-17 2-27 12-26 27ZM15 48c10 8 24 8 34 0"/></svg></span>
  </div>
  <div class="about-copy">
    <h2>تعرفي على ولاء</h2>
    <p class="about-lead">أهلًا، أنا ولاء. بدأت رحلتي في المختبرات الطبية، ثم قادني فضولي إلى الصحة الشمولية والصوت والكوتشينغ واكتشاف الذات.</p>
    <p>هنا أشاركك تجارب وأدوات تختارين منها ما يناسب مرحلتك.</p>
    <dl class="stats"><div><dd>${products.length}</dd><dt>تجربة</dt></div><div><dd>${rec.length}</dd><dt>جلسة مسجلة</dt></div><div><dd>${grp.length}</dd><dt>لقاءات قادمة</dt></div></dl>
    <a class="btn btn-ghost" href="#about">تعرّفي على ولاء</a>
  </div>
</div></section>

<section class="sec" id="home-faq"><div class="wrap faq-layout">
  <div class="faq-col"><h2>أسئلة ممكن <span class="hl">تدور في بالك</span></h2>${faqHTML(W.faqs.slice(0, 4))}</div>
  <aside class="faq-box"><h3>عندك سؤال ثاني؟</h3><p>اقرئي الأسئلة الشائعة كاملة، أو تواصلي معنا عبر المتجر الأصلي.</p><a class="btn btn-light" href="#faq">كل الأسئلة</a></aside>
</div></section>

<section class="home-close"><div class="wrap"><div class="closing"><h2>خذي وقتك لنفسك… وابدئي اليوم.</h2><a class="btn btn-light" href="#catalog/recorded">تصفّحي الجلسات</a></div></div></section>`;
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
function faqPage() {
  return `${pageHead('الأسئلة الشائعة', 'كل ما يساعدك على فهم الخيارات وطريقة الشراء والوصول.')}<section class="sec"><div class="wrap narrow">${faqHTML()}</div></section>`;
}

/* ---------- router ---------- */
function route() {
  const hash = decodeURIComponent(location.hash.slice(1));
  let html, title = 'ولاء فاضل — مساحة أقرب لنفسك', nav = '';
  if (!hash || hash === 'choose' || hash === 'journal') html = home();
  else if (hash.startsWith('catalog/')) { html = catalogPage(hash.split('/')[1]); title = `${W.categories[state.cat]} | ولاء فاضل`; nav = `catalog/${state.cat}`; }
  else if (hash.startsWith('product/')) {
    const p = byId(hash.split('/')[1]);
    if (p) { html = detail(p); title = `${p.name} | ولاء فاضل`; nav = `catalog/${p.cat}`; }
    else html = `${pageHead('لم نجد هذه الجلسة', 'يمكنك العودة لاكتشاف جميع التجارب.')}<section class="sec"><div class="wrap"><a class="btn btn-solid" href="#catalog/all">كل التجارب</a></div></section>`;
  }
  else if (hash === 'about') { html = aboutPage(); title = 'عن ولاء | ولاء فاضل'; nav = 'about'; }
  else if (hash === 'faq') { html = faqPage(); title = 'الأسئلة الشائعة | ولاء فاضل'; }
  else html = home();
  document.title = title;
  document.body.classList.toggle('has-buybar', hash.startsWith('product/') && !!byId(hash.split('/')[1]));
  $('#main').innerHTML = html;
  document.body.classList.toggle('is-home', !!$('.hero'));
  announce();
  $$('.main-nav a').forEach(a => { const on = a.dataset.nav === nav; on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'); });
  icons(); setMenu(false);
  $$('dialog[open]').forEach(d => d.close());
  if ($('#catalog-results')) drawCatalog();
  if (hash === 'choose') $('#choose').scrollIntoView(); else if (hash === 'journal') $('#choose').scrollIntoView(); else window.scrollTo({ top: 0, behavior: 'instant' });
  $('#main').focus({ preventScroll: true });
}
function announce() {
  const bar = $('#announce'), n = upcoming()[0];
  if (!bar || !n) { if (bar) bar.hidden = true; return; }
  $('#announce-text').textContent = `لقاء «${n.name}» · ${n.date} · احجزي مكانك`;
  $('#announce-link').href = `#product/${n.id}`;
  bar.hidden = false;
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
  if (t.closest('[data-open-cart]')) openCart();
  if (t.closest('[data-search]')) openSearch();
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

$('#header').classList.toggle('scrolled', window.scrollY > 8);
$('#year').textContent = new Date().getFullYear();
saveCart(); icons(); route();
})();
