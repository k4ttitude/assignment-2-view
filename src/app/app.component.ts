import { Component } from '@angular/core';
import { User } from './model/user';
import { BaseService } from './services/base.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private baseService: BaseService) {
  }
}
