import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import AddPage from "./add-page.component";

import { firestore, storage } from "../../firebase/firebase.utils";
import Loader from "../../components/loader/loader.component";
import animationData from "../../assets/lottie/loadinganimationnormal.json";

const AddPageWithLoader = Loader(AddPage);

const AddPageContainer = ({ history, currentUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    description: "",
    price: "",
  });
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    console.dir(e.target);
    if (e.target.files) {
      const files = await e.target.files;
      setFile(files);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (currentUser.email === "epiratesdev@gmail.com") {
      const collectionRef = firestore.collection("collections");
      const res = await collectionRef.add(formData);
      const uploadRef = storage.ref(`images/${res.id}`);
      for (let i = 0; i < file.length; i++) {
        await uploadRef
          .child(i === 0 ? "main.jpg" : `${i}.jpg`)
          .put(file[i])
          .then((snapshot) => {
            console.log(snapshot, "uploaded");
          });
      }

      setFormData({
        name: "",
        model: "",
        description: "",
        price: "",
      });
      setFile(null);
      setIsLoading(false);
      alert("Uploaded");
    } else {
      alert("YOU don`t have the permission to do that :(");
      history.push("/");
    }
  };
  return (
    <AddPageWithLoader
      {...formData}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleFileChange={handleFileChange}
      isLoading={isLoading}
      animationData={animationData}
      image={file ? file[0] : null}
    />
  );
};

export default withRouter(AddPageContainer);
