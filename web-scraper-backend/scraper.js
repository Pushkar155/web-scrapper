const axios = require("axios");
const cheerio = require("cheerio");

const scrapeCompanies = async (input, level = "basic") => {
  let html;
  const isUrl = input.startsWith("http://") || input.startsWith("https://");

  if (isUrl) {
    const response = await axios.get(input, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36",
      },
    });

    html = response.data;
    const $ = cheerio.load(html);

    const title = $("title").text();
    const metaDesc = $('meta[name="description"]').attr("content") || "";

    const result = {
      companyName: title || "Untitled",
      websiteURL: input,
      snippet: metaDesc,
    };

    if (level === "medium") {
      result.tagline = $("h1, h2").first().text() || "";

      const socialLinks = [];
      $("a[href*='linkedin'], a[href*='twitter'], a[href*='facebook']").each(
        (_, el) => {
          const link = $(el).attr("href");
          if (link && !socialLinks.includes(link)) {
            socialLinks.push(link);
          }
        }
      );

      result.socialLinks = socialLinks;

      const addressMatch = html.match(
        /[0-9]{1,5}\s+[\w\s.,'-]{5,50}(?:India|USA|UK|Street|Road|Nagar|Colony|Lane)/i
      );
      result.address = addressMatch ? addressMatch[0] : "";
    }

    return [result];
  } else {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      input
    )}`;
    const response = await axios.get(searchUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36",
      },
    });

    html = response.data;
    const $ = cheerio.load(html);
    const results = [];

    $("div.g").each((i, el) => {
      const title = $(el).find("h3").text();
      const link = $(el).find("a").attr("href");
      const snippet = $(el).find("span").text();

      if (title && link) {
        const company = {
          companyName: title,
          websiteURL: link,
          snippet: snippet,
        };

        if (level === "medium") {
          company.tagline = "";
          company.socialLinks = [];
          company.address = "";
        }

        results.push(company);
      }
    });

    return results;
  }
};

module.exports = { scrapeCompanies };
