import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.sass']
})
export class ToDoItemComponent implements OnInit {

  @Input() dtoValue: TodoItemDTO;

  constructor() {
  }

  ngOnInit() {
  }

}
