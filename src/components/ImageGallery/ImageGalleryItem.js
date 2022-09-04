import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image: { tags, webformatURL, largeImageURL }, onToggleModal }) => {
    return (
        <img className="ImageGalleryItem-image"
        src={webformatURL}
        data-source={largeImageURL}
        alt={tags}
        onClick={onToggleModal} />
    );
};

ImageGalleryItem.propTypes = {
    image: PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }).isRequired,
    onToggleModal: PropTypes.func.isRequired,
};