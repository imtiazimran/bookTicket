import laodingGif from '../assets/loading.gif';
const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <img src={laodingGif} alt="loading gif" />
        </div>
    );
};

export default Loading;