import React from 'react';

const PageHeader = ({titleText}) => {
    return(
        <div className="row mx-auto text-center">
            <div className="col-12 mx-auto my-5">
                <h1>{titleText}</h1>
            </div>
        </div>
    );
};

export default PageHeader;