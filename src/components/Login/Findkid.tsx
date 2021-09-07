import { useQuery } from '@apollo/client';
import { Kid_QUERY } from '../../apis/apis';


//useQuery to find which kid is, and set kidname and kidId to loalstorage.
const Findkid = (id) => {
  
    const { data, loading, error } = useQuery(Kid_QUERY, {
        variables: {
            id: id
        }
    })
    if (loading) return <h2>Still loading..</h2>
    if (error) return <h2>There is an error! </h2>
    localStorage.setItem("Kidname", data.self.name)
    localStorage.setItem("Kidid", data.self.id)

    return (<div></div>
        )
 
}
export default Findkid
