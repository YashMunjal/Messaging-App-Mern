import WebSocket from 'ws'
import { processMessage } from './utilities';

export default function webSocketServer(){
        const wss=new WebSocket.Server({
                    port:1338
        })

        wss.on('connection', function connection(ws) {
            ws.on('message', function incoming(payload:string) {
              const message=processMessage(payload)
              if (!message) {

                return
            }
            console.log(message, 'is the message')
                
                ws.send(JSON.stringify(message))
            });
          
        });
}