import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";

export default function Chat() {
    const [chatMessage,setChatMessage]=useState('');
    const [wsRef,setWsRef]=useState<null|WebSocket>(null);

    function sendMessage(){
        if(wsRef?.readyState!==WebSocket.OPEN) {
            return;
        }

        wsRef.send(JSON.stringify(chatMessage));
    }


  useEffect(() => {
    const ws = new WebSocket("ws://localhost:1338");
    ws.addEventListener(
      "open",
      () => {
        ws.send(JSON.stringify({ status: "ok" }));
      },
      { once: true }
    );
    setWsRef(ws);

    return ()=>{
        ws.close();
    }
  }, []);

  return(
  <div>
    
    <h1>Chat Page</h1>
    <TextField value={chatMessage} onChange={e=>setChatMessage(e.target.value)} variant="outlined" color="primary"></TextField>
    <Button variant="outlined" color="primary" onClick={sendMessage}>Send Message</Button>
  </div>
  )
}
