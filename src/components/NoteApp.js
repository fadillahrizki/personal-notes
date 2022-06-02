import Header from './Header'
import Body from './Body'
import {getInitialData} from '../utils/index'
import { useState } from 'react'

export default function NoteApp(){

    const [data,setData] = useState(getInitialData())
    const [search,setSearch] = useState([])
    const [isSearch, setIsSearch] = useState(false)

    function handleAdd(note){
        setData([...data,note])
    }

    function handleDelete(id){
        setData(data.filter(note=>note.id!==id))
    }

    function handleAction(id){
        setData(data.filter(note=>{
            if(note.id===id){
                note.archived = !note.archived
            }
            return note
        }))
    }

    function handleSearch(keyword){
        if(keyword.length){
            setIsSearch(true)
        }else{
            setIsSearch(false)
        }
        
        setSearch(data.filter(note=>note.title.toLowerCase().includes(keyword.toLowerCase())))
    }

    return(
        <>
            <Header onSearch={handleSearch} />
            <Body data={isSearch ? search : data} onAdd={handleAdd} onDelete={handleDelete} onAction={handleAction}/>
        </>
    )
}
