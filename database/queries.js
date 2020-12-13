const queries = (database, type, emoji) => {
    const collection = database.collection(type);

    const getAll = async () => {
        try {
            const result = await collection.find({}).toArray();
            if(result) {
                console.log("   Found " + result.length + " " + type + " " + emoji);
            } else {
                console.warn("  Could not find any " + type + " \u{1F43E}");
            }
            return result || "Could not find any " + type + " \u{1F43E}"; 
        } catch(error) {
            throw new Error(error);
        }
    }
    
    const getOne = async (uuid) => {
        try {
            const result = await collection.findOne({"uuid":uuid});
            if(result) {
                console.log("   Found one " + singular(type) + " whith the uuid : " + uuid + " " + emoji);
            } else {
                console.warn("  Could not find any " + type + " \u{1F43E}");
            }
            return result || "Could not find any " + type + " \u{1F43E}"; 
        } catch(error) {
            throw new Error(error);
        }
    }
    
    const createOne  = async (article) => {
        article.uuid = generateUUID();
        try {
            const result = await collection.insertOne(article);
            if(result) {
                console.log("   Created the " + singular(type) + " with the UUID : " + article.uuid + " " + emoji);
            } else {
                console.warn("  Could not create the " + singular(type) + " with the UUID : " + article.uuid + " \u{1F43E}");
            }    
            return result.ops || "Could not create the " + singular(type) + " with the UUID : " + article.uuid + " \u{1F43E}";
        } catch(error) {
            throw new Error(error);
        }
    }
    
    const updateOne = async (uuid, article) => {
        try {
            const result = await collection.updateOne({"uuid": uuid}, {"$set": article});
            if(result) {
                console.log("   Updated the " + singular(type) + " with the UUID : " + uuid + " " + emoji);
            } else {
                console.warn("  Could not update the " + singular(type) + " with the UUID : " + uuid + " \u{1F43E}");
            }
            return result.result || "Could not update the " + singular(type) + " with the UUID : " + uuid + " \u{1F43E}";
        } catch(error) {
            throw new Error(error);
        }
    }
    
    const deleteOne = async (uuid) => {
        try {
            const result = await collection.deleteOne({"uuid":uuid});
            if(result) {
                console.log("   Deleted " + singular(type) + " whith the uuid : " + uuid + " " + emoji);
            } else {
                console.warn("  Could not find any " + singular(type) + " \u{1F43E}");
            }
            return result || "  Could not find any " + singular(type) + " \u{1F43E}"; 
        } catch(error) {
            throw new Error(error);
        }
    }

    return { getAll, getOne, createOne, updateOne, deleteOne };
}

const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
}

const singular = (type) => {
    return type.slice(0, -1);
};

module.exports = { queries };