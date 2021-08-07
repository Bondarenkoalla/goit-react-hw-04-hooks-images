import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.css";
const ImageGalleryItem = ({
  largeImageURL,
  tags,
  webformatURL,

  onPictureClick,
}) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={webformatURL}
        url={largeImageURL}
        alt={tags}
        className={styles.ImageGalleryItem_image}
        onClick={onPictureClick}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  onPictureClick: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
