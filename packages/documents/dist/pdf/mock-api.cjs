"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/pdf/mock-api.ts
var mock_api_exports = {};
__export(mock_api_exports, {
  parseAlabamaNameChangeForm: () => parseAlabamaNameChangeForm
});
module.exports = __toCommonJS(mock_api_exports);
var z = __toESM(require("zod"), 1);

// src/pdf/al_name_change.json
var al_name_change_default = {
  raw_text: "Request to Change Name",
  title: "Request to Change Name (For An Adult)",
  description: "",
  elements: [
    {
      id: "1fc0b74a-7139-46a7-9aad-8e3e3ff94a6d",
      group_id: 2,
      element_type: "text",
      element_params: {
        text: "In the Probate Court of (county): ",
        text_style: "JTUTCJ+ArialMT 9.840000000000032",
        options: []
      },
      inputs: [
        {
          input_type: "Tx",
          input_params: {
            text: "<input label=County_Name1 instructions={field_dict['field_instructions']}>",
            text_style: "Helv 10 Tf 0 g",
            output_id: "County_Name1",
            placeholder: "",
            instructions: "Type name of Alabama county where you live",
            required: false,
            options: []
          }
        }
      ],
      parent: null
    },
    {
      id: "6904a3ef-17f6-4a1b-83c7-4a963f1a43c5",
      group_id: 3,
      element_type: "text",
      element_params: {
        text: "Your current name",
        text_style: "JTUTCJ+ArialMT 9.840000000000032",
        options: []
      },
      inputs: [
        {
          input_type: "Tx",
          input_params: {
            text: "<input label=Current_First_Name1 instructions={field_dict['field_instructions']}>",
            text_style: "Helv 10 Tf 0 g",
            output_id: "Current_First_Name1",
            placeholder: "",
            instructions: "Type your current first name",
            required: false,
            options: []
          }
        },
        {
          input_type: "Tx",
          input_params: {
            text: "<input label=Current_Middle_Name1 instructions={field_dict['field_instructions']}>",
            text_style: "Helv 10 Tf 0 g",
            output_id: "Current_Middle_Name1",
            placeholder: "",
            instructions: "Type your current middle name",
            required: false,
            options: []
          }
        },
        {
          input_type: "Tx",
          input_params: {
            text: "<input label=Current_Last_Name1 instructions={field_dict['field_instructions']}>",
            text_style: "Helv 10 Tf 0 g",
            output_id: "Current_Last_Name1",
            placeholder: "",
            instructions: "Type your current last name",
            required: false,
            options: []
          }
        }
      ],
      parent: null
    },
    {
      id: "0a10d256-c938-4c83-9045-8f31df99bbff",
      group_id: 5,
      element_type: "text",
      element_params: {
        text: "To ask the court to change your name, you must fill out this form, and: ",
        text_style: "subheading",
        options: []
      },
      inputs: [],
      parent: null
    },
    {
      id: "9ffecb48-b274-44a9-ab21-17f90db129ca",
      group_id: 6,
      element_type: "text",
      element_params: {
        text: "Attach a certified copy of your birth certificate and a copy of your photo ID, and ",
        text_style: "indent",
        options: []
      },
      inputs: [],
      parent: null
    },
    {
      id: "21ce04d1-7d40-40c9-bdd5-e738b801a6d3",
      group_id: 7,
      element_type: "text",
      element_params: {
        text: "  File your form and attachments in the same county where you live. ",
        text_style: "indent",
        options: []
      },
      inputs: [],
      parent: null
    },
    {
      id: "fd565668-436f-42f3-9969-4de1b86db4ae",
      group_id: 8,
      element_type: "text",
      element_params: {
        text: "I declare that the following information is true: ",
        text_style: "subheading",
        options: []
      },
      inputs: [],
      parent: null
    },
    {
      id: "767b5b4e-f1f0-4ca2-a606-d74562d4b78b",
      group_id: 9,
      element_type: "text",
      element_params: {
        text: "My current name",
        text_style: "JTUTCJ+ArialMT 8.879999999999995",
        options: []
      },
      inputs: [
        {
          input_type: "Tx",
          input_params: {
            text: "<input label=Current_First_Name2 instructions={field_dict['field_instructions']}>",
            text_style: "Helv 10 Tf 0 g",
            output_id: "Current_First_Name2",
            placeholder: "",
            instructions: "Type your current first name",
            required: false,
            options: []
          }
        },
        {
          input_type: "Tx",
          input_params: {
            text: "<input label=Current_Middle_Name2 instructions={field_dict['field_instructions']}>",
            text_style: "Helv 10 Tf 0 g",
            output_id: "Current_Middle_Name2",
            placeholder: "",
            instructions: "Type your current middle name",
            required: false,
            options: []
          }
        },
        {
          input_type: "Tx",
          input_params: {
            text: "<input label=Current_Last_Name2 instructions={field_dict['field_instructions']}>",
            text_style: "Helv 10 Tf 0 g",
            output_id: "Current_Last_Name2",
            placeholder: "",
            instructions: "Type your current last name",
            required: false,
            options: []
          }
        }
      ],
      parent: null
    },
    {
      id: "91955d9c-b3fc-4190-b1fd-bfddd49a2a6c",
      group_id: 11,
      element_type: "text",
      element_params: {
        text: "My address",
        text_style: "JTUTCJ+ArialMT 8.879999999999995",
        options: []
      },
      inputs: [
        {
          input_type: "Tx",
          input_params: {
            text: "<input label=Street_Address instructions={field_dict['field_instructions']}>",
            text_style: "Helv 10 Tf 0 g",
            output_id: "Street_Address",
            placeholder: "",
            instructions: "Type your street address",
            required: false,
            options: []
          }
        },
        {
          input_type: "Tx",
          input_params: {
            text: "<input label=City instructions={field_dict['field_instructions']}>",
            text_style: "Helv 10 Tf 0 g",
            output_id: "City",
            placeholder: "",
            instructions: "Type the name of your city",
            required: false,
            options: []
          }
        },
        {
          input_type: "Tx",
          input_params: {
            text: "<input label=State instructions={field_dict['field_instructions']}>",
            text_style: "Helv 10 Tf 0 g",
            output_id: "State",
            placeholder: "",
            instructions: "Type the state where you live",
            required: false,
            options: []
          }
        },
        {
          input_type: "Tx",
          input_params: {
            text: "<input label=Zip instructions={field_dict['field_instructions']}>",
            text_style: "Helv 10 Tf 0 g",
            output_id: "Zip",
            placeholder: "",
            instructions: "Type your zip code",
            required: false,
            options: []
          }
        }
      ],
      parent: null
    },
    {
      id: "7ce2801f-022d-4140-b004-fdcdaf9a0767",
      group_id: 13,
      element_type: "text",
      element_params: {
        text: "My phone numbers",
        text_style: "DURMBL+Arial-BoldMT 8.879999999999995",
        options: []
      },
      inputs: [
        {
          input_type: "Tx",
          input_params: {
            text: "<input label=Home_Phone instructions={field_dict['field_instructions']}>",
            text_style: "Helv 10 Tf 0 g",
            output_id: "Home_Phone",
            placeholder: "",
            instructions: "Type your home phone number including area code",
            required: false,
            options: []
          }
        },
        {
          input_type: "Tx",
          input_params: {
            text: "<input label=Work_Phone instructions={field_dict['field_instructions']}>",
            text_style: "Helv 10 Tf 0 g",
            output_id: "Work_Phone",
            placeholder: "",
            instructions: "Type your work phone number including area code",
            required: false,
            options: []
          }
        }
      ],
      parent: null
    },
    {
      id: "c3212cab-6019-4e60-8198-f11b87c81e82",
      group_id: 14,
      element_type: "text",
      element_params: {
        text: "My date of birth is (mm/dd/yyyy): ",
        text_style: "JTUTCJ+ArialMT 8.879999999999995",
        options: []
      },
      inputs: [
        {
          input_type: "Tx",
          input_params: {
            text: "<input label=DOB instructions={field_dict['field_instructions']}>",
            text_style: "Helv 10 Tf 0 g",
            output_id: "DOB",
            placeholder: "",
            instructions: "Type your date of birth as mm/dd/yyyy",
            required: false,
            options: []
          }
        }
      ],
      parent: null
    },
    {
      id: "ce713b94-0008-43ab-ace4-6b38d01b2f76",
      group_id: 15,
      element_type: "text",
      element_params: {
        text: "My name at birth",
        text_style: "JTUTCJ+ArialMT 8.879999999999995",
        options: []
      },
      inputs: [
        {
          input_type: "Tx",
          input_params: {
            text: "<input label=Birth_First_Name instructions={field_dict['field_instructions']}>",
            text_style: "Helv 10 Tf 0 g",
            output_id: "Birth_First_Name",
            placeholder: "",
            instructions: "Type the first name you were given at birth",
            required: false,
            options: []
          }
        },
        {
          input_type: "Tx",
          input_params: {
            text: "<input label=Birth_Middle_Name instructions={field_dict['field_instructions']}>",
            text_style: "Helv 10 Tf 0 g",
            output_id: "Birth_Middle_Name",
            placeholder: "",
            instructions: "Type the middle name you were given at birth",
            required: false,
            options: []
          }
        },
        {
          input_type: "Tx",
          input_params: {
            text: "<input label=Birth_Last_Name instructions={field_dict['field_instructions']}>",
            text_style: "Helv 10 Tf 0 g",
            output_id: "Birth_Last_Name",
            placeholder: "",
            instructions: "Type the last name you were given at birth",
            required: false,
            options: []
          }
        }
      ],
      parent: null
    },
    {
      id: "f228e971-d4db-43f6-a03b-4eb009f214b0",
      group_id: 17,
      element_type: "text",
      element_params: {
        text: "I am an adult (19 or older), of sound mind, and live in (name of Alabama county): ",
        text_style: "LEDWHU+TimesNewRomanPSMT 8.879999999999995",
        options: []
      },
      inputs: [
        {
          input_type: "Tx",
          input_params: {
            text: "<input label=County_Name2 instructions={field_dict['field_instructions']}>",
            text_style: "Helv 10 Tf 0 g",
            output_id: "County_Name2",
            placeholder: "",
            instructions: "Type the name of the county where you live now",
            required: false,
            options: []
          }
        }
      ],
      parent: null
    },
    {
      id: "e42da30c-63c0-463d-af6a-f55f9a885ca9",
      group_id: 18,
      element_type: "radio_group",
      element_params: {
        text: "The attached copy of my photo ID is my (check one): ",
        text_style: "heading",
        options: []
      },
      inputs: [
        {
          input_type: "Tx",
          input_params: {
            text: "Driver\u2019s license, #",
            text_style: "Helv 10 Tf 0 g",
            output_id: "DL#",
            placeholder: "",
            instructions: "Type your driver's license number",
            required: false,
            options: []
          }
        },
        {
          input_type: "Tx",
          input_params: {
            text: "Non-driver\u2019s photo, ID #:",
            text_style: "Helv 10 Tf 0 g",
            output_id: "ID#",
            placeholder: "",
            instructions: "Type the number from your photo ID (not driver's license)",
            required: false,
            options: []
          }
        }
      ],
      parent: "PhotoID"
    },
    {
      id: "a532ebcf-b71a-4135-9de1-819bc98815b0",
      group_id: 19,
      element_type: "text",
      element_params: {
        text: "I ask the court to change my name because (explain why you want to change your name): ",
        text_style: "LEDWHU+TimesNewRomanPSMT 8.879999999999995",
        options: []
      },
      inputs: [
        {
          input_type: "Tx",
          input_params: {
            text: "<input label=Why_change_name1 instructions={field_dict['field_instructions']}>",
            text_style: "Helv 10 Tf 0 g",
            output_id: "Why_change_name1",
            placeholder: "",
            instructions: "Type why you want to change your name",
            required: false,
            options: []
          }
        }
      ],
      parent: null
    },
    {
      id: "f21048d9-95f4-4e83-843b-cf8ae282f4ed",
      group_id: 22,
      element_type: "text",
      element_params: {
        text: "My new name",
        text_style: "JTUTCJ+ArialMT 8.879999999999995",
        options: []
      },
      inputs: [
        {
          input_type: "Tx",
          input_params: {
            text: "<input label=New_First_Name instructions={field_dict['field_instructions']}>",
            text_style: "Helv 10 Tf 0 g",
            output_id: "New_First_Name",
            placeholder: "",
            instructions: "Type what you want your new first name to be",
            required: false,
            options: []
          }
        },
        {
          input_type: "Tx",
          input_params: {
            text: "<input label=New_Middle_Name instructions={field_dict['field_instructions']}>",
            text_style: "Helv 10 Tf 0 g",
            output_id: "New_Middle_Name",
            placeholder: "",
            instructions: "Type what you want your new middle name to be",
            required: false,
            options: []
          }
        },
        {
          input_type: "Tx",
          input_params: {
            text: "<input label=New_Last_Name instructions={field_dict['field_instructions']}>",
            text_style: "Helv 10 Tf 0 g",
            output_id: "New_Last_Name",
            placeholder: "",
            instructions: "Type what you want your new last name to be",
            required: false,
            options: []
          }
        }
      ],
      parent: null
    },
    {
      id: "9a3644e2-05f3-4dae-8c64-6abd788d0c67",
      group_id: 24,
      element_type: "text",
      element_params: {
        text: "I also declare: ",
        text_style: "subheading",
        options: []
      },
      inputs: [],
      parent: null
    },
    {
      id: "14cdb97d-3024-43f4-932d-6b3f29bf2ffa",
      group_id: 25,
      element_type: "text",
      element_params: {
        text: "  I am not now facing criminal charges, nor am I involved in any other court case. ",
        text_style: "indent",
        options: []
      },
      inputs: [],
      parent: null
    },
    {
      id: "1a37c28e-c38b-4154-80c9-0ef8238731c6",
      group_id: 26,
      element_type: "text",
      element_params: {
        text: "  I have never been convicted of a criminal sex offense (as defined in Alabama Code \xA7 15-20-21), a crime of moral turpitude, or a felony. ",
        text_style: "indent",
        options: []
      },
      inputs: [],
      parent: null
    },
    {
      id: "c38a01c9-d076-4356-b732-276e06311503",
      group_id: 28,
      element_type: "text",
      element_params: {
        text: "  I am not asking to change my name to avoid paying my debts or to commit fraud. ",
        text_style: "indent",
        options: []
      },
      inputs: [],
      parent: null
    }
  ],
  raw_fields: [
    {
      type: "/Tx",
      var_name: "Current_First_Name1",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          143.52,
          660.72,
          315.114,
          674.88
        ],
        field_label: "Current_First_Name1",
        field_instructions: "Type your current first name"
      }
    },
    {
      type: "/Tx",
      var_name: "Current_Middle_Name1",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          319.867,
          660.368,
          446.006,
          674.629
        ],
        field_label: "Current_Middle_Name1",
        field_instructions: "Type your current middle name"
      }
    },
    {
      type: "/Tx",
      var_name: "Current_Last_Name1",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          448.846,
          661.013,
          552.413,
          674.629
        ],
        field_label: "Current_Last_Name1",
        field_instructions: "Type your current last name"
      }
    },
    {
      type: "/Tx",
      var_name: "Current_First_Name2",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          175.92,
          557.04,
          330.412,
          571.2
        ],
        field_label: "Current_First_Name2",
        field_instructions: "Type your current first name"
      }
    },
    {
      type: "/Tx",
      var_name: "Current_Middle_Name2",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          335.345,
          557.185,
          456.324,
          572.091
        ],
        field_label: "Current_Middle_Name2",
        field_instructions: "Type your current middle name"
      }
    },
    {
      type: "/Tx",
      var_name: "Current_Last_Name2",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          459.809,
          557.185,
          555.638,
          572.091
        ],
        field_label: "Current_Last_Name2",
        field_instructions: "Type your current last name"
      }
    },
    {
      type: "/Tx",
      var_name: "Street_Address",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          148.8,
          528.48,
          284.625,
          542.64
        ],
        field_label: "Street_Address",
        field_instructions: "Type your street address"
      }
    },
    {
      type: "/Tx",
      var_name: "City",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          286.978,
          527.52,
          391.19,
          542.426
        ],
        field_label: "City",
        field_instructions: "Type the name of your city"
      }
    },
    {
      type: "/Tx",
      var_name: "State",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          392.74,
          528.165,
          462.129,
          542.426
        ],
        field_label: "State",
        field_instructions: "Type the state where you live"
      }
    },
    {
      type: "/Tx",
      var_name: "Zip",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          464.324,
          527.52,
          554.993,
          543.071
        ],
        field_label: "Zip",
        field_instructions: "Type your zip code"
      }
    },
    {
      type: "/Tx",
      var_name: "Home_Phone",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          224.4,
          500.16,
          359.16,
          514.32
        ],
        field_label: "Home_Phone",
        field_instructions: "Type your home phone number including area code"
      }
    },
    {
      type: "/Tx",
      var_name: "Work_Phone",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          392.88,
          500.16,
          555.48,
          514.32
        ],
        field_label: "Work_Phone",
        field_instructions: "Type your work phone number including area code"
      }
    },
    {
      type: "/Tx",
      var_name: "DOB",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          224.16,
          480.48,
          555.48,
          494.64
        ],
        field_label: "DOB",
        field_instructions: "Type your date of birth as mm/dd/yyyy"
      }
    },
    {
      type: "/Tx",
      var_name: "Birth_First_Name",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          182.64,
          457.68,
          320.739,
          471.84
        ],
        field_label: "Birth_First_Name",
        field_instructions: "Type the first name you were given at birth"
      }
    },
    {
      type: "/Tx",
      var_name: "Birth_Middle_Name",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          324.381,
          457.872,
          445.361,
          472.133
        ],
        field_label: "Birth_Middle_Name",
        field_instructions: "Type the middle name you were given at birth"
      }
    },
    {
      type: "/Tx",
      var_name: "Birth_Last_Name",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          446.911,
          457.872,
          554.993,
          472.133
        ],
        field_label: "Birth_Last_Name",
        field_instructions: "Type the last name you were given at birth"
      }
    },
    {
      type: "/Tx",
      var_name: "County_Name1",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          221.76,
          685.275,
          413.28,
          700.08
        ],
        field_label: "County_Name1",
        field_instructions: "Type name of Alabama county where Probate Court is located"
      }
    },
    {
      type: "/Tx",
      var_name: "County_Name2",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          434.16,
          428.64,
          555.48,
          442.8
        ],
        field_label: "County_Name2",
        field_instructions: "Type the name of the county where you live now"
      }
    },
    {
      type: "/Tx",
      var_name: "DL#",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          410.64,
          406.08,
          555.48,
          420.24
        ],
        field_label: "DL#",
        field_instructions: "Type your driver's license number"
      }
    },
    {
      type: "/Btn",
      var_name: "PhotoID",
      field_dict: {
        font_info: "/ZaDb 10 Tf 0 g",
        flags: 49152,
        field_type: "button_field",
        field_label: "PhotoID",
        child_fields: [
          {
            coordinates: [
              320.512,
              405.766,
              330.773,
              416.027
            ]
          },
          {
            coordinates: [
              319.867,
              391.578,
              330.773,
              403.129
            ]
          }
        ],
        num_children: 2
      }
    },
    {
      type: "/Tx",
      var_name: "ID#",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          436.08,
          393.6,
          555.48,
          405.885
        ],
        field_label: "ID#",
        field_instructions: "Type the number from your photo ID (not driver's license)"
      }
    },
    {
      type: "/Tx",
      var_name: "Why_change_name1",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          466.32,
          375.36,
          555.48,
          389.52
        ],
        field_label: "Why_change_name1",
        field_instructions: "Type why you want to change your name"
      }
    },
    {
      type: "/Tx",
      var_name: "Why_change_name2",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          77.52,
          360.48,
          555.48,
          374.64
        ],
        field_label: "Why_change_name2",
        field_instructions: "Continue typing why you want to change your name"
      }
    },
    {
      type: "/Tx",
      var_name: "Why_change_name3",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          77.52,
          346.56,
          555.48,
          359.64
        ],
        field_label: "Why_change_name3",
        field_instructions: "Continue typing why you want to change your name"
      }
    },
    {
      type: "/Tx",
      var_name: "New_First_Name",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          207.84,
          326.4,
          333.637,
          340.56
        ],
        field_label: "New_First_Name",
        field_instructions: "Type what you want your new first name to be"
      }
    },
    {
      type: "/Tx",
      var_name: "New_Middle_Name",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          335.989,
          326.313,
          449.876,
          340.575
        ],
        field_label: "New_Middle_Name",
        field_instructions: "Type what you want your new middle name to be"
      }
    },
    {
      type: "/Tx",
      var_name: "New_Last_Name",
      field_dict: {
        font_info: "/Helv 10 Tf 0 g",
        field_type: "text_field",
        coordinates: [
          450.781,
          325.668,
          564.021,
          340.575
        ],
        field_label: "New_Last_Name",
        field_instructions: "Type what you want your new last name to be"
      }
    }
  ]
};

