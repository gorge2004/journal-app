import {
  finishLoading,
  removeError,
  setError,
  startLoading,
} from "../../actions/ui";
import { types } from "../../types/types";

describe("testing_Ui-actions", () => {
  test("should_work_every_sync_actions", () => {
    const errorText = "Help!!";
    const actionError = setError(errorText);

    expect(actionError).toEqual({
      type: types.uiSetError,
      payload: errorText,
    });
  });
  const removeErrorAction = removeError();
  const startLoadingAction = startLoading();
  const finishLoadingAction = finishLoading();
  expect(removeErrorAction).toEqual({
    type: types.uiRemoveError,
  });
  expect(startLoadingAction).toEqual({
    type: types.uiStartLoading,
  });
  expect(finishLoadingAction).toEqual({
    type: types.uiFinishLoading,
  });
});
