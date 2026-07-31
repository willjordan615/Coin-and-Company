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
    "boardSize": 5,
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
      "difficulty": 2,
      "gold": 2,
      "rep": 1
    },
    {
      "key": "duke",
      "name": "the Ducal Court",
      "trait": "Noble",
      "difficulty": 6,
      "gold": 8,
      "rep": 2
    },
    {
      "key": "market",
      "name": "the Market League",
      "trait": "Shrewd",
      "difficulty": 3,
      "gold": 7,
      "rep": 0
    },
    {
      "key": "watch",
      "name": "the Town Watch",
      "trait": "Watchful",
      "difficulty": 4,
      "gold": 4,
      "rep": 1
    },
    {
      "key": "farmers",
      "name": "the Free Farmers",
      "trait": "Rural",
      "difficulty": 0,
      "gold": 1,
      "rep": 1
    },
    {
      "key": "university",
      "name": "the University",
      "trait": "Scholar",
      "difficulty": 5,
      "gold": 5,
      "rep": 2
    },
    {
      "key": "caravan",
      "name": "a Foreign Caravan",
      "trait": "Connected",
      "difficulty": 7,
      "gold": 10,
      "rep": 1
    },
    {
      "key": "frontier",
      "name": "the Frontier Villages",
      "trait": "Hardy",
      "difficulty": 4,
      "gold": 3,
      "rep": 2
    },
    {
      "key": "shipwrights",
      "name": "the River Shipwrights",
      "trait": "Craftsman",
      "difficulty": 3,
      "gold": 6,
      "rep": 1
    },
    {
      "key": "masons",
      "name": "the Stonecutters' Hall",
      "trait": "Stoneworker",
      "difficulty": 4,
      "gold": 5,
      "rep": 1
    },
    {
      "key": "miners",
      "name": "the Deep Mine Compact",
      "trait": "Strong",
      "difficulty": 5,
      "gold": 7,
      "rep": 1
    },
    {
      "key": "pilgrims",
      "name": "a Pilgrim Host",
      "trait": "Patient",
      "difficulty": 1,
      "gold": 1,
      "rep": 3
    },
    {
      "key": "magistrates",
      "name": "the Magistrates' Bench",
      "trait": "Careful",
      "difficulty": 6,
      "gold": 5,
      "rep": 3
    },
    {
      "key": "borderlords",
      "name": "the Border Lords",
      "trait": "Veteran",
      "difficulty": 9,
      "gold": 12,
      "rep": 2
    },
    {
      "key": "orphans",
      "name": "the Orphans' Trust",
      "trait": "Compassionate",
      "difficulty": 0,
      "gold": 0,
      "rep": 4
    },
    {
      "key": "underworld",
      "name": "a Discreet Underworld Broker",
      "trait": "Criminal",
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
    "Ambitious": [
      {
        "trigger": "contractScore",
        "roles": [
          "lead"
        ],
        "risks": [
          "dangerous",
          "deadly",
          "lethal"
        ],
        "type": "roleBonus",
        "amount": 6,
        "description": "+6% when leading dangerous work."
      },
      {
        "trigger": "contractSuccess",
        "risks": [
          "deadly",
          "lethal"
        ],
        "type": "gainGuild",
        "stat": "reputation",
        "amount": 3,
        "description": "+3 reputation after succeeding at deadly stakes."
      },
      {
        "trigger": "death",
        "type": "gainGuild",
        "stat": "reputation",
        "amount": 2,
        "description": "When a teammate dies on a job, converts tragedy into +2 reputation."
      }
    ],
    "Battlewise": [
      {
        "trigger": "contractScore",
        "risks": [
          "dangerous",
          "deadly"
        ],
        "teammateAny": [
          "Soldier",
          "Veteran",
          "Fearless",
          "Strong"
        ],
        "type": "teamBonus",
        "amount": 6,
        "description": "+6% when teamed with another martial merc on dangerous work."
      },
      {
        "trigger": "contractFailure",
        "types": [
          "Military",
          "Combat",
          "Defense",
          "Assault",
          "Guard Duty"
        ],
        "type": "softenFailure",
        "failureTypes": [
          "injury"
        ],
        "chance": 25,
        "description": "25% chance to reduce injury fallout on martial work."
      }
    ],
    "Builder": [
      {
        "trigger": "contractScore",
        "types": [
          "Construction",
          "Engineering",
          "Public Works"
        ],
        "type": "pairBonus",
        "requiresAny": [
          "Carpenter",
          "Mason",
          "Stonecutter",
          "Craftsman"
        ],
        "amount": 7,
        "description": "+7% when paired with a construction profession."
      },
      {
        "trigger": "facilityResolve",
        "facilities": [
          "workshop"
        ],
        "type": "statPerAssignedContractMerc",
        "stat": "reputation",
        "amount": 1,
        "description": "At Workshop, visible planning earns 1 reputation per merc assigned to contracts."
      },
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
        "description": "30% chance to advance long building work an extra step."
      }
    ],
    "Careful": [
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
        "amount": 4,
        "description": "+4% on precise work."
      },
      {
        "trigger": "contractFailure",
        "type": "softenFailure",
        "failureTypes": [
          "negative_trait",
          "reputation_loss"
        ],
        "chance": 35,
        "description": "35% chance to soften morale or reputation fallout."
      }
    ],
    "Charming": [
      {
        "trigger": "contractScore",
        "patronTags": [
          "Noble",
          "Connected",
          "Influential"
        ],
        "type": "patronBonus",
        "amount": 5,
        "description": "+5% when the patron cares about social access."
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
        "amount": 1,
        "description": "+1 reputation after social success."
      }
    ],
    "Compassionate": [
      {
        "trigger": "contractSuccess",
        "types": [
          "Relief",
          "Religion",
          "Civic",
          "Pilgrimage",
          "Sanitation"
        ],
        "type": "recoverTeam",
        "kinds": [
          "morale",
          "strain"
        ],
        "amount": 1,
        "description": "On caring success, clears 1 morale or strain step from the team."
      },
      {
        "trigger": "conditionAdded",
        "conditionKinds": [
          "injury",
          "strain",
          "morale"
        ],
        "type": "recoverVictim",
        "kinds": [
          "injury",
          "strain",
          "morale"
        ],
        "amount": 1,
        "description": "When a teammate takes a temporary hit, immediately helps reduce it by 1 step."
      }
    ],
    "Connected": [
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
          "Diplomacy",
          "Influence",
          "Intrigue"
        ],
        "type": "gainGuild",
        "stat": "connections",
        "amount": 1,
        "cap": 5,
        "description": "+1 Connection after networked success."
      }
    ],
    "Criminal": [
      {
        "trigger": "contractScore",
        "types": [
          "Intrigue",
          "Investigation",
          "Commerce"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "+5% on hidden or illicit work."
      },
      {
        "trigger": "contractSuccess",
        "types": [
          "Intrigue",
          "Commerce"
        ],
        "type": "gainGuild",
        "stat": "gold",
        "amount": 5,
        "description": "+5 gold after exploiting a shadow opportunity."
      }
    ],
    "Craftsman": [
      {
        "trigger": "contractScore",
        "types": [
          "Crafting",
          "Manufacturing",
          "Construction",
          "Engineering"
        ],
        "type": "pairBonus",
        "requiresAny": [
          "Smith",
          "Practical",
          "Inventive",
          "Blacksmith",
          "Carpenter",
          "Mason"
        ],
        "amount": 6,
        "description": "+6% when paired with another craft enabler."
      },
      {
        "trigger": "facilityResolve",
        "facilities": [
          "workshop"
        ],
        "type": "gainGuild",
        "stat": "resources",
        "amount": 1,
        "cap": 8,
        "description": "At Workshop, produces 1 Resource."
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
        "cap": 5,
        "description": "+1 Connection after discovery success."
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "scout"
        ],
        "types": [
          "Exploration",
          "Investigation",
          "Inquiry"
        ],
        "type": "contractBonus",
        "amount": 8,
        "description": "At Scout Lodge, +8% to exploration, investigation, or inquiry contracts this season."
      }
    ],
    "Disgraced": [
      {
        "trigger": "contractScore",
        "types": [
          "Intrigue",
          "Exploration"
        ],
        "risks": [
          "dangerous",
          "deadly"
        ],
        "type": "contractBonus",
        "amount": 7,
        "description": "+7% on dirty dangerous work."
      },
      {
        "trigger": "contractFailure",
        "type": "softenFailure",
        "failureTypes": [
          "reputation_loss"
        ],
        "chance": 40,
        "description": "40% chance to halve reputation loss; their name was already tarnished."
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
        "amount": 4,
        "description": "+4% on religious or supernatural work."
      },
      {
        "trigger": "contractFailure",
        "type": "softenFailure",
        "failureTypes": [
          "negative_trait",
          "death"
        ],
        "chance": 25,
        "description": "25% chance to turn trauma or death fallout into Shaken."
      },
      {
        "trigger": "death",
        "type": "gainGuild",
        "stat": "reputation",
        "amount": 3,
        "description": "When a teammate dies, the guild gains +3 reputation for honoring the sacrifice."
      }
    ],
    "Fearless": [
      {
        "trigger": "contractScore",
        "risks": [
          "dangerous",
          "deadly",
          "lethal"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "+5% on dangerous work."
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
        "description": "25% chance to ignore a new temporary condition from dangerous work."
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
        "amount": 5,
        "description": "+5% if the guild is short on materials."
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
        "amount": 3,
        "description": "+3 gold after efficient success."
      }
    ],
    "Generous": [
      {
        "trigger": "contractSuccess",
        "types": [
          "Relief",
          "Civic",
          "Religion"
        ],
        "type": "recoverGuild",
        "kinds": [
          "morale"
        ],
        "amount": 1,
        "description": "After public-service success, clears 1 morale step from any guildmate."
      },
      {
        "trigger": "conditionAdded",
        "conditionKinds": [
          "morale",
          "strain"
        ],
        "type": "recoverTeam",
        "kinds": [
          "morale",
          "strain"
        ],
        "amount": 1,
        "description": "When the team suffers fatigue or morale damage, helps one worker recover 1 step."
      },
      {
        "trigger": "facilityResolve",
        "facilities": [
          "chapel"
        ],
        "type": "gainGuild",
        "stat": "reputation",
        "amount": 1,
        "description": "At Chapel, charity builds goodwill for +1 reputation."
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
        "description": "Offsets up to 6% of strain or injury penalties on hard travel."
      },
      {
        "trigger": "contractProgress",
        "minWorkSeasons": 2,
        "type": "recoverSelf",
        "kinds": [
          "strain"
        ],
        "amount": 1,
        "description": "During long work, may shrug off 1 strain step."
      },
      {
        "trigger": "contractFailure",
        "types": [
          "Exploration",
          "Hunt",
          "Logistics"
        ],
        "type": "softenFailure",
        "failureTypes": [
          "injury",
          "death"
        ],
        "chance": 25,
        "description": "25% chance to survive travel disaster with reduced harm."
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
        "description": "Offsets up to 10% of injury or strain penalties on the team."
      },
      {
        "trigger": "conditionAdded",
        "conditionKinds": [
          "injury"
        ],
        "type": "recoverVictim",
        "kinds": [
          "injury"
        ],
        "amount": 1,
        "description": "When a teammate is injured, immediately reduces that injury by 1 step."
      }
    ],
    "Honest": [
      {
        "trigger": "contractScore",
        "patronTags": [
          "Careful",
          "Noble",
          "Faithful"
        ],
        "type": "patronBonus",
        "amount": 4,
        "description": "+4% with patrons who value credibility."
      },
      {
        "trigger": "facilityResolve",
        "facilities": [
          "common"
        ],
        "type": "statPerAssignedContractMerc",
        "stat": "reputation",
        "amount": 1,
        "description": "At Common Room, gain 1 reputation per merc assigned to contracts."
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
        "amount": 1,
        "description": "+1 reputation after credible public work."
      }
    ],
    "Influential": [
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
        "description": "+6% when leading institutional work."
      },
      {
        "trigger": "facilityResolve",
        "facilities": [
          "market"
        ],
        "type": "statPerAssignedContractMerc",
        "stat": "reputation",
        "amount": 1,
        "description": "At Market Hall, public introductions earn 1 reputation per merc assigned to contracts."
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
        "amount": 2,
        "description": "+2 reputation after institutional success."
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
        "amount": 5,
        "description": "+5% when the guild covers 1+ Resource requirement."
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
        "type": "materialEcho",
        "amount": 8,
        "description": "At Workshop, +8% to engineering, manufacturing, craft, or foundry contracts if the guild covers 1+ Resource requirement."
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
        "teammateAny": [
          "Scholar",
          "Curious",
          "Careful",
          "Scribe",
          "Tutor"
        ],
        "type": "teamBonus",
        "amount": 5,
        "description": "+5% with another knowledge worker."
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "archives"
        ],
        "types": [
          "Scholarship",
          "Inquiry",
          "Legal",
          "Engineering"
        ],
        "minWorkSeasons": 2,
        "type": "contractBonus",
        "amount": 10,
        "description": "At Archives, +10% to long scholarship, inquiry, legal, or engineering contracts."
      }
    ],
    "Lucky": [
      {
        "trigger": "contractFailure",
        "type": "nearMissSuccess",
        "margin": 8,
        "chance": 45,
        "description": "45% chance to turn a failure within 8 points into success."
      }
    ],
    "Noble": [
      {
        "trigger": "contractScore",
        "patronTags": [
          "Noble",
          "Influential",
          "Connected"
        ],
        "type": "patronBonus",
        "amount": 6,
        "description": "+6% with elite or institution-facing patrons."
      },
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
        "amount": 1,
        "description": "+1 reputation after high-status success."
      }
    ],
    "Patient": [
      {
        "trigger": "facilityWork",
        "type": "trainingAssist",
        "amount": 8,
        "description": "+8% training chance for this merc at any facility."
      },
      {
        "trigger": "contractScore",
        "types": [
          "Relief",
          "Sanitation",
          "Scholarship",
          "Religion"
        ],
        "type": "contractBonus",
        "amount": 3,
        "description": "+3% on slow, careful work."
      },
      {
        "trigger": "contractFailure",
        "minWorkSeasons": 2,
        "type": "softenFailure",
        "failureTypes": [
          "negative_trait"
        ],
        "chance": 30,
        "description": "30% chance to prevent long-work frustration from fully landing."
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
        "description": "+5% when the guild commits at least 1 Resource."
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
        "chance": 22,
        "amount": 1,
        "description": "22% chance to advance long practical work an extra step."
      }
    ],
    "Resourceful": [
      {
        "trigger": "contractScore",
        "type": "missingMaterialBuffer",
        "amount": 6,
        "description": "+6% when the guild is short on materials."
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
        "cap": 8,
        "description": "At Scout Lodge or Common Room, turns scraps into 1 Resource."
      },
      {
        "trigger": "contractFailure",
        "type": "softenFailure",
        "failureTypes": [
          "material_loss",
          "negative_trait",
          "injury"
        ],
        "chance": 30,
        "description": "30% chance to soften supply or condition fallout."
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
        "world": {
          "food": "low"
        },
        "type": "worldBonus",
        "amount": 6,
        "description": "+6% on food/land work when Food Supply is low."
      },
      {
        "trigger": "contractSuccess",
        "types": [
          "Agriculture",
          "Provisioning"
        ],
        "type": "gainGuild",
        "stat": "resources",
        "amount": 1,
        "cap": 8,
        "description": "+1 Resource after local food success."
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
        "type": "pairBonus",
        "requiresAny": [
          "Watchful",
          "Hardy",
          "Resourceful",
          "Hunter",
          "Outrider"
        ],
        "amount": 6,
        "description": "+6% when paired with fieldcraft support."
      },
      {
        "trigger": "facilityResolve",
        "facilities": [
          "scout"
        ],
        "type": "statPerAssignedContractMerc",
        "stat": "gold",
        "amount": 1,
        "description": "At Scout Lodge, route intelligence earns 1 gold per merc assigned to contracts."
      },
      {
        "trigger": "contractFailure",
        "types": [
          "Exploration",
          "Hunt",
          "Logistics"
        ],
        "type": "softenFailure",
        "failureTypes": [
          "injury",
          "negative_trait",
          "death"
        ],
        "chance": 30,
        "description": "30% chance to spot trouble before it fully lands."
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
        "roles": [
          "support"
        ],
        "type": "roleBonus",
        "amount": 5,
        "description": "+5% when supporting quiet work."
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
        "amount": 4,
        "description": "+4 gold after quiet success."
      }
    ],
    "Scholar": [
      {
        "trigger": "contractScore",
        "types": [
          "Scholarship",
          "Inquiry",
          "Engineering",
          "Agriculture"
        ],
        "type": "pairBonus",
        "requiresAny": [
          "Curious",
          "Careful",
          "Learned",
          "Scribe",
          "Tutor"
        ],
        "amount": 6,
        "description": "+6% when paired with another knowledge trait."
      },
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
        "description": "At Archives, +8% to scholarship, inquiry, engineering, or agriculture contracts this season."
      }
    ],
    "Seasoned": [
      {
        "trigger": "contractScore",
        "minWorkSeasons": 2,
        "type": "contractBonus",
        "amount": 5,
        "description": "+5% on multi-season contracts."
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "common"
        ],
        "minWorkSeasons": 2,
        "type": "contractBonus",
        "amount": 7,
        "description": "At Common Room, +7% to multi-season contracts this season."
      },
      {
        "trigger": "contractFailure",
        "type": "softenFailure",
        "failureTypes": [
          "negative_trait",
          "injury"
        ],
        "chance": 25,
        "description": "25% chance to soften a condition from hard experience."
      }
    ],
    "Shrewd": [
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
        "amount": 4,
        "description": "+4 gold after reading the table correctly."
      },
      {
        "trigger": "facilityResolve",
        "facilities": [
          "market"
        ],
        "selfHasAny": [
          "Merchant"
        ],
        "type": "goldPerAssignedContractMerc",
        "amount": 5,
        "description": "At Market Hall as a Merchant, gain 5 gold per merc assigned to contracts."
      }
    ],
    "Smith": [
      {
        "trigger": "contractScore",
        "types": [
          "Crafting",
          "Manufacturing",
          "Foundry",
          "Harbor Works"
        ],
        "type": "pairBonus",
        "requiresAny": [
          "Craftsman",
          "Practical",
          "Blacksmith",
          "Armorer"
        ],
        "amount": 6,
        "description": "+6% when paired with another workshop enabler."
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
        "amount": 7,
        "description": "At Workshop, +7% to manufacturing, foundry, or harbor works contracts this season."
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
        "type": "pairBonus",
        "requiresAny": [
          "Mason",
          "Miner",
          "Stonecutter",
          "Builder"
        ],
        "amount": 6,
        "description": "+6% when paired with stonework support."
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
        "description": "25% chance to push stonework ahead an extra step."
      }
    ],
    "Strong": [
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
        "description": "+5% when leading a team that can use muscle."
      }
    ],
    "Stubborn": [
      {
        "trigger": "contractFailure",
        "type": "ignoreCondition",
        "chance": 30,
        "description": "30% chance to ignore a new temporary condition."
      },
      {
        "trigger": "conditionAdded",
        "victimSelf": true,
        "conditionKinds": [
          "morale",
          "strain"
        ],
        "type": "recoverVictim",
        "kinds": [
          "morale",
          "strain"
        ],
        "amount": 1,
        "description": "When this worker takes morale or strain, immediately reduces it by 1 step."
      },
      {
        "trigger": "contractProgress",
        "minWorkSeasons": 2,
        "type": "recoverSelf",
        "kinds": [
          "morale",
          "strain"
        ],
        "amount": 1,
        "description": "During long work, may clear 1 morale or strain step from self."
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
        "type": "pairBonus",
        "requiresAny": [
          "Soldier",
          "Battlewise",
          "Fearless",
          "Strong"
        ],
        "amount": 9,
        "description": "+9% when paired with martial support."
      },
      {
        "trigger": "facilityResolve",
        "facilities": [
          "training"
        ],
        "type": "statPerAssignedContractMerc",
        "stat": "reputation",
        "amount": 2,
        "description": "At Training Yard, veteran drills earn 2 reputation per merc assigned to contracts."
      },
      {
        "trigger": "contractFailure",
        "type": "softenFailure",
        "failureTypes": [
          "injury",
          "death"
        ],
        "chance": 30,
        "description": "30% chance to soften injury or death fallout."
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
        "roles": [
          "support"
        ],
        "type": "roleBonus",
        "amount": 5,
        "description": "+5% when supporting watchful work."
      },
      {
        "trigger": "facilityResolve",
        "facilities": [
          "scout"
        ],
        "type": "statPerAssignedContractMerc",
        "stat": "reputation",
        "amount": 1,
        "description": "At Scout Lodge, warnings earn 1 reputation per merc assigned to contracts."
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
        "description": "30% chance to spot trouble before it fully lands."
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
        "amount": 3,
        "description": "+3 gold after trade success."
      }
    ],
    "Soldier": [
      {
        "trigger": "contractScore",
        "roles": [
          "lead"
        ],
        "types": [
          "Military",
          "Combat",
          "Defense",
          "Assault",
          "Guard Duty"
        ],
        "type": "roleBonus",
        "amount": 4,
        "description": "+4% when leading martial work."
      },
      {
        "trigger": "facilityResolve",
        "facilities": [
          "training"
        ],
        "type": "recoverSelf",
        "kinds": [
          "strain"
        ],
        "amount": 1,
        "description": "At Training Yard, clears 1 strain step from self."
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
        "description": "At Training Yard, +5% to martial contracts this season."
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
        "description": "35% chance to downgrade injury or death fallout."
      },
      {
        "trigger": "facilityResolve",
        "facilities": [
          "infirmary"
        ],
        "type": "recoverGuild",
        "kinds": [
          "injury",
          "strain"
        ],
        "amount": 1,
        "description": "At Infirmary, helps one guildmate recover injury or strain."
      }
    ],
    "Diplomat": [
      {
        "trigger": "contractScore",
        "patronTags": [
          "Noble",
          "Connected",
          "Influential"
        ],
        "type": "patronBonus",
        "amount": 6,
        "description": "+6% with social or high-status patrons."
      },
      {
        "trigger": "contractSuccess",
        "types": [
          "Diplomacy",
          "Influence",
          "Commerce"
        ],
        "type": "gainGuild",
        "stat": "connections",
        "amount": 1,
        "cap": 5,
        "description": "+1 Connection after negotiation success."
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
        "description": "25% chance to advance long construction an extra step."
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
        "description": "25% chance to advance long stonework an extra step."
      }
    ],
    "Farmer": [
      {
        "trigger": "contractSuccess",
        "types": [
          "Agriculture",
          "Provisioning"
        ],
        "world": {
          "food": "low"
        },
        "type": "gainGuild",
        "stat": "resources",
        "amount": 1,
        "cap": 8,
        "description": "+1 Resource after food work during scarcity."
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
        "teammateAny": [
          "Scout",
          "Watchful",
          "Forester"
        ],
        "type": "teamBonus",
        "amount": 5,
        "description": "+5% with field tracking support."
      }
    ],
    "Clerk": [
      {
        "trigger": "contractScore",
        "types": [
          "Scholarship",
          "Legal",
          "Accounting",
          "Administration"
        ],
        "roles": [
          "support"
        ],
        "type": "roleBonus",
        "amount": 5,
        "description": "+5% when supporting records work."
      },
      {
        "trigger": "facilityResolve",
        "facilities": [
          "archives"
        ],
        "type": "statPerAssignedContractMerc",
        "stat": "gold",
        "amount": 1,
        "description": "At Archives, gain 1 gold per merc assigned to contracts by keeping accounts tight."
      }
    ],
    "Scribe": [
      {
        "trigger": "facilityResolve",
        "facilities": [
          "archives"
        ],
        "type": "statPerAssignedContractMerc",
        "stat": "reputation",
        "amount": 1,
        "description": "At Archives, records work earns 1 reputation per merc assigned to contracts."
      },
      {
        "trigger": "contractSuccess",
        "types": [
          "Scholarship",
          "Legal",
          "Accounting",
          "Administration"
        ],
        "type": "gainGuild",
        "stat": "reputation",
        "amount": 1,
        "description": "+1 reputation after records success."
      }
    ],
    "Smuggler": [
      {
        "trigger": "contractFailure",
        "types": [
          "Intrigue",
          "Commerce",
          "Exploration"
        ],
        "type": "softenFailure",
        "failureTypes": [
          "gold_loss",
          "material_loss",
          "reputation_loss"
        ],
        "chance": 30,
        "description": "30% chance to keep a failed operation from becoming expensive."
      },
      {
        "trigger": "contractSuccess",
        "types": [
          "Intrigue",
          "Commerce",
          "Exploration"
        ],
        "type": "gainGuild",
        "stat": "gold",
        "amount": 5,
        "description": "+5 gold after using hidden routes."
      }
    ],
    "Warden": [
      {
        "trigger": "contractFailure",
        "types": [
          "Military",
          "Legal",
          "Administration",
          "Defense"
        ],
        "type": "softenFailure",
        "failureTypes": [
          "reputation_loss",
          "injury"
        ],
        "chance": 25,
        "description": "25% chance to contain official fallout."
      }
    ],
    "Apothecary": [
      {
        "trigger": "facilityResolve",
        "facilities": [
          "infirmary"
        ],
        "type": "statPerAssignedContractMerc",
        "stat": "gold",
        "amount": 1,
        "description": "At Infirmary, remedies earn 1 gold per merc assigned to contracts."
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
        "description": "At Infirmary, +6% to relief, sanitation, or crisis contracts this season."
      }
    ],
    "Armorer": [
      {
        "trigger": "contractScore",
        "types": [
          "Manufacturing",
          "Foundry",
          "Defense",
          "Combat"
        ],
        "teammateAny": [
          "Soldier",
          "Veteran",
          "Battlewise"
        ],
        "type": "teamBonus",
        "amount": 5,
        "description": "+5% when equipping martial teammates."
      }
    ],
    "Bailiff": [
      {
        "trigger": "contractFailure",
        "types": [
          "Legal",
          "Administration",
          "Civic"
        ],
        "type": "softenFailure",
        "failureTypes": [
          "reputation_loss"
        ],
        "chance": 35,
        "description": "35% chance to contain public/legal fallout."
      }
    ],
    "Blacksmith": [
      {
        "trigger": "facilityResolve",
        "facilities": [
          "workshop"
        ],
        "type": "statPerAssignedContractMerc",
        "stat": "gold",
        "amount": 1,
        "description": "At Workshop, repairs and fittings earn 1 gold per merc assigned to contracts."
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
        "chance": 20,
        "amount": 1,
        "description": "20% chance to advance long river or harbor work."
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
        "description": "35% chance to downgrade injury or death fallout."
      },
      {
        "trigger": "conditionAdded",
        "conditionKinds": [
          "injury"
        ],
        "type": "recoverVictim",
        "kinds": [
          "injury"
        ],
        "amount": 1,
        "description": "When a teammate is injured, immediately reduces that injury by 1 step."
      },
      {
        "trigger": "facilityResolve",
        "facilities": [
          "infirmary"
        ],
        "type": "statPerAssignedContractMerc",
        "stat": "reputation",
        "amount": 1,
        "description": "At Infirmary, field surgery readiness earns 1 reputation per merc assigned to contracts."
      }
    ],
    "Cook": [
      {
        "trigger": "facilityResolve",
        "facilities": [
          "common"
        ],
        "type": "recoverGuild",
        "kinds": [
          "strain",
          "morale"
        ],
        "amount": 1,
        "description": "At Common Room, helps one guildmate recover strain or morale."
      },
      {
        "trigger": "facilitySupport",
        "facilities": [
          "common"
        ],
        "types": [
          "Provisioning",
          "Relief",
          "Civic"
        ],
        "type": "contractBonus",
        "amount": 5,
        "description": "At Common Room, +5% to provisioning, relief, or civic contracts this season."
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
          "support"
        ],
        "type": "roleBonus",
        "amount": 5,
        "description": "+5% when supporting route or message work."
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
        "description": "At Scout Lodge, +6% to logistics, exploration, or intrigue contracts this season."
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
        "world": {
          "monsters": "high"
        },
        "type": "worldBonus",
        "amount": 6,
        "description": "+6% when Monster Activity is high."
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
        "world": {
          "monsters": "high"
        },
        "type": "worldBonus",
        "amount": 8,
        "description": "At Scout Lodge, +8% to exploration, hunt, or logistics contracts while Monster Activity is high."
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
        "amount": 4,
        "description": "+4 gold after specialized workshop success."
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
        "description": "At Workshop, +6% to manufacturing, craft, or foundry contracts this season."
      }
    ],
    "Herbalist": [
      {
        "trigger": "contractSuccess",
        "types": [
          "Relief",
          "Agriculture",
          "Sanitation"
        ],
        "type": "recoverTeam",
        "kinds": [
          "injury",
          "strain"
        ],
        "amount": 1,
        "description": "After field-care success, helps the team recover injury or strain."
      }
    ],
    "Innkeeper": [
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
        "description": "At Market Hall or Common Room, +6% to commerce, civic, diplomacy, or provisioning contracts this season."
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
        "amount": 1,
        "cap": 8,
        "description": "+1 Resource after mining or extraction success."
      }
    ],
    "Monk": [
      {
        "trigger": "facilityResolve",
        "facilities": [
          "chapel"
        ],
        "type": "recoverGuild",
        "kinds": [
          "morale",
          "trauma"
        ],
        "amount": 1,
        "description": "At Chapel, helps one guildmate recover morale or trauma."
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
        "description": "At Chapel, +7% to religion, crisis, or pilgrimage contracts this season."
      },
      {
        "trigger": "death",
        "type": "gainGuild",
        "stat": "reputation",
        "amount": 2,
        "description": "When a teammate dies, memorial rites grant +2 reputation."
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
        "amount": 5,
        "description": "+5% when leading route, scout, or mounted work."
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
        "world": {
          "trade": "low"
        },
        "type": "worldBonus",
        "amount": 5,
        "description": "+5% when Trade Stability is disrupted."
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
        "description": "25% chance to advance long stone or quarry work."
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
        "amount": 4,
        "description": "+4 gold after official money work."
      }
    ],
    "Tutor": [
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
        "description": "At Archives, +6% to scholarship, inquiry, civic, or administration contracts this season."
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
        "amount": 3,
        "description": "+3 gold after textile, trade, or craft success."
      }
    ]
  }
};

