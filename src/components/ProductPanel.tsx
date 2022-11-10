import React, { ReactElement } from 'react';
import { ItemProps } from '../types/types';

const ProductPanel = ({id, bodyType, modelName, modelType, imageUrl}: ItemProps): ReactElement => {
    return (
        <div key={id} className="productPanel">
            <h3 className="productPanel__bodyType">{bodyType}</h3>
            <h4 className="productPanel__modelName">{modelName}<span>{modelType}</span></h4>
            <img alt={`image of ` + modelName}  className="productPanel__image" src={imageUrl} />
            <div className="productPanel__linkContainer">
                <a title='Learn' href={`/learn/${id}`}>Learn&nbsp; <i className="icon icon-link-chevron">&nbsp;</i></a>
                <a title='Shop' href={`/shop/${id}`}>Shop&nbsp; <i className="icon icon-link-chevron">&nbsp;</i></a>
            </div>
        </div>
    );
}

export default ProductPanel;