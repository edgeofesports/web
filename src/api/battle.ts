"use server";
import axios from "axios";
const domain = process.env.server_domain;
const apikey = "123@edgeofwaresports.com"

const mockBattles: battleType[] = [
  {
    _id: "6627a1f2e4b0a1c2d3e4f501",
    battleId: 1001,
    status: "upcoming",
    mode: "scoring",
    auth: { roomId: "ROOM1001", roomPass: "pass1234" },
    settings: {
      gameMode: "Battle Royale",
      map: "BERMUDA",
      teamMode: "Solo",
      slots: 12,
      advanceSetting: {
        presetMode: "Custom", EP: "100", revival: "Off", "Movement Speed": "Normal",
        HP: "200", "Jump Height": "Normal", Environment: "Default", "Auto Revival": "Off",
        Vehicles: "On", UAV: "Off", "Generic Enemy Outfit": "Off", "Precise Aim": "Off",
        "Gun Attributes": "Normal", "Safe Zone Movin": "Normal", "Limited Ammo": "Off",
        Airdrop: "On", "Out-Of-Zone Damage": "Normal", Airstrike: "Off",
        "Hide TeamMate Nickname": "Off", "Character Skill": "On", "In-Game Mission": "Off",
        "Quit-Out Penalty": "On", "Fall Damage": "On", "Zone Shrink Speed": "Normal",
        "High Tier Loot Zone": "On", Airship: "Off", "Friendly Fire": "Off",
        LoadOut: "Default", "In-Match Quests": "Off", "Only Headshot": "Off",
      },
    },
    expire: { id: 1, dateStr: "2025-04-20T18:00:00Z" },
    entry: 20,
    winning: { _1: 500, _2: 300, _3: 100 },
    teams: [["uid_001"], ["uid_002"], ["uid_003"]],
    teamswithUserName: [["PlayerOne"], ["PlayerTwo"], ["PlayerThree"]],
    positions: [["1"], ["2"], ["3"]],
  },

  {
    _id: "6627a1f2e4b0a1c2d3e4f502",
    battleId: 1002,
    status: "live",
    mode: "survival",
    auth: { roomId: "ROOM1002", roomPass: "abcd5678" },
    settings: {
      gameMode: "Clash Squad",
      map: "PURGATORY",
      teamMode: "Duo",
      slots: 8,
      advanceSetting: {
        presetMode: "Default", EP: "50", revival: "On", "Movement Speed": "Fast",
        HP: "200", "Jump Height": "High", Environment: "Night", "Auto Revival": "On",
        Vehicles: "Off", UAV: "On", "Generic Enemy Outfit": "On", "Precise Aim": "On",
        "Gun Attributes": "Enhanced", "Safe Zone Movin": "Fast", "Limited Ammo": "On",
        Airdrop: "On", "Out-Of-Zone Damage": "High", Airstrike: "On",
        "Hide TeamMate Nickname": "On", "Character Skill": "Off", "In-Game Mission": "On",
        "Quit-Out Penalty": "On", "Fall Damage": "Off", "Zone Shrink Speed": "Fast",
        "High Tier Loot Zone": "On", Airship: "On", "Friendly Fire": "Off",
        LoadOut: "Custom", "In-Match Quests": "On", "Only Headshot": "Off",
      },
    },
    expire: { id: 2, dateStr: "2025-04-15T20:00:00Z" },
    entry: 50,
    winning: { _1: 1000, _2: 600, _3: 200 },
    teams: [["uid_004", "uid_005"], ["uid_006", "uid_007"]],
    teamswithUserName: [["GhostSniper", "IronFist"], ["BlazeFury", "ShadowX"]],
    positions: [["1", "2"], ["3", "4"]],
  },

  {
    _id: "6627a1f2e4b0a1c2d3e4f503",
    battleId: 1003,
    status: "completed",
    mode: "scoring",
    settings: {
      gameMode: "Battle Royale",
      map: "ALPINE",
      teamMode: "Squad",
      slots: 16,
      advanceSetting: {
        presetMode: "Headshot Only", EP: "0", revival: "Off", "Movement Speed": "Normal",
        HP: "200", "Jump Height": "Normal", Environment: "Default", "Auto Revival": "Off",
        Vehicles: "Off", UAV: "Off", "Generic Enemy Outfit": "On", "Precise Aim": "On",
        "Gun Attributes": "Normal", "Safe Zone Movin": "Normal", "Limited Ammo": "Off",
        Airdrop: "Off", "Out-Of-Zone Damage": "Low", Airstrike: "Off",
        "Hide TeamMate Nickname": "Off", "Character Skill": "Off", "In-Game Mission": "Off",
        "Quit-Out Penalty": "On", "Fall Damage": "On", "Zone Shrink Speed": "Slow",
        "High Tier Loot Zone": "Off", Airship: "Off", "Friendly Fire": "On",
        LoadOut: "Default", "In-Match Quests": "Off", "Only Headshot": "On",
      },
    },
    expire: { id: 3, dateStr: "2025-04-10T16:00:00Z" },
    entry: 30,
    winning: { _1: 800, _2: 400, _3: 150 },
    teams: [["uid_008", "uid_009", "uid_010", "uid_011"], ["uid_012", "uid_013", "uid_014", "uid_015"]],
    teamswithUserName: [["Alpha1", "Alpha2", "Alpha3", "Alpha4"], ["Beta1", "Beta2", "Beta3", "Beta4"]],
    positions: [["1", "2", "3", "4"], ["5", "6", "7", "8"]],
  },

  {
    _id: "6627a1f2e4b0a1c2d3e4f504",
    battleId: 1004,
    status: "upcoming",
    mode: "survival",
    auth: { roomId: "ROOM1004", roomPass: "kala9999" },
    settings: {
      gameMode: "Battle Royale",
      map: "KALAHARI",
      teamMode: "Solo",
      slots: 20,
      advanceSetting: {
        presetMode: "Custom", EP: "75", revival: "Off", "Movement Speed": "Fast",
        HP: "200", "Jump Height": "Normal", Environment: "Day", "Auto Revival": "Off",
        Vehicles: "On", UAV: "Off", "Generic Enemy Outfit": "Off", "Precise Aim": "Off",
        "Gun Attributes": "Normal", "Safe Zone Movin": "Normal", "Limited Ammo": "On",
        Airdrop: "On", "Out-Of-Zone Damage": "Normal", Airstrike: "Off",
        "Hide TeamMate Nickname": "Off", "Character Skill": "On", "In-Game Mission": "On",
        "Quit-Out Penalty": "On", "Fall Damage": "On", "Zone Shrink Speed": "Normal",
        "High Tier Loot Zone": "On", Airship: "Off", "Friendly Fire": "Off",
        LoadOut: "Default", "In-Match Quests": "On", "Only Headshot": "Off",
      },
    },
    expire: { id: 4, dateStr: "2025-04-22T14:00:00Z" },
    entry: 10,
    winning: { _1: 200, _2: 100, _3: 50 },
    teams: [["uid_016"], ["uid_017"], ["uid_018"]],
    teamswithUserName: [["DesertFox"], ["SandStorm"], ["DuneRider"]],
    positions: [["1"], ["2"], ["3"]],
  },

  {
    _id: "6627a1f2e4b0a1c2d3e4f505",
    battleId: 1005,
    status: "live",
    mode: "scoring",
    auth: { roomId: "ROOM1005", roomPass: "nxtr2025" },
    settings: {
      gameMode: "Clash Squad",
      map: "NEXTERA",
      teamMode: "Squad",
      slots: 24,
      advanceSetting: {
        presetMode: "Default", EP: "100", revival: "Off", "Movement Speed": "Normal",
        HP: "200", "Jump Height": "Normal", Environment: "Default", "Auto Revival": "Off",
        Vehicles: "On", UAV: "Off", "Generic Enemy Outfit": "Off", "Precise Aim": "Off",
        "Gun Attributes": "Normal", "Safe Zone Movin": "Normal", "Limited Ammo": "Off",
        Airdrop: "On", "Out-Of-Zone Damage": "Normal", Airstrike: "Off",
        "Hide TeamMate Nickname": "Off", "Character Skill": "On", "In-Game Mission": "Off",
        "Quit-Out Penalty": "On", "Fall Damage": "On", "Zone Shrink Speed": "Normal",
        "High Tier Loot Zone": "On", Airship: "Off", "Friendly Fire": "Off",
        LoadOut: "Default", "In-Match Quests": "On", "Only Headshot": "Off",
      },
    },
    expire: { id: 5, dateStr: "2025-04-16T21:00:00Z" },
    entry: 100,
    winning: { _1: 2000, _2: 1200, _3: 500 },
    teams: [
      ["uid_019", "uid_020", "uid_021", "uid_022"],
      ["uid_023", "uid_024", "uid_025", "uid_026"],
      ["uid_027", "uid_028", "uid_029", "uid_030"],
    ],
    teamswithUserName: [
      ["NexForce1", "NexForce2", "NexForce3", "NexForce4"],
      ["StrikeX1", "StrikeX2", "StrikeX3", "StrikeX4"],
      ["Phantom1", "Phantom2", "Phantom3", "Phantom4"],
    ],
    positions: [["1", "2", "3", "4"], ["5", "6", "7", "8"], ["9", "10", "11", "12"]],
  },

  {
    _id: "6627a1f2e4b0a1c2d3e4f506",
    battleId: 1006,
    status: "completed",
    mode: "survival",
    settings: {
      gameMode: "Battle Royale",
      map: "BERMUDA",
      teamMode: "Duo",
      slots: 10,
      advanceSetting: {
        presetMode: "Custom", EP: "100", revival: "On", "Movement Speed": "Normal",
        HP: "200", "Jump Height": "High", Environment: "Sunset", "Auto Revival": "On",
        Vehicles: "On", UAV: "On", "Generic Enemy Outfit": "Off", "Precise Aim": "Off",
        "Gun Attributes": "Normal", "Safe Zone Movin": "Slow", "Limited Ammo": "Off",
        Airdrop: "On", "Out-Of-Zone Damage": "Low", Airstrike: "Off",
        "Hide TeamMate Nickname": "Off", "Character Skill": "On", "In-Game Mission": "On",
        "Quit-Out Penalty": "On", "Fall Damage": "Off", "Zone Shrink Speed": "Slow",
        "High Tier Loot Zone": "On", Airship: "Off", "Friendly Fire": "Off",
        LoadOut: "Default", "In-Match Quests": "Off", "Only Headshot": "Off",
      },
    },
    expire: { id: 6, dateStr: "2025-04-08T19:00:00Z" },
    entry: 40,
    winning: { _1: 700, _2: 350, _3: 120 },
    teams: [["uid_031", "uid_032"], ["uid_033", "uid_034"], ["uid_035", "uid_036"]],
    teamswithUserName: [["SunsetDuo1", "SunsetDuo2"], ["VipersX", "VipersY"], ["TwilightA", "TwilightB"]],
    positions: [["1", "2"], ["3", "4"], ["5", "6"]],
  },

  {
    _id: "6627a1f2e4b0a1c2d3e4f507",
    battleId: 1007,
    status: "upcoming",
    mode: "scoring",
    auth: { roomId: "ROOM1007", roomPass: "purge007" },
    settings: {
      gameMode: "Battle Royale",
      map: "PURGATORY",
      teamMode: "Squad",
      slots: 20,
      advanceSetting: {
        presetMode: "Custom", EP: "100", revival: "Off", "Movement Speed": "Normal",
        HP: "200", "Jump Height": "Normal", Environment: "Default", "Auto Revival": "Off",
        Vehicles: "Off", UAV: "Off", "Generic Enemy Outfit": "On", "Precise Aim": "On",
        "Gun Attributes": "Normal", "Safe Zone Movin": "Normal", "Limited Ammo": "On",
        Airdrop: "On", "Out-Of-Zone Damage": "Normal", Airstrike: "On",
        "Hide TeamMate Nickname": "On", "Character Skill": "On", "In-Game Mission": "On",
        "Quit-Out Penalty": "On", "Fall Damage": "On", "Zone Shrink Speed": "Normal",
        "High Tier Loot Zone": "On", Airship: "Off", "Friendly Fire": "Off",
        LoadOut: "Default", "In-Match Quests": "On", "Only Headshot": "Off",
      },
    },
    expire: { id: 7, dateStr: "2025-04-25T17:00:00Z" },
    entry: 60,
    winning: { _1: 1500, _2: 800, _3: 300 },
    teams: [
      ["uid_037", "uid_038", "uid_039", "uid_040"],
      ["uid_041", "uid_042", "uid_043", "uid_044"],
    ],
    teamswithUserName: [
      ["PurgeCrew1", "PurgeCrew2", "PurgeCrew3", "PurgeCrew4"],
      ["WarlordA", "WarlordB", "WarlordC", "WarlordD"],
    ],
    positions: [["1", "2", "3", "4"], ["5", "6", "7", "8"]],
  },

  {
    _id: "6627a1f2e4b0a1c2d3e4f508",
    battleId: 1008,
    status: "live",
    mode: "survival",
    auth: { roomId: "ROOM1008", roomPass: "solo8888" },
    settings: {
      gameMode: "Battle Royale",
      map: "BERMUDA",
      teamMode: "Solo",
      slots: 30,
      advanceSetting: {
        presetMode: "Headshot Only", EP: "0", revival: "Off", "Movement Speed": "Fast",
        HP: "200", "Jump Height": "Normal", Environment: "Default", "Auto Revival": "Off",
        Vehicles: "Off", UAV: "Off", "Generic Enemy Outfit": "On", "Precise Aim": "On",
        "Gun Attributes": "Normal", "Safe Zone Movin": "Fast", "Limited Ammo": "Off",
        Airdrop: "On", "Out-Of-Zone Damage": "High", Airstrike: "Off",
        "Hide TeamMate Nickname": "On", "Character Skill": "Off", "In-Game Mission": "Off",
        "Quit-Out Penalty": "On", "Fall Damage": "On", "Zone Shrink Speed": "Fast",
        "High Tier Loot Zone": "Off", Airship: "Off", "Friendly Fire": "Off",
        LoadOut: "Default", "In-Match Quests": "Off", "Only Headshot": "On",
      },
    },
    expire: { id: 8, dateStr: "2025-04-16T22:00:00Z" },
    entry: 15,
    winning: { _1: 300, _2: 150, _3: 75 },
    teams: [["uid_045"], ["uid_046"], ["uid_047"], ["uid_048"]],
    teamswithUserName: [["HeadshotKing"], ["QuickScope"], ["OneShot"], ["NoMiss"]],
    positions: [["1"], ["2"], ["3"], ["4"]],
  },

  {
    _id: "6627a1f2e4b0a1c2d3e4f509",
    battleId: 1009,
    status: "upcoming",
    mode: "survival",
    auth: { roomId: "ROOM1009", roomPass: "vip2025" },
    settings: {
      gameMode: "Clash Squad",
      map: "BERMUDA",
      teamMode: "Duo",
      slots: 16,
      advanceSetting: {
        presetMode: "Custom", EP: "100", revival: "Off", "Movement Speed": "Normal",
        HP: "200", "Jump Height": "Normal", Environment: "Default", "Auto Revival": "Off",
        Vehicles: "On", UAV: "Off", "Generic Enemy Outfit": "Off", "Precise Aim": "Off",
        "Gun Attributes": "Enhanced", "Safe Zone Movin": "Normal", "Limited Ammo": "Off",
        Airdrop: "On", "Out-Of-Zone Damage": "Normal", Airstrike: "Off",
        "Hide TeamMate Nickname": "Off", "Character Skill": "On", "In-Game Mission": "Off",
        "Quit-Out Penalty": "On", "Fall Damage": "On", "Zone Shrink Speed": "Normal",
        "High Tier Loot Zone": "On", Airship: "Off", "Friendly Fire": "Off",
        LoadOut: "Custom", "In-Match Quests": "On", "Only Headshot": "Off",
      },
    },
    expire: { id: 9, dateStr: "2025-04-28T15:00:00Z" },
    entry: 200,
    winning: { _1: 5000, _2: 2500, _3: 1000 },
    teams: [["uid_049", "uid_050"], ["uid_051", "uid_052"], ["uid_053", "uid_054"]],
    teamswithUserName: [["VIPDuo_A", "VIPDuo_B"], ["EliteX", "EliteY"], ["ProPair1", "ProPair2"]],
    positions: [["1", "2"], ["3", "4"], ["5", "6"]],
  },

  {
    _id: "6627a1f2e4b0a1c2d3e4f510",
    battleId: 1010,
    status: "completed",
    mode: "scoring",
    settings: {
      gameMode: "Battle Royale",
      map: "KALAHARI",
      teamMode: "Solo",
      slots: 25,
      advanceSetting: {
        presetMode: "Default", EP: "100", revival: "Off", "Movement Speed": "Normal",
        HP: "200", "Jump Height": "Normal", Environment: "Default", "Auto Revival": "Off",
        Vehicles: "On", UAV: "Off", "Generic Enemy Outfit": "Off", "Precise Aim": "Off",
        "Gun Attributes": "Normal", "Safe Zone Movin": "Normal", "Limited Ammo": "Off",
        Airdrop: "On", "Out-Of-Zone Damage": "Normal", Airstrike: "Off",
        "Hide TeamMate Nickname": "Off", "Character Skill": "On", "In-Game Mission": "On",
        "Quit-Out Penalty": "On", "Fall Damage": "On", "Zone Shrink Speed": "Normal",
        "High Tier Loot Zone": "On", Airship: "Off", "Friendly Fire": "Off",
        LoadOut: "Default", "In-Match Quests": "On", "Only Headshot": "Off",
      },
    },
    expire: { id: 10, dateStr: "2025-04-05T12:00:00Z" },
    entry: 25,
    winning: { _1: 600, _2: 300, _3: 100 },
    teams: [["uid_055"], ["uid_056"], ["uid_057"], ["uid_058"], ["uid_059"]],
    teamswithUserName: [["Champion99"], ["Runner_Up"], ["BronzeStar"], ["Desert4th"], ["Kalahari5"]],
    positions: [["1"], ["2"], ["3"], ["4"], ["5"]],
  },
];

