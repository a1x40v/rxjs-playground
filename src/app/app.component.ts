import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { fromEvent, map, Observable, Observer, takeWhile, tap } from 'rxjs';

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
    const click$ = fromEvent<MouseEvent>(document, 'click');

    click$
      .pipe(
        map((evt) => ({ x: evt.clientX, y: evt.clientY })),
        tap(console.log),
        takeWhile((coords) => coords.y <= 200, true)
      )
      .subscribe();
  }
}
