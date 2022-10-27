import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface TableData {
  name: string;
  country: string;
  domains: string;
  webPages: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  displayedColumns: string[] = ['name', 'country', 'domains', 'webPages']
  dataSource!: MatTableDataSource<TableData>
  
  universities: any
  name: string = ''
  url: string = 'http://universities.hipolabs.com/search'

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(private http: HttpClient) { 
    this.universities=[]
  }

  ngOnInit(): void {
    this.getUniversities()
  }

  getUniversities() {
    let query = this.name ? '?name=' + this.name : ''
    this.http.get(this.url + query).subscribe(result => {
      this.universities = result
      this.dataSource = new MatTableDataSource(this.universities)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  getFilterData() {
    this.getUniversities()
  }
}
