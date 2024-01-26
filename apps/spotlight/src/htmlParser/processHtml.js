/**
To extract form fields, their attributes and labels from an HTML code and output them in a JSON file, go to the "htmlParser" directory:

```bash
 cd apps/spotlight/src/htmlParser
```

If you're already in the "spotlight" directory

```bash
 cd src/htmlParser
```

Replace the HTML content that's inside the "form-input.html" with your HTML, then run:

```bash
 node processHtml.js yourCustomJSONFileName.json
```

Be sure to replace "yourCustomJSONFileName.json" with whatever name you want your output JSON file to be called. If you don't indicate a new file name, your file will be given the default file name which is "form-field-output.json".
 */
import { load } from 'cheerio';
import fs from 'fs';
import path from 'path';

const htmlFilePath = path.join(process.cwd(), 'form-input.html');
const defaultOutputFileName = 'form-field-output.json';
const outputFileName = process.argv[2] || defaultOutputFileName;
const outputJsonPath = path.join(process.cwd(), outputFileName);

function extractFormFields(htmlContent) {
  const $ = load(htmlContent);
  let formFields = [];

  $('input, textarea, select').each((index, element) => {
    const field = $(element);
    const label =
      $("label[for='" + field.attr('id') + "']").text() || 'No Label';

    formFields.push({
      tag: field.prop('tagName').toLowerCase(),
      type: field.attr('type'),
      name: field.attr('name'),
      id: field.attr('id'),
      value: field.attr('value'),
      label: label.trim(),
    });
  });

  return formFields;
}

function processHtmlFile() {
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
  const formFields = extractFormFields(htmlContent);

  fs.writeFileSync(outputJsonPath, JSON.stringify(formFields, null, 2));
  console.log(`Processed HTML file. Form data written to ${outputJsonPath}`);
}

processHtmlFile();
