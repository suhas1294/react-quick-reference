import {useState} from 'react';

export const App = props => {
    // initialise
    const [showModal, setShowModal] = useState(false)

    const btnClickHandler = () => {
        // do some buisness logic if required
        setShowModal(true)
    }

    let content = <p>Click Button to show modal</p>

    if (showModal) {
        content = <p>close modal to proceed</p>
    }

    return(
        <>
            {content}
        </>
    )
}