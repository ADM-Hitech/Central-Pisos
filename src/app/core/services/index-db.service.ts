import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CategoryModel } from "../models/category.model";
import { ProductModel } from "../models/product.model";
import { ShippingMethodModel } from "../models/woocommerce/shipping-method.model";

@Injectable({
    providedIn: 'root'
})
export class IndexDBService {
    public readyDb: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private db: IDBDatabase;
    private openRequest: IDBOpenDBRequest;

    constructor() {
        this.openRequest = indexedDB.open('wc_cart');
        const context = this;
        this.openRequest.onupgradeneeded = function(this: IDBOpenDBRequest, ev: IDBVersionChangeEvent)
        {
            context.onupgradeneeded(this, ev);
        };
        this.openRequest.onerror = this.onerror;
        this.openRequest.onsuccess = function(this: IDBRequest<IDBDatabase>, ev: any)
        { 
            context.onsuccess(this);
        };
    }

    private onupgradeneeded(request: IDBOpenDBRequest, ev: IDBVersionChangeEvent): any {
        this.db = request.result;

        if (!this.db.objectStoreNames.contains('items')) {
            this.db.createObjectStore('items', { keyPath: 'id' });
        }

        if (!this.db.objectStoreNames.contains('category')) {
            this.db.createObjectStore('category', { keyPath: 'id' });
        }

        if (!this.db.objectStoreNames.contains('zipcode')) {
            this.db.createObjectStore('zipcode', { keyPath: 'id' });
        }

        if (!this.db.objectStoreNames.contains('shippingmethod')) {
            this.db.createObjectStore('shippingmethod', { keyPath: 'id' });
        }

        setTimeout(() => {
            this.readyDb.next(true);
        }, 700);
    }

    public zipCode(zipcode: string): void {
        const transaction = this.db.transaction('zipcode', 'readwrite');
        const items = transaction.objectStore('zipcode');

        const req = items.clear();

        req.onsuccess = function() {
            items.add({id: 1, zipcode });
        }
    }

    public shippingMethod(method: ShippingMethodModel = ShippingMethodModel.fromJson({})): void {
        const transaction = this.db.transaction('zipcode', 'readwrite');
        const items = transaction.objectStore('zipcode');

        const req = items.clear();

        req.onsuccess = function() {
            items.add(method);
        }
    }

    public addItem(product: ProductModel): void {
        const transaction = this.db.transaction('items', 'readwrite');
        const items = transaction.objectStore('items');

        const request = items.add(product);

        request.onsuccess = this.onsuccessadd;
        request.onerror = () => this.onerroradd(request);
    }

    public addCategory(category: CategoryModel): void {
        const transaction = this.db.transaction('category', 'readwrite');
        const items = transaction.objectStore('category');

        const request = items.add(category);
        request.onerror = () => this.onerroradd(request);
    }

    public updateItem(product: ProductModel): void {
        const transaction = this.db.transaction('items', 'readwrite');
        const items = transaction.objectStore('items');

        const requestupdate = items.put(product);

        requestupdate.onsuccess = this.onsuccessadd;
        requestupdate.onerror = () => this.onerroradd(requestupdate);
    }

    public updateCategory(category: CategoryModel): void {
        const transaction = this.db.transaction('category', 'readwrite');
        const items = transaction.objectStore('category');

        const requestupdate = items.put(category);

        requestupdate.onerror = () => this.onerroradd(requestupdate);
    }

    public deleteItem(product: ProductModel): void {
        const transaction = this.db.transaction('items', 'readwrite');
        const items = transaction.objectStore('items');

        const requestdelete = items.delete(product.id);

        requestdelete.onsuccess = this.onsuccessdelete;
        requestdelete.onerror = this.onerrordelete;
    }

    public getAllItems(): Observable<any> {
        const subcription = new Observable((observer) => {

            const transaction = this.db.transaction('items', 'readwrite');
            const items = transaction.objectStore('items');

            const request = items.getAll();

            request.onsuccess = function() {
                if (request.result !== undefined) {
                    observer.next(request.result);
                } else {
                    observer.next([]);
                }
            };

            request.onerror = function() {
                observer.error(request.error);
            };

            return {
                unsubscribe() {}
            }
        });

        return subcription;
    }

    public getAllCategories(): Observable<any> {
        const subcription = new Observable((observer) => {

            const transaction = this.db.transaction('category', 'readwrite');
            const items = transaction.objectStore('category');

            const request = items.getAll();

            request.onsuccess = function() {
                if (request.result !== undefined) {
                    observer.next(request.result);
                } else {
                    observer.next([]);
                }
            };

            request.onerror = function() {
                observer.error(request.error);
            };

            return {
                unsubscribe() {}
            }
        });

        return subcription;
    }

    private onsuccessadd(): void {
        console.log('Item added');
    }

    private onerroradd(request: IDBRequest<IDBValidKey>): void {
        console.log('Error added', request.error);

        if (request.error.name === 'ConstraintError') {
            console.log('El elemento ya se encuentra registrado');
        }
    }

    private onsuccessdelete(): void {
        console.log('Item deleted');
    }

    private onerrordelete(): void {
        console.log('Error delete');
    }

    private onerror(): void {
        console.error("Error", this.openRequest.error);
    }

    private onsuccess(request: IDBRequest<IDBDatabase>): void {
        this.db = request.result;

        this.readyDb.next(true);
    }
}