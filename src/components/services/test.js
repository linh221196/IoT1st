import { Button } from "react-bootstrap"
import { useFetchUser } from "./useFetchUser"
const Test = () => {
    const { listUser, isLoading, error } = useFetchUser();
    return (
        <>
            test custom hook page

            <Button onClick={() => console.log(listUser)}>Fetch List</Button>
            <ul>
                {isLoading ? <p>Loading</p> : error ? <p>error</p> : <p>success</p>}
                {listUser.map((user) => (
                    <li>{user.email}</li>)
                )}

            </ul>
        </>)

}
export default Test