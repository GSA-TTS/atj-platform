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

// src/document.ts
var document_exports = {};
__export(document_exports, {
  addDocument: () => addDocument,
  addDocumentFieldsToForm: () => addDocumentFieldsToForm
});
module.exports = __toCommonJS(document_exports);
var import_forms = require("@atj/forms");

// src/pdf/extract.ts
var pdfLib = __toESM(require("pdf-lib"), 1);

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

// src/pdf/extract.ts
var getDocumentFieldData = async (pdfBytes) => {
  const pdfDoc = await pdfLib.PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();
  const fields = form.getFields();
  return Object.fromEntries(
    fields.map((field) => {
      return [stringToBase64(field.getName()), getFieldValue(field)];
    })
  );
};
var getFieldValue = (field) => {
  if (field instanceof pdfLib.PDFTextField) {
    return {
      type: "TextField",
      name: field.getName(),
      label: field.getName(),
      value: field.getText() || "",
      maxLength: field.getMaxLength(),
      required: field.isRequired()
    };
  } else if (field instanceof pdfLib.PDFCheckBox) {
    return {
      type: "CheckBox",
      name: field.getName(),
      label: field.getName(),
      value: field.isChecked(),
      required: field.isRequired()
    };
  } else if (field instanceof pdfLib.PDFDropdown) {
    return {
      type: "Dropdown",
      name: field.getName(),
      label: field.getName(),
      value: field.getSelected(),
      required: field.isRequired()
    };
  } else if (field instanceof pdfLib.PDFOptionList) {
    return {
      type: "OptionList",
      name: field.getName(),
      label: field.getName(),
      value: field.getSelected(),
      required: field.isRequired()
    };
  } else if (field instanceof pdfLib.PDFRadioGroup) {
    return {
      type: "RadioGroup",
      name: field.getName(),
      options: field.getOptions(),
      label: field.getName(),
      value: field.getSelected() || "",
      // pdfLib allows this to be undefined
      required: field.isRequired()
    };
  } else {
    return {
      type: "not-supported",
      name: field.getName(),
      error: `unsupported type: ${field.constructor.name}`
    };
  }
};

// src/pdf/generate.ts
var import_pdf_lib = require("pdf-lib");

// src/pdf/generate-dummy.ts
var import_pdf_lib2 = require("pdf-lib");

// src/pdf/mock-api.ts
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

