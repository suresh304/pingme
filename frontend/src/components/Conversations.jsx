import useGetConversations from "../Hooks/useGetConversations"
import SingleConv from "./SingleConv"

const Conversations = () => {

  const {conversations} = useGetConversations()
  return (
    <div className="h-5/6 bg-slate-700 rounded-lg m-2 overflow-y-auto">
      {conversations&&conversations?.map((conv,i)=><SingleConv conv={conv} key={conv._id}/>)}
    </div>
  )
}

export default Conversations