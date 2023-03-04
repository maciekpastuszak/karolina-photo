const nonce = require('../utils/nonce');

module.exports.tummyOffer = (req, res) => {
    res.render('oferta/oferta-brzuszkowa', {    style: 'offer', 
                                          title:"Fotografia brzuszkowa | Fotograf Bielsko", 
                                          metaDescription: "Sesja brzuszkowa w studio lub w plenerze. Zapraszam do zapoznania się z ofertą. Spraw sobie oraz bliskim Ci osobom pamiątkę na całe życie.",
                                          metaKeywords: "fotograf bielsko, sesja brzuszkowa, sesja ciązowa", 
                                          canonicalTag:"https://karolinapastuszak.pl/oferta/sesja-brzuszkowa",
                                          nonce: nonce });
};