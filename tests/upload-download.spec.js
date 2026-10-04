const { test, expect } = require("@playwright/test");
const ExcelJS = require("exceljs");

// const workbook = new ExcelJS.Workbook();
// workbook.xlsx
//   .readFile("C:\\Users\\pkjr2\\Documents\\exceldownloadtest.xlsx")
//   .then(function () {
//     const worksheet = workbook.getWorksheet("Sheet1");
//     worksheet.eachRow((row, rowNumber) => {
//       row.eachCell((cell, celNumber) => {
//         console.log(cell.value);
//       });
//     });
//   });

async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet("Sheet1");
  const output = await readExcel(worksheet, searchText);
  const cell = worksheet.getCell(
    output.row,
    output.column + change.columnChange,
  );
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, celNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.column = celNumber;
      }
    });
  });
  return output;
}

// writeExcelTest(
//   "Mango",
//   350,
//   { rowChange: 0, columnChange: 2 },
//   "C:\\Users\\pkjr2\\Documents\\exceldownloadtest.xlsx",
// );
test("upload download excel validation", async ({ page }) => {
  const textSearch = "Mango";
  const updatedValue = "700";
  await page.goto("https://rahulshettyacademy.com/upload-download-test/");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
  const download = await downloadPromise;
  const suggested = await download.suggestedFilename();
  const filePath = `C:\\Users\\pkjr2\\Downloads\\${suggested}`;
  await download.saveAs(filePath);
  writeExcelTest(
    textSearch,
    updatedValue,
    { rowChange: 0, columnChange: 2 },
    "C:\\Users\\pkjr2\\Downloads\\download.xlsx",
  );
  await page.locator("#fileinput").click();
  await page
    .locator("#fileinput")
    .setInputFiles("C:\\Users\\pkjr2\\Downloads\\download.xlsx");
  // await page.pause();
  const textLocator = await page.getByText(textSearch);
  const desiredRow = await page.getByRole("row").filter({ has: textLocator });
  await expect(desiredRow.locator("#cell-4-undefined")).toContainText(
    updatedValue,
  );
});
