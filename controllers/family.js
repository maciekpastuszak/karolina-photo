const { Family } = require('../models/photoshoot');
const {cloudinary} = require("../cloudinary");
const nonce = require('../utils/nonce');

// Index page of family photoshoots

module.exports.indexFamily = async (req, res) => {
    const family = await Family.find({});
    res.render('sesja-rodzinna/index', { family, 
                                         style: 'photo-gallery', 
                                         title: "Sesja rodzinna - w studio i w plenerze | Fotograf Bielsko", 
                                         metaDescription: "Sesja rodzinna to nie tylko wspaniała pamiątka, ale również prawdziwa przygoda, którą przeżyjecie razem. Zdjęcia rodzinne można zaplanować w studio lub w plenerze.",
                                         metaKeywords: "fotograf bielsko, fotografia bielsko, fotograf bielsko-biała, sesja rodzinna, sesja studyjna, sesja w plenerze, sesja zdjęciowa, sesja rodzinna w plenerze, fotografia rodzinna, sesje rodzinne, sesja zdjęciowa rodzinna, rodzinna sesja zdjęciowa, sesja rodzinna w studio",
                                         canonicalTag:"https://karolinapastuszak.pl/sesja-rodzinna",
                                         nonce: nonce  });
};

// Creating a new family photoshoot

module.exports.createFamilyPshoot = async (req, res) => {
    const family = new Family(req.body.family);
    family.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    family.owner = req.user._id;
    await family.save();
    req.flash('success', 'Dodałaś zdjęcie!!');
    // req.flash('success', 'Brawo! Stworzyłaś rodzinną. Przepiękna!!');
    res.redirect(`/sesja-rodzinna/${family._id}`)
};

// Render a new family photoshoot page

module.exports.renderNewFamilyPshoot = (req, res) => {
    res.render('sesja-rodzinna/new', { style: 'photo-gallery',
                                       title: "Sesje rodzinne", 
                                       metaDescription: "Sesje rodzinne | Karolina Pastuszak Photography",
                                       metaKeywords: "", 
                                       canonicalTag:"https://karolinapastuszak.pl/sesja-rodzinna",
                                       nonce: nonce  });
};

// Showing details of the photoshoot

module.exports.showFamilyPshoot = async (req, res) => {
    const { id } = req.params;
    const family = await Family.findById(id).populate('owner');
    if(!family) {
        req.flash('error', 'Oj coś nie działa, nie mogę znaleźć takiej sesji');
        return res.redirect('/rodzinne');
    }
    res.render('sesja-rodzinna/show', { family,
                                        style: 'photo-gallery',
                                        title: "Sesje rodzinne", 
                                        metaDescription: "Sesje rodzinne | Karolina Pastuszak Photography",
                                        metaKeywords: "",
                                        canonicalTag:"https://karolinapastuszak.pl/sesja-rodzinna",
                                        nonce: nonce  })
};

// Render update/edit family photoshoot page

module.exports.renderEditFamilyPshoot = async (req, res) => {
    const { id } = req.params;
    const family = await Family.findById(id);
    if(!family) {
        req.flash('error', 'Oj coś nie działa, nie mogę znaleźć takiej sesji');
        return res.redirect('/rodzinne');
    }
    res.render('sesja-rodzinna/edit', { family,
                                        style: 'photo-gallery', 
                                        title: "Sesje rodzinne", 
                                        metaDescription: "Sesje rodzinne | Karolina Pastuszak Photography",
                                        metaKeywords: "", 
                                        canonicalTag:"https://karolinapastuszak.pl/sesja-rodzinna",
                                        nonce: nonce  })
};

// Update/edit family photoshoot

module.exports.editFamilyPshoot = async (req, res) => {
    const { id } = req.params;
    const family = await Family.findByIdAndUpdate(id, { ...req.body.family });
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    family.images.push(...imgs);
    await family.save();
    if (req.body.deleteImages) {
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await family.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}})
        console.log(family) 
    }
    req.flash('success', 'Super! Zaktualizowałaś tą sesję')
    res.redirect(`${family._id}`)
};

// Delete family photoshoot

module.exports.deleteFamilyPshoot = async (req, res) => {
    const { id } = req.params;
    const family = await Family.findByIdAndDelete(id);
        if (family.images) {
          for (const img of family.images) {
            await cloudinary.uploader.destroy(img.filename);
          }
        };
    req.flash('success', 'Usunęłaś zdjęcie')
    // req.flash('success', 'Usunęłaś sesję dziecięcą. I dobrze!')
    res.redirect('/sesja-rodzinna')
};

