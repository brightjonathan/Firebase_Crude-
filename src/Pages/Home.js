import {useEffect, useState} from 'react'
import {db} from '../Firebase-config'
import {Button, Card, Grid, Container, Image} from 'semantic-ui-react'
import {useNavigate} from 'react-router-dom'
import { collection, onSnapshot } from 'firebase/firestore'



const Home = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(()=>{
     setloading(true);
     const unsub = onSnapshot(collection(db, 'ImagesPostThree'), (snapshot)=>{
      let list = [];
      snapshot.docs.forEach((doc)=> {
        list.push({id: doc.id, ...doc.data()})
      });
      setUsers(list);
      setloading(false)
     }, (err)=>{
      console.log(err)
     });

     //returning the function
     return ()=>{
      unsub();
     }

  },[])

  return (
   <Container>
    <Card.Group>
      <Grid columns={4} stackable>
          {users && users.map((item)=>(
            <Grid.Column key={item.id}>
              <Card>
                <Card.Content>
                  <Image src={item.imgUrl} size='medium' style={{height: '150px', width: '150px'}} />
                  <Card.Header style={{marginTop: '10px'}}> {item.name} </Card.Header>
                  <Card.Description> {item.email} </Card.Description>
                </Card.Content>
                <Card.Content extra>
                   <div>
                    <Button color='green' onClick={()=> navigate(`/update/:${item.id}`)}> update </Button>
                    <Button color='purple'> View </Button>
                   </div>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
      </Grid>
    </Card.Group>
   </Container>
  )
}

export default Home
