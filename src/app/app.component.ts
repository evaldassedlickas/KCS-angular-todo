import {Component} from '@angular/core';
import {ToDoService} from './services/to-do.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  title = 'to-do-app';
  items: Observable<TodoItemDTO[]>;

  model = {
    todoInput: ''
  };

  // @ViewChild('inputLabel') todoValueLabelHolder: ElementRef; // do not do that or kittens will die

  constructor(private todoService: ToDoService) {
    this.items = this.todoService.read();
  }


  onClick() {
    // alert(this.todoValueLabelHolder.nativeElement.value);
    this.todoService.create(this.model.todoInput);
  }
}
