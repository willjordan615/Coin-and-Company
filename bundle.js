const GUILD_DATA = {
  "statuses": [
    {
      "id": "pauper",
      "name": "Pauper",
      "recruitCost": 2,
      "salary": 1,
      "startingGold": 8
    },
    {
      "id": "commoner",
      "name": "Commoner",
      "recruitCost": 5,
      "salary": 2,
      "startingGold": 12
    },
    {
      "id": "professional",
      "name": "Professional",
      "recruitCost": 9,
      "salary": 3,
      "startingGold": 16
    },
    {
      "id": "gentry",
      "name": "Gentry",
      "recruitCost": 14,
      "salary": 4,
      "startingGold": 22
    },
    {
      "id": "noble",
      "name": "Noble",
      "recruitCost": 22,
      "salary": 6,
      "startingGold": 32
    }
  ],
  "recruits": [
    {
      "id": "mara-vale",
      "name": "Mara Vale",
      "archetype": "Young Smith",
      "status": "gentry",
      "traits": [
        "Smith",
        "Craftsman",
        "Noble"
      ],
      "resources": 1,
      "connections": 2
    },
    {
      "id": "edwin-stone",
      "name": "Edwin Stone",
      "archetype": "Village Blacksmith",
      "status": "commoner",
      "traits": [
        "Smith",
        "Craftsman",
        "Strong"
      ],
      "resources": 2,
      "connections": 0
    },
    {
      "id": "lina-reed",
      "name": "Lina Reed",
      "archetype": "Herbalist",
      "status": "commoner",
      "traits": [
        "Healer",
        "Rural",
        "Patient"
      ],
      "resources": 1,
      "connections": 1
    },
    {
      "id": "corvin-ash",
      "name": "Corvin Ash",
      "archetype": "Disgraced Soldier",
      "status": "professional",
      "traits": [
        "Soldier",
        "Veteran",
        "Disgraced"
      ],
      "resources": 1,
      "connections": 0
    },
    {
      "id": "tomas-pell",
      "name": "Tomas Pell",
      "archetype": "Scribe",
      "status": "commoner",
      "traits": [
        "Scholar",
        "Clerk",
        "Careful"
      ],
      "resources": 0,
      "connections": 1
    },
    {
      "id": "yara-fen",
      "name": "Yara Fen",
      "archetype": "Hunter",
      "status": "pauper",
      "traits": [
        "Hunter",
        "Rural",
        "Scout"
      ],
      "resources": 1,
      "connections": 0
    },
    {
      "id": "alric-voss",
      "name": "Alric Voss",
      "archetype": "Minor Noble",
      "status": "noble",
      "traits": [
        "Noble",
        "Diplomat",
        "Connected"
      ],
      "resources": 1,
      "connections": 4
    },
    {
      "id": "brenna-coal",
      "name": "Brenna Coal",
      "archetype": "Miner",
      "status": "pauper",
      "traits": [
        "Miner",
        "Strong",
        "Rural"
      ],
      "resources": 2,
      "connections": 0
    },
    {
      "id": "sel-ward",
      "name": "Sel Ward",
      "archetype": "Carpenter",
      "status": "commoner",
      "traits": [
        "Builder",
        "Craftsman",
        "Practical"
      ],
      "resources": 2,
      "connections": 0
    },
    {
      "id": "irene-moss",
      "name": "Irene Moss",
      "archetype": "Temple Acolyte",
      "status": "commoner",
      "traits": [
        "Faithful",
        "Healer",
        "Scholar"
      ],
      "resources": 0,
      "connections": 1
    },
    {
      "id": "darian-crow",
      "name": "Darian Crow",
      "archetype": "Former Smuggler",
      "status": "professional",
      "traits": [
        "Criminal",
        "Merchant",
        "Scout"
      ],
      "resources": 1,
      "connections": 3
    },
    {
      "id": "oma-bright",
      "name": "Oma Bright",
      "archetype": "Mason",
      "status": "professional",
      "traits": [
        "Builder",
        "Stoneworker",
        "Craftsman"
      ],
      "resources": 2,
      "connections": 0
    }
  ],
  "contracts": [
    {
      "id": "wheat-order",
      "title": "Supply Twenty Bushels of Wheat",
      "type": "Provisioning",
      "risk": "low",
      "description": "Procure and deliver grain before stores run dry.",
      "workSeasons": 1,
      "offerSeasons": 2,
      "baseDifficulty": 34,
      "requirements": [
        {
          "trait": "Farmer",
          "weight": 30
        },
        {
          "trait": "Cook",
          "weight": 30
        }
      ],
      "materials": 2,
      "support": [
        {
          "trait": "Rural",
          "weight": 15
        },
        {
          "trait": "Connected",
          "weight": 15
        },
        {
          "trait": "Frugal",
          "weight": 15
        }
      ],
      "reward": {
        "gold": 12,
        "reputation": 2
      },
      "failure": [
        {
          "type": "material_loss",
          "weight": 45,
          "amount": 1
        },
        {
          "type": "reputation_loss",
          "weight": 25,
          "amount": 2
        },
        {
          "type": "negative_trait",
          "weight": 30,
          "trait": "Overworked"
        }
      ]
    },
    {
      "id": "armor-order",
      "title": "Forge Fifty Sets of Armor",
      "type": "Manufacturing",
      "risk": "moderate",
      "description": "A demanding military order requiring skilled smiths and deep reserves.",
      "workSeasons": 3,
      "offerSeasons": 3,
      "baseDifficulty": 58,
      "requirements": [
        {
          "trait": "Armorer",
          "weight": 30
        },
        {
          "trait": "Blacksmith",
          "weight": 30
        }
      ],
      "materials": 4,
      "support": [
        {
          "trait": "Smith",
          "weight": 15
        },
        {
          "trait": "Craftsman",
          "weight": 15
        },
        {
          "trait": "Practical",
          "weight": 15
        }
      ],
      "reward": {
        "gold": 34,
        "reputation": 5
      },
      "failure": [
        {
          "type": "material_loss",
          "weight": 35,
          "amount": 2
        },
        {
          "type": "negative_trait",
          "weight": 40,
          "trait": "Exhausted"
        },
        {
          "type": "reputation_loss",
          "weight": 25,
          "amount": 4
        }
      ]
    },
    {
      "id": "bridge-repair",
      "title": "Repair the East Bridge",
      "type": "Construction",
      "risk": "moderate",
      "description": "Restore a major trade crossing before the spring floods.",
      "workSeasons": 2,
      "offerSeasons": 3,
      "baseDifficulty": 50,
      "requirements": [
        {
          "trait": "Carpenter",
          "weight": 30
        },
        {
          "trait": "Mason",
          "weight": 30
        }
      ],
      "materials": 3,
      "support": [
        {
          "trait": "Builder",
          "weight": 15
        },
        {
          "trait": "Stoneworker",
          "weight": 15
        },
        {
          "trait": "Craftsman",
          "weight": 15
        }
      ],
      "reward": {
        "gold": 25,
        "reputation": 4
      },
      "failure": [
        {
          "type": "material_loss",
          "weight": 35,
          "amount": 2
        },
        {
          "type": "negative_trait",
          "weight": 40,
          "trait": "Injured"
        },
        {
          "type": "reputation_loss",
          "weight": 25,
          "amount": 3
        }
      ]
    },
    {
      "id": "wolf-hunt",
      "title": "Cull the Grey Wolves",
      "type": "Hunt",
      "risk": "dangerous",
      "description": "A large pack is attacking farms outside town.",
      "workSeasons": 1,
      "offerSeasons": 2,
      "baseDifficulty": 62,
      "requirements": [
        {
          "trait": "Hunter",
          "weight": 30
        },
        {
          "trait": "Soldier",
          "weight": 18
        }
      ],
      "materials": 1,
      "support": [
        {
          "trait": "Scout",
          "weight": 14
        },
        {
          "trait": "Healer",
          "weight": 8
        }
      ],
      "reward": {
        "gold": 22,
        "reputation": 5
      },
      "failure": [
        {
          "type": "injury",
          "weight": 60
        },
        {
          "type": "reputation_loss",
          "weight": 25,
          "amount": 4
        },
        {
          "type": "death",
          "weight": 15
        }
      ]
    },
    {
      "id": "undead-rising",
      "title": "Break the Undead Rising",
      "type": "Crisis",
      "risk": "deadly",
      "description": "The dead have begun walking around an abandoned chapel.",
      "workSeasons": 2,
      "offerSeasons": 1,
      "baseDifficulty": 84,
      "requirements": [
        {
          "trait": "Soldier",
          "weight": 30
        },
        {
          "trait": "Monk",
          "weight": 30
        }
      ],
      "materials": 2,
      "support": [
        {
          "trait": "Faithful",
          "weight": 15
        },
        {
          "trait": "Healer",
          "weight": 15
        },
        {
          "trait": "Scholar",
          "weight": 15
        }
      ],
      "reward": {
        "gold": 45,
        "reputation": 10
      },
      "failure": [
        {
          "type": "injury",
          "weight": 45
        },
        {
          "type": "death",
          "weight": 35
        },
        {
          "type": "negative_trait",
          "weight": 20,
          "trait": "Haunted"
        }
      ]
    },
    {
      "id": "dragon-threat",
      "title": "Confront the Ember Dragon",
      "type": "Legendary Hunt",
      "risk": "lethal",
      "description": "A dragon has claimed the northern pass and demands tribute.",
      "workSeasons": 4,
      "offerSeasons": 2,
      "baseDifficulty": 110,
      "requirements": [
        {
          "trait": "Soldier",
          "weight": 30
        },
        {
          "trait": "Hunter",
          "weight": 30
        },
        {
          "trait": "Outrider",
          "weight": 30
        }
      ],
      "materials": 4,
      "support": [
        {
          "trait": "Veteran",
          "weight": 15
        },
        {
          "trait": "Fearless",
          "weight": 15
        },
        {
          "trait": "Healer",
          "weight": 15
        }
      ],
      "reward": {
        "gold": 80,
        "reputation": 18
      },
      "failure": [
        {
          "type": "death",
          "weight": 55
        },
        {
          "type": "injury",
          "weight": 35
        },
        {
          "type": "negative_trait",
          "weight": 10,
          "trait": "Terrified"
        }
      ]
    },
    {
      "id": "archive-catalog",
      "title": "Catalog the Ducal Archive",
      "type": "Scholarship",
      "risk": "low",
      "description": "Sort damaged records and identify lost titles.",
      "workSeasons": 2,
      "offerSeasons": 4,
      "baseDifficulty": 40,
      "requirements": [
        {
          "trait": "Clerk",
          "weight": 30
        },
        {
          "trait": "Scribe",
          "weight": 30
        }
      ],
      "materials": 0,
      "support": [
        {
          "trait": "Scholar",
          "weight": 15
        },
        {
          "trait": "Careful",
          "weight": 15
        },
        {
          "trait": "Learned",
          "weight": 15
        }
      ],
      "reward": {
        "gold": 16,
        "reputation": 3
      },
      "failure": [
        {
          "type": "reputation_loss",
          "weight": 60,
          "amount": 2
        },
        {
          "type": "negative_trait",
          "weight": 40,
          "trait": "Frustrated"
        }
      ]
    },
    {
      "id": "trade-delegation",
      "title": "Negotiate a Trade Delegation",
      "type": "Diplomacy",
      "risk": "moderate",
      "description": "Secure favorable terms with visiting merchants.",
      "workSeasons": 1,
      "offerSeasons": 2,
      "baseDifficulty": 56,
      "requirements": [
        {
          "trait": "Diplomat",
          "weight": 30
        },
        {
          "trait": "Merchant",
          "weight": 30
        }
      ],
      "materials": 0,
      "support": [
        {
          "trait": "Charming",
          "weight": 15
        },
        {
          "trait": "Noble",
          "weight": 15
        },
        {
          "trait": "Connected",
          "weight": 15
        }
      ],
      "reward": {
        "gold": 28,
        "reputation": 5
      },
      "failure": [
        {
          "type": "reputation_loss",
          "weight": 70,
          "amount": 5
        },
        {
          "type": "gold_loss",
          "weight": 30,
          "amount": 4
        }
      ]
    }
  ]
};

const CONTRACT_PARTS = {
  "settings": {
    "boardSize": 3,
    "contractsPerExtraPlayer": 0,
    "contractSharedSlots": 5,
    "cooperativeClaimantDuelShare": 0.7,
    "keepVisibleFraction": 0.4,
    "beginnerBoardYears": 1,
    "beginnerMinChance": 50,
    "aiMinClaimChance": 45,
    "aiFallbackChanceFactor": 0.75,
    "aiAbsoluteMinChance": 30,
    "guildRosterCap": 6,
    "aiCoreRosterSize": 4,
    "recoverySlots": 2,
    "tavernMarketSize": 5,
    "tavernMarketMax": 6,
    "tavernSeasonalArrivals": 3,
    "aiTurnDelayMs": 550,
    "guildResourceCap": 8,
    "guildConnectionCap": 5,
    "victoryGoals": {
      "gold": 1500,
      "reputation": 400,
      "completed": 80,
      "resources": 75,
      "connections": 75
    },
    "minRewardGold": 6,
    "minRewardReputation": 1,
    "rewardGoldScale": 0.75,
    "requirementWeights": [
      30,
      30,
      30
    ],
    "supportWeights": [
      15,
      15,
      15,
      15
    ],
    "patronFavorThresholds": {
      "ready": 2,
      "training": 4,
      "slot": 6,
      "ally": 8
    },
    "materialBonusByTwist": {
      "grand": 1
    },
    "limits": {
      "workSeasons": [
        1,
        5
      ],
      "offerSeasons": [
        1,
        4
      ],
      "materials": [
        0,
        5
      ]
    }
  },
  "world": {
    "states": [
      {
        "key": "food",
        "label": "Food Supply",
        "low": "scarce",
        "mid": "strained",
        "high": "secure"
      },
      {
        "key": "trade",
        "label": "Trade Stability",
        "low": "disrupted",
        "mid": "uneven",
        "high": "busy"
      },
      {
        "key": "military",
        "label": "Military Strength",
        "low": "thin",
        "mid": "mobilizing",
        "high": "dominant"
      },
      {
        "key": "order",
        "label": "Public Order",
        "low": "unsettled",
        "mid": "watchful",
        "high": "calm"
      },
      {
        "key": "faith",
        "label": "Religious Influence",
        "low": "quiet",
        "mid": "present",
        "high": "fervent"
      },
      {
        "key": "monsters",
        "label": "Monster Activity",
        "low": "distant",
        "mid": "troubling",
        "high": "rampant"
      },
      {
        "key": "politics",
        "label": "Political Stability",
        "low": "fractious",
        "mid": "tense",
        "high": "settled"
      }
    ],
    "starts": [
      {
        "name": "uneasy peace",
        "ranges": {
          "food": [
            45,
            75
          ],
          "trade": [
            45,
            75
          ],
          "military": [
            35,
            60
          ],
          "order": [
            45,
            75
          ],
          "faith": [
            35,
            65
          ],
          "monsters": [
            20,
            50
          ],
          "politics": [
            40,
            70
          ]
        }
      },
      {
        "name": "border war",
        "ranges": {
          "food": [
            25,
            55
          ],
          "trade": [
            20,
            50
          ],
          "military": [
            65,
            90
          ],
          "order": [
            25,
            55
          ],
          "faith": [
            35,
            70
          ],
          "monsters": [
            25,
            60
          ],
          "politics": [
            20,
            55
          ]
        }
      },
      {
        "name": "hungry winter",
        "ranges": {
          "food": [
            10,
            35
          ],
          "trade": [
            25,
            55
          ],
          "military": [
            35,
            65
          ],
          "order": [
            25,
            55
          ],
          "faith": [
            45,
            80
          ],
          "monsters": [
            35,
            70
          ],
          "politics": [
            35,
            65
          ]
        }
      },
      {
        "name": "religious revival",
        "ranges": {
          "food": [
            35,
            65
          ],
          "trade": [
            35,
            65
          ],
          "military": [
            30,
            60
          ],
          "order": [
            40,
            70
          ],
          "faith": [
            75,
            95
          ],
          "monsters": [
            25,
            60
          ],
          "politics": [
            35,
            70
          ]
        }
      },
      {
        "name": "merchant boom",
        "ranges": {
          "food": [
            55,
            85
          ],
          "trade": [
            75,
            95
          ],
          "military": [
            25,
            55
          ],
          "order": [
            50,
            80
          ],
          "faith": [
            25,
            60
          ],
          "monsters": [
            15,
            45
          ],
          "politics": [
            45,
            75
          ]
        }
      }
    ],
    "pools": [
      {
        "key": "Agriculture",
        "types": [
          "Provisioning",
          "Agriculture",
          "Relief",
          "Emergency",
          "Sanitation"
        ],
        "pressure": {
          "food": "low",
          "order": "low"
        },
        "effects": {
          "food": 8,
          "order": 2
        }
      },
      {
        "key": "Military",
        "types": [
          "Guard Duty",
          "Defense",
          "Combat",
          "Assault",
          "Legendary Hunt",
          "Hunt",
          "Crisis"
        ],
        "pressure": {
          "military": "high",
          "order": "low",
          "monsters": "high"
        },
        "effects": {
          "order": 5,
          "military": 3,
          "monsters": -4
        }
      },
      {
        "key": "Commerce",
        "types": [
          "Commerce",
          "Diplomacy",
          "Logistics",
          "Accounting",
          "Harbor Works"
        ],
        "pressure": {
          "trade": "high",
          "politics": "high"
        },
        "effects": {
          "trade": 5,
          "politics": 2
        }
      },
      {
        "key": "Exploration",
        "types": [
          "Expedition",
          "Extraction",
          "Investigation",
          "Intrigue"
        ],
        "pressure": {
          "monsters": "high",
          "trade": "low",
          "politics": "low"
        },
        "effects": {
          "trade": 3,
          "monsters": -2,
          "politics": 2
        }
      },
      {
        "key": "Religion",
        "types": [
          "Pilgrimage",
          "Inquiry"
        ],
        "traits": [
          "Faithful"
        ],
        "pressure": {
          "faith": "high",
          "monsters": "high"
        },
        "effects": {
          "faith": 4,
          "order": 3,
          "monsters": -2
        }
      },
      {
        "key": "Civic",
        "types": [
          "Civic",
          "Public Works",
          "Construction",
          "Engineering",
          "Legal",
          "Administration"
        ],
        "pressure": {
          "order": "low",
          "politics": "low"
        },
        "effects": {
          "order": 6,
          "politics": 3,
          "trade": 2
        }
      },
      {
        "key": "Crafting",
        "types": [
          "Manufacturing",
          "Foundry"
        ],
        "traits": [
          "Smith",
          "Craftsman"
        ],
        "pressure": {
          "trade": "high",
          "military": "high"
        },
        "effects": {
          "trade": 3,
          "military": 2
        }
      }
    ]
  },
  "facilities": [
    {
      "key": "training",
      "label": "Training Yard",
      "identity": "Military Company",
      "slots": 1,
      "description": "Drill combat discipline. Worker time is the cost.",
      "trainChance": 38,
      "traits": [
        "Battlewise",
        "Strong",
        "Fearless"
      ],
      "rareTraits": [
        "Veteran"
      ],
      "rareChance": 0.12
    },
    {
      "key": "chapel",
      "label": "Chapel",
      "identity": "Religious Order",
      "slots": 1,
      "description": "Prayer, discipline, and spiritual care.",
      "trainChance": 34,
      "traits": [
        "Faithful",
        "Patient",
        "Compassionate"
      ],
      "rareTraits": []
    },
    {
      "key": "archives",
      "label": "Archives",
      "identity": "Scholarly Society",
      "slots": 1,
      "description": "Study records, law, maps, and methods.",
      "trainChance": 36,
      "traits": [
        "Scholar",
        "Careful",
        "Learned",
        "Curious"
      ],
      "rareTraits": []
    },
    {
      "key": "workshop",
      "label": "Workshop",
      "identity": "Craft Guild",
      "slots": 1,
      "description": "Practice craft, repair tools, and learn production habits.",
      "trainChance": 36,
      "traits": [
        "Craftsman",
        "Smith",
        "Practical",
        "Inventive"
      ],
      "rareTraits": []
    },
    {
      "key": "market",
      "label": "Market Hall",
      "identity": "Merchant House",
      "slots": 1,
      "description": "Build trade sense and social access.",
      "trainChance": 34,
      "traits": [
        "Connected",
        "Shrewd",
        "Charming",
        "Influential"
      ],
      "rareTraits": []
    },
    {
      "key": "scout",
      "label": "Scout Lodge",
      "identity": "Explorer Lodge",
      "slots": 1,
      "description": "Fieldcraft, route-finding, and hard travel.",
      "trainChance": 36,
      "traits": [
        "Scout",
        "Watchful",
        "Hardy",
        "Resourceful"
      ],
      "rareTraits": []
    },
    {
      "key": "infirmary",
      "label": "Infirmary",
      "identity": "Relief Brotherhood",
      "slots": 1,
      "description": "Treat injuries and exhaustion.",
      "trainChance": 18,
      "traits": [
        "Healer",
        "Patient"
      ],
      "rareTraits": []
    },
    {
      "key": "common",
      "label": "Common Room",
      "identity": "Civic League",
      "slots": 2,
      "description": "Rest, food, stories, and guild cohesion.",
      "trainChance": 20,
      "traits": [
        "Generous",
        "Honest",
        "Resourceful"
      ],
      "rareTraits": []
    }
  ],
  "conditions": [
    {
      "key": "Overworked",
      "kind": "strain",
      "duration": 1,
      "penalty": 8,
      "recoveryPerRest": 1,
      "description": "Clears after one rest season. Represents fatigue and mistakes from pushing too hard."
    },
    {
      "key": "Exhausted",
      "kind": "strain",
      "duration": 2,
      "penalty": 12,
      "recoveryPerRest": 1,
      "description": "Clears with rest over time. Worse than Overworked."
    },
    {
      "key": "Frustrated",
      "kind": "morale",
      "duration": 2,
      "penalty": 6,
      "recoveryPerRest": 1,
      "description": "Temporary morale drag from unrewarding or failed work."
    },
    {
      "key": "Embarrassed",
      "kind": "morale",
      "duration": 1,
      "penalty": 5,
      "recoveryPerRest": 1,
      "description": "Short-lived confidence loss after a public failure."
    },
    {
      "key": "Bitter",
      "kind": "morale",
      "duration": 2,
      "penalty": 8,
      "recoveryPerRest": 1,
      "description": "Temporary resentment from costly or underfunded work."
    },
    {
      "key": "Compromised",
      "kind": "morale",
      "duration": 3,
      "penalty": 10,
      "recoveryPerRest": 1,
      "description": "Temporary social risk from secretive failure."
    },
    {
      "key": "Shaken",
      "kind": "morale",
      "duration": 2,
      "penalty": 12,
      "recoveryPerRest": 1,
      "description": "Temporary fear after danger. Rest can clear it."
    },
    {
      "key": "Haunted",
      "kind": "trauma",
      "duration": 4,
      "penalty": 14,
      "recoveryPerRest": 1,
      "description": "Longer trauma from supernatural or deadly work."
    },
    {
      "key": "Frostbitten",
      "kind": "injury",
      "duration": 2,
      "penalty": 10,
      "recoveryPerRest": 1,
      "description": "Temporary winter injury. Rest can clear it."
    },
    {
      "key": "Injured",
      "kind": "injury",
      "duration": 2,
      "penalty": 18,
      "recoveryPerRest": 1,
      "description": "Temporary injury. Rest before assigning them to risky work."
    },
    {
      "key": "Maimed",
      "kind": "wound",
      "duration": null,
      "penalty": 18,
      "recoveryPerRest": 0,
      "description": "Permanent wound. This does not heal through rest."
    },
    {
      "key": "Dead",
      "kind": "terminal",
      "duration": null,
      "penalty": 0,
      "recoveryPerRest": 0,
      "description": "Gone from active work, kept in guild history."
    }
  ],
  "patrons": [
    {
      "key": "abbey",
      "name": "the Abbey",
      "trait": "Faithful",
      "facility": "chapel",
      "path": "Sanctuary",
      "lane": "reputation",
      "difficulty": 2,
      "gold": 2,
      "rep": 1
    },
    {
      "key": "duke",
      "name": "the Ducal Court",
      "trait": "Noble",
      "facility": "common",
      "path": "Courtly Salon",
      "lane": "reputation",
      "difficulty": 6,
      "gold": 8,
      "rep": 2
    },
    {
      "key": "market",
      "name": "the Market League",
      "trait": "Shrewd",
      "facility": "market",
      "path": "Exchange Floor",
      "lane": "gold",
      "difficulty": 3,
      "gold": 7,
      "rep": 0
    },
    {
      "key": "watch",
      "name": "the Town Watch",
      "trait": "Watchful",
      "facility": "training",
      "path": "Militia Drill",
      "lane": "completed",
      "difficulty": 4,
      "gold": 4,
      "rep": 1
    },
    {
      "key": "farmers",
      "name": "the Free Farmers",
      "trait": "Rural",
      "facility": "scout",
      "path": "Field Routes",
      "lane": "resources",
      "difficulty": 0,
      "gold": 1,
      "rep": 1
    },
    {
      "key": "university",
      "name": "the University",
      "trait": "Scholar",
      "facility": "archives",
      "path": "Research Chair",
      "lane": "connections",
      "difficulty": 5,
      "gold": 5,
      "rep": 2
    },
    {
      "key": "caravan",
      "name": "a Foreign Caravan",
      "trait": "Connected",
      "facility": "market",
      "path": "Caravan Office",
      "lane": "connections",
      "difficulty": 7,
      "gold": 10,
      "rep": 1
    },
    {
      "key": "frontier",
      "name": "the Frontier Villages",
      "trait": "Hardy",
      "facility": "scout",
      "path": "Border Scouts",
      "lane": "completed",
      "difficulty": 4,
      "gold": 3,
      "rep": 2
    },
    {
      "key": "shipwrights",
      "name": "the River Shipwrights",
      "trait": "Craftsman",
      "facility": "workshop",
      "path": "Riverwright Bay",
      "lane": "resources",
      "difficulty": 3,
      "gold": 6,
      "rep": 1
    },
    {
      "key": "masons",
      "name": "the Stonecutters' Hall",
      "trait": "Stoneworker",
      "facility": "workshop",
      "path": "Stone Yard",
      "lane": "completed",
      "difficulty": 4,
      "gold": 5,
      "rep": 1
    },
    {
      "key": "miners",
      "name": "the Deep Mine Compact",
      "trait": "Strong",
      "facility": "infirmary",
      "path": "Hard-Labor Ward",
      "lane": "resources",
      "difficulty": 5,
      "gold": 7,
      "rep": 1
    },
    {
      "key": "pilgrims",
      "name": "a Pilgrim Host",
      "trait": "Patient",
      "facility": "chapel",
      "path": "Pilgrim House",
      "lane": "completed",
      "difficulty": 1,
      "gold": 1,
      "rep": 3
    },
    {
      "key": "magistrates",
      "name": "the Magistrates' Bench",
      "trait": "Careful",
      "facility": "archives",
      "path": "Legal Records",
      "lane": "reputation",
      "difficulty": 6,
      "gold": 5,
      "rep": 3
    },
    {
      "key": "borderlords",
      "name": "the Border Lords",
      "trait": "Veteran",
      "facility": "training",
      "path": "Border Camp",
      "lane": "completed",
      "difficulty": 9,
      "gold": 12,
      "rep": 2
    },
    {
      "key": "orphans",
      "name": "the Orphans' Trust",
      "trait": "Compassionate",
      "facility": "infirmary",
      "path": "Mercy Ward",
      "lane": "reputation",
      "difficulty": 0,
      "gold": 0,
      "rep": 4
    },
    {
      "key": "underworld",
      "name": "a Discreet Underworld Broker",
      "trait": "Criminal",
      "facility": "common",
      "path": "Back Room",
      "lane": "gold",
      "difficulty": 8,
      "gold": 14,
      "rep": -1
    }
  ],
  "twists": [
    {
      "key": "routine",
      "label": "",
      "risk": "low",
      "difficulty": -4,
      "work": 0,
      "offer": 1,
      "gold": -2,
      "rep": 0,
      "failure": [
        {
          "type": "material_loss",
          "weight": 45,
          "amount": 1
        },
        {
          "type": "reputation_loss",
          "weight": 25,
          "amount": 2
        },
        {
          "type": "negative_trait",
          "weight": 30,
          "trait": "Overworked"
        }
      ]
    },
    {
      "key": "urgent",
      "label": "Urgent ",
      "risk": "moderate",
      "difficulty": 6,
      "work": -1,
      "offer": -1,
      "gold": 6,
      "rep": 1,
      "failure": [
        {
          "type": "material_loss",
          "weight": 25,
          "amount": 1
        },
        {
          "type": "reputation_loss",
          "weight": 45,
          "amount": 3
        },
        {
          "type": "negative_trait",
          "weight": 30,
          "trait": "Exhausted"
        }
      ]
    },
    {
      "key": "secret",
      "label": "Secret ",
      "risk": "moderate",
      "difficulty": 8,
      "work": 0,
      "offer": 0,
      "gold": 8,
      "rep": 0,
      "failure": [
        {
          "type": "reputation_loss",
          "weight": 60,
          "amount": 4
        },
        {
          "type": "negative_trait",
          "weight": 40,
          "trait": "Compromised"
        }
      ]
    },
    {
      "key": "dangerous",
      "label": "Dangerous ",
      "risk": "dangerous",
      "difficulty": 14,
      "work": 0,
      "offer": 0,
      "gold": 12,
      "rep": 2,
      "failure": [
        {
          "type": "injury",
          "weight": 55
        },
        {
          "type": "reputation_loss",
          "weight": 25,
          "amount": 4
        },
        {
          "type": "death",
          "weight": 20
        }
      ]
    },
    {
      "key": "grand",
      "label": "Grand ",
      "risk": "deadly",
      "difficulty": 24,
      "work": 1,
      "offer": 0,
      "gold": 22,
      "rep": 5,
      "failure": [
        {
          "type": "death",
          "weight": 35
        },
        {
          "type": "injury",
          "weight": 45
        },
        {
          "type": "negative_trait",
          "weight": 20,
          "trait": "Haunted"
        }
      ]
    },
    {
      "key": "long",
      "label": "Long-Term ",
      "risk": "moderate",
      "difficulty": 10,
      "work": 2,
      "offer": 1,
      "gold": 16,
      "rep": 3,
      "failure": [
        {
          "type": "material_loss",
          "weight": 30,
          "amount": 2
        },
        {
          "type": "negative_trait",
          "weight": 45,
          "trait": "Frustrated"
        },
        {
          "type": "reputation_loss",
          "weight": 25,
          "amount": 4
        }
      ]
    },
    {
      "key": "underfunded",
      "label": "Underfunded ",
      "risk": "moderate",
      "difficulty": 4,
      "work": 0,
      "offer": 1,
      "gold": -6,
      "rep": 3,
      "failure": [
        {
          "type": "gold_loss",
          "weight": 25,
          "amount": 4
        },
        {
          "type": "negative_trait",
          "weight": 45,
          "trait": "Bitter"
        },
        {
          "type": "reputation_loss",
          "weight": 30,
          "amount": 3
        }
      ]
    },
    {
      "key": "prestige",
      "label": "Prestige ",
      "risk": "low",
      "difficulty": 8,
      "work": 0,
      "offer": 2,
      "gold": -1,
      "rep": 5,
      "failure": [
        {
          "type": "reputation_loss",
          "weight": 70,
          "amount": 5
        },
        {
          "type": "negative_trait",
          "weight": 30,
          "trait": "Embarrassed"
        }
      ]
    },
    {
      "key": "volatile",
      "label": "Volatile ",
      "risk": "dangerous",
      "difficulty": 18,
      "work": 1,
      "offer": -1,
      "gold": 18,
      "rep": 2,
      "failure": [
        {
          "type": "injury",
          "weight": 40
        },
        {
          "type": "death",
          "weight": 20
        },
        {
          "type": "gold_loss",
          "weight": 15,
          "amount": 5
        },
        {
          "type": "negative_trait",
          "weight": 25,
          "trait": "Shaken"
        }
      ]
    },
    {
      "key": "winter",
      "label": "Winterbound ",
      "risk": "dangerous",
      "difficulty": 12,
      "work": 1,
      "offer": 0,
      "gold": 10,
      "rep": 2,
      "failure": [
        {
          "type": "injury",
          "weight": 40
        },
        {
          "type": "material_loss",
          "weight": 20,
          "amount": 1
        },
        {
          "type": "negative_trait",
          "weight": 40,
          "trait": "Frostbitten"
        }
      ]
    }
  ],
  "jobs": [
    {
      "key": "grain",
      "title": "Supply Grain Stores",
      "type": "Provisioning",
      "desc": "Procure food before local stores run low.",
      "traits": [
        "Farmer",
        "Cook"
      ],
      "support": [
        "Rural",
        "Connected",
        "Frugal"
      ],
      "materials": 2,
      "work": 1,
      "offer": 2,
      "difficulty": 32,
      "gold": 12,
      "rep": 2
    },
    {
      "key": "armor",
      "title": "Forge Armor Sets",
      "type": "Manufacturing",
      "desc": "Fill a demanding order for fitted mail and plate.",
      "traits": [
        "Armorer",
        "Blacksmith"
      ],
      "support": [
        "Smith",
        "Craftsman",
        "Practical"
      ],
      "materials": 4,
      "work": 3,
      "offer": 3,
      "difficulty": 58,
      "gold": 34,
      "rep": 5
    },
    {
      "key": "bridge",
      "title": "Repair a Trade Bridge",
      "type": "Construction",
      "desc": "Restore a vital crossing before travel fails.",
      "traits": [
        "Carpenter",
        "Mason"
      ],
      "support": [
        "Builder",
        "Stoneworker",
        "Craftsman"
      ],
      "materials": 3,
      "work": 2,
      "offer": 3,
      "difficulty": 50,
      "gold": 25,
      "rep": 4
    },
    {
      "key": "hunt",
      "title": "Cull a Predator Pack",
      "type": "Hunt",
      "desc": "Track and drive off beasts threatening farms.",
      "traits": [
        "Hunter",
        "Forester"
      ],
      "support": [
        "Scout",
        "Watchful",
        "Healer"
      ],
      "materials": 1,
      "work": 1,
      "offer": 2,
      "difficulty": 62,
      "gold": 22,
      "rep": 5
    },
    {
      "key": "undead",
      "title": "Cleanse a Restless Chapel",
      "type": "Crisis",
      "desc": "Investigate graves that refuse to stay quiet.",
      "traits": [
        "Soldier",
        "Monk"
      ],
      "support": [
        "Faithful",
        "Healer",
        "Scholar"
      ],
      "materials": 2,
      "work": 2,
      "offer": 1,
      "difficulty": 84,
      "gold": 45,
      "rep": 10
    },
    {
      "key": "archive",
      "title": "Catalog Lost Records",
      "type": "Scholarship",
      "desc": "Recover, sort, and interpret damaged documents.",
      "traits": [
        "Clerk",
        "Scribe"
      ],
      "support": [
        "Scholar",
        "Careful",
        "Learned"
      ],
      "materials": 0,
      "work": 2,
      "offer": 4,
      "difficulty": 40,
      "gold": 16,
      "rep": 3
    },
    {
      "key": "delegation",
      "title": "Negotiate Trade Terms",
      "type": "Diplomacy",
      "desc": "Secure an agreement before talks collapse.",
      "traits": [
        "Diplomat",
        "Merchant"
      ],
      "support": [
        "Charming",
        "Connected",
        "Noble"
      ],
      "materials": 0,
      "work": 1,
      "offer": 2,
      "difficulty": 56,
      "gold": 28,
      "rep": 5
    },
    {
      "key": "road",
      "title": "Survey a New Road",
      "type": "Logistics",
      "desc": "Chart a safer route through contested land.",
      "traits": [
        "Outrider",
        "Courier"
      ],
      "support": [
        "Scout",
        "Rural",
        "Resourceful"
      ],
      "materials": 2,
      "work": 2,
      "offer": 3,
      "difficulty": 48,
      "gold": 20,
      "rep": 4
    },
    {
      "key": "mine",
      "title": "Reopen a Flooded Mine",
      "type": "Extraction",
      "desc": "Make a collapsed mine productive again.",
      "traits": [
        "Miner",
        "Stonecutter"
      ],
      "support": [
        "Strong",
        "Stoneworker",
        "Builder"
      ],
      "materials": 3,
      "work": 3,
      "offer": 3,
      "difficulty": 60,
      "gold": 32,
      "rep": 4
    },
    {
      "key": "hospital",
      "title": "Staff a Fever House",
      "type": "Relief",
      "desc": "Treat the sick and organize clean supplies.",
      "traits": [
        "Physician",
        "Apothecary"
      ],
      "support": [
        "Healer",
        "Patient",
        "Compassionate"
      ],
      "materials": 2,
      "work": 2,
      "offer": 2,
      "difficulty": 52,
      "gold": 18,
      "rep": 6
    },
    {
      "key": "charter",
      "title": "Secure a Guild Charter",
      "type": "Influence",
      "desc": "Win approvals from officials and rivals.",
      "traits": [
        "Tax Collector",
        "Diplomat"
      ],
      "support": [
        "Noble",
        "Connected",
        "Influential"
      ],
      "materials": 0,
      "work": 2,
      "offer": 3,
      "difficulty": 64,
      "gold": 30,
      "rep": 7
    },
    {
      "key": "smugglers",
      "title": "Expose a Smuggling Ring",
      "type": "Investigation",
      "desc": "Trace hidden routes and identify collaborators.",
      "traits": [
        "Smuggler",
        "Warden"
      ],
      "support": [
        "Criminal",
        "Scout",
        "Secretive"
      ],
      "materials": 1,
      "work": 2,
      "offer": 2,
      "difficulty": 66,
      "gold": 31,
      "rep": 6
    },
    {
      "key": "festival",
      "title": "Prepare a Town Festival",
      "type": "Civic",
      "desc": "Build stalls, arrange vendors, and keep peace.",
      "traits": [
        "Innkeeper",
        "Carpenter"
      ],
      "support": [
        "Charming",
        "Craftsman",
        "Generous"
      ],
      "materials": 2,
      "work": 1,
      "offer": 3,
      "difficulty": 38,
      "gold": 15,
      "rep": 4
    },
    {
      "key": "relic",
      "title": "Recover a Border Relic",
      "type": "Expedition",
      "desc": "Find an artifact before claimants turn violent.",
      "traits": [
        "Tutor",
        "Forester"
      ],
      "support": [
        "Scholar",
        "Faithful",
        "Curious"
      ],
      "materials": 1,
      "work": 2,
      "offer": 2,
      "difficulty": 72,
      "gold": 38,
      "rep": 8
    },
    {
      "key": "escort",
      "title": "Escort a Valuable Convoy",
      "type": "Guard Duty",
      "desc": "Protect travelers carrying goods and secrets.",
      "traits": [
        "Soldier",
        "Outrider"
      ],
      "support": [
        "Watchful",
        "Battlewise",
        "Connected"
      ],
      "materials": 1,
      "work": 1,
      "offer": 2,
      "difficulty": 54,
      "gold": 26,
      "rep": 4
    },
    {
      "key": "aqueduct",
      "title": "Restore an Old Aqueduct",
      "type": "Engineering",
      "desc": "Bring clean water back through ancient stonework.",
      "traits": [
        "Mason",
        "Carpenter"
      ],
      "support": [
        "Builder",
        "Stoneworker",
        "Scholar"
      ],
      "materials": 4,
      "work": 3,
      "offer": 4,
      "difficulty": 70,
      "gold": 42,
      "rep": 8
    },
    {
      "key": "trial",
      "title": "Argue a Public Trial",
      "type": "Legal",
      "desc": "Prepare testimony and sway a nervous court.",
      "traits": [
        "Bailiff",
        "Clerk"
      ],
      "support": [
        "Careful",
        "Noble",
        "Honest"
      ],
      "materials": 0,
      "work": 1,
      "offer": 2,
      "difficulty": 46,
      "gold": 18,
      "rep": 5
    },
    {
      "key": "dragon",
      "title": "Confront a Dragon Threat",
      "type": "Legendary Hunt",
      "desc": "Face a monster powerful enough to change the region.",
      "traits": [
        "Soldier",
        "Hunter",
        "Outrider"
      ],
      "support": [
        "Veteran",
        "Fearless",
        "Healer"
      ],
      "materials": 4,
      "work": 4,
      "offer": 2,
      "difficulty": 110,
      "gold": 80,
      "rep": 18
    },
    {
      "key": "levee",
      "title": "Raise a Flood Levee",
      "type": "Public Works",
      "desc": "Coordinate labor and materials before riverbanks give way.",
      "traits": [
        "Farmer",
        "Mason"
      ],
      "support": [
        "Builder",
        "Rural",
        "Strong"
      ],
      "materials": 4,
      "work": 2,
      "offer": 2,
      "difficulty": 55,
      "gold": 24,
      "rep": 6
    },
    {
      "key": "mint",
      "title": "Audit the County Mint",
      "type": "Accounting",
      "desc": "Trace missing coin through ledgers, dies, and witnesses.",
      "traits": [
        "Tax Collector",
        "Clerk"
      ],
      "support": [
        "Careful",
        "Shrewd",
        "Scholar"
      ],
      "materials": 0,
      "work": 1,
      "offer": 3,
      "difficulty": 44,
      "gold": 20,
      "rep": 4
    },
    {
      "key": "vineyard",
      "title": "Save a Blighted Vineyard",
      "type": "Agriculture",
      "desc": "Identify the sickness and organize emergency harvest work.",
      "traits": [
        "Farmer",
        "Herbalist"
      ],
      "support": [
        "Rural",
        "Patient",
        "Scholar"
      ],
      "materials": 2,
      "work": 2,
      "offer": 2,
      "difficulty": 47,
      "gold": 19,
      "rep": 4
    },
    {
      "key": "bellfoundry",
      "title": "Cast a Cathedral Bell",
      "type": "Foundry",
      "desc": "Manage rare metals, skilled labor, and a flawless pour.",
      "traits": [
        "Blacksmith",
        "Glassmaker"
      ],
      "support": [
        "Smith",
        "Craftsman",
        "Faithful"
      ],
      "materials": 5,
      "work": 3,
      "offer": 4,
      "difficulty": 76,
      "gold": 48,
      "rep": 9
    },
    {
      "key": "hostage",
      "title": "Negotiate a Hostage Release",
      "type": "Intrigue",
      "desc": "Balance ransom, threats, and pride before violence starts.",
      "traits": [
        "Diplomat",
        "Smuggler"
      ],
      "support": [
        "Secretive",
        "Criminal",
        "Noble"
      ],
      "materials": 0,
      "work": 1,
      "offer": 1,
      "difficulty": 74,
      "gold": 34,
      "rep": 8
    },
    {
      "key": "quarry",
      "title": "Stabilize a Cracked Quarry",
      "type": "Engineering",
      "desc": "Prevent a working quarry from collapsing into ruin.",
      "traits": [
        "Stonecutter",
        "Miner"
      ],
      "support": [
        "Stoneworker",
        "Careful",
        "Builder"
      ],
      "materials": 3,
      "work": 2,
      "offer": 2,
      "difficulty": 63,
      "gold": 30,
      "rep": 5
    },
    {
      "key": "plague-cart",
      "title": "Run Plague Carts Safely",
      "type": "Relief",
      "desc": "Move the dead and sick while preventing panic and spread.",
      "traits": [
        "Chirurgeon",
        "Cook"
      ],
      "support": [
        "Healer",
        "Patient",
        "Faithful"
      ],
      "materials": 2,
      "work": 1,
      "offer": 1,
      "difficulty": 68,
      "gold": 21,
      "rep": 8
    },
    {
      "key": "census",
      "title": "Conduct a Border Census",
      "type": "Administration",
      "desc": "Count households in disputed villages before tax season.",
      "traits": [
        "Tax Collector",
        "Clerk"
      ],
      "support": [
        "Rural",
        "Careful",
        "Scout"
      ],
      "materials": 0,
      "work": 2,
      "offer": 3,
      "difficulty": 36,
      "gold": 14,
      "rep": 3
    },
    {
      "key": "beacon",
      "title": "Rebuild Signal Beacons",
      "type": "Defense",
      "desc": "Restore a chain of hilltop warnings before raids resume.",
      "traits": [
        "Warden",
        "Carpenter"
      ],
      "support": [
        "Scout",
        "Battlewise",
        "Builder"
      ],
      "materials": 3,
      "work": 2,
      "offer": 2,
      "difficulty": 57,
      "gold": 27,
      "rep": 6
    },
    {
      "key": "trial-by-combat",
      "title": "Champion a Trial by Combat",
      "type": "Combat",
      "desc": "Stand in for a patron whose case will be judged by steel.",
      "traits": [
        "Soldier",
        "Warden"
      ],
      "support": [
        "Veteran",
        "Fearless",
        "Healer"
      ],
      "materials": 1,
      "work": 1,
      "offer": 1,
      "difficulty": 78,
      "gold": 36,
      "rep": 9
    },
    {
      "key": "salt-road",
      "title": "Secure the Salt Road",
      "type": "Logistics",
      "desc": "Break a chain of extortion along a crucial trade route.",
      "traits": [
        "Merchant",
        "Soldier"
      ],
      "support": [
        "Scout",
        "Connected",
        "Shrewd"
      ],
      "materials": 1,
      "work": 2,
      "offer": 2,
      "difficulty": 61,
      "gold": 35,
      "rep": 6
    },
    {
      "key": "marsh-drain",
      "title": "Drain a Fever Marsh",
      "type": "Sanitation",
      "desc": "Survey ditches and labor through dangerous wetlands.",
      "traits": [
        "Herbalist",
        "Mason"
      ],
      "support": [
        "Healer",
        "Patient",
        "Rural"
      ],
      "materials": 4,
      "work": 3,
      "offer": 3,
      "difficulty": 69,
      "gold": 31,
      "rep": 7
    },
    {
      "key": "lost-heir",
      "title": "Find a Missing Heir",
      "type": "Investigation",
      "desc": "Follow rumors, debts, and old loyalties across the region.",
      "traits": [
        "Courier",
        "Smuggler"
      ],
      "support": [
        "Scout",
        "Noble",
        "Secretive"
      ],
      "materials": 0,
      "work": 2,
      "offer": 2,
      "difficulty": 71,
      "gold": 33,
      "rep": 8
    },
    {
      "key": "glassworks",
      "title": "Restart a Glassworks",
      "type": "Manufacturing",
      "desc": "Source fuel, sand, and masters for a cold workshop.",
      "traits": [
        "Glassmaker",
        "Blacksmith"
      ],
      "support": [
        "Craftsman",
        "Smith",
        "Practical"
      ],
      "materials": 3,
      "work": 2,
      "offer": 3,
      "difficulty": 53,
      "gold": 29,
      "rep": 4
    },
    {
      "key": "witch-testimony",
      "title": "Examine Witchcraft Testimony",
      "type": "Inquiry",
      "desc": "Separate panic, fraud, and real danger before judgment falls.",
      "traits": [
        "Monk",
        "Scribe"
      ],
      "support": [
        "Scholar",
        "Faithful",
        "Careful"
      ],
      "materials": 0,
      "work": 1,
      "offer": 1,
      "difficulty": 67,
      "gold": 22,
      "rep": 7
    },
    {
      "key": "granary-fire",
      "title": "Recover from a Granary Fire",
      "type": "Emergency",
      "desc": "Replace burned food stores and determine what started the blaze.",
      "traits": [
        "Cook",
        "Farmer"
      ],
      "support": [
        "Rural",
        "Resourceful",
        "Builder"
      ],
      "materials": 3,
      "work": 1,
      "offer": 1,
      "difficulty": 59,
      "gold": 24,
      "rep": 6
    },
    {
      "key": "harbor-chain",
      "title": "Repair a Harbor Chain",
      "type": "Harbor Works",
      "desc": "Restore a massive defensive chain before ships arrive.",
      "traits": [
        "Boatwright",
        "Sailor"
      ],
      "support": [
        "Smith",
        "Strong",
        "Practical"
      ],
      "materials": 5,
      "work": 3,
      "offer": 3,
      "difficulty": 73,
      "gold": 44,
      "rep": 7
    },
    {
      "key": "relic-forgery",
      "title": "Expose a Relic Forgery",
      "type": "Scholarship",
      "desc": "Test a sacred object without enraging its believers.",
      "traits": [
        "Scribe",
        "Monk"
      ],
      "support": [
        "Scholar",
        "Faithful",
        "Careful"
      ],
      "materials": 0,
      "work": 1,
      "offer": 2,
      "difficulty": 49,
      "gold": 17,
      "rep": 5
    },
    {
      "key": "bandit-fort",
      "title": "Break a Bandit Fort",
      "type": "Assault",
      "desc": "Scout, besiege, and clear a fortified outlaw camp.",
      "traits": [
        "Soldier",
        "Warden"
      ],
      "support": [
        "Scout",
        "Veteran",
        "Battlewise"
      ],
      "materials": 2,
      "work": 2,
      "offer": 2,
      "difficulty": 82,
      "gold": 46,
      "rep": 10
    },
    {
      "key": "silk-fair",
      "title": "Organize a Silk Fair",
      "type": "Commerce",
      "desc": "Coordinate luxury merchants, guards, stalls, and permits.",
      "traits": [
        "Merchant",
        "Weaver"
      ],
      "support": [
        "Charming",
        "Connected",
        "Noble"
      ],
      "materials": 1,
      "work": 2,
      "offer": 4,
      "difficulty": 45,
      "gold": 28,
      "rep": 4
    },
    {
      "key": "cliff-shrine",
      "title": "Restore a Cliff Shrine",
      "type": "Pilgrimage",
      "desc": "Repair a remote shrine reached by narrow paths and old vows.",
      "traits": [
        "Monk",
        "Mason"
      ],
      "support": [
        "Faithful",
        "Scout",
        "Stoneworker"
      ],
      "materials": 3,
      "work": 2,
      "offer": 3,
      "difficulty": 58,
      "gold": 20,
      "rep": 7
    },
    {
      "key": "wolf-bounty",
      "title": "Settle Competing Wolf Bounties",
      "type": "Mediation",
      "desc": "Untangle hunters, farmers, and false claims before blood follows.",
      "traits": [
        "Hunter",
        "Bailiff"
      ],
      "support": [
        "Rural",
        "Careful",
        "Honest"
      ],
      "materials": 0,
      "work": 1,
      "offer": 2,
      "difficulty": 41,
      "gold": 18,
      "rep": 4
    }
  ]
};

const FIRST_NAMES = [
  "Ada",
  "Adela",
  "Alden",
  "Alia",
  "Amos",
  "Ansel",
  "Arden",
  "Asha",
  "Bastian",
  "Bela",
  "Bran",
  "Caro",
  "Cassia",
  "Celia",
  "Cora",
  "Dain",
  "Della",
  "Edda",
  "Eli",
  "Elian",
  "Elise",
  "Emery",
  "Ewan",
  "Fara",
  "Felix",
  "Finn",
  "Galen",
  "Gilda",
  "Greta",
  "Hal",
  "Hanna",
  "Ilan",
  "Iris",
  "Jora",
  "Jules",
  "Kara",
  "Kellan",
  "Lena",
  "Leona",
  "Liora",
  "Lucan",
  "Maren",
  "Milo",
  "Mira",
  "Nadia",
  "Nico",
  "Nora",
  "Oren",
  "Orla",
  "Petra",
  "Pia",
  "Quin",
  "Rafe",
  "Rhea",
  "Rowan",
  "Sabine",
  "Selma",
  "Sera",
  "Silas",
  "Talia",
  "Tamsin",
  "Theo",
  "Tilda",
  "Uma",
  "Vera",
  "Vico",
  "Willa",
  "Yara",
  "Zara"
];

const LAST_NAMES = [
  "Ashford",
  "Barley",
  "Bell",
  "Blackwater",
  "Briar",
  "Bright",
  "Brook",
  "Cairn",
  "Candle",
  "Carrow",
  "Cinder",
  "Coal",
  "Copper",
  "Crow",
  "Dale",
  "Dusk",
  "Ember",
  "Fairwind",
  "Fen",
  "Fielding",
  "Flint",
  "Foxglove",
  "Glass",
  "Greenhill",
  "Hale",
  "Harth",
  "Hawthorn",
  "Ironmoss",
  "Keen",
  "Kettle",
  "Lake",
  "Lark",
  "Locke",
  "Marsh",
  "Miller",
  "Moss",
  "Oak",
  "Pell",
  "Pike",
  "Quill",
  "Rain",
  "Reed",
  "Rook",
  "Rowe",
  "Silver",
  "Snow",
  "Sparrow",
  "Stone",
  "Storm",
  "Tanner",
  "Thorn",
  "Vale",
  "Voss",
  "Ward",
  "Wheat",
  "Winter",
  "Wren"
];

const CHARACTER_PARTS = {
  "settings": {
    "traitCountWeights": [
      {
        "count": 0,
        "weight": 75
      },
      {
        "count": 1,
        "weight": 20
      },
      {
        "count": 2,
        "weight": 5
      }
    ],
    "maxTraits": 4,
    "traitRecruitCost": 1,
    "traitSalary": 1,
    "resourceVariance": [
      -1,
      1
    ],
    "connectionVariance": [
      -1,
      1
    ],
    "professionStatusWeights": {
      "pauper": 5,
      "commoner": 6,
      "professional": 2,
      "gentry": 0.4,
      "noble": 0.15
    }
  },
  "professions": [
    {
      "name": "Apothecary",
      "status": "commoner",
      "resources": 1,
      "connections": 1
    },
    {
      "name": "Armorer",
      "status": "professional",
      "resources": 2,
      "connections": 0
    },
    {
      "name": "Bailiff",
      "status": "professional",
      "resources": 0,
      "connections": 2
    },
    {
      "name": "Blacksmith",
      "status": "commoner",
      "resources": 2,
      "connections": 0
    },
    {
      "name": "Boatwright",
      "status": "commoner",
      "resources": 2,
      "connections": 1
    },
    {
      "name": "Carpenter",
      "status": "commoner",
      "resources": 2,
      "connections": 0
    },
    {
      "name": "Chirurgeon",
      "status": "professional",
      "resources": 1,
      "connections": 1
    },
    {
      "name": "Clerk",
      "status": "commoner",
      "resources": 0,
      "connections": 2
    },
    {
      "name": "Cook",
      "status": "pauper",
      "resources": 1,
      "connections": 1
    },
    {
      "name": "Courier",
      "status": "pauper",
      "resources": 0,
      "connections": 2
    },
    {
      "name": "Diplomat",
      "status": "gentry",
      "resources": 0,
      "connections": 4
    },
    {
      "name": "Farmer",
      "status": "pauper",
      "resources": 2,
      "connections": 0
    },
    {
      "name": "Forester",
      "status": "pauper",
      "resources": 1,
      "connections": 0
    },
    {
      "name": "Glassmaker",
      "status": "professional",
      "resources": 2,
      "connections": 1
    },
    {
      "name": "Herbalist",
      "status": "commoner",
      "resources": 1,
      "connections": 1
    },
    {
      "name": "Hunter",
      "status": "pauper",
      "resources": 1,
      "connections": 0
    },
    {
      "name": "Innkeeper",
      "status": "commoner",
      "resources": 1,
      "connections": 3
    },
    {
      "name": "Mason",
      "status": "professional",
      "resources": 2,
      "connections": 0
    },
    {
      "name": "Merchant",
      "status": "professional",
      "resources": 1,
      "connections": 3
    },
    {
      "name": "Miner",
      "status": "pauper",
      "resources": 2,
      "connections": 0
    },
    {
      "name": "Monk",
      "status": "commoner",
      "resources": 0,
      "connections": 2
    },
    {
      "name": "Outrider",
      "status": "professional",
      "resources": 1,
      "connections": 1
    },
    {
      "name": "Physician",
      "status": "gentry",
      "resources": 1,
      "connections": 3
    },
    {
      "name": "Sailor",
      "status": "pauper",
      "resources": 1,
      "connections": 1
    },
    {
      "name": "Scribe",
      "status": "commoner",
      "resources": 0,
      "connections": 1
    },
    {
      "name": "Smuggler",
      "status": "professional",
      "resources": 1,
      "connections": 3
    },
    {
      "name": "Soldier",
      "status": "professional",
      "resources": 1,
      "connections": 0
    },
    {
      "name": "Stonecutter",
      "status": "commoner",
      "resources": 2,
      "connections": 0
    },
    {
      "name": "Tax Collector",
      "status": "gentry",
      "resources": 0,
      "connections": 4
    },
    {
      "name": "Tutor",
      "status": "commoner",
      "resources": 0,
      "connections": 2
    },
    {
      "name": "Warden",
      "status": "professional",
      "resources": 1,
      "connections": 2
    },
    {
      "name": "Weaver",
      "status": "pauper",
      "resources": 1,
      "connections": 1
    }
  ],
  "traits": [
    "Ambitious",
    "Battlewise",
    "Builder",
    "Careful",
    "Charming",
    "Compassionate",
    "Connected",
    "Criminal",
    "Craftsman",
    "Curious",
    "Disgraced",
    "Faithful",
    "Fearless",
    "Frugal",
    "Generous",
    "Hardy",
    "Healer",
    "Honest",
    "Influential",
    "Inventive",
    "Learned",
    "Lucky",
    "Noble",
    "Patient",
    "Practical",
    "Resourceful",
    "Rural",
    "Scout",
    "Secretive",
    "Scholar",
    "Seasoned",
    "Shrewd",
    "Smith",
    "Stoneworker",
    "Strong",
    "Stubborn",
    "Veteran",
    "Watchful"
  ],
  "tagAffinities": {
    "Ambitious": {
      "domains": [
        "Commerce",
        "Influence",
        "Legendary Hunt"
      ],
      "bonus": 5,
      "description": "Pushes for high-prestige or high-upside work."
    },
    "Apothecary": {
      "domains": [
        "Relief",
        "Sanitation",
        "Agriculture"
      ],
      "bonus": 8,
      "description": "Useful around medicine, supplies, and careful preparation."
    },
    "Armorer": {
      "domains": [
        "Manufacturing",
        "Foundry",
        "Defense",
        "Combat"
      ],
      "bonus": 8,
      "description": "Understands arms, armor, and military production."
    },
    "Bailiff": {
      "domains": [
        "Legal",
        "Administration",
        "Civic"
      ],
      "bonus": 8,
      "description": "Handles order, courts, records, and authority."
    },
    "Battlewise": {
      "domains": [
        "Military",
        "Hunt",
        "Crisis",
        "Defense",
        "Combat",
        "Assault"
      ],
      "bonus": 8,
      "description": "Practical combat judgment under pressure."
    },
    "Blacksmith": {
      "domains": [
        "Manufacturing",
        "Foundry",
        "Harbor Works"
      ],
      "bonus": 8,
      "description": "Strong fit for metalwork and repair."
    },
    "Boatwright": {
      "domains": [
        "Harbor Works",
        "Logistics",
        "Commerce"
      ],
      "bonus": 8,
      "description": "Knows boats, crossings, rivers, and harbors."
    },
    "Builder": {
      "domains": [
        "Civic",
        "Construction",
        "Engineering",
        "Public Works"
      ],
      "bonus": 6,
      "description": "General construction and planning skill."
    },
    "Careful": {
      "domains": [
        "Scholarship",
        "Legal",
        "Engineering",
        "Investigation",
        "Inquiry",
        "Administration"
      ],
      "bonus": 5,
      "description": "Reduces mistakes in precise work."
    },
    "Carpenter": {
      "domains": [
        "Construction",
        "Public Works",
        "Engineering"
      ],
      "bonus": 8,
      "description": "Useful in building, repair, and field structures."
    },
    "Charming": {
      "domains": [
        "Commerce",
        "Diplomacy",
        "Influence",
        "Civic"
      ],
      "bonus": 5,
      "description": "Helps where people must be persuaded or coordinated."
    },
    "Chirurgeon": {
      "domains": [
        "Relief",
        "Sanitation",
        "Military",
        "Crisis"
      ],
      "bonus": 8,
      "description": "Handles injury and grisly field medicine."
    },
    "Clerk": {
      "domains": [
        "Scholarship",
        "Legal",
        "Accounting",
        "Administration"
      ],
      "bonus": 8,
      "description": "Records, law, ledgers, and bureaucracy."
    },
    "Compassionate": {
      "domains": [
        "Relief",
        "Religion",
        "Civic",
        "Pilgrimage",
        "Sanitation"
      ],
      "bonus": 5,
      "description": "Helps with care, trust, and vulnerable patrons."
    },
    "Connected": {
      "domains": [
        "Commerce",
        "Diplomacy",
        "Influence",
        "Intrigue"
      ],
      "bonus": 6,
      "description": "Can find help, favors, and introductions."
    },
    "Cook": {
      "domains": [
        "Provisioning",
        "Relief",
        "Agriculture"
      ],
      "bonus": 8,
      "description": "Food, kitchens, stores, and feeding people."
    },
    "Courier": {
      "domains": [
        "Logistics",
        "Exploration",
        "Intrigue"
      ],
      "bonus": 8,
      "description": "Routes, messages, speed, and discretion."
    },
    "Craftsman": {
      "domains": [
        "Crafting",
        "Manufacturing",
        "Construction",
        "Engineering"
      ],
      "bonus": 6,
      "description": "General productive skill with tools and materials."
    },
    "Criminal": {
      "domains": [
        "Intrigue",
        "Investigation",
        "Commerce"
      ],
      "bonus": 6,
      "description": "Understands illicit networks and hidden motives."
    },
    "Curious": {
      "domains": [
        "Exploration",
        "Investigation",
        "Scholarship",
        "Inquiry"
      ],
      "bonus": 5,
      "description": "Follows clues and strange possibilities."
    },
    "Diplomat": {
      "domains": [
        "Diplomacy",
        "Influence",
        "Legal",
        "Commerce"
      ],
      "bonus": 8,
      "description": "Negotiation, status, and delicate settlement."
    },
    "Disgraced": {
      "domains": [
        "Intrigue",
        "Exploration",
        "Criminal"
      ],
      "bonus": 4,
      "description": "Has fewer scruples and experience surviving bad reputations."
    },
    "Faithful": {
      "domains": [
        "Religion",
        "Crisis",
        "Pilgrimage",
        "Inquiry"
      ],
      "bonus": 6,
      "description": "Spiritual discipline and religious credibility."
    },
    "Farmer": {
      "domains": [
        "Agriculture",
        "Provisioning",
        "Public Works"
      ],
      "bonus": 8,
      "description": "Food, land, labor, and rural routines."
    },
    "Fearless": {
      "domains": [
        "Military",
        "Hunt",
        "Crisis",
        "Legendary Hunt"
      ],
      "bonus": 5,
      "description": "Does not easily break under danger."
    },
    "Forester": {
      "domains": [
        "Exploration",
        "Hunt",
        "Logistics"
      ],
      "bonus": 8,
      "description": "Woods, trails, beasts, and hard travel."
    },
    "Frugal": {
      "domains": [
        "Commerce",
        "Accounting",
        "Provisioning"
      ],
      "bonus": 5,
      "description": "Makes limited resources go further."
    },
    "Generous": {
      "domains": [
        "Relief",
        "Civic",
        "Religion"
      ],
      "bonus": 5,
      "description": "Builds trust and goodwill."
    },
    "Glassmaker": {
      "domains": [
        "Manufacturing",
        "Crafting",
        "Foundry"
      ],
      "bonus": 8,
      "description": "Specialized craft and furnace work."
    },
    "Hardy": {
      "domains": [
        "Exploration",
        "Hunt",
        "Logistics",
        "Emergency"
      ],
      "bonus": 5,
      "description": "Endures harsh work and hard travel."
    },
    "Healer": {
      "domains": [
        "Relief",
        "Sanitation",
        "Crisis"
      ],
      "bonus": 6,
      "description": "Care, treatment, and prevention."
    },
    "Herbalist": {
      "domains": [
        "Relief",
        "Agriculture",
        "Sanitation"
      ],
      "bonus": 8,
      "description": "Useful with sickness, plants, and remedies."
    },
    "Honest": {
      "domains": [
        "Legal",
        "Civic",
        "Religion",
        "Administration"
      ],
      "bonus": 5,
      "description": "Credibility where trust matters."
    },
    "Hunter": {
      "domains": [
        "Hunt",
        "Exploration",
        "Military"
      ],
      "bonus": 8,
      "description": "Tracking, fieldcraft, and dangerous pursuit."
    },
    "Influential": {
      "domains": [
        "Influence",
        "Diplomacy",
        "Civic",
        "Religion"
      ],
      "bonus": 5,
      "description": "Can sway people and institutions."
    },
    "Innkeeper": {
      "domains": [
        "Commerce",
        "Civic",
        "Diplomacy"
      ],
      "bonus": 8,
      "description": "Networks, hospitality, gossip, and logistics."
    },
    "Inventive": {
      "domains": [
        "Engineering",
        "Manufacturing",
        "Exploration",
        "Crafting"
      ],
      "bonus": 5,
      "description": "Finds novel solutions under constraints."
    },
    "Learned": {
      "domains": [
        "Scholarship",
        "Inquiry",
        "Legal",
        "Engineering"
      ],
      "bonus": 5,
      "description": "Formal knowledge and disciplined study."
    },
    "Lucky": {
      "domains": [
        "Exploration",
        "Intrigue",
        "Hunt"
      ],
      "bonus": 4,
      "description": "A small edge when plans get messy."
    },
    "Mason": {
      "domains": [
        "Construction",
        "Engineering",
        "Public Works"
      ],
      "bonus": 8,
      "description": "Stone, foundations, roads, and durable works."
    },
    "Merchant": {
      "domains": [
        "Commerce",
        "Provisioning",
        "Diplomacy"
      ],
      "bonus": 8,
      "description": "Trade, prices, supply, and negotiation."
    },
    "Miner": {
      "domains": [
        "Extraction",
        "Engineering",
        "Crafting"
      ],
      "bonus": 8,
      "description": "Mines, stone, ore, and dangerous underground work."
    },
    "Monk": {
      "domains": [
        "Religion",
        "Scholarship",
        "Relief"
      ],
      "bonus": 8,
      "description": "Religious institutions, study, and care."
    },
    "Noble": {
      "domains": [
        "Influence",
        "Diplomacy",
        "Legal",
        "Commerce"
      ],
      "bonus": 6,
      "description": "Status and high-born access."
    },
    "Outrider": {
      "domains": [
        "Logistics",
        "Exploration",
        "Military"
      ],
      "bonus": 8,
      "description": "Movement, scouting, and frontier routes."
    },
    "Patient": {
      "domains": [
        "Relief",
        "Sanitation",
        "Scholarship",
        "Religion"
      ],
      "bonus": 5,
      "description": "Steady work with people, illness, and study."
    },
    "Physician": {
      "domains": [
        "Relief",
        "Sanitation",
        "Crisis"
      ],
      "bonus": 8,
      "description": "High-status medical knowledge."
    },
    "Practical": {
      "domains": [
        "Engineering",
        "Crafting",
        "Logistics",
        "Emergency"
      ],
      "bonus": 5,
      "description": "Turns plans into workable action."
    },
    "Resourceful": {
      "domains": [
        "Exploration",
        "Emergency",
        "Logistics",
        "Intrigue"
      ],
      "bonus": 5,
      "description": "Improvises when supplies or plans fail."
    },
    "Rural": {
      "domains": [
        "Agriculture",
        "Provisioning",
        "Public Works"
      ],
      "bonus": 6,
      "description": "Understands farms, villages, and local labor."
    },
    "Sailor": {
      "domains": [
        "Harbor Works",
        "Logistics",
        "Exploration"
      ],
      "bonus": 8,
      "description": "Water, ropes, harbors, and rough travel."
    },
    "Scholar": {
      "domains": [
        "Scholarship",
        "Inquiry",
        "Engineering",
        "Agriculture"
      ],
      "bonus": 6,
      "description": "Research, interpretation, and expertise."
    },
    "Scout": {
      "domains": [
        "Exploration",
        "Hunt",
        "Logistics",
        "Investigation",
        "Military"
      ],
      "bonus": 6,
      "description": "Finds paths, threats, and hidden details."
    },
    "Scribe": {
      "domains": [
        "Scholarship",
        "Legal",
        "Accounting",
        "Administration"
      ],
      "bonus": 8,
      "description": "Writing, records, copying, and bureaucracy."
    },
    "Seasoned": {
      "domains": [
        "Emergency",
        "Logistics",
        "Military"
      ],
      "bonus": 5,
      "description": "Broad experience with difficult work."
    },
    "Secretive": {
      "domains": [
        "Intrigue",
        "Investigation",
        "Diplomacy"
      ],
      "bonus": 5,
      "description": "Keeps confidence and handles hidden matters."
    },
    "Shrewd": {
      "domains": [
        "Commerce",
        "Intrigue",
        "Legal"
      ],
      "bonus": 5,
      "description": "Reads incentives and catches bad bargains."
    },
    "Smith": {
      "domains": [
        "Crafting",
        "Manufacturing",
        "Foundry",
        "Harbor Works"
      ],
      "bonus": 6,
      "description": "Metalwork, tools, and repairs."
    },
    "Smuggler": {
      "domains": [
        "Intrigue",
        "Commerce",
        "Exploration"
      ],
      "bonus": 8,
      "description": "Hidden routes, contraband, and quiet arrangements."
    },
    "Soldier": {
      "domains": [
        "Military",
        "Combat",
        "Defense",
        "Assault",
        "Guard Duty"
      ],
      "bonus": 8,
      "description": "Direct martial training."
    },
    "Stonecutter": {
      "domains": [
        "Construction",
        "Engineering",
        "Extraction"
      ],
      "bonus": 8,
      "description": "Quarries, stonework, and heavy labor."
    },
    "Stoneworker": {
      "domains": [
        "Construction",
        "Engineering",
        "Extraction"
      ],
      "bonus": 6,
      "description": "Stone, structures, and durable repairs."
    },
    "Strong": {
      "domains": [
        "Military",
        "Public Works",
        "Extraction",
        "Harbor Works"
      ],
      "bonus": 5,
      "description": "Physical power for dangerous or heavy work."
    },
    "Stubborn": {
      "domains": [
        "Defense",
        "Public Works",
        "Relief"
      ],
      "bonus": 4,
      "description": "Keeps going when work is miserable."
    },
    "Tax Collector": {
      "domains": [
        "Accounting",
        "Administration",
        "Legal",
        "Influence"
      ],
      "bonus": 8,
      "description": "Money, records, authority, and pressure."
    },
    "Tutor": {
      "domains": [
        "Scholarship",
        "Inquiry",
        "Civic"
      ],
      "bonus": 8,
      "description": "Teaching, study, and public instruction."
    },
    "Veteran": {
      "domains": [
        "Military",
        "Combat",
        "Defense",
        "Assault",
        "Legendary Hunt",
        "Crisis"
      ],
      "bonus": 10,
      "description": "Elite experience in dangerous work."
    },
    "Warden": {
      "domains": [
        "Military",
        "Legal",
        "Administration",
        "Defense"
      ],
      "bonus": 8,
      "description": "Order, enforcement, and secure custody."
    },
    "Watchful": {
      "domains": [
        "Investigation",
        "Exploration",
        "Defense",
        "Guard Duty"
      ],
      "bonus": 5,
      "description": "Notices danger and suspicious details."
    },
    "Weaver": {
      "domains": [
        "Manufacturing",
        "Commerce",
        "Crafting"
      ],
      "bonus": 8,
      "description": "Textiles, production, and workshop routines."
    }
  },
  "traitEffects": {
    "Apothecary": [
      {
        "trigger": "facilityResolve",
        "facilities": [
          "infirmary"
        ],
        "type": "gainGuild",
        "stat": "gold",
        "amount": 2,
        "description": "At Infirmary, remedies add a little Gold while the facility engine runs."
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "infirmary"
        ],
        "types": [
          "Relief",
          "Sanitation",
          "Crisis"
        ],
        "type": "contractBonus",
        "amount": 6,
        "description": "At Infirmary, supports Relief, Sanitation, and Crisis contracts."
      }
    ],
    "Armorer": [
      {
        "trigger": "facilitySupport",
        "facilities": [
          "workshop",
          "training"
        ],
        "types": [
          "Manufacturing",
          "Foundry",
          "Defense",
          "Combat"
        ],
        "type": "contractBonus",
        "amount": 6,
        "description": "At Workshop or Training Yard, arms support craft and martial contracts."
      },
      {
        "trigger": "facilityTrainingSupport",
        "facilities": [
          "workshop"
        ],
        "type": "trainingAssist",
        "amount": 5,
        "description": "At Workshop, improves Training Yard practice.",
        "targetFacilities": [
          "training"
        ]
      }
    ],
    "Bailiff": [
      {
        "trigger": "contractScore",
        "types": [
          "Legal",
          "Administration",
          "Civic"
        ],
        "type": "contractBonus",
        "amount": 6,
        "description": "Strong fit for order, courts, and civic administration."
      },
      {
        "trigger": "contractFailure",
        "type": "softenFailure",
        "failureTypes": [
          "reputation_loss"
        ],
        "chance": 35,
        "description": "Contains public or legal fallout."
      }
    ],
    "Blacksmith": [
      {
        "trigger": "facilityResolve",
        "facilities": [
          "workshop"
        ],
        "type": "gainGuild",
        "stat": "gold",
        "amount": 2,
        "description": "At Workshop, repairs earn Gold while the facility engine runs."
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "workshop"
        ],
        "types": [
          "Manufacturing",
          "Foundry",
          "Harbor Works"
        ],
        "type": "contractBonus",
        "amount": 6,
        "description": "At Workshop, supports production and repair contracts."
      }
    ],
    "Boatwright": [
      {
        "trigger": "contractProgress",
        "types": [
          "Harbor Works",
          "Logistics",
          "Commerce"
        ],
        "minWorkSeasons": 2,
        "type": "advanceWork",
        "chance": 25,
        "amount": 1,
        "description": "Pushes long river, harbor, and route work ahead."
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "workshop"
        ],
        "types": [
          "Harbor Works",
          "Logistics"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "At Workshop, supports harbor and logistics contracts."
      }
    ],
    "Carpenter": [
      {
        "trigger": "contractProgress",
        "types": [
          "Construction",
          "Public Works",
          "Engineering"
        ],
        "minWorkSeasons": 2,
        "type": "advanceWork",
        "chance": 25,
        "amount": 1,
        "description": "Pushes long construction work ahead."
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "workshop"
        ],
        "types": [
          "Construction",
          "Public Works",
          "Engineering"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "At Workshop, supports building contracts."
      }
    ],
    "Chirurgeon": [
      {
        "trigger": "contractFailure",
        "type": "softenFailure",
        "failureTypes": [
          "injury",
          "death"
        ],
        "chance": 35,
        "description": "Downgrades injury or death fallout."
      },
      {
        "trigger": "facilityTrainingSupport",
        "facilities": [
          "infirmary"
        ],
        "type": "trainingAssist",
        "amount": 5,
        "description": "At Infirmary, makes physical training safer.",
        "targetFacilities": [
          "training",
          "scout",
          "workshop"
        ]
      }
    ],
    "Clerk": [
      {
        "trigger": "facilityResolve",
        "facilities": [
          "archives"
        ],
        "type": "gainGuild",
        "stat": "connections",
        "amount": 1,
        "description": "At Archives, records create Connections.",
        "cap": 20
      },
      {
        "trigger": "contractScore",
        "types": [
          "Scholarship",
          "Legal",
          "Accounting",
          "Administration"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "Good support for records and bureaucracy."
      }
    ],
    "Cook": [
      {
        "trigger": "facilityResolve",
        "type": "recoverGuild",
        "kinds": [
          "strain",
          "morale"
        ],
        "amount": 1,
        "description": "At Common Room, recovers strain or morale.",
        "facilities": [
          "common"
        ]
      },
      {
        "trigger": "facilityTrainingSupport",
        "facilities": [
          "common"
        ],
        "type": "trainingAssist",
        "amount": 4,
        "description": "At Common Room, food and morale improve physical facilities.",
        "targetFacilities": [
          "training",
          "workshop",
          "scout"
        ]
      }
    ],
    "Courier": [
      {
        "trigger": "contractScore",
        "types": [
          "Logistics",
          "Exploration",
          "Intrigue"
        ],
        "roles": [
          "lead"
        ],
        "type": "roleBonus",
        "amount": 5,
        "description": "Can lead routes, messages, and quiet movement."
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "scout"
        ],
        "types": [
          "Logistics",
          "Exploration",
          "Intrigue"
        ],
        "type": "contractBonus",
        "amount": 6,
        "description": "At Scout Lodge, supports route and intrigue contracts."
      }
    ],
    "Diplomat": [
      {
        "trigger": "contractSuccess",
        "types": [
          "Diplomacy",
          "Influence",
          "Commerce"
        ],
        "type": "gainGuild",
        "stat": "connections",
        "amount": 2,
        "description": "Successful negotiation turns into Connections.",
        "cap": 20
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "market"
        ],
        "types": [
          "Diplomacy",
          "Influence",
          "Legal"
        ],
        "type": "contractBonus",
        "amount": 6,
        "description": "At Market Hall, supports social and institutional contracts."
      }
    ],
    "Farmer": [
      {
        "trigger": "contractSuccess",
        "types": [
          "Agriculture",
          "Provisioning"
        ],
        "type": "gainGuild",
        "stat": "resources",
        "amount": 2,
        "description": "Food work builds Resources.",
        "cap": 20
      },
      {
        "trigger": "contractScore",
        "types": [
          "Agriculture",
          "Provisioning",
          "Public Works"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "Reliable fit for land, food, and village work."
      }
    ],
    "Forester": [
      {
        "trigger": "contractScore",
        "types": [
          "Exploration",
          "Hunt",
          "Logistics"
        ],
        "type": "contractBonus",
        "amount": 6,
        "description": "Strong fieldcraft for woods, beasts, and travel."
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "scout"
        ],
        "types": [
          "Exploration",
          "Hunt",
          "Logistics"
        ],
        "type": "contractBonus",
        "amount": 7,
        "description": "At Scout Lodge, supports travel and hunt contracts."
      }
    ],
    "Glassmaker": [
      {
        "trigger": "contractSuccess",
        "types": [
          "Manufacturing",
          "Crafting",
          "Foundry"
        ],
        "type": "gainGuild",
        "stat": "gold",
        "amount": 5,
        "description": "Specialized craft success earns Gold."
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "workshop"
        ],
        "types": [
          "Manufacturing",
          "Crafting",
          "Foundry"
        ],
        "type": "contractBonus",
        "amount": 6,
        "description": "At Workshop, supports specialist production contracts."
      }
    ],
    "Herbalist": [
      {
        "trigger": "contractSuccess",
        "type": "recoverTeam",
        "kinds": [
          "injury",
          "strain"
        ],
        "amount": 1,
        "description": "After care or land work, helps the team recover."
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "infirmary"
        ],
        "types": [
          "Relief",
          "Agriculture",
          "Sanitation"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "At Infirmary, supports medicine and sanitation contracts."
      }
    ],
    "Hunter": [
      {
        "trigger": "contractScore",
        "types": [
          "Hunt",
          "Exploration",
          "Military"
        ],
        "type": "contractBonus",
        "amount": 6,
        "description": "Strong fit for tracking and dangerous field work."
      },
      {
        "trigger": "contractFailure",
        "type": "softenFailure",
        "failureTypes": [
          "injury",
          "death"
        ],
        "chance": 25,
        "description": "Can spot field danger before it fully lands.",
        "types": [
          "Hunt",
          "Exploration"
        ]
      }
    ],
    "Innkeeper": [
      {
        "trigger": "facilityResolve",
        "facilities": [
          "common",
          "market"
        ],
        "type": "gainGuild",
        "stat": "connections",
        "amount": 1,
        "description": "At Common Room or Market Hall, gossip creates Connections.",
        "cap": 20
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "market",
          "common"
        ],
        "types": [
          "Commerce",
          "Civic",
          "Diplomacy",
          "Provisioning"
        ],
        "type": "contractBonus",
        "amount": 6,
        "description": "At Market Hall or Common Room, supports social and supply contracts."
      }
    ],
    "Mason": [
      {
        "trigger": "contractProgress",
        "types": [
          "Construction",
          "Engineering",
          "Public Works"
        ],
        "minWorkSeasons": 2,
        "type": "advanceWork",
        "chance": 25,
        "amount": 1,
        "description": "Pushes long stone and public works ahead."
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "workshop"
        ],
        "types": [
          "Construction",
          "Engineering",
          "Public Works"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "At Workshop, supports durable building contracts."
      }
    ],
    "Merchant": [
      {
        "trigger": "contractSuccess",
        "types": [
          "Commerce",
          "Provisioning",
          "Diplomacy"
        ],
        "type": "gainGuild",
        "stat": "gold",
        "amount": 6,
        "description": "Trade success earns extra Gold."
      },
      {
        "trigger": "facilityResolve",
        "facilities": [
          "market"
        ],
        "type": "gainGuild",
        "stat": "gold",
        "amount": 4,
        "description": "At Market Hall, commerce produces Gold."
      }
    ],
    "Miner": [
      {
        "trigger": "contractSuccess",
        "types": [
          "Extraction",
          "Engineering",
          "Crafting"
        ],
        "type": "gainGuild",
        "stat": "resources",
        "amount": 2,
        "description": "Extraction work builds Resources.",
        "cap": 20
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "workshop"
        ],
        "types": [
          "Extraction",
          "Engineering",
          "Foundry"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "At Workshop, supports ore, stone, and foundry contracts."
      }
    ],
    "Monk": [
      {
        "trigger": "facilityResolve",
        "type": "recoverGuild",
        "kinds": [
          "morale",
          "trauma"
        ],
        "amount": 1,
        "description": "At Chapel, recovers morale or trauma.",
        "facilities": [
          "chapel"
        ]
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "chapel"
        ],
        "types": [
          "Religion",
          "Crisis",
          "Pilgrimage"
        ],
        "type": "contractBonus",
        "amount": 7,
        "description": "At Chapel, supports faith and crisis contracts."
      }
    ],
    "Outrider": [
      {
        "trigger": "contractScore",
        "types": [
          "Logistics",
          "Exploration",
          "Military"
        ],
        "roles": [
          "lead"
        ],
        "type": "roleBonus",
        "amount": 6,
        "description": "Can lead routes, scouting, and mounted work."
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "scout"
        ],
        "types": [
          "Logistics",
          "Exploration",
          "Military"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "At Scout Lodge, supports movement and military contracts."
      }
    ],
    "Physician": [
      {
        "trigger": "contractFailure",
        "type": "softenFailure",
        "failureTypes": [
          "injury",
          "death"
        ],
        "chance": 35,
        "description": "Downgrades injury or death fallout."
      },
      {
        "trigger": "facilityResolve",
        "type": "recoverGuild",
        "kinds": [
          "injury",
          "strain"
        ],
        "amount": 1,
        "description": "At Infirmary, recovers injury or strain.",
        "facilities": [
          "infirmary"
        ]
      }
    ],
    "Sailor": [
      {
        "trigger": "contractScore",
        "types": [
          "Harbor Works",
          "Logistics",
          "Exploration"
        ],
        "type": "contractBonus",
        "amount": 6,
        "description": "Strong fit for water, harbor, and route work."
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "scout",
          "workshop"
        ],
        "types": [
          "Harbor Works",
          "Logistics"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "At Scout Lodge or Workshop, supports harbor logistics."
      }
    ],
    "Scribe": [
      {
        "trigger": "facilityResolve",
        "facilities": [
          "archives"
        ],
        "type": "gainGuild",
        "stat": "reputation",
        "amount": 2,
        "description": "At Archives, records create Reputation."
      },
      {
        "trigger": "contractScore",
        "types": [
          "Scholarship",
          "Legal",
          "Accounting",
          "Administration"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "Good support for documents and institutions."
      }
    ],
    "Smuggler": [
      {
        "trigger": "contractSuccess",
        "types": [
          "Intrigue",
          "Commerce",
          "Exploration"
        ],
        "type": "gainGuild",
        "stat": "gold",
        "amount": 6,
        "description": "Hidden routes turn success into Gold."
      },
      {
        "trigger": "contractFailure",
        "type": "softenFailure",
        "failureTypes": [
          "gold_loss",
          "material_loss",
          "reputation_loss"
        ],
        "chance": 30,
        "description": "Keeps failed shadow work from becoming expensive."
      }
    ],
    "Soldier": [
      {
        "trigger": "contractScore",
        "types": [
          "Military",
          "Combat",
          "Defense",
          "Assault",
          "Guard Duty"
        ],
        "roles": [
          "lead"
        ],
        "type": "roleBonus",
        "amount": 6,
        "description": "Can lead martial contracts."
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "training"
        ],
        "types": [
          "Military",
          "Combat",
          "Defense",
          "Assault",
          "Guard Duty"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "At Training Yard, supports martial contracts."
      }
    ],
    "Stonecutter": [
      {
        "trigger": "contractProgress",
        "types": [
          "Construction",
          "Engineering",
          "Extraction"
        ],
        "minWorkSeasons": 2,
        "type": "advanceWork",
        "chance": 25,
        "amount": 1,
        "description": "Pushes long stone or quarry work ahead."
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "workshop"
        ],
        "types": [
          "Construction",
          "Engineering",
          "Extraction"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "At Workshop, supports stone and extraction contracts."
      }
    ],
    "Tax Collector": [
      {
        "trigger": "contractSuccess",
        "types": [
          "Accounting",
          "Administration",
          "Legal",
          "Influence"
        ],
        "type": "gainGuild",
        "stat": "gold",
        "amount": 7,
        "description": "Official money work earns extra Gold."
      },
      {
        "trigger": "facilityResolve",
        "facilities": [
          "market"
        ],
        "type": "gainGuild",
        "stat": "connections",
        "amount": 1,
        "description": "At Market Hall, official pressure creates Connections.",
        "cap": 20
      }
    ],
    "Tutor": [
      {
        "trigger": "facilityTrainingSupport",
        "facilities": [
          "archives"
        ],
        "type": "trainingAssist",
        "amount": 10,
        "description": "At Archives, lesson plans improve training at other facilities."
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "archives"
        ],
        "types": [
          "Scholarship",
          "Inquiry",
          "Civic",
          "Administration"
        ],
        "type": "contractBonus",
        "amount": 6,
        "description": "At Archives, supports scholarship and administration contracts."
      }
    ],
    "Warden": [
      {
        "trigger": "contractScore",
        "types": [
          "Military",
          "Legal",
          "Administration",
          "Defense"
        ],
        "type": "contractBonus",
        "amount": 6,
        "description": "Strong fit for custody, order, and defense."
      },
      {
        "trigger": "contractFailure",
        "type": "softenFailure",
        "failureTypes": [
          "reputation_loss",
          "injury"
        ],
        "chance": 30,
        "description": "Contains official fallout and injury risk."
      }
    ],
    "Weaver": [
      {
        "trigger": "contractSuccess",
        "types": [
          "Manufacturing",
          "Commerce",
          "Crafting"
        ],
        "type": "gainGuild",
        "stat": "gold",
        "amount": 5,
        "description": "Textile or craft success earns Gold."
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "workshop",
          "market"
        ],
        "types": [
          "Manufacturing",
          "Commerce",
          "Crafting"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "At Workshop or Market Hall, supports production and trade contracts."
      }
    ],
    "Ambitious": [
      {
        "trigger": "contractScore",
        "types": [
          "Commerce",
          "Influence",
          "Legendary Hunt"
        ],
        "roles": [
          "lead"
        ],
        "type": "roleBonus",
        "amount": 6,
        "description": "Leading high-upside work gets a better shot."
      },
      {
        "trigger": "contractSuccess",
        "types": [
          "Influence",
          "Legendary Hunt"
        ],
        "type": "gainGuild",
        "stat": "reputation",
        "amount": 3,
        "description": "Prestige success turns into Reputation."
      }
    ],
    "Battlewise": [
      {
        "trigger": "contractScore",
        "types": [
          "Military",
          "Combat",
          "Defense",
          "Assault",
          "Guard Duty"
        ],
        "type": "contractBonus",
        "amount": 6,
        "description": "Improves martial contract odds."
      },
      {
        "trigger": "contractFailure",
        "type": "softenFailure",
        "failureTypes": [
          "injury"
        ],
        "chance": 25,
        "description": "Reduces injury fallout on martial work.",
        "types": [
          "Military",
          "Combat",
          "Defense",
          "Assault",
          "Guard Duty"
        ]
      }
    ],
    "Builder": [
      {
        "trigger": "contractProgress",
        "types": [
          "Construction",
          "Engineering",
          "Public Works"
        ],
        "minWorkSeasons": 2,
        "type": "advanceWork",
        "chance": 30,
        "amount": 1,
        "description": "Pushes long building work ahead."
      },
      {
        "trigger": "facilityResolve",
        "facilities": [
          "workshop"
        ],
        "type": "gainGuild",
        "stat": "reputation",
        "amount": 1,
        "description": "At Workshop, visible planning creates Reputation."
      }
    ],
    "Careful": [
      {
        "trigger": "contractClaim",
        "type": "blockCompetition",
        "description": "When this merc is on your claimed contract, rival drops onto occupied slots are blocked unless the rival has an override."
      },
      {
        "trigger": "contractClaim",
        "type": "competitionCost",
        "amount": 1,
        "description": "When this merc is on your claimed contract, contesting it costs rivals 1 extra reputation."
      },
      {
        "trigger": "contractScore",
        "types": [
          "Scholarship",
          "Legal",
          "Engineering",
          "Investigation",
          "Inquiry",
          "Administration"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "Improves precise work."
      },
      {
        "trigger": "contractFailure",
        "type": "softenFailure",
        "failureTypes": [
          "negative_trait",
          "reputation_loss"
        ],
        "chance": 35,
        "description": "Prevents mistakes from becoming lasting fallout."
      }
    ],
    "Charming": [
      {
        "trigger": "contractCooperation",
        "type": "cooperativeChance",
        "amount": 5,
        "description": "Adds +5% to the shared cooperative project chance."
      },
      {
        "trigger": "contractSuccess",
        "types": [
          "Commerce",
          "Diplomacy",
          "Influence",
          "Civic"
        ],
        "type": "gainGuild",
        "stat": "reputation",
        "amount": 2,
        "description": "Social success turns into Reputation."
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "market"
        ],
        "types": [
          "Commerce",
          "Diplomacy",
          "Influence",
          "Civic"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "At Market Hall, supports social contracts."
      }
    ],
    "Compassionate": [
      {
        "trigger": "contractSuccess",
        "type": "recoverTeam",
        "kinds": [
          "morale",
          "strain"
        ],
        "amount": 1,
        "description": "Caring success recovers the team."
      },
      {
        "trigger": "conditionAdded",
        "type": "recoverTeam",
        "kinds": [
          "injury",
          "strain",
          "morale"
        ],
        "amount": 1,
        "description": "When harm lands, helps the team recover."
      }
    ],
    "Connected": [
      {
        "trigger": "contractCooperation",
        "type": "cooperativeChance",
        "amount": 6,
        "description": "Adds +6% to the shared cooperative project chance through introductions and access."
      },
      {
        "trigger": "recruitCost",
        "type": "discount",
        "amount": 1,
        "description": "Recruiting costs 1 less while this merc is available."
      },
      {
        "trigger": "facilityTrainingSupport",
        "facilities": [
          "market"
        ],
        "type": "trainingAssist",
        "amount": 5,
        "description": "At Market Hall, introductions improve Common Room or Chapel training.",
        "targetFacilities": [
          "common",
          "chapel"
        ]
      }
    ],
    "Criminal": [
      {
        "trigger": "contractContest",
        "type": "competitionCost",
        "amount": -1,
        "description": "Contesting a rival claim costs 1 less reputation."
      },
      {
        "trigger": "contractContest",
        "type": "bypassCompetitionBlock",
        "description": "Ignores one claim rule that would block competition."
      },
      {
        "trigger": "contractScore",
        "types": [
          "Intrigue",
          "Investigation",
          "Commerce"
        ],
        "type": "contractBonus",
        "amount": 6,
        "description": "Improves hidden or illicit work."
      },
      {
        "trigger": "contractSuccess",
        "types": [
          "Intrigue",
          "Commerce"
        ],
        "type": "gainGuild",
        "stat": "gold",
        "amount": 6,
        "description": "Shadow success turns into Gold."
      }
    ],
    "Craftsman": [
      {
        "trigger": "facilityResolve",
        "facilities": [
          "workshop"
        ],
        "type": "gainGuild",
        "stat": "resources",
        "amount": 1,
        "description": "At Workshop, produces Resources.",
        "cap": 20
      },
      {
        "trigger": "facilityTrainingSupport",
        "facilities": [
          "workshop"
        ],
        "type": "trainingAssist",
        "amount": 5,
        "description": "At Workshop, tools improve Training Yard or Scout Lodge training.",
        "targetFacilities": [
          "training",
          "scout"
        ]
      }
    ],
    "Curious": [
      {
        "trigger": "contractSuccess",
        "types": [
          "Exploration",
          "Investigation",
          "Scholarship",
          "Inquiry"
        ],
        "type": "gainGuild",
        "stat": "connections",
        "amount": 1,
        "description": "Discovery success creates Connections.",
        "cap": 20
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "scout",
          "archives"
        ],
        "types": [
          "Exploration",
          "Investigation",
          "Inquiry",
          "Scholarship"
        ],
        "type": "contractBonus",
        "amount": 6,
        "description": "At Scout Lodge or Archives, supports discovery contracts."
      }
    ],
    "Disgraced": [
      {
        "trigger": "contractContest",
        "type": "contestScore",
        "amount": 12,
        "description": "Adds +12 contest score; they have less reputation left to protect."
      },
      {
        "trigger": "contractScore",
        "types": [
          "Intrigue",
          "Exploration"
        ],
        "type": "contractBonus",
        "amount": 7,
        "description": "Improves dirty or desperate work."
      },
      {
        "trigger": "contractFailure",
        "type": "softenFailure",
        "failureTypes": [
          "reputation_loss"
        ],
        "chance": 40,
        "description": "Reputation fallout hurts less."
      }
    ],
    "Faithful": [
      {
        "trigger": "contractScore",
        "types": [
          "Religion",
          "Crisis",
          "Pilgrimage",
          "Inquiry"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "Improves faith and crisis work."
      },
      {
        "trigger": "contractFailure",
        "type": "softenFailure",
        "failureTypes": [
          "negative_trait",
          "death"
        ],
        "chance": 25,
        "description": "Turns trauma or death fallout into lesser harm."
      }
    ],
    "Fearless": [
      {
        "trigger": "contractScore",
        "types": [
          "Military",
          "Hunt",
          "Crisis",
          "Legendary Hunt"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "Improves dangerous work."
      },
      {
        "trigger": "contractFailure",
        "risks": [
          "dangerous",
          "deadly",
          "lethal"
        ],
        "type": "ignoreCondition",
        "chance": 25,
        "description": "May ignore a new temporary condition from danger."
      }
    ],
    "Frugal": [
      {
        "trigger": "contractScore",
        "types": [
          "Commerce",
          "Accounting",
          "Provisioning"
        ],
        "type": "missingMaterialBuffer",
        "amount": 6,
        "description": "Improves work when Resources are short."
      },
      {
        "trigger": "contractSuccess",
        "types": [
          "Commerce",
          "Accounting",
          "Provisioning"
        ],
        "type": "gainGuild",
        "stat": "gold",
        "amount": 4,
        "description": "Efficient success earns extra Gold."
      }
    ],
    "Generous": [
      {
        "trigger": "contractSuccess",
        "type": "recoverGuild",
        "kinds": [
          "morale"
        ],
        "amount": 1,
        "description": "Public-service success recovers morale."
      },
      {
        "trigger": "facilityResolve",
        "facilities": [
          "chapel",
          "common"
        ],
        "type": "gainGuild",
        "stat": "reputation",
        "amount": 1,
        "description": "At Chapel or Common Room, goodwill creates Reputation."
      }
    ],
    "Hardy": [
      {
        "trigger": "contractScore",
        "types": [
          "Exploration",
          "Hunt",
          "Logistics",
          "Emergency"
        ],
        "type": "conditionBuffer",
        "kinds": [
          "strain",
          "injury"
        ],
        "amount": 6,
        "description": "Offsets strain or injury penalties on hard work."
      },
      {
        "trigger": "contractFailure",
        "type": "softenFailure",
        "failureTypes": [
          "injury",
          "death"
        ],
        "chance": 25,
        "description": "Reduces travel and field harm.",
        "types": [
          "Exploration",
          "Hunt",
          "Logistics"
        ]
      }
    ],
    "Healer": [
      {
        "trigger": "contractScore",
        "types": [
          "Relief",
          "Sanitation",
          "Crisis",
          "Military"
        ],
        "type": "conditionBuffer",
        "kinds": [
          "injury",
          "strain"
        ],
        "amount": 10,
        "description": "Offsets injury or strain penalties."
      },
      {
        "trigger": "conditionAdded",
        "type": "recoverTeam",
        "kinds": [
          "injury"
        ],
        "amount": 1,
        "description": "When injury lands, helps recovery."
      }
    ],
    "Honest": [
      {
        "trigger": "contractCooperation",
        "type": "cooperativeChance",
        "amount": 4,
        "description": "Adds +4% to the shared cooperative project chance when trust matters."
      },
      {
        "trigger": "contractSuccess",
        "types": [
          "Legal",
          "Civic",
          "Religion",
          "Administration"
        ],
        "type": "gainGuild",
        "stat": "reputation",
        "amount": 2,
        "description": "Credible public work creates Reputation."
      },
      {
        "trigger": "facilityResolve",
        "facilities": [
          "common",
          "chapel"
        ],
        "type": "gainGuild",
        "stat": "reputation",
        "amount": 1,
        "description": "At Common Room or Chapel, trust creates Reputation."
      }
    ],
    "Influential": [
      {
        "trigger": "contractClaim",
        "type": "forceCooperation",
        "description": "When this merc is on your claimed contract, rival competition drops become cooperation instead."
      },
      {
        "trigger": "contractScore",
        "types": [
          "Influence",
          "Diplomacy",
          "Civic",
          "Religion"
        ],
        "roles": [
          "lead"
        ],
        "type": "roleBonus",
        "amount": 6,
        "description": "Can lead institutional work."
      },
      {
        "trigger": "contractSuccess",
        "types": [
          "Influence",
          "Diplomacy",
          "Civic",
          "Religion"
        ],
        "type": "gainGuild",
        "stat": "reputation",
        "amount": 3,
        "description": "Institutional success creates Reputation."
      }
    ],
    "Inventive": [
      {
        "trigger": "contractScore",
        "types": [
          "Engineering",
          "Manufacturing",
          "Exploration",
          "Crafting"
        ],
        "type": "materialEcho",
        "amount": 6,
        "description": "Improves work when Resources cover the job."
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "workshop"
        ],
        "types": [
          "Engineering",
          "Manufacturing",
          "Crafting",
          "Foundry"
        ],
        "type": "contractBonus",
        "amount": 7,
        "description": "At Workshop, supports technical contracts."
      }
    ],
    "Learned": [
      {
        "trigger": "contractScore",
        "types": [
          "Scholarship",
          "Inquiry",
          "Legal",
          "Engineering"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "Improves knowledge work."
      },
      {
        "trigger": "facilityTrainingSupport",
        "facilities": [
          "archives"
        ],
        "type": "trainingAssist",
        "amount": 6,
        "description": "At Archives, methods improve Workshop, Market, or Scout training.",
        "targetFacilities": [
          "workshop",
          "market",
          "scout"
        ]
      }
    ],
    "Lucky": [
      {
        "trigger": "contractFailure",
        "type": "nearMissSuccess",
        "margin": 8,
        "chance": 45,
        "description": "May convert a near miss into success."
      }
    ],
    "Noble": [
      {
        "trigger": "contractSuccess",
        "types": [
          "Influence",
          "Diplomacy",
          "Legal",
          "Commerce"
        ],
        "type": "gainGuild",
        "stat": "reputation",
        "amount": 2,
        "description": "High-status success creates Reputation."
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "market",
          "chapel"
        ],
        "types": [
          "Influence",
          "Diplomacy",
          "Legal",
          "Religion"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "At Market Hall or Chapel, supports elite-facing contracts."
      }
    ],
    "Patient": [
      {
        "trigger": "facilityWork",
        "type": "trainingAssist",
        "amount": 8,
        "description": "This merc trains better at any facility."
      },
      {
        "trigger": "facilityTrainingSupport",
        "facilities": [
          "chapel",
          "infirmary",
          "common"
        ],
        "type": "trainingAssist",
        "amount": 4,
        "description": "At care facilities, steadies training elsewhere."
      }
    ],
    "Practical": [
      {
        "trigger": "contractScore",
        "types": [
          "Engineering",
          "Crafting",
          "Logistics",
          "Emergency"
        ],
        "type": "materialEcho",
        "amount": 5,
        "description": "Improves work when Resources cover the job."
      },
      {
        "trigger": "contractProgress",
        "types": [
          "Engineering",
          "Crafting",
          "Logistics",
          "Emergency"
        ],
        "minWorkSeasons": 2,
        "type": "advanceWork",
        "chance": 25,
        "amount": 1,
        "description": "Pushes long practical work ahead."
      }
    ],
    "Resourceful": [
      {
        "trigger": "contractScore",
        "type": "missingMaterialBuffer",
        "amount": 6,
        "description": "Improves work when Resources are short."
      },
      {
        "trigger": "facilityResolve",
        "facilities": [
          "scout",
          "common"
        ],
        "type": "gainGuild",
        "stat": "resources",
        "amount": 1,
        "description": "At Scout Lodge or Common Room, scraps become Resources.",
        "cap": 20
      }
    ],
    "Rural": [
      {
        "trigger": "contractScore",
        "types": [
          "Agriculture",
          "Provisioning",
          "Public Works"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "Improves food, land, and village work."
      },
      {
        "trigger": "contractSuccess",
        "types": [
          "Agriculture",
          "Provisioning"
        ],
        "type": "gainGuild",
        "stat": "resources",
        "amount": 2,
        "description": "Local food success creates Resources.",
        "cap": 20
      }
    ],
    "Scout": [
      {
        "trigger": "contractScore",
        "types": [
          "Exploration",
          "Hunt",
          "Logistics",
          "Investigation",
          "Military"
        ],
        "type": "contractBonus",
        "amount": 6,
        "description": "Improves field and route work."
      },
      {
        "trigger": "contractFailure",
        "type": "softenFailure",
        "failureTypes": [
          "injury",
          "negative_trait",
          "death"
        ],
        "chance": 30,
        "description": "Spots field trouble before it fully lands.",
        "types": [
          "Exploration",
          "Hunt",
          "Logistics"
        ]
      }
    ],
    "Secretive": [
      {
        "trigger": "contractScore",
        "types": [
          "Intrigue",
          "Investigation",
          "Diplomacy"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "Improves quiet work."
      },
      {
        "trigger": "contractSuccess",
        "types": [
          "Intrigue",
          "Investigation",
          "Diplomacy"
        ],
        "type": "gainGuild",
        "stat": "gold",
        "amount": 5,
        "description": "Quiet success creates Gold."
      }
    ],
    "Scholar": [
      {
        "trigger": "facilitySupport",
        "facilities": [
          "archives"
        ],
        "types": [
          "Scholarship",
          "Inquiry",
          "Engineering",
          "Agriculture"
        ],
        "type": "contractBonus",
        "amount": 8,
        "description": "At Archives, supports knowledge and technical contracts."
      },
      {
        "trigger": "facilityTrainingSupport",
        "facilities": [
          "archives"
        ],
        "type": "trainingAssist",
        "amount": 8,
        "description": "At Archives, research improves specialist facilities.",
        "targetFacilities": [
          "training",
          "workshop",
          "market",
          "scout",
          "infirmary"
        ]
      }
    ],
    "Seasoned": [
      {
        "trigger": "contractScore",
        "type": "contractBonus",
        "amount": 5,
        "description": "Improves multi-season contracts.",
        "minWorkSeasons": 2
      },
      {
        "trigger": "contractFailure",
        "type": "softenFailure",
        "failureTypes": [
          "negative_trait",
          "injury"
        ],
        "chance": 25,
        "description": "Hard experience softens bad fallout."
      }
    ],
    "Shrewd": [
      {
        "trigger": "contractContest",
        "type": "contestScore",
        "amount": 18,
        "description": "Adds +18 contest score when racing another guild for primary credit."
      },
      {
        "trigger": "contractContest",
        "type": "competitionCost",
        "amount": -1,
        "description": "Contesting a rival claim costs 1 less reputation."
      },
      {
        "trigger": "recruitCost",
        "type": "discount",
        "amount": 1,
        "description": "Recruiting costs 1 less while this merc is available."
      },
      {
        "trigger": "contractSuccess",
        "types": [
          "Commerce",
          "Intrigue",
          "Legal"
        ],
        "type": "gainGuild",
        "stat": "gold",
        "amount": 5,
        "description": "Reading incentives turns success into Gold."
      }
    ],
    "Smith": [
      {
        "trigger": "facilitySupport",
        "facilities": [
          "workshop"
        ],
        "types": [
          "Crafting",
          "Manufacturing",
          "Foundry",
          "Harbor Works"
        ],
        "type": "contractBonus",
        "amount": 7,
        "description": "At Workshop, supports metalwork and repair contracts."
      },
      {
        "trigger": "facilityResolve",
        "facilities": [
          "workshop"
        ],
        "type": "gainGuild",
        "stat": "resources",
        "amount": 1,
        "description": "At Workshop, produces Resources.",
        "cap": 20
      }
    ],
    "Stoneworker": [
      {
        "trigger": "contractScore",
        "types": [
          "Construction",
          "Engineering",
          "Extraction"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "Improves stone, structure, and extraction work."
      },
      {
        "trigger": "contractProgress",
        "types": [
          "Construction",
          "Engineering",
          "Extraction"
        ],
        "minWorkSeasons": 2,
        "type": "advanceWork",
        "chance": 25,
        "amount": 1,
        "description": "Pushes long stonework ahead."
      }
    ],
    "Strong": [
      {
        "trigger": "contractScore",
        "types": [
          "Military",
          "Public Works",
          "Extraction",
          "Harbor Works"
        ],
        "roles": [
          "lead"
        ],
        "type": "roleBonus",
        "amount": 5,
        "description": "Can lead heavy or physical work."
      },
      {
        "trigger": "contractScore",
        "roles": [
          "lead"
        ],
        "teammateAny": [
          "Builder",
          "Craftsman",
          "Soldier",
          "Miner"
        ],
        "type": "teamBonus",
        "amount": 5,
        "description": "Leading with practical support improves the job."
      }
    ],
    "Stubborn": [
      {
        "trigger": "contractFailure",
        "type": "ignoreCondition",
        "chance": 30,
        "description": "May ignore a new temporary condition."
      },
      {
        "trigger": "contractProgress",
        "type": "recoverTeam",
        "kinds": [
          "morale",
          "strain"
        ],
        "amount": 1,
        "description": "During long work, reduces morale or strain pressure."
      }
    ],
    "Veteran": [
      {
        "trigger": "contractScore",
        "types": [
          "Military",
          "Combat",
          "Defense",
          "Assault",
          "Legendary Hunt",
          "Crisis"
        ],
        "type": "contractBonus",
        "amount": 8,
        "description": "Improves elite martial work."
      },
      {
        "trigger": "facilityResolve",
        "facilities": [
          "training"
        ],
        "type": "gainGuild",
        "stat": "reputation",
        "amount": 2,
        "description": "At Training Yard, drills create Reputation."
      }
    ],
    "Watchful": [
      {
        "trigger": "contractScore",
        "types": [
          "Investigation",
          "Exploration",
          "Defense",
          "Guard Duty"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "Improves watchful work."
      },
      {
        "trigger": "contractFailure",
        "type": "softenFailure",
        "failureTypes": [
          "injury",
          "negative_trait",
          "death"
        ],
        "chance": 30,
        "description": "Spots danger before it fully lands."
      }
    ]
  }
};

const AI_PROFILES = [
  {
    "id": "balanced",
    "label": "Balanced Company",
    "defaultName": "Keystone Guild",
    "preferredTags": [
      "Merchant",
      "Soldier",
      "Scholar",
      "Careful",
      "Connected",
      "Builder",
      "Healer",
      "Scout"
    ],
    "facilityPriorities": [
      "common",
      "market",
      "training",
      "archives",
      "infirmary"
    ],
    "risk": 1,
    "goldBias": 0.25,
    "reputationBias": 3,
    "dangerBias": 0,
    "rosterGoal": 6,
    "restChance": 0.55,
    "facilityChance": 0.35,
    "workPenalty": 2
  },
  {
    "id": "scholars",
    "label": "Scholarly Society",
    "defaultName": "Ivory Archive",
    "preferredTags": [
      "Scholar",
      "Clerk",
      "Careful",
      "Faithful",
      "Learned",
      "Scribe",
      "Tutor",
      "Monk",
      "Apothecary",
      "Connected",
      "Noble"
    ],
    "facilityPriorities": [
      "chapel",
      "market",
      "common",
      "archives"
    ],
    "risk": 0.94,
    "goldBias": 0.18,
    "reputationBias": 3.8,
    "dangerBias": -0.3,
    "absoluteMinChance": 36,
    "rosterGoal": 6,
    "restChance": 0.55,
    "facilityChance": 0.4,
    "workPenalty": 1.7
  },
  {
    "id": "fighters",
    "label": "Military Company",
    "defaultName": "Iron Oath",
    "preferredTags": [
      "Soldier",
      "Veteran",
      "Strong",
      "Battlewise",
      "Fearless",
      "Armorer",
      "Warden",
      "Outrider",
      "Hunter",
      "Scout",
      "Healer"
    ],
    "facilityPriorities": [
      "training",
      "infirmary",
      "scout",
      "workshop"
    ],
    "risk": 1.05,
    "goldBias": 0.24,
    "reputationBias": 3.7,
    "dangerBias": 0.65,
    "absoluteMinChance": 32,
    "rosterGoal": 7,
    "restChance": 0.62,
    "facilityChance": 0.4,
    "workPenalty": 1.7
  },
  {
    "id": "operators",
    "label": "Operator Guild",
    "defaultName": "Black Ledger",
    "preferredTags": [
      "Merchant",
      "Connected",
      "Diplomat",
      "Criminal",
      "Scout",
      "Smuggler",
      "Innkeeper",
      "Courier",
      "Tax Collector",
      "Shrewd",
      "Charming",
      "Secretive",
      "Influential"
    ],
    "facilityPriorities": [
      "market",
      "scout",
      "archives",
      "common"
    ],
    "risk": 1.04,
    "goldBias": 0.26,
    "reputationBias": 2.95,
    "dangerBias": 0.25,
    "rosterGoal": 6,
    "restChance": 0.52,
    "facilityChance": 0.36,
    "workPenalty": 2
  },
  {
    "id": "merchants",
    "label": "Merchant House",
    "defaultName": "Gilded Bell",
    "preferredTags": [
      "Merchant",
      "Innkeeper",
      "Weaver",
      "Tax Collector",
      "Connected",
      "Shrewd",
      "Frugal",
      "Charming",
      "Noble",
      "Influential"
    ],
    "facilityPriorities": [
      "market",
      "common",
      "workshop",
      "archives"
    ],
    "risk": 0.95,
    "goldBias": 0.31,
    "reputationBias": 2.25,
    "dangerBias": -0.2,
    "absoluteMinChance": 34,
    "rosterGoal": 6,
    "restChance": 0.55,
    "facilityChance": 0.3,
    "workPenalty": 1.8
  },
  {
    "id": "builders",
    "label": "Craft Guild",
    "defaultName": "Stonewright Union",
    "preferredTags": [
      "Carpenter",
      "Mason",
      "Blacksmith",
      "Armorer",
      "Glassmaker",
      "Stonecutter",
      "Builder",
      "Craftsman",
      "Smith",
      "Stoneworker",
      "Practical",
      "Inventive"
    ],
    "facilityPriorities": [
      "workshop",
      "training",
      "market",
      "archives"
    ],
    "risk": 1,
    "goldBias": 0.34,
    "reputationBias": 3.05,
    "dangerBias": -0.1,
    "rosterGoal": 7,
    "restChance": 0.5,
    "facilityChance": 0.36,
    "workPenalty": 1.2
  },
  {
    "id": "explorers",
    "label": "Explorer Lodge",
    "defaultName": "Wayfarer Lodge",
    "preferredTags": [
      "Hunter",
      "Forester",
      "Outrider",
      "Courier",
      "Sailor",
      "Smuggler",
      "Soldier",
      "Scout",
      "Watchful",
      "Hardy",
      "Resourceful",
      "Curious",
      "Lucky"
    ],
    "facilityPriorities": [
      "scout",
      "training",
      "common",
      "infirmary"
    ],
    "risk": 1.05,
    "goldBias": 0.32,
    "reputationBias": 3.6,
    "dangerBias": 0.4,
    "absoluteMinChance": 30,
    "rosterGoal": 7,
    "restChance": 0.5,
    "facilityChance": 0.32,
    "workPenalty": 1.5
  },
  {
    "id": "pious",
    "label": "Religious Order",
    "defaultName": "Abbey Lantern",
    "preferredTags": [
      "Monk",
      "Scribe",
      "Physician",
      "Apothecary",
      "Faithful",
      "Patient",
      "Compassionate",
      "Healer",
      "Scholar",
      "Honest",
      "Generous"
    ],
    "facilityPriorities": [
      "chapel",
      "infirmary",
      "archives",
      "common"
    ],
    "risk": 0.95,
    "goldBias": 0.28,
    "reputationBias": 3.55,
    "dangerBias": -0.1,
    "absoluteMinChance": 32,
    "rosterGoal": 6,
    "restChance": 0.54,
    "facilityChance": 0.28,
    "workPenalty": 1.15
  },
  {
    "id": "relief",
    "label": "Relief Brotherhood",
    "defaultName": "Mercy House",
    "preferredTags": [
      "Physician",
      "Apothecary",
      "Chirurgeon",
      "Cook",
      "Herbalist",
      "Healer",
      "Patient",
      "Compassionate",
      "Rural",
      "Generous",
      "Resourceful"
    ],
    "facilityPriorities": [
      "infirmary",
      "chapel",
      "common",
      "archives"
    ],
    "risk": 0.97,
    "goldBias": 0.3,
    "reputationBias": 4,
    "dangerBias": -0.1,
    "absoluteMinChance": 33,
    "rosterGoal": 6,
    "restChance": 0.56,
    "facilityChance": 0.28,
    "workPenalty": 1.05
  },
  {
    "id": "civic",
    "label": "Civic League",
    "defaultName": "Charter Hall",
    "preferredTags": [
      "Bailiff",
      "Clerk",
      "Tax Collector",
      "Scribe",
      "Carpenter",
      "Mason",
      "Careful",
      "Honest",
      "Builder",
      "Connected",
      "Influential"
    ],
    "facilityPriorities": [
      "common",
      "archives",
      "market",
      "workshop"
    ],
    "risk": 0.94,
    "goldBias": 0.25,
    "reputationBias": 3.65,
    "dangerBias": -0.25,
    "absoluteMinChance": 35,
    "rosterGoal": 6,
    "restChance": 0.56,
    "facilityChance": 0.34,
    "workPenalty": 1.6
  },
  {
    "id": "miners",
    "label": "Stone Compact",
    "defaultName": "Deep Mine Compact",
    "preferredTags": [
      "Miner",
      "Stonecutter",
      "Mason",
      "Blacksmith",
      "Merchant",
      "Strong",
      "Stoneworker",
      "Hardy",
      "Careful",
      "Builder",
      "Practical",
      "Connected"
    ],
    "facilityPriorities": [
      "workshop",
      "training",
      "infirmary",
      "market"
    ],
    "risk": 1,
    "goldBias": 0.37,
    "reputationBias": 3.35,
    "dangerBias": 0.2,
    "absoluteMinChance": 32,
    "rosterGoal": 7,
    "restChance": 0.5,
    "facilityChance": 0.38,
    "workPenalty": 1.1
  },
  {
    "id": "gamblers",
    "label": "Fortune Seekers",
    "defaultName": "Fortune Seekers",
    "preferredTags": [
      "Lucky",
      "Ambitious",
      "Fearless",
      "Veteran",
      "Criminal",
      "Smuggler",
      "Soldier",
      "Hunter",
      "Merchant",
      "Diplomat",
      "Outrider",
      "Healer",
      "Noble",
      "Secretive",
      "Resourceful",
      "Scout"
    ],
    "facilityPriorities": [
      "scout",
      "training",
      "market",
      "infirmary"
    ],
    "risk": 1.22,
    "goldBias": 0.5,
    "reputationBias": 4,
    "dangerBias": 1.5,
    "absoluteMinChance": 22,
    "rosterGoal": 6,
    "restChance": 0.48,
    "facilityChance": 0.25,
    "workPenalty": 2.4
  }
];

const SEASONS = ['Winter','Spring','Summer','Fall'];
const SAVE_KEY = 'coin-and-company-save-v1';

class Game {
  constructor() {
    this.state = null;
    this.data = {};
    this.ui = {};
    this.pendingGuildName = 'Amber Company';
    this.pendingSetup = null;
    this.menuOpen = true;
    this.isSimulation = false;
    this._openingSplashTimer = null;
  }

  init() {
    this.data = {...GUILD_DATA,contractParts:CONTRACT_PARTS,characterParts:CHARACTER_PARTS,firstNames:FIRST_NAMES,lastNames:LAST_NAMES,aiProfiles:AI_PROFILES,contracts:this.expandContracts(GUILD_DATA.contracts,CONTRACT_PARTS,CHARACTER_PARTS)};
    this.newGame();
  }

  newGame(matchSetup=this.defaultMatchSetup()) {
    const playerSetup=this.playersForMatch(matchSetup);
    const aiCount=playerSetup.filter(player=>player.control!=='local').length;
    const rivals=this.pickAiProfiles(aiCount);
    let aiIndex=0;
    this.state = {
      year:1, seasonIndex:0, phase:'setup', starterIndex:this.randomInt(0,Math.max(0,playerSetup.length-1)), humanActionUsed:false, localTurnIndex:0,
      tavern:[],
      contractDeck:this.shuffle(this.data.contracts.map(c=>structuredClone(c))),
      boardContracts:[], log:[], nextContractInstance:1, nextCharacterInstance:1, tavernHasNew:true, tavernOpen:true,
      world:this.makeWorld(matchSetup.worldKey), match:{mode:matchSetup.mode||'ffa',playerCount:playerSetup.length,contractAvailability:matchSetup.contractAvailability||1,worldKey:matchSetup.worldKey||'random'}, startedSeasons:0, pendingTraitChoice:null, pendingContractResponses:[], pendingClaimForceResponses:[], resolvingContractResponses:false, setupDraftIndex:0, setupDraftPending:false, openingSplashUntil:this.browserDelayUntil(5000), activeGuildId:null, focusContractId:null, focusFacilityKey:null, aiActivity:[],
      guilds:playerSetup.map((player,index)=>{
        const personality=player.control==='local'?null:this.aiPersonalityForPlayer(player,rivals[aiIndex++]);
        const name=player.name||personality?.defaultName||personality?.label||player.fallbackName||`Guild ${index+1}`;
        const guild=this.makeGuild(player.id,name,player.control,personality);
        guild.teamId=player.teamId||player.id;
        guild.factionId=player.factionId||player.id;
        return guild;
      })
    };
    this.log(null,'game',`A new twenty-year contest begins in ${this.state.world.name}.`);
    this.refreshContracts();
    this.seedOpeningFounderMarket();
    this.state.activeGuildId=this.currentSetupGuild()?.id||null;
  }

  defaultMatchSetup(){
    return this.matchSetup('ffa',[
      {control:'local'},
      {control:'ai',difficulty:'hard'},
      {control:'ai',difficulty:'hard'},
      {control:'ai',difficulty:'hard'}
    ]);
  }
  hotseatMatchSetup(){
    return this.matchSetup('ffa',[
      {control:'local'},
      {control:'local'},
      {control:'ai',difficulty:'hard'},
      {control:'ai',difficulty:'hard'}
    ]);
  }
  duelMatchSetup(){
    return this.matchSetup('ffa',[
      {control:'local'},
      {control:'ai',difficulty:'hard',personalityId:'fighters'}
    ]);
  }
  fourPlayerFfaMatchSetup(){
    return this.matchSetup('ffa',[
      {control:'local'},
      {control:'local'},
      {control:'local'},
      {control:'local'}
    ]);
  }
  pairedTeamsMatchSetup(){
    return this.matchSetup('teams',[
      {control:'local',teamId:'team-1'},
      {control:'local',teamId:'team-1'},
      {control:'ai',teamId:'team-2',difficulty:'hard',personalityId:'builders'},
      {control:'ai',teamId:'team-2',difficulty:'hard',personalityId:'fighters'},
      {control:'ai',teamId:'team-3',difficulty:'hard',personalityId:'civic'},
      {control:'ai',teamId:'team-3',difficulty:'hard',personalityId:'operators'},
      {control:'ai',teamId:'team-4',difficulty:'hard',personalityId:'merchants'},
      {control:'ai',teamId:'team-4',difficulty:'hard',personalityId:'explorers'}
    ]);
  }
  matchSetup(mode='ffa',players=[],options={}){
    return {mode,contractAvailability:options.contractAvailability||1,worldKey:options.worldKey||'random',players:players.map((player,index)=>({...player,teamId:mode==='teams'?(player.teamId||`team-${index+1}`):`player-${index+1}`}))};
  }
  playersForMatch(matchSetup){
    const guildNames=['Amber Company','White Raven','Iron Oath','Green Lantern','Blue Banner','Red Sash','Silver Hand','Black Tower'];
    const mode=matchSetup.mode||'ffa';
    return (matchSetup.players||[]).map((player,index)=>{
      const fallbackName=guildNames[index]||`Guild ${index+1}`;
      const id=(player.id||fallbackName).toLowerCase().replaceAll(' ','-');
      return {
        id,
        name:index===0&&player.control==='local'?this.cleanGuildName(this.pendingGuildName):player.name||null,
        fallbackName,
        control:player.control==='local'?'local':'ai',
        teamId:mode==='teams'?(player.teamId||`team-${index+1}`):id,
        factionId:player.factionId||id,
        difficulty:player.difficulty||'hard',
        personalityId:player.personalityId||player.aiArchetype||null
      };
    });
  }

  expandContracts(baseContracts,parts,characterParts) {
    const settings=parts.settings;
    const limits=settings.limits;
    const professionNames=new Set(characterParts.professions.map(p=>p.name));
    const coverageTags=[...new Set(characterParts.traits.filter(t=>!professionNames.has(t)))];
    const generated=[];
    for(const job of parts.jobs) for(const patron of parts.patrons) for(const twist of parts.twists) {
      const coverageTag=coverageTags[generated.length%coverageTags.length];
      const difficulty=job.difficulty+patron.difficulty+twist.difficulty;
      const rewardGold=Math.max(settings.minRewardGold,Math.round((job.gold+patron.gold+twist.gold)*(settings.rewardGoldScale||1)));
      const rewardRep=Math.max(settings.minRewardReputation,job.rep+patron.rep+twist.rep);
      const contract={
        id:`${job.key}-${patron.key}-${twist.key}`,
        title:`${twist.label}${job.title} for ${patron.name}`,
        titlePrefix:twist.label.trim(),
        twistKey:twist.key,
        workTitle:job.title,
        type:job.type,
        risk:twist.risk,
        description:`${job.desc} Patron: ${patron.name}.`,
        patron:{key:patron.key,name:patron.name,trait:patron.trait},
        workSeasons:this.clamp(job.work+twist.work,...limits.workSeasons),
        offerSeasons:this.clamp(job.offer+twist.offer,...limits.offerSeasons),
        baseDifficulty:difficulty,
        requirements:job.traits.map((trait,i)=>({trait,weight:settings.requirementWeights[i]||settings.requirementWeights.at(-1)})),
        materials:this.clamp(job.materials+(settings.materialBonusByTwist[twist.key]||0),...limits.materials),
        support:[...new Set([...job.support,patron.trait,coverageTag])].filter(Boolean).map((trait,i)=>({trait,weight:settings.supportWeights[i]||settings.supportWeights.at(-1)})),
        reward:{gold:rewardGold,reputation:rewardRep},
        failure:twist.failure
      };
      contract.pool=this.contractPoolFor(contract,parts);
      generated.push(contract);
    }
    const base=baseContracts.map(c=>{const contract=structuredClone(c);contract.pool=this.contractPoolFor(contract,parts);return contract;});
    return [...base,...generated];
  }

  contractPoolFor(contract,parts=this.data.contractParts) {
    const tags=this.contractTags(contract);
    return parts.world.pools.find(p=>p.types?.includes(contract.type)||p.traits?.some(t=>tags.includes(t)))?.key||'Civic';
  }
  contractTags(contract){return [...contract.requirements.map(r=>r.trait),...contract.support.map(r=>r.trait)];}
  poolForTag(tag){
    const affinity=this.data.characterParts.tagAffinities?.[tag];
    const domains=affinity?.domains||[];
    return this.data.contractParts.world.pools.find(pool=>domains.includes(pool.key)||pool.types?.some(type=>domains.includes(type))||pool.traits?.includes(tag))?.key||null;
  }
  secondaryContractPool(contract){
    const tags=[contract.patron?.trait,...(contract.support||[]).map(r=>r.trait),...(contract.requirements||[]).map(r=>r.trait)].filter(Boolean);
    return tags.map(tag=>this.poolForTag(tag)).find(pool=>pool&&pool!==contract.pool)||contract.pool;
  }
  poolAccent(pool){
    const colors={
      Agriculture:'72, 143, 90',
      Military:'190, 81, 75',
      Commerce:'84, 156, 104',
      Exploration:'70, 150, 160',
      Religion:'168, 139, 211',
      Civic:'214, 174, 78',
      Crafting:'178, 139, 92'
    };
    return colors[pool]||'197, 154, 84';
  }
  contractAccentStyle(contract){
    const primary=this.poolAccent(contract.pool);
    const secondary=this.poolAccent(this.secondaryContractPool(contract));
    return `--pool-a:${primary};--pool-b:${secondary};`;
  }

  makeWorld(worldKey='random') {
    const starts=this.data.contractParts.world.starts;
    const template=starts.find(start=>start.key===worldKey)||this.pick(starts);
    const values={};
    for(const [key,range] of Object.entries(template.ranges)) values[key]=this.randomInt(range[0],range[1]);
    return {name:template.name,key:template.key||worldKey,values,trend:{},lastShift:'Starting conditions vary from game to game.'};
  }

  openingWorldIntroHtml(guild){
    const world=this.state.world;
    const worldName=this.titleCase(world.name);
    const plentiful=this.plentifulContractPools().slice(0,3);
    const pressures=this.worldOpeningPressureLines().slice(0,4);
    const neighbors=this.neighboringWorldPackages().slice(0,2);
    const turnOrder=this.setupDraftOrder().map(g=>this.escapeHtml(g.name)).join(' -> ');
    const competitors=this.setupDraftOrder().filter(g=>g.id!==guild.id).map(g=>this.escapeHtml(g.name));
    const current=this.currentSetupGuild();
    const draftPrompt=current?this.isLocalGuild(current)?'Select your founder.':`${current.name} is selecting a founder.`:'Select your founder.';
    const plentifulText=plentiful.length?`${this.readableList(plentiful.map(pool=>this.contractPoolDisplayName(pool.key)))} contracts are plentiful.`:'The contract board is unusually balanced.';
    const driftText=neighbors.length?`${worldName} can slide toward ${this.readableList(neighbors.map(start=>this.titleCase(start.name)),'or')} if the region keeps changing in that direction.`:`${worldName} can change as contracts push the region's pressures around.`;
    return `<section class="founder-world-intro"><h3>${this.escapeHtml(worldName)}</h3><p>Your region of the world starts with ${this.escapeHtml(world.name)}. ${this.escapeHtml(plentifulText)}</p><p>${this.escapeHtml(driftText)}</p><div class="world-pressure-list">${pressures.map(line=>`<span>${this.escapeHtml(line)}</span>`).join('')}</div><p>You are controlling <strong>${this.escapeHtml(guild.name)}</strong>.</p><p>Competitors: ${competitors.length?this.readableList(competitors,'and'):'none'}.</p><p>Turn order: ${turnOrder}.</p><h4>${this.escapeHtml(draftPrompt)}</h4></section>`;
  }
  readableList(items=[],conjunction='and'){
    const list=[...items].filter(Boolean);
    if(!list.length)return '';
    if(list.length===1)return String(list[0]);
    if(list.length===2)return `${list[0]} ${conjunction} ${list[1]}`;
    return `${list.slice(0,-1).join(', ')}, ${conjunction} ${list.at(-1)}`;
  }
  plentifulContractPools(){
    return [...(this.data.contractParts.world.pools||[])]
      .map(pool=>({...pool,score:this.poolPressureScore(pool)}))
      .sort((a,b)=>b.score-a.score)
      .filter(pool=>pool.score>12);
  }
  poolPressureScore(pool){
    let score=0;
    for(const [key,direction] of Object.entries(pool.pressure||{})){
      const value=this.state.world.values[key]??50;
      if(direction==='low')score+=value<45?32+(45-value)/2:Math.max(0,12-(value-45)/3);
      if(direction==='high')score+=value>55?32+(value-55)/2:Math.max(0,12-(55-value)/3);
    }
    return score;
  }
  contractPoolDisplayName(poolKey){
    return ({Civic:'Building/Civic',Crafting:'Crafting',Commerce:'Commerce',Agriculture:'Agriculture',Military:'Military',Exploration:'Exploration',Religion:'Religion'})[poolKey]||poolKey;
  }
  worldOpeningPressureLines(){
    return this.data.contractParts.world.states.map(state=>{
      const value=this.state.world.values[state.key]??50;
      const band=value<35?state.low:value>65?state.high:state.mid;
      return `${state.label}: ${band}`;
    });
  }
  neighboringWorldPackages(){
    const starts=this.data.contractParts.world.starts||[];
    const distance=start=>Object.entries(start.ranges||{}).reduce((sum,[key,range])=>{
      const mid=(range[0]+range[1])/2;
      const value=this.state.world.values[key]??50;
      return sum+Math.abs(value-mid);
    },0);
    return starts
      .filter(start=>start.name!==this.state.world.name)
      .map(start=>({...start,distance:distance(start)}))
      .sort((a,b)=>a.distance-b.distance);
  }
  titleCase(text){
    return String(text||'').replace(/\b\w/g,ch=>ch.toUpperCase());
  }

  makeGuild(id,name,control='ai',personality=null) {
    const isLocal=control===true||control==='local';
    return {
      id,name,control:isLocal?'local':'ai',human:isLocal,personality,teamId:id,factionId:id,
      gold:0,reputation:0,completed:0,roster:[],resources:2,connections:1,facilityReadiness:{},patronFavor:{},
      poolWins:{}
    };
  }
  pickAiProfiles(count,profiles=this.data.aiProfiles||[]){
    return this.shuffle(profiles).slice(0,count).map(profile=>structuredClone(profile));
  }
  aiArchetypePackages(){
    return {
      contractor:{profileIds:['fighters','explorers','gamblers'],label:'Contractor',patch:{facilityChance:-0.04,workPenalty:-0.2}},
      constructor:{profileIds:['builders','miners','civic'],label:'Constructor',patch:{facilityChance:0.08,dangerBias:-0.15,workPenalty:-0.25}},
      politician:{profileIds:['civic','operators','scholars','pious'],label:'Politician',patch:{reputationBias:0.55,goldBias:-0.04,dangerBias:-0.2,facilityChance:0.04}}
    };
  }
  aiDifficultyPackages(){
    return {
      easy:{label:'Easy',adjust:{riskMultiplier:0.92,minChanceDelta:8,facilityChanceDelta:-0.06,restChanceDelta:0.08,workPenaltyDelta:0.45,decisionNoise:0.28,planningDelayYears:5,planningScale:0.62}},
      normal:{label:'Normal',adjust:{decisionNoise:0.14,planningDelayYears:2,planningScale:0.82}},
      hard:{label:'Hard',adjust:{riskMultiplier:1.08,minChanceDelta:-4,facilityChanceDelta:0.06,restChanceDelta:-0.06,workPenaltyDelta:-0.35,decisionNoise:0,planningDelayYears:0,planningScale:1}}
    };
  }
  aiPersonalityForPlayer(player,fallbackProfile=null){
    if(player.control==='local')return null;
    const profiles=this.data.aiProfiles||[];
    const difficulty=this.aiDifficultyPackages()[player.difficulty]||this.aiDifficultyPackages().normal;
    const baseId=player.personalityId&&player.personalityId!=='random'?player.personalityId:fallbackProfile?.id;
    const base=structuredClone(profiles.find(profile=>profile.id===baseId)||fallbackProfile||profiles[0]||{id:'balanced',label:'Balanced Company'});
    const applyPatch=patch=>{
      for(const [key,value] of Object.entries(patch||{})){
        if(typeof value==='number'&&typeof base[key]==='number')base[key]+=value;
        else base[key]=value;
      }
    };
    applyPatch(difficulty.patch);
    const adjust=difficulty.adjust||{};
    if(adjust.riskMultiplier&&typeof base.risk==='number')base.risk*=adjust.riskMultiplier;
    if(adjust.minChanceDelta)base.absoluteMinChance=(base.absoluteMinChance??this.data.contractParts.settings.aiAbsoluteMinChance??30)+adjust.minChanceDelta;
    if(adjust.facilityChanceDelta&&typeof base.facilityChance==='number')base.facilityChance+=adjust.facilityChanceDelta;
    if(adjust.restChanceDelta&&typeof base.restChance==='number')base.restChance+=adjust.restChanceDelta;
    if(adjust.workPenaltyDelta&&typeof base.workPenalty==='number')base.workPenalty+=adjust.workPenaltyDelta;
    base.decisionNoise=adjust.decisionNoise??0;
    base.planningDelayYears=adjust.planningDelayYears??0;
    base.planningScale=adjust.planningScale??1;
    base.difficulty=player.difficulty||'hard';
    base.personalitySelection=player.personalityId||'random';
    base.label=`${difficulty.label} ${base.label}`;
    return base;
  }
  cleanGuildName(name){return String(name||'').trim().slice(0,28)||'Amber Company';}
  aiProfileValue(guild,key,fallback){return guild.personality?.[key]??fallback;}
  aiDecisionValue(guild,value){
    const noise=this.aiProfileValue(guild,'decisionNoise',0);
    if(!noise)return value;
    return value*(1-Math.random()*noise);
  }
  aiPickBestOption(guild,options){
    return options.map(option=>({...option,rankValue:this.aiDecisionValue(guild,option.value)})).sort((a,b)=>b.rankValue-a.rankValue)[0]||null;
  }
  makeCharacter(base,professionOverride=null) { const profession=professionOverride||this.pickProfession();const traits=this.pickTraits(profession);const allTraits=[profession.name,...traits].slice(0,this.maxTraits());const variance=this.data.characterParts.settings;const character={...structuredClone(base),templateId:base.id,id:`${base.id}-${this.state.nextCharacterInstance++}`,archetype:profession.name,status:profession.status,traits:allTraits,revealedTraits:[profession.name],revealAfterSeason:false,conditions:[],resources:this.clamp(profession.resources+this.randomInt(...variance.resourceVariance),0,5),connections:this.clamp(profession.connections+this.randomInt(...variance.connectionVariance),0,5),history:[],placement:null,alive:true,refusesGuildIds:[]};character.name=this.generateCharacterName(base);return character; }
  pickProfession(){
    const weights=this.data.characterParts.settings.professionStatusWeights||{};
    return this.weightedPick(this.data.characterParts.professions.map(profession=>({item:profession,weight:weights[profession.status]??1})))||this.pick(this.data.characterParts.professions);
  }
  pickTraits(profession) {
    const count=this.generatedTraitCount();
    return this.shuffle(this.data.characterParts.traits.filter(t=>t!==profession.name)).slice(0,Math.min(count,this.maxTraits()-1));
  }
  generatedTraitCount(){
    const weights=this.data.characterParts.settings.traitCountWeights||[{count:this.data.characterParts.settings.traitsPerCharacter||0,weight:1}];
    const total=weights.reduce((sum,row)=>sum+(row.weight||0),0);
    let roll=Math.random()*Math.max(1,total);
    for(const row of weights){
      roll-=row.weight||0;
      if(roll<=0)return row.count||0;
    }
    return weights.at(-1)?.count||0;
  }
  maxTraits(){return this.data.characterParts.settings.maxTraits||4;}
  secondaryTraitCount(c){return Math.max(0,(c.traits?.length||0)-1);}
  baseRecruitCost(c){return this.getStatus(c.status).recruitCost+this.secondaryTraitCount(c)*(this.data.characterParts.settings.traitRecruitCost||0);}
  characterSalary(c){return this.getStatus(c.status).salary+this.secondaryTraitCount(c)*(this.data.characterParts.settings.traitSalary||0);}
  generateCharacterName(base) { const used=new Set([...this.state.tavern,...this.state.guilds.flatMap(g=>g.roster)].map(c=>c.name));for(let i=0;i<20;i++){const first=this.pick(this.data.firstNames);const last=this.pick(this.data.lastNames);const name=`${first} ${last}`;if(!used.has(name))return name;}return `${base.name} ${this.state.nextCharacterInstance}`; }
  getStatus(id) { return this.data.statuses.find(s=>s.id===id); }
  currentSeason() { return SEASONS[this.state.seasonIndex]; }
  boardSize() {
    const settings=this.data.contractParts.settings;
    const base=settings.boardSize||3;
    const availability=this.state?.match?.contractAvailability||1;
    const modified=base+this.contractBoardWorldModifier();
    return this.clamp(Math.round(modified*availability),1,6);
  }
  contractBoardWorldModifier(){
    const world=this.state?.world;
    if(!world)return 0;
    let modifier=0;
    const name=String(world.name||'').toLowerCase();
    if(name.includes('merchant boom')||(world.values?.trade||0)>=75)modifier++;
    if(name.includes('hungry winter')||this.currentSeason()==='Winter'&&(world.values?.food||50)<35)modifier--;
    if((world.values?.trade||50)<30&&(world.values?.food||50)<40)modifier--;
    return this.clamp(modifier,-1,1);
  }
  pick(a) { return a[Math.floor(Math.random()*a.length)]; }
  randomInt(min,max) { return min+Math.floor(Math.random()*(max-min+1)); }
  browserDelayUntil(ms){return typeof window==='undefined'?0:Date.now()+ms;}
  shuffle(a) {
    const copy=[...a];
    for(let i=copy.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [copy[i],copy[j]]=[copy[j],copy[i]];
    }
    return copy;
  }
  clamp(n,min,max){ return Math.max(min,Math.min(max,n)); }
  isLocalGuild(guild){return guild?.control==='local'||guild?.human===true;}
  isAiGuild(guild){return !this.isLocalGuild(guild);}
  localGuilds(){return this.state.guilds.filter(g=>this.isLocalGuild(g));}
  humanGuild(){return this.localGuilds()[0]||this.state.guilds[0];}
  activeLocalGuild(){return this.state.guilds.find(g=>g.id===this.state.activeGuildId&&this.isLocalGuild(g))||this.humanGuild();}
  actingGuild(){return this.state.guilds.find(g=>g.id===this.state.activeGuildId)||this.activeLocalGuild();}
  guildName(id){return this.state.guilds.find(g=>g.id===id)?.name||id;}
  findCharacter(characterId){
    for(const guild of this.state.guilds){
      const character=guild.roster.find(c=>c.id===characterId);
      if(character)return {guild,character};
    }
    return null;
  }
  activeWorkers(guild){return guild.roster.filter(c=>c.alive);}
  availableWorkers(guild){return this.activeWorkers(guild).filter(c=>!this.isPlaced(c));}
  guildOrder() { const count=this.state.guilds.length;return this.state.guilds.map((_,i)=>this.state.guilds[(this.state.starterIndex+i)%count]); }
  snakeGuildOrder(round=this.state.startedSeasons) { const order=this.guildOrder(); return round%2?[...order].reverse():order; }
  setupDraftOrder() { return this.snakeGuildOrder(0); }
  currentSetupGuild() { return this.setupDraftOrder()[this.state.setupDraftIndex]||null; }
  openingSplashActive(){return this.state.phase==='setup'&&Date.now()<(this.state.openingSplashUntil||0);}
  openingSplashViewGuild(){return this.localGuilds()[0]||this.currentSetupGuild()||this.state.guilds[0];}
  scheduleOpeningSplashResume(){
    if(typeof window==='undefined'||!this.openingSplashActive()||this._openingSplashTimer)return;
    this._openingSplashTimer=setTimeout(()=>{this._openingSplashTimer=null;this.render();},Math.max(50,(this.state.openingSplashUntil||0)-Date.now()+25));
  }
  firstLocalSetupDraftIndex(){return this.setupDraftOrder().findIndex(g=>this.isLocalGuild(g));}
  humanTurnSplit(round=this.state.startedSeasons) {
    const order=this.snakeGuildOrder(round);
    const humanIndex=order.findIndex(g=>this.isLocalGuild(g));
    if(humanIndex<0)return {before:order,after:[]};
    return {before:order.slice(0,humanIndex),after:order.slice(humanIndex+1)};
  }
  aiBeforeHuman() { return this.humanTurnSplit().before.filter(g=>this.isAiGuild(g)); }
  aiAfterHuman() { return this.humanTurnSplit().after.filter(g=>this.isAiGuild(g)); }
  reverseGuildOrder() { return [...this.guildOrder()].reverse(); }

  bindUI() {
    const $ = id => document.getElementById(id);
    this.ui = {date:$('dateLabel'),phase:$('phaseLabel'),guildGrid:$('guildGrid'),world:$('worldGrid'),aiActivity:$('aiActivityStrip'),peopleGrid:$('peopleGrid'),recoveryGrid:$('recoveryGrid'),recruitGrid:$('recruitGrid'),contractGrid:$('contractGrid'),facilityGrid:$('facilityGrid'),tavernPanel:$('tavernPanel'),tavernTitle:$('tavernTitle'),tavernEyebrow:$('tavernEyebrow'),tavernClose:$('tavernClose'),tavernBtn:$('tavernBtn'),characterPanel:$('characterPanel'),characterPanelEyebrow:$('characterPanelEyebrow'),characterPanelTitle:$('characterPanelTitle'),characterPanelSubtitle:$('characterPanelSubtitle'),characterPanelBody:$('characterPanelBody'),characterPanelClose:$('characterPanelClose'),advance:$('advanceBtn'),aiThinking:$('aiThinking'),newGame:$('newGameBtn'),humanStatus:$('humanActionStatus'),entry:$('entryScreen'),guildName:$('guildNameInput'),singlePlayer:$('singlePlayerBtn'),loadGame:$('loadGameBtn'),multiplayer:$('multiplayerBtn'),settings:$('settingsBtn'),glossary:$('glossaryBtn'),settingsPanel:$('settingsPanel'),glossaryPanel:$('glossaryPanel'),gameSetupPanel:$('gameSetupPanel'),setupMode:$('setupModeSelect'),setupPlayerCount:$('setupPlayerCountSelect'),setupContract:$('setupContractSelect'),setupRows:$('setupPlayerRows'),setupSummary:$('setupSummary'),startCustomGame:$('startCustomGameBtn'),entryNote:$('entryNote'),aiPace:$('aiPaceSelect')};
    this.ui.newGame.addEventListener('click',()=>this.returnToMenu());
    this.ui.singlePlayer.addEventListener('click',()=>this.startSinglePlayer());
    this.ui.loadGame.addEventListener('click',()=>this.loadGame());
    this.ui.multiplayer.addEventListener('click',()=>this.openGameSetup());
    this.ui.startCustomGame.addEventListener('click',()=>this.startConfiguredGame());
    this.ui.setupMode.addEventListener('change',()=>this.updatePendingSetupFromControls());
    this.ui.setupPlayerCount.addEventListener('change',()=>this.updatePendingSetupFromControls());
    this.ui.setupContract.addEventListener('change',()=>this.updatePendingSetupFromControls());
    this.ui.setupRows.addEventListener('input',evt=>this.handleSetupRowInput(evt));
    this.ui.setupRows.addEventListener('change',evt=>this.handleSetupRowInput(evt));
    this.ui.settings.addEventListener('click',()=>this.toggleEntryPanel('settings'));
    this.ui.glossary.addEventListener('click',()=>this.toggleEntryPanel('glossary'));
    this.ui.guildName.addEventListener('input',()=>{this.pendingGuildName=this.cleanGuildName(this.ui.guildName.value);});
    this.ui.aiPace.addEventListener('change',()=>{this.data.contractParts.settings.aiTurnDelayMs=Number(this.ui.aiPace.value)||550;this.showEntryNote(`AI turn pace set to ${this.ui.aiPace.options[this.ui.aiPace.selectedIndex].text}.`);});
    this.ui.advance.addEventListener('click',()=>this.advance());
    this.ui.tavernBtn.addEventListener('click',()=>{if(this.state.phase==='setup')return;this.state.tavernOpen=!this.state.tavernOpen;this.state.tavernHasNew=false;this.render();});
    this.ui.tavernClose.addEventListener('click',()=>this.closeTavern());
    this.ui.tavernPanel.addEventListener('click',evt=>{if(evt.target===this.ui.tavernPanel)this.closeTavern();});
    this.ui.characterPanelClose.addEventListener('click',()=>this.closeCharacterPanel());
    this.ui.characterPanel.addEventListener('click',evt=>{if(evt.target===this.ui.characterPanel)this.closeCharacterPanel();});
    this.ui.characterPanelBody.addEventListener('click',evt=>{
      const choice=evt.target.closest?.('[data-replace-trait]');
      if(choice){this.resolveTraitChoice(choice.dataset.replaceTrait);return;}
      const release=evt.target.closest?.('[data-release-merc]');
      if(release){this.releaseMerc(release.dataset.characterId,release.dataset.releaseMerc);return;}
      const response=evt.target.closest?.('[data-contract-response]');
      if(response){this.resolveContractResponse(response.dataset.responseId,response.dataset.contractResponse);return;}
      const force=evt.target.closest?.('[data-claim-force-response]');
      if(force){this.resolveClaimForceResponse(force.dataset.responseId,force.dataset.claimForceResponse);return;}
      const responseMerc=evt.target.closest?.('[data-contract-response-merc]');
      if(responseMerc){this.openContractResponseMerc(responseMerc.dataset.responseId,responseMerc.dataset.contractResponseMerc);return;}
      const responseBack=evt.target.closest?.('[data-open-contract-response]');
      if(responseBack){this.openContractResponse(responseBack.dataset.openContractResponse);return;}
      const term=evt.target.closest?.('[data-glossary-term]');
      if(term){evt.preventDefault();evt.stopPropagation();this.openGlossaryTerm(term.dataset.glossaryTerm,term.dataset.glossaryWeight);return;}
      const character=evt.target.closest?.('[data-inspect-character]');
      if(character)this.openCharacterPanel(character.dataset.inspectCharacter);
    });
    this.ui.characterPanelBody.addEventListener('keydown',evt=>{
      if(evt.key!=='Enter'&&evt.key!==' ')return;
      const release=evt.target.closest?.('[data-release-merc]');
      if(release){evt.preventDefault();this.releaseMerc(release.dataset.characterId,release.dataset.releaseMerc);return;}
      const response=evt.target.closest?.('[data-contract-response]');
      if(response){evt.preventDefault();this.resolveContractResponse(response.dataset.responseId,response.dataset.contractResponse);return;}
      const force=evt.target.closest?.('[data-claim-force-response]');
      if(force){evt.preventDefault();this.resolveClaimForceResponse(force.dataset.responseId,force.dataset.claimForceResponse);return;}
      const responseMerc=evt.target.closest?.('[data-contract-response-merc]');
      if(responseMerc){evt.preventDefault();this.openContractResponseMerc(responseMerc.dataset.responseId,responseMerc.dataset.contractResponseMerc);return;}
      const responseBack=evt.target.closest?.('[data-open-contract-response]');
      if(responseBack){evt.preventDefault();this.openContractResponse(responseBack.dataset.openContractResponse);return;}
      const term=evt.target.closest?.('[data-glossary-term]');
      if(term){evt.preventDefault();this.openGlossaryTerm(term.dataset.glossaryTerm,term.dataset.glossaryWeight);return;}
      const character=evt.target.closest?.('[data-inspect-character]');
      if(!character)return;
      evt.preventDefault();
      this.openCharacterPanel(character.dataset.inspectCharacter);
    });
    document.addEventListener('keydown',evt=>{if(evt.key==='Escape'){this.closeTavern();this.closeCharacterPanel();}});
    this.bindGlossaryClicks();
    this.renderGlossary();
    this.pendingSetup=this.defaultMatchSetup();
    this.renderGameSetup();
    this.updateSaveUi();
  }

  openEntryScreen(panel='single'){
    this.menuOpen=true;
    this.closeTavern();
    this.closeCharacterPanel();
    this.ui.entry?.classList.remove('closed');
    if(this.ui.guildName)this.ui.guildName.value=this.cleanGuildName(this.pendingGuildName||this.humanGuild()?.name);
    this.toggleEntryPanel(panel,false);
    this.renderGameSetup();
    this.updateSaveUi();
  }
  closeEntryScreen(){this.menuOpen=false;this.ui.entry?.classList.add('closed');}
  returnToMenu(){
    const saved=this.saveGame({silent:true});
    this.openEntryScreen('single');
    this.showEntryNote(saved?'Game saved. Choose Single Player to start fresh or Load Game to resume this run.':'Choose Single Player to start fresh or Load Game to resume a saved run.');
  }
  startSinglePlayer(){
    this.pendingGuildName=this.cleanGuildName(this.ui.guildName?.value);
    this.newGame(this.defaultMatchSetup());
    this.closeEntryScreen();
    this.render();
  }
  startHotseat(){
    this.pendingGuildName=this.cleanGuildName(this.ui.guildName?.value);
    this.newGame(this.hotseatMatchSetup());
    this.log(null,'game','Hotseat started: Amber Company and White Raven are local seats; Iron Oath and Green Lantern are AI guilds.');
    this.state.activeGuildId=this.currentSetupGuild()?.id||null;
    this.state.tavernOpen=this.isLocalGuild(this.currentSetupGuild());
    this.closeEntryScreen();
    this.render();
  }
  openGameSetup(){
    this.pendingGuildName=this.cleanGuildName(this.ui.guildName?.value);
    this.pendingSetup=this.pendingSetup||this.hotseatMatchSetup();
    this.toggleEntryPanel('setup');
    this.renderGameSetup();
    this.showEntryNote('Configure FFA or Teams, then start a new contest.');
  }
  startConfiguredGame(){
    this.pendingGuildName=this.cleanGuildName(this.ui.guildName?.value);
    const setup=this.pendingSetup||this.defaultMatchSetup();
    const localCount=setup.players.filter(player=>player.control==='local').length;
    if(!localCount){
      setup.players[0].control='local';
      this.showEntryNote('At least one player must be PC. Player 1 was set to PC.');
      this.renderGameSetup();
      return;
    }
    this.newGame(setup);
    this.closeEntryScreen();
    this.render();
  }
  setupDefaultPlayers(count=4,mode='ffa'){
    const previous=this.pendingSetup?.players||[];
    const profileIds=(this.data.aiProfiles||[]).map(profile=>profile.id);
    return Array.from({length:count},(_,index)=>{
      const old=previous[index]||{};
      const defaultControl=index===0?'local':'ai';
      return {
        name:old.name,
        control:old.control||defaultControl,
        teamId:mode==='teams'?(old.teamId||`team-${Math.min(index+1,4)}`):`player-${index+1}`,
        difficulty:old.difficulty||'hard',
        personalityId:old.personalityId||old.aiArchetype||'random'
      };
    });
  }
  updatePendingSetupFromControls(){
    const mode=this.ui.setupMode?.value||'ffa';
    const count=this.clamp(Number(this.ui.setupPlayerCount?.value)||4,2,8);
    const contractAvailability=Number(this.ui.setupContract?.value)||1;
    this.pendingSetup=this.matchSetup(mode,this.setupDefaultPlayers(count,mode),{contractAvailability});
    this.renderGameSetup();
  }
  handleSetupRowInput(evt){
    const field=evt.target.closest?.('[data-setup-field]');
    if(!field||!this.pendingSetup)return;
    const index=Number(field.dataset.playerIndex);
    const player=this.pendingSetup.players[index];
    if(!player)return;
    const key=field.dataset.setupField;
    player[key]=field.value;
    if(key==='control'&&field.value==='local')player.difficulty=player.difficulty||'hard';
    if(this.pendingSetup.mode==='ffa')player.teamId=`player-${index+1}`;
    if(key==='name'){
      this.renderSetupSummary();
      return;
    }
    this.renderGameSetup();
  }
  renderGameSetup(){
    if(!this.ui.setupRows)return;
    this.pendingSetup=this.pendingSetup||this.defaultMatchSetup();
    const setup=this.pendingSetup;
    this.ui.setupMode.value=setup.mode||'ffa';
    this.ui.setupPlayerCount.value=String(setup.players.length||4);
    this.ui.setupContract.value=String(setup.contractAvailability||1);
    this.ui.setupRows.innerHTML=setup.players.map((player,index)=>this.setupPlayerRowHtml(player,index,setup)).join('');
    this.renderSetupSummary();
  }
  renderSetupSummary(){
    if(!this.ui.setupSummary||!this.pendingSetup)return;
    const setup=this.pendingSetup;
    const pc=setup.players.filter(player=>player.control==='local').length;
    const cpu=setup.players.length-pc;
    const teams=setup.mode==='teams'?[...new Set(setup.players.map(player=>player.teamId))].length:setup.players.length;
    this.ui.setupSummary.textContent=`${setup.mode.toUpperCase()} - ${setup.players.length} players - ${pc} PC / ${cpu} CPU - ${teams} ${setup.mode==='teams'?'teams':'factions'}.`;
  }
  setupPlayerRowHtml(player,index,setup){
    const isCpu=player.control!=='local';
    const teamOptions=Array.from({length:Math.min(4,setup.players.length)},(_,i)=>`team-${i+1}`);
    const profiles=this.data.aiProfiles||[];
    const selectedProfile=player.personalityId||player.aiArchetype||'random';
    const profile=profiles.find(candidate=>candidate.id===selectedProfile);
    const fallbackName=['Amber Company','White Raven','Iron Oath','Green Lantern','Blue Banner','Red Sash','Silver Hand','Black Tower'][index]||`Guild ${index+1}`;
    const name=player.name||(isCpu&&profile?.defaultName?profile.defaultName:fallbackName);
    return `<article class="setup-player-row">
      <strong>P${index+1}</strong>
      <input data-setup-field="name" data-player-index="${index}" value="${this.escapeAttr(name)}" maxlength="28" aria-label="Player ${index+1} guild name">
      <select data-setup-field="control" data-player-index="${index}" aria-label="Player ${index+1} control">
        <option value="local" ${player.control==='local'?'selected':''}>PC</option>
        <option value="ai" ${isCpu?'selected':''}>CPU</option>
      </select>
      <select data-setup-field="teamId" data-player-index="${index}" ${setup.mode==='ffa'?'disabled':''} aria-label="Player ${index+1} team">
        ${teamOptions.map(team=>`<option value="${team}" ${player.teamId===team?'selected':''}>${team.replace('team-','Team ')}</option>`).join('')}
      </select>
      <select data-setup-field="difficulty" data-player-index="${index}" ${isCpu?'':'disabled'} aria-label="Player ${index+1} CPU difficulty">
        ${['easy','normal','hard'].map(value=>`<option value="${value}" ${player.difficulty===value?'selected':''}>${value[0].toUpperCase()+value.slice(1)}</option>`).join('')}
      </select>
      <select data-setup-field="personalityId" data-player-index="${index}" ${isCpu?'':'disabled'} aria-label="Player ${index+1} CPU profile">
        <option value="random" ${selectedProfile==='random'?'selected':''}>Random</option>
        ${profiles.map(profile=>`<option value="${this.escapeAttr(profile.id)}" ${selectedProfile===profile.id?'selected':''}>${this.escapeHtml(profile.label)}</option>`).join('')}
      </select>
    </article>`;
  }
  toggleEntryPanel(panel,flip=true){
    const showSetup=panel==='setup'&&(flip?this.ui.gameSetupPanel.classList.contains('closed'):true);
    const showSettings=panel==='settings'&&(flip?this.ui.settingsPanel.classList.contains('closed'):true);
    const showGlossary=panel==='glossary'&&(flip?this.ui.glossaryPanel.classList.contains('closed'):true);
    this.ui.gameSetupPanel?.classList.toggle('closed',!showSetup);
    this.ui.settingsPanel?.classList.toggle('closed',!showSettings);
    this.ui.glossaryPanel?.classList.toggle('closed',!showGlossary);
  }
  showEntryNote(text){if(this.ui.entryNote)this.ui.entryNote.textContent=text;}
  hasStorage(){try{return typeof localStorage!=='undefined';}catch{return false;}}
  readSave(){
    if(!this.hasStorage())return null;
    try{return JSON.parse(localStorage.getItem(SAVE_KEY)||'null');}
    catch{return null;}
  }
  updateSaveUi(){
    const save=this.readSave();
    if(!this.ui.loadGame)return;
    this.ui.loadGame.textContent=save?.state?`Load Game`: 'Load Game';
  }
  saveTimeLabel(value){
    if(!value)return 'recently';
    const date=new Date(value);
    return Number.isNaN(date.getTime())?'recently':date.toLocaleString();
  }
  serializableState(){
    const state=structuredClone(this.state);
    if(this.state.pendingTraitChoice){
      const choice=this.state.pendingTraitChoice;
      state.pendingTraitChoice={guildId:choice.guild?.id||null,workerId:choice.worker?.id||null,facilityKey:choice.facility?.key||null,trait:choice.trait};
    }
    return state;
  }
  saveGame({silent=false}={}){
    if(!this.hasStorage()){this.showEntryNote('Save failed: browser storage is unavailable.');return false;}
    if(this.state.phase==='aiTurn'){this.log(null,'bad','Save skipped while AI turns are resolving.');this.render();return false;}
    const payload={version:1,savedAt:new Date().toISOString(),pendingGuildName:this.cleanGuildName(this.humanGuild()?.name||this.pendingGuildName),aiTurnDelayMs:this.data.contractParts.settings.aiTurnDelayMs,state:this.serializableState()};
    try{
      localStorage.setItem(SAVE_KEY,JSON.stringify(payload));
      this.pendingGuildName=payload.pendingGuildName;
      if(!silent)this.log(null,'game',`Game saved: ${payload.pendingGuildName}, Year ${this.state.year} - ${this.currentSeason()}.`);
      this.updateSaveUi();
      if(!silent)this.render();
      return true;
    }catch{
      if(!silent){this.log(null,'bad','Save failed: browser storage rejected the save file.');this.render();}
      return false;
    }
  }
  loadGame(){
    const save=this.readSave();
    if(!save?.state){this.showEntryNote('No saved game found in this browser.');this.updateSaveUi();return false;}
    this.state=save.state;
    this.data.contractParts.settings.aiTurnDelayMs=Number(save.aiTurnDelayMs)||this.data.contractParts.settings.aiTurnDelayMs;
    this.pendingGuildName=this.cleanGuildName(save.pendingGuildName||this.humanGuild()?.name);
    this.rehydrateLoadedState();
    this.log(null,'game',`Loaded saved game: ${this.pendingGuildName}, Year ${this.state.year} - ${this.currentSeason()}.`);
    if(this.ui.guildName)this.ui.guildName.value=this.pendingGuildName;
    if(this.ui.aiPace)this.ui.aiPace.value=String(this.data.contractParts.settings.aiTurnDelayMs);
    this.closeEntryScreen();
    this.closeTavern();
    this.closeCharacterPanel();
    this.render();
    if(this.state.pendingTraitChoice)this.openTraitChoice(this.state.pendingTraitChoice);
    else if(this.state.phase==='seasonComplete')this.openSeasonRecap();
    return true;
  }
  rehydrateLoadedState(){
    for(const guild of this.state.guilds||[]){
      guild.control=guild.control||(guild.human?'local':'ai');
      guild.human=this.isLocalGuild(guild);
    }
    const choice=this.state.pendingTraitChoice;
    if(choice?.workerId){
      const guild=this.state.guilds.find(g=>g.id===choice.guildId);
      const worker=guild?.roster.find(c=>c.id===choice.workerId);
      const facility=this.facilityDef(choice.facilityKey);
      this.state.pendingTraitChoice=guild&&worker&&facility&&choice.trait?{guild,worker,facility,trait:choice.trait}:null;
    }
    if(this.state.phase==='aiTurn'){
      this.state.phase='awaitHuman';
      this.state.activeGuildId=this.activeLocalGuild()?.id||this.humanGuild()?.id||null;
      this.state.humanActionUsed=false;
      this.log(null,'game','Loaded during an AI turn; returned control to the player.');
    }
    if(this.state.focusContractId&&!this.state.boardContracts?.some(c=>c.instanceId===this.state.focusContractId))this.state.focusContractId=null;
    if(this.state.focusFacilityKey&&!this.facilityDef(this.state.focusFacilityKey))this.state.focusFacilityKey=null;
    for(const guild of this.state.guilds||[]){
      guild.facilityReadiness=guild.facilityReadiness||{};
      guild.patronFavor=guild.patronFavor||{};
    }
    this.state.aiActivity=this.state.aiActivity||[];
    this.state.localTurnIndex=this.state.localTurnIndex||0;
    this.state.openingSplashUntil=0;
    this.state.pendingContractResponses=this.state.pendingContractResponses||[];
    this.state.pendingClaimForceResponses=this.state.pendingClaimForceResponses||[];
    this.state.resolvingContractResponses=false;
  }
  renderGlossary(){
    if(!this.ui.glossaryBody)return;
    const settings=this.data.contractParts.settings;
    const goals=this.victoryGoals();
    const facilities=this.data.contractParts.facilities.map(f=>`<li><strong>${this.escapeHtml(f.label)}</strong><span>${this.escapeHtml(this.facilityPatronPathSummary(f))}</span></li>`).join('');
    const pools=this.data.contractParts.world.pools.map(p=>`<li><strong>${this.escapeHtml(p.key)}</strong><span>${this.escapeHtml((p.types||[]).slice(0,4).join(', '))}</span></li>`).join('');
    this.ui.glossaryBody.innerHTML=`<section><h3>Core Rules</h3><p><strong>Victory lanes</strong>: win early by reaching Gold ${goals.gold}, Rep ${goals.reputation}, Done ${goals.completed}, Res ${goals.resources}, or Conn ${goals.connections}.</p><p><strong>Contracts</strong> have ${this.contractSharedSlotLimit()} shared mercenary slots. The first guild to place claims the work; later guilds cooperate by dropping on open slots or compete by dropping on occupied rival slots. Cooperative claims use shared odds. Reward shares scale by guild count: ${Math.round((settings.cooperativeClaimantDuelShare??0.7)*100)}/30 for two guilds, about 50/25/25 for three, and about 33/22/22/22 for four. Multi-season contracts resolve at season end and keep workers committed until finished.</p><p><strong>Readiness</strong> is explicit setup. Focus a contract, then send fitting workers to Scout Lodge for Scouted +5% per season, max +20%, or Archives for one-time Planned +10%. Focus a facility, then send fitting workers to Archives for a one-use Planned +10% training roll there. No focus means Archives planning creates no Planned bonus.</p><p><strong>Traits</strong> are the engine. Profession tags give about ${settings.requirementWeights[0]}% when demanded; support tags give about ${settings.supportWeights[0]}%.</p><p><strong>Hiring</strong> is limited to one paid tavern recruit per guild each season. Founders ignore reputation gates. Professionals require 10 reputation, gentry require 25, and nobles require 50.</p><p><strong>Resources</strong> are guild capacity. Contracts check them for odds, but do not spend them. <strong>Connections</strong> give +2% odds each on every contract.</p></section><section><h3>Facilities</h3><ul>${facilities}</ul></section><section><h3>Contract Pools</h3><ul>${pools}</ul></section>`;
  }

  bindGlossaryClicks(){
    document.addEventListener('click',evt=>{
      const term=evt.target.closest?.('[data-glossary-term]');
      if(!term)return;
      evt.preventDefault();
      evt.stopPropagation();
      this.openGlossaryTerm(term.dataset.glossaryTerm,term.dataset.glossaryWeight);
    });
    document.addEventListener('keydown',evt=>{
      if(evt.key!=='Enter'&&evt.key!==' ')return;
      const term=evt.target.closest?.('[data-glossary-term]');
      if(!term)return;
      evt.preventDefault();
      this.openGlossaryTerm(term.dataset.glossaryTerm,term.dataset.glossaryWeight);
    });
  }

  closeTavern(){if(this.state.phase==='setup')return;this.state.tavernOpen=false;this.render();}
  closeCharacterPanel(){if(this.currentContractResponse()||this.currentClaimForceResponse())return;this.ui.characterPanel.classList.add('closed');}
  setDetailHeader(eyebrow,title,subtitle=''){
    this.ui.characterPanelEyebrow.textContent=eyebrow;
    this.ui.characterPanelTitle.textContent=title;
    this.ui.characterPanelSubtitle.textContent=subtitle;
    this.ui.characterPanelSubtitle.classList.toggle('closed',!subtitle);
  }
  openGlossaryTerm(term,weight=null){
    const key=String(term||'').trim();
    if(!key)return;
    const entry=this.glossaryEntry(key,weight);
    this.setDetailHeader(entry.eyebrow,entry.title,entry.subtitle);
    this.ui.characterPanelBody.innerHTML=`<article class="game-card glossary-entry"><ul>${entry.bullets.map(line=>`<li>${this.escapeHtml(line)}</li>`).join('')}</ul>${entry.rules.length?`<section class="engine-rules"><h4>Rules</h4>${entry.rules.map(rule=>`<div class="engine-rule"><strong>${this.escapeHtml(rule.label)}</strong><p>${this.escapeHtml(rule.text)}</p></div>`).join('')}</section>`:''}</article>`;
    this.ui.characterPanel.classList.remove('closed');
  }
  glossaryEntry(term,weight=null){
    const profession=this.data.characterParts.professions.find(p=>p.name===term);
    const condition=this.conditionDef(term);
    const status=this.data.statuses.find(s=>s.name===term||s.id===term);
    const facility=this.facilityDef(term)||this.data.contractParts.facilities.find(f=>f.label===term);
    const patron=this.patronByTerm(term);
    const twist=this.contractTwistByTerm(term);
    const risk=this.contractRiskByTerm(term);
    if(facility)return this.facilityGlossaryEntry(facility);
    if(patron)return this.patronGlossaryEntry(patron);
    if(twist)return this.twistGlossaryEntry(twist);
    if(risk)return this.riskGlossaryEntry(risk);
    if(condition)return this.conditionGlossaryEntry(condition);
    if(status)return this.statusGlossaryEntry(status);
    return this.traitGlossaryEntry(term,profession,weight);
  }
  contractTwistByTerm(term){
    const normalized=String(term||'').toLowerCase();
    return (this.data.contractParts.twists||[]).find(t=>t.key===normalized||t.label?.trim().toLowerCase()===normalized);
  }
  contractRiskByTerm(term){
    const normalized=String(term||'').toLowerCase();
    return ['low','moderate','dangerous','deadly','lethal'].includes(normalized)?normalized:null;
  }
  patronByTerm(term){
    const normalized=String(term||'').toLowerCase();
    return (this.data.contractParts.patrons||[]).find(patron=>patron.key===normalized||patron.name?.toLowerCase()===normalized||patron.path?.toLowerCase()===normalized);
  }
  twistGlossaryEntry(twist){
    const label=twist.label?.trim()||'Routine';
    const failures=(twist.failure||[]).map(f=>`${this.failureResultLabel(f)} (${f.weight})`);
    const bullets=[
      `Contract prefix: changes the risk, difficulty, reward, and timing of a job.`,
      `Risk: ${twist.risk}.`,
      `Difficulty modifier: ${twist.difficulty>=0?'+':''}${twist.difficulty}%.`,
      `Work modifier: ${twist.work>=0?'+':''}${twist.work} season${Math.abs(twist.work)===1?'':'s'}.`,
      `Offer window modifier: ${twist.offer>=0?'+':''}${twist.offer} season${Math.abs(twist.offer)===1?'':'s'}.`,
      `Reward modifier: ${twist.gold>=0?'+':''}${twist.gold} gold, ${twist.rep>=0?'+':''}${twist.rep} reputation.`,
      failures.length?`Failure table: ${failures.join(', ')}.`:'No special failure table.'
    ];
    return {eyebrow:'Contract Prefix',title:label,subtitle:'Work tag',bullets,rules:[]};
  }
  riskGlossaryEntry(risk){
    const text={
      low:'Low risk failures usually cost time, reputation, resources, or morale.',
      moderate:'Moderate risk can punish failed work and often pays better.',
      dangerous:'Dangerous work can injure or kill assigned mercs.',
      deadly:'Deadly contracts are late-game threats with severe failure outcomes.',
      lethal:'Lethal contracts can decide a campaign and can destroy a weak retinue.'
    };
    const matching=(this.data.contractParts.twists||[]).filter(t=>t.risk===risk).map(t=>t.label?.trim()||'Routine');
    return {eyebrow:'Risk',title:risk[0].toUpperCase()+risk.slice(1),subtitle:'Contract difficulty band',bullets:[text[risk]||'Risk controls the failure table and reward scale.',matching.length?`Common prefixes: ${this.formatList(matching)}.`:'No prefix currently uses this risk band.','Higher risk generally means stronger rewards and harsher failures.'],rules:[]};
  }
  patronGlossaryEntry(patron){
    const facility=this.facilityDef(patron.facility);
    const thresholds=this.patronFavorThresholds();
    const local=this.activeLocalGuild?.();
    const favor=local?this.patronFavor(local,patron.key):0;
    const bullets=[
      `Support trait: ${patron.trait}.`,
      `Facility path: ${facility?.label||patron.facility} - ${patron.path}.`,
      `Victory lane: ${this.victoryLaneLabel(patron.lane)}.`,
      `Current favor: ${favor}.`,
      `Contract modifier: ${patron.difficulty>=0?'+':''}${patron.difficulty}% difficulty, ${patron.gold>=0?'+':''}${patron.gold} gold, ${patron.rep>=0?'+':''}${patron.rep} reputation.`,
      `Favor ${thresholds.ready}: grants annual Ready marks to ${facility?.label||patron.facility}.`,
      `Favor ${thresholds.training}: improves training rolls.`,
      this.patronProductionUnlockText(patron),
      `Favor ${thresholds.slot}: adds one facility slot.`,
      `Favor ${thresholds.ally}: becomes an ally contact and grants a Connection.`
    ];
    return {eyebrow:'Patron',title:patron.name,subtitle:patron.path,bullets,rules:[]};
  }
  traitGlossaryEntry(term,profession=null,weight=null){
    const affinity=this.data.characterParts.tagAffinities?.[term];
    const effects=this.data.characterParts.traitEffects?.[term]||[];
    const primary=[...new Set(this.data.contracts.filter(c=>c.requirements.some(r=>r.trait===term)).slice(0,5).map(c=>c.type))];
    const support=[...new Set(this.data.contracts.filter(c=>c.support.some(r=>r.trait===term)).slice(0,5).map(c=>c.type))];
    const bullets=[];
    if(profession)bullets.push(`Profession: starts around ${this.getStatus(profession.status).name} status, ${profession.resources} resources, and ${profession.connections} connections before variance.`);
    else bullets.push('Trait: improves contract fit when a job needs or helps with this tag.');
    if(weight!==null&&weight!=='')bullets.push(`This contract: +${Number(weight)}% success chance for each assigned merc with this tag.`);
    if(affinity)bullets.push(`Broad fit: +${affinity.bonus||5}% on ${this.formatList(affinity.domains||[])} contracts.`);
    if(primary.length)bullets.push(`Often needed by: ${this.formatList(primary)}.`);
    if(support.length)bullets.push(`Often helps with: ${this.formatList(support)}.`);
    if(!effects.length)bullets.push('No special engine rule beyond contract fit is currently defined.');
    return {eyebrow:profession?'Profession':'Trait',title:term,subtitle:profession?'Also acts as a trait tag':'',bullets,rules:effects.map(effect=>({label:this.effectTriggerLabel(effect),text:this.effectRuleText(effect)}))};
  }
  conditionGlossaryEntry(condition){
    const duration=condition.duration===null?'Permanent':`${condition.duration} season${condition.duration===1?'':'s'} base duration`;
    const bullets=[
      condition.description||'Condition applied by contract events.',
      condition.penalty?`Contract work penalty: -${condition.penalty}% success chance.`:'No direct contract success penalty.',
      `Duration: ${duration}.`,
      condition.recoveryPerRest?`Rest recovery: clears ${condition.recoveryPerRest} step per rest season.`:'Rest does not clear this condition.'
    ];
    return {eyebrow:'Condition',title:condition.key,subtitle:condition.kind,bullets,rules:[]};
  }
  statusGlossaryEntry(status){
    return {eyebrow:'Status',title:status.name,subtitle:'Recruiting tier',bullets:[`Recruit cost: ${status.recruitCost} gold before trait costs.`,`Annual salary: ${status.salary} gold before trait costs.`,`Reputation gate: ${status.reputationRequired||0}.`],rules:[]};
  }
  facilityGlossaryEntry(facility){
    const setup=this.facilityReadinessRuleLines(facility);
    const production=this.facilityProductionGlossaryLines(facility);
    const support=this.facilityEffectGlossaryLines(facility);
    const bullets=[
      facility.description,
      `Identity: ${facility.identity}.`,
      `Slots: ${facility.slots}.`,
      `Training roll: ${facility.trainChance}% before worker and facility support.`,
      `Trains: ${this.formatList(facility.traits||[])}.`,
      facility.rareTraits?.length?`Rare training pool: ${this.formatList(facility.rareTraits)} (${Math.round((facility.rareChance??0.12)*100)}% pool chance).`:'No rare training pool.',
      `Patron paths: ${this.facilityPatronPathSummary(facility)}.`,
      `Favor thresholds: 2 annual Ready, 4 improved training and Ready production, 6 one extra slot, 8 patron ally contact. Resource and Connection patron production also needs concurrent supporting facility work unless the patron is already an ally.`,
      ...setup,
      ...production,
      ...support
    ].filter(Boolean);
    return {eyebrow:'Facility',title:facility.label,subtitle:facility.identity,bullets,rules:[]};
  }
  facilityReadinessRuleLines(facility){
    const lines=[];
    if(facility.key==='scout')lines.push('Contract readiness: Scout-like workers here add Scouted marks to the focused contract.');
    if(facility.key==='archives')lines.push('Planning: Scholar-like workers here add Planned +10% only to the focused contract, or one-use Planned +10% training only to the focused facility. No focused target means no Planned bonus.');
    for(const rule of this.facilitySetupRules().filter(rule=>rule.facility===facility.key)){
      lines.push(`${this.formatList(rule.tags)} here readies the least-ready of ${this.formatList(rule.targets.map(key=>this.facilityDef(key)?.label||key))}.`);
    }
    return lines;
  }
  facilityProductionGlossaryLines(facility){
    const samples=(this.data.characterParts.professions||[])
      .map(profession=>({profession,rule:this.facilityProductionRule({archetype:profession.name,traits:[profession.name],conditions:[]},facility)}))
      .filter(row=>row.rule)
      .slice(0,5);
    if(!samples.length)return ['Ready production: no profession-specific Ready use currently defined.'];
    return [`Ready production examples: ${samples.map(({profession,rule})=>`${profession.name}: ${this.facilityProductionText(rule)}`).join('; ')}.`];
  }
  facilityEffectGlossaryLines(facility){
    const rules=Object.entries(this.data.characterParts.traitEffects||{}).flatMap(([trait,effects])=>effects.filter(effect=>(effect.facilities||[]).includes(facility.key)||(effect.targetFacilities||[]).includes(facility.key)).map(effect=>`${trait}: ${this.effectRuleText(effect)}`));
    return rules.length?[`Trait effects touching this facility: ${rules.slice(0,4).join(' | ')}${rules.length>4?' | ...':''}`]:[];
  }
  facilityPatronPathSummary(facility){
    const paths=this.facilityPatrons(facility.key).map(patron=>`${patron.name}: ${patron.path} (${this.victoryLaneLabel(patron.lane)})`);
    return paths.length?paths.join(' | '):'No patron path assigned.';
  }
  termLink(term,className=''){
    return `<button class="glossary-term ${className}" type="button" data-glossary-term="${this.escapeAttr(term)}">${this.escapeHtml(term)}</button>`;
  }
  openCharacterPanel(characterId){
    const found=this.findCharacter(characterId);
    if(!found)return;
    const {guild,character}=found;
    this.state.selectedCharacterId=character.id;
    this.setDetailHeader('Mercenary',character.name);
    this.ui.characterPanelBody.innerHTML=this.characterCard(character,{showHistory:true,showAllTraits:true,guild});
    this.ui.characterPanel.classList.remove('closed');
  }
  openGuildPanel(guildId){
    const guild=this.state.guilds.find(g=>g.id===guildId);
    if(!guild)return;
    this.setDetailHeader('Guild',guild.name);
    this.ui.characterPanelBody.innerHTML=this.guildInspectionHtml(guild);
    this.ui.characterPanel.classList.remove('closed');
  }
  openContractPanel(contractId){
    const contract=this.state.boardContracts.find(c=>c.instanceId===contractId);
    const guild=this.activeLocalGuild();
    if(!contract||!guild)return;
    const heading=this.contractHeaderParts(contract);
    this.setDetailHeader(heading.prefix,heading.title,heading.patron);
    this.ui.characterPanelEyebrow.innerHTML=this.termLink(heading.prefix,'modal-term-link');
    this.ui.characterPanelBody.innerHTML=this.contractInspectionHtml(contract,guild);
    this.ui.characterPanel.classList.remove('closed');
  }
  contractResponseById(responseId){
    const response=(this.state.pendingContractResponses||[]).find(row=>row.id===responseId);
    if(!response)return null;
    const contract=this.state.boardContracts.find(c=>c.instanceId===response.contractId);
    const claimant=this.state.guilds.find(g=>g.id===response.claimantId);
    const intruder=this.state.guilds.find(g=>g.id===response.intruderId);
    return contract&&claimant&&intruder?{...response,contract,claimant,intruder}:null;
  }
  currentContractResponse(){
    return this.contractResponseById((this.state.pendingContractResponses||[])[0]?.id);
  }
  claimForceResponseById(responseId){
    const response=(this.state.pendingClaimForceResponses||[]).find(row=>row.id===responseId);
    if(!response)return null;
    const contract=this.state.boardContracts.find(c=>c.instanceId===response.contractId);
    const claimant=this.state.guilds.find(g=>g.id===response.claimantId);
    const intruder=this.state.guilds.find(g=>g.id===response.intruderId);
    return contract&&claimant&&intruder?{...response,contract,claimant,intruder}:null;
  }
  currentClaimForceResponse(){
    return this.claimForceResponseById((this.state.pendingClaimForceResponses||[])[0]?.id);
  }
  openNextContractResponse(){
    let response=this.currentContractResponse();
    while(!response&&(this.state.pendingContractResponses||[]).length){
      this.state.pendingContractResponses.shift();
      response=this.currentContractResponse();
    }
    if(!response)return false;
    if(this.isAiGuild(response.claimant)){
      this.resolveContractResponse(response.id,this.aiContractResponseDecision(response.claimant,response.intruder,response.contract),{continueSeason:false});
      return this.openNextContractResponse();
    }
    if(typeof document==='undefined'||!this.ui.characterPanel){
      this.resolveContractResponse(response.id,'allow',{continueSeason:false});
      return this.openNextContractResponse();
    }
    this.openContractResponse(response.id);
    return true;
  }
  openNextClaimForceResponse(){
    let response=this.currentClaimForceResponse();
    while(!response&&(this.state.pendingClaimForceResponses||[]).length){
      this.state.pendingClaimForceResponses.shift();
      response=this.currentClaimForceResponse();
    }
    if(!response)return false;
    if(this.isAiGuild(response.intruder)){
      this.resolveClaimForceResponse(response.id,this.aiClaimForceDecision(response.claimant,response.intruder,response.contract),{continueSeason:false});
      return this.openNextClaimForceResponse();
    }
    if(typeof document==='undefined'||!this.ui.characterPanel){
      this.resolveClaimForceResponse(response.id,'force',{continueSeason:false});
      return this.openNextClaimForceResponse();
    }
    this.openClaimForceResponse(response.id);
    return true;
  }
  openContractResponse(responseId){
    const response=this.contractResponseById(responseId);
    if(!response||!this.ui.characterPanel)return false;
    this.setDetailHeader('Claim Response',response.contract.title,response.intruder.name);
    this.ui.characterPanelBody.innerHTML=this.contractResponseHtml(response);
    this.ui.characterPanel.classList.remove('closed');
    return true;
  }
  contractResponseHtml(response){
    const team=this.placedTeam(response.intruder,response.contract);
    const teamText=team.map(worker=>worker.name).join(', ')||'a rival team';
    const projected=[...new Set([...this.contractParticipantGuilds(response.contract),response.claimant,response.intruder])];
    const claimantShare=Math.round(this.cooperativeRewardShareForGuild(response.contract,response.claimant,response.claimant,projected)*100);
    const mercs=team.length?`<div class="response-merc-list">${team.map(worker=>`<button class="response-merc-link" type="button" data-response-id="${this.escapeAttr(response.id)}" data-contract-response-merc="${this.escapeAttr(worker.id)}"><strong>${this.escapeHtml(worker.name)}</strong><span>${this.escapeHtml(worker.archetype)} - ${this.escapeHtml(this.traitPreviewText(worker))}</span></button>`).join('')}</div>`:'<p class="empty">No collaborator is currently assigned.</p>';
    return `<article class="game-card contract-response-card"><p class="history">${this.escapeHtml(response.intruder.name)} has moved onto ${this.escapeHtml(response.claimant.name)}'s claimed contract with ${this.escapeHtml(teamText)}.</p><section class="response-collaborators"><h4>Offered collaborator</h4>${mercs}</section><p class="history">Allowing cooperation keeps shared project odds. With the current guild count, ${this.escapeHtml(response.claimant.name)} expects about ${claimantShare}% of the reward. Contesting turns their placement into a race for primary credit.</p>${this.contractResponseActionsHtml(response.id)}</article>`;
  }
  contractResponseActionsHtml(responseId){
    return `<div class="trait-choice-grid"><div class="trait-choice" role="button" tabindex="0" data-response-id="${this.escapeAttr(responseId)}" data-contract-response="allow">Allow cooperation</div><div class="trait-choice danger-choice" role="button" tabindex="0" data-response-id="${this.escapeAttr(responseId)}" data-contract-response="contest">Reject cooperation</div></div>`;
  }
  openClaimForceResponse(responseId){
    const response=this.claimForceResponseById(responseId);
    if(!response||!this.ui.characterPanel)return false;
    this.setDetailHeader('Claim Rejected',response.contract.title,response.claimant.name);
    const team=this.placedTeam(response.intruder,response.contract);
    const cost=this.competitionReputationCost(response.intruder,response.contract,response.claimant,team);
    const names=team.map(worker=>worker.name).join(', ')||'your offered team';
    this.ui.characterPanelBody.innerHTML=`<article class="game-card contract-response-card"><p class="history">${this.escapeHtml(response.claimant.name)} rejected ${this.escapeHtml(response.intruder.name)}'s cooperation offer on "${this.escapeHtml(response.contract.title)}".</p><p class="history">Force the claim to turn ${this.escapeHtml(names)} into competitors for primary credit${cost?` at ${cost} reputation cost`:''}, or withdraw them from the contract.</p><div class="trait-choice-grid"><div class="trait-choice danger-choice" role="button" tabindex="0" data-response-id="${this.escapeAttr(response.id)}" data-claim-force-response="force">Force the claim</div><div class="trait-choice keep" role="button" tabindex="0" data-response-id="${this.escapeAttr(response.id)}" data-claim-force-response="withdraw">Withdraw offer</div></div></article>`;
    this.ui.characterPanel.classList.remove('closed');
    return true;
  }
  openContractResponseMerc(responseId,characterId){
    const response=this.contractResponseById(responseId);
    if(!response||!this.ui.characterPanel)return false;
    const found=this.findCharacter(characterId);
    if(!found||found.guild.id!==response.intruder.id||found.character.placement?.id!==response.contract.instanceId)return false;
    this.setDetailHeader('Collaborator Offer',found.character.name,response.intruder.name);
    this.ui.characterPanelBody.innerHTML=`${this.characterCard(found.character,{showHistory:true,showAllTraits:true,guild:found.guild,allowDismissal:false})}<article class="game-card contract-response-card"><button class="trait-choice keep response-back" type="button" data-open-contract-response="${this.escapeAttr(response.id)}">Back to claim response</button>${this.contractResponseActionsHtml(response.id)}</article>`;
    this.ui.characterPanel.classList.remove('closed');
    return true;
  }
  aiClaimForceDecision(claimant,intruder,contract){
    const team=this.placedTeam(intruder,contract);
    const cost=this.competitionReputationCost(intruder,contract,claimant,team);
    if(!team.length||intruder.reputation<cost)return 'withdraw';
    const chance=this.successChanceForTeam(intruder,contract,team);
    const mode=this.aiStrategicMode(intruder);
    const contestValue=this.aiContractValue(intruder,contract,chance,team,team.length)+this.contestTraitScore(intruder,contract)+(mode.behind?12:0)+(mode.desperate?18:0)-cost*8;
    const withdrawValue=(mode.rebuilding?10:0)+(chance<this.aiFallbackChance(intruder)?14:0);
    return contestValue>withdrawValue?'force':'withdraw';
  }
  aiContractResponseDecision(claimant,intruder,contract){
    if(this.cooperationForcedBy(contract,claimant,intruder))return 'allow';
    const claimantTeam=this.placedTeam(claimant,contract);
    const intruderTeam=this.placedTeam(intruder,contract);
    const sharedChance=this.cooperativeSuccessChance(contract,claimant,this.contractParticipantGuilds(contract))||0;
    const claimantChance=this.successChanceForTeam(claimant,contract,claimantTeam);
    const claimantControl=this.contractTeamTraitEffects(claimant,contract,'contractClaim').reduce((sum,effect)=>sum+(effect.type==='blockCompetition'?16:effect.type==='competitionCost'?(effect.amount||0)*5:effect.type==='forceCooperation'?-12:0),0);
    const intruderThreat=this.contractContributionScore(intruder,contract)+this.contestTraitScore(intruder,contract);
    const claimantContest=this.contractContributionScore(claimant,contract)+this.contestTraitScore(claimant,contract)+10+claimantControl;
    const mode=this.aiStrategicMode(claimant);
    const claimantShare=this.cooperativeRewardShareForGuild(contract,claimant,claimant,this.contractParticipantGuilds(contract));
    const allowValue=sharedChance+(contract.reward.gold||0)*0.04*claimantShare+(contract.reward.reputation||0)*1.6*claimantShare+(mode.rebuilding?8:0);
    const contestValue=claimantChance+(claimantContest-intruderThreat)*0.35+(contract.reward.reputation||0)*3+(mode.behind?14:0)+(mode.desperate?18:0);
    return contestValue>allowValue+8?'contest':'allow';
  }
  resolveContractResponse(responseId,decision,{continueSeason=true}={}){
    const responses=this.state.pendingContractResponses||[];
    const index=responses.findIndex(response=>response.id===responseId);
    if(index<0)return false;
    const [response]=responses.splice(index,1);
    const contract=this.state.boardContracts.find(c=>c.instanceId===response.contractId);
    const claimant=this.state.guilds.find(g=>g.id===response.claimantId);
    const intruder=this.state.guilds.find(g=>g.id===response.intruderId);
    if(contract&&claimant&&intruder){
      contract.claim=contract.claim||{guildId:claimant.id,postures:{}};
      contract.claim.postures=contract.claim.postures||{};
      if(decision==='contest'){
        contract.claim.postures[intruder.id]='rejected';
        this.enqueueClaimForceResponse(contract,claimant,intruder);
        this.log(claimant,'contract',`${claimant.name} rejected ${intruder.name}'s cooperation offer on "${contract.title}".`);
      }else{
        contract.claim.postures[intruder.id]='cooperate';
        this.log(claimant,'contract',`${claimant.name} allowed ${intruder.name} to cooperate on "${contract.title}".`);
      }
    }
    this.state.pendingContractResponses=responses;
    this.closeCharacterPanelAfterResponse();
    if(this.state.resolvingContractResponses&&continueSeason)this.finishSeasonAfterContractResponses();
    else if(this.openNextContractResponse()||this.openNextClaimForceResponse())this.render();
    else this.render();
    return true;
  }
  enqueueClaimForceResponse(contract,claimant,intruder){
    if(!contract||!claimant||!intruder||claimant.id===intruder.id)return false;
    this.state.pendingClaimForceResponses=this.state.pendingClaimForceResponses||[];
    const id=`${contract.instanceId}:${claimant.id}:${intruder.id}:force`;
    if(this.state.pendingClaimForceResponses.some(response=>response.id===id))return false;
    this.state.pendingClaimForceResponses.push({id,contractId:contract.instanceId,claimantId:claimant.id,intruderId:intruder.id});
    if(!this.state.resolvingContractResponses&&(this.isLocalGuild(intruder)||this.isAiGuild(intruder)))this.openNextClaimForceResponse();
    return true;
  }
  resolveClaimForceResponse(responseId,decision,{continueSeason=true}={}){
    const responses=this.state.pendingClaimForceResponses||[];
    const index=responses.findIndex(response=>response.id===responseId);
    if(index<0)return false;
    const [response]=responses.splice(index,1);
    const contract=this.state.boardContracts.find(c=>c.instanceId===response.contractId);
    const claimant=this.state.guilds.find(g=>g.id===response.claimantId);
    const intruder=this.state.guilds.find(g=>g.id===response.intruderId);
    if(contract&&claimant&&intruder){
      contract.claim=contract.claim||{guildId:claimant.id,postures:{}};
      contract.claim.postures=contract.claim.postures||{};
      if(decision==='force'){
        const team=this.placedTeam(intruder,contract);
        const cost=this.competitionReputationCost(intruder,contract,claimant,team);
        intruder.reputation=Math.max(0,intruder.reputation-cost);
        contract.claim.postures[intruder.id]='compete';
        this.log(intruder,'contract',`${intruder.name} forced ${claimant.name}'s claim on "${contract.title}".${cost?` Reputation -${cost}.`:''}`);
      }else{
        for(const worker of [...this.placedTeam(intruder,contract)])this.unplaceWorker(worker,intruder,true);
        delete contract.claim?.postures?.[intruder.id];
        this.syncContractClaim(contract);
        this.log(intruder,'contract',`${intruder.name} withdrew from "${contract.title}" after ${claimant.name} rejected cooperation.`);
      }
    }
    this.state.pendingClaimForceResponses=responses;
    this.closeCharacterPanelAfterResponse();
    if(this.state.resolvingContractResponses&&continueSeason)this.finishSeasonAfterContractResponses();
    else if(this.openNextContractResponse()||this.openNextClaimForceResponse())this.render();
    else this.render();
    return true;
  }
  closeCharacterPanelAfterResponse(){this.ui.characterPanel?.classList.add('closed');}
  openSeasonRecap(){
    if(!this.ui.characterPanel||this.state.phase!=='seasonComplete')return;
    const entries=this.state.log.filter(entry=>entry.year===this.state.year&&entry.season===this.currentSeason()).slice(0,16);
    const human=this.activeLocalGuild();
    const engineSummary=this.activeWorkers(human).map(c=>this.workerEngineSummary(c)).filter(Boolean).slice(0,4).map(text=>`<span>${this.escapeHtml(text)}</span>`).join('');
    this.setDetailHeader('Season Recap',`${this.currentSeason()} Recap`);
    this.ui.characterPanelBody.innerHTML=`<article class="game-card recap-card"><p class="history">${human.name} is reading as <strong>${this.guildIdentity(human).label}</strong>.</p>${engineSummary?`<div class="recap-pills">${engineSummary}</div>`:''}<div class="recap-list">${entries.map(entry=>`<p class="recap-line ${entry.type}"><span>${entry.guildId?this.guildName(entry.guildId):'World'}</span>${this.escapeHtml(entry.summary)}</p>`).join('')||'<p class="empty">Nothing notable happened.</p>'}</div></article>`;
    this.ui.characterPanel.classList.remove('closed');
  }
  openTraitChoice(choice){
    const worker=choice.worker;
    this.setDetailHeader('Training',`Train ${worker.name}`);
    const removable=worker.traits.filter(t=>t!==worker.archetype);
    this.ui.characterPanelBody.innerHTML=`<p class="history">${worker.name} can learn ${choice.trait}, but already has ${this.maxTraits()} tags. Replace one trait or keep the current build.</p><div class="trait-choice-grid">${removable.map(t=>`<div class="trait-choice" role="button" tabindex="0" data-replace-trait="${t}">Replace ${t}</div>`).join('')}<div class="trait-choice keep" role="button" tabindex="0" data-replace-trait="">Keep current traits</div></div>`;
    this.ui.characterPanel.classList.remove('closed');
  }
  resolveTraitChoice(oldTrait){
    const choice=this.state.pendingTraitChoice;
    if(!choice)return;
    const worker=choice.worker;
    if(oldTrait){
      this.replaceTrait(worker,oldTrait,choice.trait);
      worker.history.push(`Year ${this.state.year}: replaced ${oldTrait} with ${choice.trait} at the ${choice.facility.label}.`);
      this.log(choice.guild,'good',`${worker.name} replaced ${oldTrait} with ${choice.trait}.`);
    }else{
      worker.history.push(`Year ${this.state.year}: declined ${choice.trait} training at the ${choice.facility.label}.`);
      this.log(choice.guild,'train',`${worker.name} kept their current traits instead of learning ${choice.trait}.`);
    }
    this.state.pendingTraitChoice=null;
    this.closeCharacterPanel();
    this.render();
    if(this.state.phase==='seasonComplete')this.openSeasonRecap();
  }

  advance() {
    if(this.state.phase==='setup') return;
    if(this.state.phase==='awaitHuman') {
      const guild=this.activeLocalGuild();
      return this.finishHumanAction('season',this.resolveHumanPlacements(guild),guild);
    }
    if(this.state.phase==='seasonComplete') return this.nextSeason();
    if(this.state.phase==='gameOver') return;
  }

  draftFounder(characterId,evt=null) {
    if(this.state.phase!=='setup') return;
    if(this.menuOpen)return false;
    if(evt&&this._humanDraftClickReadyAt&&performance.now()<this._humanDraftClickReadyAt)return false;
    const human=this.currentSetupGuild();
    if(!this.isLocalGuild(human))return false;
    const pick=this.state.tavern.find(c=>c.id===characterId);
    if(!pick) return;
    this.draftFounderForGuild(human,pick);
    this.state.tavernHasNew=false;
    this.advanceSetupDraft();
  }

  draftFounderForGuild(guild,pick){
    if(!pick)return false;
    this.hire(guild,pick,true);
    this.revealAllTraits(pick,this.isLocalGuild(guild)?'as founder':'for AI planning');
    this.log(guild,'recruit',`${guild.name} drafted founder ${pick.name}.`);
    if(this.isAiGuild(guild))this.recordAiActivity(guild,'recruit',`Drafted ${pick.name}`,pick.archetype);
    if(this.isLocalGuild(guild))this.prepareInitialBoardForFounder(guild);
    return true;
  }
  advanceSetupDraft(){
    this.state.setupDraftIndex++;
    const next=this.currentSetupGuild();
    if(next){
      this.state.activeGuildId=next.id;
      this.state.tavernOpen=this.isLocalGuild(next);
      this.state.setupDraftPending=false;
      this.render();
      this.maybeContinueSetupDraft();
      return;
    }
    this.finishSetupDraft();
  }
  finishSetupDraft(){
    this.state.phase='seasonStart';
    this.state.activeGuildId=null;
    this.state.setupDraftPending=false;
    this.state.tavernOpen=false;
    this.startSeason();
  }
  maybeContinueSetupDraft(){
    if(this.menuOpen||this.state.phase!=='setup'||this.state.setupDraftPending)return;
    const guild=this.currentSetupGuild();
    if(!guild||this.isLocalGuild(guild))return;
    if(this.openingSplashActive()){this.scheduleOpeningSplashResume();return;}
    if(typeof window==='undefined'){this.aiDraftFounder(guild);return;}
    this.state.setupDraftPending=true;
    try{ this.showAiThinking(guild); }catch(e){}
    setTimeout(()=>this.aiDraftFounder(guild),this.aiTurnDelay());
  }
  async aiDraftFounder(guild){
    if(this.state.phase!=='setup'||this.currentSetupGuild()!==guild){try{ this.hideAiThinking(); }catch(e){};return;}
    if(!this.state.tavern.length)this.refillTavern();
    const pick=this.chooseRecruit(guild);
    if(pick)this.draftFounderForGuild(guild,pick);
    try{ this.hideAiThinking(); }catch(e){}
    this.advanceSetupDraft();
  }

  startSeason() {
    for(const guild of this.state.guilds)guild.hiredThisSeason=false;
    if(this.state.seasonIndex===0) this.startYear();
    if(this.state.startedSeasons>0) this.evolveWorld();
    this.revealRosterTraits();
    if(this.state.startedSeasons>0||!this.state.boardContracts.length)this.refreshContracts();
    this.refreshTavernMarket(this.state.startedSeasons===0);
    this.state.startedSeasons++;
    this.log(null,'season',`Year ${this.state.year}, ${this.currentSeason()} begins.`);
    this.state.localTurnIndex=0;
    this.advanceTurnCursor();
  }

  beginHumanTurn(guild=this.activeLocalGuild()){
    this.state.activeGuildId=guild?.id||null;
    this.state.phase='awaitHuman';
    this.state.humanActionUsed=false;
    this.render();
  }

  turnOrder(){return this.snakeGuildOrder();}
  advanceTurnCursor(){
    const order=this.turnOrder();
    const start=this.state.localTurnIndex||0;
    const aiBatch=[];
    let index=start;
    while(index<order.length&&this.isAiGuild(order[index])){
      aiBatch.push(order[index]);
      index++;
    }
    this.state.localTurnIndex=index;
    if(aiBatch.length){
      this.runAITurnSequence(aiBatch,()=>this.advanceTurnCursor());
      return;
    }
    const local=order[index];
    if(local&&this.isLocalGuild(local)){
      this.state.localTurnIndex=index+1;
      this.beginHumanTurn(local);
      return;
    }
    this.finishAITurns();
  }

  revealRosterTraits(){
    for(const guild of this.state.guilds){
      for(const c of guild.roster.filter(ch=>ch.revealAfterSeason))this.revealAllTraits(c,'after a season with the guild');
    }
  }

  startYear() {
    for(const guild of this.state.guilds) {
      if(this.state.year>1) this.paySalaries(guild);
      this.applyAnnualPatronReadiness(guild);
      if(this.activeWorkers(guild).length===0) {
        this.refillTavern();
        const pick=this.chooseRecruit(guild);
        if(pick){this.hire(guild,pick,true);this.log(guild,'recruit',`${guild.name} received a free recovery recruit: ${pick.name}.`);}
      }
    }
    if(this.state.year>1) this.evolveTavern();
  }

  paySalaries(guild) {
    const roster=[...guild.roster].filter(c=>c.alive);
    const due=roster.reduce((s,c)=>s+this.characterSalary(c),0);
    if(guild.gold>=due){guild.gold-=due;this.log(guild,'salary',`${guild.name} paid ${due} gold in salaries.`);return;}
    roster.sort((a,b)=>this.characterSalary(b)-this.characterSalary(a));
    for(const c of roster){const salary=this.characterSalary(c);if(guild.gold>=salary){guild.gold-=salary;}else{this.dismissUnpaid(guild,c);}}
  }

  dismissUnpaid(guild,c) {
    this.unplaceWorker(c,guild,true);
    this.removeMercCapacity(guild,c);
    guild.roster=guild.roster.filter(x=>x!==c); c.refusesGuildIds.push(guild.id); this.state.tavern.push(c); guild.reputation=Math.max(0,guild.reputation-2);
    this.log(guild,'bad',`${c.name} went unpaid, left ${guild.name}, and will never work for them again. Reputation -2.`);
  }
  addMercCapacity(guild,c) {
    guild.resources+=c.resources||0;
    guild.connections+=c.connections||0;
  }
  removeMercCapacity(guild,c) {
    guild.resources=Math.max(0,guild.resources-(c.resources||0));
    guild.connections=Math.max(0,guild.connections-(c.connections||0));
  }

  refillTavern(target=8){
    while(this.state.tavern.length<target){
      const template=this.pick(this.data.recruits);
      this.state.tavern.push(this.makeCharacter(template));
      this.state.tavernHasNew=true;
    }
  }
  seedOpeningFounderMarket(target=8){
    this.state.tavern=[];
    const professions=this.data.characterParts.professions||[];
    const byName=new Map(professions.map(profession=>[profession.name,profession]));
    const scores=new Map();
    const addScore=(name,weight)=>{if(byName.has(name))scores.set(name,(scores.get(name)||0)+weight);};
    for(const contract of this.state.boardContracts){
      for(const req of contract.requirements||[]) addScore(req.trait,10);
      for(const req of contract.support||[]) addScore(req.trait,3);
    }
    for(const pool of this.activeOpeningWorldPools()){
      for(const profession of professions){
        const affinity=this.data.characterParts.tagAffinities?.[profession.name];
        const domains=affinity?.domains||[];
        if(domains.includes(pool.key)||pool.types?.some(type=>domains.includes(type))||pool.traits?.includes(profession.name)){
          addScore(profession.name,5);
        }
      }
    }
    const picked=new Map();
    while(this.state.tavern.length<target&&scores.size){
      const name=this.weightedPick([...scores].map(([item,weight])=>({item,weight})));
      const profession=byName.get(name);
      if(!profession)break;
      this.state.tavern.push(this.makeCharacter(this.pick(this.data.recruits),profession));
      const count=(picked.get(name)||0)+1;
      picked.set(name,count);
      if(count>=2)scores.delete(name);
      else scores.set(name,Math.max(1,Math.round((scores.get(name)||1)*0.35)));
    }
    this.refillTavern(target);
  }
  activeOpeningWorldPools(){
    const pools=this.data.contractParts.world.pools||[];
    return pools.map(pool=>{
      let weight=0;
      for(const [key,direction] of Object.entries(pool.pressure||{})){
        const value=this.state.world.values[key]??50;
        if(direction==='low'&&value<45)weight+=45-value;
        if(direction==='high'&&value>55)weight+=value-55;
      }
      return {pool,weight};
    }).filter(row=>row.weight>0).sort((a,b)=>b.weight-a.weight).slice(0,3).map(row=>row.pool);
  }
  refreshTavernMarket(firstSeason=false){
    const settings=this.data.contractParts.settings;
    const min=settings.tavernMarketSize||6;
    const max=Math.max(min,settings.tavernMarketMax||8);
    const arrivals=firstSeason?0:(settings.tavernSeasonalArrivals||2);
    const keep=Math.max(0,max-arrivals);
    if(this.state.tavern.length>keep)this.state.tavern=this.state.tavern.slice(this.state.tavern.length-keep);
    const before=this.state.tavern.length;
    this.refillTavern(Math.min(max,Math.max(min,before+arrivals)));
    const added=this.state.tavern.length-before;
    if(added)this.log(null,'recruit',`${added} new recruit${added===1?'':'s'} arrived at the tavern.`);
  }

  evolveTavern(){
    const evolutions={Smith:'Seasoned',Scholar:'Learned',Soldier:'Battlewise',Hunter:'Watchful',Builder:'Practical',Merchant:'Connected',Healer:'Compassionate',Noble:'Influential',Rural:'Resourceful'};
    for(const c of this.state.tavern){const key=c.traits.find(t=>evolutions[t]);if(key&&c.traits.length<this.maxTraits()&&!c.traits.includes(evolutions[key])){c.traits.push(evolutions[key]);c.history.push(`Year ${this.state.year}: gained ${evolutions[key]} while living independently.`);}}
  }

  evolveWorld(){
    const world=this.state.world;
    const old={...world.values};
    for(const key of Object.keys(world.values)){
      const pull=50-world.values[key];
      world.values[key]=this.clamp(world.values[key]+Math.round(pull*0.08)+this.randomInt(-7,7),0,100);
    }
    const shocks=[
      {name:'a harsh winter',when:()=>this.currentSeason()==='Winter',effects:{food:-10,trade:-4,monsters:6}},
      {name:'raids along the border',when:()=>world.values.order<35||world.values.politics<35,effects:{military:8,order:-6,trade:-7}},
      {name:'a fervent revival',when:()=>world.values.faith>70,effects:{faith:6,order:3,politics:-3}},
      {name:'merchant confidence',when:()=>world.values.trade>70&&world.values.order>55,effects:{trade:6,food:3,politics:2}},
      {name:'beasts pressing the roads',when:()=>world.values.monsters>65,effects:{trade:-6,order:-5,military:4}}
    ].filter(s=>s.when());
    if(shocks.length&&Math.random()<0.55){
      const shock=this.pick(shocks);
      for(const [key,delta] of Object.entries(shock.effects)) world.values[key]=this.clamp(world.values[key]+delta,0,100);
      world.lastShift=`Rumors point to ${shock.name}.`;
    } else {
      world.lastShift='No single crisis dominates the season.';
    }
    world.trend=Object.fromEntries(Object.entries(world.values).map(([key,value])=>[key,value-old[key]]));
  }

  refreshContracts(){
    for(const c of this.state.boardContracts) c.offerSeasons=Math.max(0,c.offerSeasons-1);
    this.state.boardContracts=this.state.boardContracts.filter(c=>c.offerSeasons>0||this.hasContractPlacements(c));
    if(this.state.focusContractId&&!this.state.boardContracts.some(c=>c.instanceId===this.state.focusContractId))this.state.focusContractId=null;
    if(this.state.focusFacilityKey&&!this.facilityDef(this.state.focusFacilityKey))this.state.focusFacilityKey=null;
    const boardSize=this.boardSize();
    const active=this.state.boardContracts.filter(c=>this.hasContractPlacements(c));
    const idle=this.state.boardContracts.filter(c=>!this.hasContractPlacements(c));
    this.state.boardContracts=[...active,...this.shuffle(idle).slice(0,Math.max(0,boardSize-active.length))];
    this.fillContractBoard();
  }

  fillContractBoard(){
    while(this.state.boardContracts.length<this.boardSize()){
      if(!this.state.contractDeck.length)this.state.contractDeck=this.shuffle(this.data.contracts.map(c=>structuredClone(c)));
      const index=this.chooseBoardContractIndex();
      const base=this.state.contractDeck.splice(index,1)[0];
      this.prepareBoardContract(base);
      base.instanceId=`contract-${this.state.nextContractInstance++}`;
      base.placements={};
      base.readiness={};
      this.state.boardContracts.push(base);
    }
  }

  prepareBoardContract(contract,guild=this.humanGuild()){
    const settings=this.data.contractParts.settings;
    const human=guild;
    if(!human?.roster.length||this.state.year>settings.beginnerBoardYears)return;
    const team=this.chooseBestTeam(human,contract);
    const rawChance=this.rawSuccessChanceForTeam(human,contract,team);
    if(rawChance>=settings.beginnerMinChance)return;
    contract.baseDifficulty-=settings.beginnerMinChance-rawChance;
    contract.beginnerAdjusted=true;
    contract.description=`${contract.description} The terms are simple enough for a new guild.`;
  }
  prepareInitialBoardForFounder(guild=this.humanGuild()){
    if(this.state.year!==1||this.state.startedSeasons!==0)return;
    for(const contract of this.state.boardContracts){
      if(contract.setupPrepared)continue;
      this.prepareBoardContract(contract,guild);
      contract.setupPrepared=true;
    }
  }

  chooseBoardContractIndex(){
    const types=new Set(this.state.boardContracts.map(c=>c.type));
    const settings=this.data.contractParts.settings;
    const human=this.activeLocalGuild();
    const isBeginnerBoard=human?.roster.length&&this.state.year<=settings.beginnerBoardYears;
    const candidates=this.state.contractDeck.map((c,index)=>({c,index,hasFreshType:!types.has(c.type),chance:isBeginnerBoard?this.contractPreview(human,c).chance:0,weight:this.contractMarketWeight(c)}));
    if(isBeginnerBoard){
      const easy=candidates.filter(x=>x.chance>=settings.beginnerMinChance);
      if(easy.length)return this.weightedPick(easy.map(x=>({item:x.index,weight:x.weight+(x.hasFreshType?20:0)+x.chance/2})));
    }
    if(types.size<this.state.boardContracts.length){
      const fresh=candidates.filter(x=>x.hasFreshType);
      if(fresh.length)return this.weightedPick(fresh.map(x=>({item:x.index,weight:x.weight+15})));
    }
    return this.weightedPick(candidates.map(x=>({item:x.index,weight:x.weight})));
  }

  contractMarketWeight(contract){
    const pool=this.data.contractParts.world.pools.find(p=>p.key===contract.pool);
    let weight=10;
    if(!pool)return weight;
    for(const [key,direction] of Object.entries(pool.pressure||{})){
      const value=this.state.world.values[key]??50;
      if(direction==='low') weight+=value<45?32+(45-value)/2:Math.max(0,12-(value-45)/3);
      if(direction==='high') weight+=value>55?32+(value-55)/2:Math.max(0,12-(55-value)/3);
    }
    return Math.max(1,weight);
  }

  claimContractPhase(guild){
    if(this.isLocalGuild(guild)) return;
    this.aiPlaceContractWorkers(guild);
  }

  chooseBestTeam(guild,contract){
    return this.bestWorkersForContract(this.availableWorkers(guild),contract,this.contractSharedSlotLimit());
  }
  bestWorkersForContract(workers,contract,limit,guild=null,posture='auto'){return workers.map(c=>({c,score:this.aiWorkerContractFit(guild,c,contract,posture)})).sort((a,b)=>b.score-a.score).slice(0,limit).map(x=>x.c);}
  async aiPlaceContractWorkers(guild,firstPick=null){
    const minChance=this.aiMinClaimChance(guild);
    let placed=0;
    while(this.availableWorkers(guild).length){
      const options=this.state.boardContracts.map(contract=>this.aiContractPlacementOption(guild,contract)).filter(Boolean).sort((a,b)=>b.value-a.value);
      if(!options.length)break;
      let pick=firstPick;
      firstPick=null;
      if(!pick){
        const viable=options.filter(o=>o.chance>=minChance);
        const pool=viable.length?viable:options.slice(0,3);
        pick=this.weightedPick(pool.map((o,i)=>({item:o,weight:Math.max(1,o.value)+(pool.length-i)*3})));
      }
      if(!pick)break;
      if(!this.contractAllowsNewPlacement(pick.contract,guild))break;
      if(pick.chance<minChance&&Math.random()>0.35*this.aiRisk(guild))break;
      const claimant=this.contractClaimant(pick.contract);
      if(pick.posture==='compete'){
      const cost=this.competitionReputationCost(guild,pick.contract,claimant,pick.add);
        guild.reputation=Math.max(0,guild.reputation-cost);
        this.log(guild,'contract',`${guild.name} challenged ${claimant?.name}'s claim on "${pick.contract.title}".${cost?` Reputation -${cost}.`:''}`);
      }
      this.commitContractWorkers(guild,pick.contract,pick.add,pick.posture||'cooperate');
      placed+=pick.add.length;
      const postureText=pick.posture==='compete'?'contesting':this.contractClaimant(pick.contract)?.id===guild.id?'claiming':'cooperating on';
      this.log(guild,'contract',`${guild.name} committed ${pick.add.map(c=>c.name).join(', ')} to "${pick.contract.title}" at ${pick.chance}% odds, ${postureText}.`);
      this.recordAiActivity(guild,'contract',`Committed ${pick.add.map(c=>c.name).join(' + ')}`,`${pick.contract.title} - ${pick.chance}% - ${postureText}`);
      this.setAiThinkingDetail(`placed ${pick.add.map(c=>this.workerInitials(c)).join(' + ')} on ${pick.contract.title}`);
      this.render();
      await this.aiVisualPause();
      if(placed>=Math.max(1,this.activeWorkers(guild).length-1)&&Math.random()>0.25*this.aiRisk(guild))break;
    }
    return placed>0;
  }
  aiContractPlacementOption(guild,contract){
    if(!this.contractAllowsNewPlacement(contract,guild))return null;
    const current=this.placedTeam(guild,contract);
    const open=this.contractOpenSlotCount(contract);
    const claimant=this.contractClaimant(contract);
    const rivalClaim=claimant&&claimant.id!==guild.id;
    if(open<=0&&!rivalClaim)return null;
    const addPool=this.availableWorkers(guild);
    const coopLimit=Math.max(0,open);
    const contestLimit=rivalClaim?1:coopLimit;
    const coopAdd=coopLimit?this.bestWorkersForContract(addPool,contract,coopLimit,guild,rivalClaim?'cooperate':'claim'):[];
    const contestAdd=contestLimit?this.bestWorkersForContract(addPool,contract,contestLimit,guild,'compete'):[];
    const add=coopAdd;
    if(!add.length&&!rivalClaim)return null;
    const team=[...current,...add];
    const chance=this.successChanceForTeam(guild,contract,team);
    const mode=this.aiStrategicMode(guild);
    if(!rivalClaim){
      if(this.aiRejectsContractRisk(guild,contract,chance,mode))return null;
      const value=this.aiContractValue(guild,contract,chance,team,add.length)+this.aiPatronContractValue(guild,contract,'claim');
      if(chance<this.aiFallbackChance(guild))return null;
      return {contract,add,chance,value:value+this.aiTraitSurfaceValue(guild,contract,add,'claim'),posture:'cooperate'};
    }
    if(!coopAdd.length&&!contestAdd.length)return null;
    const coopTeam=[...current,...coopAdd];
    const coopChance=this.successChanceForTeam(guild,contract,coopTeam);
    const projectedCooperators=coopAdd.length?[...new Set([...this.contractParticipantGuilds(contract),guild])]:[];
    const coopShare=coopAdd.length?this.cooperativeRewardShareForGuild(contract,claimant,guild,projectedCooperators):0;
    const coopValue=coopAdd.length?this.aiContractValue(guild,contract,coopChance,coopTeam,coopAdd.length)*coopShare+contract.reward.reputation*1.5*coopShare+contract.reward.gold*.05*coopShare+this.aiTraitSurfaceValue(guild,contract,coopAdd,'cooperate')+this.aiPatronContractValue(guild,contract,'cooperate'):-Infinity;
    const contestTeam=[...current,...contestAdd];
    const contestChance=this.successChanceForTeam(guild,contract,contestTeam);
    const contestPressure=(mode.behind?24:0)+(mode.desperate?30:0)+(this.aiRisk(guild)-1)*16;
    const claimValue=contract.reward.reputation*4+contract.reward.gold*.12+(contract.risk==='dangerous'?6:0)+(['deadly','lethal'].includes(contract.risk)?12:0);
    const repCost=this.competitionReputationCost(guild,contract,claimant,contestAdd)*8+(guild.reputation>0?0:20);
    const competeValue=this.aiContractValue(guild,contract,contestChance,contestTeam,contestAdd.length)+contestPressure+claimValue+this.aiTraitSurfaceValue(guild,contract,contestAdd,'compete')+this.aiPatronContractValue(guild,contract,'compete')-repCost;
    const blocked=this.competitionBlockedBy(contract,claimant,guild,contestAdd)||this.cooperationForcedBy(contract,claimant,guild,contestAdd);
    const canCompete=contestAdd.length&&!blocked&&guild.reputation>=this.competitionReputationCost(guild,contract,claimant,contestAdd)&&contestChance>=this.aiFallbackChance(guild)+4;
    const best=canCompete&&competeValue>coopValue?{contract,add:contestAdd,chance:contestChance,value:competeValue,posture:'compete'}:{contract,add:coopAdd,chance:coopChance,value:coopValue,posture:'cooperate'};
    if(!best.add.length)return null;
    if(this.aiRejectsContractRisk(guild,contract,best.chance,mode))return null;
    return best.chance<this.aiFallbackChance(guild)?null:best;
  }
  aiRejectsContractRisk(guild,contract,chance,mode=this.aiStrategicMode(guild)){
    if(mode.rebuilding&&['deadly','lethal'].includes(contract.risk)&&chance<72)return true;
    if(mode.startup&&contract.risk==='dangerous'&&chance<58)return true;
    if(mode.behind&&contract.risk==='dangerous'&&chance<66)return true;
    if(mode.desperate&&contract.risk!=='low'&&chance<66)return true;
    if(mode.rebuilding&&contract.risk==='moderate'&&chance<54)return true;
    return false;
  }
  isPlaced(c){return Boolean(c.placement);}
  isLockedPlacement(c,guild=this.activeLocalGuild()){
    if(c.placement?.type!=='contract')return false;
    const contract=this.state.boardContracts.find(x=>x.instanceId===c.placement.id);
    return Boolean(contract&&this.contractProgress(guild,contract));
  }
  visibleTraits(c){return c.revealedTraits?.length?c.revealedTraits:c.traits;}
  revealAllTraits(c,reason=''){const before=c.revealedTraits?.length||0;c.revealedTraits=[...c.traits];c.revealAfterSeason=false;if(c.revealedTraits.length>before)c.history.push(`Year ${this.state.year}: revealed ${c.traits.slice(before).join(', ')}${reason?` ${reason}`:''}.`);}
  revealTrait(worker,trait){worker.revealedTraits=worker.revealedTraits||[];if(!worker.revealedTraits.includes(trait))worker.revealedTraits.push(trait);}
  replaceTrait(worker,oldTrait,newTrait){worker.traits=worker.traits.map(t=>t===oldTrait?newTrait:t);worker.revealedTraits=(worker.revealedTraits||[]).map(t=>t===oldTrait?newTrait:t);this.revealTrait(worker,newTrait);}
  isProfession(tag){return this.data.characterParts.professions.some(p=>p.name===tag);}
  contractDomains(contract){return [...new Set([contract.pool,contract.type].filter(Boolean))];}
  explicitTagWeight(req,kind){if(kind==='primary')return this.isProfession(req.trait)?30:req.weight;return this.isProfession(req.trait)?15:req.weight;}
  explicitContractScore(traits,contract){let s=0;for(const r of contract.requirements)if(traits.includes(r.trait))s+=this.explicitTagWeight(r,'primary');for(const r of contract.support)if(traits.includes(r.trait))s+=this.explicitTagWeight(r,'support');return s;}
  affinityScoreForTraits(traits,contract){
    const explicit=new Set(this.contractTags(contract));
    const domains=this.contractDomains(contract);
    let s=0;
    for(const tag of traits){
      if(explicit.has(tag))continue;
      const affinity=this.data.characterParts.tagAffinities?.[tag];
      if(!affinity)continue;
      if((affinity.domains||[]).some(d=>domains.includes(d)))s+=affinity.bonus||5;
    }
    return s;
  }
  characterTagScore(c,contract){const traits=this.visibleTraits(c);return this.explicitContractScore(traits,contract)+this.affinityScoreForTraits(traits,contract);}
  characterFit(c,contract){return this.characterTagScore(c,contract)+c.resources*3+c.connections*2-this.conditionPenalty(c);}
  aiWorkerContractFit(guild,worker,contract,posture='auto'){
    return this.characterFit(worker,contract)+this.aiTraitSurfaceValue(guild,contract,[worker],posture);
  }
  aiTraitSurfaceValue(guild,contract,workers=[],posture='auto'){
    const claimant=this.contractClaimant(contract);
    const traits=workers.flatMap(worker=>this.visibleTraits(worker));
    let value=0;
    const has=tag=>traits.includes(tag);
    const effectCount=trigger=>workers.flatMap(worker=>this.workerTraitEffects(worker,trigger).filter(effect=>this.effectMatchesContract(effect,contract,{guild,worker,team:workers,role:this.workerContractRole(workers,worker)})));
    if(posture==='claim'||!claimant||claimant.id===guild?.id){
      value+=effectCount('contractClaim').reduce((sum,effect)=>sum+(effect.type==='blockCompetition'?16:effect.type==='forceCooperation'?14:effect.type==='competitionCost'?(effect.amount||0)*5:0),0);
    }
    if(posture==='cooperate'){
      value+=effectCount('contractCooperation').reduce((sum,effect)=>sum+(effect.type==='cooperativeChance'?(effect.amount||0)*2:0),0);
      if(has('Honest')||has('Charming')||has('Connected'))value+=5;
    }
    if(posture==='compete'){
      value+=effectCount('contractContest').reduce((sum,effect)=>sum+(effect.type==='contestScore'?(effect.amount||0):effect.type==='bypassCompetitionBlock'?18:effect.type==='competitionCost'?-(effect.amount||0)*7:0),0);
      if(has('Criminal')||has('Shrewd')||has('Disgraced'))value+=6;
    }
    return value;
  }
  contractPreview(guild,c){const team=this.placedTeam(guild,c);const previewTeam=team.length?team:this.chooseBestTeam(guild,c);return {team:previewTeam,chance:previewTeam.length?this.successChanceForTeam(guild,c,previewTeam):null};}
  contractValue(guild,c){const p=this.contractPreview(guild,c);return p.chance===null?-999:this.aiContractValue(guild,c,p.chance,p.team)+this.aiPatronContractValue(guild,c,'claim');}
  aiRisk(guild){return guild.personality?.risk||1;}
  aiMinClaimChance(guild){
    const mode=this.aiStrategicMode(guild);
    let chance=Math.round(this.data.contractParts.settings.aiMinClaimChance/this.aiRisk(guild));
    if(mode.startup)chance-=2;
    if(mode.behind)chance-=3;
    if(mode.desperate)chance-=4;
    return Math.max(mode.desperate?38:mode.rebuilding?44:40,chance);
  }
  aiFallbackChance(guild){
    const settings=this.data.contractParts.settings;
    const mode=this.aiStrategicMode(guild);
    const floor=this.aiProfileValue(guild,'absoluteMinChance',settings.aiAbsoluteMinChance||30)-(mode.rebuilding?4:0);
    return Math.max(Math.max(28,floor),Math.round(this.aiMinClaimChance(guild)*(settings.aiFallbackChanceFactor||0.75)));
  }
  aiRiskAppeal(guild,contract){
    const appeal={low:-2,moderate:0,dangerous:6,deadly:12,lethal:18}[contract.risk]||0;
    return appeal*this.aiProfileValue(guild,'dangerBias',0);
  }
  aiRewardValue(guild,contract){return contract.reward.gold*this.aiProfileValue(guild,'goldBias',0.25)+contract.reward.reputation*this.aiProfileValue(guild,'reputationBias',3);}
  aiFlavorScore(guild,tags){const prefs=guild.personality?.preferredTags||[];return tags.filter(t=>prefs.includes(t)).length;}
  aiPatronContractValue(guild,contract,posture='claim'){
    const patron=this.patronDef(contract?.patron?.key);
    if(!guild||!patron)return 0;
    const thresholds=this.patronFavorThresholds();
    const prefs=guild.personality?.preferredTags||[];
    const priorities=guild.personality?.facilityPriorities||[];
    const favor=this.patronFavor(guild,patron.key);
    const projected=favor+this.aiProjectedPatronFavorGain(contract,posture);
    const next=Object.values(thresholds).sort((a,b)=>a-b).find(value=>favor<value);
    const traitFit=prefs.includes(patron.trait)?18:0;
    const priorityIndex=priorities.indexOf(patron.facility);
    const facilityFit=priorityIndex>=0?(priorities.length-priorityIndex)*10:0;
    const facilityDemand=this.aiFacilityLaneDemand(guild,patron.facility)*0.18;
    const laneNeed=patron.lane?this.aiLaneNeed(guild,patron.lane)*12:0;
    const facilityPull=({chapel:16,archives:6,infirmary:10,scout:8,training:4,market:-4,workshop:-4,common:-6})[patron.facility]||0;
    const thresholdReach=next&&projected>=next?26+(next===thresholds.ally?10:0):0;
    const nearThreshold=next?Math.max(0,4-(next-favor))*5:0;
    const duplicateDecay=favor>=thresholds.ally?0.28:favor>=thresholds.slot?0.55:favor>=thresholds.training?0.75:1;
    const temperament=posture==='compete'?this.aiPatronContestPreference(guild,patron)*12:0;
    const typeFit=traitFit+facilityFit>0?1.15:0.65;
    return (traitFit+facilityFit+facilityDemand+laneNeed+facilityPull+thresholdReach+nearThreshold+temperament)*duplicateDecay*typeFit;
  }
  aiProjectedPatronFavorGain(contract,posture='claim'){
    if(posture==='cooperate')return 1;
    if(posture==='compete')return this.aiPatronContestPreference(null,this.patronDef(contract?.patron?.key))>0?3:2;
    return 3;
  }
  aiPatronContestPreference(guild,patron){
    if(!patron)return 0;
    if(['watch','duke','borderlords','underworld','miners'].includes(patron.key))return 1;
    if(['abbey','pilgrims','orphans','farmers','university','magistrates'].includes(patron.key))return -1;
    return 0;
  }
  aiProfileLaneWeights(guild){
    const presets={
      balanced:{gold:1,reputation:1,completed:1,resources:1,connections:1},
      scholars:{gold:.55,reputation:1.35,completed:1.05,resources:.55,connections:.9},
      fighters:{gold:.55,reputation:1.15,completed:1.45,resources:.75,connections:.55},
      operators:{gold:1.05,reputation:.75,completed:.75,resources:.55,connections:1.45},
      merchants:{gold:1.55,reputation:.55,completed:.45,resources:.8,connections:1.05},
      builders:{gold:.85,reputation:.85,completed:.85,resources:1.45,connections:.6},
      explorers:{gold:.8,reputation:.9,completed:1.25,resources:.65,connections:1.15},
      pious:{gold:.55,reputation:1.25,completed:1.15,resources:.6,connections:.85},
      relief:{gold:.65,reputation:1.15,completed:1.15,resources:.8,connections:.8},
      civic:{gold:.7,reputation:1.15,completed:.85,resources:.9,connections:1.1},
      miners:{gold:.9,reputation:.9,completed:.9,resources:1.4,connections:.6},
      gamblers:{gold:1.2,reputation:1.1,completed:1.05,resources:.55,connections:.65}
    };
    return presets[guild.personality?.id]||presets.balanced;
  }
  aiLaneWeights(guild){
    const lanes=['gold','reputation','completed','resources','connections'];
    const patronKey=Object.entries(guild.patronFavor||{}).sort((a,b)=>a[0].localeCompare(b[0])).map(([key,value])=>`${key}:${value}`).join(',');
    const activeKey=this.activeWorkers(guild).map(worker=>worker.id).sort().join(',');
    const cacheKey=[guild.id,this.state.year,this.state.seasonIndex,guild.gold,guild.reputation,guild.completed,guild.resources,guild.connections,activeKey,patronKey].join('|');
    this._aiLaneWeightCache=this._aiLaneWeightCache||new Map();
    if(this._aiLaneWeightCache.has(cacheKey))return this._aiLaneWeightCache.get(cacheKey);
    const profile=this.aiProfileLaneWeights(guild);
    const feasibility=Object.fromEntries(lanes.map(lane=>[lane,this.aiLaneFeasibility(guild,lane,profile[lane]||1)]));
    const averageFeasibility=lanes.reduce((sum,lane)=>sum+feasibility[lane],0)/lanes.length||1;
    const planningDelay=this.aiProfileValue(guild,'planningDelayYears',0);
    const planningScale=this.aiProfileValue(guild,'planningScale',1);
    const yearPressure=this.clamp((((this.state.year||1)-2-planningDelay)/10)*planningScale,0.05,0.78);
    const weights=Object.fromEntries(lanes.map(lane=>{
      const profileWeight=profile[lane]||1;
      const feasibleWeight=this.clamp(feasibility[lane]/averageFeasibility,0.45,1.85);
      return [lane,profileWeight*(1-yearPressure)+feasibleWeight*yearPressure];
    }));
    this._aiLaneWeightCache.set(cacheKey,weights);
    if(this._aiLaneWeightCache.size>200)this._aiLaneWeightCache.clear();
    return weights;
  }
  aiLaneFeasibility(guild,stat,profileWeight=1){
    const goals=this.victoryGoals();
    const target=Math.max(1,goals[stat]||1);
    const progress=(guild[stat]||0)/target;
    const seasonsLeft=Math.max(1,(20-(this.state.year||1))*4+(3-(this.state.seasonIndex||0))+1);
    const production=this.aiLaneProductionPotential(guild,stat,Math.min(12,seasonsLeft))/target;
    const contracts=this.aiLaneContractPotential(guild,stat)/target;
    const patrons=this.aiPatronLaneCommitment(guild,stat);
    const roster=this.aiRosterLanePotential(guild,stat);
    const finishable=progress>=0.82?0.22+(progress-0.82)*1.4:0;
    return 0.2+progress*1.1+production+contracts+patrons+roster+finishable+profileWeight*0.18;
  }
  aiLaneProductionPotential(guild,stat,seasons=8){
    const facilities=this.data.contractParts.facilities||[];
    return this.activeWorkers(guild).reduce((sum,worker)=>{
      const best=facilities.reduce((value,facility)=>{
        const rule=this.concurrentFacilityProductionRule(guild,facility,this.patronAdjustedFacilityProductionRule(guild,facility,this.facilityProductionRule(worker,facility)));
        return Math.max(value,rule?.[stat]||0);
      },0);
      return sum+best*seasons;
    },0);
  }
  aiLaneContractPotential(guild,stat){
    if(stat==='completed'){
      const active=this.activeWorkers(guild).length;
      const bestFit=this.state.boardContracts.reduce((best,contract)=>Math.max(best,...this.activeWorkers(guild).map(worker=>this.characterFit(worker,contract))),0);
      return active*2+bestFit*0.08;
    }
    if(stat==='gold'||stat==='reputation'){
      return this.state.boardContracts.reduce((sum,contract)=>sum+(contract.reward?.[stat]||0)*0.7,0);
    }
    return 0;
  }
  aiPatronLaneCommitment(guild,stat){
    const thresholds=this.patronFavorThresholds();
    return (this.data.contractParts.patrons||[]).filter(patron=>patron.lane===stat).reduce((sum,patron)=>{
      const favor=this.patronFavor(guild,patron.key);
      if(favor>=thresholds.ally)return sum+0.32;
      if(favor>=thresholds.slot)return sum+0.24;
      if(favor>=thresholds.training)return sum+0.18;
      if(favor>=thresholds.ready)return sum+0.08;
      return sum;
    },0);
  }
  aiRosterLanePotential(guild,stat){
    const workers=this.activeWorkers(guild);
    if(!workers.length)return 0;
    if(stat==='resources')return workers.reduce((sum,worker)=>sum+(worker.resources||0),0)/Math.max(1,workers.length*5)*0.45;
    if(stat==='connections')return workers.reduce((sum,worker)=>sum+(worker.connections||0),0)/Math.max(1,workers.length*5)*0.45;
    if(stat==='completed')return Math.min(0.35,workers.length/18);
    if(stat==='gold')return this.aiFlavorScore(guild,['Merchant','Shrewd','Frugal','Tax Collector','Innkeeper','Smuggler'])/120;
    if(stat==='reputation')return this.aiFlavorScore(guild,['Noble','Faithful','Honest','Generous','Compassionate','Influential'])/120;
    return 0;
  }
  aiVictoryScore(guild){
    const goals=this.victoryGoals();
    const weights=this.aiLaneWeights(guild);
    return Object.entries(weights).reduce((sum,[stat,weight])=>sum+((guild[stat]||0)/Math.max(1,goals[stat]||1))*weight*100,0);
  }
  aiScore(guild){return this.aiVictoryScore(guild);}
  aiLaneNeed(guild,stat){
    const goals=this.victoryGoals();
    const weights=this.aiLaneWeights(guild);
    const progress=(guild[stat]||0)/Math.max(1,goals[stat]||1);
    return (weights[stat]||1)*Math.max(0.28,1-progress*0.62);
  }
  aiProductionValue(guild,rule){
    if(!rule)return 0;
    return (rule.gold||0)*this.aiLaneNeed(guild,'gold')*0.7
      +(rule.reputation||0)*this.aiLaneNeed(guild,'reputation')*4
      +(rule.completed||0)*this.aiLaneNeed(guild,'completed')*32
      +(rule.resources||0)*this.aiLaneNeed(guild,'resources')*18
      +(rule.connections||0)*this.aiLaneNeed(guild,'connections')*18
      +(rule.recover?10:0);
  }
  aiWorkerLaneValue(guild,worker){
    const prefs=guild.personality?.facilityPriorities||[];
    const facilityValue=this.data.contractParts.facilities.reduce((best,facility)=>{
      if(!this.facilityHasOpenSlot(guild,facility,worker))return best;
      const rule=this.concurrentFacilityProductionRule(guild,facility,this.patronAdjustedFacilityProductionRule(guild,facility,this.facilityProductionRule(worker,facility)));
      const exploit=this.aiProductionValue(guild,rule);
      const setup=this.facilitySetupRules().filter(setupRule=>setupRule.facility===facility.key&&this.workerHasAny(worker,setupRule.tags)).reduce((sum,setupRule)=>sum+setupRule.targets.reduce((targetSum,target)=>targetSum+this.aiFacilityLaneDemand(guild,target),0),0);
      const priority=prefs.includes(facility.key)?8:0;
      return Math.max(best,exploit+setup+priority);
    },0);
    const contractValue=this.state.boardContracts.reduce((best,contract)=>Math.max(best,this.characterFit(worker,contract)),0)*this.aiLaneNeed(guild,'completed')*0.35;
    return facilityValue+contractValue+(worker.resources||0)*this.aiLaneNeed(guild,'resources')*8+(worker.connections||0)*this.aiLaneNeed(guild,'connections')*8;
  }
  aiFacilityLaneDemand(guild,facilityKey){
    const facility=this.facilityDef(facilityKey);
    if(!facility)return 0;
    const ready=this.facilityReadyCount(guild,facilityKey);
    const exploiters=this.activeWorkers(guild).filter(worker=>this.facilityProductionRule(worker,facility));
    const best=exploiters.reduce((value,worker)=>Math.max(value,this.aiProductionValue(guild,this.concurrentFacilityProductionRule(guild,facility,this.patronAdjustedFacilityProductionRule(guild,facility,this.facilityProductionRule(worker,facility))))),0);
    return best*(ready?0.35:1)+Math.max(0,2-ready)*5;
  }
  aiStrategicMode(guild){
    const active=this.activeWorkers(guild).length;
    const cap=this.guildRosterCap();
    const score=this.aiScore(guild);
    const scores=this.state.guilds.map(g=>this.aiScore(g)).sort((a,b)=>a-b);
    const median=scores[Math.floor(scores.length/2)]||score;
    const leader=scores.at(-1)||score;
    const startup=this.state.year<=2||active<Math.min(4,cap)||guild.completed<2;
    const behind=this.state.year>=3&&(score<median-10||score<leader*0.58||active<4||guild.reputation<10);
    const desperate=active<=2||(this.state.year>=3&&guild.completed<2&&guild.reputation<12);
    return {startup,behind,desperate,rebuilding:startup||behind||desperate};
  }
  aiContractValue(guild,contract,chance,team,addCount=0){
    const mode=this.aiStrategicMode(guild);
    const weights=this.aiLaneWeights(guild);
    const flavor=this.aiFlavorScore(guild,this.contractTags(contract))*(mode.rebuilding?3:8);
    const riskAppeal=mode.rebuilding?Math.min(0,this.aiRiskAppeal(guild,contract)):this.aiRiskAppeal(guild,contract);
    const riskRecovery={low:12,moderate:5,dangerous:-12,deadly:-28,lethal:-45}[contract.risk]||0;
    const oddsDiscipline=mode.rebuilding?(chance-62)*2:0;
    const recovery=mode.rebuilding?riskRecovery+oddsDiscipline+Math.max(0,4-(contract.workSeasons||1))*8+contract.reward.reputation*2.5:0;
    const workPenalty=contract.workSeasons*this.aiProfileValue(guild,'workPenalty',2)*(mode.rebuilding?1.7:1);
    const laneReward=(contract.reward.gold||0)*weights.gold*.18+(contract.reward.reputation||0)*weights.reputation*2.6+weights.completed*18;
    const readinessNeed=Math.max(0,70-chance)*(weights.completed>.9?0.35:0.16);
    return chance*(mode.rebuilding?1.25:this.aiRisk(guild))+this.aiRewardValue(guild,contract)+laneReward+this.contractReadinessBonus(guild,contract)*(weights.completed+.5)+riskAppeal+this.aiActivatedRuleValue(guild,contract,team)-workPenalty+flavor+addCount*5+recovery-readinessNeed;
  }
  aiActivatedRuleValue(guild,contract,team){
    return team.reduce((sum,worker)=>sum+this.workerTraitEffects(worker).filter(effect=>['contractScore','contractSuccess','contractFailure','contractProgress'].includes(effect.trigger)&&this.effectMatchesContract(effect,contract,{guild,worker,team,role:this.workerContractRole(team,worker)})).length*5,0);
  }

  placedTeam(guild,contract){return (contract.placements?.[guild.id]||[]).map(id=>guild.roster.find(c=>c.id===id)).filter(Boolean);}
  hasContractPlacements(contract){return Object.values(contract.placements||{}).some(list=>list?.length);}
  contractProgress(guild,contract){return contract.progress?.[guild.id]||(contract.sharedProgress&&this.placedTeam(guild,contract).length?contract.sharedProgress:null);}
  contractClaimant(contract){return this.state.guilds.find(g=>g.id===contract.claim?.guildId)||this.contractSlotOccupants(contract,null)[0]?.guild||null;}
  ensureContractClaim(contract,guild){
    contract.claim=contract.claim||{guildId:null,postures:{}};
    contract.claim.postures=contract.claim.postures||{};
    if(!contract.claim.guildId&&guild)contract.claim.guildId=guild.id;
    return contract.claim;
  }
  contractPosture(contract,guild){
    const claimant=this.contractClaimant(contract);
    if(!claimant||claimant.id===guild?.id)return 'claim';
    return contract.claim?.postures?.[guild.id]||'cooperate';
  }
  contractTeamTraitEffects(guild,contract,trigger,extraWorkers=[]){
    if(!guild)return [];
    const team=[...this.placedTeam(guild,contract),...extraWorkers].filter(Boolean);
    return team.flatMap(worker=>this.workerTraitEffects(worker,trigger).filter(effect=>this.effectMatchesContract(effect,contract,{guild,worker,team,role:this.workerContractRole(team,worker)})).map(effect=>({...effect,guild})));
  }
  competitionBlockedBy(contract,claimant,challenger,incomingWorkers=[]){
    if(!claimant||claimant.id===challenger?.id)return null;
    const bypass=this.contractTeamTraitEffects(challenger,contract,'contractContest',incomingWorkers).some(effect=>effect.type==='bypassCompetitionBlock');
    if(bypass)return null;
    return this.contractTeamTraitEffects(claimant,contract,'contractClaim').find(effect=>effect.type==='blockCompetition')||null;
  }
  cooperationForcedBy(contract,claimant,challenger,incomingWorkers=[]){
    if(!claimant||claimant.id===challenger?.id)return null;
    return this.contractTeamTraitEffects(claimant,contract,'contractClaim').find(effect=>effect.type==='forceCooperation')||null;
  }
  competitionReputationCost(guild,contract,claimant=this.contractClaimant(contract),incomingWorkers=[]){
    let cost=1;
    for(const effect of this.contractTeamTraitEffects(claimant,contract,'contractClaim'))if(effect.type==='competitionCost')cost+=effect.amount||0;
    for(const effect of this.contractTeamTraitEffects(guild,contract,'contractContest',incomingWorkers))if(effect.type==='competitionCost')cost+=effect.amount||0;
    return this.clamp(cost,0,5);
  }
  contestTraitScore(guild,contract){
    return this.contractTeamTraitEffects(guild,contract,'contractContest').filter(effect=>effect.type==='contestScore').reduce((sum,effect)=>sum+(effect.amount||0),0);
  }
  cooperativeTraitBonus(guild,contract){
    return this.contractTeamTraitEffects(guild,contract,'contractCooperation').filter(effect=>effect.type==='cooperativeChance').reduce((sum,effect)=>sum+(effect.amount||0),0);
  }
  syncContractClaim(contract){
    const occupants=this.contractSlotOccupants(contract,null);
    contract.claim=contract.claim||{guildId:null,postures:{}};
    contract.claim.postures=contract.claim.postures||{};
    if(!occupants.some(({guild})=>guild.id===contract.claim.guildId))contract.claim.guildId=occupants[0]?.guild.id||null;
    for(const guildId of Object.keys(contract.claim.postures))if(!occupants.some(({guild})=>guild.id===guildId))delete contract.claim.postures[guildId];
    if(!occupants.length)delete contract.claim;
  }
  commitContractWorkers(guild,contract,workers,posture='cooperate',{suppressResponse=false}={}){
    contract.placements=contract.placements||{};
    const claim=this.ensureContractClaim(contract,guild);
    if(claim.guildId!==guild.id)claim.postures[guild.id]=posture;
    const list=contract.placements[guild.id]||[];
    for(const worker of workers){
      if(!list.includes(worker.id))list.push(worker.id);
      worker.placement={type:'contract',id:contract.instanceId};
    }
    contract.placements[guild.id]=list;
    this.syncContractClaim(contract);
    if(!suppressResponse)this.enqueueContractResponse(contract,guild,posture);
  }
  enqueueContractResponse(contract,intruder,posture='cooperate'){
    if(posture!=='cooperate')return false;
    const claimant=this.contractClaimant(contract);
    if(!claimant||claimant.id===intruder?.id)return false;
    this.state.pendingContractResponses=this.state.pendingContractResponses||[];
    const id=`${contract.instanceId}:${claimant.id}:${intruder.id}`;
    if(this.state.pendingContractResponses.some(response=>response.id===id))return false;
    this.state.pendingContractResponses.push({id,contractId:contract.instanceId,claimantId:claimant.id,intruderId:intruder.id});
    if(!this.state.resolvingContractResponses&&(this.isLocalGuild(claimant)||this.isAiGuild(claimant)))this.openNextContractResponse();
    return true;
  }
  contractSharedSlotLimit(){return this.data.contractParts.settings.contractSharedSlots||5;}
  contractSlotOccupants(contract,viewer=this.activeLocalGuild()){
    const guilds=viewer?[viewer,...this.state.guilds.filter(g=>g.id!==viewer.id)]:this.state.guilds;
    return guilds.flatMap(guild=>this.placedTeam(guild,contract).map((worker,index)=>({guild,worker,index,posture:this.contractPosture(contract,guild)})));
  }
  contractOccupiedSlotCount(contract){return this.contractSlotOccupants(contract,null).length;}
  contractOpenSlotCount(contract){return Math.max(0,this.contractSharedSlotLimit()-this.contractOccupiedSlotCount(contract));}
  contractAllowsNewPlacement(contract,guild){
    return Boolean(contract&&contract.offerSeasons>0&&!contract.sharedProgress&&!this.contractProgress(guild,contract));
  }
  placeWorker(characterId,targetId,targetType='contract',mode='work'){
    const guild=this.activeLocalGuild();
    if(this.state.phase!=='awaitHuman'||this.state.humanActionUsed)return false;
    const worker=guild.roster.find(c=>c.id===characterId);
    if(!worker||!worker.alive)return false;
    if(targetType==='recovery')return this.placeRecoveryWorker(worker,guild);
    if(targetType==='facility')return this.placeFacilityWorker(worker,targetId,guild,mode);
    const contract=this.state.boardContracts.find(c=>c.instanceId===targetId);
    if(!contract)return false;
    if(!this.contractAllowsNewPlacement(contract,guild))return false;
    const claimant=this.contractClaimant(contract);
    const posture=claimant&&claimant.id!==guild.id&&mode==='compete'?'compete':'cooperate';
    const alreadyHere=worker.placement?.type==='contract'&&worker.placement.id===contract.instanceId;
    if(!alreadyHere&&posture!=='compete'&&this.contractOpenSlotCount(contract)<=0)return false;
    if(posture==='compete'){
      const forced=this.cooperationForcedBy(contract,claimant,guild,[worker]);
      if(forced){
        if(this.contractOpenSlotCount(contract)<=0){
          this.log(guild,'contract',`${claimant.name}'s ${forced.trait} prevented ${guild.name} from contesting "${contract.title}", but no cooperation slot was open.`);
          this.render();
          return false;
        }
        if(worker.placement&&!this.unplaceWorker(worker,guild))return false;
        this.log(guild,'contract',`${claimant.name}'s ${forced.trait} forced ${guild.name} to cooperate on "${contract.title}".`);
        this.commitContractWorkers(guild,contract,[worker],'cooperate',{suppressResponse:true});
        this.render();
        return true;
      }
      const blocked=this.competitionBlockedBy(contract,claimant,guild,[worker]);
      if(blocked){
        this.log(guild,'contract',`${claimant.name}'s ${blocked.trait} blocked ${guild.name} from contesting "${contract.title}".`);
        this.render();
        return false;
      }
    }
    if(worker.placement&&!this.unplaceWorker(worker,guild))return false;
    if(posture==='compete'){
      const cost=this.competitionReputationCost(guild,contract,claimant,[worker]);
      guild.reputation=Math.max(0,guild.reputation-cost);
      this.log(guild,'contract',`${guild.name} challenged ${claimant.name}'s claim on "${contract.title}".${cost?` Reputation -${cost}.`:''}`);
    }else if(claimant&&claimant.id!==guild.id){
      this.log(guild,'contract',`${guild.name} joined "${contract.title}" as a cooperator with ${claimant.name}.`);
    }
    this.commitContractWorkers(guild,contract,[worker],posture);
    this.render();
    return true;
  }
  placeFacilityWorker(worker,facilityKey,guild=this.activeLocalGuild(),mode='work'){
    const facility=this.facilityDef(facilityKey);
    if(!facility)return false;
    if(worker.placement&&!this.unplaceWorker(worker,guild))return false;
    const placed=this.facilityWorkers(guild,facilityKey,'work');
    const limit=this.facilitySlotCount(guild,facility);
    if(placed.length>=limit)return false;
    worker.placement={type:'facility',id:facilityKey,mode:'work'};
    this.render();
    return true;
  }
  placeRecoveryWorker(worker,guild=this.activeLocalGuild()){
    if(worker.placement&&!this.unplaceWorker(worker,guild))return false;
    if(this.recoveryWorkers(guild).length>=this.recoverySlotCount())return false;
    worker.placement={type:'recovery'};
    this.render();
    return true;
  }
  returnWorker(characterId){
    const guild=this.activeLocalGuild();
    if(this.state.phase!=='awaitHuman'||this.state.humanActionUsed)return false;
    const worker=guild.roster.find(c=>c.id===characterId);
    if(!worker||!worker.placement)return false;
    if(!this.unplaceWorker(worker,guild))return false;
    this.render();
    return true;
  }
  unplaceWorker(worker,guild=this.activeLocalGuild(),force=false){
    if(!worker?.placement)return true;
    if(worker.placement.type==='contract'){
      const contract=this.state.boardContracts.find(c=>c.instanceId===worker.placement.id);
      if(contract&&!force&&this.contractProgress(guild,contract))return false;
      if(contract?.placements?.[guild.id])contract.placements[guild.id]=contract.placements[guild.id].filter(id=>id!==worker.id);
      if(contract?.progress?.[guild.id]&&!this.placedTeam(guild,contract).length)delete contract.progress[guild.id];
      if(contract)this.syncContractClaim(contract);
    }
    if(worker.placement.type==='facility'){
      // Facility placement lives on the worker, so clearing the worker is enough.
    }
    worker.placement=null;
    return true;
  }
  facilityDef(key){return this.data.contractParts.facilities.find(f=>f.key===key);}
  patronDef(key){return this.data.contractParts.patrons.find(p=>p.key===key);}
  patronFavorThresholds(){return this.data.contractParts.settings.patronFavorThresholds||{ready:2,training:4,slot:6,ally:8};}
  patronFavor(guild,patronKey){return guild?.patronFavor?.[patronKey]||0;}
  facilityPatrons(facilityKey){return (this.data.contractParts.patrons||[]).filter(patron=>patron.facility===facilityKey);}
  facilityBestFavor(guild,facilityKey){
    return this.facilityPatrons(facilityKey).reduce((best,patron)=>Math.max(best,this.patronFavor(guild,patron.key)),0);
  }
  facilityHasPatronTier(guild,facilityKey,tier){
    const threshold=this.patronFavorThresholds()[tier]||Infinity;
    return this.facilityBestFavor(guild,facilityKey)>=threshold;
  }
  facilitySlotCount(guild,facility){
    const base=facility?.slots||0;
    return base+(this.facilityHasPatronTier(guild,facility.key,'slot')?1:0);
  }
  facilityTrainingPatronBonus(guild,facility){
    if(!this.facilityHasPatronTier(guild,facility.key,'training'))return 0;
    return this.facilityPatrons(facility.key).filter(patron=>this.patronFavor(guild,patron.key)>=this.patronFavorThresholds().training).length>1?12:8;
  }
  facilityEvolutionPatron(guild,facility){
    const threshold=this.patronFavorThresholds().ready;
    return this.facilityPatrons(facility.key)
      .filter(patron=>this.patronFavor(guild,patron.key)>=threshold)
      .sort((a,b)=>this.patronFavor(guild,b.key)-this.patronFavor(guild,a.key))[0]||null;
  }
  facilityDisplayLabel(guild,facility){
    return this.facilityEvolutionPatron(guild,facility)?.path||facility.label;
  }
  patronFavorLabel(guild,patron){
    const favor=this.patronFavor(guild,patron.key);
    return `${patron.path} ${favor}`;
  }
  addPatronFavor(guild,contract,amount,reason='contract'){
    const key=contract?.patron?.key;
    const patron=this.patronDef(key);
    if(!guild||!patron||!amount)return 0;
    guild.patronFavor=guild.patronFavor||{};
    const before=this.patronFavor(guild,key);
    const after=Math.max(0,before+amount);
    guild.patronFavor[key]=after;
    if(after===before)return 0;
    const sign=after>before?'+':'';
    this.log(guild,after>before?'good':'bad',`${patron.name} favor ${sign}${after-before} (${after}) for ${reason}.`);
    const ally=this.patronFavorThresholds().ally;
    if(before<ally&&after>=ally){
      this.gainGuildStat(guild,'connections',1,null,`${patron.name} ally`);
      this.log(guild,'good',`${patron.name} became a standing ally for the ${this.facilityDef(patron.facility)?.label||patron.facility}.`);
    }
    return after-before;
  }
  applyPatronContestReaction(guild,contract,won=false){
    const patron=this.patronDef(contract?.patron?.key);
    if(!patron)return;
    const approving=['watch','duke','borderlords','underworld','miners'];
    const disapproving=['abbey','pilgrims','orphans','farmers','university','magistrates'];
    if(approving.includes(patron.key))this.addPatronFavor(guild,contract,won?1:0,won?'decisive contest':'contest attempt');
    else if(disapproving.includes(patron.key))this.addPatronFavor(guild,contract,-1,'rough contest');
  }
  applyAnnualPatronReadiness(guild){
    const threshold=this.patronFavorThresholds().ready;
    for(const patron of this.data.contractParts.patrons||[]){
      if(this.patronFavor(guild,patron.key)<threshold)continue;
      this.addFacilityReady(guild,patron.facility,1,3,`${patron.name} patronage`);
    }
  }
  facilityWorkers(guild,key,mode=null){return guild.roster.filter(c=>c.placement?.type==='facility'&&c.placement.id===key&&(!mode||c.placement.mode===mode));}
  recoverySlotCount(){return this.data.contractParts.settings.recoverySlots||2;}
  recoveryWorkers(guild){return guild.roster.filter(c=>c.placement?.type==='recovery');}

  resolveHumanPlacements(guild){
    const recoveryCount=this.resolveRecovery(guild);
    const facilityCount=this.resolveFacilities(guild);
    const contractCount=this.state.boardContracts.filter(c=>this.placedTeam(guild,c).length).length;
    this.clearFacilityPlacements(guild);
    if(!contractCount&&!facilityCount&&!recoveryCount)return `${guild.name} committed no workers.`;
    return `${guild.name} committed ${contractCount} contract placement(s), resolved ${facilityCount} facility placement(s), and rested ${recoveryCount} merc(s).`;
  }

  finishHumanAction(type,msg,guild=this.activeLocalGuild(),fn){if(fn)fn();if(msg)this.log(guild,type,msg);this.state.humanActionUsed=true;this.advanceTurnCursor();}

  runAITurns(){
    this.advanceTurnCursor();
  }
  finishAITurns(){
    for(const guild of this.snakeGuildOrder().filter(g=>this.isAiGuild(g))) this.resolveAIPlacements(guild);
    for(const guild of this.snakeGuildOrder().filter(g=>this.isLocalGuild(g))) this.resolveAIPlacements(guild);
    this.state.resolvingContractResponses=true;
    this.finishSeasonAfterContractResponses();
  }
  finishSeasonAfterContractResponses(){
    if(this.openNextContractResponse()||this.openNextClaimForceResponse())return;
    this.state.resolvingContractResponses=false;
    this.resolveSeasonContracts();
    if(this.checkVictory())return;
    this.state.activeGuildId=null;
    this.state.localTurnIndex=0;
    this.state.phase='seasonComplete';
    this.render();
    if(!this.state.pendingTraitChoice)this.openSeasonRecap();
  }
  aiTurnDelay(){
    if(typeof window==='undefined')return 0;
    return this.data.contractParts.settings.aiTurnDelayMs??550;
  }
  runAITurnSequence(guilds,done,index=0){
    if(index>=guilds.length){done();return;}
    const guild=guilds[index];
    const delay=this.aiTurnDelay();
    this.state.activeGuildId=guild.id;
    this.state.phase='aiTurn';
    this.render();
    try{ this.showAiThinking(guild); }catch(e){}
    const act=()=>{
      const result = this.aiTurn(guild);
      Promise.resolve(result).then(()=>{
        try{ this.hideAiThinking(); }catch(e){}
        this.render();
        const next=()=>this.runAITurnSequence(guilds,done,index+1);
        if(delay>0)setTimeout(next,delay);
        else next();
      }).catch((e)=>{
        try{ this.hideAiThinking(); }catch(ex){}
        console.error('aiTurn error',e);
        this.render();
        const next=()=>this.runAITurnSequence(guilds,done,index+1);
        if(delay>0)setTimeout(next,delay);
        else next();
      });
    };
    if(delay>0)setTimeout(act,delay);
    else act();
  }

  async aiTurn(guild){
    const mode=this.aiStrategicMode(guild);
    const rosterCap=this.guildRosterCap();
    const coreSize=Math.min(mode.rebuilding?5:(this.data.contractParts.settings.aiCoreRosterSize||4),rosterCap);
    const targetRoster=Math.min(Math.max(this.aiProfileValue(guild,'rosterGoal',6),mode.rebuilding?6:0),rosterCap);
    let acted=false;
    if(this.activeWorkers(guild).length<coreSize&&await this.aiCatchUpRecruit(guild,coreSize))acted=true;
    if(mode.desperate&&this.activeWorkers(guild).length<3&&await this.aiEmergencyRecruit(guild))acted=true;
    
    let shouldRest=false;
    if(this.guildNeedsRest(guild)&&Math.random()<this.aiRestChance(guild,mode)){
      shouldRest = true;
    }
    if(shouldRest){const msg=this.restGuild(guild);this.log(guild,'rest',msg);this.setAiThinkingDetail('rested mercenaries');this.render();await this.aiVisualPause();return true;}
    
    const recruitOption=!guild.hiredThisSeason&&this.activeWorkers(guild).length<targetRoster?this.aiRecruitActionValue(guild,targetRoster):null;
    const facilityOption=this.aiFacilityActionValue(guild);
    const contractOption=this.aiContractActionValue(guild);
    const top=this.aiPickBestOption(guild,[recruitOption,facilityOption,contractOption].filter(Boolean));
    if(top?.type==='recruit'&&top.value>18&&await this.aiCatchUpRecruit(guild,this.activeWorkers(guild).length+1))acted=true;
    if(top?.type==='facility'&&top.value>16&&await this.aiPlaceFacility(guild,top.choice))acted=true;
    if(top?.type==='contract'&&await this.aiPlaceContractWorkers(guild,top.choice))return true;
    if(mode.behind&&this.activeWorkers(guild).length<rosterCap&&!guild.hiredThisSeason&&Math.random()<0.35&&await this.aiCatchUpRecruit(guild,this.activeWorkers(guild).length+1))acted=true;
    const plannedSupport=this.availableWorkers(guild).length>3&&Math.random()<this.aiFacilityChance(guild,mode)&&await this.aiPlaceFacility(guild);
    if(plannedSupport)acted=true;
    if(await this.aiPlaceContractWorkers(guild))return true;
    if((mode.desperate||(mode.behind&&guild.gold<10&&guild.reputation<10))&&this.aiLocalRecoveryWork(guild))return true;
    if(Math.random()<this.aiFacilityChance(guild,mode)&&await this.aiPlaceFacility(guild))return true;
    if(acted||await this.aiPlaceFacility(guild))return true;
    this.log(guild,'operate',`${guild.name} held workers in reserve.`);
    return true;
  }
  aiRecruitActionValue(guild,targetRoster){
    const candidates=this.state.tavern.filter(c=>!c.refusesGuildIds.includes(guild.id)&&this.canRecruit(guild,c));
    if(!candidates.length)return null;
    const target=[...this.state.boardContracts].sort((a,b)=>this.contractValue(guild,b)-this.contractValue(guild,a))[0];
    const best=this.aiPickBestOption(guild,candidates.map(candidate=>({worker:candidate,value:this.recruitValue(guild,candidate,target)})))?.worker;
    if(!best)return null;
    const shortage=Math.max(0,targetRoster-this.activeWorkers(guild).length)*8;
    return {type:'recruit',value:this.recruitValue(guild,best,target)*0.55+shortage,choice:best};
  }
  aiFacilityActionValue(guild){
    const best=this.aiPickBestOption(guild,this.aiFacilityPlacementOptions(guild));
    return best?{type:'facility',value:best.value,choice:best}:null;
  }
  aiContractActionValue(guild){
    const best=this.aiPickBestOption(guild,this.state.boardContracts.map(contract=>this.aiContractPlacementOption(guild,contract)).filter(Boolean));
    return best?{type:'contract',value:best.value,choice:best}:null;
  }
  aiRestChance(guild,mode=this.aiStrategicMode(guild)){
    const base=this.aiProfileValue(guild,'restChance',0.55);
    if(mode.desperate&&this.activeWorkers(guild).length<4)return base*0.55;
    if(mode.rebuilding)return base*0.85;
    return base;
  }

  // UI helpers for browser AI turn indicator.
  showAiThinking(guild=null,detail='thinking...'){
    try{
      if(typeof document==='undefined') return;
      const active=guild||this.state.guilds.find(g=>g.id===this.state.activeGuildId);
      const name=active?.name||'AI';
      this._aiThinkingName=name;
      if(!this._aiThinkingEl){
        const el = this.ui.aiThinking || document.getElementById('aiThinking');
        if(!el)return;
        this._aiThinkingEl = el;
      }
      this._aiThinkingEl.classList.remove('closed');
      this._aiThinkingToken = (this._aiThinkingToken||0)+1;
      this._aiThinkingShownAt = performance.now();
      this.setAiThinkingDetail(detail);
    }catch(e){console.warn('showAiThinking failed',e);}    
  }

  setAiThinkingDetail(detail='thinking...'){
    try{
      if(!this._aiThinkingEl)return;
      const copy=this._aiThinkingEl.querySelector('.ai-thinking-copy');
      if(copy)copy.textContent=`${this._aiThinkingName||'AI'} ${detail}`;
    }catch(e){console.warn('setAiThinkingDetail failed',e);}
  }

  hideAiThinking(){
    try{
      if(!this._aiThinkingEl) return;
      const token=this._aiThinkingToken;
      const elapsed=performance.now()-(this._aiThinkingShownAt||0);
      const remove=()=>{
        if(token!==this._aiThinkingToken||!this._aiThinkingEl)return;
        this._aiThinkingEl.classList.add('closed');
      };
      const wait=Math.max(0,900-elapsed);
      if(wait)setTimeout(remove,wait);
      else remove();
    }catch(e){console.warn('hideAiThinking failed',e);}    
  }
  aiFacilityChance(guild,mode=this.aiStrategicMode(guild)){
    const base=this.aiProfileValue(guild,'facilityChance',0.35);
    if(mode.desperate)return Math.min(base,0.12);
    if(mode.startup)return Math.min(base,0.22);
    if(mode.behind)return Math.min(base,0.24);
    return base;
  }
  async aiCatchUpRecruit(guild,target){
    let hired=0;
    if(guild.hiredThisSeason)return hired;
    while(this.activeWorkers(guild).length<target&&this.activeWorkers(guild).length<this.guildRosterCap()){
      if(!this.state.tavern.some(c=>!c.refusesGuildIds.includes(guild.id)))this.refillTavern(this.state.tavern.length+4);
      let affordable=this.state.tavern.filter(c=>!c.refusesGuildIds.includes(guild.id)&&this.canRecruit(guild,c));
      if(!affordable.length&&this.aiStrategicMode(guild).rebuilding&&this.state.tavern.length<14){
        this.refillTavern(this.state.tavern.length+3);
        affordable=this.state.tavern.filter(c=>!c.refusesGuildIds.includes(guild.id)&&this.canRecruit(guild,c));
      }
      if(!affordable.length)break;
      let c=this.chooseRecruit(guild,affordable);
      if(!c) break;
      if(!this.hire(guild,c,false))break;
      this.log(guild,'recruit',`${guild.name} recruited ${c.name}.`);
      this.recordAiActivity(guild,'recruit',`Recruited ${c.name}`,`${c.archetype}, ${this.characterSalary(c)}g upkeep`);
      this.setAiThinkingDetail(`recruited ${c.name}`);
      this.render();
      await this.aiVisualPause();
      hired++;
      break;
    }
    return hired;
  }
  async aiEmergencyRecruit(guild){
    if(guild.hiredThisSeason||this.activeWorkers(guild).length>=this.guildRosterCap())return false;
    const eligible=()=>this.state.tavern.filter(c=>!c.refusesGuildIds.includes(guild.id)&&this.reputationRequirement(c)===0&&this.characterSalary(c)<=2);
    let candidates=eligible();
    if(!candidates.length&&this.state.tavern.length<14){
      this.refillTavern(this.state.tavern.length+4);
      candidates=eligible();
    }
    let pick=this.chooseRecruit(guild,candidates);
    if(!pick)return false;
    this.hire(guild,pick,false,0,{sponsored:true});
    this.log(guild,'recruit',`${guild.name} took on ${pick.name} with deferred pay to rebuild.`);
    this.recordAiActivity(guild,'recruit',`Recruited ${pick.name}`,'deferred pay');
    this.setAiThinkingDetail(`recruited ${pick.name}`);
    this.render();
    await this.aiVisualPause();
    return true;
  }
  aiLocalRecoveryWork(guild){
    const workers=this.availableWorkers(guild).slice(0,Math.max(1,Math.min(2,this.availableWorkers(guild).length)));
    if(!workers.length)return false;
    const gold=4+workers.length*3;
    const rep=guild.reputation<10?2:1;
    guild.gold+=gold;
    guild.reputation+=rep;
    this.log(guild,'operate',`${guild.name} worked local recovery jobs with ${workers.map(c=>c.name).join(', ')}. +${gold} gold, +${rep} reputation.`);
    this.recordAiActivity(guild,'operate','Worked local jobs',`${workers.map(c=>c.name).join(' + ')}: +${gold}g, +${rep} rep`);
    return true;
  }

  resolveAIPlacements(guild){
    this.resolveFacilities(guild);
    this.clearFacilityPlacements(guild);
  }

  async aiPlaceFacility(guild,firstChoice=null){
    const mode=this.aiStrategicMode(guild);
    const laneBuild=this.aiLaneNeed(guild,'resources')+this.aiLaneNeed(guild,'connections')+this.aiLaneNeed(guild,'gold')>3.6;
    const target=Math.min(mode.rebuilding&&!laneBuild?1:this.aiProfileValue(guild,'facilityWorkers',2),this.availableWorkers(guild).length);
    const placed=[];
    while(placed.length<target){
      let choice=firstChoice;
      firstChoice=null;
      if(!choice){
        const worker=this.chooseFacilityWorker(guild);
        if(!worker)break;
        const facility=this.chooseFacility(guild,worker);
        if(!facility)break;
        if(this.facilityWorkers(guild,facility.key,'work').length>=this.facilitySlotCount(guild,facility))break;
        choice = {worker, facility};
      }
      if(!choice)break;
      choice.worker.placement={type:'facility',id:choice.facility.key,mode:'work'};
      placed.push(`${choice.worker.name} to the ${choice.facility.label}`);
      this.recordAiActivity(guild,'train',`Sent ${choice.worker.name}`,choice.facility.label);
      this.setAiThinkingDetail(`sent ${choice.worker.name} to ${choice.facility.label}`);
      this.render();
      await this.aiVisualPause();
      if(Math.random()>0.65)break;
    }
    if(!placed.length)return false;
    this.log(guild,'train',`${guild.name} assigned ${placed.join(', ')}.`);
    return true;
  }
  chooseFacilityWorker(guild){
    return [...this.availableWorkers(guild)].sort((a,b)=>this.workerFacilityNeed(b,guild)-this.workerFacilityNeed(a,guild))[0]||null;
  }
  workerFacilityNeed(worker,guild){
    const profileFit=this.aiFlavorScore(guild,this.visibleTraits(worker))*4;
    const trainNeed=Math.max(0,this.maxTraits()-(worker.traits?.length||0))*6;
    return trainNeed+profileFit+this.aiWorkerLaneValue(guild,worker)*0.45+Math.random()*5;
  }
  chooseFacility(guild,worker){
    const prefs=guild.personality?.preferredTags||[];
    return [...this.data.contractParts.facilities]
      .filter(f=>this.facilityHasOpenSlot(guild,f,worker))
      .sort((a,b)=>this.facilityValue(guild,worker,b,prefs)-this.facilityValue(guild,worker,a,prefs))[0];
  }
  facilityHasOpenSlot(guild,facility,worker=null){
    return this.facilitySlotCount(guild,facility)>this.facilityWorkers(guild,facility.key,'work').length;
  }
  aiFacilityPlacementOptions(guild){
    const options=[];
    for(const worker of this.availableWorkers(guild)){
      for(const facility of this.data.contractParts.facilities){
        if(!this.facilityHasOpenSlot(guild,facility,worker))continue;
        const value=this.facilityValue(guild,worker,facility,guild.personality?.preferredTags||[]);
        if(value>0)options.push({worker,facility,value});
      }
    }
    return options;
  }
  facilityValue(guild,worker,facility,prefs=[]){
    const train=(facility.traits||[]).filter(t=>!this.visibleTraits(worker).includes(t)).length*4;
    const flavor=(facility.traits||[]).filter(t=>prefs.includes(t)).length*8;
    const priorities=guild.personality?.facilityPriorities||[];
    const supportOnly=facility.key==='archives';
    const priorityScale=supportOnly&&this.state.year>4?0.45:1;
    const priority=priorities.includes(facility.key)?(priorities.length-priorities.indexOf(facility.key))*12*priorityScale:0;
    const activation=this.workerTraitEffects(worker,'facilityResolve').filter(effect=>this.effectMatchesContract(effect,null,{guild,worker,facility,mode:'work'})).length*12;
    const support=this.state.boardContracts.reduce((sum,contract)=>sum+this.workerTraitEffects(worker,'facilitySupport').filter(effect=>this.effectMatchesContract(effect,contract,{guild,worker,facility,mode:'work',team:this.chooseBestTeam(guild,contract)})).reduce((s,effect)=>s+(effect.amount||0),0),0);
    const trainingSupport=this.facilityTrainingSupportTraitEffectScore(guild,worker,facility);
    const outgoingTraining=this.workerTraitEffects(worker,'facilityTrainingSupport').filter(effect=>this.effectMatchesContract(effect,null,{guild,worker,facility,mode:'work'})).length*8;
    const production=this.concurrentFacilityProductionRule(guild,facility,this.patronAdjustedFacilityProductionRule(guild,facility,this.facilityProductionRule(worker,facility)));
    const readyExploit=this.facilityReadyCount(guild,facility.key)?this.aiProductionValue(guild,production)*1.45:0;
    const readySetup=this.facilitySetupRules().filter(rule=>rule.facility===facility.key&&this.workerHasAny(worker,rule.tags)).reduce((sum,rule)=>sum+rule.targets.reduce((targetSum,target)=>targetSum+this.aiFacilityLaneDemand(guild,target),0),0);
    const doneNeed=this.aiLaneNeed(guild,'completed');
    const contractSetup=(facility.key==='scout'&&this.workerHasAny(worker,['Scout','Outrider','Courier','Forester','Hunter','Watchful','Curious'])?14*doneNeed:0)+(facility.key==='archives'&&this.workerHasAny(worker,['Scholar','Learned','Tutor','Clerk','Scribe','Careful','Curious'])?18*doneNeed:0);
    const productionPotential=this.aiProductionValue(guild,production)*0.5;
    const concurrentSetup=this.concurrentFacilitySetupValue(guild,facility);
    return train+flavor+priority+activation+support+trainingSupport+outgoingTraining+readyExploit+readySetup+contractSetup+productionPotential+concurrentSetup+Math.random()*5;
  }

  guildNeedsRest(guild){return this.availableWorkers(guild).some(c=>c.conditions?.some(condition=>this.conditionDef(condition.key)?.recoveryPerRest>0));}
  restGuild(guild){
    const rested=[];
    const candidates=[...this.availableWorkers(guild)]
      .filter(c=>c.conditions?.some(condition=>this.conditionDef(condition.key)?.recoveryPerRest>0))
      .sort((a,b)=>this.conditionPenalty(b)-this.conditionPenalty(a))
      .slice(0,this.recoverySlotCount());
    for(const c of candidates){
      const recovered=this.recoverCharacter(c);
      if(recovered.length) rested.push(c.name);
    }
    this.recordAiActivity(guild,'rest','Rested mercenaries',rested.join(' + ')||'no recovery');
    return rested.length?`${guild.name} rested ${rested.join(', ')}.`:`${guild.name} rested, but no available conditions improved.`;
  }
  recoverCharacter(c){
    const recovered=[];
    c.conditions=(c.conditions||[]).map(condition=>{
      const def=this.conditionDef(condition.key);
      if(!def?.recoveryPerRest||condition.remaining===null)return condition;
      const next=Math.max(0,condition.remaining-def.recoveryPerRest);
      if(next===0)recovered.push(condition.key);
      return {...condition,remaining:next};
    }).filter(condition=>condition.remaining===null||condition.remaining>0);
    return recovered;
  }
  resolveRecovery(guild){
    let count=0;
    for(const worker of this.recoveryWorkers(guild)){
      const recovered=this.recoverCharacter(worker);
      if(recovered.length)this.log(guild,'rest',`${worker.name} recovered from ${recovered.join(', ')}.`);
      else this.log(guild,'rest',`${worker.name} rested, but had no recoverable condition.`);
      worker.placement=null;
      count++;
    }
    return count;
  }
  resolveFacilities(guild){
    let count=0;
    const placements=[];
    for(const facility of this.data.contractParts.facilities){
      for(const worker of this.facilityWorkers(guild,facility.key)){
        placements.push({worker,facility});
      }
    }
    for(const {worker,facility} of placements)this.applyFacilityReadinessWork(guild,worker,facility);
    for(const {worker,facility} of placements){this.resolveFacilityWorker(guild,worker,facility);count++;}
    return count;
  }
  clearFacilityPlacements(guild){
    for(const worker of guild.roster.filter(c=>c.placement?.type==='facility'))worker.placement=null;
  }
  resolveFacilityWorker(guild,worker,facility){
    this.applyReadyFacilityProduction(guild,worker,facility);
    this.applyFacilityTraitEffects(guild,worker,facility,[]);
    const pool=[...(facility.traits||[])];
    if((facility.rareTraits||[]).length&&Math.random()<(facility.rareChance??0.12))pool.push(...facility.rareTraits);
    const candidates=pool.filter(t=>!worker.traits.includes(t));
    const support=this.facilityTrainingSupportTraitEffectScore(guild,worker,facility);
    const trainChance=this.facilityTrainingChance(guild,worker,facility);
    if(support>0)this.log(guild,'good',`${worker.name}'s training at the ${facility.label} gained +${support}% support from other facilities.`);
    if(candidates.length&&Math.random()*100<trainChance){
      const trait=this.pick(candidates);
      this.awardFacilityTrait(guild,worker,facility,trait);
    } else {
      this.log(guild,'train',`${worker.name} trained at the ${facility.label}, but gained no new trait.`);
    }
  }
  facilityTrainingChance(guild,worker,facility){
    const assist=this.workerTraitEffects(worker,'facilityWork').filter(effect=>effect.type==='trainingAssist'&&this.effectMatchesContract(effect,null,{worker,facility,mode:worker.placement?.mode})).reduce((sum,effect)=>sum+(effect.amount||0),0);
    const support=this.facilityTrainingSupportTraitEffectScore(guild,worker,facility);
    const planned=this.facilityPlanningApplies(guild,facility)?(this.consumeFacilityTrainingPlan(guild,facility.key,`${worker.name} at the ${facility.label}`)?10:0):0;
    return this.clamp((facility.trainChance||0)+assist+support+planned+this.facilityTrainingPatronBonus(guild,facility),0,85);
  }
  applyFacilityReadinessWork(guild,worker,facility){
    if(facility.key==='scout'&&this.workerHasAny(worker,['Scout','Outrider','Courier','Forester','Hunter','Watchful','Curious'])){
      const contract=this.readinessTargetContract(guild,'scouted');
      if(contract)this.addContractReadiness(guild,contract,'scouted',1,4,`${worker.name} at the ${facility.label}`);
    }
    if(facility.key==='archives'&&this.workerHasAny(worker,['Scholar','Learned','Tutor','Clerk','Scribe','Careful','Curious'])){
      const contract=this.readinessTargetContract(guild,'planned');
      if(contract)this.addContractReadiness(guild,contract,'planned',1,1,`${worker.name} at the ${facility.label}`);
      const focusedFacility=this.readinessTargetFacility(guild);
      if(focusedFacility)this.addFacilityTrainingPlan(guild,focusedFacility.key,`${worker.name} at the ${facility.label}`);
    }
    for(const rule of this.facilitySetupRules()){
      if(rule.facility!==facility.key||!this.workerHasAny(worker,rule.tags))continue;
      const target=this.readyFacilityTarget(guild,rule.targets);
      if(target)this.addFacilityReady(guild,target,rule.amount||1,rule.max||3,`${worker.name} at the ${facility.label}`);
    }
  }
  facilitySetupRules(){
    return [
      {facility:'archives',tags:['Scholar','Learned','Tutor','Clerk','Scribe','Careful','Curious'],targets:['workshop','market','training','scout','chapel'],amount:1,max:3},
      {facility:'workshop',tags:['Craftsman','Smith','Blacksmith','Armorer','Carpenter','Mason','Miner','Stonecutter','Inventive','Practical'],targets:['market','training','scout'],amount:1,max:3},
      {facility:'market',tags:['Merchant','Connected','Shrewd','Diplomat','Tax Collector','Innkeeper','Influential','Noble'],targets:['chapel','common','archives'],amount:1,max:3},
      {facility:'scout',tags:['Scout','Outrider','Courier','Forester','Hunter','Watchful','Resourceful'],targets:['training','market','workshop'],amount:1,max:3},
      {facility:'chapel',tags:['Monk','Faithful','Compassionate','Honest','Influential','Noble','Patient'],targets:['common','market','infirmary'],amount:1,max:3},
      {facility:'infirmary',tags:['Physician','Chirurgeon','Apothecary','Herbalist','Healer','Patient','Compassionate'],targets:['training','scout','workshop'],amount:1,max:3},
      {facility:'common',tags:['Cook','Innkeeper','Generous','Honest','Seasoned','Patient','Resourceful'],targets:['training','workshop','chapel','market'],amount:1,max:3},
      {facility:'training',tags:['Soldier','Veteran','Warden','Battlewise','Fearless','Strong','Armorer'],targets:['scout','chapel','workshop'],amount:1,max:3}
    ];
  }
  readyFacilityTarget(guild,targets=[]){
    const readable=targets.filter(key=>this.facilityDef(key));
    return readable.sort((a,b)=>this.facilityReadyCount(guild,a)-this.facilityReadyCount(guild,b))[0]||null;
  }
  readinessTargetFacility(guild){
    if(!this.isLocalGuild(guild))return null;
    return this.facilityDef(this.state.focusFacilityKey)||null;
  }
  facilityPlanningApplies(guild,facility){
    return this.isLocalGuild(guild)&&this.state.focusFacilityKey===facility?.key;
  }
  facilityReadyCount(guild,facilityKey){return guild.facilityReadiness?.[facilityKey]?.ready||0;}
  facilityTrainingPlanCount(guild,facilityKey){return guild.facilityReadiness?.[facilityKey]?.plannedTraining||0;}
  addFacilityTrainingPlan(guild,facilityKey,source='Archives planning'){
    guild.facilityReadiness=guild.facilityReadiness||{};
    const current={...(guild.facilityReadiness[facilityKey]||{})};
    const before=current.plannedTraining||0;
    current.plannedTraining=Math.min(1,before+1);
    guild.facilityReadiness[facilityKey]=current;
    if(current.plannedTraining!==before){
      const facility=this.facilityDef(facilityKey);
      this.log(guild,'good',`${source} planned training at the ${facility?.label||facilityKey}. Next training roll there gains +10%.`);
    }
  }
  consumeFacilityTrainingPlan(guild,facilityKey,source='Facility training'){
    const current=guild.facilityReadiness?.[facilityKey];
    if(!current?.plannedTraining)return false;
    current.plannedTraining--;
    if(current.plannedTraining<=0)delete current.plannedTraining;
    const facility=this.facilityDef(facilityKey);
    this.log(guild,'good',`${source} used Planned training at the ${facility?.label||facilityKey}. Training chance +10%.`);
    return true;
  }
  addFacilityReady(guild,facilityKey,amount=1,max=3,source='Facility work'){
    guild.facilityReadiness=guild.facilityReadiness||{};
    const current={...(guild.facilityReadiness[facilityKey]||{})};
    const before=current.ready||0;
    current.ready=Math.min(max,before+amount);
    guild.facilityReadiness[facilityKey]=current;
    if(current.ready!==before){
      const facility=this.facilityDef(facilityKey);
      this.log(guild,'good',`${source} readied the ${facility?.label||facilityKey}. Ready ${current.ready}/${max}.`);
    }
  }
  consumeFacilityReady(guild,facilityKey,source='Facility work'){
    const current=guild.facilityReadiness?.[facilityKey];
    if(!current?.ready)return false;
    current.ready--;
    if(current.ready<=0)delete current.ready;
    const facility=this.facilityDef(facilityKey);
    this.log(guild,'good',`${source} used Ready at the ${facility?.label||facilityKey}.`);
    return true;
  }
  applyReadyFacilityProduction(guild,worker,facility){
    const baseRule=this.facilityProductionRule(worker,facility);
    const rule=this.concurrentFacilityProductionRule(guild,facility,this.patronAdjustedFacilityProductionRule(guild,facility,baseRule));
    if(!rule||!this.facilityReadyCount(guild,facility.key))return false;
    const source=`${worker.name} at the ${facility.label}`;
    if(!this.consumeFacilityReady(guild,facility.key,source))return false;
    if(rule.gold)this.gainGuildStat(guild,'gold',rule.gold,null,source);
    if(rule.reputation)this.gainGuildStat(guild,'reputation',rule.reputation,null,source);
    if(rule.resources)this.gainGuildStat(guild,'resources',rule.resources,null,source);
    if(rule.connections)this.gainGuildStat(guild,'connections',rule.connections,null,source);
    if(rule.completed)this.gainGuildStat(guild,'completed',rule.completed,null,source);
    if(rule.recover)this.recoverFromGroup(guild,this.activeWorkers(guild),rule.recover,1,source);
    this.log(guild,'good',`${source} exploited a ready facility: ${this.facilityProductionText(rule)}.`);
    return true;
  }
  facilityProductionRule(worker,facility){
    const has=tags=>this.workerHasAny(worker,tags);
    const profession=tags=>tags.includes(worker.archetype);
    const rule={};
    if(facility.key==='workshop'&&profession(['Blacksmith','Armorer','Boatwright','Carpenter','Glassmaker','Mason','Miner','Stonecutter','Weaver'])){
      rule.resources=profession(['Blacksmith','Miner','Stonecutter','Mason'])?4:3;
      if(has(['Craftsman','Smith']))rule.resources+=1;
      if(has(['Inventive','Practical']))rule.gold=4;
    }
    if(facility.key==='market'){
      if(profession(['Merchant','Tax Collector','Innkeeper','Smuggler','Weaver']))rule.gold=profession(['Merchant','Tax Collector'])?22:16;
      if(profession(['Diplomat','Clerk','Bailiff','Innkeeper','Tax Collector']))rule.connections=profession(['Diplomat','Tax Collector'])?3:2;
      if((rule.gold||rule.connections)&&has(['Shrewd','Frugal']))rule.gold=(rule.gold||0)+4;
      if((rule.gold||rule.connections)&&has(['Connected','Influential','Noble']))rule.connections=(rule.connections||0)+1;
      if((rule.gold||rule.connections)&&has(['Influential','Noble','Honest']))rule.reputation=1;
    }
    if(facility.key==='chapel'&&profession(['Monk','Scribe','Tutor','Diplomat','Physician'])){
      rule.reputation=profession(['Monk','Diplomat'])?4:3;
      if(has(['Faithful','Compassionate','Generous','Honest']))rule.reputation+=1;
      if(has(['Connected','Influential']))rule.connections=1;
      rule.recover=['morale','trauma'];
    }
    if(facility.key==='common'&&profession(['Cook','Innkeeper','Tutor','Scribe','Merchant'])){
      rule.reputation=profession(['Innkeeper','Tutor'])?3:2;
      if(has(['Generous','Honest','Seasoned']))rule.reputation+=1;
      if(has(['Cook','Patient','Seasoned']))rule.recover=['strain','morale'];
    }
    if(facility.key==='training'&&profession(['Soldier','Warden','Armorer','Hunter','Outrider'])){
      rule.completed=1;
      if(profession(['Soldier','Warden'])||has(['Veteran','Battlewise']))rule.reputation=2;
    }
    if(facility.key==='scout'&&profession(['Courier','Forester','Hunter','Outrider','Sailor','Smuggler'])){
      rule.connections=profession(['Courier','Outrider','Smuggler'])?2:1;
      if(profession(['Hunter','Outrider','Forester'])||has(['Scout','Watchful']))rule.completed=1;
      if(has(['Curious','Resourceful']))rule.connections=(rule.connections||0)+1;
      if(has(['Rural','Resourceful','Hardy']))rule.resources=1;
    }
    if(facility.key==='archives'&&profession(['Clerk','Scribe','Tutor','Monk','Tax Collector','Bailiff'])){
      rule.connections=profession(['Clerk','Tutor','Tax Collector'])?2:1;
      rule.reputation=profession(['Scribe','Tutor','Monk'])?2:1;
      if(has(['Scholar','Learned','Careful']))rule.reputation+=1;
      if(has(['Curious']))rule.connections+=1;
    }
    if(facility.key==='infirmary'&&profession(['Physician','Chirurgeon','Apothecary','Herbalist'])){
      rule.reputation=profession(['Physician','Chirurgeon'])?3:2;
      if(has(['Healer','Patient','Compassionate']))rule.reputation+=1;
      rule.recover=['injury','strain'];
    }
    return Object.keys(rule).length?rule:null;
  }
  patronAdjustedFacilityProductionRule(guild,facility,rule){
    if(!rule||!this.facilityHasPatronTier(guild,facility.key,'training'))return rule;
    const adjusted={...rule};
    for(const patron of this.facilityPatrons(facility.key)){
      if(!this.patronProductionUnlocked(guild,facility,patron))continue;
      const bonus=this.patronProductionBonusRule(patron);
      for(const [stat,amount] of Object.entries(bonus))adjusted[stat]=(adjusted[stat]||0)+amount;
    }
    return adjusted;
  }
  concurrentFacilityProductionRule(guild,facility,rule){
    if(!rule)return rule;
    const adjusted={...rule};
    const hasWork=key=>key!==facility.key&&this.facilityWorkers(guild,key,'work').length>0;
    const pairedCount=keys=>keys.filter(hasWork).length;
    if(facility.key==='workshop'&&adjusted.resources)adjusted.resources+=Math.min(3,pairedCount(['archives','market','scout','common']));
    if(facility.key==='market'){
      if(adjusted.gold)adjusted.gold+=pairedCount(['archives','workshop','common','scout'])*3;
      if(adjusted.connections)adjusted.connections+=Math.min(3,pairedCount(['archives','common','scout','chapel']));
    }
    if(facility.key==='scout'){
      if(adjusted.connections)adjusted.connections+=Math.min(3,pairedCount(['archives','market','training','common']));
      if(adjusted.resources)adjusted.resources+=Math.min(2,pairedCount(['workshop','infirmary','common']));
    }
    if(['chapel','common','infirmary','archives'].includes(facility.key)&&adjusted.reputation){
      adjusted.reputation+=Math.min(3,pairedCount(['chapel','common','infirmary','archives']));
    }
    if(facility.key==='archives'&&adjusted.connections)adjusted.connections+=Math.min(2,pairedCount(['market','scout','common']));
    return adjusted;
  }
  concurrentFacilitySetupValue(guild,facility){
    if(facility.key==='archives'){
      const readyProduction=this.data.contractParts.facilities
        .filter(other=>other.key!=='archives'&&this.facilityReadyCount(guild,other.key))
        .reduce((sum,other)=>{
          const best=this.activeWorkers(guild).reduce((value,worker)=>Math.max(value,this.aiProductionValue(guild,this.patronAdjustedFacilityProductionRule(guild,other,this.facilityProductionRule(worker,other)))),0);
          return sum+best*0.16;
        },0);
      return readyProduction+12;
    }
    if(['workshop','market','scout','chapel','common','infirmary','archives'].some(key=>key!==facility.key&&this.facilityWorkers(guild,key,'work').length))return 8;
    return 0;
  }
  concurrentFacilityPartnerCount(guild,facility){
    return ['archives','workshop','market','scout','chapel','common','infirmary','training']
      .filter(key=>key!==facility.key&&this.facilityWorkers(guild,key,'work').length>0).length;
  }
  patronProductionFavorThreshold(patron){
    const thresholds=this.patronFavorThresholds();
    return thresholds.training;
  }
  patronProductionUnlocked(guild,facility,patron){
    const thresholds=this.patronFavorThresholds();
    const favor=this.patronFavor(guild,patron.key);
    if(favor<thresholds.training)return false;
    if(!['resources','connections'].includes(patron?.lane))return true;
    return favor>=thresholds.ally||this.concurrentFacilityPartnerCount(guild,facility)>0;
  }
  patronProductionUnlockText(patron){
    const thresholds=this.patronFavorThresholds();
    const bonus=this.facilityProductionText(this.patronProductionBonusRule(patron));
    if(['resources','connections'].includes(patron?.lane))return `Favor ${thresholds.training} plus concurrent supporting facility work, or Favor ${thresholds.ally} as an ally, adds ${bonus} when Ready production runs there.`;
    return `Favor ${thresholds.training}: adds ${bonus} when Ready production runs there.`;
  }
  patronProductionBonusRule(patron){
    const lane=patron?.lane;
    if(lane==='gold')return {gold:8};
    if(lane==='reputation')return {reputation:2};
    if(lane==='completed')return {completed:1};
    if(lane==='resources')return {resources:3};
    if(lane==='connections')return {connections:2};
    return {};
  }
  facilityProductionText(rule){
    const parts=[];
    if(rule.gold)parts.push(`+${rule.gold} Gold`);
    if(rule.reputation)parts.push(`+${rule.reputation} Rep`);
    if(rule.completed)parts.push(`+${rule.completed} Done`);
    if(rule.resources)parts.push(`+${rule.resources} Res`);
    if(rule.connections)parts.push(`+${rule.connections} Conn`);
    if(rule.recover)parts.push(`recover ${this.formatList(rule.recover)}`);
    return parts.join(', ');
  }
  readinessTargetContract(guild,mark){
    const focused=this.isLocalGuild(guild)?this.state.boardContracts.find(c=>c.instanceId===this.state.focusContractId):null;
    if(focused&&this.contractCanGainReadiness(guild,focused,mark))return focused;
    if(mark==='planned')return null;
    return this.state.boardContracts
      .filter(contract=>this.contractCanGainReadiness(guild,contract,mark))
      .sort((a,b)=>this.contractValue(guild,b)-this.contractValue(guild,a))[0]||null;
  }
  contractCanGainReadiness(guild,contract,mark){
    if(!contract||contract.offerSeasons<=0&&!this.hasContractPlacements(contract))return false;
    const readiness=this.contractReadiness(guild,contract);
    if(mark==='scouted')return (readiness.scouted||0)<4;
    if(mark==='planned')return !readiness.planned;
    return true;
  }
  addContractReadiness(guild,contract,mark,amount=1,max=1,source='Facility work'){
    contract.readiness=contract.readiness||{};
    const current={...(contract.readiness[guild.id]||{})};
    const before=current[mark]||0;
    current[mark]=Math.min(max,before+amount);
    contract.readiness[guild.id]=current;
    if(current[mark]!==before){
      const label=mark==='scouted'?'Scouted':'Planned';
      const bonus=mark==='scouted'?`${current[mark]*5}%`:'10%';
      this.log(guild,'good',`${source} marked "${contract.title}" as ${label}. Contract readiness now adds ${bonus}.`);
    }
  }
  applyFacilityTraitEffects(guild,worker,facility,recovered=[]){
    for(const effect of this.workerTraitEffects(worker,'facilityResolve')){
      if(!this.effectMatchesContract(effect,null,{guild,worker,facility,mode:worker.placement?.mode,recovered}))continue;
      const source=`${worker.name}'s ${effect.trait}`;
      if(effect.type==='gainGuild')this.gainGuildStat(guild,effect.stat,effect.amount||1,effect.cap,source);
      if(effect.type==='goldPerAssignedContractMerc'){
        const amount=(effect.amount||1)*this.assignedContractMercCount(guild);
        this.gainGuildStat(guild,'gold',amount,null,source);
      }
      if(effect.type==='statPerAssignedContractMerc'){
        const amount=(effect.amount||1)*this.assignedContractMercCount(guild);
        this.gainGuildStat(guild,effect.stat,amount,effect.cap,source);
      }
      if(effect.type==='revealRosterTrait')this.revealHiddenTraitFrom(guild,this.activeWorkers(guild),source);
      if(effect.type==='revealTavernTrait')this.revealHiddenTraitFrom(guild,this.state.tavern,source);
      if(effect.type==='recoverGuild')this.recoverFromGroup(guild,this.activeWorkers(guild),effect.kinds,effect.amount||1,source);
      if(effect.type==='recoverSelf')this.recoverFromGroup(guild,[worker],effect.kinds,effect.amount||1,source);
    }
  }
  awardFacilityTrait(guild,worker,facility,trait){
    if(worker.traits.length<this.maxTraits()){
      worker.traits.push(trait);
      this.revealTrait(worker,trait);
      worker.history.push(`Year ${this.state.year}: gained ${trait} at the ${facility.label}.`);
      this.log(guild,'good',`${worker.name} gained ${trait} at the ${facility.label}.`);
      return;
    }
    const removable=worker.traits.filter(t=>t!==worker.archetype);
    if(!removable.length){this.log(guild,'train',`${worker.name} could not replace their profession with ${trait}.`);return;}
    if(this.isLocalGuild(guild)){
      this.state.pendingTraitChoice={guild,worker,facility,trait};
      this.openTraitChoice(this.state.pendingTraitChoice);
      return;
    }
    const oldTrait=this.chooseTraitToReplace(guild,worker,trait,removable);
    if(!oldTrait){this.log(guild,'train',`${worker.name} kept their current traits instead of learning ${trait}.`);return;}
    this.replaceTrait(worker,oldTrait,trait);
    worker.history.push(`Year ${this.state.year}: replaced ${oldTrait} with ${trait} at the ${facility.label}.`);
    this.log(guild,'good',`${worker.name} replaced ${oldTrait} with ${trait}.`);
  }
  chooseTraitToReplace(guild,worker,newTrait,removable){
    const targets=this.state.boardContracts.length?this.state.boardContracts:[];
    const score=tag=>this.aiFlavorScore(guild,[tag])*12+targets.reduce((s,c)=>s+this.affinityScoreForTraits([tag],c)+this.explicitContractScore([tag],c),0);
    const worst=[...removable].sort((a,b)=>score(a)-score(b))[0];
    return score(newTrait)>score(worst)?worst:null;
  }
  chooseRecruit(guild,arr=this.state.tavern){
    const target=[...this.state.boardContracts].sort((a,b)=>this.contractValue(guild,b)-this.contractValue(guild,a))[0];
    return [...arr].sort((a,b)=>this.recruitValue(guild,b,target)-this.recruitValue(guild,a,target))[0]||null;
  }
  recruitValue(guild,c,target){
    const traits=this.visibleTraits(c);
    const mode=this.aiStrategicMode(guild);
    const profileFit=this.aiFlavorScore(guild,traits)*(mode.rebuilding?5:12);
    const targetFit=target?this.characterFit(c,target):0;
    const boardFit=this.state.boardContracts.reduce((best,contract)=>Math.max(best,this.characterFit(c,contract)),0);
    const surfaceFit=this.state.boardContracts.reduce((best,contract)=>{
      const claimant=this.contractClaimant(contract);
      const posture=claimant&&claimant.id!==guild.id?'compete':'claim';
      return Math.max(best,this.aiTraitSurfaceValue(guild,contract,[c],posture),this.aiTraitSurfaceValue(guild,contract,[c],'cooperate'));
    },0);
    const cheapStarter=mode.rebuilding&&(this.reputationRequirement(c)===0?10:0)+(this.characterSalary(c)<=2?4:0);
    const professionDemand=this.state.boardContracts.some(contract=>contract.requirements.some(req=>req.trait===c.archetype))?7:0;
    const laneFit=this.aiWorkerLaneValue(guild,c);
    return targetFit+surfaceFit*.8+profileFit+laneFit*0.65+traits.length*2+c.connections*this.aiLaneNeed(guild,'connections')*5+c.resources*this.aiLaneNeed(guild,'resources')*5-this.recruitCost(guild,c)/3+(mode.rebuilding?boardFit*0.45+cheapStarter+professionDemand:0);
  }

  weightedPick(options){const total=options.reduce((s,o)=>s+o.weight,0);let r=Math.random()*total;return (options.find(o=>(r-=o.weight)<=0)||options[0])?.item||null;}
  hire(guild,c,free,cost=null,{sponsored=false}={}){
    if(!c)return false;
    if(!free&&this.activeWorkers(guild).length>=this.guildRosterCap())return false;
    if(!free&&!sponsored&&this.recruitBlockReason(guild,c))return false;
    const s=this.getStatus(c.status);
    if(!free&&!sponsored){guild.gold-=cost??this.recruitCost(guild,c);}else if(free&&guild.roster.length===0){guild.gold=s.startingGold;}
    guild.roster.push(c);
    this.addMercCapacity(guild,c);
    this.state.tavern=this.state.tavern.filter(x=>x!==c);
    if(!free||sponsored)guild.hiredThisSeason=true;
    c.revealAfterSeason=this.isLocalGuild(guild)&&(!free||guild.roster.length>1);
    if(this.isAiGuild(guild))this.revealAllTraits(c,'for AI planning');
    c.history.push(`Year ${this.state.year}: joined ${guild.name}.`);
    return true;
  }
  hireFromTavern(characterId){
    const guild=this.activeLocalGuild();
    const c=this.state.tavern.find(x=>x.id===characterId);
    if(!c||this.state.phase!=='awaitHuman')return false;
    const blocked=this.recruitBlockReason(guild,c);
    if(blocked){this.log(guild,'bad',blocked);this.render();return false;}
    const cost=this.recruitCost(guild,c);
    this.hire(guild,c,false,cost);
    const hidden=this.hiddenTraitCount(c);
    this.log(guild,'recruit',`${guild.name} recruited ${c.name} for ${cost} gold. ${hidden?`${hidden} secondary trait${hidden===1?' is':'s are'} still unknown.`:'They have no secondary traits yet.'}`);
    this.render();
    return true;
  }
  recruitCost(guild,c){
    const base=this.baseRecruitCost(c);
    const discount=this.availableWorkers(guild).flatMap(worker=>this.workerTraitEffects(worker,'recruitCost').filter(effect=>this.effectMatchesContract(effect,null,{guild,worker}))).filter(effect=>effect.type==='discount').reduce((sum,effect)=>sum+(effect.amount||0),0);
    return Math.max(0,base-discount);
  }
  reputationRequirement(c){return ({professional:10,gentry:25,noble:50})[c.status]||0;}
  recruitBlockReason(guild,c){
    if(guild.hiredThisSeason)return `${guild.name} has already hired a mercenary this season.`;
    if(this.activeWorkers(guild).length>=this.guildRosterCap())return `${guild.name} is at its ${this.guildRosterCap()} mercenary capacity.`;
    const required=this.reputationRequirement(c);
    if(guild.reputation<required)return `${c.name} requires ${required} reputation. ${guild.name} has ${guild.reputation}.`;
    const cost=this.recruitCost(guild,c);
    if(guild.gold<cost)return `${guild.name} could not afford ${c.name}.`;
    return '';
  }
  canRecruit(guild,c){return !this.recruitBlockReason(guild,c);}
  severanceCost(c){return Math.max(5,this.baseRecruitCost(c)+this.characterSalary(c)*2);}
  dismissalReputationPenalty(){return 5;}
  releaseMerc(characterId,mode='paid'){
    const guild=this.activeLocalGuild();
    if(this.state.phase!=='awaitHuman'||this.state.humanActionUsed)return false;
    const worker=guild.roster.find(c=>c.id===characterId);
    if(!worker||!worker.alive)return false;
    if(this.isLockedPlacement(worker,guild)){this.log(guild,'bad',`${worker.name} is committed to contract work and cannot be dismissed right now.`);this.render();return false;}
    if(this.activeWorkers(guild).length<=1){this.log(guild,'bad',`${guild.name} cannot dismiss its last active mercenary.`);this.render();return false;}
    const paid=mode==='paid';
    const severance=this.severanceCost(worker);
    if(paid&&guild.gold<severance){this.log(guild,'bad',`${guild.name} needs ${severance} gold to release ${worker.name} honorably.`);this.render();return false;}
    this.unplaceWorker(worker,guild,true);
    if(paid)guild.gold-=severance;
    else{
      const penalty=this.dismissalReputationPenalty(worker);
      guild.reputation=Math.max(0,guild.reputation-penalty);
      if(!worker.refusesGuildIds.includes(guild.id))worker.refusesGuildIds.push(guild.id);
    }
    this.removeMercCapacity(guild,worker);
    guild.roster=guild.roster.filter(c=>c!==worker);
    worker.placement=null;
    this.state.tavern.push(worker);
    worker.history.push(`Year ${this.state.year}: left ${guild.name}${paid?' with severance':' after a cold dismissal'}.`);
    this.log(guild,paid?'recruit':'bad',paid?`${guild.name} released ${worker.name} honorably for ${severance} gold.`:`${guild.name} dismissed ${worker.name} without severance. Reputation -${this.dismissalReputationPenalty(worker)}.`);
    this.closeCharacterPanel();
    this.render();
    return true;
  }
  guildRosterCap(){return this.data.contractParts.settings.guildRosterCap||6;}

  resolveSeasonContracts(){
    const contracts=this.state.boardContracts.filter(contract=>this.hasContractPlacements(contract));
    for(const contract of contracts)this.resolveSharedBoardContract(contract);
  }
  resolveSharedBoardContract(contract){
    const claimant=this.contractClaimant(contract);
    if(!claimant)return null;
    const progress=this.ensureSharedContractProgress(contract);
    const participants=this.contractParticipantGuilds(contract);
    progress.remaining=Math.max(0,progress.remaining-1);
    for(const guild of participants){
      const team=this.placedTeam(guild,contract);
      this.applyContractProgressTraitEffects(guild,contract,team,progress);
    }
    if(progress.remaining>0){
      this.log(claimant,'contract',`${claimant.name}'s claim on "${contract.title}" advanced. ${progress.remaining} season(s) remain.`);
      return 'progress';
    }
    const competitors=participants.filter(guild=>guild.id!==claimant.id&&this.contractPosture(contract,guild)==='compete');
    if(competitors.length)return this.resolveContestedContract(contract,claimant,competitors);
    return this.resolveCooperativeContract(contract,claimant,participants);
  }
  ensureSharedContractProgress(contract){
    contract.sharedProgress=contract.sharedProgress||{remaining:contract.workSeasons||1,total:contract.workSeasons||1};
    return contract.sharedProgress;
  }
  contractParticipantGuilds(contract){
    return this.state.guilds.filter(guild=>this.placedTeam(guild,contract).length);
  }
  combinedContractTeam(contract,guilds){
    return guilds.flatMap(guild=>this.placedTeam(guild,contract));
  }
  contractContributionScore(guild,contract){
    const team=this.placedTeam(guild,contract);
    if(!team.length)return 0;
    return this.successChanceForTeam(guild,contract,team)+team.reduce((sum,worker)=>sum+Math.max(1,this.characterFit(worker,contract)),0)+team.length*8;
  }
  cooperativeSuccessChance(contract,claimant=this.contractClaimant(contract),participants=this.contractParticipantGuilds(contract)){
    if(!claimant)return null;
    const team=this.combinedContractTeam(contract,participants);
    if(!team.length)return null;
    return this.clamp(this.rawCooperativeSuccessChance(contract,claimant,participants,team),2,98);
  }
  rawCooperativeSuccessChance(contract,claimant,participants,team=this.combinedContractTeam(contract,participants)){
    const ownerRaw=this.rawSuccessChanceForTeam(claimant,contract,team);
    const allyBonus=participants.filter(guild=>guild.id!==claimant.id).reduce((sum,guild)=>{
      const resources=Math.min(guild.resources,contract.materials||0)*4;
      const connections=guild.connections;
      const readiness=this.contractReadinessBonus(guild,contract);
      return sum+resources+connections+readiness+this.cooperativeTraitBonus(guild,contract);
    },this.cooperativeTraitBonus(claimant,contract));
    return ownerRaw+allyBonus;
  }
  resolveCooperativeContract(contract,claimant,participants){
    const team=this.combinedContractTeam(contract,participants);
    const chance=this.cooperativeSuccessChance(contract,claimant,participants);
    const roll=Math.random()*100;
    if(roll<=chance||this.convertNearMiss(claimant,contract,team,roll,chance)){
      this.awardCooperativeContract(contract,claimant,participants,chance);
    }else{
      for(const guild of participants){
        guild.reputation=Math.max(0,guild.reputation-(guild.id===claimant.id?3:1));
        this.addPatronFavor(guild,contract,-1,'failed work');
        this.applyFailure(guild,contract);
      }
      this.log(claimant,'bad',`${claimant.name}'s cooperative push on "${contract.title}" failed at ${chance}% odds.`);
    }
    this.releaseAllContractPlacements(contract);
    return 'finished';
  }
  resolveContestedContract(contract,claimant,competitors){
    const contenders=[claimant,...competitors];
    const rolls=contenders.map(guild=>({guild,score:this.contractContributionScore(guild,contract)+this.contestTraitScore(guild,contract)+(guild.id===claimant.id?10:0)+Math.random()*50}));
    const winner=rolls.sort((a,b)=>b.score-a.score)[0].guild;
    const team=this.placedTeam(winner,contract);
    const chance=this.successChanceForTeam(winner,contract,team);
    const roll=Math.random()*100;
    if(roll<=chance||this.convertNearMiss(winner,contract,team,roll,chance)){
      this.awardPrimaryContract(contract,winner,chance,`won the contest for`);
      for(const guild of contenders.filter(g=>g.id!==winner.id)){
        guild.reputation=Math.max(0,guild.reputation-1);
        this.applyPatronContestReaction(guild,contract,false);
      }
    }else{
      for(const guild of contenders){
        guild.reputation=Math.max(0,guild.reputation-(guild.id===winner.id?3:1));
        this.addPatronFavor(guild,contract,guild.id===winner.id?-1:0,'failed contest');
      }
      this.applyFailure(winner,contract);
      this.log(winner,'bad',`${winner.name} won the contest for "${contract.title}" but failed the work at ${chance}% odds.`);
    }
    this.releaseAllContractPlacements(contract);
    return 'finished';
  }
  awardPrimaryContract(contract,guild,chance,verb='completed'){
    const team=this.placedTeam(guild,contract);
    const materials=Math.min(guild.resources,contract.materials||0);
    const facilitySupport=this.facilitySupportTraitEffectScore(guild,contract,team,materials);
    guild.gold+=contract.reward.gold;
    guild.reputation+=contract.reward.reputation;
    guild.completed++;
    guild.poolWins=guild.poolWins||{};
    guild.poolWins[contract.pool]=(guild.poolWins[contract.pool]||0)+1;
    this.applyContractWorldEffect(contract);
    this.log(guild,'good',`${guild.name} ${verb} "${contract.title}" at ${chance}% odds. +${contract.reward.gold} gold, +${contract.reward.reputation} reputation.`);
    this.addPatronFavor(guild,contract,verb.includes('contest')?2:3,verb.includes('contest')?'successful contest':'completed work');
    if(verb.includes('contest'))this.applyPatronContestReaction(guild,contract,true);
    if(facilitySupport>0)this.log(guild,'good',`${guild.name}'s facility engine added ${facilitySupport}% support to "${contract.title}".`);
    this.applyContractSuccessTraitEffects(guild,contract,team);
  }
  awardCooperativeContract(contract,claimant,participants,chance){
    const shares=this.cooperativeRewardShares(contract,claimant,participants);
    for(const {guild,share} of shares){
      const gold=Math.round(contract.reward.gold*share);
      const reputation=Math.round(contract.reward.reputation*share);
      guild.gold+=gold;
      guild.reputation+=reputation;
      if(guild.id===claimant.id){
        guild.completed++;
        guild.poolWins=guild.poolWins||{};
        guild.poolWins[contract.pool]=(guild.poolWins[contract.pool]||0)+1;
      }
      this.applyContractSuccessTraitEffects(guild,contract,this.placedTeam(guild,contract));
      this.addPatronFavor(guild,contract,guild.id===claimant.id?3:1,guild.id===claimant.id?'claimed completion':'successful cooperation');
      this.log(guild,'good',`${guild.name} earned ${Math.round(share*100)}% of "${contract.title}". +${gold} gold, +${reputation} reputation.`);
    }
    this.applyContractWorldEffect(contract);
    this.log(claimant,'good',`${claimant.name}'s cooperative claim completed "${contract.title}" at ${chance}% odds.`);
  }
  cooperativeRewardShares(contract,claimant,participants){
    const weights=participants.map(guild=>({guild,score:Math.max(1,this.contractContributionScore(guild,contract))}));
    const total=weights.reduce((sum,row)=>sum+row.score,0)||1;
    const claimantWeight=weights.find(row=>row.guild.id===claimant.id);
    if(!claimantWeight)return weights.map(({guild,score})=>({guild,share:score/total}));
    if(weights.length===1)return [{guild:claimant,share:1}];
    const claimantShare=Math.max(this.cooperativeClaimantShareForCount(weights.length),claimantWeight.score/total);
    const remainder=Math.max(0,1-claimantShare);
    const otherTotal=weights.filter(row=>row.guild.id!==claimant.id).reduce((sum,row)=>sum+row.score,0)||1;
    return weights.map(({guild,score})=>guild.id===claimant.id?{guild,share:claimantShare}:{guild,share:remainder*(score/otherTotal)});
  }
  cooperativeClaimantShareForCount(participantCount){
    if(participantCount<=1)return 1;
    if(participantCount===2)return this.clamp(this.data.contractParts.settings.cooperativeClaimantDuelShare??0.7,0,1);
    return this.clamp(1/(participantCount-1),0,1);
  }
  cooperativeRewardShareForGuild(contract,claimant,guild,participants=this.contractParticipantGuilds(contract)){
    return this.cooperativeRewardShares(contract,claimant,participants).find(row=>row.guild.id===guild.id)?.share||0;
  }
  convertNearMiss(guild,contract,team,roll,chance){
    const effects=team.flatMap(worker=>this.workerTraitEffects(worker,'contractFailure').filter(effect=>effect.type==='nearMissSuccess'&&this.effectMatchesContract(effect,contract,{guild,worker,team,role:this.workerContractRole(team,worker)})).map(effect=>({worker,effect})));
    for(const {worker,effect} of effects){
      if(roll-chance<=(effect.margin||0)&&Math.random()*100<(effect.chance||0)){
        this.log(guild,'good',`${worker.name}'s ${effect.trait} turned a near miss into a success.`);
        return true;
      }
    }
    return false;
  }
  applyContractSuccessTraitEffects(guild,contract,team){
    for(const worker of team){
      for(const effect of this.workerTraitEffects(worker,'contractSuccess')){
        if(!this.effectMatchesContract(effect,contract,{guild,worker,team,role:this.workerContractRole(team,worker)}))continue;
        if(effect.type==='gainGuild')this.gainGuildStat(guild,effect.stat,effect.amount||1,effect.cap,`${worker.name}'s ${effect.trait}`);
        if(effect.type==='recoverTeam')this.recoverFromGroup(guild,team,effect.kinds,effect.amount||1,`${worker.name}'s ${effect.trait}`);
        if(effect.type==='recoverGuild')this.recoverFromGroup(guild,this.activeWorkers(guild),effect.kinds,effect.amount||1,`${worker.name}'s ${effect.trait}`);
        if(effect.type==='recoverSelf')this.recoverFromGroup(guild,[worker],effect.kinds,effect.amount||1,`${worker.name}'s ${effect.trait}`);
        if(effect.type==='revealRosterTrait')this.revealHiddenTraitFrom(guild,this.activeWorkers(guild),`${worker.name}'s ${effect.trait}`);
        if(effect.type==='revealTavernTrait')this.revealHiddenTraitFrom(guild,this.state.tavern,`${worker.name}'s ${effect.trait}`);
      }
    }
  }
  applyContractProgressTraitEffects(guild,contract,team,progress){
    for(const worker of team){
      for(const effect of this.workerTraitEffects(worker,'contractProgress')){
        if(!this.effectMatchesContract(effect,contract,{guild,worker,team,role:this.workerContractRole(team,worker)}))continue;
        if(effect.type==='advanceWork'&&Math.random()*100<(effect.chance||100)){
          progress.remaining=Math.max(0,progress.remaining-(effect.amount||1));
          this.log(guild,'good',`${worker.name}'s ${effect.trait} advanced "${contract.title}" faster.`);
        }
        if(effect.type==='recoverTeam')this.recoverFromGroup(guild,team,effect.kinds,effect.amount||1,`${worker.name}'s ${effect.trait}`);
        if(effect.type==='recoverSelf')this.recoverFromGroup(guild,[worker],effect.kinds,effect.amount||1,`${worker.name}'s ${effect.trait}`);
      }
    }
  }
  gainGuildStat(guild,stat,amount,cap=null,source='Trait'){
    if(typeof guild[stat]!=='number')return;
    const before=guild[stat];
    guild[stat]=cap===undefined||cap===null?guild[stat]+amount:Math.min(cap,guild[stat]+amount);
    if(guild[stat]!==before)this.log(guild,'good',`${source} gained ${guild[stat]-before} ${stat}.`);
  }
  recoverFromGroup(guild,workers,kinds=[],amount=1,source='Trait'){
    for(const worker of workers){
      const recovered=this.recoverConditionKinds(worker,kinds,amount);
      if(recovered.length){this.log(guild,'rest',`${source} helped ${worker.name} recover from ${recovered.join(', ')}.`);return true;}
    }
    return false;
  }
  recoverConditionKinds(worker,kinds=[],amount=1){
    const recovered=[];
    let spent=amount;
    worker.conditions=(worker.conditions||[]).map(condition=>{
      if(spent<=0)return condition;
      const def=this.conditionDef(condition.key);
      if(!def||condition.remaining===null||!kinds.includes(def.kind))return condition;
      spent--;
      const next=Math.max(0,condition.remaining-1);
      if(next===0)recovered.push(condition.key);
      return {...condition,remaining:next};
    }).filter(condition=>condition.remaining===null||condition.remaining>0);
    return recovered;
  }
  revealHiddenTraitFrom(guild,workers,source){
    const worker=workers.find(c=>this.hiddenTraitCount(c)>0);
    if(!worker)return false;
    const trait=worker.traits.find(t=>!this.visibleTraits(worker).includes(t));
    if(!trait)return false;
    this.revealTrait(worker,trait);
    worker.history.push(`Year ${this.state.year}: ${source} revealed ${trait}.`);
    this.log(guild,'good',`${source} revealed ${worker.name}'s ${trait}.`);
    return true;
  }
  releaseBoardPlacement(guild,contract){
    for(const id of contract.placements?.[guild.id]||[]){
      const worker=guild.roster.find(c=>c.id===id);
      if(worker)worker.placement=null;
    }
    if(contract.placements)contract.placements[guild.id]=[];
    if(contract.progress)delete contract.progress[guild.id];
    this.syncContractClaim(contract);
  }
  releaseAllContractPlacements(contract){
    for(const guild of this.state.guilds)this.releaseBoardPlacement(guild,contract);
    delete contract.sharedProgress;
    delete contract.claim;
  }
  rawSuccessChanceForTeam(guild,c,chars){const progress=this.contractProgress(guild,c);const materials=typeof progress?.materials==='number'?progress.materials:Math.min(guild.resources,c.materials||0);const score=chars.reduce((s,ch)=>s+this.characterTagScore(ch,c)+ch.resources*3+ch.connections*2-this.conditionPenalty(ch),0)+materials*10+guild.connections*2+this.contractTraitEffectScore(guild,c,chars,materials)+this.facilitySupportTraitEffectScore(guild,c,chars,materials)+this.contractReadinessBonus(guild,c);return Math.round(50+score-c.baseDifficulty);}
  contractReadiness(guild,contract){return contract?.readiness?.[guild.id]||{};}
  contractPlanningApplies(guild,contract){
    return this.isLocalGuild(guild)&&this.state.focusContractId===contract?.instanceId;
  }
  contractReadinessBonus(guild,contract){
    const readiness=this.contractReadiness(guild,contract);
    return (readiness.scouted||0)*5+(readiness.planned&&this.contractPlanningApplies(guild,contract)?10:0);
  }
  contractTraitEffectScore(guild,contract,team,materials=0){
    let score=0;
    for(const worker of team){
      for(const effect of this.workerTraitEffects(worker,'contractScore')){
        if(!this.effectMatchesContract(effect,contract,{guild,worker,team,materials,role:this.workerContractRole(team,worker)}))continue;
        if(effect.type==='contractBonus')score+=effect.amount||0;
        if(effect.type==='pairBonus'&&team.some(mate=>mate!==worker&&this.workerHasAny(mate,effect.requiresAny)))score+=effect.amount||0;
        if(effect.type==='teamBonus'&&team.some(mate=>mate!==worker&&this.workerHasAny(mate,effect.teammateAny||effect.requiresAny)))score+=effect.amount||0;
        if(effect.type==='patronBonus')score+=effect.amount||0;
        if(effect.type==='roleBonus')score+=effect.amount||0;
        if(effect.type==='worldBonus')score+=effect.amount||0;
        if(effect.type==='materialEcho'&&materials>0)score+=effect.amount||0;
        if(effect.type==='missingMaterialBuffer'&&materials<(contract.materials||0))score+=effect.amount||0;
        if(effect.type==='conditionBuffer'&&this.teamHasConditionKind(team,effect.kinds))score+=effect.amount||0;
      }
    }
    return score;
  }
  facilitySupportTraitEffects(guild,contract,team,materials=0){
    return guild.roster
      .filter(worker=>worker.placement?.type==='facility'&&worker.placement.mode==='work')
      .flatMap(worker=>{
        const facility=this.facilityDef(worker.placement.id);
        return this.workerTraitEffects(worker,'facilitySupport')
          .filter(effect=>this.effectMatchesContract(effect,contract,{guild,worker,team,facility,mode:'work',materials}))
          .map(effect=>({worker,facility,effect}));
      });
  }
  facilitySupportTraitEffectScore(guild,contract,team,materials=0){
    return this.facilitySupportTraitEffects(guild,contract,team,materials).reduce((score,{effect})=>{
      if(effect.type==='contractBonus'||effect.type==='roleBonus'||effect.type==='patronBonus'||effect.type==='worldBonus')return score+(effect.amount||0);
      if(effect.type==='materialEcho'&&materials>0)return score+(effect.amount||0);
      if(effect.type==='missingMaterialBuffer'&&materials<(contract.materials||0))return score+(effect.amount||0);
      if(effect.type==='conditionBuffer'&&this.teamHasConditionKind(team,effect.kinds))return score+(effect.amount||0);
      return score;
    },0);
  }
  facilityTrainingSupportTraitEffects(guild,targetWorker,targetFacility){
    return guild.roster
      .filter(worker=>worker!==targetWorker&&worker.placement?.type==='facility'&&worker.placement.mode==='work'&&worker.placement.id!==targetFacility.key)
      .flatMap(worker=>{
        const facility=this.facilityDef(worker.placement.id);
        return this.workerTraitEffects(worker,'facilityTrainingSupport')
          .filter(effect=>this.effectMatchesContract(effect,null,{guild,worker,facility,mode:'work',targetWorker,targetFacility}))
          .map(effect=>({worker,facility,effect}));
      });
  }
  facilityTrainingSupportTraitEffectScore(guild,targetWorker,targetFacility){
    if(!guild||!targetWorker||!targetFacility)return 0;
    return this.facilityTrainingSupportTraitEffects(guild,targetWorker,targetFacility).reduce((score,{effect})=>{
      if(effect.type==='trainingAssist')return score+(effect.amount||0);
      return score;
    },0);
  }
  workerTraitEffects(worker,trigger=null){
    const effects=this.data.characterParts.traitEffects||{};
    return this.visibleTraits(worker).flatMap(trait=>(effects[trait]||[]).filter(effect=>!trigger||effect.trigger===trigger).map(effect=>({...effect,trait})));
  }
  effectMatchesContract(effect,contract=null,ctx={}){
    if(contract){
      if(effect.pools&&!effect.pools.includes(contract.pool))return false;
      if(effect.types&&!effect.types.some(type=>this.contractDomains(contract).includes(type)))return false;
      if(effect.risks&&!effect.risks.includes(contract.risk))return false;
      if(effect.minWorkSeasons&&(contract.workSeasons||1)<effect.minWorkSeasons)return false;
      if(effect.patronTags&&!effect.patronTags.some(tag=>this.contractPatronTags(contract).includes(tag)))return false;
    }
    if(effect.facilities&&!effect.facilities.includes(ctx.facility?.key))return false;
    if(effect.targetFacilities&&!effect.targetFacilities.includes(ctx.targetFacility?.key))return false;
    if(effect.targetHasAny&&(!ctx.targetWorker||!this.workerHasAny(ctx.targetWorker,effect.targetHasAny)))return false;
    if(effect.targetMissingAll&&(!ctx.targetWorker||effect.targetMissingAll.some(tag=>this.visibleTraits(ctx.targetWorker).includes(tag))))return false;
    if(effect.modes&&!effect.modes.includes(ctx.mode))return false;
    if(effect.roles&&!effect.roles.includes(ctx.role))return false;
    if(effect.selfHasAny&&(!ctx.worker||!this.workerHasAny(ctx.worker,effect.selfHasAny)))return false;
    if(effect.selfHasAll&&(!ctx.worker||!effect.selfHasAll.every(tag=>this.visibleTraits(ctx.worker).includes(tag))))return false;
    if(effect.victimSelf&&ctx.victim!==ctx.worker)return false;
    if(effect.teammateAny&&!(ctx.team||[]).some(mate=>mate!==ctx.worker&&this.workerHasAny(mate,effect.teammateAny)))return false;
    if(effect.teammateConditionKinds&&!this.teamHasConditionKind((ctx.team||[]).filter(mate=>mate!==ctx.worker),effect.teammateConditionKinds))return false;
    if(effect.world&&!Object.entries(effect.world).every(([key,band])=>this.worldBand(key)===band))return false;
    if(effect.minAssignedContractMercs&&this.assignedContractMercCount(ctx.guild)<effect.minAssignedContractMercs)return false;
    return true;
  }
  contractPatronTags(contract){return [...new Set([contract.patron?.trait,...(contract.support||[]).map(r=>r.trait)].filter(Boolean))];}
  workerContractRole(team,worker){return team.indexOf(worker)===0?'lead':'support';}
  assignedContractMercCount(guild){return guild?guild.roster.filter(c=>c.placement?.type==='contract').length:0;}
  worldBand(key){const value=this.state.world.values[key]??50;return value<35?'low':value>65?'high':'mid';}
  workerHasAny(worker,tags=[]){return this.visibleTraits(worker).some(t=>tags.includes(t));}
  teamHasConditionKind(team,kinds=[]){return team.some(worker=>(worker.conditions||[]).some(condition=>kinds.includes(this.conditionDef(condition.key)?.kind)));}
  conditionPenalty(c){return (c.conditions||[]).reduce((s,condition)=>s+(this.conditionDef(condition.key)?.penalty||0),0);}
  conditionDef(key){return this.data.contractParts.conditions.find(c=>c.key===key);}
  successChanceForTeam(guild,c,chars){return this.clamp(this.rawSuccessChanceForTeam(guild,c,chars),2,98);}
  applyContractWorldEffect(contract){
    const pool=this.data.contractParts.world.pools.find(p=>p.key===contract.pool);
    if(!pool?.effects)return;
    for(const [key,delta] of Object.entries(pool.effects)) this.state.world.values[key]=this.clamp((this.state.world.values[key]??50)+delta,0,100);
  }
  applyFailure(guild,c){
    const total=c.failure.reduce((s,f)=>s+f.weight,0);
    let r=Math.random()*total;
    const f=c.failure.find(x=>(r-=x.weight)<=0)||c.failure[0];
    const assigned=(c.placements?.[guild.id]||[]).map(id=>guild.roster.find(ch=>ch.id===id)).filter(Boolean);
    const victim=assigned[Math.floor(Math.random()*assigned.length)];
    const softened=this.softenedFailure(guild,c,assigned,f,victim);
    if(softened==='ignore')return;
    const softenedBy=softened&&softened!==true?softened:null;
    const isSoftened=Boolean(softened);
    if(f.type==='gold_loss'){
      const loss=isSoftened?Math.ceil(f.amount/2):f.amount;
      guild.gold=Math.max(0,guild.gold-loss);
      if(softenedBy)this.logSoftenedFailure(guild,softenedBy,f,victim,'reduced gold loss');
      this.log(guild,'bad',`${guild.name} paid ${loss} gold in failure costs.`);
    }
    if(f.type==='material_loss'){
      const loss=Math.min(guild.resources,isSoftened?Math.ceil(f.amount/2):f.amount);
      guild.resources-=loss;
      if(softenedBy)this.logSoftenedFailure(guild,softenedBy,f,victim,'reduced Resource loss');
      if(loss>0)this.log(guild,'bad',`${guild.name} lost ${loss} Resource${loss===1?'':'s'} from the failed work.`);
    }
    if(f.type==='reputation_loss'){
      if(softenedBy)this.logSoftenedFailure(guild,softenedBy,f,victim,'reduced reputation loss');
      guild.reputation=Math.max(0,guild.reputation-(isSoftened?Math.ceil(f.amount/2):f.amount));
    }
    const context={contract:c,team:assigned,victim};
    if(f.type==='negative_trait'&&victim&&!isSoftened)this.addCondition(victim,f.trait,c.title,guild,context);
    if(f.type==='injury'&&victim&&!isSoftened)this.addCondition(victim,'Injured',c.title,guild,context);
    if(f.type==='death'&&victim&&!isSoftened)this.applySevereHarm(guild,victim,c.title,context);
    if(isSoftened&&['negative_trait','injury','death'].includes(f.type)&&victim){
      if(softenedBy)this.logSoftenedFailure(guild,softenedBy,f,victim,'Shaken');
      this.addCondition(victim,'Shaken',c.title,guild,context);
    }
  }
  softenedFailure(guild,contract,team,failure,victim){
    const effects=team.flatMap(worker=>this.workerTraitEffects(worker,'contractFailure').filter(effect=>this.effectMatchesContract(effect,contract,{guild,worker,team,role:this.workerContractRole(team,worker),victim})).map(effect=>({worker,effect})));
    for(const {worker,effect} of effects){
      if(effect.type==='softenFailure'&&effect.failureTypes?.includes(failure.type)&&Math.random()*100<(effect.chance||0)){
        return {worker,effect};
      }
      if(effect.type==='ignoreCondition'&&['negative_trait','injury'].includes(failure.type)&&victim===worker&&Math.random()*100<(effect.chance||0)){
        this.log(guild,'good',`${worker.name}'s ${effect.trait} prevented ${worker.name} from gaining ${this.failureResultLabel(failure)}.`);
        return 'ignore';
      }
    }
    return false;
  }
  logSoftenedFailure(guild,softened,failure,victim,result){
    const actor=softened.worker;
    const trait=softened.effect.trait;
    const target=victim?.name||guild.name;
    this.log(guild,'good',`${actor.name}'s ${trait} saved ${target}, turning ${this.failureResultLabel(failure)} into ${result}.`);
  }
  failureResultLabel(failure){
    if(failure.type==='death')return 'Dead';
    if(failure.type==='injury')return 'Injured';
    if(failure.type==='negative_trait')return failure.trait||'a condition';
    if(failure.type==='gold_loss')return 'full gold loss';
    if(failure.type==='material_loss')return 'full Resource loss';
    if(failure.type==='reputation_loss')return 'full reputation loss';
    return failure.type;
  }
  addCondition(character,key,source,guild=null,context={}){
    const def=this.conditionDef(key)||this.conditionDef('Shaken');
    const conditionKey=def.key;
    character.conditions=character.conditions||[];
    const existing=character.conditions.find(c=>c.key===conditionKey);
    const remaining=def.duration===null?null:def.duration;
    if(existing){existing.remaining=existing.remaining===null?null:Math.max(existing.remaining,remaining);return;}
    character.conditions.push({key:conditionKey,remaining});
    character.history.push(`Year ${this.state.year}: gained ${conditionKey} during ${source}.`);
    if(guild)this.log(guild,'bad',`${character.name} became ${conditionKey} during "${source}".`);
    if(guild)this.applyConditionAddedTraitEffects(guild,character,def,{...context,condition:def});
  }
  applyConditionAddedTraitEffects(guild,victim,condition,context={}){
    const team=context.team||[];
    for(const worker of team){
      for(const effect of this.workerTraitEffects(worker,'conditionAdded')){
        if(!this.effectMatchesContract(effect,context.contract,{guild,worker,team,victim,condition,role:this.workerContractRole(team,worker)}))continue;
        const source=`${worker.name}'s ${effect.trait}`;
        if(effect.conditionKinds&&!effect.conditionKinds.includes(condition.kind))continue;
        if(effect.type==='gainGuild')this.gainGuildStat(guild,effect.stat,effect.amount||1,effect.cap,source);
        if(effect.type==='recoverVictim')this.recoverFromGroup(guild,[victim],effect.kinds||[condition.kind],effect.amount||1,source);
        if(effect.type==='recoverTeam')this.recoverFromGroup(guild,team,effect.kinds||[condition.kind],effect.amount||1,source);
      }
    }
  }
  applySevereHarm(guild,character,source,context={}){
    if(Math.random()<0.35&&!this.hasCondition(character,'Maimed')){
      this.addCondition(character,'Maimed',source,guild,context);
      return;
    }
    character.alive=false;
    character.placement=null;
    this.removeMercCapacity(guild,character);
    character.conditions=(character.conditions||[]).filter(c=>c.key!=='Dead');
    character.conditions.push({key:'Dead',remaining:null});
    character.history.push(`Year ${this.state.year}: died during ${source}.`);
    this.log(guild,'bad',`${character.name} died during "${source}".`);
    this.applyDeathTraitEffects(guild,character,{...context,source});
  }
  applyDeathTraitEffects(guild,victim,context={}){
    const team=context.team||[];
    for(const worker of team.filter(c=>c.alive)){
      for(const effect of this.workerTraitEffects(worker,'death')){
        if(!this.effectMatchesContract(effect,context.contract,{guild,worker,team,victim,role:this.workerContractRole(team,worker)}))continue;
        const source=`${worker.name}'s ${effect.trait}`;
        if(effect.type==='gainGuild')this.gainGuildStat(guild,effect.stat,effect.amount||1,effect.cap,source);
        if(effect.type==='recoverGuild')this.recoverFromGroup(guild,this.activeWorkers(guild),effect.kinds,effect.amount||1,source);
        if(effect.type==='contractBonusNext')this.log(guild,'good',`${source} hardened ${guild.name} after ${victim.name}'s death.`);
      }
    }
  }
  hasCondition(character,key){return (character.conditions||[]).some(c=>c.key===key);}
  nextSeason(){
    const guildCount=this.state.guilds.length||1;
    if(this.state.seasonIndex===3){if(this.state.year===20){this.endGame();return;}this.state.year++;this.state.seasonIndex=0;this.state.starterIndex=(this.state.starterIndex+1)%guildCount;}else this.state.seasonIndex++;
    this.startSeason();
  }
  victoryGoals(){return this.data.contractParts.settings.victoryGoals||{gold:420,reputation:160,completed:45,resources:55,connections:45};}
  victoryLaneLabel(stat){return {gold:'Wealth',reputation:'Reputation',completed:'Contracts',resources:'Resources',connections:'Connections'}[stat]||stat;}
  victoryProgressScore(contender,goals=this.victoryGoals()){
    return Object.entries(goals).reduce((sum,[stat,target])=>sum+((contender[stat]||0)/Math.max(1,target))*100,0);
  }
  checkVictory(){
    const goals=this.victoryGoals();
    const contenders=this.victoryContenders();
    const winner=contenders.flatMap(contender=>Object.entries(goals).map(([stat,target])=>({contender,stat,target,value:contender[stat]||0}))).filter(row=>row.value>=row.target).sort((a,b)=>(b.value/b.target)-(a.value/a.target))[0];
    if(!winner)return false;
    this.state.phase='gameOver';
    this.state.activeGuildId=null;
    this.log(null,'game',`${winner.contender.name} wins by ${this.victoryLaneLabel(winner.stat)}: ${winner.value}/${winner.target}.`);
    this.render();
    return true;
  }
  victoryContenders(){
    if(this.state.match?.mode!=='teams')return this.state.guilds;
    const teams=new Map();
    for(const guild of this.state.guilds){
      const key=guild.teamId||guild.id;
      const team=teams.get(key)||{id:key,name:`${key}`,gold:0,reputation:0,completed:0,resources:0,connections:0,guilds:[]};
      team.guilds.push(guild);
      for(const stat of ['gold','reputation','completed','resources','connections'])team[stat]+=guild[stat]||0;
      team.name=team.guilds.map(g=>g.name).join(' + ');
      teams.set(key,team);
    }
    return [...teams.values()];
  }
  endGame(){
    this.state.phase='gameOver';
    this.state.activeGuildId=null;
    const goals=this.victoryGoals();
    const ranked=[...this.victoryContenders()].sort((a,b)=>this.victoryProgressScore(b,goals)-this.victoryProgressScore(a,goals));
    const top=ranked[0];
    this.log(null,'game',`The twenty-year campaign ends with no victory-lane winner. ${top?.name||'No guild'} led final scoring across all five lanes.`);
    this.render();
  }

  log(guild,type,summary){this.state.log.unshift({year:this.state.year,season:this.currentSeason(),guildId:guild?.id||null,type,summary});this.state.log.length=Math.min(this.state.log.length,80);}
  recordAiActivity(guild,type,summary,detail=''){
    if(!guild||this.isLocalGuild(guild))return;
    this.state.aiActivity=this.state.aiActivity||[];
    this.state.aiActivity.unshift({guildId:guild.id,guildName:guild.name,type,summary,detail,year:this.state.year,season:this.currentSeason()});
    this.state.aiActivity.length=Math.min(this.state.aiActivity.length,12);
  }
  aiVisualPause(){
    if(typeof window==='undefined'||this.isSimulation)return Promise.resolve();
    const wait=this.clamp(Math.round((this.aiTurnDelay()||0)*0.45),120,420);
    return new Promise(resolve=>setTimeout(resolve,wait));
  }

  render(){this.ui.date.textContent=`Year ${this.state.year} - ${this.currentSeason()}`;const active=this.state.guilds.find(g=>g.id===this.state.activeGuildId);const humanDraft=this.state.phase==='setup'&&this.isLocalGuild(active);const setupDraft=this.state.phase==='setup'&&active;const openingSplash=this.state.phase==='setup'&&this.openingSplashActive();const aiThinking=!openingSplash&&!this.menuOpen&&(this.state.phase==='aiTurn'||(this.state.phase==='setup'&&active&&this.isAiGuild(active)));this.ui.phase.textContent=this.state.phase==='setup'&&active?`${active.name} draft`:this.state.phase==='aiTurn'&&active?`${active.name} turn`:this.state.phase==='awaitHuman'&&active?`${active.name} turn`:this.state.phase;this.ui.advance.textContent=this.state.phase==='setup'?'Drafting':this.state.phase==='seasonComplete'?'Next Season':this.state.phase==='gameOver'?'Game Over':'Resolve Season';this.ui.advance.disabled=this.state.phase==='setup'||this.state.phase==='gameOver'||this.state.phase==='aiTurn';this.ui.tavernBtn.textContent=setupDraft?'World State':`Tavern (${this.state.tavern.length})`;this.ui.tavernBtn.classList.toggle('has-new',!setupDraft&&(this.state.tavernHasNew||humanDraft&&!this.state.tavernOpen));if(this.ui.aiThinking){this.ui.aiThinking.classList.toggle('closed',!aiThinking);if(aiThinking&&!this._aiThinkingEl){this._aiThinkingEl=this.ui.aiThinking;this._aiThinkingName=active?.name||'AI';this.setAiThinkingDetail('thinking...');}}this.renderGuilds();this.renderWorld();this.renderAiActivity();this.renderPeople();this.renderTavern();this.renderContracts();this.renderFacilities();this.ui.humanStatus.textContent=this.state.phase==='setup'?(this.isLocalGuild(active)?'Pick':'Watch'):this.state.phase==='awaitHuman'?'Drag':this.state.phase==='aiTurn'?'Watch':'';
    this.maybeContinueSetupDraft();
  }
  renderGuilds(){
    this.ui.guildGrid.innerHTML=this.state.guilds.map(g=>`<article class="guild-card ${this.isLocalGuild(g)?'human':''} ${g.id===this.state.activeGuildId?'acting':''}" role="button" tabindex="0" data-guild-id="${g.id}"><h3>${g.name}${this.isLocalGuild(g)?' - Local':''}</h3><div class="guild-identity">${this.guildIdentity(g).label}${this.teamLabel(g)}</div><div class="guild-score"><span><strong>${g.gold}</strong>Gold</span><span><strong>${g.reputation}</strong>Rep</span><span><strong>${g.completed}</strong>Done</span><span><strong>${g.resources}</strong>Res</span><span><strong>${g.connections}</strong>Conn</span></div></article>`).join('');
    this.ui.guildGrid.querySelectorAll('.guild-card').forEach(card=>{
      card.addEventListener('click',()=>this.openGuildPanel(card.dataset.guildId));
      card.addEventListener('keydown',evt=>{if(evt.key==='Enter'||evt.key===' '){evt.preventDefault();this.openGuildPanel(card.dataset.guildId);}});
    });
  }
  teamLabel(guild){return guild.teamId&&guild.teamId!==guild.id?` / ${this.escapeHtml(guild.teamId)}`:'';}
  victoryProgressText(guild){
    const goals=this.victoryGoals();
    return `Gold ${guild.gold}/${goals.gold}, Rep ${guild.reputation}/${goals.reputation}, Done ${guild.completed}/${goals.completed}, Res ${guild.resources}/${goals.resources}, Conn ${guild.connections}/${goals.connections}`;
  }
  engineSummary(guild){
    const placed=this.data.contractParts.facilities.filter(f=>this.facilityWorkers(guild,f.key).length).map(f=>`${f.label} ${this.facilityWorkers(guild,f.key).length}`);
    const engines=this.activeWorkers(guild).map(c=>this.workerEngineSummary(c)).filter(Boolean).slice(0,2);
    return [...engines,...placed].join(', ')||'No active trait engines yet';
  }
  guildIdentity(guild){
    const scores={};
    const add=(key,amount)=>{if(key)scores[key]=(scores[key]||0)+amount;};
    const poolIdentity={Agriculture:'Relief Brotherhood',Military:'Military Company',Commerce:'Merchant House',Exploration:'Explorer Lodge',Religion:'Religious Order',Civic:'Civic League',Crafting:'Craft Guild'};
    for(const [pool,count] of Object.entries(guild.poolWins||{}))add(poolIdentity[pool]||pool,count);
    for(const worker of this.activeWorkers(guild))for(const trait of this.visibleTraits(worker))add(this.traitIdentity(trait),0.15);
    const [label,score]=Object.entries(scores).sort((a,b)=>b[1]-a[1])[0]||['Unproven Guild',0];
    return {label:score>=2?label:'Unproven Guild',score};
  }
  traitIdentity(trait){
    const affinity=this.data.characterParts.tagAffinities?.[trait];
    const domains=affinity?.domains||[];
    if(domains.some(d=>['Military','Combat','Defense','Assault','Guard Duty','Hunt','Legendary Hunt'].includes(d)))return 'Military Company';
    if(domains.some(d=>['Commerce','Accounting','Diplomacy','Influence'].includes(d)))return 'Merchant House';
    if(domains.some(d=>['Scholarship','Inquiry','Legal','Administration'].includes(d)))return 'Scholarly Society';
    if(domains.some(d=>['Relief','Sanitation','Religion','Pilgrimage'].includes(d)))return 'Religious Order';
    if(domains.some(d=>['Construction','Engineering','Crafting','Manufacturing','Foundry','Extraction'].includes(d)))return 'Craft Guild';
    if(domains.some(d=>['Exploration','Intrigue','Logistics'].includes(d)))return 'Explorer Lodge';
    if(domains.some(d=>['Civic','Public Works'].includes(d)))return 'Civic League';
    return null;
  }
  renderWorld(){const world=this.state.world;this.ui.world.innerHTML=`<article class="world-card"><strong>World State</strong><span>${world.name}</span></article>`+this.data.contractParts.world.states.map(s=>{const value=world.values[s.key];const trend=world.trend[s.key]||0;const band=value<35?s.low:value>65?s.high:s.mid;const arrow=trend>3?'rising':trend<-3?'falling':'steady';return `<article class="world-card"><strong>${s.label}</strong><span>${band}, ${arrow}</span></article>`;}).join('');}
  renderAiActivity(){
    if(!this.ui.aiActivity)return;
    const entries=(this.state.aiActivity||[]).slice(0,5);
    this.ui.aiActivity.innerHTML=entries.length?entries.map(entry=>`<article class="ai-activity-item ${entry.type} ${entry.guildId===this.state.activeGuildId?'active':''}"><strong>${this.escapeHtml(entry.guildName)}</strong><span>${this.escapeHtml(entry.summary)}</span>${entry.detail?`<em>${this.escapeHtml(entry.detail)}</em>`:''}</article>`).join(''):'<article class="ai-activity-item empty-feed"><strong>Rivals</strong><span>No rival moves yet</span></article>';
  }
  renderPeople(){
    const human=this.activeLocalGuild();
    this.ui.peopleGrid.innerHTML=human.roster.map(c=>this.workerToken(c)).join('')||'<p class="empty">No workers.</p>';
    this.ui.recoveryGrid.innerHTML=Array.from({length:this.recoverySlotCount()},(_,i)=>this.recoverySlot(this.recoveryWorkers(human)[i])).join('');
    this.ui.peopleGrid.querySelectorAll('.merc-token').forEach(token=>{token.addEventListener('click',()=>this.openCharacterPanel(token.dataset.id));});
    this.bindDragSources();
    this.bindReturnDrop(this.ui.peopleGrid);
  }
  workerToken(c){const placed=Boolean(c.placement);const locked=this.isLockedPlacement(c);const conditions=(c.conditions||[]).map(x=>x.key).join(', ');return `<div class="merc-token ${placed?'assigned':''} ${locked?'locked':''} ${c.alive?'':'dead'}" role="button" tabindex="0" draggable="${c.alive&&this.state.phase==='awaitHuman'&&!this.state.humanActionUsed&&!locked?'true':'false'}" data-id="${c.id}"><strong>${this.workerInitials(c)}</strong><div class="token-meta">${c.name}</div><div class="token-meta">${c.archetype}${locked?' - committed':placed?' - placed':''}</div><div class="token-meta">${this.traitPreviewText(c)}</div>${conditions?`<div class="token-meta">${conditions}</div>`:''}</div>`;}
  renderDetail(){return;}
  guildInspectionHtml(guild){
    const identity=this.guildIdentity(guild);
    const roster=guild.roster.map(c=>this.guildRosterRow(c,guild)).join('')||'<p class="empty">No hired mercenaries.</p>';
    const profile=guild.personality?.label?`<span>${this.escapeHtml(guild.personality.label)} AI</span>`:'';
    return `<article class="game-card guild-inspection"><div class="guild-inspection-summary"><span><strong>${guild.gold}</strong>Gold</span><span><strong>${guild.reputation}</strong>Rep</span><span><strong>${guild.completed}</strong>Done</span><span><strong>${guild.resources}</strong>Resources</span><span><strong>${guild.connections}</strong>Connections</span></div><p class="victory-progress">${this.escapeHtml(this.victoryProgressText(guild))}</p><div class="guild-inspection-meta"><span>${this.escapeHtml(identity.label)}</span>${profile}<span>${this.activeWorkers(guild).length}/${guild.roster.length} active</span></div>${this.guildFactionChipsHtml(guild)}<div class="guild-roster-list">${roster}</div></article>`;
  }
  guildFactionChipsHtml(guild){
    const thresholds=this.patronFavorThresholds();
    const nextTier=favor=>favor>=thresholds.ally?'Ally':favor>=thresholds.slot?`Ally ${thresholds.ally}`:favor>=thresholds.training?`Slot ${thresholds.slot}`:favor>=thresholds.ready?`Training ${thresholds.training}`:`Ready ${thresholds.ready}`;
    const chips=(this.data.contractParts.patrons||[]).map(patron=>{
      const favor=this.patronFavor(guild,patron.key);
      return `<button class="guild-faction-chip ${favor>=thresholds.ready?'active':''}" type="button" data-glossary-term="${this.escapeAttr(patron.key)}"><strong>${this.escapeHtml(patron.path)}</strong><span>${favor} / ${this.escapeHtml(nextTier(favor))}</span></button>`;
    }).join('');
    return `<section class="guild-factions"><h4>Factions</h4><div class="guild-faction-grid">${chips}</div></section>`;
  }
  guildRosterRow(c,guild){
    const s=this.getStatus(c.status);
    const conditions=(c.conditions||[]).map(condition=>condition.key).join(', ');
    return `<div class="guild-roster-row ${c.alive?'':'dead'}" role="button" tabindex="0" data-inspect-character="${c.id}"><div><strong>${this.escapeHtml(c.name)}</strong><p>${this.escapeHtml(c.archetype)} - ${this.escapeHtml(s.name)}</p><div class="guild-row-traits">${c.traits.map(t=>this.tagHtml(t)).join('')}</div>${conditions?`<p class="guild-roster-conditions">${this.escapeHtml(conditions)}</p>`:''}</div><span class="guild-roster-status">${this.escapeHtml(this.workerPlacementText(c,guild))}</span></div>`;
  }
  workerPlacementText(worker,guild){
    if(!worker.alive)return 'Dead';
    const placement=worker.placement;
    if(!placement)return 'Available';
    if(placement.type==='contract'){
      const contract=this.state.boardContracts.find(c=>c.instanceId===placement.id);
      const progress=contract&&this.contractProgress(guild,contract);
      const title=contract?.title||'contract';
      return `${progress?'Committed':'Placed'}: ${title}`;
    }
    if(placement.type==='facility'){
      const facility=this.facilityDef(placement.id);
      return `Working: ${facility?.label||placement.id}`;
    }
    if(placement.type==='recovery')return 'Recovering';
    return 'Placed';
  }
  characterCard(c,{showHistory=false,showAllTraits=false,guild=null,allowDismissal=true}={}){
    const s=this.getStatus(c.status);
    const owner=guild?`<p class="archetype">${this.escapeHtml(guild.name)}</p>`:'';
    const status=guild?this.workerPlacementText(c,guild):c.alive?(this.isPlaced(c)?'Placed':'Available'):'Dead';
    const conditions=(c.conditions||[]).map(condition=>this.conditionHtml(condition)).join('');
    return `<article class="game-card character-card"><div class="card-header"><div><h3>${c.name}</h3><p class="archetype">${this.termLink(c.archetype)}</p>${owner}</div><button class="status-badge glossary-term" type="button" data-glossary-term="${this.escapeAttr(s.name)}">${this.escapeHtml(s.name)}</button></div><div class="traits">${this.renderTraitChips(c,showAllTraits)}</div>${conditions?`<div class="conditions">${conditions}</div>`:''}<dl class="stats"><dt>Recruit cost</dt><dd>${this.baseRecruitCost(c)}</dd><dt>Annual salary</dt><dd>${this.characterSalary(c)}</dd><dt>Reputation required</dt><dd>${this.reputationRequirement(c)}</dd><dt>Resources</dt><dd>${c.resources}</dd><dt>Connections</dt><dd>${c.connections}</dd><dt>Status</dt><dd>${this.escapeHtml(status)}</dd></dl>${allowDismissal?this.dismissalHtml(c,guild):''}${this.characterEngineHtml(c,showAllTraits)}${showHistory?`<p class="history">${c.history.slice(-3).join(' ')||'No history yet.'}</p>`:''}</article>`;
  }
  dismissalHtml(c,guild){
    if(!this.isLocalGuild(guild)||!c.alive)return '';
    const disabled=this.state.phase!=='awaitHuman'||this.state.humanActionUsed||this.isLockedPlacement(c,guild)||this.activeWorkers(guild).length<=1;
    const severance=this.severanceCost(c);
    const penalty=this.dismissalReputationPenalty(c);
    const note=disabled?'Available only on your turn, not for committed workers, and not for your last active merc.':'Choose severance or reputation damage.';
    return `<section class="dismissal-actions"><h4>Release</h4><p>${this.escapeHtml(note)}</p><div class="trait-choice-grid"><div class="trait-choice ${disabled||guild.gold<severance?'keep':''}" role="button" tabindex="0" data-release-merc="paid" data-character-id="${c.id}">Pay ${severance}g severance</div><div class="trait-choice danger-choice ${disabled?'keep':''}" role="button" tabindex="0" data-release-merc="cold" data-character-id="${c.id}">No severance: -${penalty} reputation</div></div></section>`;
  }
  characterEngineHtml(c,showAllTraits=false){
    const traits=showAllTraits?c.traits:this.visibleTraits(c);
    const rules=traits.flatMap(trait=>(this.data.characterParts.traitEffects?.[trait]||[]).map(effect=>({trait,effect})));
    if(!rules.length)return `<section class="engine-rules"><h4>Engine Rules</h4><p class="empty">No revealed trait rules yet.</p></section>`;
    return `<section class="engine-rules"><h4>Engine Rules</h4>${rules.map(({trait,effect})=>`<div class="engine-rule"><strong>${this.escapeHtml(trait)}</strong><span>${this.escapeHtml(this.effectTriggerLabel(effect))}</span><p>${this.escapeHtml(this.effectRuleText(effect))}</p></div>`).join('')}</section>`;
  }
  effectTriggerLabel(effect){
    const labels={contractScore:'Contract odds',contractSuccess:'On success',contractFailure:'On failure',contractProgress:'Long work',contractClaim:'Claim control',contractContest:'Contract contest',contractCooperation:'Cooperation',facilityResolve:'Facility placement',facilitySupport:'Facility support',facilityTrainingSupport:'Training support',facilityWork:'Training',conditionAdded:'When condition lands',death:'On death',recruitCost:'Recruiting'};
    const scopes=[];
    if(effect.facilities)scopes.push(effect.facilities.map(key=>this.facilityDef(key)?.label||key).join(', '));
    if(effect.types)scopes.push(effect.types.join(', '));
    if(effect.risks)scopes.push(effect.risks.join(', '));
    if(effect.roles)scopes.push(effect.roles.join('/'));
    return [labels[effect.trigger]||effect.trigger,...scopes].filter(Boolean).join(' - ');
  }
  effectRuleText(effect){
    const filters=this.effectFilterClauses(effect);
    const when=this.effectTriggerText(effect);
    const result=this.effectResultText(effect);
    return `${when}${filters.length?` (${filters.join('; ')})`:''}: ${result}.`;
  }
  effectTriggerText(effect){
    const labels={
      contractScore:'Contract odds',
      contractSuccess:'Contract success',
      contractFailure:'Contract failure',
      contractProgress:'Unfinished contract progress',
      contractClaim:'Claim control',
      contractContest:'Contract contest',
      contractCooperation:'Contract cooperation',
      facilityResolve:'Facility resolve',
      facilitySupport:'Facility support',
      facilityTrainingSupport:'Training support',
      facilityWork:'Facility training',
      conditionAdded:'Condition added',
      death:'Contract death',
      recruitCost:'Recruiting'
    };
    return labels[effect.trigger]||`When ${effect.trigger} triggers`;
  }
  effectFilterClauses(effect){
    const clauses=[];
    if(effect.types)clauses.push(this.formatList(effect.types));
    if(effect.risks)clauses.push(`risk: ${this.formatList(effect.risks)}`);
    if(effect.roles)clauses.push(`role: ${this.formatList(effect.roles)}`);
    if(effect.facilities)clauses.push(this.formatList(effect.facilities.map(key=>this.facilityDef(key)?.label||key)));
    if(effect.targetFacilities)clauses.push(`target facility: ${this.formatList(effect.targetFacilities.map(key=>this.facilityDef(key)?.label||key))}`);
    if(effect.targetHasAny)clauses.push(`target worker has ${this.formatList(effect.targetHasAny)}`);
    if(effect.targetMissingAll)clauses.push(`target worker lacks ${this.formatList(effect.targetMissingAll)}`);
    if(effect.patronTags)clauses.push(`patron/support tag: ${this.formatList(effect.patronTags)}`);
    if(effect.minWorkSeasons)clauses.push(`work >= ${effect.minWorkSeasons} seasons`);
    if(effect.world)clauses.push(...Object.entries(effect.world).map(([key,band])=>`${this.worldLabel(key)}: ${band}`));
    if(effect.conditionKinds)clauses.push(`condition: ${this.formatList(effect.conditionKinds)}`);
    if(effect.failureTypes)clauses.push(`failure: ${this.formatList(effect.failureTypes)}`);
    if(effect.selfHasAny)clauses.push(`this worker has ${this.formatList(effect.selfHasAny)}`);
    if(effect.selfHasAll)clauses.push(`this worker has all of ${this.formatList(effect.selfHasAll)}`);
    if(effect.victimSelf)clauses.push('self affected');
    if(effect.teammateConditionKinds)clauses.push(`teammate condition: ${this.formatList(effect.teammateConditionKinds)}`);
    return clauses;
  }
  effectResultText(effect){
    const amount=effect.amount||1;
    const chance=effect.chance??100;
    const stat=this.statLabel(effect.stat,amount);
    const teammateTags=effect.teammateAny||effect.requiresAny;
    if(effect.type==='contractBonus'||effect.type==='roleBonus'||effect.type==='patronBonus'||effect.type==='worldBonus')return `+${amount}% success chance`;
    if(effect.type==='pairBonus'||effect.type==='teamBonus')return `+${amount}% success chance if teammate has ${this.formatList(teammateTags||[])}`;
    if(effect.type==='materialEcho')return `+${amount}% success chance if guild covers 1+ Resource requirement`;
    if(effect.type==='missingMaterialBuffer')return `+${amount}% success chance if guild Resources are below contract requirement`;
    if(effect.type==='conditionBuffer')return `+${amount}% success chance if team has ${this.formatList(effect.kinds||[])} condition`;
    if(effect.type==='blockCompetition')return 'block rival competition drops against this claim';
    if(effect.type==='forceCooperation')return 'turn rival competition drops into cooperation';
    if(effect.type==='competitionCost')return `${amount>=0?'+':''}${amount} reputation cost to compete`;
    if(effect.type==='contestScore')return `+${amount} contest score`;
    if(effect.type==='cooperativeChance')return `+${amount}% shared cooperative project chance`;
    if(effect.type==='bypassCompetitionBlock')return 'ignore one competition-blocking claim rule';
    if(effect.type==='gainGuild')return `+${amount} ${stat}${effect.cap!==undefined?` (max ${effect.cap})`:''}`;
    if(effect.type==='goldPerAssignedContractMerc')return `+${amount} gold per merc assigned to contracts`;
    if(effect.type==='statPerAssignedContractMerc')return `+${amount} ${stat} per merc assigned to contracts`;
    if(effect.type==='revealRosterTrait')return 'reveal 1 hidden roster trait';
    if(effect.type==='revealTavernTrait')return 'reveal 1 hidden tavern trait';
    if(effect.type==='recoverGuild')return `recover ${amount} ${this.formatList(effect.kinds||[])} condition step from any active guild member`;
    if(effect.type==='recoverTeam')return `recover ${amount} ${this.formatList(effect.kinds||[])} condition step from assigned team`;
    if(effect.type==='recoverSelf')return `recover ${amount} ${this.formatList(effect.kinds||[])} condition step from self`;
    if(effect.type==='recoverVictim')return `recover ${amount} ${this.formatList(effect.kinds||[])} condition step from affected worker`;
    if(effect.type==='trainingAssist')return `+${amount}% training chance`;
    if(effect.type==='advanceWork')return `${chance}% chance: -${amount} extra remaining work`;
    if(effect.type==='softenFailure')return `${chance}% chance: halve gold/reputation/Resource loss; condition/death becomes Shaken`;
    if(effect.type==='ignoreCondition')return `${chance}% chance: prevent new injury/negative condition`;
    if(effect.type==='nearMissSuccess')return `${chance}% chance: success if failed by ${effect.margin||0} or less`;
    if(effect.type==='discount')return `-${amount} gold recruit cost`;
    if(effect.type==='contractBonusNext')return 'no current numeric effect';
    return effect.description||'apply this trait effect';
  }
  formatList(items=[]){
    const list=[...items].filter(Boolean);
    if(!list.length)return 'any matching value';
    if(list.length===1)return String(list[0]);
    if(list.length===2)return `${list[0]} or ${list[1]}`;
    return `${list.slice(0,-1).join(', ')}, or ${list.at(-1)}`;
  }
  statLabel(stat,amount=1){
    const labels={gold:'gold',reputation:'reputation',resources:amount===1?'Resource':'Resources',connections:amount===1?'Connection':'Connections'};
    return labels[stat]||stat||'guild stat';
  }
  renderTavern(){
    const setupGuild=this.currentSetupGuild();
    const setupDraft=this.state.phase==='setup'&&setupGuild;
    const humanDraft=setupDraft&&this.isLocalGuild(setupGuild);
    const openingSplash=setupDraft&&this.openingSplashActive();
    const isOpen=this.state.phase==='setup'?Boolean(setupGuild):this.state.tavernOpen;
    this.ui.tavernPanel.classList.toggle('closed',!isOpen);
    this.ui.tavernPanel.classList.remove('setup-draft');
    this.ui.tavernClose.style.visibility=setupDraft?'hidden':'visible';
    this.ui.tavernClose.textContent='Close';
    this.ui.tavernEyebrow.textContent=setupDraft?'World State':'Tavern';
    this.ui.tavernTitle.textContent=setupDraft?'Founder Draft Begins':'Available Recruits';
    if(setupDraft){
      if(humanDraft&&this._humanDraftGuardIndex!==this.state.setupDraftIndex){
        this._humanDraftGuardIndex=this.state.setupDraftIndex;
        this._humanDraftClickReadyAt=performance.now()+250;
      }
      if(openingSplash)this.scheduleOpeningSplashResume();
      const intro=this.openingWorldIntroHtml(this.openingSplashViewGuild());
      this.ui.recruitGrid.innerHTML=intro+(this.state.tavern.map(c=>{const s=this.getStatus(c.status);return `<div class="merc-token founder-token ${this.isLocalGuild(setupGuild)?'':'locked'}" role="button" tabindex="0" data-id="${c.id}"><strong>${c.name}</strong><div class="token-meta">${c.archetype} - ${s.name}</div><div class="token-meta">${c.traits.join(', ')}</div><div class="token-meta">Upkeep: ${this.characterSalary(c)}g/year</div><div class="token-meta">${this.isLocalGuild(setupGuild)?'Draft founder':'Available'}</div></div>`;}).join('')||'<p class="empty">The tavern is empty.</p>');
      if(this.isLocalGuild(setupGuild))this.ui.recruitGrid.querySelectorAll('.founder-token').forEach(b=>b.addEventListener('click',evt=>{this.state.tavernHasNew=false;this.draftFounder(b.dataset.id,evt);}));
      return;
    }
    const human=this.activeLocalGuild();
    this.ui.recruitGrid.innerHTML=(this.state.tavern.map(c=>{
      const s=this.getStatus(c.status);
      const cost=this.recruitCost(human,c);
      const required=this.reputationRequirement(c);
      const blocked=this.recruitBlockReason(human,c);
      const status=blocked||'Hire recruit';
      return `<div class="merc-token recruit-token ${blocked?'dead':''}" role="button" tabindex="0" data-id="${c.id}"><strong>${c.name}</strong><div class="token-meta">${c.archetype} - ${cost}g hire</div><div class="token-meta">${this.traitPreviewText(c)}</div><div class="token-meta">Upkeep: ${this.characterSalary(c)}g/year</div>${required?`<div class="token-meta">Requires ${required} rep</div>`:''}<div class="token-meta">${this.escapeHtml(status)}</div></div>`;
    }).join('')||'<p class="empty">The tavern is empty.</p>');
    if(isOpen)this.state.tavernHasNew=false;
    document.querySelectorAll('.recruit-token').forEach(b=>b.addEventListener('click',()=>this.hireFromTavern(b.dataset.id)));
  }
  escapeAttr(s){return String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  escapeHtml(s){return this.escapeAttr(s);}
  hiddenTraitCount(c){return Math.max(0,c.traits.length-(c.revealedTraits?.length||0));}
  traitPreviewText(c,showAllTraits=false){return showAllTraits?c.traits.join(', '):[...this.visibleTraits(c),...Array(this.hiddenTraitCount(c)).fill('?')].join(', ');}
  renderTraitChips(c,showAllTraits=false){
    if(showAllTraits)return c.traits.map(t=>this.tagHtml(t)).join('');
    return this.visibleTraits(c).map(t=>this.tagHtml(t)).join('')+Array.from({length:this.hiddenTraitCount(c)},()=>`<span class="trait unknown-trait">?</span>`).join('');
  }
  tagHtml(tag){return this.termLink(tag,'trait');}
  conditionHtml(condition){return `<button class="condition glossary-term" type="button" data-glossary-term="${this.escapeAttr(condition.key)}">${this.escapeHtml(condition.key)}${condition.remaining===null?'':` ${condition.remaining}`}</button>`;}
  contractTagHtml(req,kind){return `<button class="glossary-term contract-tag-term" type="button" data-glossary-term="${this.escapeAttr(req.trait)}" data-glossary-weight="${this.explicitTagWeight(req,kind)}">${this.escapeHtml(req.trait)}</button>`;}
  workerEngineSummary(worker){
    const effects=this.visibleTraits(worker).flatMap(trait=>this.data.characterParts.traitEffects?.[trait]||[]);
    if(!effects.length)return '';
    return `${worker.name}: ${this.visibleTraits(worker).filter(trait=>this.data.characterParts.traitEffects?.[trait]?.length).slice(0,2).join(' + ')}`;
  }
  contractOddsBreakdown(guild,contract,team){
    if(!team.length)return `Odds preview\nNo free mercenary team is available for this contract. Workers already committed to multi-season contracts cannot be reassigned.`;
    const progress=this.contractProgress(guild,contract);
    const materials=typeof progress?.materials==='number'?progress.materials:Math.min(guild.resources,contract.materials||0);
    const traitBonus=this.contractTraitEffectScore(guild,contract,team,materials);
    const facilityBonus=this.facilitySupportTraitEffectScore(guild,contract,team,materials);
    const readinessBonus=this.contractReadinessBonus(guild,contract);
    const workerLines=team.map(worker=>{
      const tags=this.characterTagScore(worker,contract);
      const stats=worker.resources*3+worker.connections*2;
      const penalty=this.conditionPenalty(worker);
      return `${worker.name}: +${tags}% tags, +${stats}% resources/connections${penalty?`, -${penalty}% conditions`:''}`;
    });
    const raw=this.rawSuccessChanceForTeam(guild,contract,team);
    return `Odds preview: ${this.successChanceForTeam(guild,contract,team)}% (${raw}% raw)\nTeam: ${team.map(worker=>worker.name).join(', ')}\nBase: 50%, Difficulty: -${contract.baseDifficulty}%\n${workerLines.join('\n')}\nGuild Connections: +${guild.connections*2}%\nResource capacity: +${materials*10}% (${materials}/${contract.materials||0}, not spent)\nReadiness marks: +${readinessBonus}%${this.contractReadinessText(guild,contract)?` (${this.contractReadinessText(guild,contract)})`:''}\nTrait engine rules: +${traitBonus}%\nFacility support: +${facilityBonus}%`;
  }
  cooperativeOddsBreakdown(contract){
    const claimant=this.contractClaimant(contract);
    const allParticipants=this.contractParticipantGuilds(contract);
    if(allParticipants.some(guild=>guild.id!==claimant?.id&&this.contractPosture(contract,guild)==='compete'))return '';
    const participants=allParticipants.filter(guild=>this.contractPosture(contract,guild)!=='compete');
    if(!claimant||!participants.length)return '';
    const team=this.combinedContractTeam(contract,participants);
    const raw=this.rawCooperativeSuccessChance(contract,claimant,participants,team);
    const allyLines=participants.filter(guild=>guild.id!==claimant.id).map(guild=>{
      const resources=Math.min(guild.resources,contract.materials||0)*4;
      const connections=guild.connections;
      const readiness=this.contractReadinessBonus(guild,contract);
      return `${guild.name}: +${resources}% resources, +${connections}% connections, +${readiness}% readiness`;
    });
    return `Cooperative project odds: ${this.cooperativeSuccessChance(contract,claimant,participants)}% (${raw}% raw)\nClaimant: ${claimant.name}\nTeam: ${team.map(worker=>worker.name).join(', ')}\n${allyLines.join('\n')||'No allied guild modifiers.'}`;
  }
  contractDisplayChance(contract,guild){
    const participants=this.contractParticipantGuilds(contract);
    const competitors=participants.filter(participant=>participant.id!==this.contractClaimant(contract)?.id&&this.contractPosture(contract,participant)==='compete');
    if(participants.length>1&&!competitors.length)return this.cooperativeSuccessChance(contract,this.contractClaimant(contract),participants);
    const placed=this.placedTeam(guild,contract);
    return placed.length?this.successChanceForTeam(guild,contract,placed):null;
  }
  worldLabel(key){return this.data.contractParts.world.states.find(s=>s.key===key)?.label||key;}
  renderContracts(){const human=this.activeLocalGuild();this.ui.contractGrid.innerHTML=this.state.boardContracts.map(c=>this.contractTile(c,human)).join('');this.bindContractButtons();this.bindDropSlots();}
  bindContractFocusButtons(){
    this.bindContractButtons();
  }
  bindContractButtons(){
    this.ui.contractGrid.querySelectorAll('[data-focus-contract]').forEach(btn=>btn.addEventListener('click',evt=>{
      evt.stopPropagation();
      this.state.focusContractId=this.state.focusContractId===btn.dataset.focusContract?null:btn.dataset.focusContract;
      if(this.state.focusContractId)this.state.focusFacilityKey=null;
      this.render();
    }));
    this.ui.contractGrid.querySelectorAll('[data-open-contract]').forEach(btn=>btn.addEventListener('click',evt=>{
      evt.stopPropagation();
      this.openContractPanel(btn.dataset.openContract);
    }));
  }
  contractTile(c,human){
    const placed=this.placedTeam(human,c);
    const chance=this.contractDisplayChance(c,human);
    const preview=chance===null?'No team':`${chance}%`;
    const readiness=this.contractReadinessCompactHtml(human,c);
    const focused=this.state.focusContractId===c.instanceId;
    const patron=c.patron?`<button class="contract-patron-chip" type="button" data-glossary-term="${this.escapeAttr(c.patron.key)}">${this.escapeHtml(c.patron.name)}</button>`:'';
    return `<article class="contract-tile ${focused?'focused-contract':''}" style="${this.contractAccentStyle(c)}"><div class="contract-top"><button class="contract-title-btn" type="button" data-open-contract="${c.instanceId}">${this.escapeHtml(c.title)}</button><button class="risk-badge glossary-term" type="button" data-glossary-term="${this.escapeAttr(c.risk)}">${this.escapeHtml(c.risk)}</button></div><div class="contract-subline"><span>${this.escapeHtml(c.type)}</span><span>${this.escapeHtml(this.contractWorkLabel(c,human))}</span><span>${c.reward.gold}g/${c.reward.reputation}r</span>${patron}</div>${this.contractClaimStripHtml(c)}${readiness}${this.contractSlotTrayHtml(c,human)}<div class="contract-actions"><button class="focus-contract-btn ${focused?'active':''}" type="button" data-focus-contract="${c.instanceId}">${focused?'Focused':'Focus'}</button><button class="contract-detail-action" type="button" data-open-contract="${c.instanceId}">Info</button><span class="contract-preview">${this.escapeHtml(preview)}</span></div></article>`;
  }
  contractClaimStripHtml(contract){
    const claimant=this.contractClaimant(contract);
    if(!claimant)return '';
    const competitors=this.state.guilds.filter(g=>g.id!==claimant.id&&this.placedTeam(g,contract).length&&this.contractPosture(contract,g)==='compete');
    const rejected=this.state.guilds.filter(g=>g.id!==claimant.id&&this.placedTeam(g,contract).length&&this.contractPosture(contract,g)==='rejected');
    const cooperators=this.state.guilds.filter(g=>g.id!==claimant.id&&this.placedTeam(g,contract).length&&this.contractPosture(contract,g)==='cooperate');
    const parts=[`Claim: ${claimant.name}`];
    if(cooperators.length)parts.push(`Coop: ${cooperators.map(g=>g.name).join(', ')}`);
    if(competitors.length)parts.push(`Contest: ${competitors.map(g=>g.name).join(', ')}`);
    if(rejected.length)parts.push(`Rejected: ${rejected.map(g=>g.name).join(', ')}`);
    return `<div class="contract-claim-strip">${parts.map(part=>`<span>${this.escapeHtml(part)}</span>`).join('')}</div>`;
  }
  contractInspectionHtml(contract,guild){
    const placed=this.placedTeam(guild,contract);
    const chance=this.contractDisplayChance(contract,guild);
    const needs=contract.requirements.map(r=>this.contractTagHtml(r,'primary')).join(', ')||'None';
    const helps=contract.support.map(r=>this.contractTagHtml(r,'support')).join(', ')||'None';
    const readiness=this.contractReadinessHtml(guild,contract);
    const cooperativeOdds=this.cooperativeOddsBreakdown(contract);
    const odds=cooperativeOdds?this.escapeHtml(cooperativeOdds).replace(/\n/g,'<br>'):placed.length?this.escapeHtml(this.contractOddsBreakdown(guild,contract,placed)).replace(/\n/g,'<br>'):'Assign mercs to preview success odds.';
    const rivals=this.rivalContractRosterHtml(contract);
    const patron=contract.patron?`<button class="contract-patron-chip detail" type="button" data-glossary-term="${this.escapeAttr(contract.patron.key)}">${this.escapeHtml(contract.patron.name)}</button>`:'None';
    return `<article class="game-card contract-inspection"><p class="contract-detail-note">${this.escapeHtml(this.contractDescriptionText(contract))}</p><div class="contract-detail-grid"><span><strong>Odds</strong>${chance===null?'No team':`${chance}%`}</span><span><strong>Work</strong>${this.escapeHtml(this.contractWorkLabel(contract,guild))}</span><span><strong>Reward</strong>${contract.reward.gold}g / ${contract.reward.reputation}r</span><span><strong>Resources</strong>${contract.materials||0}</span><span><strong>Offer</strong>${this.escapeHtml(this.contractOfferLabel(contract))}</span><span><strong>Patron</strong>${patron}</span></div><section class="contract-detail-tags"><h4>Needs</h4><p>${needs}</p><h4>Helps</h4><p>${helps}</p><h4>Readiness</h4>${readiness}</section><section class="engine-rules"><h4>Odds Preview</h4><p>${odds}</p></section>${rivals?`<section class="contract-detail-rivals"><h4>Rivals</h4>${rivals}</section>`:''}</article>`;
  }
  contractHeaderParts(contract){
    const patron=contract.patron?.name||'';
    let title=contract.workTitle||contract.title||'Contract';
    let prefix=contract.titlePrefix||'Contract';
    if(!contract.workTitle&&patron&&title.endsWith(` for ${patron}`))title=title.slice(0,-` for ${patron}`.length);
    if(!contract.titlePrefix){
      const twist=(this.data.contractParts.twists||[])
        .map(t=>t.label?.trim())
        .filter(Boolean)
        .sort((a,b)=>b.length-a.length)
        .find(label=>title.startsWith(`${label} `));
      if(twist){
        prefix=twist;
        title=title.slice(twist.length).trim();
      }
    }
    return {prefix,title,patron};
  }
  contractDescriptionText(contract){
    const patron=contract.patron?.name;
    if(!patron)return contract.description;
    return contract.description.replace(` Patron: ${patron}.`,'').replace(/\s+/g,' ').trim();
  }
  contractReadinessText(guild,contract){
    const readiness=this.contractReadiness(guild,contract);
    const parts=[];
    if(readiness.scouted)parts.push(`Scouted +${readiness.scouted*5}%`);
    if(readiness.planned&&this.contractPlanningApplies(guild,contract))parts.push('Planned +10%');
    return parts.join(', ');
  }
  contractReadinessHtml(guild,contract){
    const text=this.contractReadinessText(guild,contract);
    return `<div class="readiness-row">${text?text.split(', ').map(part=>`<span class="readiness-mark">${this.escapeHtml(part)}</span>`).join(''):'<span class="readiness-empty">No readiness marks</span>'}</div>`;
  }
  contractReadinessCompactHtml(guild,contract){
    const text=this.contractReadinessText(guild,contract);
    return text?`<div class="contract-readiness-strip">${text.split(', ').map(part=>`<span class="readiness-mark">${this.escapeHtml(part)}</span>`).join('')}</div>`:'';
  }
  contractSlotTrayHtml(contract,guild){
    const occupants=this.contractSlotOccupants(contract,guild).slice(0,this.contractSharedSlotLimit());
    const canDrop=this.contractAllowsNewPlacement(contract,guild);
    const slots=occupants.map(occupant=>this.contractOccupiedSlot(contract,occupant,guild));
    while(slots.length<this.contractSharedSlotLimit())slots.push(this.contractEmptySlot(contract,canDrop));
    return `<div class="contract-slot-tray">${slots.join('')}</div>`;
  }
  contractOccupiedSlot(contract,{guild,worker},viewer=this.activeLocalGuild()){
    const local=guild?.id===viewer?.id;
    const locked=!local||this.contractProgress(guild,contract);
    const posture=this.contractPosture(contract,guild);
    const challenge=!local&&this.contractAllowsNewPlacement(contract,viewer)&&!this.contractProgress(guild,contract);
    return `<div class="worker-slot contract-slot ${local?'local-slot':'rival-slot'} ${posture==='compete'?'compete-slot':posture==='cooperate'?'cooperate-slot':''} ${locked?'locked':''}" ${local&&!locked?`data-drop-type="contract" data-target="${contract.instanceId}" data-mode="cooperate"`:challenge?`data-drop-type="contract" data-target="${contract.instanceId}" data-mode="compete"`:''}>${this.slotWorkerHtml(worker,this.workerInitials(worker),locked)}</div>`;
  }
  contractEmptySlot(contract,droppable){
    return `<div class="worker-slot contract-slot empty-slot" ${droppable?`data-drop-type="contract" data-target="${contract.instanceId}" data-mode="cooperate"`:''}></div>`;
  }
  rivalContractRosterHtml(contract){
    const viewer=this.activeLocalGuild();
    const rows=this.state.guilds.filter(g=>g.id!==viewer?.id).map(g=>{
      const team=this.placedTeam(g,contract);
      if(!team.length)return '';
      const progress=this.contractProgress(g,contract);
      const odds=this.successChanceForTeam(g,contract,team);
      const tokens=team.map(worker=>`<span class="rival-merc-token">${this.workerInitials(worker)}</span>`).join('');
      return `<div class="rival-contract-row"><span class="rival-guild-name">${this.escapeHtml(g.name)}</span><div class="rival-token-row">${tokens}</div><span class="rival-odds">${odds}%${progress?` ${progress.remaining}/${progress.total}`:''}</span></div>`;
    }).filter(Boolean);
    return rows.length?`<div class="rival-contract-roster">${rows.join('')}</div>`:'';
  }
  contractMetaHtml(contract,guild){
    const resource=contract.materials?`<span class="contract-chip">${contract.materials} Res</span>`:'';
    return `<div class="contract-meta"><button class="risk-badge glossary-term" type="button" data-glossary-term="${this.escapeAttr(contract.risk)}">${this.escapeHtml(contract.risk)}</button><span class="contract-chip">${this.contractWorkLabel(contract,guild)}</span>${resource}</div>`;
  }
  contractWorkLabel(contract,guild){
    const progress=this.contractProgress(guild,contract);
    if(progress)return `${progress.remaining}/${progress.total} left`;
    return `${contract.workSeasons} season${contract.workSeasons===1?'':'s'} work`;
  }
  contractOfferLabel(contract){return contract.offerSeasons>0?`${contract.offerSeasons} season${contract.offerSeasons===1?'':'s'} open`:'closed';}
  contractOccupantLabel(guild,contract){
    const count=this.placedTeam(guild,contract).length;
    const progress=this.contractProgress(guild,contract);
    return `${guild.name}: ${count}${progress?` (${progress.remaining}/${progress.total})`:''}`;
  }
  workerSlot(contract,worker,guild=this.activeLocalGuild(),index=0){
    const locked=this.contractProgress(guild,contract);
    const closed=contract.offerSeasons<=0&&!worker&&!locked;
    return `<div class="worker-slot ${locked?'locked':''}" data-drop-type="contract" data-target="${contract.instanceId}">${worker?this.slotWorkerHtml(worker,this.workerInitials(worker),locked):closed?'':''}</div>`;
  }
  recoverySlot(worker){
    return `<div class="worker-slot recovery-slot" data-drop-type="recovery">${worker?this.slotWorkerHtml(worker,this.workerInitials(worker),false):''}</div>`;
  }
  renderFacilities(){const human=this.activeLocalGuild();this.ui.facilityGrid.innerHTML=this.data.contractParts.facilities.map(f=>this.facilityTile(f,human)).join('');this.bindFacilityButtons();this.bindDropSlots();}
  bindFacilityButtons(){
    this.ui.facilityGrid.querySelectorAll('[data-focus-facility]').forEach(btn=>btn.addEventListener('click',evt=>{
      evt.stopPropagation();
      this.state.focusFacilityKey=this.state.focusFacilityKey===btn.dataset.focusFacility?null:btn.dataset.focusFacility;
      if(this.state.focusFacilityKey)this.state.focusContractId=null;
      this.render();
    }));
  }
  facilityTile(f,guild){
    const workers=this.facilityWorkers(guild,f.key,'work');
    const evolved=this.facilityEvolutionPatron(guild,f);
    const focused=this.state.focusFacilityKey===f.key;
    return `<article class="facility-tile ${focused?'focused-facility':''}"><div class="facility-top"><button class="facility-title-btn" type="button" data-glossary-term="${this.escapeAttr(evolved?.key||f.key)}">${this.escapeHtml(this.facilityDisplayLabel(guild,f))}</button><div class="facility-actions"><span class="facility-ready-count">${this.facilityReadyLabel(guild,f)}</span><button class="focus-contract-btn ${focused?'active':''}" type="button" data-focus-facility="${this.escapeAttr(f.key)}">${focused?'Focused':'Focus'}</button></div></div><div class="slot-row facility-slot-tray">${Array.from({length:this.facilitySlotCount(guild,f)},(_,i)=>this.facilitySlot(f,workers[i])).join('')}</div></article>`;
  }
  facilitySlot(f,worker){return `<div class="worker-slot facility-slot" data-drop-type="facility" data-target="${f.key}">${worker?this.slotWorkerHtml(worker,this.workerInitials(worker),false):''}</div>`;}
  slotWorkerHtml(worker,label,locked=false){
    const draggable=worker.alive&&this.state.phase==='awaitHuman'&&!this.state.humanActionUsed&&!locked;
    return `<span class="slot-worker" ${draggable?`draggable="true" data-id="${worker.id}"`:''}>${label}</span>`;
  }
  workerInitials(worker){return worker.name.split(' ').map(x=>x[0]).join('').slice(0,2);}
  bindDragSources(){document.querySelectorAll('[draggable="true"][data-id]').forEach(el=>{el.addEventListener('dragstart',evt=>{evt.dataTransfer.setData('text/plain',el.dataset.id);evt.dataTransfer.effectAllowed='move';});});}
  bindReturnDrop(el){if(!el)return;el.classList.add('return-drop');el.ondragover=evt=>{if(this.state.phase!=='awaitHuman'||this.state.humanActionUsed)return;evt.preventDefault();el.classList.add('over');};el.ondragleave=()=>el.classList.remove('over');el.ondrop=evt=>{evt.preventDefault();el.classList.remove('over');const id=evt.dataTransfer.getData('text/plain');this.returnWorker(id);};}
  bindDropSlots(){this.bindDragSources();this.bindReturnDrop(this.ui.peopleGrid);document.querySelectorAll('.worker-slot[data-drop-type]').forEach(slot=>{slot.addEventListener('dragover',evt=>{evt.preventDefault();slot.classList.add('over');});slot.addEventListener('dragleave',()=>slot.classList.remove('over'));slot.addEventListener('drop',evt=>{evt.preventDefault();slot.classList.remove('over');const id=evt.dataTransfer.getData('text/plain');this.placeWorker(id,slot.dataset.target,slot.dataset.dropType,slot.dataset.mode||'work');});});}
  facilityReadyHtml(guild,facility){
    const ready=this.facilityReadyCount(guild,facility.key);
    const planned=this.facilityPlanningApplies(guild,facility)?this.facilityTrainingPlanCount(guild,facility.key):0;
    const marks=[...Array.from({length:ready},()=>`<span class="facility-ready-mark">Ready</span>`),...Array.from({length:planned},()=>`<span class="facility-ready-mark">Planned</span>`)];
    return `<div class="facility-ready-row">${marks.length?marks.join(''):'<span class="facility-ready-empty">Not ready</span>'}</div>`;
  }
  facilityReadyLabel(guild,facility){
    const ready=this.facilityReadyCount(guild,facility.key);
    const planned=this.facilityPlanningApplies(guild,facility)?this.facilityTrainingPlanCount(guild,facility.key):0;
    return `${ready}/3 Worked${planned?' + Planned':''}`;
  }
}


const game = new Game();
game.init();
game.bindUI();
game.render();
