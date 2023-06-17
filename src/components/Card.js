// 부트스트랩을 이용해서 카드를 만든다.
// 카드 형식은 다른 페이지에서도 사용할 수 있으므로 컴포넌트로 생성

import PropTypes from 'prop-types';

const Card = ({ title, onClick, children }) => {
    return (
        <div
            className="card mb-3 cursor-pointer"
            onClick={onClick}
        >
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div>{title}</div>
                    {children && <div>{children}</div>}
                </div>
            </div>
        </div>
    )
};

Card.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element,
    onClick: PropTypes.func,
}

Card.defaultProps = {
    children: null,
    onClick: () => { },
};

export default Card;