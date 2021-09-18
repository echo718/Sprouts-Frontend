//import { useQuery,gql } from '@apollo/client';
import { Self_EDIT } from '../../apis/apis';
import { useMutation } from '@apollo/client';
import React from 'react';

//if change kid information, useMutation API will be used.
export default function EditSelf({ name, age, index,imageURI }) {
    
    const [editSelfToGraphql] = useMutation(Self_EDIT)

    const EditSelfInfo = () => {    
        age = age ? age : "Undefined"
        name = name ? name : "Undefined"
        imageURI = imageURI ? imageURI :"Undefined"
        
        editSelfToGraphql({ variables: { name: name, age: age,imageURI: imageURI } }).then(r => {
            if (r.errors) {
                let err = r.errors.join("\n");
                console.log(err)
                return
            }
            if (r) {
             
            }
        }).catch(reason => {
            console.log(reason)
        })
        return ''
    }

    return (
        <div>
            {EditSelfInfo()}
        </div>
    )
}

