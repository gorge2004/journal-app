
import { types } from '../../types/types';

describe('testing_types_actione', () => { 

    test('should_have_types', () => { 

        expect(types).toEqual({
            login: '[Auth] login',
            logout: '[Auth] logout',
            
            uiSetError: '[UI] SET ERROR',
            uiRemoveError: '[UI] Remove ERROR',
            uiStartLoading: '[UI] Start Loading',
            uiFinishLoading: '[UI] Finish Loading',
            
            notesAddNew: '[Notes] new note',
            notesActive: '[Notes] set active note',
            notesLoad: '[Notes] Load notes',
            notesUpdated: '[Notes] Update note',
            notesFileUrl: '[Notes] Update image url',
            notesDelete: '[Notes] Delete note',
            notesLogoutCleaning: '[Notes] logout Cleaning',
        });
     });
 });