// src/suggestions.ts
var getSuggestedFormElementsFromCache = async (rawData) => {
  const cache = getFakeCache();
  const hash = await getObjectHash(rawData);
  return cache.get(hash);
};
var getFakeCache = () => {
  const cache = {
    "hardcoded-hash": UD105_TEST_DATA,
    "179be8c1c78b01ed7c45569912c2bb862ec3764617f908ebc29178e36fd6316d": parseAlabamaNameChangeForm()
  };
  return {
    get(hashKey) {
      return cache[hashKey];
    }
  };
};
var getObjectHash = async (buffer) => {
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = new Uint8Array(hashBuffer);
  const hashHex = hashArray.reduce(
    (str, byte) => str + byte.toString(16).padStart(2, "0"),
    ""
  );
  return hashHex;
};
var UD105_TEST_DATA = [
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page1[0].P1Caption[0].CaseNumber[0].CaseNumber[0]",
    id: "pdf-obj-0-4",
    value: "",
    label: "CASE NUMBER"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page1[0].P1Caption[0].AttyPartyInfo[0].AttyBarNo[0]",
    id: "pdf-obj-0-5",
    value: "",
    label: "STATE BAR NUMBER"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page1[0].P1Caption[0].AttyPartyInfo[0].Name[0]",
    id: "pdf-obj-0-6",
    value: "",
    label: "NAME"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page1[0].P1Caption[0].AttyPartyInfo[0].AttyFirm[0]",
    id: "pdf-obj-0-7",
    value: "",
    label: "FIRM NAME"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page1[0].P1Caption[0].AttyPartyInfo[0].Street[0]",
    id: "pdf-obj-0-8",
    value: "",
    label: "STREET ADDRESS"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page1[0].P1Caption[0].AttyPartyInfo[0].City[0]",
    id: "pdf-obj-0-9",
    value: "",
    label: "CITY"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page1[0].P1Caption[0].AttyPartyInfo[0].State[0]",
    id: "pdf-obj-0-10",
    value: "",
    label: "STATE"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page1[0].P1Caption[0].AttyPartyInfo[0].Zip[0]",
    id: "pdf-obj-0-11",
    value: "",
    label: "ZIP CODE"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page1[0].P1Caption[0].AttyPartyInfo[0].Phone[0]",
    id: "pdf-obj-0-12",
    value: "",
    label: "Telephone number:"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page1[0].P1Caption[0].AttyPartyInfo[0].Fax[0]",
    id: "pdf-obj-0-13",
    value: "",
    label: "Fax number"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page1[0].P1Caption[0].AttyPartyInfo[0].Email[0]",
    id: "pdf-obj-0-14",
    value: "",
    label: "E-MAIL ADDRESS:"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page1[0].P1Caption[0].AttyPartyInfo[0].AttyFor[0]",
    id: "pdf-obj-0-15",
    value: "",
    label: "ATTORNEY FOR name"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page1[0].P1Caption[0].CourtInfo[0].CrtCounty[0]",
    id: "pdf-obj-0-16",
    value: "",
    label: "SUPERIOR COURT OF CALIFORNIA, COUNTY OF"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page1[0].P1Caption[0].CourtInfo[0].CrtStreet[0]",
    id: "pdf-obj-0-17",
    value: "",
    label: "STREET ADDRESS"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page1[0].P1Caption[0].CourtInfo[0].CrtMailingAdd[0]",
    id: "pdf-obj-0-18",
    value: "",
    label: "MAILING ADDRESS"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page1[0].P1Caption[0].CourtInfo[0].CrtCityZip[0]",
    id: "pdf-obj-0-19",
    value: "",
    label: "CITY AND ZIP CODE"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page1[0].P1Caption[0].CourtInfo[0].CrtBranch[0]",
    id: "pdf-obj-0-20",
    value: "",
    label: "BRANCH NAME"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page1[0].P1Caption[0].TitlePartyName[0].Party1[0]",
    id: "pdf-obj-0-21",
    value: "",
    label: "PLAINTIFF"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page1[0].P1Caption[0].TitlePartyName[0].Party2[0]",
    id: "pdf-obj-0-22",
    value: "",
    label: "DEFENDANT"
  },
  {
    tag: "textarea",
    name: "UD-105[0].Page1[0].List1[0].item1[0].FillField1[0]",
    id: "pdf-obj-0-23",
    label: "Defendant all defendants for whom this answer is filed must be named and must sign this answer unless their attorney signs"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page1[0].List2[0].Lia[0].Check1[0]",
    id: "pdf-obj-0-24",
    value: "1",
    label: "General Denial (Do not check this box if the complaint demands more than $1,000.)\n    Defendant generally denies each statement of the complaint and of the Mandatory Cover Sheet and Supplemental AllegationsUnlawful Detainer (form UD-101)."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page1[0].List2[0].Lib[0].Check2[0]",
    id: "pdf-obj-0-25",
    value: "2",
    label: "Specific Denials (Check this box and complete (1) and (2) below if complaint demands more than $1,000.)\n    Defendant admits that all of the statements of the complaint and of the Mandatory Cover Sheet and Supplemental AllegationsUnlawful Detainer (form UD-101) are true EXCEPT:"
  },
  {
    tag: "textarea",
    name: "UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li1[0].Subitem1[0].Lia[0].FillField2[0]",
    id: "pdf-obj-0-26",
    label: "Defendant claims the following statements of the complaint are false state paragraph numbers from the complaint or explain here or, if more room needed, on form MC-025"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li1[0].Subitem1[0].Lia[0].Check3[0]",
    id: "pdf-obj-0-27",
    value: "1",
    label: "Explanation is on form MC-025, titled as Attachment 2b(1)(a)."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li1[0].Subitem1[0].Lib[0].Check4[0]",
    id: "pdf-obj-0-28",
    value: "1",
    label: "Explanation is on form MC-025, titled as Attachment 2b(1)(b)."
  },
  {
    tag: "textarea",
    name: "UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li1[0].Subitem1[0].Lib[0].FillField3[0]",
    id: "pdf-obj-0-29",
    label: "state paragraph numbers from the complaint or explain here"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li2[0].Subitem2[0].Lia[0].Check5[0]",
    id: "pdf-obj-0-30",
    value: "1",
    label: "Defendant did not receive plaintiff's Mandatory Cover Sheet and Supplemental Allegations (form UD-101). (If not checked, complete (b) and (c), as appropriate.)"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li2[0].Subitem2[0].Lib[0].Check5[0]",
    id: "pdf-obj-0-31",
    value: "1",
    label: "Defendant claims the statements in the Verification required for issuance of summonsresidential, item 3 of plaintiff's Mandatory Cover Sheet and Supplemental Allegations (form UD-101), are false."
  },
  {
    tag: "textarea",
    name: "UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li2[0].Subitem2[0].Lic[0].FillField4[0]",
    id: "pdf-obj-0-32",
    label: "Defendant claims the following statements on the Mandatory Cover Sheet and Supplemental AllegationsUnlawful Detainer form UD-101 are false state paragraph numbers from form UD-101 or explain here or, if more room needed, on form MC-025"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page1[0].List2[0].Lib[0].SubListb[0].Li2[0].Subitem2[0].Lic[0].Check6[0]",
    id: "pdf-obj-0-33",
    value: "1",
    label: "Explanation is on form MC-025, titled as Attachment 2b(2)(c)."
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page2[0].PxCaption[0].CaseNumber[0].CaseNumber[0]",
    id: "pdf-obj-1-4",
    value: "",
    label: "CASE NUMBER:"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page2[0].PxCaption[0].TitlePartyName[0].Party1[0]",
    id: "pdf-obj-1-5",
    value: "",
    label: "PLAINTIFF"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page2[0].PxCaption[0].TitlePartyName[0].Party2[0]",
    id: "pdf-obj-1-6",
    value: "",
    label: "DEFENDANT"
  },
  {
    tag: "textarea",
    name: "UD-105[0].Page2[0].List2[0].Lib[0].Sublib[0].Li2[0].Subitem2[0].Lid[0].FillField5[0]",
    id: "pdf-obj-1-7",
    label: "Defendant has no information or belief that the following statements on the Mandatory Cover Sheet and Supplemental AllegationsUnlawful Detainer form UD-101 are true, so defendant denies them state paragraph numbers from form UD-101 or explain here or, if more room needed, on form MC-025"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page2[0].List2[0].Lib[0].Sublib[0].Li2[0].Subitem2[0].Lid[0].Check7[0]",
    id: "pdf-obj-1-8",
    value: "1",
    label: "Explanation is on form MC-025, titled as Attachment 2b(2)(d)."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page2[0].List3[0].Lia[0].Check8[0]",
    id: "pdf-obj-1-10",
    value: "1",
    label: "(Nonpayment of rent only) Plaintiff has breached the warranty to provide habitable premises."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page2[0].List3[0].Lib[0].Check9[0]",
    id: "pdf-obj-1-11",
    value: "1",
    label: "(Nonpayment of rent only) Defendant made needed repairs and properly deducted the cost from the rent, and plaintiff did  not give proper credit."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page2[0].List3[0].Lic[0].Check10[0]",
    id: "pdf-obj-1-12",
    value: "1",
    label: "(Nonpayment of rent only)"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page2[0].List3[0].Lic[0].Date1[0]",
    id: "pdf-obj-1-13",
    value: "",
    label: "on date"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page2[0].List3[0].Lid[0].Check11[0]",
    id: "pdf-obj-1-14",
    value: "1",
    label: "Plaintiff waived, changed, or canceled the notice to quit."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page2[0].List3[0].Lie[0].Check12[0]",
    id: "pdf-obj-1-15",
    value: "1",
    label: "Plaintiff served defendant with the notice to quit or filed the complaint to retaliate against defendant."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page2[0].List3[0].Lif[0].Check13[0]",
    id: "pdf-obj-1-16",
    value: "1",
    label: "By serving defendant with the notice to quit or filing the complaint, plaintiff is arbitrarily discriminating against the defendant in violation of the Constitution or the laws of the United States or California."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page2[0].List3[0].Lig[0].Check14[0]",
    id: "pdf-obj-1-17",
    value: "1",
    label: "Plaintiff's demand for possession violates the local rent control or eviction control ordinance of"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page2[0].List3[0].Lig[0].FillField6[0]",
    id: "pdf-obj-1-18",
    value: "",
    label: "city or county, title of  ordinance, and date of passage"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page2[0].List3[0].Lih[0].Check15[0]",
    id: "pdf-obj-1-19",
    value: "1",
    label: "Plaintiff's demand for possession is subject to the Tenant Protection Act of 2019, Civil Code section 1946.2 or 1947.12, and is not in compliance with the act. (Check all that apply and briefly state in item 3w the facts that support each.)"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li1[0].Check16[0]",
    id: "pdf-obj-1-20",
    value: "1",
    label: "Plaintiff failed to state a just cause for termination of tenancy in the written notice to terminate."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li2[0].Check17[0]",
    id: "pdf-obj-1-21",
    value: "1",
    label: "Plaintiff failed to provide an opportunity to cure any alleged violations of terms and conditions of the lease (other than payment of rent) as required under Civil Code section 1946.2(c)."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li3[0].Check18[0]",
    id: "pdf-obj-1-22",
    value: "1",
    label: "Plaintiff failed to comply with the relocation assistance requirements of Civil Code section 1946.2(d)."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li4[0].Check19[0]",
    id: "pdf-obj-1-23",
    value: "1",
    label: "Plaintiff has raised the rent more than the amount allowed under Civil Code section 1947.12, and the only unpaid rent is the unauthorized amount."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page2[0].List3[0].Lih[0].SubListh[0].Li5[0].Check20[0]",
    id: "pdf-obj-1-24",
    value: "1",
    label: "Plaintiff violated the Tenant Protection Act in another manner that defeats the complaint."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page2[0].List3[0].Lii[0].Check21[0]",
    id: "pdf-obj-1-25",
    value: "1",
    label: "Plaintiff accepted rent from defendant to cover a period of time after the date the notice to quit expired."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page2[0].List3[0].Lij[0].Check22[0]",
    id: "pdf-obj-1-26",
    value: "1",
    label: "Plaintiff seeks to evict defendant based on an act against defendant or a member of defendant's household that constitutes domestic violence, sexual assault, stalking, human trafficking, or abuse of an elder or a dependent adult. (This defense requires one of the following: (1) a temporary restraining order, protective order, or police report that is not more than 180 days old; OR (2) a signed statement from a qualified third party (e.g., a doctor, domestic violence or sexual assault counselor, human trafficking caseworker, or psychologist) concerning the injuries or abuse resulting from these acts).)"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page2[0].List3[0].Lik[0].Check23[0]",
    id: "pdf-obj-1-27",
    value: "1",
    label: "Plaintiff seeks to evict defendant based on defendant or another person calling the police or emergency assistance (e.g., ambulance) by or on behalf of a victim of abuse, a victim of crime, or an individual in an emergency when defendant or the other person believed that assistance was necessary."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page2[0].List3[0].Lil[0].Check24[0]",
    id: "pdf-obj-1-28",
    value: "1",
    label: "Plaintiff's demand for possession of a residential property is in retaliation for nonpayment of rent or other financial obligations due between March 1, 2020, and September 30, 2021, even though alleged to be based on other reasons. (Civil Code, section 1942.5(d); Governmental Code, section 12955.)"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page2[0].List3[0].Lim[0].Check25[0]",
    id: "pdf-obj-1-29",
    value: "1",
    label: "Plaintiff's demand for possession of a residential property is based on nonpayment of rent or other financial obligations due between March 1, 2020, and September 30, 2021, and (check all that apply):"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page2[0].List3[0].Lim[0].SublIm[0].Li1[0].Check26[0]",
    id: "pdf-obj-1-30",
    value: "1",
    label: "Plaintiff did not serve the general notice or notices of rights under the COVID-19 Tenant Relief Act as required by Code of Civil Procedure section 1179.04."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page2[0].List3[0].Lim[0].SublIm[0].Li2[0].Check27[0]",
    id: "pdf-obj-1-31",
    value: "1",
    label: "Plaintiff did not serve the required 15-day notice. (Code Civil Procedure, section 1179.03(b) or (c).)"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page3[0].PxCaption[0].CaseNumber[0].CaseNumber[0]",
    id: "pdf-obj-2-4",
    value: "",
    label: "CASE NUMBER:"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page3[0].PxCaption[0].TitlePartyName[0].Party1[0]",
    id: "pdf-obj-2-5",
    value: "",
    label: "PLAINTIFF"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page3[0].PxCaption[0].TitlePartyName[0].Party2[0]",
    id: "pdf-obj-2-6",
    value: "",
    label: "DEFENDANT"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li3[0].Check28[0]",
    id: "pdf-obj-2-7",
    value: "1",
    label: "Plaintiff did not provide an unsigned declaration of COVID-19  related financial distress with the 15-day notice. (Code Civil Procedure, section 1179.03(d).)"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li4[0].Check29[0]",
    id: "pdf-obj-2-8",
    value: "1",
    label: "Plaintiff did not provide an unsigned declaration of COVID-19related financial distress in the language in which the landlord was required to provide a translation of the rental agreement. (Code Civil Procedure, section 1179.03(d).)"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li5[0].Check30[0]",
    id: "pdf-obj-2-9",
    value: "1",
    label: "Plaintiff identified defendant as a high-income tenant in the 15-day notice, but plaintiff did not possess proof at the time the notice was served establishing that defendant met the definition of high-income tenant. (Code Civil Procedure, section 1179.02.5(b).)"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li6[0].SubItem6[0].Lia[0].Check31[0]",
    id: "pdf-obj-2-10",
    value: "1",
    label: 'Defendant delivered to plaintiff one or more declarations of COVID-19related financial distress and, if required as a "high-income tenant," documentation in support. (Code Civil Procedure, sections 1179.03(f) and 1179.02.5.)'
  },
  {
    tag: "textarea",
    name: "UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li6[0].SubItem6[0].Lia[0].FillField7[0]",
    id: "pdf-obj-2-11",
    label: "(Describe when and how delivered and check all other items below that apply):"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li6[0].SubItem6[0].Lib[0].Check32[0]",
    id: "pdf-obj-2-12",
    value: "1",
    label: "Plaintiff's demand for payment includes late fees on rent or other financial obligations due between March 1, 2020, and September 30, 2021."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li6[0].SubItem6[0].Lic[0].Check33[0]",
    id: "pdf-obj-2-13",
    value: "1",
    label: "Plaintiff's demand for payment includes fees for services that were increased or not previously charged."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li6[0].SubItem6[0].Lid[0].Check34[0]",
    id: "pdf-obj-2-14",
    value: "1",
    label: "Defendant, on or before September 30, 2021, paid or offered plaintiff payment of at least 25% of the total rental payments that were due between September 1, 2020, and September 30, 2021, and that were demanded in the termination notices for which defendant delivered the declarations described in (a). (Code Civil Procedure,                   section 1179.03(g)(2).)"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lim[0].SubLim[0].Li7[0].Check35[0]",
    id: "pdf-obj-2-15",
    value: "1",
    label: "Defendant is currently filing or has already filed a declaration of COVID-19related financial distress with the court. (Code Civil Procedure, section 1179.03(h).)"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lin[0].Check36[0]",
    id: "pdf-obj-2-16",
    value: "1",
    label: "Plaintiff's demand for possession of a residential property is based on nonpayment of rent or other financial obligations due between October 1, 2021, and March 31, 2022, and (check all that apply):"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lin[0].SubLin[0].Li1[0].Check35[0]",
    id: "pdf-obj-2-17",
    value: "1",
    label: "Plaintiff's notice to quit was served before April 1, 2022, and"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lin[0].SubLin[0].Li1[0].SubLi1[0].Lia[0].CheckBox190[0]",
    id: "pdf-obj-2-18",
    value: "1",
    label: "Did not contain the required contact information for the pertinent governmental rental assistance program, or the other content required by Code of Civil Procedure section 1179.10(a)."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lin[0].SubLin[0].Li1[0].SubLi1[0].Lib[0].CheckBox192[0]",
    id: "pdf-obj-2-19",
    value: "1",
    label: "Did not did not include a translation of the statutorily required notice. (Code Civil Procedure, section 1179.10(a)(2) and Civil Code, section 1632.)"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lin[0].SubLin[0].Li2[0].Check35[0]",
    id: "pdf-obj-2-20",
    value: "1",
    label: "Plaintiff's notice to quit was served between April 1, 2022, and June 30, 2022, and did not contain the required information about the government rental assistance program and possible protections, as required by Code of Civil Procedure section 1179.10(b)."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lio[0].Check37[0]",
    id: "pdf-obj-2-21",
    value: "1",
    label: "For a tenancy initially established before October 1, 2021, plaintiff's demand for possession of a residential property is based on nonpayment of rent or other financial obligations due between March 1, 2020, and March 31, 2022, and (check all that apply):"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li1[0].Check35[0]",
    id: "pdf-obj-2-22",
    value: "1",
    label: "Plaintiff did not complete an application for rental assistance to cover the rental debt demanded in the complaint before filing the complaint in this action."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li2[0].Check35[0]",
    id: "pdf-obj-2-23",
    value: "1",
    label: "Plaintiff's application for rental assistance was not denied."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li3[0].Check35[0]",
    id: "pdf-obj-2-24",
    value: "1",
    label: "Plaintiff's application for rental assistance was denied for a reason that does not support issuance of a summons or judgment in an unlawful detainer action (check all that apply):"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li3[0].SubLi3[0].Lia[0].Check32[0]",
    id: "pdf-obj-2-25",
    value: "1",
    label: "Plaintiff did not fully or properly complete plaintiff's portion of the application. (Code Civil Procedure,                             section 1179.09(d)(2)(A).)"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li3[0].SubLi3[0].Lib[0].Check33[0]",
    id: "pdf-obj-2-26",
    value: "1",
    label: "Plaintiff did not apply to the correct rental assistance program. (Code Civil Procedure, section 1179.09(d)(2)(C).)"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li4[0].Check35[0]",
    id: "pdf-obj-2-27",
    value: "1",
    label: "An application for rental assistance was filed before April 1, 2022, and the determination is still pending."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lio[0].SubLio[0].Li5[0].Check35[0]",
    id: "pdf-obj-2-28",
    value: "1",
    label: "Rental assistance has been approved and tenant is separately filing an application to prevent forfeiture (form UD-125)."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lip[0].Check38[0]",
    id: "pdf-obj-2-29",
    value: "1",
    label: "Defendant provided plaintiff with a declaration under penalty of perjury for the Centers for Disease Control and Prevention's temporary halt in evictions to prevent further spread of COVID-19 (85 Federal Register 55292 at 55297), and plaintiff's reason for termination of the tenancy is one that the temporary halt in evictions applies to."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lip[0].SubLip[0].Li1[0].Check35[0]",
    id: "pdf-obj-2-30",
    value: "1",
    label: "Plaintiff received or has a pending application for rental assistance from a governmental rental assistance program or some other source relating to the amount claimed in the notice to pay rent or quit. (Health & Safety Code,  sections 50897.1(d)(2)(B) and 50897.3(e)(2).)"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page3[0].List3[0].Lip[0].SubLip[0].Li2[0].Check35[0]",
    id: "pdf-obj-2-31",
    value: "1",
    label: "Plaintiff received or has a pending application for rental assistance from a governmental rental assistance program or some other source for rent accruing since the notice to pay rent or quit. (Health & Safety Code, sections 50897.1(d)(2)(B) and 50897.3(e)(2).)"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page4[0].PxCaption[0].CaseNumber[0].CaseNumber[0]",
    id: "pdf-obj-3-4",
    value: "",
    label: "CASE NUMBER:"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page4[0].PxCaption[0].TitlePartyName[0].Party1[0]",
    id: "pdf-obj-3-5",
    value: "",
    label: "PLAINTIFF"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page4[0].PxCaption[0].TitlePartyName[0].Party2[0]",
    id: "pdf-obj-3-6",
    value: "",
    label: "DEFENDANT"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page4[0].List3[0].Liq[0].Check39[0]",
    id: "pdf-obj-3-7",
    value: "1",
    label: "Plaintiff violated the COVID-19 Tenant Relief Act (Code Civil Procedure, section 1179.01 et seq.) or a local COVID-19  related ordinance regarding evictions in some other way (briefly state facts describing this in item 3w)."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page4[0].List3[0].Lir[0].Check39[0]",
    id: "pdf-obj-3-8",
    value: "1",
    label: "The property is covered by the federal CARES Act and the plaintiff did not provide 30 days' notice to vacate."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page4[0].List3[0].Lis[0].Check42[0]",
    id: "pdf-obj-3-9",
    value: "1",
    label: "Plaintiff improperly applied payments made by defendant  in a tenancy that was in existence between March 1, 2020, and September 30, 2021 (Code Civil Procedure, section 1179.04.5), as follows (check all that apply):"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page4[0].List3[0].Lis[0].SubLis[0].Li1[0].Check43[0]",
    id: "pdf-obj-3-10",
    value: "1",
    label: "Plaintiff applied a security deposit to rent, or other financial obligations due, without tenants written agreement."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page4[0].List3[0].Lis[0].SubLis[0].Li2[0].Check44[0]",
    id: "pdf-obj-3-11",
    value: "1",
    label: "Plaintiff applied a monthly rental payment to rent or other financial obligations that were due between March 1, 2020, and September 30, 2021, other than to the prospective months rent, without tenants written agreement."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page4[0].List3[0].Lit[0].Check45[0]",
    id: "pdf-obj-3-12",
    value: "1",
    label: "Plaintiff refused to accept payment from a third party for rent due. (Civil Code, section 1947.3; Governmental Code, section 12955.)"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page4[0].List3[0].Liu[0].CheckBox19[0]",
    id: "pdf-obj-3-13",
    value: "1",
    label: "Defendant has a disability and plaintiff refused to provide a reasonable accommodation that was requested.  )(Cal. Code Regs., tit. 2,  12176(c).)"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page4[0].List3[0].Liv[0].Check45[0]",
    id: "pdf-obj-3-14",
    value: "1",
    label: "Other defenses and objections are stated in item 3w."
  },
  {
    tag: "textarea",
    name: "UD-105[0].Page4[0].List3[0].Liw[0].FillField9[0]",
    id: "pdf-obj-3-15",
    label: "Provide facts for each item checked above, either here, or, if more room needed, on form MC-025"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page4[0].List3[0].Liw[0].Check46[0]",
    id: "pdf-obj-3-16",
    value: "1",
    label: "Description of facts or defenses are on form MC-025, titled as Attachment 3w."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page4[0].List3[0].Li3[0].Check35[0]",
    id: "pdf-obj-3-17",
    value: "1",
    label: "Plaintiff's demand for possession is based only on late fees for defendant's failure to provide landlord payment within 15 days of receiving governmental rental assistance. (Health & Safety Code, section 50897.1(e)(2)(B).)"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page4[0].List4[0].Lia[0].Check47[0]",
    id: "pdf-obj-3-18",
    value: "1",
    label: "Defendant vacated the premises on"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page4[0].List4[0].Lia[0].Date2[0]",
    id: "pdf-obj-3-19",
    value: "",
    label: "date"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page4[0].List4[0].Lib[0].Check48[0]",
    id: "pdf-obj-3-20",
    value: "1",
    label: "The fair rental value of the premises alleged in the complaint is excessive (explain below or, if more room needed, on form MC-025):"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page4[0].List4[0].Lib[0].Check49[0]",
    id: "pdf-obj-3-21",
    value: "1",
    label: "Explanation is on form MC-025, titled as Attachment 4b."
  },
  {
    tag: "textarea",
    name: "UD-105[0].Page4[0].List4[0].Lib[0].FillField10[0]",
    id: "pdf-obj-3-22",
    label: "explain"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page4[0].List4[0].Lic[0].Check50[0]",
    id: "pdf-obj-3-23",
    value: "1",
    label: "Other (specify below or, if more room needed, on form MC-025):"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page4[0].List4[0].Lic[0].Check51[0]",
    id: "pdf-obj-3-24",
    value: "1",
    label: "Other statements are on form MC-025, titled as Attachment 4c."
  },
  {
    tag: "textarea",
    name: "UD-105[0].Page4[0].List4[0].Lic[0].FillField11[0]",
    id: "pdf-obj-3-25",
    label: "other specify"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page4[0].List5[0].Lic[0].Check52[0]",
    id: "pdf-obj-3-26",
    value: "1",
    label: "reasonable attorney fees."
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page4[0].List5[0].Lid[0].Check53[0]",
    id: "pdf-obj-3-27",
    value: "1",
    label: "that plaintiff be ordered to (1) make repairs and correct the conditions that constitute a breach of the warranty to provide  habitable premises and (2) reduce the monthly rent to a reasonable rental value until the conditions are corrected."
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page5[0].PxCaption[0].CaseNumber[0].CaseNumber[0]",
    id: "pdf-obj-4-6",
    value: "",
    label: "CASE NUMBER:"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page5[0].PxCaption[0].TitlePartyName[0].Party1[0]",
    id: "pdf-obj-4-7",
    value: "",
    label: "PLAINTIFF"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page5[0].PxCaption[0].TitlePartyName[0].Party2[0]",
    id: "pdf-obj-4-8",
    value: "",
    label: "DEFENDANT"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page5[0].List5[0].Lie[0].Check54[0]",
    id: "pdf-obj-4-9",
    value: "1",
    label: "Other (specify below or on form MC-025):"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page5[0].List5[0].Lie[0].Check55[0]",
    id: "pdf-obj-4-10",
    value: "1",
    label: "All other requests are stated on form MC-025, titled as Attachment 5e."
  },
  {
    tag: "textarea",
    name: "UD-105[0].Page5[0].List5[0].Lie[0].FillField12[0]",
    id: "pdf-obj-4-11",
    label: "other specify"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page5[0].List6[0].item6[0].FillPages1[0]",
    id: "pdf-obj-4-12",
    value: "",
    label: "Number of pages attached"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page5[0].UDAssistant[0].List7[0].Check561[0]",
    id: "pdf-obj-4-13",
    value: "1",
    label: "did not"
  },
  {
    tag: "input",
    type: "checkbox",
    name: "UD-105[0].Page5[0].UDAssistant[0].List7[0].Check561[1]",
    id: "pdf-obj-4-14",
    value: "2",
    label: "did"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page5[0].UDAssistant[0].List7[0].Lia[0].AsstName[0]",
    id: "pdf-obj-4-15",
    value: "",
    label: "Assistant's name"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page5[0].UDAssistant[0].List7[0].Lib[0].PhoneNum[0]",
    id: "pdf-obj-4-16",
    value: "",
    label: "Telephone number"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page5[0].UDAssistant[0].List7[0].Lic[0].Address[0]",
    id: "pdf-obj-4-17",
    value: "",
    label: "Street address city and zip code"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page5[0].UDAssistant[0].List7[0].Lid[0].RegCounty[0]",
    id: "pdf-obj-4-18",
    value: "",
    label: "County of registration"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page5[0].UDAssistant[0].List7[0].Lie[0].RegNo[0]",
    id: "pdf-obj-4-19",
    value: "",
    label: "Registration number"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page5[0].UDAssistant[0].List7[0].Lif[0].RegExp[0]",
    id: "pdf-obj-4-20",
    value: "",
    label: "Expiration date"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page5[0].UDAssistant[0].Sign[0].PrintName1[0]",
    id: "pdf-obj-4-21",
    value: "",
    label: "Type or print name"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page5[0].UDAssistant[0].Sign[0].PrintName2[0]",
    id: "pdf-obj-4-22",
    value: "",
    label: "Type or print name"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page5[0].UDAssistant[0].Sign[0].PrintName11[0]",
    id: "pdf-obj-4-23",
    value: "",
    label: "Type or print name"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page5[0].Verification[0].Date3[0]",
    id: "pdf-obj-4-24",
    value: "",
    label: "Date"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page5[0].Verification[0].PrintName3[0]",
    id: "pdf-obj-4-25",
    value: "",
    label: "Type or print name"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page5[0].Verification[0].Date4[0]",
    id: "pdf-obj-4-26",
    value: "",
    label: "Date"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page5[0].Verification[0].PrintName4[0]",
    id: "pdf-obj-4-27",
    value: "",
    label: "Type or print name"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page5[0].Verification[0].Date5[0]",
    id: "pdf-obj-4-28",
    value: "",
    label: "Date"
  },
  {
    tag: "input",
    type: "text",
    name: "UD-105[0].Page5[0].Verification[0].PrintName5[0]",
    id: "pdf-obj-4-29",
    value: "",
    label: "Type or print name"
  }
];

