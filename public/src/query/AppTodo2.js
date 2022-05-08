import React from 'react';
import {
   useQuery,
   useMutation,
   useQueryClient,
   QueryClient,
   QueryClientProvider,
 } from 'react-query'
const queryClient = new QueryClient()
async function postTodo(data_body){
  const data = {
      method: "POST",
      credentials: 'include',
      body:JSON.stringify(data_body)
  };
  const res=await fetch("/rest/Todo", data)
  const j=res.json();
  return j
}
 
 async function getTodos(){
  const data = {
      method: "GET",
      credentials: 'include',
  };
  const res=await fetch("/rest/Todo", data)
  const j=res.json();
  return j
}
 export default function App() {
   return (
     // Provide the client to your App
     <QueryClientProvider client={queryClient}>
       <Todos />
     </QueryClientProvider>
   )
 }
 
 function Todos() {
   // Access the client
   const queryClient = useQueryClient()
 
   // Queries
   const query = useQuery('todos', getTodos)
 
   // Mutations
   const mutation = useMutation(postTodo, {
     onSuccess: () => {
       // Invalidate and refetch
       queryClient.invalidateQueries('todos')
     },
   })
   console.log(query);
   let show_query=null;
   if(query.isSuccess){
    // console.log(query);
    show_query= query.data.data.map(todo => (
           <li key={todo.id}>{todo.text}</li>
    ));
   }
   return (
     <div>
       <ul>
         {show_query}
       </ul>
        <button
         onClick={() => {
           mutation.mutate({
             text: 'Do Laundry',
             completed:false,
           })
         }}
       >
         Add Todo
       </button>
     </div>
   )
 }

