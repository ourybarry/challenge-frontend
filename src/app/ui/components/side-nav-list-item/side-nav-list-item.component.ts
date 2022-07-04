import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav-list-item',
  templateUrl: './side-nav-list-item.component.html',
  styleUrls: ['./side-nav-list-item.component.css']
})
export class SideNavListItemComponent implements OnInit {

  @Input() itemTitle: string = '';
  @Input() icon: string = '';
  @Input() targetRoute: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
