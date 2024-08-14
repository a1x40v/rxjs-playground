import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { concat, concatAll, concatMap, map, Observable, pipe } from 'rxjs';

interface FormValues {
  email: string | null;
  password: string | null;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
    this.form.valueChanges
      // .pipe(
      //   map((val) =>
      //     getStoreObservable({
      //       email: val.email || '',
      //       password: val.password || '',
      //     })
      //   ),
      //   concatAll()
      // )
      .pipe(
        concatMap((val) => {
          return getStoreObservable({
            email: val.email || '',
            password: val.password || '',
          });
        })
      )
      .subscribe((val) => {
        console.log(`value get ${val.email}-${val.password}`);
      });
  }

  onSubmit() {
    console.log('Submit form');
    console.log(
      'Submit values: ',
      this.form.value.email,
      this.form.value.password
    );
  }
}

function getStoreObservable(val: FormValues): Observable<FormValues> {
  return new Observable<FormValues>((subscriber) => {
    console.log(`START storing for ${val.email}-${val.password}`);
    setTimeout(() => {
      console.log(`END storing for ${val.email}-${val.password}`);
      subscriber.next(val);
      subscriber.complete();
    }, 2000);
  });
}
