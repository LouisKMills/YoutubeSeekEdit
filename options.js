const d = { arrow: 1, jl: 1 };
browser.storage.sync.get(d).then(s => {
  for (const id in d) {
    const el = document.getElementById(id);
    el.value = s[id];
    el.onchange = () => el.value > 0 && browser.storage.sync.set({ [id]: +el.value });
  }
});
