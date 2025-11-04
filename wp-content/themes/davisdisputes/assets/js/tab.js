(function () {
    function activate(container, newIndex, updateHash) {
      const tabs = container.querySelectorAll('[role="tab"]');
      const panels = container.querySelectorAll('[role="tabpanel"]');
  
      tabs.forEach((tab, i) => {
        const selected = i === newIndex;
        tab.setAttribute('aria-selected', selected ? 'true' : 'false');
        tab.tabIndex = selected ? 0 : -1;
      });
  
      panels.forEach((panel, i) => {
        if (i === newIndex) panel.removeAttribute('hidden');
        else panel.setAttribute('hidden', '');
      });
  
      if (updateHash) {
        const selectedTab = tabs[newIndex];
        if (selectedTab && selectedTab.id) history.replaceState(null, '', '#' + selectedTab.id);
      }
    }
  
    function setup(container) {
      if (container.dataset.enhanced) return;
  
      // Build from simple markup: .ada-tabs > .ada-tab sections
      const rawTabs = Array.prototype.slice.call(
        container.querySelectorAll(':scope > .ada-tab, :scope > section.ada-tab, :scope > div.ada-tab')
      );
      if (!rawTabs.length) return;
  
      const list = document.createElement('div');
      list.className = 'ada-tabs__list';
      list.setAttribute('role', 'tablist');
      list.setAttribute('aria-label', container.getAttribute('aria-label') || 'Tabs');
  
      const panels = [];
  
      rawTabs.forEach((sec, i) => {
        const title = sec.getAttribute('data-title') || sec.getAttribute('aria-label') || ('Tab ' + (i + 1));
        const base = container.id || 'ada-tabs';
        const tabId = `${base}-tab-${i + 1}`;
        const panelId = `${base}-panel-${i + 1}`;
  
        const btn = document.createElement('button');
        btn.className = 'ada-tabs__tab';
        btn.type = 'button';
        btn.id = tabId;
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-controls', panelId);
        btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        btn.setAttribute('tabindex', i === 0 ? '0' : '-1');
        btn.dataset.index = String(i);
        btn.textContent = title;
        list.appendChild(btn);
  
        const panel = document.createElement('div');
        panel.className = 'ada-tabs__panel';
        panel.setAttribute('role', 'tabpanel');
        panel.id = panelId;
        panel.setAttribute('aria-labelledby', tabId);
        if (i !== 0) panel.hidden = true;
  
        while (sec.firstChild) panel.appendChild(sec.firstChild);
        panels.push(panel);
        sec.remove();
      });
  
      container.insertBefore(list, container.firstChild);
      panels.forEach((p) => container.appendChild(p));
  
      // ====== ACTIVATE ON HOVER (pointerenter) ======
      list.addEventListener('pointerenter', (e) => {
        const tab = e.target && e.target.closest && e.target.closest('[role="tab"]');
        if (!tab || !list.contains(tab)) return;
        const idx = parseInt(tab.dataset.index, 10) || 0;
        activate(container, idx, false); // don't mutate URL hash on hover
      }, true);
  
      // Optional: also respond to mouseover if pointer events are blocked by some skins
      list.addEventListener('mouseover', (e) => {
        const tab = e.target && e.target.closest && e.target.closest('[role="tab"]');
        if (!tab || !list.contains(tab)) return;
        const idx = parseInt(tab.dataset.index, 10) || 0;
        activate(container, idx, false);
      });
  
      // Keep keyboard nav
      list.addEventListener('keydown', (e) => {
        const tabs = list.querySelectorAll('[role="tab"]');
        const current = Array.prototype.findIndex.call(
          tabs,
          (t) => t.getAttribute('aria-selected') === 'true'
        );
        let next = current;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (current + 1) % tabs.length;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (current - 1 + tabs.length) % tabs.length;
        if (e.key === 'Home') next = 0;
        if (e.key === 'End') next = tabs.length - 1;
        if (next !== current) {
          e.preventDefault();
          activate(container, next, true);
          tabs[next].focus();
        }
      });
  
      // Deep-link support (on load)
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const el = document.getElementById(hash);
        if (el && el.getAttribute('role') === 'tab') {
          const idx = parseInt(el.dataset.index, 10) || 0;
          activate(container, idx, false);
        }
      }
  
      container.dataset.enhanced = '1';
    }
  
    document.addEventListener('DOMContentLoaded', function () {
      document.querySelectorAll('.ada-tabs').forEach(setup);
    });
  })();
  