const AI_PROFILES = [
  {
    "id": "balanced",
    "label": "Balanced Company",
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
      "archives",
      "chapel",
      "market",
      "common"
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
    "goldBias": 0.28,
    "reputationBias": 3.05,
    "dangerBias": 0.25,
    "rosterGoal": 6,
    "restChance": 0.52,
    "facilityChance": 0.36,
    "workPenalty": 2
  },
  {
    "id": "merchants",
    "label": "Merchant House",
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
    "goldBias": 0.36,
    "reputationBias": 2.35,
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
    "goldBias": 0.32,
    "reputationBias": 2.8,
    "dangerBias": -0.1,
    "rosterGoal": 7,
    "restChance": 0.5,
    "facilityChance": 0.36,
    "workPenalty": 1.2
  },
  {
    "id": "explorers",
    "label": "Explorer Lodge",
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
    "goldBias": 0.16,
    "reputationBias": 4.1,
    "dangerBias": -0.4,
    "absoluteMinChance": 36,
    "rosterGoal": 6,
    "restChance": 0.6,
    "facilityChance": 0.42,
    "workPenalty": 1.7
  },
  {
    "id": "relief",
    "label": "Relief Brotherhood",
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
    "goldBias": 0.2,
    "reputationBias": 4.5,
    "dangerBias": -0.25,
    "absoluteMinChance": 36,
    "rosterGoal": 6,
    "restChance": 0.62,
    "facilityChance": 0.34,
    "workPenalty": 1.3
  },
  {
    "id": "civic",
    "label": "Civic League",
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
    "goldBias": 0.22,
    "reputationBias": 3.5,
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
    "goldBias": 0.4,
    "reputationBias": 3.2,
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
    this.menuOpen = true;
  }

  init() {
    this.data = {...GUILD_DATA,contractParts:CONTRACT_PARTS,characterParts:CHARACTER_PARTS,firstNames:FIRST_NAMES,lastNames:LAST_NAMES,aiProfiles:AI_PROFILES,contracts:this.expandContracts(GUILD_DATA.contracts,CONTRACT_PARTS,CHARACTER_PARTS)};
    this.newGame();
  }

  newGame() {
    const rivals=this.pickAiProfiles(3);
    this.state = {
      year:1, seasonIndex:0, phase:'setup', starterIndex:this.randomInt(0,3), humanActionUsed:false,
      tavern:[],
      contractDeck:this.shuffle(this.data.contracts.map(c=>structuredClone(c))),
      boardContracts:[], log:[], nextContractInstance:1, nextCharacterInstance:1, tavernHasNew:true, tavernOpen:true,
      world:this.makeWorld(), startedSeasons:0, pendingTraitChoice:null, setupDraftIndex:0, setupDraftPending:false, activeGuildId:null,
      guilds:[
        this.makeGuild('amber-company',this.cleanGuildName(this.pendingGuildName),true),
        this.makeGuild('white-raven','White Raven',false,rivals[0]),
        this.makeGuild('iron-oath','Iron Oath',false,rivals[1]),
        this.makeGuild('green-lantern','Green Lantern',false,rivals[2])
      ]
    };
    this.refillTavern();
    this.log(null,'game',`A new twenty-year contest begins in ${this.state.world.name}.`);
    this.refreshContracts();
    this.state.activeGuildId=this.currentSetupGuild()?.id||null;
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

  makeWorld() {
    const template=this.pick(this.data.contractParts.world.starts);
    const values={};
    for(const [key,range] of Object.entries(template.ranges)) values[key]=this.randomInt(range[0],range[1]);
    return {name:template.name,values,trend:{},lastShift:'Starting conditions vary from game to game.'};
  }

  makeGuild(id,name,human,personality=null) {
    return {
      id,name,human,personality,
      gold:0,reputation:0,completed:0,roster:[],resources:2,connections:1,
      poolWins:{}
    };
  }
  pickAiProfiles(count,profiles=this.data.aiProfiles||[]){
    return this.shuffle(profiles).slice(0,count).map(profile=>structuredClone(profile));
  }
  cleanGuildName(name){return String(name||'').trim().slice(0,28)||'Amber Company';}
  aiProfileValue(guild,key,fallback){return guild.personality?.[key]??fallback;}
  makeCharacter(base) { const profession=this.pickProfession();const traits=this.pickTraits(profession);const allTraits=[profession.name,...traits].slice(0,this.maxTraits());const variance=this.data.characterParts.settings;const character={...structuredClone(base),templateId:base.id,id:`${base.id}-${this.state.nextCharacterInstance++}`,archetype:profession.name,status:profession.status,traits:allTraits,revealedTraits:[profession.name],revealAfterSeason:false,conditions:[],resources:this.clamp(profession.resources+this.randomInt(...variance.resourceVariance),0,5),connections:this.clamp(profession.connections+this.randomInt(...variance.connectionVariance),0,5),history:[],placement:null,alive:true,refusesGuildIds:[]};character.name=this.generateCharacterName(base);return character; }
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
  boardSize() { return this.data.contractParts.settings.boardSize; }
  pick(a) { return a[Math.floor(Math.random()*a.length)]; }
  randomInt(min,max) { return min+Math.floor(Math.random()*(max-min+1)); }
  shuffle(a) {
    const copy=[...a];
    for(let i=copy.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [copy[i],copy[j]]=[copy[j],copy[i]];
    }
    return copy;
  }
  clamp(n,min,max){ return Math.max(min,Math.min(max,n)); }
  humanGuild(){return this.state.guilds.find(g=>g.human);}
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
  guildOrder() { return this.state.guilds.map((_,i)=>this.state.guilds[(this.state.starterIndex+i)%4]); }
  snakeGuildOrder(round=this.state.startedSeasons) { const order=this.guildOrder(); return round%2?[...order].reverse():order; }
  setupDraftOrder() { return this.snakeGuildOrder(0); }
  currentSetupGuild() { return this.setupDraftOrder()[this.state.setupDraftIndex]||null; }
  humanTurnSplit(round=this.state.startedSeasons) {
    const order=this.snakeGuildOrder(round);
    const humanIndex=order.findIndex(g=>g.human);
    if(humanIndex<0)return {before:order,after:[]};
    return {before:order.slice(0,humanIndex),after:order.slice(humanIndex+1)};
  }
  aiBeforeHuman() { return this.humanTurnSplit().before.filter(g=>!g.human); }
  aiAfterHuman() { return this.humanTurnSplit().after.filter(g=>!g.human); }
  reverseGuildOrder() { return [...this.guildOrder()].reverse(); }

  bindUI() {
    const $ = id => document.getElementById(id);
    this.ui = {date:$('dateLabel'),phase:$('phaseLabel'),guildGrid:$('guildGrid'),world:$('worldGrid'),peopleGrid:$('peopleGrid'),recoveryGrid:$('recoveryGrid'),recruitGrid:$('recruitGrid'),contractGrid:$('contractGrid'),facilityGrid:$('facilityGrid'),tavernPanel:$('tavernPanel'),tavernTitle:$('tavernTitle'),tavernEyebrow:$('tavernEyebrow'),tavernClose:$('tavernClose'),tavernBtn:$('tavernBtn'),characterPanel:$('characterPanel'),characterPanelTitle:$('characterPanelTitle'),characterPanelBody:$('characterPanelBody'),characterPanelClose:$('characterPanelClose'),advance:$('advanceBtn'),newGame:$('newGameBtn'),humanStatus:$('humanActionStatus'),entry:$('entryScreen'),guildName:$('guildNameInput'),singlePlayer:$('singlePlayerBtn'),loadGame:$('loadGameBtn'),multiplayer:$('multiplayerBtn'),settings:$('settingsBtn'),glossary:$('glossaryBtn'),settingsPanel:$('settingsPanel'),glossaryPanel:$('glossaryPanel'),glossaryBody:$('glossaryBody'),entryNote:$('entryNote'),aiPace:$('aiPaceSelect')};
    this.ui.newGame.addEventListener('click',()=>this.returnToMenu());
    this.ui.singlePlayer.addEventListener('click',()=>this.startSinglePlayer());
    this.ui.loadGame.addEventListener('click',()=>this.loadGame());
    this.ui.multiplayer.addEventListener('click',()=>this.showEntryNote('Multiplayer is a menu slot for now. The current build is local single player against AI guilds.'));
    this.ui.settings.addEventListener('click',()=>this.toggleEntryPanel('settings'));
    this.ui.glossary.addEventListener('click',()=>this.toggleEntryPanel('glossary'));
    this.ui.guildName.addEventListener('input',()=>{this.pendingGuildName=this.cleanGuildName(this.ui.guildName.value);});
    this.ui.aiPace.addEventListener('change',()=>{this.data.contractParts.settings.aiTurnDelayMs=Number(this.ui.aiPace.value)||550;this.showEntryNote(`AI turn pace set to ${this.ui.aiPace.options[this.ui.aiPace.selectedIndex].text}.`);});
    this.ui.advance.addEventListener('click',()=>this.advance());
    this.ui.tavernBtn.addEventListener('click',()=>{if(this.state.phase==='setup'&&!this.currentSetupGuild()?.human)return;this.state.tavernOpen=!this.state.tavernOpen;this.state.tavernHasNew=false;this.render();});
    this.ui.tavernClose.addEventListener('click',()=>this.closeTavern());
    this.ui.tavernPanel.addEventListener('click',evt=>{if(evt.target===this.ui.tavernPanel)this.closeTavern();});
    this.ui.characterPanelClose.addEventListener('click',()=>this.closeCharacterPanel());
    this.ui.characterPanel.addEventListener('click',evt=>{if(evt.target===this.ui.characterPanel)this.closeCharacterPanel();});
    this.ui.characterPanelBody.addEventListener('click',evt=>{
      const choice=evt.target.closest?.('[data-replace-trait]');
      if(choice){this.resolveTraitChoice(choice.dataset.replaceTrait);return;}
      const release=evt.target.closest?.('[data-release-merc]');
      if(release){this.releaseMerc(release.dataset.characterId,release.dataset.releaseMerc);return;}
      const character=evt.target.closest?.('[data-inspect-character]');
      if(character)this.openCharacterPanel(character.dataset.inspectCharacter);
    });
    this.ui.characterPanelBody.addEventListener('keydown',evt=>{
      if(evt.key!=='Enter'&&evt.key!==' ')return;
      const release=evt.target.closest?.('[data-release-merc]');
      if(release){evt.preventDefault();this.releaseMerc(release.dataset.characterId,release.dataset.releaseMerc);return;}
      const character=evt.target.closest?.('[data-inspect-character]');
      if(!character)return;
      evt.preventDefault();
      this.openCharacterPanel(character.dataset.inspectCharacter);
    });
    document.addEventListener('keydown',evt=>{if(evt.key==='Escape'){this.closeTavern();this.closeCharacterPanel();}});
    this.bindTooltips();
    this.renderGlossary();
    this.updateSaveUi();
  }

  openEntryScreen(panel='single'){
    this.menuOpen=true;
    this.closeTavern();
    this.closeCharacterPanel();
    this.ui.entry?.classList.remove('closed');
    if(this.ui.guildName)this.ui.guildName.value=this.cleanGuildName(this.pendingGuildName||this.humanGuild()?.name);
    this.toggleEntryPanel(panel,false);
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
    this.newGame();
    this.closeEntryScreen();
    this.render();
  }
  toggleEntryPanel(panel,flip=true){
    const showSettings=panel==='settings'&&(flip?this.ui.settingsPanel.classList.contains('closed'):true);
    const showGlossary=panel==='glossary'&&(flip?this.ui.glossaryPanel.classList.contains('closed'):true);
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
    if(save?.state){
      const guild=save.state.guilds?.find(g=>g.human)?.name||'Saved Guild';
      const season=SEASONS[save.state.seasonIndex]||'Season';
      this.ui.loadGame.dataset.tip=`${guild}\nYear ${save.state.year} - ${season}\nSaved ${this.saveTimeLabel(save.savedAt)}.`;
      this.ui.loadGame.classList.add('has-tip');
    }else{
      this.ui.loadGame.dataset.tip='No saved game found in this browser.';
      this.ui.loadGame.classList.add('has-tip');
    }
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
    const choice=this.state.pendingTraitChoice;
    if(choice?.workerId){
      const guild=this.state.guilds.find(g=>g.id===choice.guildId);
      const worker=guild?.roster.find(c=>c.id===choice.workerId);
      const facility=this.facilityDef(choice.facilityKey);
      this.state.pendingTraitChoice=guild&&worker&&facility&&choice.trait?{guild,worker,facility,trait:choice.trait}:null;
    }
    if(this.state.phase==='aiTurn'){
      this.state.phase='awaitHuman';
      this.state.activeGuildId=this.humanGuild()?.id||null;
      this.state.humanActionUsed=false;
      this.log(null,'game','Loaded during an AI turn; returned control to the player.');
    }
  }
  renderGlossary(){
    if(!this.ui.glossaryBody)return;
    const settings=this.data.contractParts.settings;
    const facilities=this.data.contractParts.facilities.map(f=>`<li><strong>${this.escapeHtml(f.label)}</strong><span>Train traits through worker placement</span></li>`).join('');
    const pools=this.data.contractParts.world.pools.map(p=>`<li><strong>${this.escapeHtml(p.key)}</strong><span>${this.escapeHtml((p.types||[]).slice(0,4).join(', '))}</span></li>`).join('');
    this.ui.glossaryBody.innerHTML=`<section><h3>Core Rules</h3><p><strong>Contracts</strong> hold up to two workers per guild. Multi-season contracts keep workers committed until finished.</p><p><strong>Traits</strong> are the engine. Profession tags give about ${settings.requirementWeights[0]}% when demanded; support tags give about ${settings.supportWeights[0]}%.</p><p><strong>Hiring</strong> is limited to one paid tavern recruit per guild each season. Founders ignore reputation gates. Professionals require 10 reputation, gentry require 25, and nobles require 50.</p><p><strong>Resources</strong> are guild capacity. Contracts check them for odds, but do not spend them. <strong>Connections</strong> give +2% odds each on every contract.</p></section><section><h3>Facilities</h3><ul>${facilities}</ul></section><section><h3>Contract Pools</h3><ul>${pools}</ul></section>`;
  }

  closeTavern(){if(this.state.phase==='setup'&&!this.currentSetupGuild()?.human)return;this.state.tavernOpen=false;this.render();}
  closeCharacterPanel(){this.ui.characterPanel.classList.add('closed');}
  openCharacterPanel(characterId){
    const found=this.findCharacter(characterId);
    if(!found)return;
    const {guild,character}=found;
    this.state.selectedCharacterId=character.id;
    this.ui.characterPanelTitle.textContent=character.name;
    this.ui.characterPanelBody.innerHTML=this.characterCard(character,{showHistory:true,showAllTraits:true,guild});
    this.ui.characterPanel.classList.remove('closed');
  }
  openGuildPanel(guildId){
    const guild=this.state.guilds.find(g=>g.id===guildId);
    if(!guild)return;
    this.ui.characterPanelTitle.textContent=guild.name;
    this.ui.characterPanelBody.innerHTML=this.guildInspectionHtml(guild);
    this.ui.characterPanel.classList.remove('closed');
  }
  openSeasonRecap(){
    if(!this.ui.characterPanel||this.state.phase!=='seasonComplete')return;
    const entries=this.state.log.filter(entry=>entry.year===this.state.year&&entry.season===this.currentSeason()).slice(0,16);
    const human=this.humanGuild();
    const engineSummary=this.activeWorkers(human).map(c=>this.workerEngineSummary(c)).filter(Boolean).slice(0,4).map(text=>`<span>${this.escapeHtml(text)}</span>`).join('');
    this.ui.characterPanelTitle.textContent=`${this.currentSeason()} Recap`;
    this.ui.characterPanelBody.innerHTML=`<article class="game-card recap-card"><p class="history">${human.name} is reading as <strong>${this.guildIdentity(human).label}</strong>.</p>${engineSummary?`<div class="recap-pills">${engineSummary}</div>`:''}<div class="recap-list">${entries.map(entry=>`<p class="recap-line ${entry.type}"><span>${entry.guildId?this.guildName(entry.guildId):'World'}</span>${this.escapeHtml(entry.summary)}</p>`).join('')||'<p class="empty">Nothing notable happened.</p>'}</div></article>`;
    this.ui.characterPanel.classList.remove('closed');
  }
  openTraitChoice(choice){
    const worker=choice.worker;
    this.ui.characterPanelTitle.textContent=`Train ${worker.name}`;
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

  bindTooltips(){
    let timer=null;
    const show=(el,evt)=>{if(!el?.dataset.tip)return;this.showTooltip(el,evt);};
    const hide=()=>{clearTimeout(timer);this.hideTooltip();};
    document.addEventListener('pointerover',evt=>show(evt.target.closest?.('[data-tip]'),evt));
    document.addEventListener('pointermove',evt=>{if(this.tooltip?.classList.contains('visible'))this.positionTooltip(evt.clientX,evt.clientY);});
    document.addEventListener('pointerout',evt=>{if(evt.target.closest?.('[data-tip]'))hide();});
    document.addEventListener('focusin',evt=>show(evt.target.closest?.('[data-tip]'),evt));
    document.addEventListener('focusout',hide);
    document.addEventListener('pointerdown',evt=>{
      const el=evt.target.closest?.('[data-tip]');
      if(!el){this.hideTooltip();return;}
      timer=setTimeout(()=>{el.dataset.longPressed='true';show(el,evt);},520);
    });
    document.addEventListener('pointerup',evt=>{
      clearTimeout(timer);
      if(!evt.target.closest?.('[data-long-pressed]'))this.hideTooltip();
    });
    document.addEventListener('pointercancel',hide);
    document.addEventListener('click',evt=>{
      const el=evt.target.closest?.('[data-long-pressed]');
      if(!el)return;
      evt.preventDefault();
      evt.stopPropagation();
      delete el.dataset.longPressed;
    },true);
  }

  ensureTooltip(){
    if(this.tooltip)return this.tooltip;
    const el=document.createElement('div');
    el.className='game-tooltip';
    document.body.appendChild(el);
    this.tooltip=el;
    return el;
  }
  showTooltip(el,evt){
    const tip=this.ensureTooltip();
    tip.innerHTML=this.escapeHtml(el.dataset.tip);
    tip.classList.add('visible');
    const rect=el.getBoundingClientRect?.();
    this.positionTooltip(evt.clientX||rect?.left||20,evt.clientY||rect?.bottom||20);
  }
  hideTooltip(){if(this.tooltip)this.tooltip.classList.remove('visible');}
  positionTooltip(x,y){
    const tip=this.ensureTooltip();
    const pad=12;
    tip.style.left=`${Math.min(window.innerWidth-tip.offsetWidth-pad,Math.max(pad,x+14))}px`;
    tip.style.top=`${Math.min(window.innerHeight-tip.offsetHeight-pad,Math.max(pad,y+14))}px`;
  }

  advance() {
    if(this.state.phase==='setup') return;
    if(this.state.phase==='awaitHuman') return this.finishHumanAction('season',this.resolveHumanPlacements(this.humanGuild()));
    if(this.state.phase==='seasonComplete') return this.nextSeason();
    if(this.state.phase==='gameOver') return;
  }

  draftFounder(characterId) {
    if(this.state.phase!=='setup') return;
    const human=this.currentSetupGuild();
    if(!human?.human)return false;
    const pick=this.state.tavern.find(c=>c.id===characterId);
    if(!pick) return;
    this.draftFounderForGuild(human,pick);
    this.state.tavernHasNew=false;
    this.advanceSetupDraft();
  }

  draftFounderForGuild(guild,pick){
    if(!pick)return false;
    this.hire(guild,pick,true);
    this.revealAllTraits(pick,guild.human?'as founder':'for AI planning');
    this.log(guild,'recruit',`${guild.name} drafted founder ${pick.name}.`);
    if(guild.human)this.prepareInitialBoardForFounder();
    return true;
  }
  advanceSetupDraft(){
    this.state.setupDraftIndex++;
    const next=this.currentSetupGuild();
    if(next){
      this.state.activeGuildId=next.id;
      this.state.tavernOpen=next.human;
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
    if(this.state.phase!=='setup'||this.state.setupDraftPending)return;
    const guild=this.currentSetupGuild();
    if(!guild||guild.human)return;
    if(typeof window==='undefined'){this.aiDraftFounder(guild);return;}
    this.state.setupDraftPending=true;
    setTimeout(()=>this.aiDraftFounder(guild),this.aiTurnDelay());
  }
  aiDraftFounder(guild){
    if(this.state.phase!=='setup'||this.currentSetupGuild()!==guild)return;
    if(!this.state.tavern.length)this.refillTavern();
    const pick=this.chooseRecruit(guild);
    if(pick)this.draftFounderForGuild(guild,pick);
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
    this.runAITurnSequence(this.aiBeforeHuman(),()=>this.beginHumanTurn());
  }

  beginHumanTurn(){
    this.state.activeGuildId=null;
    this.state.phase='awaitHuman';
    this.state.humanActionUsed=false;
    this.render();
  }

  revealRosterTraits(){
    for(const guild of this.state.guilds){
      for(const c of guild.roster.filter(ch=>ch.revealAfterSeason))this.revealAllTraits(c,'after a season with the guild');
    }
  }

  startYear() {
    for(const guild of this.state.guilds) {
      if(this.state.year>1) this.paySalaries(guild);
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
      this.state.boardContracts.push(base);
    }
  }

  prepareBoardContract(contract){
    const settings=this.data.contractParts.settings;
    const human=this.humanGuild();
    if(!human?.roster.length||this.state.year>settings.beginnerBoardYears)return;
    const team=this.chooseBestTeam(human,contract);
    const rawChance=this.rawSuccessChanceForTeam(human,contract,team);
    if(rawChance>=settings.beginnerMinChance)return;
    contract.baseDifficulty-=settings.beginnerMinChance-rawChance;
    contract.beginnerAdjusted=true;
    contract.description=`${contract.description} The terms are simple enough for a new guild.`;
  }
  prepareInitialBoardForFounder(){
    if(this.state.year!==1||this.state.startedSeasons!==0)return;
    for(const contract of this.state.boardContracts){
      if(contract.setupPrepared)continue;
      this.prepareBoardContract(contract);
      contract.setupPrepared=true;
    }
  }

  chooseBoardContractIndex(){
    const types=new Set(this.state.boardContracts.map(c=>c.type));
    const settings=this.data.contractParts.settings;
    const human=this.humanGuild();
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
    if(guild.human) return;
    this.aiPlaceContractWorkers(guild);
  }

  chooseBestTeam(guild,contract){
    return this.bestWorkersForContract(this.availableWorkers(guild),contract,2);
  }
  bestWorkersForContract(workers,contract,limit){return workers.map(c=>({c,score:this.characterFit(c,contract)})).sort((a,b)=>b.score-a.score).slice(0,limit).map(x=>x.c);}
  aiPlaceContractWorkers(guild){
    const minChance=this.aiMinClaimChance(guild);
    let placed=0;
    while(this.availableWorkers(guild).length){
      const options=this.state.boardContracts.map(contract=>this.aiContractPlacementOption(guild,contract)).filter(Boolean).sort((a,b)=>b.value-a.value);
      if(!options.length)break;
      const viable=options.filter(o=>o.chance>=minChance);
      const pool=viable.length?viable:options.slice(0,3);
      const pick=this.weightedPick(pool.map((o,i)=>({item:o,weight:Math.max(1,o.value)+(pool.length-i)*3})));
      if(!pick)break;
      if(pick.chance<minChance&&Math.random()>0.35*this.aiRisk(guild))break;
      pick.contract.placements=pick.contract.placements||{};
      const list=pick.contract.placements[guild.id]||[];
      for(const worker of pick.add){list.push(worker.id);worker.placement={type:'contract',id:pick.contract.instanceId};placed++;}
      pick.contract.placements[guild.id]=list;
      this.log(guild,'contract',`${guild.name} committed ${pick.add.map(c=>c.name).join(', ')} to "${pick.contract.title}" at ${pick.chance}% odds.`);
      if(placed>=Math.max(1,this.activeWorkers(guild).length-1)&&Math.random()>0.25*this.aiRisk(guild))break;
    }
    return placed>0;
  }
  aiContractPlacementOption(guild,contract){
    if(contract.offerSeasons<=0||this.contractProgress(guild,contract))return null;
    const current=this.placedTeam(guild,contract);
    const open=2-current.length;
    if(open<=0)return null;
    const add=this.bestWorkersForContract(this.availableWorkers(guild),contract,open);
    if(!add.length)return null;
    const team=[...current,...add];
    const chance=this.successChanceForTeam(guild,contract,team);
    if(chance<this.aiFallbackChance(guild))return null;
    const mode=this.aiStrategicMode(guild);
    if(mode.rebuilding&&['deadly','lethal'].includes(contract.risk)&&chance<72)return null;
    if(mode.startup&&contract.risk==='dangerous'&&chance<58)return null;
    if(mode.behind&&contract.risk==='dangerous'&&chance<66)return null;
    if(mode.desperate&&contract.risk!=='low'&&chance<66)return null;
    if(mode.rebuilding&&contract.risk==='moderate'&&chance<54)return null;
    const value=this.aiContractValue(guild,contract,chance,team,add.length);
    return {contract,add,chance,value};
  }
  isPlaced(c){return Boolean(c.placement);}
  isLockedPlacement(c,guild=this.humanGuild()){
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
  contractPreview(guild,c){const team=this.placedTeam(guild,c);const previewTeam=team.length?team:this.chooseBestTeam(guild,c);return {team:previewTeam,chance:previewTeam.length?this.successChanceForTeam(guild,c,previewTeam):null};}
  contractValue(guild,c){const p=this.contractPreview(guild,c);return p.chance===null?-999:this.aiContractValue(guild,c,p.chance,p.team);}
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
  aiScore(guild){return guild.reputation+guild.completed*3+guild.gold/12;}
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
    const flavor=this.aiFlavorScore(guild,this.contractTags(contract))*(mode.rebuilding?3:8);
    const riskAppeal=mode.rebuilding?Math.min(0,this.aiRiskAppeal(guild,contract)):this.aiRiskAppeal(guild,contract);
    const riskRecovery={low:12,moderate:5,dangerous:-12,deadly:-28,lethal:-45}[contract.risk]||0;
    const oddsDiscipline=mode.rebuilding?(chance-62)*2:0;
    const recovery=mode.rebuilding?riskRecovery+oddsDiscipline+Math.max(0,4-(contract.workSeasons||1))*8+contract.reward.reputation*2.5:0;
    const workPenalty=contract.workSeasons*this.aiProfileValue(guild,'workPenalty',2)*(mode.rebuilding?1.7:1);
    return chance*(mode.rebuilding?1.25:this.aiRisk(guild))+this.aiRewardValue(guild,contract)+riskAppeal+this.aiActivatedRuleValue(guild,contract,team)-workPenalty+flavor+addCount*5+recovery;
  }
  aiActivatedRuleValue(guild,contract,team){
    return team.reduce((sum,worker)=>sum+this.workerTraitEffects(worker).filter(effect=>['contractScore','contractSuccess','contractFailure','contractProgress'].includes(effect.trigger)&&this.effectMatchesContract(effect,contract,{guild,worker,team,role:this.workerContractRole(team,worker)})).length*5,0);
  }

  placedTeam(guild,contract){return (contract.placements?.[guild.id]||[]).map(id=>guild.roster.find(c=>c.id===id)).filter(Boolean);}
  hasContractPlacements(contract){return Object.values(contract.placements||{}).some(list=>list?.length);}
  contractProgress(guild,contract){return contract.progress?.[guild.id]||null;}
  ensureContractProgress(guild,contract){
    contract.progress=contract.progress||{};
    if(!contract.progress[guild.id]){
      const materials=Math.min(guild.resources,contract.materials||0);
      contract.progress[guild.id]={remaining:contract.workSeasons||1,total:contract.workSeasons||1,materials};
    }
    return contract.progress[guild.id];
  }
  placeWorker(characterId,targetId,targetType='contract',mode='work'){
    const guild=this.humanGuild();
    if(this.state.phase!=='awaitHuman'||this.state.humanActionUsed)return false;
    const worker=guild.roster.find(c=>c.id===characterId);
    if(!worker||!worker.alive)return false;
    if(targetType==='recovery')return this.placeRecoveryWorker(worker,guild);
    if(targetType==='facility')return this.placeFacilityWorker(worker,targetId,guild,mode);
    const contract=this.state.boardContracts.find(c=>c.instanceId===targetId);
    if(!contract)return false;
    if(contract.offerSeasons<=0||this.contractProgress(guild,contract))return false;
    if(worker.placement&&!this.unplaceWorker(worker,guild))return false;
    contract.placements=contract.placements||{};
    const list=contract.placements[guild.id]||[];
    if(list.length>=2)return false;
    list.push(worker.id);
    contract.placements[guild.id]=list;
    worker.placement={type:'contract',id:contract.instanceId};
    this.render();
    return true;
  }
  placeFacilityWorker(worker,facilityKey,guild=this.humanGuild(),mode='work'){
    const facility=this.facilityDef(facilityKey);
    if(!facility)return false;
    if(worker.placement&&!this.unplaceWorker(worker,guild))return false;
    const placed=this.facilityWorkers(guild,facilityKey,'work');
    const limit=facility.slots;
    if(placed.length>=limit)return false;
    worker.placement={type:'facility',id:facilityKey,mode:'work'};
    this.render();
    return true;
  }
  placeRecoveryWorker(worker,guild=this.humanGuild()){
    if(worker.placement&&!this.unplaceWorker(worker,guild))return false;
    if(this.recoveryWorkers(guild).length>=this.recoverySlotCount())return false;
    worker.placement={type:'recovery'};
    this.render();
    return true;
  }
  returnWorker(characterId){
    const guild=this.humanGuild();
    if(this.state.phase!=='awaitHuman'||this.state.humanActionUsed)return false;
    const worker=guild.roster.find(c=>c.id===characterId);
    if(!worker||!worker.placement)return false;
    if(!this.unplaceWorker(worker,guild))return false;
    this.render();
    return true;
  }
  unplaceWorker(worker,guild=this.humanGuild(),force=false){
    if(!worker?.placement)return true;
    if(worker.placement.type==='contract'){
      const contract=this.state.boardContracts.find(c=>c.instanceId===worker.placement.id);
      if(contract&&!force&&this.contractProgress(guild,contract))return false;
      if(contract?.placements?.[guild.id])contract.placements[guild.id]=contract.placements[guild.id].filter(id=>id!==worker.id);
      if(contract?.progress?.[guild.id]&&!this.placedTeam(guild,contract).length)delete contract.progress[guild.id];
    }
    if(worker.placement.type==='facility'){
      // Facility placement lives on the worker, so clearing the worker is enough.
    }
    worker.placement=null;
    return true;
  }
  facilityDef(key){return this.data.contractParts.facilities.find(f=>f.key===key);}
  facilityWorkers(guild,key,mode=null){return guild.roster.filter(c=>c.placement?.type==='facility'&&c.placement.id===key&&(!mode||c.placement.mode===mode));}
  recoverySlotCount(){return this.data.contractParts.settings.recoverySlots||2;}
  recoveryWorkers(guild){return guild.roster.filter(c=>c.placement?.type==='recovery');}

  resolveHumanPlacements(guild){
    const occupied=this.state.boardContracts.filter(c=>this.placedTeam(guild,c).length);
    const recoveryCount=this.resolveRecovery(guild);
    const facilityCount=this.resolveFacilities(guild);
    if(!occupied.length&&!facilityCount&&!recoveryCount)return `${guild.name} committed no workers.`;
    const results=occupied.map(contract=>this.resolveBoardContract(guild,contract));
    const advanced=results.filter(r=>r==='progress').length;
    const finished=results.filter(r=>r==='finished').length;
    return `${guild.name} advanced ${advanced} contract tile(s), finished ${finished}, resolved ${facilityCount} facility placement(s), and rested ${recoveryCount} merc(s).`;
  }

  finishHumanAction(type,msg,fn){if(fn)fn();if(msg)this.log(this.humanGuild(),type,msg);this.state.humanActionUsed=true;this.runAITurns();}

  runAITurns(){
    this.runAITurnSequence(this.aiAfterHuman(),()=>this.finishAITurns());
  }
  finishAITurns(){
    for(const guild of this.snakeGuildOrder().filter(g=>!g.human)) this.resolveAIPlacements(guild);
    this.state.activeGuildId=null;
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
    const act=()=>{
      this.aiTurn(guild);
      this.render();
      const next=()=>this.runAITurnSequence(guilds,done,index+1);
      if(delay>0)setTimeout(next,delay);
      else next();
    };
    if(delay>0)setTimeout(act,delay);
    else act();
  }

  aiTurn(guild){
    const mode=this.aiStrategicMode(guild);
    const rosterCap=this.guildRosterCap();
    const coreSize=Math.min(mode.rebuilding?5:(this.data.contractParts.settings.aiCoreRosterSize||4),rosterCap);
    const targetRoster=Math.min(Math.max(this.aiProfileValue(guild,'rosterGoal',6),mode.rebuilding?6:0),rosterCap);
    if(this.activeWorkers(guild).length<coreSize&&this.aiCatchUpRecruit(guild,coreSize))return true;
    if(mode.desperate&&this.activeWorkers(guild).length<3&&this.aiEmergencyRecruit(guild))return true;
    if(this.guildNeedsRest(guild)&&Math.random()<this.aiRestChance(guild,mode)){this.log(guild,'rest',this.restGuild(guild));return true;}
    if(this.activeWorkers(guild).length<targetRoster&&this.aiCatchUpRecruit(guild,this.activeWorkers(guild).length+1))return true;
    if(mode.behind&&this.activeWorkers(guild).length<rosterCap&&!guild.hiredThisSeason&&Math.random()<0.45&&this.aiCatchUpRecruit(guild,this.activeWorkers(guild).length+1))return true;
    const plannedSupport=this.availableWorkers(guild).length>3&&Math.random()<this.aiFacilityChance(guild,mode)&&this.aiPlaceFacility(guild);
    if(this.aiPlaceContractWorkers(guild))return true;
    if((mode.desperate||(mode.behind&&guild.gold<10&&guild.reputation<10))&&this.aiLocalRecoveryWork(guild))return true;
    if(Math.random()<this.aiFacilityChance(guild,mode)&&this.aiPlaceFacility(guild))return true;
    if(plannedSupport||this.aiPlaceFacility(guild))return true;
    this.log(guild,'operate',`${guild.name} held workers in reserve.`);
    return true;
  }
  aiRestChance(guild,mode=this.aiStrategicMode(guild)){
    const base=this.aiProfileValue(guild,'restChance',0.55);
    if(mode.desperate&&this.activeWorkers(guild).length<4)return base*0.55;
    if(mode.rebuilding)return base*0.85;
    return base;
  }
  aiFacilityChance(guild,mode=this.aiStrategicMode(guild)){
    const base=this.aiProfileValue(guild,'facilityChance',0.35);
    if(mode.desperate)return Math.min(base,0.12);
    if(mode.startup)return Math.min(base,0.22);
    if(mode.behind)return Math.min(base,0.24);
    return base;
  }
  aiCatchUpRecruit(guild,target){
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
      const c=this.chooseRecruit(guild,affordable);
      if(!this.hire(guild,c,false))break;
      this.log(guild,'recruit',`${guild.name} recruited ${c.name}.`);
      hired++;
      break;
    }
    return hired;
  }
  aiEmergencyRecruit(guild){
    if(guild.hiredThisSeason||this.activeWorkers(guild).length>=this.guildRosterCap())return false;
    const eligible=()=>this.state.tavern.filter(c=>!c.refusesGuildIds.includes(guild.id)&&this.reputationRequirement(c)===0&&this.characterSalary(c)<=2);
    let candidates=eligible();
    if(!candidates.length&&this.state.tavern.length<14){
      this.refillTavern(this.state.tavern.length+4);
      candidates=eligible();
    }
    const pick=this.chooseRecruit(guild,candidates);
    if(!pick)return false;
    this.hire(guild,pick,false,0,{sponsored:true});
    this.log(guild,'recruit',`${guild.name} took on ${pick.name} with deferred pay to rebuild.`);
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
    return true;
  }

  resolveAIPlacements(guild){
    const occupied=this.state.boardContracts.filter(c=>this.placedTeam(guild,c).length);
    this.resolveFacilities(guild);
    for(const contract of occupied)this.resolveBoardContract(guild,contract);
  }

  aiPlaceFacility(guild){
    const mode=this.aiStrategicMode(guild);
    const target=Math.min(mode.rebuilding?1:this.aiProfileValue(guild,'facilityWorkers',2),this.availableWorkers(guild).length);
    const placed=[];
    while(placed.length<target){
      const worker=this.chooseFacilityWorker(guild);
      if(!worker)break;
      const facility=this.chooseFacility(guild,worker);
      if(!facility)break;
      if(this.facilityWorkers(guild,facility.key,'work').length>=facility.slots)break;
      worker.placement={type:'facility',id:facility.key,mode:'work'};
      placed.push(`${worker.name} to the ${facility.label}`);
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
    return trainNeed+profileFit+Math.random()*5;
  }
  chooseFacility(guild,worker){
    const prefs=guild.personality?.preferredTags||[];
    return [...this.data.contractParts.facilities]
      .filter(f=>this.facilityHasOpenSlot(guild,f,worker))
      .sort((a,b)=>this.facilityValue(guild,worker,b,prefs)-this.facilityValue(guild,worker,a,prefs))[0];
  }
  facilityHasOpenSlot(guild,facility,worker=null){
    return facility.slots>this.facilityWorkers(guild,facility.key,'work').length;
  }
  facilityValue(guild,worker,facility,prefs=[]){
    const train=(facility.traits||[]).filter(t=>!this.visibleTraits(worker).includes(t)).length*4;
    const flavor=(facility.traits||[]).filter(t=>prefs.includes(t)).length*8;
    const priorities=guild.personality?.facilityPriorities||[];
    const priority=priorities.includes(facility.key)?(priorities.length-priorities.indexOf(facility.key))*12:0;
    const activation=this.workerTraitEffects(worker,'facilityResolve').filter(effect=>this.effectMatchesContract(effect,null,{guild,worker,facility,mode:'work'})).length*12;
    const support=this.state.boardContracts.reduce((sum,contract)=>sum+this.workerTraitEffects(worker,'facilitySupport').filter(effect=>this.effectMatchesContract(effect,contract,{guild,worker,facility,mode:'work',team:this.chooseBestTeam(guild,contract)})).reduce((s,effect)=>s+(effect.amount||0),0),0);
    return train+flavor+priority+activation+support+Math.random()*5;
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
    for(const facility of this.data.contractParts.facilities){
      for(const worker of this.facilityWorkers(guild,facility.key)){
        this.resolveFacilityWorker(guild,worker,facility);
        worker.placement=null;
        count++;
      }
    }
    return count;
  }
  resolveFacilityWorker(guild,worker,facility){
    this.applyFacilityTraitEffects(guild,worker,facility,[]);
    const pool=[...(facility.traits||[])];
    if((facility.rareTraits||[]).length&&Math.random()<(facility.rareChance??0.12))pool.push(...facility.rareTraits);
    const candidates=pool.filter(t=>!worker.traits.includes(t));
    const trainChance=this.facilityTrainingChance(worker,facility);
    if(candidates.length&&Math.random()*100<trainChance){
      const trait=this.pick(candidates);
      this.awardFacilityTrait(guild,worker,facility,trait);
    } else {
      this.log(guild,'train',`${worker.name} trained at the ${facility.label}, but gained no new trait.`);
    }
  }
  facilityTrainingChance(worker,facility){
    const assist=this.workerTraitEffects(worker,'facilityWork').filter(effect=>effect.type==='trainingAssist'&&this.effectMatchesContract(effect,null,{worker,facility,mode:worker.placement?.mode})).reduce((sum,effect)=>sum+(effect.amount||0),0);
    return this.clamp((facility.trainChance||0)+assist,0,85);
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
    if(guild.human){
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
  chooseRecruit(guild,arr=this.state.tavern){const target=[...this.state.boardContracts].sort((a,b)=>this.contractValue(guild,b)-this.contractValue(guild,a))[0];return [...arr].sort((a,b)=>this.recruitValue(guild,b,target)-this.recruitValue(guild,a,target))[0]||null;}
  recruitValue(guild,c,target){
    const traits=this.visibleTraits(c);
    const mode=this.aiStrategicMode(guild);
    const profileFit=this.aiFlavorScore(guild,traits)*(mode.rebuilding?5:12);
    const targetFit=target?this.characterFit(c,target):0;
    const boardFit=this.state.boardContracts.reduce((best,contract)=>Math.max(best,this.characterFit(c,contract)),0);
    const cheapStarter=mode.rebuilding&&(this.reputationRequirement(c)===0?10:0)+(this.characterSalary(c)<=2?4:0);
    const professionDemand=this.state.boardContracts.some(contract=>contract.requirements.some(req=>req.trait===c.archetype))?7:0;
    return targetFit+profileFit+traits.length*2+c.connections*3+c.resources*3-this.recruitCost(guild,c)/3+(mode.rebuilding?boardFit*0.45+cheapStarter+professionDemand:0);
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
    c.revealAfterSeason=guild.human&&(!free||guild.roster.length>1);
    if(!guild.human)this.revealAllTraits(c,'for AI planning');
    c.history.push(`Year ${this.state.year}: joined ${guild.name}.`);
    return true;
  }
  hireFromTavern(characterId){
    const guild=this.humanGuild();
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
    const guild=this.humanGuild();
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

  resolveBoardContract(guild,contract){
    const team=this.placedTeam(guild,contract);
    if(!team.length)return null;
    const progress=this.ensureContractProgress(guild,contract);
    progress.remaining=Math.max(0,progress.remaining-1);
    if(progress.remaining>0){
      this.applyContractProgressTraitEffects(guild,contract,team,progress);
      if(progress.remaining<=0)this.log(guild,'contract',`${guild.name}'s trait engine pushed "${contract.title}" to completion.`);
    }
    if(progress.remaining>0){
      this.log(guild,'contract',`${guild.name} advanced "${contract.title}". ${progress.remaining} season(s) remain.`);
      return 'progress';
    }
    const chance=this.successChanceForTeam(guild,contract,team);
    const roll=Math.random()*100;
    if(roll<=chance||this.convertNearMiss(guild,contract,team,roll,chance))this.succeedBoardContract(guild,contract,chance);
    else this.failBoardContract(guild,contract,chance);
    this.releaseBoardPlacement(guild,contract);
    return 'finished';
  }
  succeedBoardContract(guild,contract,chance){
    const team=this.placedTeam(guild,contract);
    const progress=this.contractProgress(guild,contract);
    const materials=progress?progress.materials:Math.min(guild.resources,contract.materials||0);
    const facilitySupport=this.facilitySupportTraitEffectScore(guild,contract,team,materials);
    guild.gold+=contract.reward.gold;
    guild.reputation+=contract.reward.reputation;
    guild.completed++;
    guild.poolWins=guild.poolWins||{};
    guild.poolWins[contract.pool]=(guild.poolWins[contract.pool]||0)+1;
    this.applyContractWorldEffect(contract);
    this.log(guild,'good',`${guild.name} completed "${contract.title}" at ${chance}% odds. +${contract.reward.gold} gold, +${contract.reward.reputation} reputation.`);
    if(facilitySupport>0)this.log(guild,'good',`${guild.name}'s facility engine added ${facilitySupport}% support to "${contract.title}".`);
    this.applyContractSuccessTraitEffects(guild,contract,team);
  }
  failBoardContract(guild,contract,chance){
    guild.reputation=Math.max(0,guild.reputation-3);
    this.applyFailure(guild,contract);
    this.log(guild,'bad',`${guild.name} failed "${contract.title}" at ${chance}% odds.`);
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
  }
  rawSuccessChanceForTeam(guild,c,chars){const progress=this.contractProgress(guild,c);const materials=progress?progress.materials:Math.min(guild.resources,c.materials||0);const score=chars.reduce((s,ch)=>s+this.characterTagScore(ch,c)+ch.resources*3+ch.connections*2-this.conditionPenalty(ch),0)+materials*10+guild.connections*2+this.contractTraitEffectScore(guild,c,chars,materials)+this.facilitySupportTraitEffectScore(guild,c,chars,materials);return Math.round(50+score-c.baseDifficulty);}
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
    if(this.state.seasonIndex===3){if(this.state.year===20){this.endGame();return;}this.state.year++;this.state.seasonIndex=0;this.state.starterIndex=(this.state.starterIndex+1)%4;}else this.state.seasonIndex++;
    this.startSeason();
  }
  endGame(){this.state.phase='gameOver';const ranked=[...this.state.guilds].sort((a,b)=>(b.reputation+b.completed+b.gold/10)-(a.reputation+a.completed+a.gold/10));this.log(null,'game',`${ranked[0].name} wins. Final score uses reputation, completed contracts, and gold.`);this.render();}

  log(guild,type,summary){this.state.log.unshift({year:this.state.year,season:this.currentSeason(),guildId:guild?.id||null,type,summary});this.state.log.length=Math.min(this.state.log.length,80);}

  render(){this.ui.date.textContent=`Year ${this.state.year} - ${this.currentSeason()}`;const active=this.state.guilds.find(g=>g.id===this.state.activeGuildId);const humanDraft=this.state.phase==='setup'&&active?.human;this.ui.phase.textContent=this.state.phase==='setup'&&active?`${active.name} draft`:this.state.phase==='aiTurn'&&active?`${active.name} turn`:this.state.phase;this.ui.advance.textContent=this.state.phase==='setup'?'Drafting':this.state.phase==='seasonComplete'?'Next Season':this.state.phase==='gameOver'?'Game Over':'Resolve Season';this.ui.advance.disabled=this.state.phase==='setup'||this.state.phase==='gameOver'||this.state.phase==='aiTurn';this.ui.tavernBtn.textContent=humanDraft?`${this.state.tavernOpen?'Hide':'Show'} Founder Draft`:`Tavern (${this.state.tavern.length})`;this.ui.tavernBtn.classList.toggle('has-new',this.state.tavernHasNew||humanDraft&&!this.state.tavernOpen);this.renderGuilds();this.renderWorld();this.renderPeople();this.renderTavern();this.renderContracts();this.renderFacilities();this.ui.humanStatus.textContent=this.state.phase==='setup'?(active?.human?'Pick':'Watch'):this.state.phase==='awaitHuman'?'Drag':this.state.phase==='aiTurn'?'Watch':'';
    this.maybeContinueSetupDraft();
  }
  renderGuilds(){
    this.ui.guildGrid.innerHTML=this.state.guilds.map(g=>`<article class="guild-card has-tip ${g.human?'human':''} ${g.id===this.state.activeGuildId?'acting':''}" role="button" tabindex="0" data-guild-id="${g.id}" data-tip="${this.escapeAttr(`${this.guildTip(g)}\nClick to inspect roster.`)}"><h3>${g.name}${g.human?' - You':''}</h3><div class="guild-identity">${this.guildIdentity(g).label}</div><div class="guild-score"><span><strong>${g.gold}</strong>Gold</span><span><strong>${g.reputation}</strong>Rep</span><span><strong>${g.completed}</strong>Done</span><span><strong>${g.resources}</strong>Res</span><span><strong>${g.connections}</strong>Conn</span></div></article>`).join('');
    this.ui.guildGrid.querySelectorAll('.guild-card').forEach(card=>{
      card.addEventListener('click',()=>this.openGuildPanel(card.dataset.guildId));
      card.addEventListener('keydown',evt=>{if(evt.key==='Enter'||evt.key===' '){evt.preventDefault();this.openGuildPanel(card.dataset.guildId);}});
    });
  }
  guildTip(guild){return `${guild.name}${guild.human?' - Your guild':' - Rival guild'}${guild.personality?.label?`\nProfile: ${guild.personality.label}.`:''}\nEmergent identity: ${this.guildIdentity(guild).label}.\nGold: ${guild.gold}.\nReputation: ${guild.reputation}.\nCompleted contracts: ${guild.completed}.\nResources: ${guild.resources}. Contracts check Resources as capacity and do not spend them; each covered requirement gives +10% odds.\nConnections: ${guild.connections}. Each guild Connection gives +2% odds on contracts.\nWorkers: ${this.activeWorkers(guild).length}.\nPlaced this season: ${guild.roster.filter(c=>this.isPlaced(c)).length}.\nEngine: ${this.engineSummary(guild)}.`;}
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
  renderWorld(){const world=this.state.world;this.ui.world.innerHTML=`<article class="world-card"><strong>World State</strong><span>${world.name}</span></article>`+this.data.contractParts.world.states.map(s=>{const value=world.values[s.key];const trend=world.trend[s.key]||0;const band=value<35?s.low:value>65?s.high:s.mid;const arrow=trend>3?'rising':trend<-3?'falling':'steady';return `<article class="world-card has-tip" data-tip="${this.escapeAttr(this.worldStateTip(s,value,trend))}"><strong>${s.label}</strong><span>${band}, ${arrow}</span></article>`;}).join('');}
  renderPeople(){
    const human=this.humanGuild();
    this.ui.peopleGrid.innerHTML=human.roster.map(c=>this.workerToken(c)).join('')||'<p class="empty">No workers.</p>';
    this.ui.recoveryGrid.innerHTML=Array.from({length:this.recoverySlotCount()},(_,i)=>this.recoverySlot(this.recoveryWorkers(human)[i])).join('');
    this.ui.peopleGrid.querySelectorAll('.merc-token').forEach(token=>{token.addEventListener('click',()=>this.openCharacterPanel(token.dataset.id));});
    this.bindDragSources();
    this.bindReturnDrop(this.ui.peopleGrid);
  }
  workerToken(c){const placed=Boolean(c.placement);const locked=this.isLockedPlacement(c);const conditions=(c.conditions||[]).map(x=>x.key).join(', ');return `<div class="merc-token has-tip ${placed?'assigned':''} ${locked?'locked':''} ${c.alive?'':'dead'}" role="button" tabindex="0" draggable="${c.alive&&this.state.phase==='awaitHuman'&&!this.state.humanActionUsed&&!locked?'true':'false'}" data-id="${c.id}" data-tip="${this.escapeAttr(this.characterSummaryTip(c))}"><strong>${this.workerInitials(c)}</strong><div class="token-meta">${c.name}</div><div class="token-meta">${c.archetype}${locked?' - committed':placed?' - placed':''}</div><div class="token-meta">${this.traitPreviewText(c)}</div>${conditions?`<div class="token-meta">${conditions}</div>`:''}</div>`;}
  renderDetail(){return;}
  guildInspectionHtml(guild){
    const identity=this.guildIdentity(guild);
    const roster=guild.roster.map(c=>this.guildRosterRow(c,guild)).join('')||'<p class="empty">No hired mercenaries.</p>';
    const profile=guild.personality?.label?`<span>${this.escapeHtml(guild.personality.label)} AI</span>`:'';
    return `<article class="game-card guild-inspection"><div class="guild-inspection-summary"><span><strong>${guild.gold}</strong>Gold</span><span><strong>${guild.reputation}</strong>Rep</span><span><strong>${guild.completed}</strong>Done</span><span><strong>${guild.resources}</strong>Resources</span><span><strong>${guild.connections}</strong>Connections</span></div><div class="guild-inspection-meta"><span>${this.escapeHtml(identity.label)}</span>${profile}<span>${this.activeWorkers(guild).length}/${guild.roster.length} active</span></div><div class="guild-roster-list">${roster}</div></article>`;
  }
  guildRosterRow(c,guild){
    const s=this.getStatus(c.status);
    const conditions=(c.conditions||[]).map(condition=>condition.key).join(', ');
    return `<div class="guild-roster-row has-tip ${c.alive?'':'dead'}" role="button" tabindex="0" data-inspect-character="${c.id}" data-tip="${this.escapeAttr(`${this.characterSummaryTip(c,true)}\nClick for full trait rules.`)}"><div><strong>${this.escapeHtml(c.name)}</strong><p>${this.escapeHtml(c.archetype)} - ${this.escapeHtml(s.name)}</p><div class="guild-row-traits">${c.traits.map(t=>this.tagHtml(t)).join('')}</div>${conditions?`<p class="guild-roster-conditions">${this.escapeHtml(conditions)}</p>`:''}</div><span class="guild-roster-status">${this.escapeHtml(this.workerPlacementText(c,guild))}</span></div>`;
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
  characterSummaryTip(c,showAllTraits=false){const s=this.getStatus(c.status);const conditions=(c.conditions||[]).map(x=>x.key).join(', ')||'None';return `${c.name}\n${c.archetype} - ${s.name}\nTraits: ${this.traitPreviewText(c,showAllTraits)}\nUpkeep: ${this.characterSalary(c)}g/year.\nResources: ${c.resources}. Connections: ${c.connections}.\nConditions: ${conditions}.\nClick to open sheet.`;}
  characterCard(c,{showHistory=false,showAllTraits=false,guild=null}={}){
    const s=this.getStatus(c.status);
    const owner=guild?`<p class="archetype">${this.escapeHtml(guild.name)}</p>`:'';
    const status=guild?this.workerPlacementText(c,guild):c.alive?(this.isPlaced(c)?'Placed':'Available'):'Dead';
    const conditions=(c.conditions||[]).map(condition=>this.conditionHtml(condition)).join('');
    return `<article class="game-card character-card"><div class="card-header"><div><h3>${c.name}</h3><p class="archetype">${c.archetype}</p>${owner}</div><span class="status-badge has-tip" data-tip="${this.escapeAttr(this.statusTip(s))}">${s.name}</span></div><div class="traits">${this.renderTraitChips(c,showAllTraits)}</div>${conditions?`<div class="conditions">${conditions}</div>`:''}<dl class="stats"><dt>Recruit cost</dt><dd>${this.baseRecruitCost(c)}</dd><dt>Annual salary</dt><dd>${this.characterSalary(c)}</dd><dt>Reputation required</dt><dd>${this.reputationRequirement(c)}</dd><dt>Resources</dt><dd>${c.resources}</dd><dt>Connections</dt><dd>${c.connections}</dd><dt>Status</dt><dd>${this.escapeHtml(status)}</dd></dl>${this.dismissalHtml(c,guild)}${this.characterEngineHtml(c,showAllTraits)}${showHistory?`<p class="history">${c.history.slice(-3).join(' ')||'No history yet.'}</p>`:''}</article>`;
  }
  dismissalHtml(c,guild){
    if(!guild?.human||!c.alive)return '';
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
    const labels={contractScore:'Contract odds',contractSuccess:'On success',contractFailure:'On failure',contractProgress:'Long work',facilityResolve:'Facility placement',facilitySupport:'Facility support',facilityWork:'Training',conditionAdded:'When condition lands',death:'On death',recruitCost:'Recruiting'};
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
      facilityResolve:'Facility resolve',
      facilitySupport:'Facility support',
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
    const humanDraft=setupDraft&&setupGuild.human;
    const isOpen=this.state.phase==='setup'?(humanDraft?this.state.tavernOpen:Boolean(setupGuild)):this.state.tavernOpen;
    this.ui.tavernPanel.classList.toggle('closed',!isOpen);
    this.ui.tavernPanel.classList.remove('setup-draft');
    this.ui.tavernClose.style.visibility=humanDraft?'visible':'hidden';
    this.ui.tavernClose.textContent=humanDraft?'Hide':'Close';
    this.ui.tavernEyebrow.textContent=setupDraft?'Founding Draft':'Tavern';
    this.ui.tavernTitle.textContent=setupDraft?`${setupGuild.name} ${setupGuild.human?'chooses':'is choosing'} a Founder`:'Available Recruits';
    if(setupDraft){
      this.ui.recruitGrid.innerHTML=this.state.tavern.map(c=>{const s=this.getStatus(c.status);return `<div class="merc-token founder-token ${setupGuild.human?'':'locked'}" role="button" tabindex="0" data-id="${c.id}"><strong>${c.name}</strong><div class="token-meta">${c.archetype} - ${s.name}</div><div class="token-meta">${c.traits.join(', ')}</div><div class="token-meta">Upkeep: ${this.characterSalary(c)}g/year</div><div class="token-meta">${setupGuild.human?'Draft founder':'Available'}</div></div>`;}).join('')||'<p class="empty">The tavern is empty.</p>';
      if(setupGuild.human)document.querySelectorAll('.founder-token').forEach(b=>b.addEventListener('click',()=>{this.state.tavernHasNew=false;this.draftFounder(b.dataset.id);}));
      return;
    }
    const human=this.humanGuild();
    this.ui.recruitGrid.innerHTML=(this.state.tavern.map(c=>{
      const s=this.getStatus(c.status);
      const cost=this.recruitCost(human,c);
      const required=this.reputationRequirement(c);
      const blocked=this.recruitBlockReason(human,c);
      const status=blocked||'Hire recruit';
      const tip=`${c.name}\n${s.name}. ${cost} gold hire, ${this.characterSalary(c)}g annual upkeep.\nReputation required: ${required}.\nOne paid tavern hire per season. Founders ignore reputation requirements.`;
      return `<div class="merc-token recruit-token has-tip ${blocked?'dead':''}" role="button" tabindex="0" data-id="${c.id}" data-tip="${this.escapeAttr(tip)}"><strong>${c.name}</strong><div class="token-meta">${c.archetype} - ${cost}g hire</div><div class="token-meta">${this.traitPreviewText(c)}</div><div class="token-meta">Upkeep: ${this.characterSalary(c)}g/year</div>${required?`<div class="token-meta">Requires ${required} rep</div>`:''}<div class="token-meta">${this.escapeHtml(status)}</div></div>`;
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
    return this.visibleTraits(c).map(t=>this.tagHtml(t)).join('')+Array.from({length:this.hiddenTraitCount(c)},()=>`<span class="trait has-tip" data-tip="${this.escapeAttr('Unknown trait\nThis will reveal after the next season progression.')}">?</span>`).join('');
  }
  tagHtml(tag){return `<span class="trait has-tip" data-tip="${this.escapeAttr(this.tagTip(tag))}">${tag}</span>`;}
  conditionHtml(condition){return `<span class="condition has-tip" data-tip="${this.escapeAttr(this.conditionTip(condition))}">${condition.key}${condition.remaining===null?'':` ${condition.remaining}`}</span>`;}
  conditionTip(condition){
    const def=this.conditionDef(condition.key);
    if(!def)return condition.key;
    const duration=condition.remaining===null?'Permanent':`${condition.remaining} season${condition.remaining===1?'':'s'} remaining`;
    const penalty=def.penalty?`-${def.penalty}% success chance when assigned to contract work.`:'No contract success penalty.';
    return `${condition.key}\n${penalty}\n${duration}.`;
  }
  contractTagHtml(req,kind){return `<span class="has-tip" data-tip="${this.escapeAttr(this.tagTip(req.trait,this.explicitTagWeight(req,kind)))}">${req.trait}</span>`;}
  tagTip(tag,weight=null){
    const profession=this.data.characterParts.professions.find(p=>p.name===tag);
    const affinity=this.data.characterParts.tagAffinities?.[tag];
    const primary=this.data.contracts.filter(c=>c.requirements.some(r=>r.trait===tag)).slice(0,4).map(c=>c.type);
    const support=this.data.contracts.filter(c=>c.support.some(r=>r.trait===tag)).slice(0,4).map(c=>c.type);
    const lines=[tag];
    if(profession) lines.push(`Profession: usually ${this.getStatus(profession.status).name}, ${profession.resources} resources, ${profession.connections} connections before variance.`);
    if(weight!==null) lines.push(`This contract weight: +${weight}% success for each assigned worker with this tag.`);
    if(affinity) lines.push(`Broad fit: +${affinity.bonus||5}% on ${affinity.domains.join(', ')} contracts. ${affinity.description||''}`);
    const effects=this.data.characterParts.traitEffects?.[tag]||[];
    for(const effect of effects)lines.push(`Engine: ${this.effectRuleText(effect)}`);
    if(primary.length) lines.push(`Primary demand: ${[...new Set(primary)].join(', ')}.`);
    if(support.length) lines.push(`Support demand: ${[...new Set(support)].join(', ')}.`);
    if(!profession&&!affinity&&!primary.length&&!support.length) lines.push('Character trait. It may matter through generated contracts, AI preferences, or future events.');
    return lines.join('\n');
  }
  workerEngineSummary(worker){
    const effects=this.visibleTraits(worker).flatMap(trait=>this.data.characterParts.traitEffects?.[trait]||[]);
    if(!effects.length)return '';
    return `${worker.name}: ${this.visibleTraits(worker).filter(trait=>this.data.characterParts.traitEffects?.[trait]?.length).slice(0,2).join(' + ')}`;
  }
  statusTip(status){return `${status.name}\nRecruit cost: ${status.recruitCost} gold.\nAnnual salary: ${status.salary} gold.\nFounder starting gold: ${status.startingGold}.\nPaid hire reputation requirement: ${({professional:10,gentry:25,noble:50})[status.id]||0}. Founders ignore this requirement.`;}
  riskTip(risk){
    const text={low:'Low risk failures usually cost time, reputation, resources, or morale.',moderate:'Moderate risk can punish failed work and often pays better.',dangerous:'Dangerous work can injure or kill assigned people.',deadly:'Deadly contracts are late-game threats with severe failure outcomes.',lethal:'Lethal contracts can decide a campaign and can destroy a weak retinue.'};
    return `${risk}\n${text[risk]||'Risk controls the failure table and reward scale.'}`;
  }
  poolTip(contract){
    const pool=this.data.contractParts.world.pools.find(p=>p.key===contract.pool);
    if(!pool)return `${contract.type}\nContract category.`;
    const pressures=Object.entries(pool.pressure||{}).map(([key,direction])=>`${this.worldLabel(key)} ${direction}`).join(', ');
    const effects=Object.entries(pool.effects||{}).map(([key,delta])=>`${this.worldLabel(key)} ${delta>0?'+':''}${delta}`).join(', ');
    return `${contract.pool} Pool\nThis offer is weighted by: ${pressures||'general market conditions'}.\nOn completion it nudges: ${effects||'no world values'}.`;
  }
  contractDetailTip(contract){
    const human=this.humanGuild();
    const preview=this.contractPreview(human,contract);
    const pool=this.poolTip(contract);
    const primary=contract.requirements.map(r=>`${r.trait} +${this.explicitTagWeight(r,'primary')}%`).join(', ');
    const support=contract.support.map(r=>`${r.trait} +${this.explicitTagWeight(r,'support')}%`).join(', ')||'None';
    const offer=contract.offerSeasons>0?`${contract.offerSeasons} season(s) before it closes to new placements`:'closed to new placements';
    return `${contract.title}\n${contract.description}\nRisk: ${contract.risk}.\nWork: ${contract.workSeasons} season(s). Workers remain committed until completion.\nOffer: ${offer}.\nResource requirement: ${contract.materials||0}. Covered Resources add +10% odds each and are not spent.\nPrimary tags: ${primary}.\nSupport tags: ${support}.\nReward: ${contract.reward.gold} gold, ${contract.reward.reputation} reputation.\n\n${this.contractOddsTip(human,contract,preview.team)}\n\n${pool}`;
  }
  contractOddsTip(guild,contract,team){
    if(!team.length)return `Odds preview\nNo free mercenary team is available for this contract. Workers already committed to multi-season contracts cannot be reassigned.`;
    const progress=this.contractProgress(guild,contract);
    const materials=progress?progress.materials:Math.min(guild.resources,contract.materials||0);
    const traitBonus=this.contractTraitEffectScore(guild,contract,team,materials);
    const facilityBonus=this.facilitySupportTraitEffectScore(guild,contract,team,materials);
    const workerLines=team.map(worker=>{
      const tags=this.characterTagScore(worker,contract);
      const stats=worker.resources*3+worker.connections*2;
      const penalty=this.conditionPenalty(worker);
      return `${worker.name}: +${tags}% tags, +${stats}% resources/connections${penalty?`, -${penalty}% conditions`:''}`;
    });
    const raw=this.rawSuccessChanceForTeam(guild,contract,team);
    return `Odds preview: ${this.successChanceForTeam(guild,contract,team)}% (${raw}% raw)\nTeam: ${team.map(worker=>worker.name).join(', ')}\nBase: 50%, Difficulty: -${contract.baseDifficulty}%\n${workerLines.join('\n')}\nGuild Connections: +${guild.connections*2}%\nResource capacity: +${materials*10}% (${materials}/${contract.materials||0}, not spent)\nTrait engine rules: +${traitBonus}%\nFacility support: +${facilityBonus}%`;
  }
  worldStateTip(state,value,trend){
    const direction=trend>3?'rising':trend<-3?'falling':'steady';
    const band=value<35?state.low:value>65?state.high:state.mid;
    const active=this.activeWorldMarketPools(state.key,value);
    const rules=this.worldPressureRules(state.key);
    return `${state.label}\nCurrent: ${band}, ${direction}.\nMarket effect: ${active.length?`${active.join(', ')} contracts are more likely.`:'No strong contract-pool pressure right now.'}${rules?`\nRules: ${rules}.`:''}`;
  }
  activeWorldMarketPools(key,value){
    const band=value<45?'low':value>55?'high':null;
    if(!band)return [];
    return this.data.contractParts.world.pools.filter(pool=>pool.pressure?.[key]===band).map(pool=>pool.key);
  }
  worldPressureRules(key){
    const low=this.data.contractParts.world.pools.filter(pool=>pool.pressure?.[key]==='low').map(pool=>pool.key);
    const high=this.data.contractParts.world.pools.filter(pool=>pool.pressure?.[key]==='high').map(pool=>pool.key);
    const parts=[];
    if(low.length)parts.push(`low favors ${low.join(', ')}`);
    if(high.length)parts.push(`high favors ${high.join(', ')}`);
    return parts.join('; ');
  }
  worldLabel(key){return this.data.contractParts.world.states.find(s=>s.key===key)?.label||key;}
  renderContracts(){const human=this.humanGuild();this.ui.contractGrid.innerHTML=this.state.boardContracts.map(c=>this.contractTile(c,human)).join('');this.bindDropSlots();}
  contractTile(c,human){
    const placed=this.placedTeam(human,c);
    const previewData=placed.length?{team:placed,chance:this.successChanceForTeam(human,c,placed)}:this.contractPreview(human,c);
    const preview=previewData.chance===null?'No free team':`${previewData.chance}% odds`;
    const previewTeam=previewData.team.length?previewData.team.map(worker=>worker.name.split(' ')[0]).join(' + '):'Assign mercs';
    const rivals=this.state.guilds.filter(g=>!g.human&&this.placedTeam(g,c).length).map(g=>this.contractOccupantLabel(g,c)).join(', ');
    return `<article class="contract-tile has-tip" style="${this.contractAccentStyle(c)}" data-tip="${this.escapeAttr(this.contractDetailTip(c))}"><div class="card-header"><div><h3>${c.title}</h3><p class="contract-type">${c.type} / ${c.pool}</p></div>${this.contractMetaHtml(c,human)}</div><p class="description">${c.description}</p><div class="requirements"><strong>Needs:</strong> ${c.requirements.map(r=>this.contractTagHtml(r,'primary')).join(', ')}<br><strong>Helps:</strong> ${c.support.map(r=>this.contractTagHtml(r,'support')).join(', ')||'None'}</div><div class="contract-mini"><span>${preview}</span><span>2 slots</span><span>${c.reward.gold}g/${c.reward.reputation}r</span></div><div class="preview-team">${previewTeam}</div><div class="slot-row">${[0,1].map(i=>this.workerSlot(c,placed[i],human,i)).join('')}</div><div class="occupants">${rivals?`<span class="occupant-pill">${rivals}</span>`:''}<span class="occupant-pill">${this.contractOfferLabel(c)}</span></div></article>`;
  }
  contractMetaHtml(contract,guild){
    const resource=contract.materials?`<span class="contract-chip">${contract.materials} Res</span>`:'';
    return `<div class="contract-meta"><span class="risk-badge has-tip" data-tip="${this.escapeAttr(this.riskTip(contract.risk))}">${contract.risk}</span><span class="contract-chip">${this.contractWorkLabel(contract,guild)}</span>${resource}</div>`;
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
  workerSlot(contract,worker,guild=this.humanGuild(),index=0){
    const locked=this.contractProgress(guild,contract);
    const closed=contract.offerSeasons<=0&&!worker&&!locked;
    const label=index===0?'Lead':'Support';
    return `<div class="worker-slot ${locked?'locked':''}" data-drop-type="contract" data-target="${contract.instanceId}">${worker?this.slotWorkerHtml(worker,`${label}: ${worker.name}`,locked):closed?'Closed':label}</div>`;
  }
  recoverySlot(worker){
    return `<div class="worker-slot recovery-slot" data-drop-type="recovery">${worker?this.slotWorkerHtml(worker,this.workerInitials(worker),false):'Rest'}</div>`;
  }
  renderFacilities(){const human=this.humanGuild();this.ui.facilityGrid.innerHTML=this.data.contractParts.facilities.map(f=>this.facilityTile(f,human)).join('');this.bindDropSlots();}
  facilityTile(f,guild){
    const workers=this.facilityWorkers(guild,f.key,'work');
    return `<article class="facility-tile has-tip" data-tip="${this.escapeAttr(this.facilityTip(f))}"><div class="facility-top"><h3>${f.label}</h3><span>${f.slots}</span></div><div class="facility-note"></div><div class="slot-row">${Array.from({length:f.slots},(_,i)=>this.facilitySlot(f,workers[i])).join('')}</div></article>`;
  }
  facilitySlot(f,worker){return `<div class="worker-slot" data-drop-type="facility" data-target="${f.key}">${worker?this.slotWorkerHtml(worker,worker.name,false):'Slot'}</div>`;}
  slotWorkerHtml(worker,label,locked=false){
    const draggable=worker.alive&&this.state.phase==='awaitHuman'&&!this.state.humanActionUsed&&!locked;
    return `<span class="slot-worker" ${draggable?`draggable="true" data-id="${worker.id}"`:''}>${label}</span>`;
  }
  workerInitials(worker){return worker.name.split(' ').map(x=>x[0]).join('').slice(0,2);}
  bindDragSources(){document.querySelectorAll('[draggable="true"][data-id]').forEach(el=>{el.addEventListener('dragstart',evt=>{evt.dataTransfer.setData('text/plain',el.dataset.id);evt.dataTransfer.effectAllowed='move';});});}
  bindReturnDrop(el){if(!el)return;el.classList.add('return-drop');el.ondragover=evt=>{if(this.state.phase!=='awaitHuman'||this.state.humanActionUsed)return;evt.preventDefault();el.classList.add('over');};el.ondragleave=()=>el.classList.remove('over');el.ondrop=evt=>{evt.preventDefault();el.classList.remove('over');const id=evt.dataTransfer.getData('text/plain');this.returnWorker(id);};}
  bindDropSlots(){this.bindDragSources();this.bindReturnDrop(this.ui.peopleGrid);document.querySelectorAll('.worker-slot').forEach(slot=>{slot.addEventListener('dragover',evt=>{evt.preventDefault();slot.classList.add('over');});slot.addEventListener('dragleave',()=>slot.classList.remove('over'));slot.addEventListener('drop',evt=>{evt.preventDefault();slot.classList.remove('over');const id=evt.dataTransfer.getData('text/plain');this.placeWorker(id,slot.dataset.target,slot.dataset.dropType,slot.dataset.mode||'work');});});}
  facilityTip(f){
    const effects=[
      `Training roll: ${f.trainChance}%`
    ].filter(Boolean).join('\n');
    return `${f.label}\nEffects: ${effects}\nTrainable traits: ${(f.traits||[]).join(', ')||'none'}${f.rareTraits?.length?`\nRare traits: ${f.rareTraits.join(', ')} (${Math.round((f.rareChance??0.12)*100)}% pool chance)`:''}\nSlots: ${f.slots}.`;
  }
}


const game = new Game();
game.init();
game.bindUI();
game.render();
