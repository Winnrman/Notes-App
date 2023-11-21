import axios from 'axios';

function imageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    async function uploadImage(file) {
        const formData = new FormData();
        formData.append('image', file);
      
        try {
          const response = await axios.post('/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          return response.data.imageUrl; // The URL of the uploaded image
        } catch (error) {
          console.error('Failed to upload image:', error);
        }
      }
      
  
    input.onchange = async () => {
      const file = input.files[0];
      // You need to upload this file to your server or a storage service (like AWS S3, Firebase, etc.)
      // and then get the URL of the uploaded file.
      
      // For example, let's assume you have a function to handle the upload:
      const imageUrl = await uploadImage(file);
      
      // Once you have the URL, you insert it into the editor content
      const range = this.quill.getSelection();
      this.quill.insertEmbed(range.index, 'image', imageUrl);
    };
  }
  
    export default imageHandler;