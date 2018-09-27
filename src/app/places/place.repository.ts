import { Model } from 'mongoose';

import BaseRepository from '@app/core/base.repository';
import { IPlace, IPlaceDocument, Place, PlaceModel } from '@app/places/place.model';

class PlaceRepository extends BaseRepository<IPlaceDocument, Place, IPlace> {
    protected get emptyModel(): Model<IPlaceDocument> {
        return PlaceModel;
    }
    protected fromDocument(document: IPlaceDocument): Place {
        return Place.fromDocument(document);
    }
    protected toDocument(place: IPlace): IPlaceDocument {
        return new PlaceModel(place);
    }
}

export default new PlaceRepository();
