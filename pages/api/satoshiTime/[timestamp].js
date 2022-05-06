const bitcoin = require('bitcoinjs-lib');
const bip32 = require('bip32')
const bip39 = require('bip39');

function getWIF(node, network) {
    return node.toWIF() 
}
function getAddress(node, network) {
    const config = { pubkey: node.publicKey, network }
    const { address } = bitcoin.payments.p2wpkh(config)
    return address
}
export default async function satoshiTime (req = NextApiRequest, res = NextApiResponse) {
    if(req.method == 'GET') {
        const { timestamp } = req.query;
        let path = `m/84'/0'/0'/0/${timestamp}`
        let mnemonic = Array.from({length:23}).map(x => "satoshi");      
        mnemonic.push("birth");
        const seed = bip39.mnemonicToSeedSync(mnemonic.join(' '));
        const root = bip32.fromSeed(seed);
        var address = getAddress(root.derivePath(path))
        var keyPair = bitcoin.ECPair.fromWIF(getWIF(root.derivePath(path))) 
        var publicKey = Buffer.from(keyPair.publicKey).toString('hex')
        return res.json({address, publicKey,});
    }
}
    
