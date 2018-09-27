import * as _ from 'lodash';
import { Document, Model } from 'mongoose';
import { Observable, Observer } from 'rxjs';
import DocumentMissingError from './document-missing.error';

export default abstract class BaseRepository<D extends Document, E, R> {

    public store(rawEntity: R): Observable<E> {
        return Observable.create((observer: Observer<E>) => {
            const document = this.toDocument(rawEntity);

            document.save((err: any, document: D) => {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(this.fromDocument(document));
                    observer.complete();
                }
            });
        });
    }

    public update(id: string, rawEntity: R): Observable<E> {
        return Observable.create((observer: Observer<E>) => {
            this.emptyModel.findById(id, (err: any, document: D) => {
                if (err) {
                    observer.error(err);
                } else if (document === null) {
                    observer.error(new DocumentMissingError('Could not find a document with id:' + id));
                } else {
                    document = _.assign(document, rawEntity);

                    const updateable = document as any;
                    if (updateable.updatedAt != null) {
                        updateable.updatedAt = Date.now();
                    }

                    document.save((err: any, updatedDocument: D) => {
                        if (err) {
                            observer.error(err);
                        } else {
                            observer.next(this.fromDocument(updatedDocument));
                            observer.complete();
                        }
                    });
                }
            });
        });
    }

    public delete(id: string): Observable<void> {
        return Observable.create((observer: Observer<void>) => {
            this.emptyModel.findByIdAndRemove(id, (err: any, document: D) => {
                if (err) {
                    observer.error(err);
                } else {
                    observer.complete();
                }
            });
        });
    }

    public findAll(): Observable<E[]> {
        return Observable.create((observer: Observer<E[]>) => {
            this.emptyModel.find((err: any, documents: D[]) => {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(documents.map(this.fromDocument));
                    observer.complete();
                }
            });
        });
    }

    public findById(id: string): Observable<E> {
        return Observable.create((observer: Observer<E>) => {
            this.emptyModel.findById(id, (err: any, document: D) => {
                if (err) {
                    observer.error(err);
                } else if (document === null) {
                    observer.error(new DocumentMissingError('Could not find a document with id:' + id));
                } else {
                    observer.next(this.fromDocument(document));
                    observer.complete();
                }
            });
        });
    }

    protected abstract get emptyModel(): Model<D>;
    protected abstract toDocument(raw: R): D;
    protected abstract fromDocument(document: D): E;
}
