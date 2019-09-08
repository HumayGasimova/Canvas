import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import * as actionTypes from '../constants/actionTypes';
import * as Actions from '../actions';

function updateUnsoldInventoryEpic(action$) { 
    return action$
        .ofType(actionTypes.MAKE_PAPERCLIP)
        .mergeMap(action => {
            return Observable.of(
                Actions.updateUnsoldInventory(),
                Actions.updateFunds(action.priceOfPaperclip),
                Actions.toggleMarketingButton(),
                Actions.toggleWireButton()
            ) 
            .delay(action.delay)
        })
}

export default updateUnsoldInventoryEpic;
