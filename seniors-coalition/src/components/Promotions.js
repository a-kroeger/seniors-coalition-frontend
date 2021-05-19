import React from 'react'
import Promotion from './Promotion'
import Spinner from './Spinner'

function Promotions(props){

    const { promotions, loading } = props

    if (loading) { 
        return <Spinner />
    } else {
    return (
        <div>
        { props.promotions[0] && <div className="promotions">
           <h3 className="promotion-header">Promotions</h3>
            {promotions.map(promotions => (
                <Promotion
                    promotions={promotions}
                    key={promotions.id}
                 />
            ))}
        </div>}
    </div>
    )
}
}

export default Promotions;
