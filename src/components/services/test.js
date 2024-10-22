import { Button, Container } from "react-bootstrap"
import { useFetchUser } from "./useFetchUser"
import { useDispatch, useSelector } from "react-redux";



const Test = () => {
    //const { listUser, isLoading, error } = useFetchUser();
    const count = useSelector(state => state.counter.count)
    const dispatch = useDispatch();
    return (
        <>
            test custom hook page
            <div>
                {/* <div>
                    <div as='Row'>
                        <Button onClick={() => console.log(listUser)}>Fetch List</Button>
                    </div>
                    <ul>
                        {isLoading ? <p>Loading</p> : error ? <p>error</p> : <p>success</p>}
                        {listUser?.map((user) => (
                            <li>{user?.email}</li>)
                        )}

                    </ul>
                </div> */}
                <div>
                    {/* <Container>
                    <h1>Redux test</h1>
                    {/* redux: 
                    1. defined dispatch + actions => react component
                    2. defined reducer + logic => reducer
                    3. Using Redux's state */}
                    {/* <h2>Count: {count}</h2>
                    <div>
                        <Button onClick={() => dispatch(increaseCounter())}>Increase</Button>
                        <Button onClick={() => dispatch(decreaseCounter())}>Decrease</Button>
                    </div>
                    </Container> */} 
                    
                </div>


            </div>
        </>)

}
export default Test