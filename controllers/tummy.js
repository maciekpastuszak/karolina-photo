const { Tummy } = require('../models/photoshoot');
const {cloudinary} = require("../cloudinary");

// Index page of pregnant photoshoot

module.exports.index = async (req, res) => {
    const tummy = await Tummy.find({});
    res.render('ps-tummy/index', { tummy, style: 'photo-gallery' });
};

// Creating a new pregnant photoshoot

module.exports.createTummyPshoot = async (req, res) => {
    const tummy = new Tummy(req.body.tummy);
    tummy.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    tummy.owner = req.user._id;
    await tummy.save();
    req.flash('success', 'Brawo! Stworzyłaś brzuszkową. Przepiękna!!');
    res.redirect(`/tummy/${tummy._id}`)
};

// Render a new pregnant photoshoot page

module.exports.renderNewPshoot = (req, res) => {
    res.render('ps-tummy/new', { style: 'photo-gallery' });
};

// Showing details of the pregnant photoshoot

module.exports.showTummyPshoot = async (req, res) => {
    const { id } = req.params;
    const tummy = await Tummy.findById(id).populate('owner');
    if(!tummy) {
        req.flash('error', 'Oj coś nie działa, nie mogę znaleźć takiej sesji');
        return res.redirect('/tummy');
    }
    res.render('ps-tummy/show', { tummy, style: 'photo-gallery' })
};

// Render update/edit pregnant photoshoot page

module.exports.renderEditPshoot = async (req, res) => {
    const { id } = req.params;
    const tummmy = await Tummy.findById(id);
    if(!tummy) {
        req.flash('error', 'Oj coś nie działa, nie mogę znaleźć takiej sesji');
        return res.redirect('/tummy');
    }
    res.render('ps-tummy/edit', { tummy, style: 'photo-gallery' })
};

// Update/edit pregnant photoshoot

module.exports.editTummyPshoot = async (req, res) => {
    const { id } = req.params;
    const tummy = await Tummy.findByIdAndUpdate(id, { ...req.body.tummy });
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    tummy.images.push(...imgs);
    await tummy.save();
    if (req.body.deleteImages) {
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await tummy.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}})
        console.log(tummy) 
    }
    req.flash('success', 'Super! Zaktualizowałaś tą sesję')
    res.redirect(`${tummy._id}`)
};

// Delete pregnant photoshoot

module.exports.deletePregnantPshoot = async (req, res) => {
    const { id } = req.params;
    const tummy = await Tummy.findByIdAndDelete(id);
        if (tummy.images) {
          for (const img of tummy.images) {
            await cloudinary.uploader.destroy(img.filename);
          }
        };
    req.flash('success', 'Usunęłaś sesję brzuszkową. I dobrze!')
    res.redirect('/tummy')
};
