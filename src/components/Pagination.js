// 페이지 관리를 위해서 부트스트랩의 페이지네이션 컴포넌트를 활용
// https://getbootstrap.kr/docs/5.2/components/pagination/
import propTypes from 'prop-types';

const Pagination = ({ currentPage, numberOfPages, onClick, limit }) => {
    const currentSet = Math.ceil(currentPage / limit);
    const startPage = limit * (currentSet - 1) + 1;
    const lastSet = Math.ceil(numberOfPages / limit);

    let numberOfPageForSet = currentSet === lastSet ? numberOfPages % limit : limit
    if (numberOfPageForSet === 0) numberOfPageForSet = limit;

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {currentSet !== 1 && <li className="page-item">
                    <button
                        className="page-link"
                        href="#"
                        onClick={() => onClick(startPage - limit)}
                    >
                        Previous
                    </button>
                </li>}
                {Array(numberOfPageForSet).fill(startPage).map((value, index) => value + index)
                    .map((pageNumber) => {
                        return <li
                            key={pageNumber}
                            className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
                        >
                            <button
                                className='page-link'
                                onClick={() => {
                                    onClick(pageNumber)
                                }}
                            >
                                {pageNumber}
                            </button>
                        </li>
                    })}
                {currentSet !== lastSet && <li className="page-item">
                    <button
                        className="page-link"
                        href="#"
                        onClick={() => onClick(startPage + limit)}
                    >
                        Next
                    </button>
                </li>}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    currentPage: propTypes.number,
    numberOfPages: propTypes.number.isRequired,
    onClick: propTypes.func.isRequired,
    limit: propTypes.number
};

Pagination.defaultProps = {
    currentPage: 1,
    limit: 5
};

export default Pagination;