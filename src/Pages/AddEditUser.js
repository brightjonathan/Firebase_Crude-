import {useState, useEffect} from 'react'
import {Form, Button, Grid } from 'semantic-ui-react';
import { storage, db } from '../Firebase-config'
import { useParams, useNavigate} from 'react-router-dom'
//import { toast } from 'react-toastify';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import Spinner from '../Component/Spinner';

//State to store the data of the user
const initialstate = {
  name: '',
  email: '',
  infor: '',
  contact: ''
};

const AddEditUser = () => {

   const navigate = useNavigate();
   const {id} = useParams();

 
  //state for my data 
  const [data, setdata] = useState(initialstate);
  const {name, email , infor, contact} = data;

  const [imgfile, setimgfile] = useState(null);
  const [progress, setprogress] = useState();
  //const [error, seterror] = useState();
  const [isSubmit, setissubmit] = useState(false);


  //useEffect for updating the a specific file
  useEffect(()=>{
    id && getSingleUser()
  },[])

  
  //functionaling for populating user data
  const getSingleUser = async ()=>{
    const docRef = doc(db, 'ImagesPostThree', id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setdata({...snapshot.data()});
    }
  }


   //useEffect for uploading img to firebase/storage
   useEffect(()=>{
    const uploadFile = ()=>{
      const name = new Date() + imgfile.name;
      const storageRef = ref(storage,  `imagesThree/${imgfile.name}`)
      const uploadTask = uploadBytesResumable(storageRef, imgfile);
  
      uploadTask.on('status_changed', (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setprogress(progress);
  
        let State;
        switch (snapshot.state) {
          case 0:
            State = 'paused';
            console.log('Upload is pause')
            break;
          case 1:
            State = 'Running'
            console.log('Upload is Running') 
            break; 
          default:
            break;
        }
  
      }, (err)=>{
        console.log(err)
      }, ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
          setdata((prev) => ({...prev, imgUrl: url}))
        })
      })
    }

    imgfile  &&  uploadFile();
    },[imgfile])
  

  //funct. targetting our input 
  const handleChange = (e)=> {
    setdata({...data, [e.target.name]: e.target.value})
  };

 
  const handleSubmit = async (e) =>{
      e.preventDefault();
      if (imgfile == null) return;
       //validate();
       //ImgchangeHandler();
       setissubmit(true);


       if(!id){
        try {
          await addDoc(collection(db, 'ImagesPostThree'), {
            ...data, 
            timestamp: serverTimestamp()
          })
        } catch (err) {
         console.log(err)
        }
       }else{
        try {
          await updateDoc(doc(db, 'ImagesPostThree', id), {
            ...data, 
            timestamp: serverTimestamp()
          })
        } catch (err) {
          console.log(err)
        }
       }



      
      navigate('/')
      //alert('uploaded successfully')
  }

 


  return (
    <div>
      <Grid centered verticalAlign='middle' columns='3' style={{height: '80vh'}}>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <div>
              {isSubmit ? <Spinner />: (
                <>
                <h2> { id ? 'Update user' : 'Add user'}</h2>

                <Form onSubmit={handleSubmit}>
                  <Form.Input label='Name' placeholder='Enter Your name' name='name' 
                  onChange={handleChange} 
                  value={name} 
                  autoFocus
                  />

                 <Form.Input label='Email' placeholder='Enter Your email' name='email' 
                  onChange={handleChange} 
                  value={email} 
                  />

                 <Form.TextArea label='Infor' placeholder='Enter your infor' name='infor' 
                  onChange={handleChange} 
                  value={infor} 
                  />

                 <Form.Input label='Contact' placeholder='Enter Your Contact' name='contact' 
                  onChange={handleChange} 
                  value={contact} 
                  />

                 <Form.Input label='upload' type='file' onChange={(e)=> setimgfile(e.target.files[0])} />
                 <Button primary type='submit' disabled={progress !== null && progress < 100 }> Upload </Button>
                </Form>
                </>
                
              )}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default AddEditUser


 //validating inputs field
 // const validate = ()=>{
 //  if(!name || !email || !infor || !contact ){
 //   toast.error('all inputs are required')
 //  }


  //    const types = ['image/png', 'image/jpeg'];
  //    //let selected = e.target.files[0];

  //    if (imgfile &&  types.includes(imgfile.type)) {
  //      setimgfile(imgfile)
  //    }else{
  //      //setimgfile(null);
  //      toast.error('png or jpeg file needed')
  //    }

  // }

  //  const ImgchangeHandler = (e)=>{
  //       //validating the file types
  //     const types = ['image/png', 'image/jpeg'];
  //     //let selected = e.target.files[0];

  //     if (selected &&  types.includes(selected.type)) {
  //       setimgfile(selected)
  //     }else{
  //       setimgfile(null);
  //       toast.error('png or jpeg file needed')
  //     }

  //  }


