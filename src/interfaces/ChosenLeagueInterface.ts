interface ChosenLeagueInterface {
    id: string;
    name: string;
    coefficient: string;
    country: string;
    image:string;
    trophyImage:string;
  }
  
  export default ChosenLeagueInterface;
  
  
export const initialChosenLeague: ChosenLeagueInterface = {
    id: '',
    name: 'string',
    coefficient: '0',
    country: '',
    image:'',
    trophyImage:''
  };
  