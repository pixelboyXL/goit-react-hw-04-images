import PropTypes from 'prop-types';

export const ErrorImg = ({ errorImg }) => {
    return (
        <img className="ErrorImg" src={errorImg} alt="Wow dude, try one more time" />
    );
};

ErrorImg.propTypes = {
    errorImg: PropTypes.string.isRequired,
};