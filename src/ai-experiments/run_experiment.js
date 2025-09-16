const fs = require('fs-extra');
const chalk = require('chalk');
const { preprocessDataset } = require('./preprocess');
const { generateAllRecommendations } = require('./recommend');
const { calculateAverageMetrics, coverage, latency } = require('./metrics');
const { generateAsciiCharts, generatePngCharts } = require('./charts');

async function runExperiment() {
    console.log(chalk.blue("🚀 Starting E-commerce Recommendation System Experiments"));
    console.log("=".repeat(60));

    try {
        // Ensure results directory exists
        await fs.ensureDir('results');
        await fs.ensureDir('results/charts');

        // Step 1: Preprocess Data - FIXED PATH
        console.log(chalk.yellow("\n📊 Step 1: Preprocessing data..."));
        const preprocessedData = preprocessDataset('data.csv', 'dataset/preprocessed.json'); // FIXED PATH
        const { interactions, userItemMatrix } = preprocessedData;

        // Step 2: Split Data into Training and Test Sets
        console.log(chalk.yellow("\n✂️ Step 2: Splitting data into train/test..."));
        const userIds = Object.keys(userItemMatrix);
        const trainUsers = userIds.slice(0, Math.floor(userIds.length * 0.8));
        const testUsers = userIds.slice(Math.floor(userIds.length * 0.8));

        console.log(chalk.cyan(`�� Training users: ${trainUsers.length}`));
        console.log(chalk.cyan(`�� Test users: ${testUsers.length}`));

        // Create test data (last 20% of interactions per user)
        const testData = {};
        testUsers.forEach(userId => {
            if (userItemMatrix[userId]) {
                const userItems = Object.keys(userItemMatrix[userId]);
                const testSize = Math.max(1, Math.floor(userItems.length * 0.2));
                testData[userId] = userItems.slice(-testSize);
            }
        });

        // Step 3: Generate Recommendations
        console.log(chalk.yellow("\n�� Step 3: Generating recommendations..."));
        const startTime = Date.now();
        
        const allRecommendations = generateAllRecommendations(userItemMatrix, interactions, testUsers, 10);
        
        const endTime = Date.now();
        const totalLatency = latency(startTime, endTime);
        
        console.log(chalk.cyan(`⏱️ Total generation time: ${totalLatency}ms`));

        // Step 4: Calculate Metrics
        console.log(chalk.yellow("\n📊 Step 4: Calculating metrics..."));
        
        const metrics = [];
        const totalItems = new Set(interactions.map(i => i.itemId)).size;
        
        const algorithms = ['popularity', 'contentBased', 'knn'];
        const algorithmNames = ['Popularity', 'Content-Based', 'KNN CF'];
        
        for (let i = 0; i < algorithms.length; i++) {
            const algo = algorithms[i];
            const algoName = algorithmNames[i];
            
            console.log(chalk.cyan(`\n📈 Calculating metrics for ${algoName}...`));
            const startAlgo = Date.now();
            
            const avgMetrics = calculateAverageMetrics(allRecommendations[algo], testData, 10);
            const algoLatency = latency(startAlgo, Date.now());
            
            // Calculate coverage for this algorithm
            const algoCoverage = coverage(allRecommendations[algo], totalItems);
            
            metrics.push({
                name: algoName,
                precision: avgMetrics.precision,
                recall: avgMetrics.recall,
                ndcg: avgMetrics.ndcg,
                coverage: algoCoverage,
                latency: algoLatency
            });
            
            console.log(chalk.green(`✅ ${algoName}: Precision=${avgMetrics.precision.toFixed(4)}, Recall=${avgMetrics.recall.toFixed(4)}, nDCG=${avgMetrics.ndcg.toFixed(4)}`));
        }

        // Step 5: Save Results
        console.log(chalk.yellow("\n💾 Step 5: Saving results..."));
        
        // Save metrics.json
        await fs.writeFile('results/metrics.json', JSON.stringify(metrics, null, 2));
        
        // Generate Table 1 (Precision/Recall/nDCG)
        const table1Header = 'Algorithm,Precision@10,Recall@10,nDCG@10\n';
        const table1Rows = metrics.map(m => 
            `${m.name},${m.precision.toFixed(4)},${m.recall.toFixed(4)},${m.ndcg.toFixed(4)}`
        ).join('\n');
        await fs.writeFile('results/table1.csv', table1Header + table1Rows);
        
        // Generate Table 2 (Coverage/Latency)
        const table2Header = 'Algorithm,Coverage,Latency(ms)\n';
        const table2Rows = metrics.map(m => 
            `${m.name},${(m.coverage * 100).toFixed(2)}%,${m.latency}`
        ).join('\n');
        await fs.writeFile('results/table2.csv', table2Header + table2Rows);
        
        console.log(chalk.green("✅ Results saved to results/ folder"));

        // Step 6: Generate Charts
        console.log(chalk.yellow("\n�� Step 6: Generating charts..."));
        
        // Generate ASCII charts for terminal
        generateAsciiCharts(metrics);
        
        // Generate PNG charts
        await generatePngCharts(metrics);

        // Step 7: Print Final Results Summary
        console.log(chalk.blue("\n�� EXPERIMENT COMPLETED SUCCESSFULLY!"));
        console.log("=".repeat(60));
        
        console.log(chalk.cyan("\n📋 FINAL RESULTS SUMMARY:"));
        console.log("-".repeat(60));
        console.log("Algorithm".padEnd(15) + "Precision@10".padEnd(12) + "Recall@10".padEnd(12) + "nDCG@10".padEnd(12) + "Coverage%".padEnd(12) + "Latency(ms)");
        console.log("-".repeat(60));
        
        metrics.forEach(metric => {
            console.log(
                metric.name.padEnd(15) +
                metric.precision.toFixed(4).padEnd(12) +
                metric.recall.toFixed(4).padEnd(12) +
                metric.ndcg.toFixed(4).padEnd(12) +
                (metric.coverage * 100).toFixed(2).padEnd(12) +
                metric.latency.toString()
            );
        });
        console.log("-".repeat(60));
        
        // Find best performing algorithm
        const bestPrecision = metrics.reduce((best, current) => 
            current.precision > best.precision ? current : best
        );
        const bestRecall = metrics.reduce((best, current) => 
            current.recall > best.recall ? current : best
        );
        const bestNdcg = metrics.reduce((best, current) => 
            current.ndcg > best.ndcg ? current : best
        );
        
        console.log(chalk.green("\n�� BEST PERFORMING ALGORITHMS:"));
        console.log(`�� Best Precision: ${bestPrecision.name} (${bestPrecision.precision.toFixed(4)})`);
        console.log(`📊 Best Recall: ${bestRecall.name} (${bestRecall.recall.toFixed(4)})`);
        console.log(`�� Best nDCG: ${bestNdcg.name} (${bestNdcg.ndcg.toFixed(4)})`);
        
        console.log(chalk.cyan("\n�� Output Files:"));
        console.log("   - results/metrics.json (All metrics data)");
        console.log("   - results/table1.csv (Precision/Recall/nDCG table)");
        console.log("   - results/table2.csv (Coverage/Latency table)");
        console.log("   - results/charts/ (PNG charts for report)");
        
        console.log(chalk.green("\n✅ Experiment completed successfully!"));

    } catch (error) {
        console.error(chalk.red("❌ Error running experiment:"), error.message);
        process.exit(1);
    }
}

// Run the experiment if this file is executed directly
if (require.main === module) {
    runExperiment().catch(console.error);
}

module.exports = { runExperiment };