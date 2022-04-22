const fs = require('fs').promises;

async function read() {
    try {
        const data = await fs.readFile("doc.txt", "utf-8"); // Promise.resolve(1)
        return data;
    } 
    catch (error) {
        console.log(error);
    }
}
const a = read();
console.log(a);

// read()
// .then((result) => console.log(result))
// .catch((err) => console.log(err));





// fs.readdir(folderPath, (err, files) => {
//     if (err) throw err;

//     for (const fileOrFolder of files) {
//         const stats = fs.statSync(path.join(folderPath, fileOrFolder));
        
//         if (stats.isFile()) {
//             const extension = path.extname(fileOrFolder);

//             if (DIRS[extension] === undefined) {
//                 const various = path.join(folderPath, "Divers");
//                 fs.mkdir(various, (err) => {
//                     if (err) throw err;
//                 });
//             }

//             const targetPath = path.join(folderPath, DIRS[extension]);

//             if (!fs.existsSync(targetPath)) 
//             {
//                 fs.mkdir(targetPath, (err) => {
//                     if (err) throw err;
//                 });
//             }
            
//             // Déplacer les fichiers dans le dossier correspondent
//         }
//     }
// });