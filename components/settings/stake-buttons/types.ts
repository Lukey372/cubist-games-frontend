import { ConfigInputType } from "../../../pages/types/game-settings";

export interface StakeButtonsType {
  settings: {
    minStake: number;
    minStep: number;
    customStakeButton: boolean;
    stakeButtons: number[];
    [key: string]: any;
  };
  errors: { [key: string]: string };
  handleUpdateSettings: Function;
  showModal: Function;
  maxDecimals: number;
}
