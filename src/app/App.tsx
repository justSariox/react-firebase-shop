import {Register} from "../common/register";
import {Login} from "../common/login";


const App = () => {
  // const [products, setProducts] = useState([]);
  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const dataRef = await ref(db, 'products');
  //     try {
  //       const snapshot = await get(dataRef)
  //       if (snapshot.exists()) {
  //         setProducts(snapshot.val())
  //         console.log(products)
  //       }
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }
  //
  //   fetchData()
  // }, [])
  return (
     <div>
       <Register/>
       <Login/>
     </div>
  );
};

export default App;
