import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';


const Searchinput = () => {

   const [search, setSearch] = useState("");
   const { setSelectedConversation } = useConversation();
   const { conversations } = useGetConversations();

   const handleSubmit = (e) => {
      e.preventDefault();

      if (!search) {
         return;
      }

      if (search.length < 3) {
         return toast.error("search term must be atleat 3 char long");
      }

      const conversation = conversations.find((c) => c.fullname.toLowerCase().includes(search.toLowerCase()));

      if (conversation) {
         setSelectedConversation(conversation);
         setSearch("");
      } else {
         toast.error("no such user found");
      }

   };




   return (
      <form className='flex items-center gap-2' onSubmit={handleSubmit} >
         <input type="text" placeholder='search..' className='input input-bordered rounded-full' value={search} onChange={(e) => setSearch(e.target.value)} ></input>
         <button type="submit" className='btn btn-circle bg-sky-500 text-white'>
            <CiSearch />
         </button>

      </form>
   )
}

export default Searchinput;
