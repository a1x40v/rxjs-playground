import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { Observable, Observer } from 'rxjs';

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
    const observable$ = new Observable<number>((subscriber) => {
      let count = 0;

      /* sync value */
      subscriber.next(count++);

      const intervalId = setInterval(() => {
        /* async value */
        subscriber.next(count++);
      }, 1000);

      return () => {
        console.log('clean up');
        clearInterval(intervalId);
      };
    });

    const observer: Partial<Observer<number>> = {
      next: (value: number) => {
        console.log(value);
      },
      complete: () => console.log('Complete!'),
    };

    const sub = observable$.subscribe(observer);

    setTimeout(() => {
      sub.unsubscribe();
    }, 3500);
  }
}
