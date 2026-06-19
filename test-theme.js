const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:3000/history', { waitUntil: 'networkidle' });

  // Function to read computed bg of html + an element near the bottom of article
  async function snapshot(label) {
    const data = await page.evaluate(() => {
      const html = document.documentElement;
      const isDark = html.classList.contains('dark');
      const cs = getComputedStyle(html);
      const bg = cs.getPropertyValue('--background').trim();
      const fg = cs.getPropertyValue('--foreground').trim();
      // Sample colors from elements
      const samples = {};
      const ids = ['comic-chat', 'gatekeeper', 'end', 'credits'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const elCs = getComputedStyle(el);
          samples[id] = {
            color: elCs.color,
            // Walk up to find computed bg
            bg: elCs.backgroundColor,
          };
        }
      }
      // Sample body
      const body = document.body;
      const bodyCs = getComputedStyle(body);
      samples['body'] = { color: bodyCs.color, bg: bodyCs.backgroundColor };
      // Sample TOC element
      const toc = document.querySelector('.toc');
      if (toc) {
        const tocCs = getComputedStyle(toc);
        samples['toc'] = { color: tocCs.color, bg: tocCs.backgroundColor };
      }
      return { isDark, bg, fg, samples };
    });
    console.log(`\n=== ${label} ===`);
    console.log(JSON.stringify(data, null, 2));
  }

  await snapshot('initial');

  // Take screenshot of full page
  await page.screenshot({ path: '/tmp/history-1-initial.png', fullPage: true });

  // Click the theme toggle
  await page.click('button[aria-label*="mode"]');
  await page.waitForTimeout(300);
  await snapshot('after toggle 1');
  await page.screenshot({ path: '/tmp/history-2-toggled.png', fullPage: true });

  // Toggle back
  await page.click('button[aria-label*="mode"]');
  await page.waitForTimeout(300);
  await snapshot('after toggle 2 (back)');
  await page.screenshot({ path: '/tmp/history-3-back.png', fullPage: true });

  await browser.close();
})();
