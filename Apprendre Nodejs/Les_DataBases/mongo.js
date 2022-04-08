/* Créer une base de donnée 

    use <name_db>;
*/





/* Créer une collection (table) 

    db.createCollection("<name_collection>");
*/





/* Supprimer une collection 

    db.<collection>.drop();
*/




/* Ajouter des données (documents) dans une collection

    // Ajoute un seul document:
        db.<collection>.insert({ key: value });

    // Ajoute plusieurs documents:
        db.<collection>.insertMany([{ key: value }, { key: value }]);
*/





/* Récupérer des données (documents) 

    // Récupère tous les documents de la collection.
        db.<collection>.find();

    // Récupère un seul document
        db.<collection>.findOne();

    // Récupère un document selon une/plusieurs condition (équivalent de && qui veut dire AND)
        db.<collection>.findOne({ username: "Florian" });
        db.<collection>.findOne({ username: "Florian", email: "florian@gmail.com" });

    // Récupère un document selon une/plusieurs condition (équivalent de || qui veut dire OR)
        Ici on récupère un user qui à comme "name": "Jean" OU "Marion":
            db.users.find({ $or: [{ "name": "Jean" }, {"name": "Marion"}] });


Les opérateurs de requête 

    $gt : (greater than) Plus grand que...
        db.chapters.find({ index: { $gt: 1 } }); // L'index doit être plus grand que 1
    $gte : (greater than or equal) Supérieures ou égales a...
    $lt : (lower than) Plus petit que...
    $lte : (lower than or equal) Inférieures ou égales a...

    $in : match les valeurs contenues dans le tableau passé à l'opérateur.
        db.chapters.find({ title: { $in: ["python", "react"] } }); // "title" doit être égale a l'une des valeur du tableau

    $nin : (not in) match les valeurs qui ne sont pas contenues dans le tableau passé à l'opérateur.
        db.chapters.find({ title: { $nin: ["python", "react"] } }); // "title" ne doit pas être égale à l'une des valeur du tableau

    $ne : (not equal) match les valeurs qui ne sont pas égale à la valeur spécifiée.
        db.chapters.find({ title: { $ne: "python" } }); // "title" ne dois pas être égale à "python"
*/





/* Mettre à jour des données (document) 

    // Mettre à jour une seul document:
        db.<collection>.updateOne({ index: 2 }, { $set: { index: 10 } });

    // Mettre à jour une seul document:
        db.<collection>.updateMany({ nbOfLesson: { $lt: 40 } }, { $set: { done: true } });


    Opérateur pour les champs simple:
        $inc : incrémente la valeur du champ de la valeur spécifiée.
        $mul : multiplie la valeur du champ par la valeur spécifiée.
        $rename : permet de renommer un champ.
        $set : permet de définir la valeur d'un champ.
        $unset : supprime un champ.

    Opérateur pour les champ de type tableau:
        $pop : permet de supprimer le premier (en passant -1) ou le dernier (en passant 1) élément d'un tableau.
        $pull : supprime les éléments d'un tableau qui respecte une ou plusieurs conditions.
        $pullAll : supprime les éléments d'un tableau qui ont pour valeur l'un des éléments du tableau spécifié.
        $push : ajoute l'élément spécifié à un tableau.

        Exemple:
            Ajoute "Vélo" dans le tableau seulement si il existe.
            db.users.updateOne({activities: {$exists: true}}, {$push: {activities: "Vélo"}});
*/





/* Supprimer un document

    // Supprimer un seul document:
        db.<collection>.deleteOne({ index: 1 });

    // Supprimer plusieurs documents
        db.<collection>.deleteMany();
        db.<collection>.deleteMany({ index: { $gt: 2 } });
*/