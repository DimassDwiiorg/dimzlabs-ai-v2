import https from "https";

const HOST = "www.design.com";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

function fetchApi(path) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: HOST,
        port: 443,
        path,
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.9",
          "User-Agent": UA,
          Referer: "https://www.design.com/",
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ status: res.statusCode, body: data }));
      }
    );
    req.on("error", reject);
    req.end();
  });
}

export async function generateLogos(prompt, { limit = 20, searchText = "technology, science" } = {}) {
  let allResults = [];
  let page = 1;
  let hasMore = true;
  const pageSize = 15;

  while (hasMore && allResults.length < limit) {
    const params = new URLSearchParams({
      page,
      pageSize,
      prompt,
      text: prompt,
      searchText,
      searchOrigin: "RootHomePage",
      templateCategory: "",
      filterByTags: "",
      colors: "",
      locale: "en-US",
    });

    const response = await fetchApi(`/api/designs/search/load-more?${params.toString()}`);
    let data;
    try {
      data = JSON.parse(response.body);
    } catch (e) {
      break;
    }

    if (!data.designGroups || data.designGroups.length === 0) break;

    for (const group of data.designGroups) {
      for (const design of group.designs || []) {
        allResults.push({
          token: design.token || "",
          design_name: design.designName || "",
          is_free: design.isFree || false,
          image_url: design.imageUrl || "",
        });
      }
    }

    hasMore = data.hasMoreResults || false;
    page++;
    if (allResults.length >= limit) {
      allResults = allResults.slice(0, limit);
      break;
    }
  }

  return allResults;
}
