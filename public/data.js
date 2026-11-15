/* Store content. Everything here comes from the supplied store files; nothing is invented.
   Prices and dates are reference values from the October 2026 materials, not live data. */
window.WALAA = {
  storeUrl: 'https://walaafadel.com/',

  /* "ابدئي بتجربة مجانية" on the home page. Fill in the real text, button label and link of the free experience.
     Until then the section shows a neutral sentence and points to the store. */
  freeTrial: {},

  categories: {
    all: 'كل التجارب',
    recorded: 'الجلسات المسجلة',
    group: 'اللقاءات الحضورية',
    private: 'الجلسات الخاصة',
    journal: 'المفكرات والتدوين',
    affirmation: 'التوكيدات'
  },

  categoryIntro: {
    all: 'كل مساحات ولاء، من الصوت والتأمل إلى التجارب الفردية والجماعية.',
    recorded: 'وقت لنفسك، في وقتك. اختاري من مكتبة الجلسات المسجلة.',
    group: 'لقاءات جماعية للصوت والتأمل والتجارب الفنية.',
    private: 'تجارب فردية. تعرّفي على كل جلسة واختاري ما يناسبك.',
    journal: 'مساحة المفكرات وتمارين التدوين.',
    affirmation: 'مساحة التوكيدات ضمن «وقت لنفسي».'
  },

  /* Sections that exist in the store plan but have no products yet */
  pendingCategories: {
    journal: { title: 'مساحة للكتابة والاكتشاف', text: 'سيُضاف هنا محتوى المفكرات وتمارين التدوين بعد اعتماده من ولاء.' },
    affirmation: { title: 'مساحة التوكيدات', text: 'سيُضاف هنا محتوى التوكيدات بعد اعتماده من ولاء.' }
  },

  /* id, name, price (null = not given), category, short description, [date], [store link], [image link].
     The last two are only needed when the link is not the default one built from the id, or the product has its own cover. 
     Add journals as rows with category 'journal' (e.g. ['123', 'اسم المفكرة', 90, 'journal', 'وصف قصير']):
     the "اكتبي واكتشفي" section on the home page appears by itself once one exists. */
  products: [
    ['632074305', 'النمو المالي', 115, 'recorded', 'تأمل في علاقتك بالمال ومعتقداتك'],
    ['2031889342', 'التشافي العاطفي', 115, 'recorded', 'مساحة للتواصل مع مشاعرك بلطف'],
    ['606438398', 'جلسة التوسع', 115, 'recorded', 'وقت للتأمل واستكشاف آفاقك'],
    ['959558545', 'إطلاق النوايا', 402.5, 'recorded', 'مساحة للتأمل في نواياك وتوجّهك'],
    ['1262112279', 'تحرير الخوف من الزواج والارتباط', 115, 'recorded', 'استكشفي معتقداتك حول الارتباط'],
    ['1611066008', 'التحرر من العار للأنثى', 115, 'recorded', 'تأمل في المشاعر والعلاقة بالذات'],
    ['1821819682', 'قناة الساوند هيلينغ | رحلة للداخل', 575, 'recorded', 'مجموعة من تجارب الصوت والتأمل'],
    ['436476921', 'تجاوز الخوف', 345, 'recorded', 'تأمل وصوت وتمارين لاستكشاف مشاعرك'],
    ['1785085102', 'مساحة حب', 115, 'recorded', 'لحظات اتصال ورفق بالذات'],
    ['668178991', 'الحرية المالية', 115, 'recorded', 'تأمل في معتقداتك وعلاقتك بالمال'],
    ['65663', 'معتقدات الجسد وصحته', 115, 'recorded', 'مساحة لاستكشاف علاقتك بجسدك'],
    ['1448123988', 'ساوند هيلينغ التشافي العميق', 113.85, 'recorded', 'تجربة صوتية مسجلة'],
    ['1852373971', 'ساوند هيلينغ تشافي الرحم', 115, 'recorded', 'تجربة صوتية مسجلة'],
    ['1298236546', 'تشافي العلاقة مع الأب', 115, 'recorded', 'استكشاف مشاعر وتجارب العلاقات'],
    ['500129929', 'معتقدات الحب', 115, 'recorded', 'تأمل في نظرتك للحب والعلاقات'],
    ['306479944', 'تشافي الطفل الداخلي', 115, 'recorded', 'تأمل موجّه للتواصل مع الذات'],
    ['160832650', 'التعاطف مع الذات', 115, 'recorded', 'وقت للرفق بنفسك والإنصات لها'],
    ['1072992408', 'جلسة التحول', 115, 'recorded', 'مساحة للتأمل في التغيير'],
    ['339337065', 'تشافي العلاقة مع الأم', 115, 'recorded', 'استكشاف المشاعر المرتبطة بالعلاقات'],
    ['1064140681', 'جلسة الوفرة', 115, 'recorded', 'تأمل في مفهوم الوفرة لديكِ'],
    ['52862995', 'جلسة الأمان', null, 'recorded', 'مساحة صوت وتأمل للعودة لنفسك'],
    ['1048843623', 'رسالة الغضب', 115, 'recorded', 'مساحة للإنصات لمشاعرك'],
    ['918086355', 'الجاذبية للأنثى', 115, 'recorded', 'وقت للتأمل والاتصال بالذات'],
    ['1428844154', 'احتواء القلق', 115, 'recorded', 'تجربة صوت وتأمل مسجلة'],
    ['1552363724', 'السفر والاستكشاف', 115, 'recorded', 'مساحة للتأمل في تجاربك المقبلة'],
    ['231334788', 'الحضور', 299, 'group', 'رحلة صوتية وفنية', '5 نوفمبر'],
    ['1234109095', 'تحويل الشعور', 299, 'group', 'رحلة صوتية وتأمل', '9 نوفمبر'],
    ['345979219', 'الاستحقاق', 299, 'group', 'رحلة صوتية وتأمل', '29 أكتوبر'],
    ['29178586', 'تحرير العار', 460, 'private', 'جلسة فردية أونلاين'],
    ['1827713436', 'تحرير الحزن', 460, 'private', 'جلسة فردية أونلاين'],
    ['2120694810', 'تحرير الغضب', 460, 'private', 'جلسة فردية أونلاين'],
    ['120871242', 'شمس وقمر', 1150, 'private', 'جلسة ساوند هيلينغ خاصة'],
    /* مقياس بيركمان للطلاب: data and cover image are the store's own (private-sessions category, checked Nov 2026) */
    ['1436715423', 'مقياس بيركمان للطلاب', 517.5, 'private', 'تقرير مهني للطلاب ابتداءً من عمر 14 عامًا', '', '', 'https://cdn.salla.sa/lGvGdD/d4c16dce-77f1-4ed1-a7b9-b9b475654318-400x500-J73BOZluTzrAxsBIGMCaQUqlX3HuxgRiiLglAMcP.png']
  ],

  /* Product-specific facts, only where the supplied materials state them */
  details: {
    '1436715423': {
      includes: 'البوصلة المهنية للطلاب (Birkman Career Compass): تقرير متخصص قائم على منهج بيركمان، يساعد الطلاب على استكشاف اهتماماتهم وميولهم المهنية وفهم خصائصهم الشخصية، تمهيدًا لاتخاذ قرارات دراسية ومهنية أكثر وعيًا. الهدف ليس اختيار تخصص نيابةً عنك، بل مساعدتك على فهم نفسك لتتخذ القرار الأنسب لك.'
    },
    '2031889342': {
      duration: '33 دقيقة تقريبًا',
      delivery: 'قناة خاصة على تيليجرام',
      includes: 'جلسة تأمل وساوند هيلينغ مسجلة مدتها نحو 33 دقيقة. يذكر وصف المنتج الأصلي أن رابط القناة يظهر بعد إتمام الطلب، ولا توجد متابعة خاصة ضمن سعر هذا المنتج.',
      access: 'رابط قناة تيليجرام الخاصة يظهر بعد إتمام الطلب وفق صفحة المنتج. تواصلي مع دعم المتجر الأصلي إذا لم يصلك الرابط.'
    }
  },

  /* Four ways in, shown on the home page. `to` is the route, `art` the image name */
  entries: [
    { title: 'وقت لنفسي', text: 'جلسات مسجلة وتوكيدات', to: 'recorded', icon: 'headphones',
      sub: { label: 'التوكيدات', to: 'affirmation' } },
    { title: 'أعيش تجربة', text: 'لقاءات حضورية جماعية', to: 'group', icon: 'lotus' },
    { title: 'أكتب وأكتشف', text: 'مفكرات وتمارين تدوين', to: 'journal', icon: 'pen' },
    { title: 'مساحة خاصة', text: 'جلسات فردية', to: 'private', icon: 'heart' }
  ],

  homePicks: {
    recorded: ['2031889342', '1785085102', '436476921', '668178991']
  },

  /* "تعرفي على ولاء" on the home page (client's edit, Nov 2026): one title, one text, one button «اقري قصتي»;
     the photos are decorative cards from the Drive folder. images = file names in assets/ (or full image links). */
  about: {
    text: 'بدأت رحلتي في المختبرات الطبية، ثم قادني فضولي إلى الصحة الشمولية والصوت والكوتشينغ واكتشاف الذات. هنا أشاركك تجارب وأدوات تختارين منها ما يناسب مرحلتك.',
    cta: ['اقري قصتي', '#about'],
    images: ['about-main', 'about-3', 'about-2', 'cover-journal']
  },

  /* "فضولك له مساحة" (before the questions): the button opens the internal sources page (#research).
     topics = [icon name from app.js, title, one short line]. The wording is the client's own. */
  curious: {
    link: '#research',
    topics: [
      ['wave', 'الصوت والاسترخاء', 'مدخل للتعرّف على موضوعات الصوت وتجربة الاستماع.'],
      ['lotus', 'التأمل والانتباه', 'موضوعات عن الممارسة وطبيعة التجربة.'],
      ['book', 'قراءة الأبحاث', 'المصدر، نوع الدراسة، وحدود تفسير النتائج.']
    ]
  },

  /* Page «المصادر العلمية» (#research), opened by the button of «فضولك له مساحة» on the home page.
     The content is Walaa's own sources page (https://claude.ai/public/artifacts/21ce04da-c454-4582-b2f7-5f9e6760db4e),
     copied as it is: texts, citations and links (only the tracking part "?utm_source=claude_desktop" was removed from links).
     items = { t: summary, c: citation, l: [link, link label] } */
  research: {
    title: 'المصادر العلمية',
    intro: 'كل ممارسة أقدمها لك مبنية على خبرة وتدريب، ومعها أبحاث علمية منشورة تدعمها. جمعت لك هنا أهم الدراسات عشان تعرفي إيش يقول العلم عن الصوت والتأمل والتوكيدات، بكل شفافية.',
    footnote: 'المصادر مأخوذة من قاعدة PubMed · هذه الممارسات داعمة للعافية ولا تغني عن الاستشارة الطبية أو النفسية',
    sections: [
      { id: 'sound', short: 'الترددات والصوت', icon: 'wave', title: 'الترددات والصوت', groups: [
        { title: 'الأجراس التبتية', items: [
          { t: 'مراجعة منهجية لـ 14 دراسة وجدت أن أغلبها سجّل انخفاض في القلق والاكتئاب، وتحسن في تقلب نبض القلب.', c: 'Lin et al. (2025). Healthcare', l: ['https://doi.org/10.3390/healthcare13162002', 'DOI'] },
          { t: 'دراسة على 62 مشارك: انخفض التوتر والغضب والتعب بعد جلسة واحدة، وكان الأثر أكبر عند اللي يجربون أول مرة.', c: 'Goldsby et al. (2016). J Evid Based Complementary Altern Med', l: ['https://doi.org/10.1177/2156587216668109', 'DOI'] },
          { t: 'مراجعة علمية لأثر الأجراس على المزاج والتوتر والإحساس بالسلام الداخلي.', c: 'Seetharaman et al. (2023). Explore', l: ['https://doi.org/10.1016/j.explore.2023.07.007', 'DOI'] },
          { t: 'تجربة عشوائية محكمة على 100 شخص (2026): 4 أسابيع من تأمل الصوت بالأجراس والجونق خفّضت القلق والاكتئاب وهرمون الكورتيزول وضغط الدم أكثر من مجموعة استمعت لموسيقى عادية. نتائج أولية تحتاج تأكيد بدراسات أكبر.', c: 'Ravikumar et al. (2026). Cureus', l: ['https://consensus.app/papers/details/27b75b6b10095e54bf66a717960d691b/', 'المصدر'] },
          { t: 'جلسة أجراس هيمالايا وحدة مدتها 40 دقيقة حسّنت المزاج، ونزّلت نبض القلب ومؤشر التوتر، ورفعت نشاط الجهاز العصبي المسؤول عن الاسترخاء.', c: 'Panchal et al. (2020)', l: ['https://consensus.app/papers/details/8e4d8e67872c582e891081c580547129/', 'المصدر'] },
          { t: 'كل ما زاد إحساس المشاركين بالسلام الروحي بعد جلسة الصوت، زاد انخفاض التوتر والحزن عندهم.', c: 'Goldsby et al. (2022). Religions', l: ['https://consensus.app/papers/details/e0d0f2f52bb25c1f9401873b4127c09b/', 'المصدر'] },
          { t: 'مراجعة لـ 34 دراسة عن الصوت والتوتر: الأصوات تقدر تخفّض الكورتيزول وضغط الدم، والنتيجة تتأثر كثير بتفضيلات الشخص وطريقة التقديم، عشان كذا التجربة الشخصية مهمة.', c: 'Saskovets et al. (2024). JMIR Mental Health', l: ['https://consensus.app/papers/details/649e19e35f565c3ea4504c5b65455500/', 'المصدر'] }
        ] },
        { title: 'النبضات الثنائية (Binaural Beats)', items: [
          { t: 'تحليل تجميعي لـ 22 دراسة: أثر متوسط في خفض القلق والإحساس بالألم وتحسين الانتباه، والاستماع لمدة أطول أعطى نتائج أفضل.', c: 'Garcia-Argibay et al. (2019). Psychological Research', l: ['https://doi.org/10.1007/s00426-018-1066-8', 'DOI'] },
          { t: 'تحليل لـ 15 دراسة: تحسن في الذاكرة والانتباه.', c: 'Basu &amp; Banerjee (2023). Psychological Research', l: ['https://doi.org/10.1007/s00426-022-01706-7', 'DOI'] }
        ] },
        { title: 'تردد 432 هيرتز · دراسات أولية', items: [
          { t: 'دراسة تجريبية على 33 شخص: انخفض نبض القلب مع موسيقى 432 مقارنة بـ 440، والباحثين يوصون بدراسات أكبر.', c: 'Calamassi &amp; Pomponi (2019). Explore', l: ['https://doi.org/10.1016/j.explore.2019.04.001', 'DOI'] },
          { t: 'دراسة على 90 مريض أسنان: موسيقى 432 والنبضات الثنائية خففت القلق قبل العملية.', c: 'Menziletoglu et al. (2021). Med Oral Patol Oral Cir Bucal', l: ['https://doi.org/10.4317/medoral.24051', 'DOI'] }
        ] }
      ] },
      { id: 'journals', short: 'مجلات طبية', icon: 'book', title: 'أبحاث في مجلات طبية عالمية', items: [
        { t: 'مراجعة Cochrane لـ 26 تجربة و 2051 مريض: الاستماع للموسيقى قبل العمليات خفف القلق، وفي دراسة كبيرة كان أفضل من دواء مهدئ.', c: 'Bradt et al. (2013). Cochrane Database of Systematic Reviews', l: ['https://doi.org/10.1002/14651858.CD006908.pub2', 'DOI'] },
        { t: 'مراجعة Cochrane لـ 81 تجربة على مرضى السرطان: فوائد محتملة على القلق والاكتئاب والألم والتعب.', c: 'Bradt et al. (2021). Cochrane Database of Systematic Reviews', l: ['https://doi.org/10.1002/14651858.CD006911.pub4', 'DOI'] },
        { t: 'مراجعة Cochrane: العلاج بالموسيقى مع العلاج المعتاد حسّن أعراض الاكتئاب والقلق على المدى القصير.', c: 'Aalbers et al. (2017). Cochrane Database of Systematic Reviews', l: ['https://doi.org/10.1002/14651858.CD004517.pub3', 'DOI'] },
        { t: 'مراجعة لـ 19 دراسة سريرية: الأجراس قد تساعد في خفض القلق والاكتئاب وتحسين النوم عند بعض الفئات.', c: 'Integrative Medicine Research (2025)', l: ['https://pmc.ncbi.nlm.nih.gov/articles/PMC12063014/', 'المصدر'] },
        { t: 'صوت الأجراس رفع موجات ثيتا في الدماغ، وهي الموجات المرتبطة بالتأمل والاسترخاء.', c: 'Kim &amp; Choi (2023). IJERPH', l: ['https://doi.org/10.3390/ijerph20126180', 'DOI'] },
        { t: 'مجلة Nature Biotechnology خصصت افتتاحية لموضوع الشفاء بالصوت.', c: 'Sound healing and beyond (2025). Nature Biotechnology', l: ['https://doi.org/10.1038/s41587-025-02566-3', 'DOI'] }
      ] },
      { id: 'hospitals', short: 'مستشفيات عالمية', icon: 'hospital', title: 'مستشفيات عالمية تدمج الصوت والموسيقى في رعاية المرضى', note: 'أمثلة لمراكز طبية عالمية تستخدم الصوت أو الموسيقى ضمن رعايتها. ذكرها هنا للتعريف فقط ولا يعني ارتباطها بخدماتي.', items: [
        { t: 'UCLA Health: طبيب تخدير يستخدم الأجراس قبل التخدير لتهدئة المرضى.', c: 'UCLA Health · Los Angeles', l: ['https://www.uclahealth.org/news/article/sound-bath-operating-room-anesthesia', 'الرابط'] },
        { t: 'Cedars-Sinai: حمامات الصوت جزء من خدمات الرعاية الروحية للمرضى وعائلاتهم.', c: 'Cedars-Sinai · Los Angeles', l: ['https://www.cedars-sinai.org/stories-and-insights/healthy-living/sound-advice-do-sound-therapy-and-binaural-beats-work', 'الرابط'] },
        { t: 'Duke Health: جلسات تأمل بحمام الصوت لتهدئة الجهاز العصبي.', c: 'Duke Health &amp; Well-Being · North Carolina', l: ['https://dhwprograms.dukehealth.org/programs-training/public/sound-bath-meditation/', 'الرابط'] },
        { t: 'Cleveland Clinic: برنامج علاج بالموسيقى بمعالجين معتمدين للمرضى المنوّمين ومرضى الأورام.', c: 'Cleveland Clinic · Ohio', l: ['https://consultqd.clevelandclinic.org/all-the-right-notes-using-music-to-promote-physical-and-psychosocial-healing', 'الرابط'] },
        { t: 'MD Anderson: مبادرة Music-in-Medicine تقيس أثر الموسيقى على الدماغ ومؤشرات التوتر.', c: 'UT MD Anderson Cancer Center · Texas', l: ['https://www.mdanderson.org/patients-family/diagnosis-treatment/patient-support/music-in-medicine-initiative.html', 'الرابط'] }
      ] },
      { id: 'meditation', short: 'التأمل', icon: 'lotus', title: 'التأمل', items: [
        { t: 'تحليل تجميعي من جامعة جونز هوبكنز لـ 47 تجربة و 3515 مشارك: برامج التأمل الواعي حسّنت القلق والاكتئاب والألم بدرجة متوسطة.', c: 'Goyal et al. (2014). JAMA Internal Medicine', l: ['https://doi.org/10.1001/jamainternmed.2013.13018', 'DOI'] },
        { t: 'أكبر مراجعة من نوعها: 136 تجربة عشوائية و 11,605 مشارك من 29 دولة. برامج الحضور الذهني خففت القلق والاكتئاب والضغط النفسي، وحسّنت الرفاه مقارنة بعدم عمل أي شي.', c: 'Galante et al. (2021). PLOS Medicine', l: ['https://consensus.app/papers/details/c141f0c70df85584b7e51269bec311b4/', 'المصدر'] },
        { t: 'تحليل لـ 43 دراسة: برامج الحضور الذهني اللي فيها رحمة بالذات وقيم أخلاقية خففت الاكتئاب والقلق، واستمر أثرها على الاكتئاب في المتابعة.', c: 'Xu et al. (2026). Clinical Psychology Review', l: ['https://consensus.app/papers/details/ab82aad9f7db5589b07e50b945056f4d/', 'المصدر'] },
        { t: 'تحليل لـ 13 دراسة على 1138 امرأة في مرحلة انقطاع الطمث: الحضور الذهني خفّض التوتر بشكل واضح.', c: 'Liu et al. (2023). Frontiers in Public Health', l: ['https://consensus.app/papers/details/950233502cc357f0a895357adbbfb478/', 'المصدر'] },
        { t: 'Harvard Health: مراجعات لمئات الدراسات تشير إلى أن الحضور الذهني يخفف القلق والاكتئاب والتوتر والألم، ويحسّن الصحة النفسية وجودة الحياة.', c: 'Harvard Health Publishing', l: ['https://www.health.harvard.edu/blog/relaxation-benefits-meditation-stronger-relaxation-benefits-taking-vacation-2016102710532', 'المقال'] },
        { t: 'Harvard Health: دراسة 2024 لقت إن 10 دقائق حضور ذهني يومياً قللت أعراض الاكتئاب بحوالي 20%، وزادت الدافع للنوم الأفضل والحركة.', c: 'Harvard Health Publishing (2024)', l: ['https://www.health.harvard.edu/mind-and-mood/10-minutes-of-daily-mindfulness-may-help-change-your-outlook-about-health-improvements', 'المقال'] },
        { t: 'Harvard Gazette: بحث من Harvard و Massachusetts General Hospital وثّق إن التأمل يغيّر المادة الرمادية في مناطق الذاكرة والإحساس بالذات وتنظيم المشاعر.', c: 'Harvard Gazette', l: ['https://news.harvard.edu/gazette/story/2018/04/less-stress-clearer-thoughts-with-mindfulness-meditation', 'المقال'] },
        { t: 'دراسة في JAMA Internal Medicine: برنامج حضور ذهني من 6 جلسات قلّل الأرق والتعب والاكتئاب أكثر من برنامج تثقيف عن النوم.', c: 'عبر Harvard Health Publishing', l: ['https://www.health.harvard.edu/blog/mindfulness-meditation-helps-fight-insomnia-improves-sleep-201502187726', 'المقال'] }
      ] },
      { id: 'affirmations', short: 'التوكيدات', icon: 'heart', title: 'التوكيدات', items: [
        { t: 'تحليل تجميعي لـ 144 تجربة: التأمل في القيم الشخصية زاد تقبّل الناس للتغيير والتزامهم بسلوك صحي.', c: 'Epton et al. (2015). Health Psychology', l: ['https://doi.org/10.1037/hea0000116', 'DOI'] },
        { t: 'تحليل لـ 144 دراسة: التوكيد الذاتي أداة قصيرة وبسيطة تحسّن الرفاه العام.', c: 'Escobar-Soler et al. (2024). Healthcare', l: ['https://doi.org/10.3390/healthcare12010003', 'DOI'] },
        { t: 'مجلة Science: تمرين كتابة 15 دقيقة عن القيم الشخصية رفع درجات الطلاب وقلّص فجوة التحصيل بنسبة 40%.', c: 'Cohen et al. (2006). Science', l: ['https://doi.org/10.1126/science.1128317', 'DOI'] },
        { t: 'Psychological Science: التأمل في القيم المهمة يفعّل مركز المكافأة في الدماغ (Ventral Striatum)، وتكررت النتيجة في دراستين.', c: 'Dutcher et al. (2016). Psychological Science', l: ['https://doi.org/10.1177/0956797615625989', 'DOI'] },
        { t: 'جامعة أكسفورد (SCAN): التوكيد الذاتي فعّل مناطق المكافأة ومعالجة الذات، وكان أقوى لما التوكيد موجّه للمستقبل.', c: 'Cascio et al. (2016). Social Cognitive and Affective Neuroscience', l: ['https://doi.org/10.1093/scan/nsv136', 'DOI'] },
        { t: 'جامعة أكسفورد (SCAN): التوكيد الذاتي خفّض التوتر وحسّن الأداء، وقلّل نشاط مناطق الإحساس بالتهديد في الدماغ.', c: 'Dutcher et al. (2020). Social Cognitive and Affective Neuroscience', l: ['https://academic.oup.com/scan/article/15/10/1086/5815969', 'المصدر'] }
      ] },
      { id: 'experts', short: 'آراء الخبراء', icon: 'users', title: 'إيش يقول الأطباء والخبراء؟', note: 'آراء مترجمة بتصرّف من مختصين في مؤسسات طبية وأكاديمية عالمية.', quotes: [
        { q: 'الشائع إن الناس يحسون بفرق بعد جلسة الصوت: هدوء أكثر، عضلات مرتخية، نوم أفضل، ومزاج أحسن. وهي مكمّلة للعلاج الطبي وما تتعارض معه.', who: 'Karen Bond, PA-C', role: 'Cleveland Clinic', l: ['https://health.clevelandclinic.org/sound-bath', 'المصدر'] },
        { q: 'أصوات الأجراس يبدو إنها توصل لاسترخاء أعمق من الاستماع لموسيقى هادئة، وهي أداة بسيطة وقليلة التكلفة لها إمكانيات كبيرة في المستشفيات والمجتمع.', who: 'Dr. Tamara Goldsby', role: 'باحثة، University of California San Diego · عبر AARP', l: ['https://www.aarp.org/health/healthy-living/sound-bath-benefits/', 'المصدر'] },
        { q: 'بما إن التأمل قليل التكلفة وقليل المخاطر، ممكن اعتباره إضافة مساندة للرعاية الطبية لصحة القلب لمن يرغب فيه.', who: 'American Heart Association', role: 'بيان علمي رسمي (2017)', l: ['https://www.ahajournals.org/doi/10.1161/jaha.117.002218', 'المصدر'] },
        { q: 'التأمل يفعّل "استجابة الاسترخاء"، وهي تحوّل عميق في الجسم عكس استجابة التوتر، وتساعد في تخفيف الاكتئاب والألم وضغط الدم.', who: 'Dr. Herbert Benson', role: 'مؤسس Benson-Henry Institute · Harvard Medical School', l: ['https://www.health.harvard.edu/blog/mindfulness-meditation-helps-fight-insomnia-improves-sleep-201502187726', 'المصدر'] },
        { q: 'التوكيد الذاتي يخلي الشخص يتذكر إنه إنسان طيب وقادر، ولما يفكر في الأشياء المهمة له يخف توتره ويصير الخوف من الفشل أهون.', who: 'Prof. Geoffrey Cohen', role: 'عالم نفس، Stanford University', l: ['https://www.colorado.edu/asmagazine-archive/node/200', 'المصدر'] }
      ] },
      { id: 'holistic', short: 'أطباء شموليون', icon: 'leaf', title: 'أطباء يؤمنون بالصحة الشمولية', note: 'أطباء جمعوا بين الطب الحديث والممارسات الشمولية، ولهم كتب ومقالات وبودكاست تقدرين تتعمقي فيها.', people: [
        { name: 'Dr. Mitchell Gaynor', role: 'طبيب أورام · Weill Cornell Medical College', t: 'من أوائل الأطباء اللي استخدموا الأجراس التبتية والكريستالية مع مرضى السرطان من 1991، كعلاج مكمّل للعلاج الطبي. كان يفرّق بين "العلاج" اللي يصلّح المرض، و"الشفاء" اللي يجمع العقل والجسد والروح.', c: 'كتاب The Healing Power of Sound', l: ['https://www.strang.org/mitchell-l-gaynor-md', 'نبذة عنه'] },
        { name: 'Dr. Andrew Weil', role: 'رائد الطب التكاملي · مؤسس Arizona Center for Integrative Medicine', t: 'يعتبر التنفس الواعي أبسط وأقوى أداة بين العقل والجسد، ونشر تقنية التنفس 4-7-8 اللي يوصفها كمهدئ طبيعي للجهاز العصبي.', c: 'مقالات وفيديوهات', l: ['https://www.drweil.com/health-wellness/body-mind-spirit/stress-anxiety/three-breathing-exercises-and-techniques/', 'الموقع'] },
        { name: 'Dr. Rangan Chatterjee', role: 'طبيب عام بخبرة 20 سنة · بريطانيا', t: 'يجمع بين الطب والنهج الشمولي، وبودكاسته من الأشهر عالمياً ويتكلم عن التأمل والنوم والتوتر والصحة النفسية وعلاقتنا بأنفسنا.', c: 'بودكاست Feel Better, Live More', l: ['https://www.drchatterjee.com/podcast', 'البودكاست'] },
        { name: 'Dr. Andrew Huberman', role: 'عالم أعصاب · Stanford University', t: 'نشر ممارسة "الراحة العميقة بدون نوم" (NSDR) المأخوذة من اليوغا نيدرا، واللي توصل الدماغ والجسد لحالة استرخاء بدون مجهود.', c: 'بودكاست Huberman Lab', l: ['https://ouraring.com/blog/non-sleep-deep-rest/', 'المقال'] }
      ] }
    ],
    advice: { title: 'نصيحة الأطباء قبل الجلسة', t: 'استشيري طبيبك أول إذا عندك حالة نفسية مشخّصة، أو نوبات تتأثر بالأصوات، أو حساسية عالية للصوت، أو مريتي بتجربة صادمة مرتبطة بأصوات قوية. واشربي ماي كفاية وخلي أكلك خفيف قبل الجلسة.', c: 'Cleveland Clinic · WebMD', l: ['https://www.webmd.com/balance/what-are-sound-baths', 'المصدر'] }
  },

  /* The ten questions the client chose (right column first, then the left one). The list is split in two columns:
     the first half on the right, the rest on the left. Answers marked "adapted" were written from the store's own pages
     (product pages, existing texts): please review them with Walaa. */
  faqs: [
    ['كيف أختار التجربة المناسبة لي؟', 'ابدئي من «إيش تحتاجي اليوم؟». اختاري جلسة مسجلة إذا رغبتِ بمحتوى تستخدمينه في وقتك، أو لقاءً حضوريًا للتجربة الجماعية، أو مساحة خاصة لتجربة فردية. اقرئي تفاصيل الخدمة وشروطها قبل الشراء.'],
    ['إيش تشمل الجلسات الفردية 1:1؟', 'الجلسة الفردية تكون بينك وبين ولاء مباشرة، وتختلف تفاصيلها من جلسة لأخرى. مثلًا جلسة «تحرير العار»: مدتها ساعة واحدة، أونلاين عبر تيليجرام، وتتضمن التنفس العميق والترددات الصوتية وتقنيات العلاج بالصوت. تجدين مدة كل جلسة وشروطها في صفحتها.'], // adapted: review with Walaa
    ['هل الجلسات الصوتية علاج طبي؟', 'لا. الجلسات لا تغني عن العلاج الطبي ولا عن زيارة الطبيب. راجعي التنبيهات والملاءمة في صفحة الخدمة قبل الشراء.'], // adapted: review with Walaa
    ['هل الجلسات الصوتية مناسبة للجميع؟', 'الجلسات مصممة لتناسب الجميع، سواء كانت أول مرة أو لديك تجربة سابقة. تجدين التنبيهات والملاءمة الخاصة بكل جلسة في صفحتها، والرجاء إبلاغ ولاء في حال وجود أي عرض صحي.'], // adapted: review with Walaa
    ['هل أقدر أسمع الجلسات المسجلة أكثر من مرة؟', 'تختلف مدة الوصول وإمكانية إعادة الاستماع من منتج لآخر، فتحققي منها في صفحة المنتج قبل الدفع.'], // adapted: review with Walaa

    ['إيش الفرق بين الجلسات الحضورية والجلسات المسجلة؟', 'المسجلة محتوى جاهز للاستماع في وقتك؛ والحضورية تجربة جماعية بموعد ومكان محددين. طريقة التقديم وما تتضمنه الخدمة موضحان في صفحة كل منتج.'], // adapted: review with Walaa
    ['هل أحتاج خبرة سابقة عشان أشارك؟', 'أبدًا، الجلسات مصممة لتناسب الجميع، سواء كانت أول مرة أو لديك تجربة سابقة.'],
    ['هل اللي أقدمه بديل عن العلاج النفسي؟', 'لا. الجلسات لا تغني عن العلاج الطبي أو النفسي. راجعي التنبيهات والملاءمة في صفحة الخدمة قبل الشراء.'], // adapted: review with Walaa
    ['كيف أستلم المنتجات الرقمية؟', 'تختلف طريقة الاستلام حسب المنتج. مثلًا جلسة «التشافي العاطفي» محتواها في قناة خاصة على تيليجرام، ويظهر رابط الدخول بعد إتمام الطلب. تجدين طريقة الوصول في صفحة كل منتج، وإن لم يصلك الرابط تواصلي مع دعم المتجر.'], // adapted: review with Walaa
    ['هل أقدر أسترجع قيمة المنتجات الرقمية؟', 'تختلف الشروط حسب المنتج، فراجعي سياسة الاسترجاع وصفحة المنتج قبل الدفع؛ فبعض المنتجات الرقمية مذكور فيها أن المبلغ غير مسترد.']
  ],

  /* Real 5-star reviews from verified buyers on the store's own reviews page (walaafadel.com/testimonials), copied word for word
     (only the emojis were left out). Names are not shown. Add or swap reviews here; the home page shows them in two columns. */
  testimonials: [
    { quote: 'تجربتي مع ولاء فاضل في جلسات الصوت كانت مريحة ومختلفة جدًا ، ساعدتني في بناء مساحة امنه اكون فيها اكثر توازن وهدوء. أشكر ولاء على طاقتها الجميلة وحضورها واحترافيتها ، وأنصح بتجربتها لكل من يشعر بالحاجة إلى التوازن والعودة إلى فطرته', source: 'من تقييم مشتري موثَّق في المتجر · أغسطس 2026' },
    { quote: 'بالنسبة لي افضل تجربة للساوند هيلينغ مع كوتش ولاء انسانة تعطي باحسان وحب الله يبارك لها ويزيدها من فضله ونعيمه', source: 'من تقييم مشتري موثَّق في المتجر · أغسطس 2026' },
    { quote: 'روعه الجلسه تلامس الروح الموسيقى جدا روعه حسيت بالتحرر والراحه', source: 'من تقييم مشتري موثَّق في المتجر · سبتمبر 2026' },
    { quote: 'من أحسن المصادر للساوند هيلينج و اللي أشتغلت معايا شخصيًا .. و اللي الشغل عليه معمول بقلب و بإتقان و جودة عالية', source: 'من تقييم مشتري موثَّق في المتجر · سبتمبر 2026' }
  ]
};
