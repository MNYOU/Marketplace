import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, delay, Observable, retry, throwError} from "rxjs";
import {IProduct} from "../models/IProduct";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private defaultUrl: string = "https://fakestoreapi.com/products"
  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    ) {
  }

  get(id: number): Observable<IProduct> {
    let url = `${this.defaultUrl}/${id}`
    console.log(url)
    return this.http.get<IProduct>(url)
  }

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.defaultUrl, {
      params: new HttpParams({
        // fromObject: {limit: 5}
      })
    }).pipe(
      // delay(100),
      retry(2),
      catchError(this.errorHandler.bind(this))
    )
  }

  getCategories(): Observable<string[]>
  {
    let url = `${this.defaultUrl}/categories`
    return this.http.get<string[]>(url)
  }

  getByCategory(category: string): Observable<IProduct[]> {
    let url = `${this.defaultUrl}/category/${category}`
    return this.http.get<IProduct[]>(url)
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
