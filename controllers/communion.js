const { Communion } = require('../models/photoshoot');
const {cloudinary} = require("../cloudinary");
const nonce = require('../utils/nonce');

// Index page of communion photoshoot

module.exports.index = async (req, res) => {
    const communions = await Communion.find({});
    res.render('sesja-komunijna/index', { communions, style: 'photo-gallery', title:"Sesja komunijna - w plenerze i w studio | Fotograf Bielsko", metaDescription: "Na sesję komunijną możemy się umówić już w dniu uroczystości lub w innym dogodnym dla Państwa terminie.", metaKeywords: "fotograf bielsko, fotografia bielsko, fotograf bielsko-biała, sesja studyjna, sesja w plenerze, sesja zdjęciowa, sesja komunijna, zdjęcia komunijne w plenerze, sesja komunijna w plenerze, sesje komunijne, sesja komunijna studio, sesja zdjęciowa komunijna", nonce: nonce });
};

// Creating a new communion photoshoot

module.exports.createCommunionPshoot = async (req, res, next) => {
    const communions = new Communion(req.body.kids);
    communions.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    communions.owner = req.user._id;
    await communions.save();
    req.flash('success', 'Dodałaś zdjęcie');
    // req.flash('success', 'Brawo! Stworzyłaś nową sesję dziecięcą. Przepiękna!!');
    res.redirect(`/sesja-komunijna/${communions._id}`)
};

// Render a new communion photoshoot page

module.exports.renderNewPshoot = (req, res) => {
    res.render('sesja-komunijna/new', { style: 'photo-gallery', title:"Sesje komunijne", metaDescription: "Sesje komunijne | Karolina Pastuszak Photography", metaKeywords: "fotograf bielsko, fotografia dziecięca, sesja komunijna, zdjęcia komunijne, fotograf śląsk", nonce: nonce });
};

// Showing details of the photoshoot

module.exports.showCommunionPshoot = async (req, res) => {
    const { id } = req.params;
    const communions = await Communion.findById(id).populate('owner');
    if(!communions) {
        req.flash('error', 'Oj coś nie działa, nie mogę znaleźć takiej sesji');
        return res.redirect('/komunijne');
    }
    res.render('sesja-komunijna/show', { communions, style: 'photo-gallery', title:"Sesje komunijne",metaDescription: "Sesje komunijne | Karolina Pastuszak Photography", metaKeywords: "", nonce: nonce })
};

// Render update/edit photoshoot page

module.exports.renderEditPshoot = async (req, res) => {
    const { id } = req.params;
    const communions = await Communion.findById(id);
    if(!communions) {
        req.flash('error', 'Oj coś nie działa, nie mogę znaleźć takiej sesji');
        return res.redirect('/komunijne');
    }
    res.render('sesja-komunijna/edit', { communions, style: 'photo-gallery', title:"Sesje komunijne",metaDescription: "Sesje komunijne | Karolina Pastuszak Photography", metaKeywords: "", nonce: nonce })
};

// Update/edit photoshoot

module.exports.editCommunionPshoot = async (req, res) => {
    const { id } = req.params;
    const communions = await Communion.findByIdAndUpdate(id, { ...req.body.communions });
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    communions.images.push(...imgs);
    await communions.save();
    if (req.body.deleteImages) {
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await communions.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}})
        console.log(communions) 
    }
    req.flash('success', 'Super! Zaktualizowałaś tą sesję')
    res.redirect(`${communions._id}`)
};

// Delete photoshoot

module.exports.deleteCommunionPshoot = async (req, res) => {
    const { id } = req.params;
    const communions = await Communion.findByIdAndDelete(id);
        if (communions.images) {
          for (const img of communions.images) {
            await cloudinary.uploader.destroy(img.filename);
          }
        };
    req.flash('success', 'Usunęłaś zdjęcie')
    // req.flash('success', 'Usunęłaś sesję dziecięcą. I dobrze!')
    res.redirect('/sesja-komunijna')
};

