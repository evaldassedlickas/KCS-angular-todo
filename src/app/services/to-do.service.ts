import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

class Domain {
  static HOST = 'http://localhost:8080';
}

class Api {
  static ITEM_CREATE = `${Domain.HOST}/to-do/create`;
  static ITEM_READ = `${Domain.HOST}/to-do/read`;
  static ITEM_UPDATE = `${Domain.HOST}/to-do/update`;
  static ITEM_DELETE = `${Domain.HOST}/to-do/delete`;
}

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  items: Observable<TodoItemDTO[]> = null;

  constructor(
    private http: HttpClient
  ) {
  }

  create(label: string): void {
    this.http.post<TodoItemDTO>(
      Api.ITEM_CREATE,
      null,
      {params: {label}});

  }

  read(): Observable<TodoItemDTO[]> {
    this.items = this.http.get<TodoItemDTO[]>(Api.ITEM_READ);

    return this.items;
  }

  update(id: number, label: string, isDone: boolean): TodoItemDTO {

    return null;
  }

  delete(id: number): void {
    this.http.delete<TodoItemDTO>(
      Api.ITEM_DELETE,
      {params: {id: id.toString()}});
  }
}
