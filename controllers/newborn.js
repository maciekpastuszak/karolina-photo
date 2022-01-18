const { Newborn } = require('../models/photoshoot');
const {cloudinary} = require("../cloudinary");
const nonce = require('../utils/nonce');

// Index page of newborn photoshoot

module.exports.index = async (req, res) => {
    const newborn = await Newborn.find({});
    res.render('noworodki/index', { newborn, style: 'photo-gallery', title:"Sesje noworodkowe", metaDescription: "Sesje noworodkowe | Karolina Pastuszak Photography", metaKeywords: "fotograf bielsko, fotografia dziecięca, sesja noworodkowa śląsk, sesja noworodkowa Bielsko-Biała, sesja niemowlęca", nonce: nonce  });
};

// Creating a new newborn photoshoot

module.exports.createNewbornPshoot = async (req, res) => {
    const newborn = new Newborn(req.body.newborn);
    newborn.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    newborn.owner = req.user._id;
    await newborn.save();
    req.flash('success', 'Brawo! Dodałaś zdjęcie');
    res.redirect(`/noworodki/${newborn._id}`)
};

// Render a new newborn photoshoot page

module.exports.renderNewPshoot = (req, res) => {
    res.render('noworodki/new', { style: 'photo-gallery', title:"Sesje noworodkowe", metaDescription: "Sesje noworodkowe | Karolina Pastuszak Photography", metaKeywords: "fotograf bielsko, fotografia dziecięca, sesja noworodkowa śląsk, sesja noworodkowa Bielsko-Biała, sesja niemowlęca", nonce: nonce });
};

// Showing details of the photoshoot

module.exports.showNewbornPshoot = async (req, res) => {
    const { id } = req.params;
    const newborn = await Newborn.findById(id).populate('owner');
    if(!newborn) {
        req.flash('error', 'Oj coś nie działa, nie mogę znaleźć takiej sesji');
        return res.redirect('/noworodki');
    }
    res.render('noworodki/show', { newborn, style: 'photo-gallery', title:"Sesje noworodkowe", metaDescription: "Sesje noworodkowe | Karolina Pastuszak Photography", metaKeywords: "fotograf bielsko, fotografia dziecięca, sesja noworodkowa śląsk, sesja noworodkowa Bielsko-Biała, sesja niemowlęca", nonce: nonce })
};

// Render update/edit photoshoot page

module.exports.renderEditPshoot = async (req, res) => {
    const { id } = req.params;
    const newborn = await Newborn.findById(id);
    if(!newborn) {
        req.flash('error', 'Oj coś nie działa, nie mogę znaleźć takiej sesji');
        return res.redirect('/noworodki');
    }
    res.render('noworodki/edit', { newborn, style: 'photo-gallery', title:"Sesje noworodkowe", metaDescription: "Sesje noworodkowe | Karolina Pastuszak Photography", metaKeywords: "fotograf bielsko, fotografia dziecięca, sesja noworodkowa śląsk, sesja noworodkowa Bielsko-Biała, sesja niemowlęca", nonce: nonce })
};

// Update/edit photoshoot

module.exports.editNewbornPshoot = async (req, res) => {
    const { id } = req.params;
    const newborn = await Newborn.findByIdAndUpdate(id, { ...req.body.newborn });
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    newborn.images.push(...imgs);
    await newborn.save();
    if (req.body.deleteImages) {
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await newborn.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}})
        console.log(newborn) 
    }
    req.flash('success', 'Super! Zaktualizowałaś tą sesję')
    res.redirect(`${newborn._id}`)
};

// Delete photoshoot

module.exports.deleteNewbornPshoot = async (req, res) => {
    const { id } = req.params;
    const newborn = await Newborn.findByIdAndDelete(id);
        if (newborn.images) {
          for (const img of newborn.images) {
            await cloudinary.uploader.destroy(img.filename);
          }
        };
    req.flash('success', 'Usunęłaś zdjęcie!')
    res.redirect('/noworodki')
};