// Mock API responses
const mockResponses: responseType<battleType[]> = {
  success: true,
  data: mockBattles,
};

const mockSingleBattle: responseType<battleType> = {
  success: true,
  data: mockBattles[0],
};

const mockErrorResponse: responseType<battleType> = {
  success: false,
  error: "Battle not found",
};

export const getAllBattles = async ({
  token,
}: {
  token: string | undefined;
}): Promise<responseType<battleType[]>> => {
  return mockResponses
  // try {
  //   const json = await axios({
  //     method: "GET",
  //     url: `${domain}/battle/get/all`,
  //     headers: {
  //       apikey,
  //       Authorization: token,
  //     },
  //   });

  //   return {
  //     success: json.data.success,
  //     data: json.data.data,
  //   };
  // } catch (error: unknown) {
  //   // Check if the error is an AxiosError and has a response property
  //   if (axios.isAxiosError(error) && error.response) {
  //     return {
  //       success: error.response.data.success || false,
  //       data: [],
  //       error: error.response.data.error || "An error occurred",
  //     };
  //   }

  //   // Handle any other error types
  //   return {
  //     success: false,
  //     data: [],
  //     error: "An unexpected error occurred",
  //   };
  // }
};

export const getSingleBattle = async (
  _id: string
): Promise<responseType<battleType>> => {
  return mockSingleBattle
  // try {
  //   const response = await axios.get(`${domain}/battle/get/${_id}` , {headers: {apikey}});
  //   return {
  //     success: response.data.success,
  //     data: response.data.data,
  //   };
  // } catch (error: unknown) {
  //   // Check if the error is an AxiosError and has a response property
  //   if (axios.isAxiosError(error) && error.response) {
  //     return {
  //       success: error.response.data.success || false,
  //       error: error.response.data.error || "An error occurred",
  //     };
  //   }
  //   // Handle any other error types
  //   return {
  //     success: false,
  //     error: "An unexpected error occurred",
  //   };
  // }
};

