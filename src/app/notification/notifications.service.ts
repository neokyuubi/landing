import { Injectable } from '@angular/core';
import { scan, Subject } from 'rxjs';

interface Command
{
  id:number;
  type: 'success'|'error'|'clear';
  text?:string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  messages : Subject<Command>;

  constructor() 
  {
    this.messages = new Subject<Command>();
    this.messages.pipe(scan((messages:Command[], command:Command)=>
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
    this.messages.next(<Command>
    {
      id:this.randomID(), type:'success', text:message
    });
  }

  addError(message:string)
  {
    this.messages.next(<Command>
    {
      id:this.randomID(), type:'error', text:message
    });
  }

  clearMessage(id:number)
  {
    this.messages.next({id, type:'clear'});
  }

  randomID()
  {
    return Math.round(Math.random() * 10000);
  }

}
