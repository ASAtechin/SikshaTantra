/**
 * Submits every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam, Naver and others share it),
 * so search engines recrawl changed pages without a dashboard login. Run after a production deploy:
 *   npm run indexnow
 * The key is public by design: IndexNow verifies ownership by fetching public/<key>.txt from the site.
 */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.shikshatantra.shop").replace(/\/$/, "");
const KEY = "9d87829647ba6d8baf46e25cb9c9ce19";

const sitemap = await fetch(`${SITE_URL}/sitemap.xml`).then((res) => {
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  return res.text();
});
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
if (urlList.length === 0) throw new Error("No <loc> entries found in sitemap.xml");

const keyFile = await fetch(`${SITE_URL}/${KEY}.txt`);
if (!keyFile.ok || (await keyFile.text()).trim() !== KEY) {
  throw new Error(`${SITE_URL}/${KEY}.txt is not live yet; deploy before submitting.`);
}

// IndexNow accepts up to 10,000 URLs per request.
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE_URL).host,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList: urlList.slice(0, 10000),
  }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs, response ${res.status} ${res.statusText}`);
if (res.status >= 400) {
  console.error(await res.text());
  process.exit(1);
}
