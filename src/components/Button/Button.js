import PropTypes from 'prop-types';

export const Button = ({ text, type, loadMoreImages }) => {
    return (
        <button type={type} className="Button" onClick={loadMoreImages}>{text}</button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    loadMoreImages: PropTypes.func.isRequired,
};