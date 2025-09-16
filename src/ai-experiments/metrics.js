const chalk = require('chalk');

// Precision@K
function precisionAtK(recommended, actual, k) {
    if (recommended.length === 0) return 0;
    
    const recK = recommended.slice(0, k);
    const hits = recK.filter(item => actual.includes(item)).length;
    return hits / k;
}

// Recall@K
function recallAtK(recommended, actual, k) {
    if (actual.length === 0) return 0;
    
    const recK = recommended.slice(0, k);
    const hits = recK.filter(item => actual.includes(item)).length;
    return hits / actual.length;
}

// nDCG@K
function ndcgAtK(recommended, actual, k) {
    if (recommended.length === 0) return 0;
    
    const recK = recommended.slice(0, k);
    let dcg = 0;
    let idcg = 0;
    
    // Calculate DCG
    recK.forEach((item, i) => {
        const relevance = actual.includes(item) ? 1 : 0;
        dcg += relevance / Math.log2(i + 2);
    });
    
    // Calculate IDCG (ideal DCG)
    const idealRelevance = Math.min(actual.length, k);
    for (let i = 0; i < idealRelevance; i++) {
        idcg += 1 / Math.log2(i + 2);
    }
    
    return idcg > 0 ? dcg / idcg : 0;
}

// Coverage
function coverage(allRecommendations, totalItems) {
    const recommendedItems = new Set();
    
    Object.values(allRecommendations).forEach(userRecs => {
        if (Array.isArray(userRecs)) {
            userRecs.forEach(item => recommendedItems.add(item));
        } else {
            Object.values(userRecs).forEach(recs => {
                if (Array.isArray(recs)) {
                    recs.forEach(item => recommendedItems.add(item));
                }
            });
        }
    });
    
    return recommendedItems.size / totalItems;
}

// Latency
function latency(start, end) {
    return end - start; // milliseconds
}

// Calculate all metrics for a user
function calculateUserMetrics(recommended, actual, k = 10) {
    return {
        precision: precisionAtK(recommended, actual, k),
        recall: recallAtK(recommended, actual, k),
        ndcg: ndcgAtK(recommended, actual, k)
    };
}

// Calculate average metrics across all users
function calculateAverageMetrics(allRecommendations, testData, k = 10) {
    const metrics = {
        precision: 0,
        recall: 0,
        ndcg: 0
    };
    
    let userCount = 0;
    
    Object.entries(allRecommendations).forEach(([userId, recommendations]) => {
        if (testData[userId] && testData[userId].length > 0) {
            const userMetrics = calculateUserMetrics(recommendations, testData[userId], k);
            metrics.precision += userMetrics.precision;
            metrics.recall += userMetrics.recall;
            metrics.ndcg += userMetrics.ndcg;
            userCount++;
        }
    });
    
    if (userCount > 0) {
        metrics.precision /= userCount;
        metrics.recall /= userCount;
        metrics.ndcg /= userCount;
    }
    
    return metrics;
}

module.exports = {
    precisionAtK,
    recallAtK,
    ndcgAtK,
    coverage,
    latency,
    calculateUserMetrics,
    calculateAverageMetrics
};