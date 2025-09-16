const fs = require('fs-extra');
const Papa = require('papaparse');
const chalk = require('chalk');

function preprocessDataset(inputPath, outputPath) {
    console.log(chalk.blue("⚡ Preprocessing dataset..."));

    try {
        // Read CSV file - FIXED PATH
        const csvData = fs.readFileSync('data.csv', 'utf8');
        const parsed = Papa.parse(csvData, { header: true });

        console.log(chalk.yellow(`📊 Total records: ${parsed.data.length}`));

        // Clean data - remove rows with missing CustomerID or Description
        const cleanData = parsed.data.filter(row => 
            row.CustomerID && 
            row.Description && 
            row.StockCode &&
            row.Quantity &&
            parseInt(row.Quantity) > 0
        );

        console.log(chalk.yellow(`🧹 Cleaned records: ${cleanData.length}`));

        // Build user-item interactions
        const interactions = [];
        const userItemMatrix = {};

        cleanData.forEach(row => {
            const userId = row.CustomerID.trim();
            const itemId = row.StockCode.trim();
            const description = row.Description.trim();
            const quantity = parseInt(row.Quantity);
            const timestamp = row.InvoiceDate;

            // Add to interactions array
            interactions.push({
                userId: userId,
                itemId: itemId,
                description: description,
                quantity: quantity,
                timestamp: timestamp,
                interaction: 1
            });

            // Build user-item matrix
            if (!userItemMatrix[userId]) {
                userItemMatrix[userId] = {};
            }
            if (!userItemMatrix[userId][itemId]) {
                userItemMatrix[userId][itemId] = 0;
            }
            userItemMatrix[userId][itemId] += quantity;
        });

        // Create output directory if it doesn't exist
        fs.ensureDirSync('dataset');

        // Save preprocessed data
        const preprocessedData = {
            interactions: interactions,
            userItemMatrix: userItemMatrix,
            stats: {
                totalUsers: Object.keys(userItemMatrix).length,
                totalItems: new Set(interactions.map(i => i.itemId)).size,
                totalInteractions: interactions.length
            }
        };

        fs.writeFileSync(outputPath, JSON.stringify(preprocessedData, null, 2));
        
        console.log(chalk.green("✅ Preprocessed data saved: " + outputPath));
        console.log(chalk.cyan(`📈 Users: ${preprocessedData.stats.totalUsers}`));
        console.log(chalk.cyan(`📦 Items: ${preprocessedData.stats.totalItems}`));
        console.log(chalk.cyan(`🔄 Interactions: ${preprocessedData.stats.totalInteractions}`));

        return preprocessedData;
    } catch (error) {
        console.error(chalk.red("❌ Error preprocessing data:"), error.message);
        throw error;
    }
}

if (require.main === module) {
    preprocessDataset('data.csv', 'dataset/preprocessed.json');
}

module.exports = { preprocessDataset };