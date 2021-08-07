// import React, { Component } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageGalleryItem from "./components/ImageGalleryItem/ImageGalleryItem";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import React, { useState, useEffect } from "react";

const App = () => {
  const [pictures, setPictures] = useState([]);
  const [searchPictureName, setSearchPictureName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalAlt, setModalAlt] = useState("");
  const [currentPageImages, setCurrentPageImages] = useState("");
  useEffect(() => {
    if (!searchPictureName) {
      return;
    }
    fetchImages();
  }, [searchPictureName]);

  const onFormSubmit = (searchPicture) => {
    setSearchPictureName(searchPicture);
    setCurrentPage(1);
    setPictures([]);
  };
  const toggleModal = () => {
    setModal(!modal);
  };
  const onPictureClick = (e) => {
    setModalUrl(e.currentTarget.getAttribute("url"));
    setModalAlt(e.currentTarget.getAttribute("alt"));
    toggleModal();
  };

  const fetchImages = () => {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchPictureName}&page=${currentPage}&per_page=12&key=21861129-b5e52c4cca63d1835e3548bf1`;
    setLoading(true);
    setError(null);

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(({ hits }) => {
        if (hits.length !== 0) {
          return hits;
        }
        return Promise.reject(new Error("No such pictures found"));
      })
      .then((pictures) => {
        setPictures((prevPictures) => [...prevPictures, ...pictures]);
        setCurrentPage((prevState) => prevState + 1);
        setCurrentPageImages([...pictures]);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  };
  const shouldRenderLoadMoreButton =
    !(currentPageImages.length < 12) && !loading;
  return (
    <>
      <Searchbar onSubmit={onFormSubmit} />
      {error && <p>{error.message}</p>}
      {loading && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      )}

      <ImageGallery>
        {pictures.map(({ largeImageURL, tags, webformatURL, id }) => (
          <ImageGalleryItem
            largeImageURL={largeImageURL}
            tags={tags}
            webformatURL={webformatURL}
            key={id}
            onPictureClick={onPictureClick}
          />
        ))}
      </ImageGallery>
      {modal && <Modal src={modalUrl} alt={modalAlt} onClose={toggleModal} />}
      {shouldRenderLoadMoreButton && !error && (
        <Button onFetchImages={fetchImages} />
      )}

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

// class App extends Component {
//   state = {
//     pictures: [],
//     searchPictureName: "",
//     currentPage: 1,
//     error: null,
//     loading: false,
//     modal: false,
//     modalUrl: "",
//     modalAlt: "",
//     currentPageImages: "",
//   };

//   onFormSubmit = (searchPicture) => {
//     this.setState({
//       searchPictureName: searchPicture,
//         currentPage: 1,
//       pictures: [],
//     });
//   };
//   toggleModal = () => {
//     this.setState(({ modal }) => ({
//       modal: !modal,
//     }));
//   };
//   onPictureClick = (e) => {
//     this.setState({
//       modalUrl: e.currentTarget.getAttribute("url"),
//       modalAlt: e.currentTarget.getAttribute("alt"),
//     });
//     this.toggleModal();
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const currentName = this.state.searchPictureName;
//     const prevName = prevState.searchPictureName;
//     if (prevName !== currentName) {
//       this.fetchImages();
//       }

//   }
//   fetchImages = () => {
//     const currentName = this.state.searchPictureName;
//     const currentPage = this.state.currentPage;
//     const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${currentName}&page=${currentPage}&per_page=12&key=21861129-b5e52c4cca63d1835e3548bf1`;

//     this.setState({ loading: true,  error: null });
//     fetch(url)
//       .then((response) => {
//         return response.json();
//       })
//       .then(({ hits }) => {
//         if (hits.length !== 0) {
//           return hits;
//         }
//         return Promise.reject(new Error("No such pictures found"));
//       })
//       .then((pictures) =>
//         this.setState((prevState) => ({
//           pictures: [...prevState.pictures, ...pictures],
//           currentPage: prevState.currentPage + 1,
//           currentPageImages: [...pictures],
//         }))
//       )

//       .catch((error) => {
//         this.setState({ error });
//       })
//       .finally(() => this.setState({ loading: false }));
//   };

//   render() {
//     const {
//       pictures,
//       loading,
//       error,
//       modal,
//       modalUrl,
//       modalAlt,
//       currentPageImages,
//     } = this.state;
//     const shouldRenderLoadMoreButton =
//       !(currentPageImages.length < 12) && !loading;
//     return (
//       <>
//         <Searchbar onSubmit={this.onFormSubmit} />
//         {error && <p>{error.message}</p>}
//         {loading && (
//           <Loader
//             type="Puff"
//             color="#00BFFF"
//             height={100}
//             width={100}
//             timeout={3000}
//           />
//         )}

//         <ImageGallery>
//           {pictures.map(({ largeImageURL, tags, webformatURL, id }) => (
//             <ImageGalleryItem
//               largeImageURL={largeImageURL}
//               tags={tags}
//               webformatURL={webformatURL}
//               key={id}
//               onPictureClick={this.onPictureClick}
//             />
//           ))}
//         </ImageGallery>
//         {modal && (
//           <Modal src={modalUrl} alt={modalAlt} onClose={this.toggleModal} />

//         )}
//         {shouldRenderLoadMoreButton && !error && (
//           <Button onFetchImages={this.fetchImages} />
//         )}

//         <ToastContainer
//           position="top-center"
//           autoClose={2000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick={false}
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//         />
//       </>
//     );
//   }
// }
export default App;
