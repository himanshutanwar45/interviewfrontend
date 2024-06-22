import React from 'react'

const ShowQuestions = (props) => {

    const {item} = props

    return (
        <>
            <div key={item._id}>
                <h4>{item.questions}</h4>
                <p dangerouslySetInnerHTML={{ __html: item.answers }}></p>
            </div>
            <hr></hr>
        </>
    )
}

export default ShowQuestions
