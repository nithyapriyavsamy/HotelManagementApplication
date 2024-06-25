import { useState,useEffect } from "react";
import './AddHotel.css';
import { ToastContainer, toast } from 'react-toastify';
import { BlobServiceClient } from '@azure/storage-blob';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function AddImage({CloseAddImage,id})
{
    const [hotel, setHotel] = useState({
        "id": 0,
        "hotelId" : Number(id),
        "imageUrl": ""
      })
      var AddImage=()=>
        {
            handleUpload();
        console.log(hotel);
        fetch("http://localhost:5083/api/Image/AddImage",
        {
            "method":"POST",
            headers:{
                "accept": "text/plain",
                "Content-Type": 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body:JSON.stringify(hotel)})
        .then(async (data)=>
        {
            if(data.status == 200)
            {
                toast.success('Added');
                CloseAddImage();
            }
        })
        .catch((err)=>
        {
            console.log(err);
        })
    }
    
  //Blob Add Image;
  const [imageFile, setImageFiles] = useState();
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImageFiles(files);
    const str ="http://127.0.0.1:10000/devstoreaccount1/bigbang3/bigbang3/"+files[0].name
    setHotel({...hotel,imageUrl:str})
  };

  const handleUpload = async () => {
    const AZURITE_BLOB_SERVICE_URL = 'http://localhost:10000';
    const ACCOUNT_NAME = 'devstoreaccount1';
    const ACCOUNT_KEY = 'Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==';
  
    const blobServiceClient = new BlobServiceClient(
      "http://127.0.0.1:10000/devstoreaccount1/bigbang3?sv=2018-03-28&st=2023-08-08T12%3A30%3A23Z&se=2023-08-09T12%3A30%3A23Z&sr=c&sp=racwdl&sig=rRH37j65%2FccSjoRKRdWXGVpM0yFP3OLbcuTUI59KYiQ%3D",
      "?sv=2018-03-28&st=2023-08-08T12%3A30%3A23Z&se=2023-08-09T12%3A30%3A23Z&sr=c&sp=racwdl&sig=rRH37j65%2FccSjoRKRdWXGVpM0yFP3OLbcuTUI59KYiQ%3D"
    );
  
    const containerClient = blobServiceClient.getContainerClient('bigbang3');
        const blobClient = containerClient.getBlobClient(imageFile[0].name);
        const blockBlobClient = blobClient.getBlockBlobClient();
        const result = await blockBlobClient.uploadBrowserData(imageFile[0], {
          blockSize: 4 * 1024 * 1024,
          concurrency: 20,
          onProgress: ev => console.log(ev)
        });
};
     
    
      return (
        <div className="popup">
          <div className="popup-inner">
          <h4><b>Add Amenity</b></h4>
            <div>
             
                    <table>
                <tr>
                    <td>
                        <label><b>Amenity</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input className="myInput"  placeholder="Amenity" type="file" multiple accept="imgage/*"
                            id="email"
                            required
                            onChange={handleImageChange }
                        />
                        </div>
                    </td>
                </tr> 
            </table>
            <button type="button" onClick={AddImage} >Add</button>
            <button type="button" onClick={CloseAddImage} >close</button>
            </div>
          </div>
        </div>
    
    )
}

export default AddImage;