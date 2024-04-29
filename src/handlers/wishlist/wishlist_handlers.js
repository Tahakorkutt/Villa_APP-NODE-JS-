const WishlistService = require('../../services/wishlist/wishlist_service');
const Response = require("../../lib/Response");
const VillasService = require('../../services/villa/villas_service')

const createWishlist = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { villa_id } = req.body;
    await WishlistService.createWishlist(user_id, villa_id);
    res.json(Response.succesResponse({succes: true}));
  } catch (error) {
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

const deleteWishlist = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { villa_id } = req.body;
    await WishlistService.deleteWishlist(user_id, villa_id);
    res.json(Response.succesResponse({succes: true}));
  } catch (error) {
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

const getUserWishlist = async (req, res) => {
  const { user_id } = req.params;
  try {
    
    const wishlist = await WishlistService.getWishListbyUserId(user_id);
    const villaIds = wishlist.villa_ids;
    
    const responseArray = [];
    await Promise.all(villaIds.map(async (villaId) => {
      const villa = await VillasService.findByIdVillas(villaId);
      let responseObj = {
        id: villa._id,
        top_att_name: villa.top_att_name,
        top_att_color: villa.top_att_color,
        villa_img: villa.villa_img,
        villa_name: villa.villa_province + " " + villa.villa_type,
        villa_province: villa.villa_province,
        villa_fixed_price: villa.villa_fixed_price,
        villa_main_attributes: villa.villa_attribute
      };
      responseArray.push(responseObj);
    }));
    
    res.json(responseArray); // Villa verilerini JSON olarak döndür
  } catch (error) {
    console.error(error);
    res.status(500).json("Bir hata oluştu: " + error.message);
  }
}

module.exports = {
  createWishlist,
  deleteWishlist,
  getUserWishlist
}