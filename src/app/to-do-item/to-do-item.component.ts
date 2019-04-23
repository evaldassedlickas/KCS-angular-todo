import {Component, Input, OnInit} from '@angular/core';
import {ToDoService} from '../services/to-do.service';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.sass']
})
export class ToDoItemComponent implements OnInit {

  @Input() dtoValue: TodoItemDTO;

  constructor(private toDoService: ToDoService) {
  }

  ngOnInit() {
  }

  onDelete() {
    this.toDoService.delete(this.dtoValue.id);
  }

  handleCheckChanged() {
    this.toDoService.update(this.dtoValue.id, this.dtoValue.label, !this.dtoValue.done)
  }
}
