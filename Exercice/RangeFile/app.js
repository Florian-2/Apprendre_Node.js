const fs = require("fs").promises;
const path = require("path");
const mv = require("mv");

// Si le fichier n'a pas l'une des ces extension alors on le met dans un dossier "Divers"
const DIRS = {
    ".html": "Programmation",
    ".js": "Programmation",
    ".py": "Programmation",
    ".c": "Programmation",
    ".txt": "Documents",
    ".pdf": "Documents",
    ".mp3": "Musiques"
}

const folderPath = path.join(__dirname, "foo");

async function separatesFiles(contentFolder) 
{
    const files = [];

    for (const index in contentFolder) {
        const stats = await fs.stat(path.join(folderPath, contentFolder[index]));
        
        if (stats.isFile()) {
            files.push(contentFolder[index]);
        }
    } 

    return files;
}

async function exists(path) {  
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
}

async function organizeFiles() 
{
    try {
        const contentFolder = await fs.readdir(folderPath);
        const files = await separatesFiles(contentFolder);

        for (const file of files) 
        {
            const extension = path.extname(file);
            const mainPath = path.join(folderPath, DIRS[extension] ?? "Divers");

            const fileExists = await exists(mainPath);

            if (!fileExists) {
                await fs.mkdir(mainPath);
            }

            const oldPath = path.join(folderPath, file);
            const newPath = path.join(mainPath, file);

            mv(oldPath, newPath, (err) => {
                if (err) throw err
            })
        }
    } 
    catch (error) {
        console.log(error);
    }
}

organizeFiles()
// .then((e) => console.log(e))
// .catch((err) => console.log(err))