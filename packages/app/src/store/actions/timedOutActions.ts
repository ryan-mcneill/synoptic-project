import { TIMED_OUT, TimedOutAction } from "../types";

export const setTimedOut = (hasTimedOut: boolean): TimedOutAction => ({
  type: TIMED_OUT,
  hasTimedOut
});
