import React from 'react'
import {MainContainer,ChatContainer,MessageList,Message,MessageInput,TypingIndicator} from "@chatscope/chat-ui-kit-react"
import { useState } from 'react'


const API_KEY="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"


const Service = () => {
const [typing,setTyping] = useState(false)
const [messages,setMessages] = useState([{
    message:"Hello I Am WeKrave's helper",
    sender:"ChatGPT",
}])

const handleSend = async (message) => {
    const newMessage = {
        message:message,
        sender:"user",
        direction:"outgoing"
    }


    const newMessages = [...messages,newMessage]
    //update message state


    setMessages(newMessages)
    //process to chatgpt (send and see results)

    setTyping(true)

    await processMessageToChatHPT(newMessages);

    
}





async function processMessageToChatHPT(chatMessages)
{
    let apiMessages = chatMessages.map((messageObject)=>{
        let role = "";
        if(messageObject.sender === "ChatGPT"){
            role="assistant"
        } else {
            role = "user"
        }
        return {role:role,content:messageObject.message}
    });
    const systemMessage = {
        role:"system",
        content:"Speak like a 10 year old"
    }
    const apiRequestBody = {
        "model":"gpt-3.5-turbo",
        "messages":[
            systemMessage,
            ...apiMessages
        ]
    }


    await fetch("https://api.openai.com/v1/chat/completions",{
        method:"POST",
        headers:{
            "Authorization" : `Bearer ${API_KEY}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify(apiRequestBody)
    }).then((data)=>{
        return data.json();

    }).then((data)=>{
        setMessages(
            [...chatMessages, {
                message:data.choices[0].message.content,
                sender:"ChatGPT"
            }]
        )
        setTyping(false)
    })
}

  return (
    <div className=' w-full h-screen bg-teal-900 rounded-3xl scroll-smooth'>
        <div className='w-full rounded-3xl flex-grow text-black py-2 flex items-start justify-center
      md:items-start'>
        <MainContainer  className='w-[90%] h-screen rounded-3xl'>
            <ChatContainer className=' bg-teal-900'>
                <MessageList className='bg-white rounded-md w-full my-8 scroll-smooth'>
                    
                {typing ? <TypingIndicator className="text-purple-500 "content="WeKrave is typing ..."/>:null}
                {messages.map((message,i)=>{
                    return <Message key={i} model={message}/>
                })}
                </MessageList>
                <MessageInput className='text-black w-full rounded-md bg-zinc-200 ' placeholder='<Type message here>' onSend={handleSend}/>
            </ChatContainer>
        </MainContainer>
        </div>
    </div>
  )
}


export default Service