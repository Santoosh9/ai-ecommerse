const fs = require('fs-extra');
const asciichart = require('asciichart');
const chalk = require('chalk');

// Generate ASCII charts for terminal display
function generateAsciiCharts(metrics) {
    console.log(chalk.cyan("\n ASCII CHARTS (Terminal Display)"));
    console.log("=".repeat(50));
    
    const algorithms = metrics.map(m => m.name);
    const precisionData = metrics.map(m => m.precision);
    const recallData = metrics.map(m => m.recall);
    const ndcgData = metrics.map(m => m.ndcg);
    const coverageData = metrics.map(m => m.coverage);
    
    // Precision & Recall Bar Chart
    console.log(chalk.yellow("\n Precision & Recall Comparison"));
    console.log("-".repeat(30));
    
    for (let i = 0; i < algorithms.length; i++) {
        const precisionBars = '█'.repeat(Math.round(precisionData[i] * 20));
        const recallBars = '█'.repeat(Math.round(recallData[i] * 20));
        
        console.log(`${algorithms[i].padEnd(15)} Precision: ${precisionBars} ${precisionData[i].toFixed(4)}`);
        console.log(`${' '.repeat(15)} Recall:    ${recallBars} ${recallData[i].toFixed(4)}`);
        console.log('');
    }
    
    // nDCG Line Chart
    console.log(chalk.yellow("\n📈 nDCG@10 Scores"));
    console.log("-".repeat(30));
    
    const ndcgChart = asciichart.plot([ndcgData], {
        height: 10,
        width: 60,
        colors: [asciichart.green],
        format: x => x.toFixed(3)
    });
    console.log(ndcgChart);
    console.log('Algorithms:', algorithms.join(' → '));
    
    // Coverage Comparison
    console.log(chalk.yellow("\n🎯 Coverage Comparison (%)"));
    console.log("-".repeat(30));
    
    for (let i = 0; i < algorithms.length; i++) {
        const coverageBars = '█'.repeat(Math.round(coverageData[i] * 20));
        console.log(`${algorithms[i].padEnd(15)} ${coverageBars} ${(coverageData[i] * 100).toFixed(2)}%`);
    }
}

// Dummy function for PNG charts (won't generate them)
async function generatePngCharts(metrics) {
    console.log(chalk.yellow("📊 PNG charts disabled - using ASCII charts only"));
    console.log(chalk.cyan("📁 Results saved in results/ folder:"));
    console.log("   - metrics.json");
    console.log("   - table1.csv");
    console.log("   - table2.csv");
}

module.exports = { generateAsciiCharts, generatePngCharts };