const nonce = require('../utils/nonce');

module.exports.tummyOffer = (req, res) => {
    res.render('oferta/oferta-brzuszkowa', {    style: 'offer', 
                                          title:"Fotografia brzuszkowa | Fotograf Bielsko", 
                                          metaDescription: "Sesja brzuszkowa w studio lub w plenerze. Zapraszam do zapoznania się z ofertą. Spraw sobie oraz bliskim Ci osobom pamiątkę na całe życie.",
                                          metaKeywords: "fotograf bielsko, sesja brzuszkowa, sesja ciązowa", 
                                          canonicalTag:"https://karolinapastuszak.pl/oferta/sesja-brzuszkowa",
                                          nonce: nonce });
};

module.exports.tummyFamilyOffer = (req, res) => {
    res.render('oferta/oferta-ciazowa-rodzinna', {    style: 'offer', 
                                          title:"Fotografia ciążowa rodzinna | Fotograf Bielsko", 
                                          metaDescription: "Sesja ciążowa sesja zdjęciowa w studio lub w plenerze. Zapraszam do zapoznania się z ofertą. Spraw sobie oraz bliskim Ci osobom pamiątkę na całe życie.",
                                          metaKeywords: "fotograf bielsko, sesja brzuszkowa, sesja ciążowa", 
                                          canonicalTag:"https://karolinapastuszak.pl/oferta/sesja-ciazowa-rodzinna",
                                          nonce: nonce });
};