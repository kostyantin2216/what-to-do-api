// tslint:disable-next-line:no-var-requires
require('module-alias/register');

import app from '@app/app';
import { IPlace, Place } from '@app/places/place.model';
import placeRepository from '@app/places/place.repository';
import { createPlaces } from '@utils/place-generator';

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});
