import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myDate = new Date();
  salary: number = 1000;
  object = {name: 'Ivan', age: 25};
  users: Array<any> = [
    {
      id: 1,
      name: 'Ivan',
      age: 25
    },
    {
      id: 2,
      name: 'Petro',
      age: 33
    },
    {
      id: 3,
      name: 'Pavlo',
      age: 18
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
