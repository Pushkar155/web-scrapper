const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { scrapeCompanies } = require("./scraper");
const { exportToCSV } = require("./utils/csvExport");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/scrape", async (req, res) => {
  const { query, format, level = "basic" } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const data = await scrapeCompanies(query, level);

    if (format === "csv") {
      const csv = exportToCSV(data);
      return res.header("Content-Type", "text/csv").send(csv);
    }

    res.json({
      data,
      message: "Successfully fetched the scraped data",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Scraping failed" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
