import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppService} from './app.service';
import {Tarea} from './tarea';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('table', {static: false}) table: ElementRef<HTMLTableElement>;
  @ViewChild('inputTime', {static: false}) inputTime: ElementRef<HTMLInputElement>;
  @ViewChild('inputTarea', {static: false}) inputTarea: ElementRef<HTMLInputElement>;
  tareas: Tarea[];

  constructor(
    public service: AppService,
  ) {
  }

  ngOnInit() {
    this.obtenerTareas();
  }

  async obtenerTareas() {
    this.tareas = await this.service.obtenerTareas();
  }

  getDirection(arrowUp, arrowDown): 'up' | 'down' {
    if (
      arrowUp.classList.contains('hidden') &&
      arrowDown.classList.contains('hidden')
    ) {
      return 'up';
    }

    if (arrowUp.classList.contains('hidden')) {
      return 'up';
    }
    return 'down';
  }

  sortCol(col: HTMLTableHeaderCellElement, prop: string, fn: (row: Tarea[], direction: string) => void) {
    const arrowUp = col.querySelector('i.fa-chevron-up');
    const arrowDown = col.querySelector('i.fa-chevron-down');
    const direction = this.getDirection(arrowUp, arrowDown);

    fn(this.tareas, direction);
    if (direction === 'up') {
      arrowUp.classList.remove('hidden');
      arrowDown.classList.add('hidden');
    }

    if (direction === 'down') {
      arrowUp.classList.add('hidden');
      arrowDown.classList.remove('hidden');
    }
  }

  sortByText(col: HTMLTableHeaderCellElement, prop: string) {
    console.log('sortByTime');
    this.sortCol(col, prop, (rows, direction) => {
      rows.sort((a, b) => {
        if (direction !== 'up') {
          return a[prop].localeCompare(b[prop]);
        }
        return b[prop].localeCompare(a[prop]);
      });
    });
  }

  sortByTime(col: HTMLTableHeaderCellElement, prop: string) {
    console.log('sortByTime');
    this.sortCol(col, prop, (rows, direction) => {
      rows.sort((a, b) => {
        if (direction !== 'up') {
          return Number(a[prop]) - Number(b[prop]);
        }
        return Number(b[prop]) - Number(a[prop]);
      });
    });
  }

  addTask() {
    const titulo = this.inputTarea.nativeElement.value;
    const minutos = Number(this.inputTime.nativeElement.value);
    this.tareas.push({
      id: this.tareas.length + 1,
      titulo,
      minutos,
    });
  }

  deleteSelectedTasks() {
    this.tareas = this.tareas.filter((tarea) => !tarea.selected);
  }

  markSelectedTasks(b: boolean) {
    this.tareas.forEach((tarea) => {
      tarea.mark = b;
    });
  }

  deleteTask(tarea: Tarea) {
    this.tareas.splice(this.tareas.indexOf(tarea), 1);
  }

  markTask(tarea: Tarea) {
    tarea.mark = !tarea.mark;
  }

  sortAleatory() {
    this.tareas.sort(() => Math.random() - 0.5);
  }

  selectAll() {
    this.tareas.forEach((tarea) => tarea.selected = true);
  }
}
