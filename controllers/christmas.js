const { Christmas } = require('../models/photoshoot');
const {cloudinary} = require("../cloudinary");
const nonce = require('../utils/nonce');

// Index page of christmas photoshoot

module.exports.index = async (req, res) => {
    const christmas = await Christmas.find({});
    res.render('sesja-swiateczna/index', { christmas, 
                                          style: 'photo-gallery', 
                                          title:"Dziecięce Mini Sesje Świąteczne | Fotograf Bielsko", 
                                          metaDescription: "Boże Narodzenie to wyjątkowy czas, na który co roku czekają zarówno dzieci jak i dorośli. Zdjęcia świąteczne to piękna pamiątka, do której będziemy mogli wracać przez całe życie.",
                                          metaKeywords: "fotograf bielsko, cennik sesji zdjęciowej, fotografia bielsko, fotograf bielsko-biała, sesja studyjna, sesja w plenerze, sesja zdjęciowa, sesja dziecięca, sesje dziecięce, sesja świąteczna", 
                                          canonicalTag:"https://karolinapastuszak.pl/sesja-swiateczna",
                                          nonce: nonce });
};

// Creating a new chritmas photoshoot

module.exports.createChristmasPshoot = async (req, res, next) => {
    const christmas = new Christmas(req.body.christmas);
    christmas.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    christmas.owner = req.user._id;
    await christmas.save();

    req.flash('success', 'Dodałaś zdjęcie');
    // req.flash('success', 'Brawo! Stworzyłaś nową sesję dziecięcą. Przepiękna!!');
    res.redirect(`/sesja-swiateczna/${christmas._id}`)
};

// Render a new christmas photoshoot page

module.exports.renderNewPshoot = (req, res) => {
                                        res.render('sesja-swiateczna/new', { style: 'photo-gallery', 
                                        title:"Dziecięce Mini Sesje Świąteczne | Fotograf Bielsko", 
                                        metaDescription: "Boże Narodzenie to wyjątkowy czas, na który co roku czekają zarówno dzieci jak i dorośli. Zdjęcia świąteczne to piękna pamiątka, do której będziemy mogli wracać przez całe życie.",
                                        metaKeywords: "fotograf bielsko, cennik sesji zdjęciowej, fotografia bielsko, fotograf bielsko-biała, sesja studyjna, sesja w plenerze, sesja zdjęciowa, sesja dziecięca, sesje dziecięce, sesja świąteczna", 
                                        canonicalTag:"https://karolinapastuszak.pl/sesja-swiateczna",
                                        nonce: nonce });
};

// Showing details of the photoshoot

module.exports.showChristmasPshoot = async (req, res) => {
    const { id } = req.params;
    const christmas = await Christmas.findById(id).populate('owner');
    if(!christmas) {
        req.flash('error', 'Oj coś nie działa, nie mogę znaleźć takiej sesji');
        return res.redirect('/sesja-swiateczna');
    }

    res.render('sesja-swiateczna/show', { christmas, style: 'photo-gallery',
                                        title:"Dziecięce Mini Sesje Świąteczne | Fotograf Bielsko", 
                                        metaDescription: "Boże Narodzenie to wyjątkowy czas, na który co roku czekają zarówno dzieci jak i dorośli. Zdjęcia świąteczne to piękna pamiątka, do której będziemy mogli wracać przez całe życie.",
                                        metaKeywords: "fotograf bielsko, cennik sesji zdjęciowej, fotografia bielsko, fotograf bielsko-biała, sesja studyjna, sesja w plenerze, sesja zdjęciowa, sesja dziecięca, sesje dziecięce, sesja świąteczna", 
                                        canonicalTag:"https://karolinapastuszak.pl/sesja-swiateczna",
                                        nonce: nonce });
};

// Render update/edit photoshoot page

module.exports.renderEditPshoot = async (req, res) => {
    const { id } = req.params;
    const christmas = await Christmas.findById(id);
    if(!christmas) {
        req.flash('error', 'Oj coś nie działa, nie mogę znaleźć takiej sesji');
        return res.redirect('/sesja-swiateczna');
    }
    res.render('sesja-swiateczna/edit', { christmas, 
                                        style: 'photo-gallery', 
                                        title:"Dziecięce Mini Sesje Świąteczne | Fotograf Bielsko", 
                                        metaDescription: "Boże Narodzenie to wyjątkowy czas, na który co roku czekają zarówno dzieci jak i dorośli. Zdjęcia świąteczne to piękna pamiątka, do której będziemy mogli wracać przez całe życie.",
                                        metaKeywords: "fotograf bielsko, cennik sesji zdjęciowej, fotografia bielsko, fotograf bielsko-biała, sesja studyjna, sesja w plenerze, sesja zdjęciowa, sesja dziecięca, sesje dziecięce, sesja świąteczna", 
                                        canonicalTag:"https://karolinapastuszak.pl/sesja-swiateczna",
                                        nonce: nonce });
};

// Update/edit photoshoot

module.exports.editChristmasPshoot = async (req, res) => {
    const { id } = req.params;
    const christmas = await Christmas.findByIdAndUpdate(id, { ...req.body.christmas });
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    christmas.images.push(...imgs);
    console.log(imgs);
    await christmas.save();
    // if (req.body.deleteImages) {
    //     for(let filename of req.body.deleteImages){
    //         await cloudinary.uploader.destroy(filename);
    //     }
    //     await kids.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}})
    //     console.log(kids) 
    // }
    req.flash('success', 'Super! Zaktualizowałaś tą sesję')
    res.redirect(`${christmas._id}`)
};

// Delete photoshoot

module.exports.deleteChristmasPshoot = async (req, res) => {
    const { id } = req.params;
    const christmas = await Christmas.findByIdAndDelete(id);
        if (christmas.images) {
          for (const img of christmas.images) {
            await cloudinary.uploader.destroy(img.filename);
          }
        };
    req.flash('success', 'Usunęłaś zdjęcie')
    // req.flash('success', 'Usunęłaś sesję dziecięcą. I dobrze!')
    res.redirect('/sesja-swiateczna')
};