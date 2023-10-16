type fixtureInterface = {
    home: string;
    away: string;
    homeGoals:number|null;
    awayGoals:number|null;
    homeAdvantage:number;
    awayAdvantage:number;
    homeImage:string;
    awayImage:string;
    homeCoefficient:number;
    awayCoefficient:number
    deadline?:null;
    simulated:boolean;
    isPlayer:boolean;
    playerHome:{
      userId:string;
      userImage:string;
      isPlayer:boolean;
    }
    playerAway:{
      userId:string;
      userImage:string;
      isPlayer:boolean
    }
  };

export default fixtureInterface

export interface fullSeasonFixturesInterface {
  [key: string]: fixtureInterface[];
}

