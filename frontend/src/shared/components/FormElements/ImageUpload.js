import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const chooseImageHandler = () => {
    filePickerRef.current.click();
  };

  const imageChosenHandler = (event) => {
    let chosenFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      chosenFile = event.target.files[0];
      setFile(chosenFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, chosenFile, fileIsValid);
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={imageChosenHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewImage && <img src={previewImage} alt="Preview" />}
          {!previewImage && <p>Please upload an image.</p>}
        </div>
        <Button type="button" onClick={chooseImageHandler}>
          Choose image
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
