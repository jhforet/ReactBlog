const HomePage = () => {
    return (
        <div className="container title_cover text-center">
            <div className="row align-items-start">
                <div className="col g-col-4 bg1"></div>
                <div className="col g-col-4 bg2"></div>
                <div className="col g-col-4 bg3"></div>
            </div>
            <div className="title">
                아이유의 소소한 이야기
                <button
                    className="btn btn-dark"
                    href='/blogs'
                >
                    블로그 보기
                </button>
            </div>
        </div >
    );
};

export default HomePage;