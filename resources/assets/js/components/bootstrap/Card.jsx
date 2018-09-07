import React, { Component } from 'react'

export default class Card extends Component {
    constructor(props) {
        super(props)
        this.onMouseOver = this.onMouseOver.bind(this)
    }
    onMouseOver() {
        if(typeof this.props.onMouseOver === 'function') {
            this.props.onMouseOver(this.props.item)
        }
    }

    onMouseOut() {
        if(typeof this.props.onMouseOut === 'function') {
            this.props.onMouseOut(this.props.item)
        }
    }

    render() {
        const {item, highlight} = this.props
        const width = this.props.width || '18rem'
        const linkText = this.props.linkText || 'Artikel anzeigen'
        const mainClass = highlight ? 'card border-dark' : 'card'
        return (
            <div
                className={mainClass}
                style={{width}} key={item.id}
                onMouseEnter={this.onMouseOver}
                onMouseLeave={this.onMouseOut}
            >
                <img className={highlight ? 'card-img' : 'card-img-top'} src={item.image} alt="Card image cap"/>
                {!highlight && (

                    <div className={'card-img-overlay'}>
                        <h5 className="card-title">{item.title}</h5>
                    </div>
                )}
                {highlight && (
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.description}</p>
                        <a
                            href={item.url}
                            className="btn btn-default"
                            target={"_blank"}
                        >
                            {linkText}
                        </a>
                    </div>
                )}
            </div>
        )
    }
}
