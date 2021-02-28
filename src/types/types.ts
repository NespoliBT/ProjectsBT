export interface Project {
  id: number;
  name: string;
  technology: string;
  description: string;
  prodInfo?: {};
  stagInfo?: {};
  devInfo?: {};
  enviroments: [
    {
      name: string;
      plugins: {
        db?: {
          user: string;
          password: string;
          ip: string;
        };
        user?: {
          name: string;
          password: string;
        };
      };
    }
  ];
}
