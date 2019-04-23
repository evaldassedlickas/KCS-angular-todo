import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

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
  _items: BehaviorSubject<TodoItemDTO[]>;

  constructor(
    private http: HttpClient
  ) {
    this._items = new BehaviorSubject([]);
    this.items = this._items.asObservable();
  }

  create(label: string): void {
    this.http.post<TodoItemDTO>(
      Api.ITEM_CREATE,
      null,
      {params: {label}})

      .subscribe((response: TodoItemDTO) => {
        this._items.next([...this._items.getValue(), response]);
      });

  }

  read(): Observable<TodoItemDTO[]> {
    this.http.get<TodoItemDTO[]>(Api.ITEM_READ).subscribe((response: TodoItemDTO[]) => {
      this._items.next(response);
    });

    return this.items;
  }

  update(id: number, label: string, done: boolean): void {
    this.http.patch<TodoItemDTO>(
      Api.ITEM_UPDATE,
      null,
      {params: {label, id: id.toString(), isDone: done.toString()}})
      .subscribe((response: TodoItemDTO) => {
        const temp = this._items.getValue();
        temp.splice(temp.findIndex(item => item.id == response.id), 1, response);
        this._items.next(temp);
      });
  }

  delete(id: number): void {
    this.http.delete<TodoItemDTO>(
      Api.ITEM_DELETE,
      {params: {id: id.toString()}})
      .subscribe((response: TodoItemDTO) => {
        this._items.next(this._items.getValue().filter(item => item.id != response.id));
      });
  }
}
