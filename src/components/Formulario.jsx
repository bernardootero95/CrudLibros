import React, {useState, useEffect} from 'react'
import { db } from '../firebase'
import { collection, doc, addDoc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore'
import { async } from '@firebase/util'

const Formulario = () => {
    const [nombreLibro, setNombreLibro] = useState('')
    const [nombreAutor, setNombreAutor] = useState('')
    const [listaLibros, setListaLibros] = useState([])

    useEffect(()=>{
        const obtenerDatos = async() =>{
            try{
                await onSnapshot(collection(db, 'Libros'), (query) =>{
                    setListaLibros(query.docs.map((doc)=>({...doc.data(), id:doc.id})))
                })

            }catch(error){
                console.log(error)
            }
        }
        obtenerDatos();
    }, [])

    const eliminar = async id =>{
        try{
            await deleteDoc(doc(db,'Libros', id))
        }catch{
            console.log(error)
        }
    }

    const guardarLibros = async (e)=>{
        e.preventDefault()
        try{
            const data = await addDoc(collection(db, 'Libros'),{
                nombreLibro:nombreLibro,
                nombreAutor:nombreAutor
            })

            setListaLibros([...listaLibros, {
                nombreLibro:nombreLibro,
                nombreAutor:nombreAutor,
                id:data.id
            }])

           
            setNombreLibro('')
            setNombreAutor('')

        }catch(error){
            console.log(error)
        }
    }
  return (
    <div className='container mt-5'>
        <h1 className='text-center'>CRUD DE LIBROS</h1>
        <hr/>
        <div className="row">
            <div className="col-8">
                <h4 className="text-center">Listado de Libros</h4>
                <ul className="list-group">
                    {  
                        listaLibros.map(item =>(
                            <li className="list-group-item" key={item.id}>
                                <span className="lead">{item.nombreLibro}-{item.nombreAutor}</span>
                                <button className="btn btn-danger btn-sm float-end mx-2" onClick={()=>eliminar(item.id)} >Eliminar</button>
                                <button className="btn btn-warning btn-sm float-end">Editar</button>
                            </li>
                        ))   
                    }        
                </ul>
            </div>
            <div className="col-4">
                <h4 className="text-center">AGREGAR LIBROS</h4>
                <form onSubmit={guardarLibros}>
                    <input type="text" 
                    className="form-control mb-2" 
                    placeholder='Ingrese Nombre del Libro' 
                    value={nombreLibro}
                    onChange={(e)=>setNombreLibro(e.target.value)}/>

                    <input type="text" className="form-control mb-2" 
                    placeholder='Ingrese Autor del Libro' 
                    value={nombreAutor}
                    onChange={(e)=>setNombreAutor(e.target.value)}/>


                    <button className="btn btn-primary btn-block">Agregar</button>
                </form>
            </div>
        </div>
        
    </div>
  )
}

export default Formulario