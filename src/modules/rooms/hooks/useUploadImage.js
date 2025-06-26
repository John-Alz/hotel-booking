import axios from "axios";
import { useState } from "react";


export const useUpLoadImage = () => {

    const preset_name = 'jAjx4c'
    const cloud_name = 'dbl9yxo4p'

    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(false)

    const uploadImage = async (e) => {
        const files = e.target.files;
        console.log(files);
        const uploadedImages = [];

        setLoading(true)

        try {
            for (let i = 0; i < files.length; i++) {
                const data = new FormData();
                data.append('file', files[i])
                data.append('upload_preset', preset_name);

                const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, data)
                console.log(response.data);
                const file = response.data;

                uploadedImages.push(file.secure_url)

            }
            setImage(prev => [...prev, ...uploadedImages])
            setLoading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }
    }

    return {
        loading,
        image,
        uploadImage
    }


}