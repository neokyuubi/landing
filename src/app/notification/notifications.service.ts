import { Injectable } from '@angular/core';
import { Observable, scan, Subject } from 'rxjs';

export interface Command
{
  id:number;
  type: 'success'|'error'|'clear';
  text?:string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  messagesInput : Subject<Command>;
  messagesOutput : Observable<Command[]>;

  constructor() 
  {
    this.messagesInput = new Subject<Command>();
    this.messagesOutput = this.messagesInput.pipe(scan((messages:Command[], command:Command)=>
    {
      if(command.type == "clear")
      {
        return messages.filter((message:Command) => message.id != command.id);
      }
      else
      {
        return [...messages, command];
      }
    }, []));
  }

  addSuccess(message:string)
  {
    this.messagesInput.next(<Command>
    {
      id:this.randomID(), type:'success', text:message
    });
  }

  addError(message:string)
  {
    this.messagesInput.next(<Command>
    {
      id:this.randomID(), type:'error', text:message
    });
  }

  clearMessage(id:number)
  {
    this.messagesInput.next({id, type:'clear'});
  }

  randomID()
  {
    return Math.round(Math.random() * 10000);
  }

}
