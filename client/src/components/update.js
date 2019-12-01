import React, { useCallback, useState, useRef, useEffect } from "react";
import * as ml5 from "ml5";

const predict = async (imageURL, imageRef) => {
    if (!imageURL) return;
    try {
      const classifier = await ml5.imageClassifier("MobileNet");
  
      const results = await classifier.predict(imageRef.current);
      console.log(results);
  
      //this.props.handleResults(results);
      return results;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

const Update = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [imageURL, setimageURL] = useState(null);
    const imageRef = useRef();
    const onDropImage = useCallback(e => {
      e.preventDefault();
      let file = e.dataTransfer.files[0];
      console.log(file);
      if(file.type!=="image/png" && file.type!=="image/jpeg"){
        alert("Only jpg and png format are accepted")
        return
      }
      if(file.size>16000000)
      {
        alert("Only 16mb files are accepted")
        return
      }
      
      //if(file.type==="")
      props.handleFiles("fileImage",file);
      //imageRef.srcObject = file;
      //setFile(URL.createObjectURL(file[0]));
      const reader = new FileReader();
  
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        //console.log(binaryStr)
        setimageURL(reader.result);
        //console.log(binaryStr);
        //props.handleFile(reader.result)
      };
      reader.readAsDataURL(file);
    }, []);

    useEffect(() => {
      async function fetchResults() {
        setIsLoading(true);
        const results = await predict(props.image, imageRef);
        setIsLoading(false);
        //props.handleResults(results);
        props.handleFiles("prediction",results)
      }
      fetchResults();
    }, []);
  
    useEffect(() => {
      async function fetchResults() {
        setIsLoading(true);
        const results = await predict(imageURL, imageRef);
        setIsLoading(false);
        //props.handleResults(results);
        props.handleFiles("prediction",results)
      }
      fetchResults();
    }, [imageURL]);


    return (
        <div className="page-container">
          <div
            className="content"
            style={{ flexDirection: "row", height: "50%", width: "60%" }}
          >
          <div style={{ flexBasis: "60%", paddingRight: "10px" }}>
            <form onSubmit={props.handleUpdate}>
              <input
                type="text"
                placeholder="Name"
                name="productName"
                onChange={props.handleChange}
                value={props.productName}
              />
              <input
                type="text"
                placeholder="Price"
                name="productPrice"
                onChange={props.handleChange}
                value={props.productPrice}
              />
              <button className="btn waves-effect waves-light">
                Actualizar Producto
              </button>
              <div
                onDragOver={e => e.preventDefault()}
                onDrop={onDropImage}
                className="dropbox"
              >
                <p>Drag and Drop your image here</p>
              </div>
            </form>
          </div>
          <div className="">
            <img
              src={imageURL ? imageURL : props.image}
              ref={imageRef}
              style={{ maxHeight: "300px", maxWidth: "300px" }}
            />
            <div
            className="preloader-wrapper small active"
            style={{ display: isLoading ? "" : "none", marginLeft: "40%" }}
          >
            <div className="spinner-layer spinner-green-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
          </div>
          </div>
        </div>
      );
} 

export default Update;
