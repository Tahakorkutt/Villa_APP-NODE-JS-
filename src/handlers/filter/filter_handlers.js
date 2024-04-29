
const { findByQuery } = require('../../services/user/user_details_service');
const VillasService = require('../../services/villa/villas_service');
const RezervationService = require('../../services/reservation/reservation_service');
const RatingService = require('../../services/villa/villa_rating_service');
const BookingService = require('../../services/booking/booking_service');
const VillaAttributeService = require('../../services/villa/villa_attribute_service');
const Villas = require('../../models/villa/villas_model');
const VillaTypeService = require('../../services/villa/villa_type_service')
const VillaRaitingService = require('../../services/villa/villa_rating_service')

const getFilters = async (req, res) => {
  const query = req.query;
  console.log("filtre", query)
  const extractedData = await extractQueries(query)
  let villas = await getFilteredVillas(extractedData)
  let villasId = villas.map(villa => villa._id);

  if(Object.keys(query).length === 0){
    const filteredVillas = []
    const villa = await VillasService.findMostPopularVillasAll();
    console.log(villa)
    await Promise.all(
      villa.map(async vil => {
        filteredVillas.push(vil._id);
      }))
      villasId = filteredVillas;
    }

  if ("villa_type" in query) {
    const villaTypeParam = query.villa_type
    const selectedVillaTypes = villaTypeParam.split(',')
    const filteredVillas = []
    await Promise.all(
      villasId.map(async villaId => {
        const villa = await VillasService.findByIdVillas(villaId);
        if (selectedVillaTypes.some(type => villa.villa_type.includes(type))) {
          filteredVillas.push(villaId);
        }
      })
    );
    villasId = villasId.filter(villa => filteredVillas.includes(villa._id));
  }
  if ("villa_attribute" in query) {
    const villaAttributeParam = query.villa_attribute
    const selectedVillaAttributes = villaAttributeParam.split(',')
    const filteredVillas = []
    await Promise.all(
      villasId.map(async villaId => {
        const villa = await VillasService.findByIdVillas(villaId);
        await Promise.all(
          villa.villa_attribute.map(async attribute => {
            const villaAttributes = await VillaAttributeService.getAllVillaAttributefindBy(attribute);
            if (selectedVillaAttributes.some(attribute => villa.villa_attribute.includes(attribute))) {
              filteredVillas.push(villaId);
            }
          }))
      })
    );
    villasId = villasId.filter(villa => filteredVillas.includes(villa._id));
  }


  if ("villa_person" in query) {
    const minVillaPerson = parseInt(query.villa_person)
    const filteredVillas = []
    await Promise.all(
      villasId.map(async villaId => {
        const villa = await VillasService.findByIdVillas(villaId)
        if (villa.villa_person >= minVillaPerson) {
          filteredVillas.push(villaId)
        }
      })
    );
    villasId = villasId.filter(villa => filteredVillas.includes(villa._id))
  }


  if ("enter" in query && "out" in query) {
    const filteredVillas = [];
    await Promise.all(
      villasId.map(async villaId => {
        const reservations = await RezervationService.findReservationByVillaIdService(villaId);
        if (
          reservations.every(reservation =>
            !(new Date(query.enter) <= new Date(reservation.date1) && new Date(query.out) >= new Date(reservation.date2)
             || new Date(query.out) >= new Date(reservation.date1) && new Date(query.enter) <= new Date(reservation.date2))
          )
        ) {
          filteredVillas.push(villaId);
        }
      })
    );

    villasId = villasId.filter(villa => filteredVillas.includes(villa));
  }

  if ("villa_rating" in query) {
    const filteredVillas = [];
    await Promise.all(
      villasId.map(async villaId => {
        const rating = await RatingService.findRatingByVillaIdService(villaId);
        if (
          rating.every(rating =>
            !(query.villa_rating > rating.now_rating)
          )
        ) {
          filteredVillas.push(villaId);
        }
      })
    );
    villasId = villasId.filter(villa => filteredVillas.includes(villa._id));
  }

  if ("villa_price" in query) {
    const priceRange = query.villa_price.split(',')
    if (priceRange.length === 2) {
      const minPrice = parseInt(priceRange[0]);
      const maxPrice = parseInt(priceRange[1]);
      const filteredVillas = [];
      await Promise.all(
        villasId.map(async villaId => {
          const villa = await VillasService.findByIdVillas(villaId);
          const booking = await BookingService.findOneByPropertyVillaIdBooking(villaId);
          if ("enter" in query && "out" in query && booking != null) {
            if (new Date(query.enter) >= new Date(booking.date1) && new Date(query.out) <= new Date(booking.date2)) {
              if (booking.price >= minPrice && booking.price <= maxPrice) {
                filteredVillas.push(villaId);
              }
            }
          } else {
            if (villa.villa_fixed_price >= minPrice && villa.villa_fixed_price <= maxPrice) {
              filteredVillas.push(villaId);
            }
          }
        })
      );
      villasId = villasId.filter(villa => filteredVillas.includes(villa._id));
    }
  }
  

  if ("search" in query) {
    const filteredVillas = [];
    const searchQuery = query.search.toLowerCase()

    await Promise.all(
      villasId.map(async villaId => {
        const villa = await VillasService.findByIdVillas(villaId)
        const lowerCaseAddress = villa.villa_adress.toLowerCase()
        const words = lowerCaseAddress.split(' ')

        words.forEach(word => {
          if (word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchQuery.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
            filteredVillas.push(villaId);
          }
        });
      })
    );

    villasId = villasId.filter(villa => filteredVillas.includes(villa._id));
  }
  const setraiting = (villa_raiting) => {
    let result = "";
    if(villa_raiting >= 4){
      result = "Çok İyi"
    } else if(villa_raiting >= 3){
      result = "İyi"
    } else if(villa_raiting >= 2) {
      result = "Orta"
    } else if(villa_raiting >= 1) {
      result = "Kötü"
    } else if(villa_raiting == null){
      result = "Değerlendirme Yapılmamış"
    }
    return result
  }

  const responseArray = [];
  await Promise.all(
    villasId.map(async villaId => {
      const villa = await VillasService.findByIdVillas(villaId)
      const villatype = await VillaTypeService.findByIdVillaType(villa.villa_type)
      const villaraiting = await VillaRaitingService.findLastRating(villaId)
      console.log(villatype)
      let responseObj = {
        id: villa._id,
        top_att_name: villa.top_att_name,
        top_att_color: villa.top_att_color,
        villa_img: villa.villa_img,
        villa_name: villa.villa_province + " " + villatype.villa_type_name,
        villa_province: villa.villa_province,
        villa_fixed_price: villa.villa_fixed_price,
        villa_main_attributes: await VillasService.findVillaAsTrueMainAttribute(villaId),
        villa_raiting: null?villaraiting.now_raiting:"-",
        exceptional: null?setraiting(villaraiting.now_raiting):"Henüz Değerlendirilmedi",
        villa_raiting_total: null?villaraiting.total_raiting:"0",
        total_villa: villasId.length
      };
      responseArray.push(responseObj);
    })
  );

  
  
  res.status(200).json(responseArray);


}


async function getVillasWithMainAttributeTrue(id) {
  try {
    const villasWithMainAttributeTrue = await Villas.findById(id).populate({
      path: 'villa_attribute',
      match: { villa_attribute_main: true },
      select: 'villa_attribute'
    }).exec();

    return villasWithMainAttributeTrue.villa_attribute
  } catch (error) {
    console.error(error);
  }
}
const getFilteredVillas = async (query) => {
  return await VillasService.findByQueryVillas(query)
}

const extractQueries = async (query) => {
  return await Object.fromEntries(Object.entries(query).filter(([key]) => key != 'enter' && key != 'out' && key != 'villa_rating' && key != 'villa_price' && key != 'page' && key != 'search' && key != 'villa_type' && key != 'villa_attribute' && key != 'villa_person'))
}

module.exports = { getFilters }