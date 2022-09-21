const { Kid } = require('../models/photoshoot');
const {cloudinary} = require("../cloudinary");
const nonce = require('../utils/nonce');

// Index page of kids photoshoot

module.exports.index = async (req, res) => {
    const kids = await Kid.find({});
    res.render('sesja-dziecieca/index', { kids, 
                                          style: 'photo-gallery', 
                                          title:"Fotografia dziecięca - sesja roczkowa | Fotograf Bielsko", 
                                          metaDescription: "Sesja dziecięca jest niepowtarzalną możliwością na uchwycenie ulotnych momentów. Zdjęcia to piękna pamiątka, do której będziemy mogli wracać przez całe życie.",
                                          metaKeywords: "fotograf bielsko, cennik sesji zdjęciowej, fotografia bielsko, fotograf bielsko-biała, sesja studyjna, sesja w plenerze, sesja zdjęciowa, sesja dziecięca, sesje dziecięce, fotograf dziecięcy", 
                                          canonicalTag:"https://karolinapastuszak.pl/sesja-dziecieca",
                                          nonce: nonce });
};

// Creating a new kids photoshoot

module.exports.createKidsPshoot = async (req, res, next) => {
    const kids = new Kid(req.body.kids);
    kids.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    kids.owner = req.user._id;
    await kids.save();
    console.log(kids);
    req.flash('success', 'Dodałaś zdjęcie');
    // req.flash('success', 'Brawo! Stworzyłaś nową sesję dziecięcą. Przepiękna!!');
    res.redirect(`/sesja-dziecieca/${kids._id}`)
};

// Render a new kids photoshoot page

module.exports.renderNewPshoot = (req, res) => {
    res.render('sesja-dziecieca/new', { style: 'photo-gallery', 
                                        title:"Fotografia dziecięca - sesja roczkowa | Fotograf Bielsko", 
                                        metaDescription: "", 
                                        metaKeywords: "", 
                                        canonicalTag:"https://karolinapastuszak.pl/sesja-dziecieca",
                                        nonce: nonce });
};

// Showing details of the photoshoot

module.exports.showKidsPshoot = async (req, res) => {
    const { id } = req.params;
    const kids = await Kid.findById(id).populate('owner');
    if(!kids) {
        req.flash('error', 'Oj coś nie działa, nie mogę znaleźć takiej sesji');
        return res.redirect('/sesja-dziecieca');
    }

    res.render('sesja-dziecieca/show', { kids, 
                                         style: 'photo-gallery', 
                                         title:"Fotografia dziecięca - sesja roczkowa | Fotograf Bielsko",
                                        metaDescription: "", 
                                        metaKeywords: "", 
                                        canonicalTag:"https://karolinapastuszak.pl/sesja-dziecieca",
                                        nonce: nonce })
};

// Render update/edit photoshoot page

module.exports.renderEditPshoot = async (req, res) => {
    const { id } = req.params;
    const kids = await Kid.findById(id);
    if(!kids) {
        req.flash('error', 'Oj coś nie działa, nie mogę znaleźć takiej sesji');
        return res.redirect('/dzieci');
    }
    res.render('sesja-dziecieca/edit', { kids, 
                                        style: 'photo-gallery', 
                                        title:"Fotografia dziecięca - sesja roczkowa | Fotograf Bielsko", 
                                        metaDescription: "", 
                                        metaKeywords: "", 
                                        canonicalTag:"https://karolinapastuszak.pl/sesja-dziecieca",
                                        nonce: nonce })
};

// Update/edit photoshoot

module.exports.editKidsPshoot = async (req, res) => {
    const { id } = req.params;
    const kids = await Kid.findByIdAndUpdate(id, { ...req.body.kids });
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    kids.images.push(...imgs);
    console.log(imgs);
    await kids.save();
    // if (req.body.deleteImages) {
    //     for(let filename of req.body.deleteImages){
    //         await cloudinary.uploader.destroy(filename);
    //     }
    //     await kids.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}})
    //     console.log(kids) 
    // }
    req.flash('success', 'Super! Zaktualizowałaś tą sesję')
    res.redirect(`${kids._id}`)
};

// Delete photoshoot

module.exports.deleteKidsPshoot = async (req, res) => {
    const { id } = req.params;
    const kids = await Kid.findByIdAndDelete(id);
        if (kids.images) {
          for (const img of kids.images) {
            await cloudinary.uploader.destroy(img.filename);
          }
        };
    req.flash('success', 'Usunęłaś zdjęcie')
    // req.flash('success', 'Usunęłaś sesję dziecięcą. I dobrze!')
    res.redirect('/sesja-dziecieca')
};