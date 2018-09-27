import { Request } from 'express';
import { ContextRequest, DELETE, Errors, GET, Path, PathParam, POST, PUT, Return } from 'typescript-rest';

import DocumentMissingError from '../core/document-missing.error';
import { IPlace, Place } from './place.model';
import placeRepository from './place.repository';

@Path('/places')
export default class PlaceService {

    private static handleError(reject: (reason?: any) => void) {
        return (err: any) => {
            if (err instanceof DocumentMissingError) {
                reject(new Errors.NotFoundError(err.message));
            } else {
                reject(err);
            }
        };
    }

    @GET
    public async getPlaces(): Promise<Place[]> {
        return await placeRepository.findAll().toPromise().catch(this.handlePromiseError);
    }

    @Path(':id')
    @GET
    public async getPlace(@PathParam('id') id: string): Promise<Place> {
        return await placeRepository.findById(id).toPromise().catch(this.handlePromiseError);
    }

    @POST
    public async savePlace(place: IPlace): Promise<Place> {
        return await placeRepository.store(place).toPromise().catch(this.handlePromiseError);
    }

    @Path(':id')
    @PUT
    public async updatePlace(place: IPlace, @PathParam('id') id: string): Promise<Place> {
        return await placeRepository.update(id, place).toPromise().catch(this.handlePromiseError);
    }

    @Path(':id')
    @DELETE
    public async deletePlace(@PathParam('id') id: string, @ContextRequest request: Request): Promise<Return.RequestAccepted<string>> {
        return await new Promise<Return.RequestAccepted<string>>((resolve, reject) => {
            placeRepository.delete(id).subscribe(
                () => null,
                PlaceService.handleError(reject),
                () => {
                    resolve(new Return.RequestAccepted<string>(request.url));
                }
            );
        });
    }

    private handlePromiseError(err: any): Promise<any> {
        return new Promise((resolve, reject) => PlaceService.handleError(reject)(err));
    }

}
