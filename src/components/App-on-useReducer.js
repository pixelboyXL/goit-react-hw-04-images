import { useEffect, useReducer } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastWarn, toastSuccess, toastError, toastInfoDuplication } from './services/toasts';
import { fetchImages } from "./services/fetchImages";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { MagnifyingGlass } from 'react-loader-spinner';
import { Button } from "components/Button/Button";
import { Modal } from "components/Modal/Modal";
import { ErrorImg } from "./ErrorImg/ErrorImg";
import img from 'components/images/Best-Coming-Soon-and-404-Error-Page-Templates-for-Your-Unique-Websites.jpg';

function changeState(state, action) {
    switch (action.type) {
        case 'set-text':
            return { ...state, text: action.payload };
        case 'set-page':
            return { ...state, page: action.payload };
        case 'set-images':
            return { ...state, images: action.payload };
        case 'add-images':
            return { ...state, images: [...state.images, ...action.payload] };
        case 'set-large-image-data':
            return { ...state, largeImageData: action.payload };
        case 'set-loading':
            return { ...state, loading: action.payload };
        case 'set-is-modal-open':
            return { ...state, isModalOpen: action.payload };
        case 'set-error':
            return { ...state, error: action.payload };
        default:
        throw new Error(`Unsupported action type ${action.type}`);
    };
};

export const AppOnUseReducer = () => {
    const [state, dispatch] = useReducer(changeState, {
        text: '',
        page: 1,
        images: [],
        largeImageData: {},
        loading: false,
        isModalOpen: false,
        isError: false,
    });
    
    const { text, page, images, largeImageData, loading, isModalOpen, isError } = state;

    useEffect(() => {
        if (text === '') {
            return;
        };
        dispatch({ type: 'set-loading', payload: true });
        fetchImages(text, page).then(({ totalHits, hits }) => {
            if (totalHits === 0) {
                toastWarn();
                dispatch({ type: 'set-loading', payload: false });
                dispatch({ type: 'set-error', payload: true });
                return;
            };
            if (page === 1 && hits.length > 1) {
                toastSuccess();
            };
            const onlyNeedValues = hits.map(({ id, tags, webformatURL, largeImageURL }) => (
                {
                    id,
                    tags,
                    webformatURL,
                    largeImageURL,
                })
            );
            dispatch({ type: 'add-images', payload: onlyNeedValues });
            dispatch({ type: 'set-loading', payload: false });
            dispatch({ type: 'set-error', payload: false });
        }).catch(error => toastError())
            .finally(() => {dispatch({type: 'set-loading', payload: false});
            });
    }, [text, page]);

    const searchImages = searchText => {
        if (text === searchText.trim()) {
            return toastInfoDuplication();
        };
        dispatch({ type: 'set-text', payload: searchText });
        dispatch({ type: 'set-page', payload: 1 });
        dispatch({ type: 'set-images', payload: [] });
        };
    const loadMoreImages = () => dispatch({ type: 'set-page', payload: page + 1 });
    const toggleModal = (event) => {
        const { code } = event;
        const { nodeName, dataset: { source }, alt } = event.target;
        if (nodeName === 'IMG') {
            if (isModalOpen === true) {
                return;
            };
        dispatch({ type: 'set-is-modal-open', payload: true });
        dispatch({
            type: 'set-large-image-data', payload: {
                source,
                alt,
            }});
        };
        if (nodeName === 'DIV' || code === "Escape") {
            dispatch({ type: 'set-is-modal-open', payload: false });
        };
    };

    return (
        <>
        <Searchbar onSubmit={searchImages} />
        {isError === true
            ? <ErrorImg errorImg={img} />
            : images.length > 0
            && <ImageGallery allImages={images} onToggleModal={toggleModal} />
        }
        {loading === true
            ? <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor = '#c0efff'
                color='#3f51b5' />
            : images.length > 0
            && <Button text="Load more" type="button" loadMoreImages={loadMoreImages} />}
            {isModalOpen
            && <Modal data={largeImageData} onToggleModal={toggleModal} />}
            <ToastContainer autoClose={3000} />
        </>
    );
};