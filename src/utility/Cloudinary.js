// import { v2 as cloudinary } from 'cloudinary';
const cloudinary = require('cloudinary').v2
cloudinary.config({ 
    cloud_name: 'dmckps0nu', 
        api_key: '686798928468744', 
        api_secret: 'Bma60Xp_IuIHv23ek026dUZ7LsI'
});
module.exports = cloudinary;