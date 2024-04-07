import React, { useRef, useState } from "react";
import img from "../../assets/Group3(1).png";
import img1 from "../../assets/Group2(1).png";
import img2 from "../../assets/outputex.jpg";
import gray_img from "../../assets/gray_img.jpg"
import "./InsertionPage.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddAPhotoRounded";
import ProcessingBar from '../../component/Proccessbar/Proccessbar.jsx';
{
  /* <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handlePredict}>Predict</button> */
}

function InsertionPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [Choose, setChoose] = useState(false);
  const fileInputRef = useRef(null);
  const img_prev = useRef(null);
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState("")

  const startLoading = () => {
    setLoading(true);
    img_prev.current.src=gray_img;
    setTimeout(() => {
      setLoading(false);
      img_prev.current.src=img2;
    }, 3000);

  };
  const handleFileChange = async (event) => {
    setSelectedFile(event.target.files[0]);
    event.preventDefault()
    const form = new FormData()
    form.append("image", selectedFile)
    form.append("user",window.localStorage.getItem("user_id"))
    const res = await fetch("http://127.0.0.1:8000/api/image-upload/", {
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(form)
    })

    const resJson = await res.json()
    if(resJson.status=="ok"){
      setImg(resJson.url)
    }else{
      alert(resJson.error)
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handlePredClick = () => {
    startLoading()
    if (selectedFile) {
      // Perform file upload logic here
      console.log("Uploading file:", selectedFile);
      // You can use FormData to upload the file via API
      // const formData = new FormData();
      // formData.append('file', selectedFile);
      // axios.post('/upload', formData);
    } else {
      console.log("Error");
    }
  };

  return (
    <>
      <div className="button-container">
        <button className="button" onClick={handleButtonClick}>
          <AddCircleOutlineIcon />
          Insert
        </button>
        <input
          ref={fileInputRef}
          className="file-input"
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }} // Hide the file input
        />
        <div className="preview" >
          <img ref={img_prev} src={img} alt="" width={920} height={920}/>
        </div>
        <ProcessingBar loading={loading} />
        <button className="button center" onClick={handlePredClick}>
          <AddCircleOutlineIcon />
          Predict
        </button>
      </div>
    </>
  );
}

export default InsertionPage;
