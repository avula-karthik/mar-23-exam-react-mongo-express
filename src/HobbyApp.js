import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
const HobbyApp = () => {
    let [hobbies, setHobbies] = useState([
        { name: 'cooking', description: 'nice ', doc: '2022-03-29' },
    ]);
    useEffect(() => {
        getHobbies();
    }, []);
    const getHobbies = () => {
        axios
            .get('/hobbies')
            .then((res) => setHobbies(res.data))
            .catch((error) => {
                console.log(error);
            });
    };
    const addHobby = (event) => {
        event.preventDefault();
        let hobbyObject = {
            name: event.target.name.value,
            description: event.target.description.value,
            doc: event.target.date.value,
        };
        axios
            .post('/hobbies', hobbyObject)
            .then((res) => {
                getHobbies();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const deleteHobby = (indexToDel) => {
        axios
            .delete('/hobbies/' + indexToDel)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        getHobbies();
    };

    return (
        <div className='todoappclass'>
            <h1>Hobby app with express and mongo</h1>
            <form onSubmit={addHobby}>
                <input type='text' name='name' placeholder='name..' />
                <input
                    type='text'
                    name='description'
                    placeholder='description..'
                />
                <input type='date' name='date' />
                <button>Add</button>
            </form>
            {hobbies.map((val, index) => {
                return (
                    <div className='border'>
                        Name : {val.name} <br />
                        description : {val.description}
                        Date : {val.doc}
                        <button
                            onClick={() => {
                                deleteHobby(`${val._id}`);
                            }}
                        >
                            Delete this hobby
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
export default HobbyApp;
