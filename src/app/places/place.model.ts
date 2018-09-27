import * as moment from 'moment';
import { Document, model, Schema } from 'mongoose';

import ILocation from '@data/Location';
import IWorkingHours from '@data/WorkingHours';

export interface IPlace {
    name: string;
    description: string;
    priority: number;
    location: ILocation;
    workingHours: IWorkingHours;
}

export interface IPlaceDocument extends IPlace, Document {
    updatedAt: Date;
}

export const PlaceSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    priority: { type: Number, default: 50 },
    location: {
        address: { type: String, requied: true },
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    workingHours: Schema.Types.Mixed,
    updatedAt: { type: Date, default: Date.now }
});

export const PlaceModel = model<IPlaceDocument>('Place', PlaceSchema);

export class Place implements IPlace {

    public static fromDocument(place: IPlaceDocument): Place {
        return new Place(
            place._id,
            place.name,
            place.description,
            place.priority,
            place.location,
            place.workingHours,
            moment(place.updatedAt)
        );
    }

    constructor(
        public id: string,
        public name: string,
        public description: string,
        public priority: number,
        public location: ILocation,
        public workingHours: IWorkingHours,
        public updatedAt: moment.Moment,
    ) { }

}

export default Place;
