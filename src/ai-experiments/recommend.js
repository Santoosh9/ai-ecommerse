const chalk = require('chalk');

// Popularity-based recommender
function popularityRec(interactions, userItemMatrix, N = 10) {
    console.log(chalk.blue("Generating popularity recommendations..."));
    
    // Count global item frequencies
    const itemCounts = {};
    
    Object.values(userItemMatrix).forEach(userItems => {
        Object.entries(userItems).forEach(([itemId, quantity]) => {
            itemCounts[itemId] = (itemCounts[itemId] || 0) + quantity;
        });
    });

    // Sort by frequency and get top N
    const topItems = Object.entries(itemCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, N)
        .map(([itemId]) => itemId);

    return topItems;
}

// Simplified content-based recommender (MUCH FASTER)
function contentRec(userItemMatrix, interactions, N = 10) {
    console.log(chalk.blue("Generating content-based recommendations..."));
    
    // Pre-calculate item frequencies for faster lookup
    const itemFrequencies = {};
    interactions.forEach(interaction => {
        itemFrequencies[interaction.itemId] = (itemFrequencies[interaction.itemId] || 0) + 1;
    });
    
    // Sort items by frequency
    const sortedItems = Object.entries(itemFrequencies)
        .sort((a, b) => b[1] - a[1])
        .map(([itemId]) => itemId)
        .slice(0, N * 2); // Get more items to filter from
    
    const allRecommendations = {};
    
    Object.keys(userItemMatrix).forEach(userId => {
        const userItems = Object.keys(userItemMatrix[userId]);
        
        // Filter out items user already has
        const recommendations = sortedItems.filter(itemId => !userItems.includes(itemId));
        allRecommendations[userId] = recommendations.slice(0, N);
    });
    
    return allRecommendations;
}

// User-based Collaborative Filtering (KNN) - SIMPLIFIED
function knnRec(userItemMatrix, N = 10, k = 3) { // Reduced k for speed
    console.log(chalk.blue("Generating KNN collaborative filtering recommendations..."));
    
    const allRecommendations = {};
    const userIds = Object.keys(userItemMatrix);
    
    // Only process first 100 users for speed (you can increase this)
    const usersToProcess = userIds.slice(0, 100);
    
    usersToProcess.forEach(userId => {
        if (!userItemMatrix[userId]) {
            allRecommendations[userId] = [];
            return;
        }

        const targetUserItems = userItemMatrix[userId];
        const similarities = [];

        // Calculate similarity with other users (limit to 50 for speed)
        const otherUsers = userIds.filter(id => id !== userId).slice(0, 50);
        
        otherUsers.forEach(otherUserId => {
            const otherUserItems = userItemMatrix[otherUserId];
            const similarity = cosineSimilarity(targetUserItems, otherUserItems);
            if (similarity > 0) {
                similarities.push({ userId: otherUserId, similarity });
            }
        });

        // Sort by similarity and get top k neighbors
        similarities.sort((a, b) => b.similarity - a.similarity);
        const neighbors = similarities.slice(0, k);

        // Get recommendations from neighbors
        const itemScores = {};
        neighbors.forEach(neighbor => {
            const neighborItems = userItemMatrix[neighbor.userId];
            Object.entries(neighborItems).forEach(([itemId, quantity]) => {
                if (!targetUserItems[itemId]) {
                    itemScores[itemId] = (itemScores[itemId] || 0) + quantity * neighbor.similarity;
                }
            });
        });

        // Return top N recommendations
        allRecommendations[userId] = Object.entries(itemScores)
            .sort((a, b) => b[1] - a[1])
            .slice(0, N)
            .map(([itemId]) => itemId);
    });
    
    // For remaining users, use popularity
    const popularityRecs = popularityRec([], userItemMatrix, N);
    userIds.forEach(userId => {
        if (!allRecommendations[userId]) {
            allRecommendations[userId] = popularityRecs;
        }
    });
    
    return allRecommendations;
}

// Calculate cosine similarity between two users
function cosineSimilarity(user1Items, user2Items) {
    const allItems = new Set([...Object.keys(user1Items), ...Object.keys(user2Items)]);
    
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;

    allItems.forEach(itemId => {
        const val1 = user1Items[itemId] || 0;
        const val2 = user2Items[itemId] || 0;

        dotProduct += val1 * val2;
        magnitude1 += val1 * val1;
        magnitude2 += val2 * val2;
    });

    magnitude1 = Math.sqrt(magnitude1);
    magnitude2 = Math.sqrt(magnitude2);

    if (magnitude1 === 0 || magnitude2 === 0) {
        return 0;
    }

    return dotProduct / (magnitude1 * magnitude2);
}

// Generate recommendations for all algorithms (OPTIMIZED)
function generateAllRecommendations(userItemMatrix, interactions, testUsers, N = 10) {
    console.log(chalk.blue("Generating recommendations for all algorithms..."));
    
    const results = {
        popularity: {},
        contentBased: {},
        knn: {}
    };

    // Generate popularity recommendations (same for all users)
    const popularityRecs = popularityRec(interactions, userItemMatrix, N);
    testUsers.forEach(userId => {
        results.popularity[userId] = popularityRecs;
    });

    // Generate content-based recommendations (for all users at once)
    const contentBasedRecs = contentRec(userItemMatrix, interactions, N);
    testUsers.forEach(userId => {
        results.contentBased[userId] = contentBasedRecs[userId] || popularityRecs;
    });

    // Generate KNN recommendations (for all users at once)
    const knnRecs = knnRec(userItemMatrix, N);
    testUsers.forEach(userId => {
        results.knn[userId] = knnRecs[userId] || popularityRecs;
    });

    return results;
}

module.exports = { 
    popularityRec, 
    contentRec, 
    knnRec, 
    generateAllRecommendations,
    cosineSimilarity 
};