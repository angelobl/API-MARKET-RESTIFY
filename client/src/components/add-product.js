import React, { useCallback, useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
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

const AddProduct = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageURL, setimageURL] = useState(null);
  const imageRef = useRef();
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      console.log(file);
      props.handleFile(file);
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
        //props.handleFile(reader.result)
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    async function fetchResults() {
      setIsLoading(true);
      const results = await predict(imageURL, imageRef);
      setIsLoading(false);
      props.handleResults(results);
    }
    fetchResults();
  }, [imageURL]);
  //<ImageClassifier file={file} handleResults={props.handleResults}/>

  return (
    <div className="page-container">
      <div
        className="content"
        style={{ flexDirection: "row", height: "50%", width: "60%" }}
      >
        <div style={{ flexBasis: "60%",paddingRight:"10px"}}>
          <form onSubmit={props.handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              name="productName"
              onChange={props.handleChange}
            />
            <input
              type="text"
              placeholder="Price"
              name="productPrice"
              onChange={props.handleChange}
            />
            <div {...getRootProps()} style={{ cursor: "pointer" }}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>

            <button className="btn waves-effect waves-light app-btn">
              Añadir Producto
            </button>
          </form>
        </div>
        <div
          style={{
            minHeight: "300px",
            width: "300px",
            display: "inline-block"
          }}
        >
          <img
            src={imageURL}
            ref={imageRef}
            style={{ maxHeight: "300px", maxWidth: "300px" }}
          />
          <div
            class="preloader-wrapper small active"
            style={{ display: isLoading ? "" : "none", marginLeft: "40%" }}
          >
            <div class="spinner-layer spinner-green-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div>
              <div class="gap-patch">
                <div class="circle"></div>
              </div>
              <div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
