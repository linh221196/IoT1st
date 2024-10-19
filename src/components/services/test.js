import { Button } from "react-bootstrap"
import { useFetchUser } from "./useFetchUser"
const Test = () => {
    const { listUser, isLoading, error } = useFetchUser();
    return (
        <>
            test page

            <Button onClick={() => console.log(listUser)}>Fetch List</Button>
            <ul>
                {isLoading ? <p>Loading</p> : error ? <p>error</p> : <p>sucess</p>}
                {listUser.map((user) => (
                    <li>{user.email}</li>)
                )}

            </ul>
        </>)

}
export default Test