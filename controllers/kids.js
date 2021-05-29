const { Kids } = require('../models/photoshoot');
const {cloudinary} = require("../cloudinary");

// Index page of photoshoot

module.exports.index = async (req, res) => {
    const kids = await Kids.find({});
    res.render('ps-kids/index', { kids, style: 'photo-gallery' });
};

// Creating a new photoshoot

module.exports.createKidsPshoot = async (req, res) => {
    const kids = new Kids(req.body.kids);
    kids.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    kids.owner = req.user._id;
    await kids.save();
    req.flash('success', 'Brawo! Stworzyłaś nową sesję dziecięcą. Przepiękna!!');
    res.redirect(`/kids/${kids._id}`)
};

// Render a new photoshoot page

module.exports.renderNewPshoot = (req, res) => {
    res.render('ps-kids/new', { style: 'photo-gallery' });
};

// Showing details of the photoshoot

module.exports.showKidsPshoot = async (req, res) => {
    const { id } = req.params;
    const kids = await Kids.findById(id).populate('owner');
    if(!kids) {
        req.flash('error', 'Oj coś nie działa, nie mogę znaleźć takiej sesji');
        return res.redirect('/kids');
    }
    res.render('ps-kids/show', { kids, style: 'photo-gallery' })
};

// Render update/edit photoshoot page

module.exports.renderEditPshoot = async (req, res) => {
    const { id } = req.params;
    const kids = await Kids.findById(id);
    if(!kids) {
        req.flash('error', 'Oj coś nie działa, nie mogę znaleźć takiej sesji');
        return res.redirect('/kids');
    }
    res.render('ps-kids/edit', { kids, style: 'photo-gallery' })
};

// Update/edit photoshoot

module.exports.editKidsPshoot = async (req, res) => {
    const { id } = req.params;
    const kids = await Kids.findByIdAndUpdate(id, { ...req.body.kids });
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    kids.images.push(...imgs);
    await kids.save();
    if (req.body.deleteImages) {
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await kids.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}})
        console.log(kids) 
    }
    req.flash('success', 'Super! Zaktualizowałaś tą sesję')
    res.redirect(`${kids._id}`)
};

// Delete photoshoot

module.exports.deleteKidsPshoot = async (req, res) => {
    const { id } = req.params;
    const kids = await Kids.findByIdAndDelete(id);
        if (kids.images) {
          for (const img of kids.images) {
            await cloudinary.uploader.destroy(img.filename);
          }
        };
    req.flash('success', 'Usunęłaś sesję dziecięcą. I dobrze!')
    res.redirect('/kids')
};

