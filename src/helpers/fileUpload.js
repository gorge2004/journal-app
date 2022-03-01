

export const fileUpload = async (file) => {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/domw6ewde/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData,
        });
        if (resp.ok) {
            const cloudResponse = await resp.json();
            return cloudResponse.secure_url;
        }else{
            return null;
            //throw await resp.json();
        }
    } catch (error) {
        throw error;
    }

    //return
};