// src/util.ts
var stringToBase64 = (input) => {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(input, "utf-8").toString("base64");
  } else {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(input);
    let binaryString = encoded.reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    return window.btoa(binaryString);
  }
};

// src/pdf/mock-api.ts
var TxInput = z.object({
  input_type: z.literal("Tx"),
  input_params: z.object({
    text: z.string(),
    text_style: z.string(),
    output_id: z.string(),
    placeholder: z.string(),
    instructions: z.string(),
    required: z.boolean(),
    options: z.array(z.string())
  })
});
var BtnInput = z.object({
  input_type: z.literal("Btn"),
  input_params: z.object({
    text: z.string(),
    text_style: z.string(),
    output_id: z.string(),
    placeholder: z.string(),
    instructions: z.string(),
    required: z.boolean(),
    options: z.array(z.string())
  })
});
var ExtractedInput = z.discriminatedUnion("input_type", [TxInput, BtnInput]);
var ExtractedElement = z.object({
  id: z.string(),
  group_id: z.number(),
  element_type: z.string(),
  element_params: z.object({
    text: z.string(),
    text_style: z.string(),
    options: z.nullable(z.array(z.string()))
  }),
  inputs: ExtractedInput.array(),
  parent: z.string().nullable()
});
var RawTxField = z.object({
  type: z.literal("/Tx"),
  var_name: z.string(),
  field_dict: z.object({
    font_info: z.string(),
    field_type: z.string(),
    coordinates: z.number().array().optional(),
    field_label: z.string(),
    field_instructions: z.string()
  })
});
var RawBtnField = z.object({
  type: z.literal("/Btn"),
  var_name: z.string(),
  field_dict: z.object({
    font_info: z.string(),
    flags: z.number(),
    field_type: z.string(),
    field_label: z.string(),
    child_fields: z.array(z.object({ coordinates: z.number().array() })),
    num_children: z.number()
  })
});
var ExtractedObject = z.object({
  raw_text: z.string(),
  title: z.string(),
  description: z.string(),
  elements: ExtractedElement.array(),
  raw_fields: z.discriminatedUnion("type", [RawTxField, RawBtnField]).array()
});
var parseAlabamaNameChangeForm = () => {
  const extracted = ExtractedObject.parse(al_name_change_default);
  const parsedPdf = {
    elements: {},
    outputs: {},
    root: "root",
    title: extracted.title
  };
  const rootSequence = [];
  for (const element of extracted.elements) {
    const fieldsetElements = [];
    if (element.inputs.length === 0) {
      parsedPdf.elements[element.id] = {
        type: "paragraph",
        id: element.id,
        default: {
          text: "",
          maxLength: 2048
        },
        data: {
          text: element.element_params.text,
          style: element.element_params.text_style
        },
        required: false
      };
      rootSequence.push(element.id);
      continue;
    }
    for (const input of element.inputs) {
      if (input.input_type === "Tx") {
        const id = stringToBase64(PdfFieldMap[input.input_params.output_id]);
        parsedPdf.elements[id] = {
          type: "input",
          id,
          default: {
            required: false,
            label: "",
            initial: "",
            maxLength: 128
          },
          data: {
            label: input.input_params.instructions
          },
          required: false
        };
        fieldsetElements.push(id);
        parsedPdf.outputs[id] = {
          type: "TextField",
          name: PdfFieldMap[input.input_params.output_id],
          label: input.input_params.instructions,
          value: "",
          maxLength: 1024,
          required: input.input_params.required
        };
      }
    }
    if (fieldsetElements.length > 0) {
      parsedPdf.elements[element.id] = {
        id: element.id,
        type: "radiotextgroup" ? element.element_type === "radio_group" : "fieldset",
        data: {
          legend: element.element_params.text,
          elements: fieldsetElements
        },
        default: {
          elements: []
        },
        required: true
      };
      rootSequence.push(element.id);
    }
  }
  parsedPdf.elements["root"] = {
    id: "root",
    type: "sequence",
    data: {
      elements: rootSequence
    },
    default: {
      elements: []
    },
    required: true
  };
  return parsedPdf;
};
var PdfFieldMap = {
  County_Name1: "users1_address_county",
  Current_First_Name1: "users1_name_first",
  Current_Middle_Name1: "users1_name_middle",
  Current_Last_Name1: "users1_name_last",
  Current_First_Name2: "users1_name_first__2",
  Current_Middle_Name2: "users1_name_middle__2",
  Current_Last_Name2: "users1_name_last__2",
  Street_Address: "users1_address_line_one",
  City: "users1_address_city",
  State: "users1_address_state",
  Zip: "users1_address_zip",
  Home_Phone: "users1_phone",
  Work_Phone: "work_phone",
  DOB: "users1_birthdate",
  Birth_First_Name: "user1_preferred_name_first",
  Birth_Middle_Name: "user1_preferred_name_middle",
  Birth_Last_Name: "user1_preferred_name_last",
  County_Name2: "user1_address_county__2",
  PhotoID: "photo_id",
  "DL#": "driver_license_number",
  "ID#": "non_driver_id_number",
  Why_change_name1: "reasons_for_change",
  // pdf-lib combines the three input lines into a single input
  Why_change_name2: "reasons_for_change",
  Why_change_name3: "reasons_for_change",
  New_First_Name: "users1_previous_names1_first",
  New_Middle_Name: "users1_previous_names1_middle",
  New_Last_Name: "users1_previous_names1_last"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parseAlabamaNameChangeForm
});
