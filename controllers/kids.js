const { Kids } = require('../models/photoshoot');

module.exports.index = async (req, res) => {
    const kids = await Kids.find({});
    res.render('ps-kids/index', { kids, style: 'photo-gallery' });
};

module.exports.createKidsPshoot = async (req, res) => {
    const kids = new Kids(req.body.kids);
    kids.owner = req.user._id;
    await kids.save();
        req.flash('success', 'Stworzyłaś nową sesję dziecięcą');
    res.redirect(`/kids/${kids._id}`)
};

module.exports.renderNewPshoot = (req, res) => {
    res.render('ps-kids/new', { style: 'app' });
};

module.exports.showKidsPshoot = async (req, res) => {
    const { id } = req.params;
    const kids = await Kids.findById(id).populate('owner');
    if(!kids) {
        req.flash('error', 'Nie mogę znaleźć takiej sesji');
        return res.redirect('/kids');
    }
    res.render('ps-kids/show', { kids, style: 'photo-gallery' })
};

module.exports.renderEditPshoot = async (req, res) => {
    const { id } = req.params;
    const kids = await Kids.findById(id);
    if(!kids) {
        req.flash('error', 'Nie mogę znaleźć takiej sesji');
        return res.redirect('/kids');
    }
    res.render('ps-kids/edit', { kids, style: 'app' })
};

module.exports.editKidsPshoot = async (req, res) => {
    const { id } = req.params;
    const kids = await Kids.findByIdAndUpdate(id, { ...req.body.kids });
    req.flash('success', 'Zaktualizowałaś sesję dziecięcą')
    res.redirect(`${kids._id}`)
};

module.exports.deleteKidsPshoot = async (req, res) => {
    const { id } = req.params;
    await Kids.findByIdAndDelete(id);
    req.flash('success', 'Usunęłaś sesję dziecięcą')
    res.redirect('/kids')
};

