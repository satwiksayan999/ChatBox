import React from 'react';
import Messages from './Messages';
import Messageinput from './Messageinput';
import { TiMessages } from "react-icons/ti"
import useConversation from '../../zustand/useConversation';
import { useEffect } from 'react';
import { useAuthContext } from '../../context/user_context';

const Messagecontainer = () => {
    
    const {selectedConversation , setSelectedConversation }=useConversation();

    useEffect(() => {
        
        //cleanup function 
     return () => setSelectedConversation(null);
    } , [setSelectedConversation] );
    

    return (
        <div className='md:min-w-[450px] flex flex-col'>
            {!selectedConversation ? (<Nochatselected />) : (
                <>

                    <div className='bg-slate-500 px-4 py-2 mb-2'>
                        <span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>{selectedConversation.fullname}</span>
                    </div>

                    <Messages />
                    <Messageinput />
                </>
            )}
        </div>
    )
}



export default Messagecontainer;

const Nochatselected = () => {

    const {authUser} = useAuthContext();
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome ❤️ {authUser.fullname} </p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    )
};
