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

module.exports.mothersDayOffer = (req, res) => {
    res.render('oferta/oferta-na-dzien-mamy', {    style: 'offer', 
                                          title:"Sesja na Dzień Mamy w Bielsku-Białej | Karolina Pastuszak", 
                                          metaDescription: "Sesja na Dzień Mamy w studio lub w plenerze. Zapraszam do zapoznania się z ofertą. Spraw sobie oraz bliskim Ci osobom pamiątkę na całe życie",
                                          metaKeywords: "fotograf bielsko, Dzień Matki", 
                                          canonicalTag:"https://karolinapastuszak.pl/oferta/sesja-na-dzien-mamy",
                                          nonce: nonce });
};

module.exports.newbornOffer = (req, res) => {
    res.render('oferta/oferta-noworodkowa', {    style: 'offer', 
                                          title:"Sesja noworodkowa w Bielsku-Białej | Karolina Pastuszak", 
                                          metaDescription: "Sesja noworodkowa w profesjonalnym studio. Zapraszam do zapoznania się z ofertą. Spraw sobie oraz bliskim Ci osobom pamiątkę na całe życie",
                                          metaKeywords: "fotograf bielsko, sesja noworodkowa", 
                                          canonicalTag:"https://karolinapastuszak.pl/oferta/sesja-noworodkowa",
                                          nonce: nonce });
};

module.exports.newbornFamilyOffer = (req, res) => {
    res.render('oferta/oferta-noworodkowa-rodzinna', {    style: 'offer', 
                                          title:"Sesja noworodkowa rodzinna w Bielsku-Białej | Karolina Pastuszak", 
                                          metaDescription: "Rodzinna sesja noworodkowa w studio lub w plenerze. Zapraszam do zapoznania się z ofertą. Spraw sobie oraz bliskim Ci osobom pamiątkę na całe życie",
                                          metaKeywords: "fotograf bielsko, rodzinna sesja noworodkowa", 
                                          canonicalTag:"https://karolinapastuszak.pl/oferta/sesja-noworodkowa-rodzinna",
                                          nonce: nonce });
};

module.exports.familyOffer = (req, res) => {
    res.render('oferta/oferta-rodzinna', {    style: 'offer', 
                                          title:"Sesja rodzinna w Bielsku-Białej | Karolina Pastuszak", 
                                          metaDescription: "Sesja zdjęciowa rodzinna w profesjonalnym studio. Zapraszam do zapoznania się z ofertą. Spraw sobie oraz bliskim Ci osobom pamiątkę na całe życie",
                                          metaKeywords: "fotograf bielsko, sesja zdjęciowa rodzinna", 
                                          canonicalTag:"https://karolinapastuszak.pl/oferta/sesja-rodzinna",
                                          nonce: nonce });
};

module.exports.familyOutdoorOffer = (req, res) => {
    res.render('oferta/oferta-rodzinna-w-plenerze', {    style: 'offer', 
                                          title:"Sesja rodzinna w Bielsku-Białej | Karolina Pastuszak", 
                                          metaDescription: "Sesja zdjęciowa rodzinna w plenerze. Zapraszam do zapoznania się z ofertą. Spraw sobie oraz bliskim Ci osobom pamiątkę na całe życie",
                                          metaKeywords: "fotograf bielsko, sesja zdjęciowa rodzinna", 
                                          canonicalTag:"https://karolinapastuszak.pl/oferta/sesja-rodzinna-w-plenerze",
                                          nonce: nonce });
};

module.exports.preschoolOffer = (req, res) => {
    res.render('oferta/oferta-w-przedszkolu', {    style: 'offer', 
                                          title:"Sesja w przedszkolu Bielsko-Biała | Karolina Pastuszak", 
                                          metaDescription: "Sesja w przedszkolu – Bielsko-Biała, Cieszyn, Żywiec, Pszczyna, Czechowice-Dziedzice. Zapraszam do zapoznania się z ofertą. Spraw sobie oraz bliskim Ci osobom pamiątkę na całe życie",
                                          metaKeywords: "fotograf bielsko, sesja przedszkolna, sesja w przedszkolu", 
                                          canonicalTag:"https://karolinapastuszak.pl/oferta/sesja-w-przedszkolu",
                                          nonce: nonce });
};

module.exports.easterOffer = (req, res) => {
    res.render('oferta/oferta-wielkanocna', {    style: 'offer', 
                                          title:"Sesja wielkanocna Bielsko-Biała | Karolina Pastuszak", 
                                          metaDescription: "Mini sesja wielkanocna w studio w Bielsku-Białej. Zapraszam do zapoznania się z ofertą. Spraw sobie oraz bliskim Ci osobom pamiątkę na całe życie",
                                          metaKeywords: "fotograf bielsko, sesja wielkanocna", 
                                          canonicalTag:"https://karolinapastuszak.pl/oferta/sesja-wielkanocna",
                                          nonce: nonce });
};