// src/document.ts
var addDocument = async (form, fileDetails) => {
  const fields = await getDocumentFieldData(fileDetails.data);
  const cachedPdf = await getSuggestedFormElementsFromCache(fileDetails.data);
  if (cachedPdf) {
    form = (0, import_forms.updateFormSummary)(form, {
      title: cachedPdf.title,
      description: ""
    });
    form = (0, import_forms.addFormElementMap)(form, cachedPdf.elements, cachedPdf.root);
    const updatedForm = (0, import_forms.addFormOutput)(form, {
      data: fileDetails.data,
      path: fileDetails.name,
      fields: cachedPdf.outputs,
      formFields: Object.fromEntries(
        Object.keys(cachedPdf.outputs).map((output) => {
          console.log(cachedPdf.outputs[output]);
          return [output, cachedPdf.outputs[output].name];
        })
      )
    });
    console.log(updatedForm);
    return {
      newFields: fields,
      updatedForm
    };
  } else {
    const formWithFields = addDocumentFieldsToForm(form, fields);
    const updatedForm = (0, import_forms.addFormOutput)(formWithFields, {
      data: fileDetails.data,
      path: fileDetails.name,
      fields,
      // TODO: for now, reuse the field IDs from the PDF. we need to generate
      // unique ones, instead.
      formFields: Object.fromEntries(
        Object.keys(fields).map((field) => {
          return [field, fields[field].name];
        })
      )
    });
    return {
      newFields: fields,
      updatedForm
    };
  }
};
var addDocumentFieldsToForm = (form, fields) => {
  const elements = [];
  Object.entries(fields).map(([elementId, field]) => {
    if (field.type === "CheckBox") {
      elements.push({
        type: "input",
        id: elementId,
        data: {
          label: field.label
        },
        default: {
          label: "",
          initial: "",
          required: false,
          maxLength: 128
        },
        required: field.required
      });
    } else if (field.type === "OptionList") {
      elements.push({
        type: "input",
        id: elementId,
        data: {
          label: field.label
        },
        default: {
          label: "",
          initial: "",
          required: false,
          maxLength: 128
        },
        required: field.required
      });
    } else if (field.type === "Dropdown") {
      elements.push({
        type: "input",
        id: elementId,
        data: {
          label: field.label
        },
        default: {
          label: "",
          initial: "",
          required: false,
          maxLength: 128
        },
        required: field.required
      });
    } else if (field.type === "TextField") {
      elements.push({
        type: "input",
        id: elementId,
        data: {
          label: field.label
        },
        default: {
          label: "",
          initial: "",
          required: false,
          maxLength: 128
        },
        required: field.required
      });
    } else if (field.type === "not-supported") {
      console.error(`Skipping field: ${field.error}`);
    } else {
      const _exhaustiveCheck = field;
    }
  });
  elements.push({
    id: "root",
    type: "sequence",
    data: {
      elements: elements.map((element) => element.id)
    },
    default: [],
    required: true
  });
  return (0, import_forms.addFormElements)(form, elements, "root");
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addDocument,
  addDocumentFieldsToForm
});
