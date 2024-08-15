import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { fromEvent, interval, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'rxjs-playground';

  ngOnInit(): void {
    const click$ = fromEvent(document, 'click');

    const interval$ = interval(1000);

    click$.pipe(switchMap(() => interval$)).subscribe(console.log);
  }
}