export const getRegisterdBattle = async ({token}: {token: string | undefined }) :Promise<responseType<{
  lenght: number,
  battles: battleType[]
  }>> => {
  if(!token){
    return {
      success: false,
      error: "unAuthorized !"
    }
  }
  try {
    const response = await axios.get(`${domain}/battle/get/registeredbattle`, {
      headers: {
        apikey,
        Authorization: token
      }
    });
    return {
      success: response.data.success,
      data: response.data.data,
    };
  } catch (error: unknown) {
    // Check if the error is an AxiosError and has a response property
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: error.response.data.success || false,
        error: error.response.data.error || "An error occurred",
      };
    }
    // Handle any other error types
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}
export const getCompletedBattle = async ({token}: {token: string | undefined }) :Promise<responseType<{
  lenght: number,
  battles: battleType[]
  }>> => {
  if(!token){
    return {
      success: false,
      error: "unAuthorized !"
    }
  }
  try {
    const response = await axios.get(`${domain}/battle/get/completed`, {
      headers: {
        apikey,
        Authorization: token
      }
    });
    return {
      success: response.data.success,
      data: response.data.data,
    };
  } catch (error: unknown) {
    // Check if the error is an AxiosError and has a response property
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: error.response.data.success || false,
        error: error.response.data.error || "An error occurred",
      };
    }
    // Handle any other error types
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

