interface ChosenTeamInterface {
  name: string;
  image: string;
  id: string;
  rating: number;
  advantage: number;
  shortName:string
}

export default ChosenTeamInterface;

export const initialChosenTeam: ChosenTeamInterface = {
  name: "Your Team",
  image: "https://firebasestorage.googleapis.com/v0/b/friends-league-51148.appspot.com/o/assets%2Fbadge-placeholder.png?alt=media&token=935849d3-bd23-44d6-bcf6-2c703bde7a9b&_gl=1*ncf65d*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5NzEzMTAyNi40OC4xLjE2OTcxMzI5NzQuMTYuMC4w",
  rating: 0,
  advantage: 0,
  id: "",
  shortName:''
};

