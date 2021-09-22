//import { useQuery,gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import SelfInfo from './SelfInfo';
import { Selfinfo_QUERY } from '../../apis/apis';


//if find out kidId at backend, show kid information using component "SelfInfo".
export default function ShowSelfInfo( { id,code } ) {
    
    const GetSelfInfo = () => {
        const { data, loading, error } = useQuery(Selfinfo_QUERY, {
            variables: {
                id: id,
                code:code.code,
            }
        })

        if (loading) return <h2>Still loading..</h2>
        if (error) return <h2>There is an error!  </h2>
         
        return (
            <div>
                <SelfInfo data={data} />
            </div>
        )         
    }

    return (
        <div>
            {
             (
                 ( id && code  )
                 ?
                GetSelfInfo() 
                 :
                <SelfInfo  />
                )
            }
        </div>
    )
}
