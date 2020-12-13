const createUUID = require('./utils');

const articleCollection = (database) => {
    const collection = database.collection("articles");

    const getArticles = async () => {
        try {
            const result = await collection.find({}).toArray();
            if(result) {
                console.log("   Found " + result.length + " articles \u{1F4F0}");
            } else {
                console.warn("  Could not find any articles \u{1F43E}");
            }
            return result || "Could not find any articles \u{1F43E}"; 
        } catch(error) {
            throw new Error(error);
        }
    }
    
    const getArticle = async (uuid) => {
        try {
            const result = await collection.findOne({"uuid":uuid});
            if(result) {
                console.log("   Found an article whith the uuid : " + uuid + " \u{1F5DE}");
            } else {
                console.warn("  Could not find any articles \u{1F43E}");
            }
            return result || "Could not find any articles \u{1F43E}"; 
        } catch(error) {
            throw new Error(error);
        }
    }
    
    const createArticle  = async (article) => {
        article.uuid = createUUID();
        try {
            const result = await collection.insertOne(article);
            if(result) {
                console.log("   Created the article with the UUID : " + article.uuid + "\u{1F5DE}");
            } else {
                console.warn("  Could not create the article with the UUID : " + article.uuid + "\u{1F43E}");
            }    
            return result.ops || "Could not create the article with the UUID : " + article.uuid + "\u{1F43E}";
        } catch(error) {
            throw new Error(error);
        }
    }
    
    const updateArticle = async (uuid, article) => {
        try {
            const result = await collection.updateOne({"uuid": uuid}, {"$set": article});
            if(result) {
                console.log("   Updated the article with the UUID : " + uuid + " \u{1F5DE}");
            } else {
                console.warn("  Could not update the article with the UUID : " + uuid + " \u{1F43E}");
            }
            return result.result || "Could not update the article with the UUID : " + uuid + " \u{1F43E}";
        } catch(error) {
            throw new Error(error);
        }
    }
    
    const deleteArticle = async (uuid) => {
        try {
            const result = await collection.deleteOne({"uuid":uuid});
            if(result) {
                console.log("   Deleted an article whith the uuid : " + uuid + " \u{1F5D1}");
            } else {
                console.warn("  Could not find any articles \u{1F43E}");
            }
            return result || "  Could not find any articles \u{1F43E}"; 
        } catch(error) {
            throw new Error(error);
        }
    }

    return { getArticles, getArticle, createArticle, updateArticle, deleteArticle };
}

module.exports = { articleCollection };