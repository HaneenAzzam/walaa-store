# رفع التصميم على سلة

1. أنشئي قالبًا من Theme Raed (`salla theme create`) وانسخي `assets/` إلى `src/assets/`.
2. استوردي `walaa-redesign.css` (يجمع redesign.css وkit.css) بعد ستايل القالب، وأضيفي خطي Readex Pro وIBM Plex Sans Arabic في `master.twig`.
3. الصقي `home-sections.twig` (يشمل أيضًا COUNTDOWN-DATE: تاريخ اللقاء القادم بصيغة 2026-11-05T00:00:00) في `src/views/pages/index.twig` واستبدلي `CATEGORY-ID` و`CATEGORY-N-URL` بروابط أقسامك.
4. شغّلي `salla theme preview` وراجعي: بطاقات المنتجات (قد تحتاج تعديل أسماء الفئات في الـCSS)، السلة، الدفع.
5. غير مجرَّب على سلة بعد؛ أسماء مكونات القالب قد تختلف حسب نسخته.
