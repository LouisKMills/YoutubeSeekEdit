const s = { arrow: 1, jl: 1 };
browser.storage.sync.get(s).then(v => Object.assign(s, v));
browser.storage.onChanged.addListener(c => { for (const k in c) s[k] = c[k].newValue; });

addEventListener('keydown', e => {
  const t = e.target;
  if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey || t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
  const dir = { ArrowLeft: -s.arrow, ArrowRight: s.arrow, j: -s.jl, l: s.jl }[e.key.length === 1 ? e.key.toLowerCase() : e.key];
  const videos = [...document.querySelectorAll('video')];
  const v = videos.find(v => !v.paused) || videos[0];
  if (!dir || !v) return;
  e.preventDefault();
  e.stopImmediatePropagation();
  v.currentTime += dir;
}, true);
