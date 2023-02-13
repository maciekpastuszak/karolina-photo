const { Easter } = require('../models/photoshoot');
const {cloudinary} = require("../cloudinary");
const nonce = require('../utils/nonce');

// Index page of easter photoshoot

module.exports.index = async (req, res) => {
    const easter = await Easter.find({});
    res.render('sesja-wielkanocna/index', { easter, 
                                          style: 'photo-gallery', 
                                          title:"Sesja wielkanocna w Bielsku-Białej | Fotograf Bielsko", 
                                          metaDescription: "Mini sesja wielkanocna w studio w Bielsku-Białej. Zapraszam do zapoznania się z ofertą. Spraw sobie oraz bliskim Ci osobom pamiątkę na całe życie.",
                                          metaKeywords: "fotograf bielsko, cennik sesji zdjęciowej, fotografia bielsko, fotograf bielsko-biała, sesja studyjna, sesja w plenerze, sesja zdjęciowa, sesja dziecięca, sesje dziecięce, sesja wielkanocna", 
                                          canonicalTag:"https://karolinapastuszak.pl/sesja-wielkanocna",
                                          nonce: nonce });
};

// Creating a new easter photoshoot

module.exports.createEasterPshoot = async (req, res, next) => {
    const easter = new Easter(req.body.easter);
    easter.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    easter.owner = req.user._id;
    await easter.save();

    req.flash('success', 'Dodałaś zdjęcie');
    // req.flash('success', 'Brawo! Stworzyłaś nową sesję dziecięcą. Przepiękna!!');
    res.redirect(`/sesja-wielkanocna/${easter._id}`)
};

// Render a new easter photoshoot page

module.exports.renderNewPshoot = (req, res) => {
                                        res.render('sesja-wielkanocna/new', { style: 'photo-gallery', 
                                        title:"Sesja wielkanocna w Bielsku-Białej | Fotograf Bielsko", 
                                        metaDescription: "Mini sesja wielkanocna w studio w Bielsku-Białej. Zapraszam do zapoznania się z ofertą. Spraw sobie oraz bliskim Ci osobom pamiątkę na całe życie.",
                                        metaKeywords: "fotograf bielsko, cennik sesji zdjęciowej, fotografia bielsko, fotograf bielsko-biała, sesja studyjna, sesja w plenerze, sesja zdjęciowa, sesja dziecięca, sesje dziecięce, sesja wielkanocna", 
                                        canonicalTag:"https://karolinapastuszak.pl/sesja-wielkanocna",
                                        nonce: nonce });
};

// Showing details of the photoshoot

module.exports.showEasterPshoot = async (req, res) => {
    const { id } = req.params;
    const easter = await Easter.findById(id).populate('owner');
    if(!easter) {
        req.flash('error', 'Oj coś nie działa, nie mogę znaleźć takiej sesji');
        return res.redirect('/sesja-wielkanocna');
    }

    res.render('sesja-wielkanocna/show', { easter, style: 'photo-gallery',
                                            title:"Sesja wielkanocna w Bielsku-Białej | Fotograf Bielsko", 
                                            metaDescription: "Mini sesja wielkanocna w studio w Bielsku-Białej. Zapraszam do zapoznania się z ofertą. Spraw sobie oraz bliskim Ci osobom pamiątkę na całe życie.",
                                            metaKeywords: "fotograf bielsko, cennik sesji zdjęciowej, fotografia bielsko, fotograf bielsko-biała, sesja studyjna, sesja w plenerze, sesja zdjęciowa, sesja dziecięca, sesje dziecięce, sesja wielkanocna", 
                                            canonicalTag:"https://karolinapastuszak.pl/sesja-wielkanocna",
                                            nonce: nonce });
};

// Render update/edit photoshoot page

module.exports.renderEditPshoot = async (req, res) => {
    const { id } = req.params;
    const easter = await Easter.findById(id);
    if(!easter) {
        req.flash('error', 'Oj coś nie działa, nie mogę znaleźć takiej sesji');
        return res.redirect('/sesja-wielkanocna');
    }
    res.render('sesja-wielkanocna/edit', { easter, 
                                        style: 'photo-gallery', 
                                        title:"Sesja wielkanocna w Bielsku-Białej | Fotograf Bielsko", 
                                        metaDescription: "Mini sesja wielkanocna w studio w Bielsku-Białej. Zapraszam do zapoznania się z ofertą. Spraw sobie oraz bliskim Ci osobom pamiątkę na całe życie.",
                                        metaKeywords: "fotograf bielsko, cennik sesji zdjęciowej, fotografia bielsko, fotograf bielsko-biała, sesja studyjna, sesja w plenerze, sesja zdjęciowa, sesja dziecięca, sesje dziecięce, sesja wielkanocna", 
                                        canonicalTag:"https://karolinapastuszak.pl/sesja-wielkanocna",
                                        nonce: nonce });
};

// Update/edit photoshoot

module.exports.editEasterPshoot = async (req, res) => {
    const { id } = req.params;
    const easter = await Easter.findByIdAndUpdate(id, { ...req.body.easter });
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    christmas.images.push(...imgs);
    console.log(imgs);
    await easter.save();
    // if (req.body.deleteImages) {
    //     for(let filename of req.body.deleteImages){
    //         await cloudinary.uploader.destroy(filename);
    //     }
    //     await kids.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}})
    //     console.log(kids) 
    // }
    req.flash('success', 'Super! Zaktualizowałaś tą sesję')
    res.redirect(`${easter._id}`)
};

// Delete photoshoot

module.exports.deleteEasterPshoot = async (req, res) => {
    const { id } = req.params;
    const easter = await Easter.findByIdAndDelete(id);
        if (easter.images) {
          for (const img of easter.images) {
            await cloudinary.uploader.destroy(img.filename);
          }
        };
    req.flash('success', 'Usunęłaś zdjęcie')
    // req.flash('success', 'Usunęłaś sesję dziecięcą. I dobrze!')
    res.redirect('/sesja-wielkanocna')
};