export const joinBattle = async ({battle, members, Authorization, UserNameMembers}: {
  battle: string,
  members: string[],
  UserNameMembers: string[],
  Authorization: string | undefined
}) : Promise<responseType<string>> => {

  if(!Authorization){
    return {
      success: false,
      error: "unauthorized"
    }
  };
  try {
    const json = await axios({
          method: "POST",
          url: `${domain}/battle/join`,
          data: {
            battle, members, UserNameMembers
          },
          headers: {
            apikey,
            Authorization
          }
        });

    return {
      success: json.data.success,
      data: json.data.data,
    };
  } catch (error: unknown) {
    // Check if the error is an AxiosError and has a response property
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.data)
      return {
        success: error.response.data.success || false,
        error: error.response.data.error || "An error occurred",
      };
    }

    // Handle any other error types
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
};

// const fetchUpcomingBattles = async ( authorization: string | undefined ) => {
//   if(!authorization){
//     return {
//       success: false,
//       error: "unathorized!"
//     }
//   }
//   try {
//     const json = await axios({
//       method: "GET",
//       url: `${domain}/battle/get/upcoming`,
//       headers: {
//         Authorization: authorization
//       }
//     });
//     return json.data;
//   } catch (err) {
//     return err.response.data
    // Defining the error type as AxiosError
    // if (axios.isAxiosError(err)) {
    //   // console.log(err.response?.data); // you can access the response here
    //   return err.response?.data; // return the response data in case of an error
    // } else {
    //   console.log('Unexpected error:', err); // in case of an unexpected error (non-Axios error)
    //   return { message: 'Unexpected error occurred' };
    // }
//   }
// }
