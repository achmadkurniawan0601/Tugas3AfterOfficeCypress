const fs = require("fs");
const path = require("path");
const { Document, Packer, Paragraph, HeadingLevel, Media } = require("docx");

const doc = new Document();
const screenshotDir = "./cypress/screenshots/orangehrm_e2e.cy.js/";

fs.readdirSync(screenshotDir).forEach((file) => {
  const imgPath = path.join(screenshotDir, file);
  const imageBuffer = fs.readFileSync(imgPath);
  const image = Media.addImage(doc, imageBuffer, 500, 300);
  doc.addSection({
    children: [
      new Paragraph({ text: file, heading: HeadingLevel.HEADING_2 }),
      image,
    ],
  });
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("hasil_test_orangehrm.docx", buffer);
  console.log("✅ Dokumen Word berhasil dibuat!");
});
