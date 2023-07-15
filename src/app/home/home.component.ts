import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    //This trigger a observal every x seconds
    // this.firstObsSubscription = interval(1000).subscribe( count => {
    //   console.log(count);
    // });
    //Same before but creating our own observable:
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count == 2){
          observer.complete();
        }
        if (count > 3 ){
          observer.error(new Error('Count is greater 3!'));
        }
        count++;
        //observer.error()//Type of error
        //observer.complete()//Different types, this sends a complete observer
      }, 1000);
      //Si un observable emet un error, no es completa.
    });

    //Add builtin operators to do something before the observable arrive
    this.firstObsSubscription = customIntervalObservable.pipe(map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed');
    });
  }

  ngOnDestroy(): void {
      this.firstObsSubscription.unsubscribe();
  }

}
