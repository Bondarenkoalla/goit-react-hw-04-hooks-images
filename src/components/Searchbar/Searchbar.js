// import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Searchbar.module.css";
import { toast } from "react-toastify";
import React, { useState} from "react";
const Searchbar = ({onSubmit}) => {
  const [searchPictureName, setSearchPictureName] = useState("");
  
   const onInputChange = (event) => {
   setSearchPictureName( event.currentTarget.value.toLowerCase()    );
  };
  const onFormSubmit = (event) => {
    event.preventDefault();
    if (searchPictureName.trim() === "") {
      return toast("Введите имя картинки");
    }
   onSubmit(searchPictureName);
    setSearchPictureName(  "" );
  };

  return (
          <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={onFormSubmit}>
          <button type="submit" className={styles.SearchForm_button}>
            <span className={styles.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={styles.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchPictureName}
            onChange={onInputChange}
          />
        </form>
      </header>
  )
}


// class Searchbar extends Component {
//   state = {
//     searchPictureName: "",
//   };
//   onInputChange = (event) => {
//     this.setState({
//       searchPictureName: event.currentTarget.value.toLowerCase(),
//     });
//   };
//   onFormSubmit = (event) => {
//     event.preventDefault();
//     if (this.state.searchPictureName.trim() === "") {
//       return toast("Введите имя картинки");
//     }
//     this.props.onSubmit(this.state.searchPictureName);
//     this.setState({ searchPictureName: "" });
//   };
//   render() {
//     return (
//       <header className={styles.Searchbar}>
//         <form className={styles.SearchForm} onSubmit={this.onFormSubmit}>
//           <button type="submit" className={styles.SearchForm_button}>
//             <span className={styles.SearchForm_button_label}>Search</span>
//           </button>

//           <input
//             className={styles.SearchForm_input}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.searchPictureName}
//             onChange={this.onInputChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
