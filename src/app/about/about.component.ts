import { Component, OnInit } from '@angular/core';
import { fetchDataFromUrl } from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // const source1$ = of(1, 2, 3);
    // const source2$ = of('a', 'b', 'c');
    // const source3$ = of('x', 'y', 'z');
    // const result$ =  concat(source1$, source2$, source3$);

    // result$.subscribe(resp => console.log(resp));

  const http$ = fetchDataFromUrl('/api/courses');

  const sub = http$.subscribe(console.log);

  setTimeout(() => {
    sub.unsubscribe();
  }, );
  }

}
