import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';


          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloundinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null
        //upload the file on cloudinary
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
        //file has been uploaded to cloudinary sussessfull
        console.log("file has been uploaded to cloudinary",response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the file from local storage
        return null
    }
}

export  {uploadOnCloundinary}

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });