const mongoose = require('mongoose');

const villaTypeSchema = new mongoose.Schema({
    villa_location: {type: Object, required: true},
    villa_adress: { type: String, required: true }, //! search edilebilir
    villa_rooms: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'Villarooms' },
    villa_user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'Users' },
    villa_type: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref:'Villatypes' }],
    villa_attribute: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref:'VillaAttribute' }], 
    villa_img: [{ type: String, required: false, default: null}],
    villa_furniture: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'Villafurnitures' },
    villa_info: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'Villainfos' },
    villa_service: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'Villaservices' },
    villa_pool_detail: { type: String, required: true }, //! search edilebilir
    villa_check_info: { type: Object, required: true },
    villa_popular: { type: Number, required: false },
    villa_description: { type: Array, required: true }, //! search edilebilir
    villa_comission: { type: Number, required: false, default: 0 },
    top_att_name: { type: String, required: true },
    top_att_color:{ type: String,  required: true },
    villa_province:{ type: String, required: true },
    villa_person: {type: Number, required: true},
    villa_fixed_price: {type: Number, required: true},
    
    //! additionalservice
});

module.exports = mongoose.model('Villas', villaTypeSchema);
