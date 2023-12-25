const fs = require("fs");
const HTMLtoDOCX = require("html-to-docx");

module.exports.createWordFile = async (html, filePath) => {
  try {
    const fileBuffer = await HTMLtoDOCX(html, null, {
      table: { row: { cantSplit: true } },
      footer: true,
      pageNumber: true,
    });

    fs.writeFile(filePath, fileBuffer, (error) => {
      if (error) {
        console.log("Docx file creation failed");
        return;
      }
      console.log("Docx file created successfully");
    });
    console.log("Conversion complete. Word document saved at:", filePath);
  } catch (error) {
    console.error("Error converting HTML to Word document:", error);
  }
};
