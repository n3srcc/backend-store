const xlsx = require('xlsx');

async function parseXLSX(buffer) {
    return new Promise((resolve, reject) => {
        const workbook = xlsx.read(buffer, { type: 'buffer' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet);

        const formattedData = data.map(row => ({
            handle: row.Handle,
            title: row.Title,
            description: row.Description,
            sku: row.SKU,
            grams: parseFloat(row.Grams),
            stock: parseInt(row.Stock),
            price: parseFloat(row.Price),
            compare_price: parseFloat(row['Compare Price']),
            barcode: row.Barcode
        }));

        resolve(formattedData);
    });
}



module.exports = { parseXLSX };