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
    const id = this.randomID();
    this.messagesInput.next(<Command>
    {
      id:id, type:'success', text:message
    });

    // setTimeout(()=>
    // {
    //   this.clearMessage(id);
    // }, 5000);
  }

  addError(message:string)
  {
    const id = this.randomID();
    this.messagesInput.next(<Command>
    {
      id:id, type:'error', text:message
    });

    // setTimeout(()=>
    // {
    //   this.clearMessage(id);
    // }, 5000);
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
