exports.decodeObject = (doc) => {
    const attributs = Object.keys(doc);
    let message = '';

    for(let i = 1; i < attributs.length ; i++) {
        let attribut = attributs[i];
        if(!attribut.startsWith('_')) {
            message += `*${attribut} :* ${doc[attribut]}\n` 
        }
    }

    return message;
}

exports.encodeMessage = (message) => {
    const doc = {msg: message};
    return doc;
}

exports.formatList = (tab) =>  {
    let list = '';
    for(let i = 0; i < tab.length; i++) {
        list += `${i+1}. ${tab[i]}\n`;
    }
    return list;
}

exports.keyboardFromArray = (tab) => {
    const keyboard = [];
    for(col of tab) {
        keyboard.push([col]);
    }
    return keyboard;
}