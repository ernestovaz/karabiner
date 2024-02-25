import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
        },
        to: [
          {
            key_code: "left_shift",
            modifiers: ["left_command", "left_control", "left_option"],
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
      //      {
      //        type: "basic",
      //        description: "Disable CMD + Tab to force Hyper Key usage",
      //        from: {
      //          key_code: "tab",
      //          modifiers: {
      //            mandatory: ["left_command"],
      //          },
      //        },
      //        to: [
      //          {
      //            key_code: "tab",
      //          },
      //        ],
      //      },
    ],
  },
  ...createHyperSubLayers({
    // o = "Open" applications
    o: {
      g: app("Google Chrome"),
      f: app("Firefox"),
      c: app("IntelliJ IDEA"), //idk, "C"ode?
      v: app("Visual Studio Code"),
      s: app("Slack"),
      t: app("iTerm"),
      a: app("Spotify"), //"A"udio, yeah I'm so smart
      e: app("Microsoft Outlook"), //"E"mail
      w: app("Microsoft Teams"), //for "W"ork, duh
      z: app("Obsidian") //this is easy, it's for "Z"ettelkasten
    },

    // s = "system"
    s: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
    },

    // r = Rectangle.app
    r: {
      h: {
        description: "Rectangle: Left Half",
        to: [
          {
            key_code: "left_arrow",
            modifiers: ["right_control", "right_option"],
          },
        ],
      },
      l: {
        description: "Rectangle: Right Half",
        to: [
          {
            key_code: "right_arrow",
            modifiers: ["right_control", "right_option"],
          },
        ],
      },
      k: {
        description: "Rectangle: Top Right",
        to: [
          {
            key_code: "i",
            modifiers: ["right_control", "right_option"],
          },
        ],
      },
      j: {
        description: "Rectangle: Bottom Right",
        to: [
          {
            key_code: "k",
            modifiers: ["right_control", "right_option"],
          },
        ],
      },
      n: {
        description: "Rectangle: Next display",
        to: [
          {
            key_code: "right_arrow",
            modifiers: ["right_control", "right_option", "right_command"],
          },
        ],
      },
      p: {
        description: "Rectangle: Previous display",
        to: [
          {
            key_code: "left_arrow",
            modifiers: ["right_control", "right_option", "right_command"],
          },
        ],
      },
      m: {
        description: "Rectangle: Maximize",
        to: [
          {
            key_code: "return_or_enter",
            modifiers: ["right_control", "right_option"],
          },
        ],
      },
      u: {
        description: "Rectangle: Center (Undo? idk)",
        to: [
          {
            key_code: "c",
            modifiers: ["right_control", "right_option"],
          },
        ],
      },
    },

    // w = web; for web browser, idk
    w: {
      p: {
        description: "Web: Previous Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control", "right_shift"],
          },
        ],
      },
      n: {
        description: "Web: Next Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control"],
          },
        ],
      },
      h: {
        description: "Web: Back",
        to: [
          {
            key_code: "open_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
      l: {
        description: "Web: Forward",
        to: [
          {
            key_code: "close_bracket",
            modifiers: ["right_command"],
          },
        ],
      }
    },

    // a = audio
    a: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      l: {
        to: [{ key_code: "fastforward" }],
      },
      h: {
        to: [{ key_code: "rewind" }],
      },
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
