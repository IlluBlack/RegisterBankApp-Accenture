import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private menuItems: Array<Item> = [
    { name: "Solicitar mi crédito", path: "credit" },
    { name: "Otra opción", path: "someLink" }
  ];

  constructor(private _router: Router) { }

  ngOnInit() {}

  returnHome(){
    this._router.navigate([""]);
  }
}

export interface Item {
  name: string,
  path: string
}
