import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { fromEvent, interval, mergeMap, takeUntil } from 'rxjs';

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
    const mousedown$ = fromEvent(document, 'mousedown');
    const mouseup$ = fromEvent(document, 'mouseup');

    const interval$ = interval(1000);

    mousedown$
      .pipe(mergeMap(() => interval$.pipe(takeUntil(mouseup$))))
      .subscribe(console.log);
  }
}
