const nonce = require('../utils/nonce');

module.exports.tummyOffer = (req, res) => {
    res.render('oferta/oferta-brzuszkowa', {    style: 'offer', 
                                          title:"Fotografia brzuszkowa | Karolina Pastuszak", 
                                          metaDescription: "Sesja brzuszkowa w studio lub w plenerze. Zapraszam do zapoznania się z ofertą. Spraw sobie oraz bliskim Ci osobom pamiątkę na całe życie.",
                                          metaKeywords: "fotograf bielsko, sesja brzuszkowa, sesja ciązowa", 
                                          canonicalTag:"https://karolinapastuszak.pl/oferta/sesja-brzuszkowa",
                                          nonce: nonce });
};

module.exports.tummyFamilyOffer = (req, res) => {
    res.render('oferta/oferta-ciazowa-rodzinna', {    style: 'offer', 
                                          title:"Fotografia ciążowa rodzinna | Karolina Pastuszak", 
                                          metaDescription: "Sesja ciążowa sesja zdjęciowa w studio lub w plenerze. Zapraszam do zapoznania się z ofertą. Spraw sobie oraz bliskim Ci osobom pamiątkę na całe życie.",
                                          metaKeywords: "fotograf bielsko, sesja brzuszkowa, sesja ciążowa", 
                                          canonicalTag:"https://karolinapastuszak.pl/oferta/sesja-ciazowa-rodzinna",
                                          nonce: nonce });
};

module.exports.kidsOffer = (req, res) => {
    res.render('oferta/oferta-dziecieca', {    style: 'offer', 
                                          title:"Sesja dziecięca Bielsko-Biała | Karolina Pastuszak", 
                                          metaDescription: "Dziecięca sesja zdjęciowa w studio lub w plenerze. Zapraszam do zapoznania się z ofertą. Spraw sobie oraz bliskim Ci osobom pamiątkę na całe życie",
                                          metaKeywords: "fotograf bielsko, sesja dziecięca", 
                                          canonicalTag:"https://karolinapastuszak.pl/oferta/sesja-dziecieca",
                                          nonce: nonce });
};

module.exports.communionOffer = (req, res) => {
    res.render('oferta/oferta-komunijna', {    style: 'offer', 
                                          title:"Sesja komunijna Bielsko-Biała | Karolina Pastuszak", 
                                          metaDescription: "Sesja komunijna w studio lub w plenerze. Zapraszam do zapoznania się z ofertą. Spraw sobie oraz bliskim Ci osobom pamiątkę na całe życie",
                                          metaKeywords: "fotograf bielsko, sesja komunijna", 
                                          canonicalTag:"https://karolinapastuszak.pl/oferta/sesja-komunijna",
                                          nonce: nonce });
};