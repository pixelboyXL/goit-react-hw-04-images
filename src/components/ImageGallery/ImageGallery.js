import PropTypes from 'prop-types';
import { ImageGalleryItem } from "./ImageGalleryItem";

export const ImageGallery = ({ allImages, ...otherProps }) => {
    return (
        <section>
            <ul className="ImageGallery">
                {allImages.map(oneImage => (
                    <li className="ImageGalleryItem" key={oneImage.id}>
                        <ImageGalleryItem image={oneImage} {...otherProps} />
                    </li>
                ))}
            </ul>
        </section >
    );
};

ImageGallery.propTypes = {
    allImages: PropTypes.array.isRequired,
};