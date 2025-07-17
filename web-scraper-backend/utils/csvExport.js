const { Parser } = require("json2csv");

const exportToCSV = (data) => {
  const fields = [
    "companyName",
    "websiteURL",
    "snippet",
    "tagline",
    "socialLinks",
    "address",
  ];

  const transformedData = data.map((item) => ({
    ...item,
    socialLinks: Array.isArray(item.socialLinks)
      ? item.socialLinks.join(", ")
      : item.socialLinks || "",
  }));

  const json2csvParser = new Parser({ fields });
  return json2csvParser.parse(transformedData);
};

module.exports = { exportToCSV };
