import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import styled from 'styled-components';

const List = styled.ul`
    margin:30px 20px;
`;


const Pagination = ({ pagesQuantity, currentPage }) => {

    let pages = [];
    for (let i = 1; i <= pagesQuantity; i++) {
        pages.push(
            <li key={`page${i}`} className={currentPage == i ? "active" : "waves-effect"}>
                <Link as={`/product/list/${i}`} href={`/product/list?page=${i}`}><a>{i}</a></Link>
            </li>
        );
    }

    return <List className="pagination">{pages}</List>;
};

const mapStateToProps = (state) => ({
    pagesQuantity: state.pagination.pagesQuantity,
    currentPage: state.pagination.currentPage
});


export default connect(mapStateToProps)(Pagination);