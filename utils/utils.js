exports.decodeObject = (doc) => {
    const attributs = Object.keys(doc);
    let message = '';

    for(let i = 1; i < attributs.length - 2; i++) {
        let attribut = attributs[i];
        message += `*${attribut} :* ${doc[attribut]}\n` 
    }

    return message;
}