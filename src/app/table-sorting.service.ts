import {Injectable} from '@angular/core';

// This is the type of the function that will be used to compare the entities
// is similar to the callback Array.sort() expects
type Compare<T> = (tupleA: T, tupleB: T, direction: 'up' | 'down') => number;

// where T is the Entity/Model type
export interface ColumnHeader<T> {
  name: string;
  sorting: boolean;
  direction: 'up' | 'down';
  sortFunction: (col: ColumnHeader<T>) => void;
  prop: keyof T;
}

@Injectable({
  providedIn: 'root'
})
// T is the entity or model of the table
// To use this component is necessary to set the titles and the entities array
// on Init
export class TableSortingService<T> {
  // titles is the array of titles/columns of the table
  private titles: ColumnHeader<T>[];
  // entities is the model rows of the table
  private entities: T[];

  constructor() {
  }

  setTitles(titles: ColumnHeader<T>[]) {
    this.titles = titles;
  }

  setEntitiesArray(entities: T[]) {
    this.entities = entities;
    console.log(this.entities);
  }

  private sortCol(col: ColumnHeader<T>, compareFn: Compare<T>) {
    this.titles.forEach((title) => title.sorting = false);
    col.sorting = true;
    col.direction = col.direction === 'up' ? 'down' : 'up';
    this.entities.sort((a, b) => compareFn(a, b, col.direction));
  }

  sortByText(col: ColumnHeader<T>, getProp: (T) => string) {

    this.sortCol(col, (a, b, direction) => {
      const textA = getProp(a);
      const textB = getProp(b);

      if (typeof textA !== 'string' || typeof textB !== 'string') {
        console.log('no es string');
        return 0;
      }
      if (direction !== 'up') {
        return textB.localeCompare(textA);
      }
      return textA.localeCompare(textB);
    });
  }

  sortByNumber(col: ColumnHeader<T>, getProp: (T) => number) {
    const fn = (a, b, direction) => {
      const numberA = getProp(a);
      const numberB = getProp(b);
      if (typeof numberA !== 'number' || typeof numberB !== 'number') {
        return 0;
      }
      if (direction !== 'up') {
        return numberA - numberB;
      }
      return numberB - numberA;
    };
    this.sortCol(col, fn);
  }

  sortAleatory(titles: ColumnHeader<T>[]) {
    this.entities.sort(() => Math.random() - 0.5);
    titles.forEach((title) => {
      title.sorting = false;
      title.direction = 'up';
    });
  }

}
