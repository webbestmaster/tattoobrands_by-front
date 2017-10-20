const React = require('react');
const {Component} = React;
const classnames = require('classnames');

class ProductPreview extends Component {
    render() {
        const view = this;
        const {props} = view;
        const {product} = props;
        const {slug, name, description, images, price, promotable} = product;

        return <a onContextMenu={evt => evt.preventDefault()}
            href={'/product/' + slug}
            className={classnames('product-preview', {'product-preview--promotable': promotable})}>
            <div className="product-preview__image"
                style={{backgroundImage: 'url(' + images[0] + ')'}}/>
            <h3 className="product-preview__name">{name}</h3>
            <div className="product-preview__description" dangerouslySetInnerHTML={{__html: description}}/>
            <span className="product-preview__price">{price} руб.</span>
        </a>;
    }
}

module.exports.ProductPreview = ProductPreview;
