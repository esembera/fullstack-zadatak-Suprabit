import React from "react";

const Pagination = ({moviesPerPage, movies, paginate, currentPage}) => {

    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(movies/moviesPerPage); i++){
        if(Math.abs(i-currentPage)<=4){
            pageNumbers.push(i);
        } 
    }

    return (
        <ul className="pagination center">


            
            {pageNumbers.map(number => (
                <li key={number} className="waves-effect" style={currentPage == number ? {backgroundColor:"#f9a825"} : {} }><a onClick={() => paginate(number)}>{number}</a>

                </li>
        
            ))}
        </ul>
    )

}

export default Pagination;