import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { fetchDataFromUrl } from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const http$ = fetchDataFromUrl('/api/courses');

    const courses$ = http$.pipe(
      map(resp => Object.values(resp.payload))
    );

    courses$.subscribe(data => console.log(data));
  }

}
