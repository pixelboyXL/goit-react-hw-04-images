import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ data: { source, alt }, onToggleModal }) => {
    useEffect(() => {
        window.addEventListener("keydown", onToggleModal);
        return () => {
            window.removeEventListener("keydown", onToggleModal);
        }
    }, [onToggleModal]);
    
    return (
        <div className="Overlay" onClick={onToggleModal}>
            <div className="Modal">
                <img src={source} alt={alt} />
            </div>
        </div>
    );
};

Modal.propTypes = {
    data: PropTypes.shape({
        source: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
    }).isRequired,
    onToggleModal: PropTypes.func.isRequired,
};