import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { useFirebase } from 'react-redux-firebase'

export default function Todos() {
    useFirebaseConnect([
        'items',
        'messages',
        'recommended'
        // { path: '/todos' } // object notation
    ])
    const firebase = useFirebase()

    function addSampleTodo() {
        const sampleTodo = { text: 'Sample', done: false }
        return firebase.push('todos', sampleTodo)
    }


    const todos = useSelector((state) => state.firebase.ordered)

    // if (!isLoaded(todos)) {
    //     return <div>Loading...</div>
    // }

    // if (isEmpty(todos)) {
    //     return <div>Todos List Is Empty</div>
    // }

    return (
        <div>
            <button onClick={() => console.log(todos)}></button>
            <button onClick={addSampleTodo}>Add</button>
            {/* <ul>
                {Object.keys(todos).map((key, id) => (
                    <div>
                        <button onClick={() => console.log(todos)}>todos</button>
                    </div>
                ))}
            </ul> */}
        </div>
    )
}