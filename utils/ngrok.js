const ngrok = require('@ngrok/ngrok');

exports.connect = async function() {
    try {
        const listener = await ngrok.forward({addr: 8080, authtoken_from_env: true});
        return listener.url();
    } catch(err) {
        console.error(err);
    }
}

exports.close = async function() {
    try {
        const listener = await ngrok.getListenerByUrl(url);
        await listener.close();
    } catch (err) {
        console.error(err);
    }
}
